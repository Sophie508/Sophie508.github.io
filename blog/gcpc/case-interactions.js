/* The narrative selects views of archived evidence, never inferred scores. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const visual = $('case-visual');
  const steps = [...document.querySelectorAll('[data-case-step]')];
  const controls = [...document.querySelectorAll('[data-case-select]')];
  const titles = ['Same verdict', 'Open the verdict', 'One shared error', 'Different files', 'A different unit', 'Start from the task'];
  const explanations = [
    '<p>Two files. One shared final verdict.<br>Scroll or select a step to look closer.</p>',
    '<p>Select any tile to inspect the same check in both runs.</p>',
    '<div class="shared-error"><span>Quarter · both reports</span><strong>nan</strong><span>Required: Q1 · Q2 · Q3 · Q4</span></div>',
    '<div class="implementation-pair"><div><span>Without skill</span><strong>Ordinary cells</strong><div class="cell-sketch" aria-hidden="true">▤</div><small>Computed totals written to cells</small></div><div><span>With skill</span><strong>Native PivotTable</strong><div class="pivot-connection"><span>Source data</span><b>→</b><span>Pivot cache</span><b>→</b><span>Rows + values</span></div><small>Stored objects and field settings</small></div></div>',
    '<div class="grouped-requirement"><span class="mini-label">8 COLUMN CHECKS ↓ 1 REQUIREMENT</span><strong>S-06 · Joined source-data fields</strong><p>SA2_CODE · SA2_NAME · STATE · POPULATION_2023 · EARNERS · MEDIAN_INCOME · Quarter · Total</p></div>',
    '<p>Nine task requirements; no scores are inferred from these checks.</p>'
  ];
  function selectStep(n) {
    visual.dataset.stage = String(n);
    $('case-step-name').textContent = titles[n];
    controls.forEach((b, i) => b.setAttribute('aria-pressed', String(i === n)));
    steps.forEach((s, i) => s.classList.toggle('is-active', i === n));
    $('case-grid-view').hidden = n === 0 || n === 5;
    $('case-inspect').hidden = n === 0 || n === 5;
    $('case-requirements').hidden = n !== 5;
    $('case-explanation').innerHTML = explanations[n];
    document.querySelectorAll('[data-step-detail]').forEach(detail => { detail.hidden = Number(detail.dataset.stepDetail) !== n; });
    if (n === 0 && !matchMedia('(min-width: 1000px) and (min-height: 650px)').matches) {
      $('case-explanation').textContent = 'Select steps 2–6 to look inside the verdict.';
    }
    document.querySelectorAll('#test-grid .test-cell').forEach(b => {
      const i = Number(b.dataset.index);
      const relevant = n === 2 ? i === 21 : n === 3 ? i < 12 || i === 23 : n === 4 ? i >= 12 && i < 20 : true;
      b.classList.toggle('case-muted', !relevant);
      b.classList.toggle('case-highlight', n > 1 && relevant);
    });
    if (n === 2) document.dispatchEvent(new CustomEvent('gcpc:select-check', { detail: 21 }));
  }
  let manualSelection = false;
  const releaseManualSelection = () => { manualSelection = false; };
  window.addEventListener('wheel', releaseManualSelection, { passive: true });
  window.addEventListener('touchstart', releaseManualSelection, { passive: true });
  window.addEventListener('keydown', event => {
    if (['PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) releaseManualSelection();
  });
  controls.forEach((b, i) => b.addEventListener('click', () => {
    manualSelection = true;
    selectStep(i);
    if (matchMedia('(min-width: 1000px) and (min-height: 650px)').matches) {
      steps[i].scrollIntoView({ block: 'center', behavior: 'instant' });
    }
  }));
  // Manual controls remain available; scrolling drives the wider desktop layout.
  const observer = new IntersectionObserver(entries => {
    if (manualSelection || !matchMedia('(min-width: 1000px) and (min-height: 650px)').matches) return;
    const entry = entries.filter(x => x.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (entry) selectStep(Number(entry.target.dataset.caseStep));
  }, { rootMargin: '-30% 0px -35% 0px', threshold: 0 });
  steps.forEach(step => observer.observe(step));
  function followWorkbookAnchor() {
    if (location.hash === '#workbook-delivery') {
      manualSelection = true;
      selectStep(5);
      $('workbook-delivery').open = true;
      $('workbook-delivery').scrollIntoView({ block: 'center' });
    }
  }
  selectStep(0);
  followWorkbookAnchor();
  window.addEventListener('hashchange', followWorkbookAnchor);
  const labels = ['Save a valid workbook', 'Population by State', 'Earners by State', 'Regions by State', 'State Income Quartile', 'Joined source-data fields', 'Valid income-group labels', 'Calculate Total', 'Join the original data'];
  fetch('data/explorer/skillsbench/sales-pivot-analysis.json').then(r => {
    if (!r.ok) throw new Error('Checklist unavailable');
    return r.json();
  }).then(task => {
    const list = $('case-requirement-list'); list.replaceChildren();
    task.items.forEach((item, i) => {
      const button = document.createElement('button'); button.type = 'button';
      const id = document.createElement('span'); id.textContent = item.item_id;
      const title = document.createElement('strong'); title.textContent = labels[i] || item.requirement;
      button.append(id, title);
      button.title = item.requirement;
      button.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('gcpc:open-task', { detail: { benchmark: 'skillsbench', id: 'sales-pivot-analysis', trigger: button } }));
      });
      list.append(button);
    });
    const item = task.items.find(x => x.item_id === 'S-01');
    for (const text of [item.requirement, item.verification, 'Verification route: generated. This is a proposed check, not a recorded pass result.']) {
      const p = document.createElement('p'); p.textContent = text; $('workbook-delivery-detail').append(p);
    }
  }).catch(() => {
    $('case-requirement-list').textContent = 'Checklist unavailable. Reload to retry, or use the task browser below.';
    $('workbook-delivery-detail').textContent = 'Checklist unavailable. The original task remains available in step 1.';
  });
})();
