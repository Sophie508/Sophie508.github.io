/* Source evidence stays local; fonts are progressive enhancement. */
(() => {
  'use strict';
  const data = window.GCPC_CASE;
  const symbols = { PASSED: '✓', FAILED: '×', SKIPPED: '–' };
  const names = { PASSED: 'Passed', FAILED: 'Failed', SKIPPED: 'Skipped' };
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const reveal = document.getElementById('reveal-case');
  reveal.addEventListener('click', () => {
    const open = reveal.getAttribute('aria-expanded') !== 'true';
    reveal.setAttribute('aria-expanded', String(open));
    document.getElementById('case-reveal').hidden = !open;
    reveal.textContent = open ? 'Hide execution evidence ↑' : 'Inspect the execution evidence ↓';
  });
  const grid = document.getElementById('test-grid');
  data.runs.forEach(run => {
    const row = el('div', 'grid-row');
    const label = el('div', 'grid-label');
    label.append(el('strong', '', run.label));
    const count = status => run.tests.filter(t => t.status === status).length;
    label.append(el('small', '', `${count('PASSED')} pass / ${count('FAILED')} fail / ${count('SKIPPED')} skip`));
    const cells = el('div', 'test-cells');
    cells.setAttribute('role', 'group');
    cells.setAttribute('aria-label', `${run.label}: 26 verifier subtests`);
    run.tests.forEach((test, index) => {
      const cell = el('button', `test-cell ${test.status.toLowerCase()}`, symbols[test.status]);
      cell.type = 'button';
      cell.dataset.index = index;
      cell.setAttribute('aria-pressed', 'false');
      cell.setAttribute('aria-controls', 'test-detail');
      cell.setAttribute('aria-label', `${run.label}, test ${index + 1}, ${test.label}, ${names[test.status]}`);
      cell.title = `${index + 1}. ${test.label} · ${names[test.status]}`;
      cell.addEventListener('click', () => selectTest(index));
      cells.append(cell);
    });
    row.append(label, cells);
    grid.append(row);
  });
  function selectTest(index) {
    grid.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.index) === index)));
    const detail = document.getElementById('test-detail');
    detail.replaceChildren(el('p', 'detail-kicker', `VERIFIER / ${String(index + 1).padStart(2, '0')} OF 26`), el('h4', '', data.runs[0].tests[index].label));
    const results = el('div', 'detail-results');
    const sources = el('details');
    sources.append(el('summary', '', 'Read the original test output'));
    data.runs.forEach(run => {
      const test = run.tests[index];
      const label = el('p', '', run.label);
      label.append(el('span', `status-pill ${test.status.toLowerCase()}`, `${symbols[test.status]} ${names[test.status]}`));
      results.append(label);
      sources.append(el('code', '', `${run.label}\n${test.raw}`), el('span', 'source-location', `${run.source}/verifier/test_runner.stdout.log:${test.line}`));
    });
    detail.append(results, sources);
  }
  function codePair(panel, snippets, location) {
    const pair = el('div', 'code-pair');
    data.runs.forEach((run, index) => {
      const block = el('div');
      block.append(el('h4', '', run.label), el('pre', '', snippets[index]), el('span', 'source-location', location(run)));
      pair.append(block);
    });
    panel.append(pair);
  }
  const method = document.getElementById('panel-method');
  method.append(el('p', '', 'Without a skill, the run computes pandas aggregates and writes ordinary cells. After reading the xlsx guide, the skill-equipped run creates a pivot cache and native objects. These are excerpts from executed commands; […] marks omitted code, not a runnable program.'));
  codePair(method, data.runs.map(run => run.snippet), run => `${run.source}/agent/codex.jsonl:${run.traceLine}`);
  method.append(el('p', 'diagram-note', 'The curated trace records the xlsx/SKILL.md read and its returned content in agent/codex.jsonl, line 8. This establishes the observed sequence and implementation difference, not a causal effect by itself.'));
  const pivot = document.getElementById('panel-pivot');
  pivot.append(el('p', '', 'The verifier accesses each sheet’s _pivots[0]. The run without a skill raises IndexError in the relevant checks. The other run passes the row-field, aggregation, applicable column-field, and cache-field checks. These checks do not establish that every population total is numerically correct.'));
  codePair(pivot, ["pivot = workbook[sheet_name]._pivots[0]\nIndexError: list index out of range", 'Population row field: PASSED\nPopulation aggregation: PASSED\nPivot cache fields: PASSED'], run => `${run.source}/verifier/test_runner.stdout.log (test_pivot_row_is_state / test_pivot_cache_has_fields)`);
  const error = document.getElementById('panel-error');
  error.append(el('p', '', 'Both reports contain the string nan in Quarter, where the task requires Q1–Q4. This unresolved error prevents both runs from passing the full verifier. Creating the pivot object does not remove this error.'));
  codePair(error, data.runs.map(run => run.failure.text), run => `${run.source}/verifier/test_runner.stdout.log:${run.failure.line}`);
  error.append(el('p', 'diagram-note', 'These tests are not chronological task stages. The logs show later tests continuing after the Quarter check fails.'));
  const tabs = [...document.querySelectorAll('[role=tab]')];
  function activateTab(tab, focus = false) {
    tabs.forEach(item => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
    });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', event => {
      const targets = { ArrowRight: (index + 1) % tabs.length, ArrowLeft: (index + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1 };
      if (Object.hasOwn(targets, event.key)) {
        event.preventDefault();
        activateTab(tabs[targets[event.key]], true);
      }
    });
  });
  document.getElementById('task-instruction').textContent = data.instruction;
  const sources = document.getElementById('case-sources');
  sources.append(el('p', '', 'Two records with the same task, model and trial index, under no_skills and curated conditions. Their task instructions are identical. Only the excerpts needed for this case are included.'));
  data.runs.forEach(run => sources.append(el('p', '', `${run.label}: ${run.source}`)));
  sources.append(el('p', '', 'Counts come from the 26 parameterized test-result lines in stdout. The CTRF summary merges tests sharing function names and is not used for these counts. Source hashes and reproduction notes are recorded in data/case.js and README.md.'));
})();
