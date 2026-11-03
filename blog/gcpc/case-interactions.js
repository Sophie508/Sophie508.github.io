/* Concrete views of the requested artifact and two verified archived runs. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const el = (tag, cls, text) => {
    const e = document.createElement(tag); if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text; return e;
  };
  const button = (text, fn, cls) => { const b = el('button', cls, text); b.type='button'; b.addEventListener('click', fn); return b; };
  const sheets = [
    {short:'Population',name:'Population by State',question:'How many people live in each state?',rows:'STATE',values:'POPULATION_2023',operation:'SUM',meaning:'Group regions by state, then add their population values.',items:['S-02']},
    {short:'Earners',name:'Earners by State',question:'How many earners are in each state?',rows:'STATE',values:'EARNERS',operation:'SUM',meaning:'Group regions by state, then add their earner counts.',items:['S-03']},
    {short:'Regions',name:'Regions by State',question:'How many regions are in each state?',rows:'STATE',values:'SA2 regions',operation:'COUNT',meaning:'Group regions by state, then count the regions.',items:['S-04']},
    {short:'Income Quartile',name:'State Income Quartile',question:'How are earners distributed across income groups?',rows:'STATE',values:'EARNERS',operation:'SUM',columns:'Quarter · Q1 / Q2 / Q3 / Q4',meaning:'Group by state and income quartile. Quarter means an income group, not a calendar quarter.',items:['S-05']},
    {short:'SourceData',name:'SourceData',question:'Which data feeds the four pivot tables?',meaning:'Join the population and income records by SA2_CODE. Keep the original fields, add income groups, and calculate Total.',items:['S-06','S-07','S-08','S-09']}
  ];
  let checklist=null, sheet=0;
  function drawRequirements() {
    const target=$('sheet-items'); target.replaceChildren();
    if (!checklist) { target.textContent='Loading original checklist requirements…';return; }
    for (const id of sheets[sheet].items) {
      const item=checklist.items.find(x=>x.item_id===id), block=el('div','sheet-item');
      block.append(el('strong','',id),el('p','',item.requirement));
      if(item.notes) block.append(el('p','sheet-limit',item.notes));
      target.append(block);
    }
    target.append(el('p','sheet-limit','These are the archived generated criteria. The task instruction and verification limits remain available in the full task browser.'));
  }
  function drawSheet(i) {
    sheet=i; const spec=sheets[i], view=$('workbook-view');view.replaceChildren();
    $('sheet-selectors').querySelectorAll('button').forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));
    const intro=el('div','sheet-intro'); intro.append(el('p','mini-label',spec.name),el('h3','',spec.question),el('p','',spec.meaning));
    const fields=el('div','sheet-fields');
    if(spec.rows) {
      for(const [label,value] of [['Group rows by',spec.rows],['Measure',spec.values],['Calculate',spec.operation],...(spec.columns?[['Group columns by',spec.columns]]:[])]) {
        const field=el('div','sheet-field');field.append(el('span','',label),el('strong','',value));fields.append(field);
      }
    } else {
      for(const [label,value] of [['Join key','SA2_CODE'],['Income groups','Quarter → Q1–Q4'],['Calculated field','Total = EARNERS × MEDIAN_INCOME']]) {
        const field=el('div','sheet-field');field.append(el('span','',label),el('strong','',value));fields.append(field);
      }
    }
    view.append(intro,fields);$('sheet-requirements').open=false;drawRequirements();
  }
  sheets.forEach((spec,i)=>$('sheet-selectors').append(button(spec.short,()=>drawSheet(i),'sheet-tab')));
  drawSheet(0);
  fetch('data/explorer/skillsbench/sales-pivot-analysis.json').then(r=>{if(!r.ok)throw new Error('Checklist unavailable');return r.json();}).then(d=>{
    checklist=d;drawRequirements();
    const item=d.items.find(x=>x.item_id==='S-01'), detail=$('workbook-delivery-detail');
    detail.replaceChildren(el('p','',item.requirement),el('blockquote','anatomy-quote',item.source_quote),el('p','sheet-limit',item.verification),el('p','sheet-limit','Verification route: generated. This describes the proposed file check; it is not a recorded pass result.'));
  }).catch(()=>{
    const message='The archived checklist could not be loaded. Reload to retry.';
    $('sheet-items').textContent=message;$('workbook-delivery-detail').textContent=message;
  });

  const data=window.GCPC_CASE;
  const comparisons=[
    {label:'1 · The file structure',question:'Did the run create a native Excel PivotTable?',kind:'structure',takeaways:['Computed summaries are written into ordinary cells.','The code creates a pivot cache and native PivotTable objects.']},
    {label:'2 · The row field',question:'Can the verifier find STATE as the pivot’s row field?',kind:'field',test:0,takeaways:['The check cannot inspect a pivot row field because the expected object is absent.','The verifier finds the pivot and accepts its STATE row field.']},
    {label:'3 · The shared error',question:'Does Quarter contain only the required income-group labels?',kind:'error',test:21,takeaways:['The invalid value remains. The official verifier returns FAIL.','The same invalid value remains. Creating a PivotTable does not fix it.']}
  ];
  let current=0;
  function sketch(index,kind) {
    const box=el('div','artifact-mini');
    if(kind==='error') {
      box.append(el('span','artifact-label','Quarter · observed invalid string'),el('strong','invalid-value','nan'),el('p','','Required labels: Q1, Q2, Q3, Q4'));
    } else if(index===0) {
      box.append(el('span','artifact-label','Population by State'),el('strong','','Ordinary summary cells'));
      const rows=el('div','sketch-rows');rows.setAttribute('aria-hidden','true');
      for(let j=0;j<3;j++)rows.append(el('span'),el('i'));box.append(rows,el('small','','Native pivot object: absent'));
    } else {
      box.append(el('span','artifact-label','Population by State'),el('strong','','Native PivotTable'));
      const flow=el('div','pivot-flow');flow.append(el('span','','SourceData'),el('span','','→'),el('span','','Pivot cache'),el('span','','→'),el('span','','PivotTable'));
      box.append(flow,el('p','','Rows: STATE · Values: POPULATION_2023 · SUM'));
    }
    return box;
  }
  function drawPair(i) {
    current=(i+comparisons.length)%comparisons.length;
    const spec=comparisons[current];$('pair-question').textContent=spec.question;
    $('pair-selectors').querySelectorAll('button').forEach((b,j)=>b.setAttribute('aria-pressed',String(j===current)));
    $('pair-position').textContent=`${current+1} / ${comparisons.length}`;
    const cards=$('pair-cards');cards.replaceChildren();
    data.runs.forEach((run,j)=>{
      const card=el('article','pair-card');card.append(el('p','mini-label',run.label.toUpperCase()),sketch(j,spec.kind));
      if(spec.test!==undefined){const test=run.tests[spec.test];card.append(el('p',`pair-verdict ${test.status==='PASSED'?'passed':'failed'}`,`Verifier subtest: ${test.status}`));}
      else card.append(el('p','pair-verdict','Observed implementation'));
      card.append(el('p','pair-meaning',spec.takeaways[j]));
      const evidence=el('details','pair-evidence');evidence.append(el('summary','','Read the recorded evidence'));
      if(spec.kind==='structure'){
        evidence.append(el('pre','',run.snippet),el('span','source-location',`${run.source}/agent/codex.jsonl:${run.traceLine}`));
      } else {
        const test=run.tests[spec.test];evidence.append(el('pre','',test.raw),el('span','source-location',`${run.source}/verifier/test_runner.stdout.log:${test.line}`));
        if(spec.kind==='error')evidence.append(el('pre','',run.failure.text),el('span','source-location',`${run.source}/verifier/test_runner.stdout.log:${run.failure.line}`));
      }
      card.append(evidence);cards.append(card);
    });
  }
  comparisons.forEach((spec,i)=>$('pair-selectors').append(button(spec.label,()=>drawPair(i))));
  $('pair-prev').addEventListener('click',()=>drawPair(current-1));$('pair-next').addEventListener('click',()=>drawPair(current+1));
  drawPair(0);
})();
