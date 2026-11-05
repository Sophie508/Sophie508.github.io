/* Editorial interactions. Archived data and illustrative scoring stay separate. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const node = (tag, cls, text) => {
    const e = document.createElement(tag); if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text; return e;
  };
  const examples = [
    { benchmark: 'skillsbench', id: 'sales-pivot-analysis', title: 'Build an Excel demographic report', labels: ['Save a valid workbook', 'Population by State', 'Earners by State', 'Regions by State', 'State Income Quartile', 'Joined source-data fields', 'Valid income-group labels', 'Calculate Total', 'Join the original data'] },
    { benchmark: 'terminalbench', id: 'pypi-server', title: 'Build and serve a Python package', labels: ['Build and host the package', 'Use the required package name', 'Serve version 0.1.0', 'Install from the local index', 'Export dotproduct from the package', 'Compute the dot product correctly'] },
    { benchmark: 'swebench', id: 'astropy__astropy-12907', title: 'Fix nested-model separability', labels: ['Fix the nested model', 'Preserve standalone behavior', 'Preserve flat-model behavior'] }
  ];
  let collection, currentExample = 0, request = 0;
  const cache = new Map();
  async function load(file) {
    if (cache.has(file)) return cache.get(file);
    const r = await fetch(`data/explorer/${file}`);
    if (!r.ok) throw new Error('Task data could not be loaded. Reload the page to retry.');
    const data = await r.json(); cache.set(file, data); return data;
  }
  function openArchived(task, trigger) {
    document.dispatchEvent(new CustomEvent('gcpc:open-task', { detail: { benchmark: task.benchmark, id: task.id, trigger } }));
  }
  function drawMosaic(benchmark) {
    const tasks = collection.tasks.filter(t => t.benchmark === benchmark);
    $('hero-tiles').replaceChildren();
    $('hero-benchmarks').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.benchmark === benchmark)));
    for (const task of tasks) {
      const b = node('button', 'task-dot'); b.type = 'button';
      b.setAttribute('aria-label', `${task.title}, ${task.items} requirements. Open task.`);
      b.dataset.countBand = String(Math.ceil(task.items / 4));
      b.title = `${task.title} · Checklist: ${task.items} requirements`; b.dataset.task = task.id;
      const describe = () => { $('hero-hover').textContent = `${task.title} · Checklist: ${task.items} requirements`; };
      b.addEventListener('focus', describe); b.addEventListener('mouseenter', describe);
      b.addEventListener('click', () => openArchived(task, b)); $('hero-tiles').append(b);
    }
    $('hero-hover').textContent = `${tasks.length} tasks in this study sample · select a dot to explore`;
  }
  async function drawExample(n) {
    currentExample = n; const token = ++request, spec = examples[n];
    document.querySelectorAll('[data-example]').forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.example) === n)));
    $('anatomy-title').textContent = spec.title;
    $('anatomy-meta').textContent = spec.benchmark;
    $('anatomy-items').textContent = 'Loading the archived checklist…';
    $('anatomy-instruction').textContent = '';
    $('anatomy-open').disabled = true;
    try {
      const task = await load(`${spec.benchmark}/${spec.id}.json`);
      if (token !== request) return;
      $('anatomy-open').disabled = false;
      $('anatomy-meta').textContent = `${collection.benchmarks.find(b => b.id === spec.benchmark).label} · ${spec.id}`;
      $('anatomy-count').textContent = `Checklist · ${task.items.length} requirements`;
      const source = task.instruction + task.supplemental.map(x => `\n\nReferenced task file: ${x.name}\n${x.text}`).join('');
      $('anatomy-instruction').textContent = source;
      $('anatomy-location').textContent = 'Open a requirement to highlight its quoted source.';
      $('anatomy-items').replaceChildren();
      const ranges = task.items.map((item, i) => {
        const quote = item.source_quote || '';
        const start = quote ? source.replaceAll('\u00a0', ' ').indexOf(quote.replaceAll('\u00a0', ' ')) : -1;
        return { i, start, end: start + quote.length };
      }).filter(r => r.start >= 0);
      function renderSource(selected) {
        const view = $('anatomy-instruction'); view.replaceChildren();
        const boundaries = [...new Set([0, source.length, ...ranges.flatMap(r => [r.start, r.end])])].sort((a,b) => a-b);
        for (let j = 0; j < boundaries.length - 1; j++) {
          const start = boundaries[j], end = boundaries[j+1];
          const linked = ranges.filter(r => r.start <= start && r.end >= end).sort((a,b) => (a.end-a.start)-(b.end-b.start));
          const text = source.slice(start, end);
          if (!linked.length) { view.append(document.createTextNode(text)); continue; }
          const b = node('button', 'source-link', text); b.type = 'button';
          b.classList.toggle('source-active', linked.some(r => r.i === selected));
          const target = linked.find(r => r.i === selected) || linked[0];
          b.setAttribute('aria-label', `Open ${task.items[target.i].item_id}: ${text}`);
          b.title = `Linked requirement${linked.length>1?'s':''}: ${linked.map(r => task.items[r.i].item_id).join(', ')}`;
          b.addEventListener('click', () => {
            const d = $('anatomy-items').children[target.i]; d.open = true;
            d.querySelector('summary').focus({preventScroll:true});
            d.scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
          });
          view.append(b);
        }
      }
      task.items.forEach((item, i) => {
        const detail = node('details', 'anatomy-item'), summary = node('summary');
        summary.append(node('span', 'item-number', item.item_id), node('strong', '', spec.labels[i] || item.requirement), node('span', 'expand-icon', '+'));
        const body = node('div', 'anatomy-body');
        body.append(node('p', '', item.requirement));
        // The selected source quote is shown once, beside the requirement.
        const technical = node('details', 'anatomy-technical'); technical.append(node('summary', '', 'Verification route and limits'));
        technical.append(node('p', '', `${item.verification_type} · ${item.verification}`));
        if (item.notes) technical.append(node('p', 'item-note', item.notes));
        technical.append(node('code', '', item.verification_ref));
        technical.append(node('p', 'item-note', `Recorded validation: ${item.validation?.valid ? 'passed' : 'flagged — inspect before relying on this requirement'}. Validation is not a guarantee of completeness.`));
        body.append(technical); detail.append(summary, body); $('anatomy-items').append(detail);
        detail.addEventListener('toggle', () => {
          if (!detail.open) return;
          $('anatomy-items').querySelectorAll(':scope > details').forEach(d => { if (d !== detail) d.open = false; });
          renderSource(i);
          $('anatomy-selected-quote').textContent = item.source_quote || 'No source quotation was archived for this requirement.';
          const view = $('anatomy-instruction'), mark = view.querySelector('.source-active');
          if (mark) {
            $('anatomy-location').textContent = `${item.item_id} · Quoted source shown below; expand the full task for context.`;
            view.scrollTop += mark.getBoundingClientRect().top - view.getBoundingClientRect().top - view.clientHeight / 3;
          } else {
            view.scrollTop = 0;
            $('anatomy-location').textContent = `${item.item_id} · Quote not found in the displayed sources. This archived requirement needs inspection.`;
          }
        });
      });
      $('anatomy-items').children[0].open = true;
    } catch (error) { if (token === request) $('anatomy-items').textContent = error.message; }
  }
  $('anatomy-open').addEventListener('click', e => openArchived(examples[currentExample], e.currentTarget));
  document.querySelectorAll('[data-example]').forEach(b => b.addEventListener('click', () => drawExample(Number(b.dataset.example))));
  document.querySelectorAll('[data-verdict]').forEach(b => b.addEventListener('click', () => {
    const v = b.dataset.verdict, yes = v === 'YES' ? 4 : 3, decided = v === 'ABSTAIN' ? 4 : 5;
    const score = Math.round(100 * yes / decided), coverage = 20 * decided;
    document.querySelectorAll('[data-verdict]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    const last = $('lab-last'); last.className = v === 'YES' ? 'yes' : v === 'NO' ? 'no' : 'unknown';
    last.replaceChildren(document.createTextNode('R5'), document.createElement('br'), node('strong', '', { YES:'Yes', NO:'No', ABSTAIN:'Abstain' }[v]));
    $('lab-score').textContent = `${score}%`; $('lab-coverage').textContent = `${coverage}%`;
    $('lab-score-bar').style.width = `${score}%`; $('lab-coverage-bar').style.width = `${coverage}%`;
    $('lab-score-formula').textContent = `${yes} Yes ÷ ${decided} decidable requirements`;
    $('lab-coverage-formula').textContent = `${decided} decidable ÷ 5 requirements`;
    $('lab-takeaway').textContent = {
      YES: 'R5 is now supported. Four of five requirements are met, and all five can be judged.',
      NO: 'R5 is now a confirmed violation. Coverage rises to 100%, but partial credit falls to 60%. More evidence does not always mean a better score.',
      ABSTAIN: 'One requirement is unresolved. The score uses the four we can judge; coverage keeps the missing fifth visible.'
    }[v];
  }));
  document.querySelectorAll('[data-change]').forEach(b => b.addEventListener('click', () => {
    const partial = b.dataset.change === 'partial';
    document.querySelectorAll('[data-change]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    $('binary-change').hidden = partial; $('partial-change').hidden = !partial;
    const result = $('change-announcement');
    result.textContent = partial
      ? 'Checklist differences: 20.9 percent improved by more than 0.10; 60.4 percent were within plus or minus 0.10; 18.7 percent regressed by more than 0.10. Median change: zero.'
      : 'Final outcome: all 879 pairs failed in both conditions.';
    $('change-takeaway').textContent = partial
      ? 'The median change was zero. The shared FAIL label hides differences in both directions; skills did not always help.'
      : 'Switch to checklist differences to see what this single label hides.';
  }));
  const sections = [...document.querySelectorAll('main > section')];
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(x => x.isIntersecting).sort((a,b) => a.boundingClientRect.top-b.boundingClientRect.top)[0];
    if (!visible) return;
    document.querySelectorAll('.chapters a').forEach(a => {
      if (a.hash === `#${visible.target.id}`) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
  sections.forEach(s => observer.observe(s));
  async function initialize() {
    try {
      collection = await load('index.json');
      collection.benchmarks.forEach(b => {
        const button = node('button', '', b.label.replace(' v1.1','').replace(' 2.0','').replace(' Verified',''));
        button.type = 'button'; button.dataset.benchmark = b.id;
        button.addEventListener('click', () => drawMosaic(b.id)); $('hero-benchmarks').append(button);
      });
      drawMosaic('skillsbench'); await drawExample(0);
    } catch (error) { $('hero-tiles').textContent = error.message; $('anatomy-items').textContent = error.message; }
  }
  initialize();
})();
