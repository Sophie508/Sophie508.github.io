'use strict';
(() => {
  const D=window.TENDER_DATA,$=id=>document.getElementById(id);
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt=n=>Number(n).toLocaleString('en',{maximumFractionDigits:2});
  const pct=n=>{const v=Math.round(n*100);return (v>0?'+':'')+v+'%';};
  const unit=u=>u==='m2'?'m²':u==='nr'?'No.':u;
  const press=(key,val)=>document.querySelectorAll(`[data-${key}]`).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset[key]===String(val))));
  const titleSVG=(label,body)=>`<title>${esc(label)}</title>${body}`;
  document.querySelectorAll('[data-source]').forEach(a=>{a.href='source-notes.html#'+encodeURIComponent(a.dataset.source);a.title=a.dataset.source;});
  const updateProgress=()=>{const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('.reading-progress').style.width=(max>0?100*scrollY/max:0)+'%';};
  window.addEventListener('scroll',updateProgress,{passive:true});updateProgress();

  let geometryState=0,timer=null;
  const geomNotes=[
    'Stone wraps around the opening. The surfaces facing inward disappear in a front view.',
    'The green front face is visible. The elevation alone does not tell us the return depth.',
    'An unfolded-area rule adds the included sides and returns. Each physical face is counted once.',
    'The front-area remeasurement leaves a gap. We return to the hidden surfaces at the end.'
  ];
  // The same schematic is reused throughout; its dimensions encode no building measurements.
  function surround(depth=1, flat=false){
    const t=flat?0:Math.max(0,depth)*24;
    return `<path d="M110 65H410V275H110Z M175 120V220H345V120Z" fill="#88ad9c" fill-rule="evenodd" stroke="#386d56" stroke-width="2"/>
      <rect x="175" y="120" width="170" height="100" fill="#f5f7f6"/>
      <path d="M175 120H345L${345-t} ${120+t}H${175+t}Z M175 120L${175+t} ${120+t}V${220-t}L175 220Z M345 120V220L${345-t} ${220-t}V${120+t}Z M175 220H345L${345-t} ${220-t}H${175+t}Z" fill="#d5b674" stroke="${t?'#b69960':'none'}" stroke-width="1"/>
      <text x="260" y="97" text-anchor="middle">Stone front face</text><text x="260" y="178" text-anchor="middle" style="font-size:13px">Opening</text>
      ${t?'<path d="M333 180H460V306" fill="none" stroke="#b69960"/><text x="325" y="330" fill="#8b7039">Sides + returns</text>':'<text x="260" y="320" text-anchor="middle">Depth is absent from this view.</text>'}`;
  }
  function unfolded(){return `<path d="M155 100H365V250H155Z M205 145V205H315V145Z" fill="#88ad9c" fill-rule="evenodd" stroke="#386d56"/>
    <rect x="105" y="100" width="40" height="150" fill="#d5b674"/><rect x="375" y="100" width="40" height="150" fill="#d5b674"/><rect x="155" y="50" width="210" height="40" fill="#ead7ae"/><rect x="155" y="260" width="210" height="40" fill="#ead7ae"/>
    <path d="M155 95H365 M150 100V250 M370 100V250 M155 255H365" stroke="#aa9467" stroke-dasharray="5 5" fill="none"/>
    <text x="260" y="128" text-anchor="middle">Front</text><text x="125" y="180" text-anchor="middle" transform="rotate(-90 125 180)">Side</text><text x="395" y="180" text-anchor="middle" transform="rotate(-90 395 180)">Side</text><text x="260" y="77" text-anchor="middle">Return</text><text x="260" y="286" text-anchor="middle">Return</text><text x="260" y="336" text-anchor="middle">Separate the surfaces. Count each once.</text>`;}
  function drawGeometry(n){geometryState=n;press('geometry',n);
    let body=n===0?surround():n===1?surround(0,true):unfolded();
    if(n===3)body=`<text x="35" y="48" class="tick">STONE · INDEPENDENT FRONT-AREA REMEASUREMENT</text><text x="35" y="96">Four elevations → front-facing polygons</text><text x="35" y="148" style="font-size:32px;fill:#356c5f">≈ 239 m²</text><text x="35" y="181">Front area across the four elevations</text><line x1="35" x2="485" y1="207" y2="207" stroke="#d3dfd7"/><text x="35" y="249">Supplied reference: 350 m²</text><text x="35" y="291">What surfaces could account for the gap?</text>`;
    $('geometry').innerHTML=titleSVG(['Stone window surround, schematic','Stone front elevation, schematic','Unfolded included surfaces, schematic','Independent front-area remeasurement'][n],body);$('geometry-note').textContent=geomNotes[n];
  }
  function stopGeometry(){clearInterval(timer);timer=null;$('geometry-play').textContent='▶ Unfold';$('geometry-play').setAttribute('aria-pressed','false');}
  $('geometry-play').addEventListener('click',()=>{if(timer)return stopGeometry();drawGeometry(0);$('geometry-play').textContent='Ⅱ Pause';$('geometry-play').setAttribute('aria-pressed','true');timer=setInterval(()=>{drawGeometry(geometryState+1);if(geometryState===3)stopGeometry();},2400);});
  document.querySelectorAll('[data-geometry]').forEach(b=>b.addEventListener('click',()=>{stopGeometry();drawGeometry(+b.dataset.geometry);}));
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stopGeometry();});drawGeometry(0);

  let condition='baseline',selectedRow='3.1',selectedModel='Astra';
  const rowById=Object.fromEntries(D.rows.map(r=>[r.id,r]));
  const rowLabels={'1.1':'Fritted glass','1.2':'Glass / timber backpan','1.3':'Fritted glass','1.4':'Glass / backpan','2.1':'Steel portal wraps','2.2':'Steel panels & frames','2.3':'Steel column wraps','3.1':'Stone cladding','3.2':'Stone corner feature','3.3':'Aluminium eave trim','3.4':'Granite skirting','4':'Roof cladding','5':'Roof trellis','6.1':'Curved canopy','6.2':'Canopy ceiling','6.3':'Canopy column wraps','7':'Double-bank louver','7.1':'Transom above louver','8':'Covered linkway','9':'Skylight','9.2':'Inner steel cladding','10':'Glass railing','11.1':'Double sliding door','11.2':'Steel swing door','11.3':'Single sliding door','11.4':'Framed-glass swing door'};
  const category=c=>c.err===null?'unavailable':Math.abs(c.err)<.005?'zero-band':c.err<0?'under':'over';
  const errorStyle=c=>{
    if(c.err===null)return '';
    const intensity=Math.min(Math.abs(c.err),1), pale=[247,248,246],end=c.err<0?[76,126,114]:[181,103,81];
    const rgb=pale.map((n,i)=>Math.round(n+(end[i]-n)*intensity));
    return `background:rgb(${rgb.join(',')});color:${intensity>.72?'#fff':'#23392e'}`;
  };
  const cellText=c=>c.err===null?'—':pct(c.err);
  const cellDescription=c=>c.err!==null?`${pct(c.err)} signed error; agent quantity ${fmt(c.pred)}`:c.status==='NO_MAPPING'?'Missing: no mapped row':'Listed, but not comparable';
  const countWithin=(v,ids)=>D.models.reduce((total,m)=>total+ids.filter(id=>{const e=D.cells[v][m][id].err;return e!==null&&Math.abs(e)<=.3;}).length,0);
  const conditionNotes={baseline:'Curated package · 12 PDFs · reference quantities withheld',digest:'Baseline + machine-generated sheet digest · geometry without metre conversion',raw:'Raw folder · 331 files / 3,102 pages · includes revisions and a longer budget',expert:'Baseline + final operational expert rules · Muse also uses draft-first continuation'};
  $('conditions').innerHTML=D.variants.map(v=>`<button data-condition="${v.id}" aria-pressed="false">${v.label}</button>`).join('');
  function showCell(){
    const r=rowById[selectedRow],c=D.cells[condition][selectedModel][selectedRow],label=D.variants.find(v=>v.id===condition).label;
    document.querySelectorAll('[data-cell-row]').forEach(b=>b.classList.toggle('selected',b.dataset.cellRow===selectedRow&&b.dataset.cellModel===selectedModel));
    const status=c.err===null?(c.status==='NO_MAPPING'?'Not listed / no mapped row':'Listed, but not comparable'):(c.err>0?'+':'')+(100*c.err).toFixed(2)+'% signed error';
    $('cell-detail').innerHTML=`<span class="eyebrow">ITEM ${r.id} · ${esc(selectedModel)}</span><h4 title="${esc(r.name)}">${esc(rowLabels[r.id])}</h4><p>${label}</p><div class="measure">${esc(status)}</div><dl><div><dt>Reference</dt><dd>${fmt(r.reference)} ${unit(r.unit)}</dd></div><div><dt>Agent quantity</dt><dd>${c.err!==null?fmt(c.pred)+' '+unit(r.unit):'No comparable quantity'}</dd></div></dl><p>Rule group: ${r.rules.length?r.rules.join(' / '):'outside the targeted set'}.</p><small>One selected run. Negative error means below this reference.</small>`;
  }
  function drawMatrix(){press('condition',condition);$('condition-note').textContent=conditionNotes[condition];
    const cues={baseline:'Start at stone (3.1): most selected runs are low, but Muse is above the reference.',digest:'Stone (3.1) converges below the reference across all six configurations.',raw:'Steel panels & frames (2.2) remain more than 30% away. This condition also changes revisions and budget.',expert:'Highlighted rows gain within-30% cells: 2.1, 0→4; 6.3, 1→4; 7, 1→5; 8, 0→3. Stone still varies.'};
    $('condition-cue').textContent=cues[condition];
    $('matrix').querySelector('thead').innerHTML='<tr><th scope="col">Reference item</th>'+D.models.map(m=>`<th scope="col">${m.replace(' + skill','<br>+ skill')}</th>`).join('')+'</tr>';
    $('matrix').querySelector('tbody').innerHTML=D.rows.map(r=>`<tr class="${(condition==='expert'?['2.1','6.3','7','8']:condition==='raw'?['2.2']:['3.1']).includes(r.id)?'highlight-row':''}"><th scope="row" title="${esc(r.name)}">${r.id} · ${esc(rowLabels[r.id])}</th>${D.models.map(m=>{const c=D.cells[condition][m][r.id],cat=category(c),text=cellText(c);return `<td><button class="${cat}" style="${errorStyle(c)}" data-cell-row="${r.id}" data-cell-model="${m}" aria-label="${esc(rowLabels[r.id])}, ${m}, ${esc(cellDescription(c))}" title="${m} · ${r.id}: ${esc(cellDescription(c))}">${text}</button></td>`;}).join('')}</tr>`).join('');
    const values=Object.values(D.cells[condition]).flatMap(Object.values),within=values.filter(c=>c.err!==null&&Math.abs(c.err)<=.3).length,missing=values.filter(c=>c.status==='NO_MAPPING').length,far=values.filter(c=>c.err!==null&&Math.abs(c.err)>.3).length,inc=156-within-missing-far;
    $('matrix-summary').innerHTML=[[within,'within 30%'],[far,'more than 30% away'],[missing,'missing'],[inc,'incomparable']].map(([n,l])=>`<span><b>${n}<small> / 156</small></b>${l}</span>`).join('');
    document.querySelectorAll('[data-cell-row]').forEach(b=>b.addEventListener('click',()=>{selectedRow=b.dataset.cellRow;selectedModel=b.dataset.cellModel;showCell();}));showCell();
  }
  document.querySelectorAll('[data-condition]').forEach(b=>b.addEventListener('click',()=>{condition=b.dataset.condition;drawMatrix();}));drawMatrix();

  // A compact, non-interactive context view avoids 36 extra tab stops in the story.
  const overviewIds=['1.1','1.3','1.4','2.2','3.1','7'];
  $('baseline-matrix').querySelector('thead').innerHTML='<tr><th scope="col">Reference item</th>'+D.models.map(m=>`<th scope="col">${m.replace(' + skill','<br>+ skill')}</th>`).join('')+'</tr>';
  $('baseline-matrix').querySelector('tbody').innerHTML=overviewIds.map(id=>`<tr class="${id==='3.1'?'highlight-row':''}"><th scope="row" title="${esc(rowById[id].name)}">${id} · ${rowLabels[id]}</th>${D.models.map(m=>{const c=D.cells.baseline[m][id];return `<td title="${esc(cellDescription(c))}"><span class="matrix-value ${category(c)}" style="${errorStyle(c)}" aria-label="${esc(cellDescription(c))}">${cellText(c)}</span></td>`;}).join('')}</tr>`).join('');

  function drawRepeat(){const narrow=matchMedia('(max-width:760px)').matches;const values=D.solRepeats['v4.0 no skill']['3.1'].signed_errors,x=v=>(narrow?65:180)+(v+1)*(narrow?250:620);$('repeat-chart').setAttribute('viewBox',`0 0 ${narrow?350:900} 240`);
    const low=Math.min(...values),high=Math.max(...values);
    let body=`<rect x="${x(low)}" y="20" width="${Math.max(3,x(high)-x(low))}" height="170" fill="#edf2ef"/>`+[-1,-.75,-.5,-.25,0].map(v=>`<line class="${v===0?'zero':'axis'}" x1="${x(v)}" x2="${x(v)}" y1="20" y2="190"/><text class="tick" x="${x(v)}" y="220" text-anchor="middle">${Math.round(v*100)}%</text>`).join('');
    values.forEach((e,i)=>{const y=48+i*59;body+=`<text class="chart-name" x="20" y="${y+5}">Run ${i+1}</text><line x1="${x(e)}" x2="${x(0)}" y1="${y}" y2="${y}" stroke="#d8e5dd" stroke-width="3"/><circle cx="${x(e)}" cy="${y}" r="7" fill="#4d8267"/><text class="data-label" x="${x(e)-15}" y="${y+5}" text-anchor="end">${pct(e)}</text>`;});
    $('repeat-chart').innerHTML=titleSVG(`Stone cladding: three Sol runs ${values.map(pct).join(', ')}. Shading is their observed range.`,body);
    $('repeat-note').textContent='All three are below the reference. The pale strip marks only their observed range—not an expected random-error band.';
  }
  drawRepeat();
  let digestCondition='baseline';
  function drawDigest(){press('digest',digestCondition);const narrow=matchMedia('(max-width:760px)').matches;const id='3.1',r=rowById[id],max=500,x=n=>(narrow?100:175)+n/max*(narrow?210:630);$('digest-chart').setAttribute('viewBox',`0 0 ${narrow?350:900} 350`);
    let body=[0,100,200,300,400,500].map(v=>`<line class="axis" x1="${x(v)}" x2="${x(v)}" y1="10" y2="295"/><text class="tick" x="${x(v)}" y="325" text-anchor="middle">${v}</text>`).join('')+`<line class="zero" x1="${x(r.reference)}" x2="${x(r.reference)}" y1="10" y2="295"/><text class="tick" x="${x(r.reference)}" y="344" text-anchor="middle">Reference ${fmt(r.reference)} m²</text>`;
    D.models.forEach((m,i)=>{const c=D.cells[digestCondition][m][id],y=35+i*48;body+=`<text class="chart-name" x="8" y="${y+5}">${m}</text>`;if(c.err===null){body+=`<text class="tick" x="185" y="${y+5}">No comparable quantity</text>`;return;}body+=`<circle cx="${x(c.pred)}" cy="${y}" r="7" fill="${m.includes('skill')?'white':'#50846c'}" stroke="#50846c" stroke-width="2"/><text class="data-label" x="${x(c.pred)+13}" y="${y+5}">${fmt(c.pred)}</text>`;});
    $('digest-chart').innerHTML=titleSVG(`Stone cladding: ${digestCondition==='baseline'?'baseline':'with sheet digest'} quantities in square metres`,body);
    $('digest-note').textContent=digestCondition==='baseline'?'The baseline contains both underestimates and an overestimate.':'The digest brings all six close to each other, still below the reference. Shared input resolves some disagreement, not the missing area.';
  }
  document.querySelectorAll('[data-digest]').forEach(b=>b.addEventListener('click',()=>{digestCondition=b.dataset.digest;drawDigest();}));drawDigest();
  function drawPattern(which){press('pattern',which);$('repeat-view').hidden=which!=='repeat';$('digest-view').hidden=which!=='digest';}
  document.querySelectorAll('[data-pattern]').forEach(b=>b.addEventListener('click',()=>drawPattern(b.dataset.pattern)));

  const rules={
    A:['Developed area','Measure the unfolded surface.','Area-measured wraps include sides and returns, not only the front projection.','Read the depth from a plan, section, or detail. Add each included return, and count each physical face only once.'],
    B:['Units & assemblies','Narrow members use linear metres; a group forming a surface uses area.','A line-like element and an assembled surface need different units.','Classify the element first. For a wrapped column, inspect its exposed perimeter and height; do not substitute a length for an area.'],
    C:['Glass boundary','Measure the structural opening; if framed, use the frame edge.','The measurement boundary includes the frame, not only glass panes.','Measure opening widths to the outer frame and combine them with figured heights. Check whether colored regions omit door openings.'],
    D:['Color & geometry','Measure the drawing geometry; the canopy’s rectangular louver leaves additional aluminium wrapping.','Use geometry for unlabelled extents and include the separately wrapped area.','Calibrate against a stated dimension. Measure the relevant polygon and identify the wrapping around the rectangular louver separately.'],
    E:['Linear trims','Eaves, corner features, and transoms belong to the façade and use linear metres.','Keep these trims as separate line items.','Search all elevations for each trim type, trace its full length, and keep its quantity in metres.'],
    F:['Door counts','Separate external from internal doors; unspecified motorization is treated as motorized.','The early wording translated pricing advice into component and glass quantities.','Retain a door count by leaf count, operation, and construction. An optional glass-area line must not replace the door count.'],
    G:['Scope','Roof cladding, roof trellis, and covered linkway belong to the façade scope.','These systems must remain in scope.','Find and measure them explicitly rather than omitting them as unrelated work.']
  };
  function ruleContent(k){const r=rules[k];return `<div class="rule-copy"><p class="eyebrow">SPECIALIST ANSWER</p><h4>${r[1]}</h4><p class="small">First translation: ${r[2]}</p><p class="eyebrow">MAKE IT EXECUTABLE</p><p>${r[3]}</p></div><details><summary>Original reply and tracked items</summary>${D.expertQuotes[k].map(q=>`<p lang="zh">${esc(q)}</p>`).join('')}<p class="small">Tracked rows: ${D.ruleRows[k].map(id=>`${id} · ${rowLabels[id]}`).join('; ')}.</p></details>`;}
  $('rule-detail').innerHTML=ruleContent('A');
  $('rule-geometry').innerHTML=titleSVG('Schematic unfolded surfaces: include each side and return once',unfolded());
  $('other-rules').innerHTML=Object.entries(rules).filter(([k])=>k!=='A').map(([k,r])=>`<details><summary>${k} · ${r[0]}</summary>${ruleContent(k)}</details>`).join('');
  function drawChanges(){const k=$('change-rule').value,rows=D.rows.filter(r=>k==='all'||k==='largest'?r.rules.length:r.rules.includes(k));if(k==='largest')rows.sort((a,b)=>Math.abs(countWithin('expert',[b.id])-countWithin('baseline',[b.id]))-Math.abs(countWithin('expert',[a.id])-countWithin('baseline',[a.id]))).splice(6);$('change-table').querySelector('tbody').innerHTML=rows.map(r=>{const a=countWithin('baseline',[r.id]),b=countWithin('expert',[r.id]),delta=b-a;return `<tr><td title="${esc(r.name)}">${r.id} · ${esc(rowLabels[r.id])}</td><td><span class="bar"><i style="width:${a/6*100}%"></i></span>${a}</td><td><span class="bar"><i style="width:${b/6*100}%"></i></span>${b}</td><td class="${delta>0?'delta-positive':delta<0?'delta-negative':''}">${delta>0?'+':''}${delta}</td></tr>`;}).join('');}
  $('change-rule').addEventListener('change',drawChanges);drawChanges();
  function drawAstra(){const narrow=matchMedia('(max-width:760px)').matches;const key=$('astra-metric').value,factor=key==='composite'?100:1,max=key==='composite'?100:26,x=v=>(narrow?105:200)+v/max*(narrow?160:590);$('astra-chart').setAttribute('viewBox',`0 0 ${narrow?350:900} 250`);
    let body=(key==='composite'?[0,25,50,75,100]:[0,5,10,15,20,25]).map(v=>`<line class="axis" x1="${x(v)}" x2="${x(v)}" y1="20" y2="190"/><text class="tick" x="${x(v)}" y="224" text-anchor="middle">${v}</text>`).join('');
    ['baseline','expert'].forEach((v,i)=>{const m=D.astraRepeats[v][key],y=65+i*90;body+=`<text class="chart-name" x="10" y="${y+5}">${i?'+ Expert rules':'Baseline'}</text><line x1="${x(m.min*factor)}" x2="${x(m.max*factor)}" y1="${y}" y2="${y}" stroke="#a8bfae" stroke-width="3"/>${m.values.map((n,j)=>`<circle cx="${x(n*factor)}" cy="${y+(j-1)*11}" r="6" fill="${i?'#38745b':'#9eada4'}"><title>Run ${j+1}: ${fmt(n*factor)}</title></circle>`).join('')}<text class="data-label" x="${x(m.max*factor)+20}" y="${y+5}">mean ${fmt(m.mean*factor)}</text>`;});
    $('astra-chart').innerHTML=titleSVG('Three Astra runs per condition, showing the observed range',body);const a=D.astraRepeats.baseline[key],b=D.astraRepeats.expert[key];$('astra-note').textContent=key==='composite'?'Every displayed expert-condition run scores above every baseline run. Switch measures to inspect how many of the 26 quantities are close.':'More quantities fall within 25% of the reference in each expert-condition run. Counts use all 26 rows, including missing ones.';
  }
  $('astra-metric').addEventListener('change',drawAstra);drawAstra();

  const traceNotes={
    astra_base:[['Inventory the package','No expert clarification file in this baseline.'],['Notice drawing discrepancies','The visible record identifies conflicts and separate metal elements.'],['Measure color; trace portal centerlines','Glass excludes uncolored openings. Portal quantities are reported in metres, so they do not match the reference unit.'],['Deliver the files','The selected run ends after about 27 minutes.']],
    astra_expert:[['Open the expert guidance','Rules are available from the start.'],['Change the measurement boundary','The progress message explicitly calls for frames, reveals, and soffits.'],['Restore uncolored door openings','The record says to add those openings into glass quantities and count the doors separately.'],['Write a different calculation','Outer-frame widths × figured heights; portal developed width uses 0.778 m depth + 0.05 m front. Stone still uses front faces.'],['Deliver the files','The selected run ends after about 28 minutes.']],
    sol_base:[['Inventory the package','No expert guidance in this baseline.'],['Match material codes to colors','The subsequent calculations use these colored regions.'],['Use calibrated front-face areas','Colored area minus legend swatch, divided by the scale conversion.'],['Deliver the files','The selected run ends after about 9 minutes.']],
    sol_expert:[['Open the expert guidance','Reading the rules happens at the beginning.'],['Treat color as the opening boundary','The visible message calls the color extent the structural-opening / front-face basis.'],['Add assumed returns','The portal calculation adds a 0.300 m assumed return depth; column geometry also changes.'],['Deliver the files','About 10 minutes. The portal depth remains an assumption.']],
    muse_base:[['Inventory the package','No expert guidance in this baseline.'],['Prefer written dimensions to color','The analysis records a decision not to trust the colored regions for direct area measurement.'],['Stop before delivering','The harness issues a continuation request.'],['Estimate dimensions and proportions','Calculations include estimated proportions rather than a completed calibrated area trace.'],['Deliver the files','About 32 minutes including continuation.']],
    muse_expert:[['Open the expert guidance','The selected run has expert rules and draft-first continuation.'],['Attempt calibrated measurement','The record repeatedly announces a measurement plan.'],['Save a provisional takeoff','At 28.1 minutes, the visible message switches to saving dimension-based deliverables first.'],['Stop with provisional estimates','The selected run ends at about 39 minutes without completing the planned refinement.']]
  };
  function drawTrace(){const model='astra';$('trace-columns').innerHTML=['base','expert'].map(v=>{const key=model+'_'+v;return `<section class="trace-column"><h4>${v==='base'?'Baseline':'+ Expert rules'}</h4>${D.traces[key].map((step,i)=>`<article class="trace-event"><span class="time">${fmt(step.minute)} MIN · STEP ${step.step}</span><b>${traceNotes[key][i][0]}</b><p>${traceNotes[key][i][1]}</p>${step.quote?`<details><summary>Read the recorded progress message</summary><blockquote>${esc(step.quote)}</blockquote></details>`:'<p class="small">Tool-only event; no visible progress message.</p>'}</article>`).join('')}</section>`;}).join('');}
  drawTrace();
  function drawBoundary(which){const expert=which==='expert';press('boundary',which);
    const panes='<rect x="110" y="110" width="85" height="150"/><rect x="215" y="110" width="85" height="150"/>';
    $('boundary-diagram').innerHTML=titleSVG(expert?'Glass measurement includes outer frame and uncolored door opening':'Glass measurement follows colored panes only',`<rect x="75" y="70" width="390" height="230" rx="3" fill="#f4f5f3" stroke="#b6c5bd"/><rect x="95" y="95" width="350" height="180" fill="${expert?'#d6e7de':'white'}" stroke="#6a8b7d" stroke-width="${expert?4:1}"/><g fill="#88ad9c">${panes}</g><rect x="320" y="110" width="105" height="150" fill="none" stroke="#8d9e95" stroke-dasharray="5 5"/><circle cx="410" cy="195" r="3" fill="#8d9e95"/><text x="260" y="43" text-anchor="middle">Same framed opening</text><text x="205" y="205" text-anchor="middle" style="font-size:12px">Colored panes</text><text x="372" y="180" text-anchor="middle" style="font-size:12px">Uncolored</text><text x="372" y="198" text-anchor="middle" style="font-size:12px">door opening</text>${expert?'<rect x="95" y="95" width="350" height="180" fill="none" stroke="#356c5f" stroke-width="4"/>':''}<text x="260" y="333" text-anchor="middle">${expert?'Count the opening to the outer frame.':'Count only the green pane regions.'}</text>`);
    $('boundary-step').textContent=expert?'2.6 MIN · STEP 24 → 8.0 MIN · STEP 44':'24.0 MIN · STEP 36';
    $('boundary-title').textContent=expert?'A wider boundary, then the missing opening.':'A colored region stands in for the item.';
    $('boundary-note').textContent=expert?'The recorded message names frames, reveals, and soffits. A later step adds uncolored door openings into glass quantities and counts doors separately.':'The baseline uses colored glass areas. Uncolored openings stay outside that area; the measurement boundary follows the markup.';
  }
  document.querySelectorAll('[data-boundary]').forEach(b=>b.addEventListener('click',()=>drawBoundary(b.dataset.boundary)));drawBoundary('base');

  function drawDepth(){const d=+$('depth').value/100,front=239,added=451*d,total=front+added,x=n=>n/500*380;$('depth-value').textContent=d.toFixed(2)+' m';$('depth').setAttribute('aria-valuetext',d.toFixed(2)+' metres, assumed depth');$('depth-geometry').innerHTML=titleSVG(`Stone surround, schematic, assumed return depth ${d.toFixed(2)} metres`,surround(d*3,d===0));
    $('depth-chart').innerHTML=titleSVG(`Hypothetical total ${fmt(total)} square metres, reference 350`, `<text x="0" y="28" class="tick">Illustrative area (m²)</text><rect x="0" y="55" width="${x(front)}" height="30" rx="3" fill="#7a9e89"/><rect x="${x(front)}" y="55" width="${x(added)}" height="30" fill="#d4b77c"/><line x1="${x(350)}" x2="${x(350)}" y1="40" y2="108" stroke="#526d5c" stroke-dasharray="4 5"/><text x="0" y="127" class="tick">239 front + ${fmt(added)} assumed returns</text><text x="${x(350)}" y="155" text-anchor="middle" class="tick">Reference 350</text><text x="0" y="188" class="data-label">Hypothetical total: ${fmt(total)} m²</text>`);
    $('depth-note').textContent=d===0?'Front faces alone leave the gap open.':Math.abs(total-350)<5?'The arithmetic nearly closes the gap. The drawing still has to establish that these returns exist.':'Changing the assumed depth changes the proposed missing area.';
  }
  // Existing article links may target content now inside native disclosures.
  function revealHash(){const id=decodeURIComponent(location.hash.slice(1));if(!id)return;
    if(id==='digest')drawPattern('digest');
    const target=$(id);if(!target)return;
    for(let node=target;node;node=node.parentElement)if(node.tagName==='DETAILS')node.open=true;
    requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));
  }
  matchMedia('(max-width:760px)').addEventListener('change',()=>{drawRepeat();drawDigest();drawAstra();});
  window.addEventListener('hashchange',revealHash);revealHash();
  document.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',updateProgress));
  $('depth').addEventListener('input',drawDepth);$('depth-gap').addEventListener('click',()=>{$('depth').value=25;drawDepth();});drawDepth();
})();
