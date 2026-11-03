/* Archived endpoint judgments only. Walkthrough timing is presentation timing. */
(() => {
  'use strict';
  const root = document.getElementById('task-explorer');
  const dialog = document.getElementById('task-dialog');
  const $ = id => document.getElementById(id);
  const cache = new Map();
  const state = { benchmark: 'skillsbench', query: '', task: null, run: 0, mode: 'raw', item: -1, timer: null, request: 0, returnFocus: null };
  let index;
  const node = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  };
  const button = (text, fn, cls = '') => {
    const b = node('button', cls, text); b.type = 'button'; b.addEventListener('click', fn); return b;
  };
  const percent = x => x == null ? 'Not available' : `${(x * 100).toFixed(1)}%`;
  const outcome = run => run.official === 1 ? 'PASS' : 'FAIL';
  const benchmark = () => index.benchmarks.find(b => b.id === state.benchmark);
  const filtered = () => index.tasks.filter(t => t.benchmark === state.benchmark && `${t.id} ${t.category}`.toLowerCase().includes(state.query));
  const friendly = { YES: 'Yes', NO: 'No', ABSTAIN: 'Abstain' };

  async function getJSON(file) {
    const response = await fetch(`data/explorer/${file}`);
    if (!response.ok) throw new Error('Could not load the archived task data.');
    return response.json();
  }
  function stop() {
    clearInterval(state.timer); state.timer = null;
    $('walk-play').textContent = '▶ Walk through';
    $('walk-play').setAttribute('aria-pressed', 'false');
  }
  function drawGrid() {
    stop();
    root.querySelectorAll('[data-benchmark]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.benchmark === state.benchmark)));
    const b = benchmark(), tasks = filtered();
    $('explorer-count').textContent = `${tasks.length} of ${b.tasks} tasks · ${b.items} checklist items in this benchmark`;
    $('explorer-scope').textContent = state.benchmark === 'skillsbench'
      ? 'All 87 archived checklists. Run views use compatible binary-outcome records from the configuration × task archive, not the paper’s 4,455-trajectory analysis cohort or a model leaderboard.'
      : `All ${b.tasks} archived checklists from the study’s ${b.label} sample. Each task has one official PASS and one official FAIL run; this is an outcome-selected sample, not a pass-rate estimate.`;
    const grid = $('task-tiles'); grid.replaceChildren();
    tasks.forEach((task, i) => {
      const tile = button(String(i + 1).padStart(2, '0'), () => openTask(task, tile), 'task-tile');
      tile.style.setProperty('--tile-shade', String(0.14 + task.items / 16 * 0.73));
      tile.setAttribute('aria-label', `${task.title}; ${task.items} checklist items; open task`);
      tile.title = `${task.id} · ${task.items} items · ${task.runs} archived runs`;
      tile.addEventListener('mouseenter', () => describeTask(task));
      tile.addEventListener('focus', () => describeTask(task));
      grid.append(tile);
    });
    if (!tasks.length) grid.append(node('p', 'explorer-empty', 'No matching tasks. Try a shorter task name.'));
    $('task-hover').textContent = tasks.length ? 'Choose a tile to read its task and expand the checklist.' : 'No matching tasks.';
  }
  function describeTask(t) {
    $('task-hover').textContent = `${t.id} · ${t.items} requirements · ${t.runs} archived runs`;
  }
  async function openTask(summary, trigger) {
    stop();
    const token = ++state.request;
    if (!dialog.open) {
      state.returnFocus = trigger || document.activeElement;
      dialog.showModal(); document.body.classList.add('task-dialog-open');
    }
    $('drawer-title').textContent = summary.title;
    $('drawer-meta').textContent = `${benchmark().label} · ${summary.items} checklist items`;
    $('drawer-loading').hidden = false; $('drawer-loading').textContent = 'Loading archived checklist…';
    $('drawer-content').hidden = true;
    try {
      if (!cache.has(summary.file)) cache.set(summary.file, await getJSON(summary.file));
      if (token !== state.request || !dialog.open) return;
      state.task = cache.get(summary.file); state.run = 0; state.item = -1;
      // Prefer an available log-only FAIL for a concrete, unanchored first view.
      const first = state.task.runs.findIndex(r => r.official === 0 && r.raw != null);
      if (first >= 0) state.run = first;
      $('drawer-loading').hidden = true; $('drawer-content').hidden = false;
      drawTask();
      $('drawer-scroll').scrollTop = 0;
    } catch (error) {
      if (token !== state.request) return;
      $('drawer-loading').textContent = `${error.message} Close and reopen the task to retry.`;
    }
  }
  function taskSource() {
    const t = state.task;
    return t.instruction + t.supplemental.map(s => `\n\nReferenced task file: ${s.name}\n\n${s.text}`).join('');
  }
  function highlightQuote(item) {
    const source = taskSource(), view = $('drawer-instruction');
    view.replaceChildren();
    if (!item) { view.textContent = source; $('quote-location').textContent = 'Expand a requirement to locate its quoted source.'; return; }
    const quote = item.source_quote;
    const pos = source.replaceAll('\u00a0', ' ').indexOf(quote.replaceAll('\u00a0', ' '));
    if (quote && pos >= 0) {
      const mark = node('mark', '', source.slice(pos, pos + quote.length));
      view.append(document.createTextNode(source.slice(0, pos)), mark, document.createTextNode(source.slice(pos + quote.length)));
      $('quote-location').textContent = `${item.item_id} · Quoted source highlighted`;
      view.scrollTop = Math.max(0, mark.offsetTop - view.clientHeight / 3);
    } else {
      view.textContent = source;
      $('quote-location').textContent = `${item.item_id} · Quote not located in the displayed task sources; inspect the source quote and validation below.`;
    }
  }
  function downloadTask() {
    const t = state.task;
    if (!t) return;
    const url = URL.createObjectURL(new Blob([JSON.stringify(t, null, 2)], { type: 'application/json' }));
    const a = node('a'); a.href = url; a.download = `${t.benchmark}-${t.id}.json`; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function drawTask() {
    const t = state.task;
    $('drawer-task-id').textContent = t.id;
    highlightQuote(null);
    const select = $('run-select'); select.replaceChildren();
    t.runs.forEach((run, i) => {
      const option = node('option', '', `${i + 1}. ${outcome(run)} · ${run.label}`);
      option.value = String(i); select.append(option);
    });
    select.value = String(state.run); select.disabled = !t.runs.length;
    $('run-count').textContent = `${t.runs.length} archived runs · select a run to inspect its judgments`;
    $('source-paths').textContent = `Checklist: ${t.sources.checklist}\nTask: ${t.sources.instruction}\nGeneration prompt: ${t.prompt_version} · seed ${t.seed}\n\nPaths refer to the archived research source, not files on this website. Source SHA-256 hashes are in data/explorer/provenance.json.`;
    $('walk-index').textContent = `0 / ${t.items.length}`;
    drawScores(); drawCriteria(); drawRunList();
  }
  function drawScores() {
    const run = state.task.runs[state.run];
    $('raw-mode').setAttribute('aria-pressed', String(state.mode === 'raw'));
    $('anchored-mode').setAttribute('aria-pressed', String(state.mode === 'anchored'));
    $('mode-note').textContent = state.mode === 'raw'
      ? 'Log-only: Yes / (Yes + No). Abstain is excluded from the score, so read evidence coverage alongside it.'
      : 'With official outcome: assertion items become Yes on official PASS, and a separate final-outcome item is added. This is a different score.';
    const values = $('run-values');
    if (!run) { values.replaceChildren(node('p', '', 'No compatible run judgments are included for this checklist version.')); return; }
    $('run-identity').textContent = `${run.label} · ${run.condition}`;
    $('run-origin').textContent = `Judgments: ${run.source}${state.mode === 'raw' && run.raw_source ? `\nLog-only rejudgment: ${run.raw_source}` : ''}`;
    $('run-note').textContent = `${run.raw_note || ''}${run.truncated ? ' The evaluator received a truncated log.' : ''} Item-level rationales and trajectory excerpts are not stored in this export.`;
    const measure = run[state.mode];
    if (!values.children.length || values.children.length !== 3) {
      values.replaceChildren();
      ['Official outcome', 'Checklist score', 'Evidence coverage'].forEach(label => {
        const box = node('div', 'run-stat'); box.append(node('span', '', label), node('strong'), node('div', 'score-track'));
        box.lastChild.append(node('div', 'score-fill')); values.append(box);
      });
    }
    const boxes = [...values.children];
    boxes[0].querySelector('strong').textContent = outcome(run);
    boxes[0].querySelector('strong').className = run.official ? 'outcome-pass' : 'outcome-fail';
    boxes[0].querySelector('.score-track').hidden = true;
    boxes[1].querySelector('strong').textContent = measure ? percent(measure.score) : 'Not retained';
    boxes[1].querySelector('.score-fill').style.width = `${(measure?.score || 0) * 100}%`;
    boxes[1].querySelector('span').textContent = state.mode === 'raw' ? 'Log-only partial credit' : 'With official outcome';
    boxes[2].querySelector('strong').textContent = run.raw ? percent(run.raw.coverage) : 'Not retained';
    boxes[2].querySelector('.score-fill').style.width = `${(run.raw?.coverage || 0) * 100}%`;
    $('run-counts').textContent = measure ? `${measure.yes} Yes · ${measure.no} No · ${measure.abstain} Abstain${state.mode === 'anchored' ? ' · includes the final-outcome item' : ''}${measure.score == null ? ' · no decidable evidence; no score' : ''}` : 'Original log-only judgments are unavailable for this run; the outcome-inclusive archive does not recover them.';
    $('endpoint-note').hidden = state.mode !== 'anchored';
    $('endpoint-note').textContent = `Additional final-outcome item: ${run.official ? 'Yes (official PASS)' : 'No (official FAIL)'}. It is separate from the task’s ${state.task.items.length} checklist requirements.`;
  }
  function answerFor(item) {
    const run = state.task.runs[state.run];
    const list = state.mode === 'raw' ? run?.raw_answers : run?.anchored_answers;
    return list?.find(a => a.item_id === item.item_id);
  }
  function addField(parent, label, content, cls = '') {
    if (!content) return;
    parent.append(node('h4', '', label), node('p', cls, content));
  }
  function drawCriteria() {
    const list = $('criteria-list'); list.replaceChildren();
    state.task.items.forEach((item, i) => {
      const detail = node('details', 'criterion'); detail.dataset.item = String(i);
      const summary = node('summary');
      const answer = answerFor(item);
      const badge = node('span', `judgment ${(answer?.answer || 'unavailable').toLowerCase()}`, answer ? friendly[answer.answer] : 'Not retained');
      summary.append(node('span', 'criterion-id', item.item_id), node('span', 'criterion-title', item.requirement), badge);
      const body = node('div', 'criterion-body');
      addField(body, 'Quoted task requirement', item.source_quote, 'criterion-quote');
      const routes = { assertion: 'Existing verifier check', generated: 'Proposed deterministic check', judge: 'Requires judgment' };
      addField(body, 'Verification route', routes[item.verification_type] || item.verification_type);
      addField(body, 'How this item proposes to verify the requirement', item.verification);
      addField(body, 'Referenced check', item.verification_ref, 'check-ref');
      addField(body, 'Authoring notes', item.notes);
      if (item.validation) {
        const v = item.validation;
        addField(body, 'Recorded mechanical validation', `Source quote: ${v.a_quote ? 'pass' : 'flagged'} · requirement form: ${v.b_req ? 'pass' : 'flagged'} · check reference: ${v.c_ref ? 'pass' : 'flagged'}. These gates do not establish semantic correctness.`);
      }
      addField(body, 'Judgment provenance', answer
        ? answer.basis === 'official-pass-rule' ? 'Yes supplied by the official PASS postprocessing rule; not independent evidence from the execution log.' : 'Archived log-based judgment. No per-item rationale or execution excerpt is included in this record.'
        : 'The original log-only judgment for this item is not retained in this export. This is missing data, not an Abstain judgment.');
      detail.append(summary, body);
      detail.addEventListener('toggle', () => {
        if (detail.open) {
          list.querySelectorAll('details').forEach(other => { if (other !== detail) other.open = false; });
          state.item = i; $('walk-index').textContent = `${i + 1} / ${state.task.items.length}`;
          highlightQuote(item);
        }
      });
      summary.addEventListener('click', stop);
      list.append(detail);
    });
    if (state.item >= 0) list.children[state.item].open = true;
  }
  function chooseRun(i) {
    stop(); state.run = i; $('run-select').value = String(i);
    drawScores(); drawCriteria(); drawRunList();
  }
  function drawRunList() {
    const list = $('all-runs'); list.replaceChildren();
    state.task.runs.forEach((run, i) => {
      const value = run[state.mode]?.score;
      const b = button('', () => chooseRun(i), 'run-row');
      b.setAttribute('aria-pressed', String(state.run === i));
      b.append(node('span', 'run-row-label', `${i + 1}. ${run.label}`));
      const track = node('span', 'run-row-track'), fill = node('span'); fill.style.width = `${(value || 0) * 100}%`; track.append(fill);
      b.append(track, node('span', 'run-row-value', `${value == null ? '—' : percent(value)} · ${outcome(run)}`)); list.append(b);
    });
  }
  function selectItem(i) {
    const n = state.task?.items.length || 0; if (!n) return;
    state.item = Math.max(0, Math.min(n - 1, i));
    const details = $('criteria-list').children;
    [...details].forEach((d, j) => { d.open = j === state.item; });
    $('walk-index').textContent = `${state.item + 1} / ${n}`;
    highlightQuote(state.task.items[state.item]);
    $('criteria-list').scrollTop = details[state.item].offsetTop;
  }
  $('walk-play').addEventListener('click', () => {
    if (state.timer) { stop(); return; }
    selectItem(state.item >= state.task.items.length - 1 ? 0 : Math.max(0, state.item));
    $('walk-play').textContent = 'Ⅱ Pause'; $('walk-play').setAttribute('aria-pressed', 'true');
    state.timer = setInterval(() => {
      if (state.item >= state.task.items.length - 1) { stop(); return; }
      selectItem(state.item + 1);
    }, 3500);
  });
  $('walk-next').addEventListener('click', () => { stop(); selectItem(state.item + 1); });
  $('walk-prev').addEventListener('click', () => { stop(); selectItem(state.item - 1); });
  $('run-select').addEventListener('change', e => chooseRun(Number(e.target.value)));
  for (const mode of ['raw', 'anchored']) $(mode + '-mode').addEventListener('click', () => {
    stop(); state.mode = mode; drawScores(); drawCriteria(); drawRunList();
  });
  $('drawer-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    stop(); ++state.request; document.body.classList.remove('task-dialog-open'); state.returnFocus?.focus();
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  for (const [id, offset] of [['task-prev', -1], ['task-next', 1]]) $(id).addEventListener('click', () => {
    const tasks = filtered(), i = tasks.findIndex(t => t.id === state.task?.id);
    if (tasks.length) openTask(tasks[(i + offset + tasks.length) % tasks.length]);
  });
  $('task-download').addEventListener('click', downloadTask);
  $('task-search').addEventListener('input', e => { state.query = e.target.value.trim().toLowerCase(); if (index) drawGrid(); });
  document.addEventListener('gcpc:open-task', async event => {
    // Accept only a task present in the local exported index.
    if (!index) index = await getJSON('index.json');
    const spec = event.detail;
    const task = index.tasks.find(t => t.benchmark === spec.benchmark && t.id === spec.id);
    if (!task) return;
    state.benchmark = task.benchmark; state.query = ''; $('task-search').value = '';
    drawGrid(); openTask(task, spec.trigger);
  });
  async function initialize() {
    try {
      index = await getJSON('index.json');
      const tabs = $('benchmark-buttons'); tabs.replaceChildren();
      index.benchmarks.forEach(b => {
        const tab = button(`${b.label} · ${b.tasks}`, () => { state.benchmark = b.id; drawGrid(); }, 'benchmark-button');
        tab.dataset.benchmark = b.id; tabs.append(tab);
      });
      drawGrid();
    } catch (error) { $('task-tiles').replaceChildren(node('p', '', error.message), button('Retry', initialize)); }
  }
  initialize();
})();
