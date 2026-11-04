'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const pressed = (key, value) => document.querySelectorAll(`[data-${key}]`).forEach(b => b.setAttribute('aria-pressed', String(b.dataset[key] === String(value))));
  const players = [];
  function player(id, label, advance, delay = 2400) {
    let timer = null;
    const button = $(id);
    function stop() { clearInterval(timer); timer = null; button.textContent = `▶ ${label}`; button.setAttribute('aria-pressed', 'false'); }
    button.addEventListener('click', () => {
      if (timer) return stop();
      players.forEach(p => p.stop());
      button.textContent = 'Ⅱ Pause'; button.setAttribute('aria-pressed', 'true');
      timer = setInterval(() => { if (advance() === false) stop(); }, delay);
    });
    const controls = {stop}; players.push(controls); return controls;
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) players.forEach(p => p.stop()); });
  const hero = {
    result: '<span class="status">TASK OUTCOME</span><h3>A reproduction.<br>Still no parser fix.</h3><p>The agent submitted a file that reproduces the issue. The parser itself was unchanged.</p><a href="#case">Compare how this was reported →</a>',
    evidence: '<span class="status">SUPPORTING ARTIFACT</span><h3>What actually<br>changed?</h3><div class="patch"><code>+ reproduce.sas</code><span>A new reproduction example</span><code>  Parser source</code><span>No change in the submitted patch</span></div><a href="#needs">Follow the evidence path →</a>',
    caveat: '<span class="status amber">VERIFICATION LIMIT</span><h3>Do not turn a submission<br>into a success claim.</h3><p>The report’s patch evidence supports “no parser fix.” A submitted file alone does not establish that the issue was resolved.</p><a href="#axes">Inspect the content criteria →</a>'
  };
  function drawHero(key) { pressed('hero', key); $('hero-report').innerHTML = hero[key]; }
  document.querySelectorAll('[data-hero]').forEach(b => b.addEventListener('click', () => drawHero(b.dataset.hero)));
  drawHero('result');

  const cases = [
    {name:'Markdown',title:'The answer sits inside the record.',copy:'The outcome is one metadata row. To find verification, the original reader must reach screen 3.',scores:[84.7,93.3,22.2]},
    {name:'Direct HTML',title:'Put the outcome where reading begins.',copy:'An opening banner states both the lack of a fix and the verification limit. Access improves here without navigation controls.',scores:[84.5,100,50]},
    {name:'HTML Anything',title:'Connect the verdict to the next question.',copy:'A prominent outcome is paired with routes to execution steps and the submitted patch. The original report also has lower Visual quality.',scores:[85.4,76.7,66.7]}
  ];
  let caseIndex = 0;
  function drawCase(n) {
    caseIndex = n; pressed('case', n); const c = cases[n];
    $('case-location').textContent = `${c.name} / explanatory reconstruction`;
    $('case-heading').textContent = c.title; $('case-description').textContent = c.copy;
    $('case-metrics').innerHTML = c.scores.map((v,i) => `<div><span>${['Content','Visual','Access'][i]}</span><strong style="color:var(--${['content','visual','access'][i]})">${v.toFixed(1)}</strong></div>`).join('');
    const metadata = '<div class="mock-table"><div><span>Task</span><b>SAS parser syntax</b></div><div><span>Artifact</span><code>reproduce.sas</code></div><div><span>Outcome</span><b>No parser fix</b></div></div>';
    if (n === 0) $('case-page').innerHTML = `<span class="tiny-label">CASE REPORT</span><h4>Execution summary</h4>${metadata}<h5>Task objective</h5><p>Handle the requested SAS syntax in the parser.</p><div class="paper-lines" aria-hidden="true"><i></i><i></i><i></i></div><div class="md-gap"><span>Execution details continue below</span><i></i><i></i><i></i></div><div class="md-verification"><span class="tiny-label">VERIFICATION · BELOW THE OPENING</span><h5>No parser repair in the patch</h5><p>The submitted reproduction does not change the parser implementation. No official pass/fail grade is recorded here.</p></div>`;
    if (n === 1) $('case-page').innerHTML = '<span class="tiny-label">CASE REPORT</span><div class="outcome-banner"><span>OUTCOME · NO FIX PRODUCED</span><h4>The parser is unchanged.</h4><p>Only a reproduction file was submitted.</p><small>No official pass/fail grade is recorded in this report.</small></div><h5>What the submitted patch tells us</h5><p>No grammar or parsing logic was touched.</p><div class="patch"><code>+ reproduce.sas</code><span>The submitted artifact is a reproduction, not a parser repair.</span></div>';
    if (n === 2) $('case-page').innerHTML = '<div class="mini-nav"><span>Findings</span><button data-evidence>Patch ↗</button></div><span class="tiny-label">VERDICT</span><h4 class="report-verdict">A submitted file.<br>An unresolved issue.</h4><p>The reproduction captures the problem. It does not repair the parser.</p><button class="primary evidence-button" data-evidence>See the submitted patch →</button><small class="block">Outcome → supporting artifact</small>';
    $('case-page').scrollTop=0;
    $('case-page').querySelectorAll('[data-evidence]').forEach(b => b.addEventListener('click', () => {
      casePlayer.stop();
      $('case-page').innerHTML = '<span class="tiny-label">SUPPORTING ARTIFACT · SIMPLIFIED</span><h4>The change is a reproduction.</h4><div class="patch"><code>+ reproduce.sas</code><span>Contains a SAS snippet for the reported issue.</span><code>  Parser implementation</code><span>No source-code change in the submitted patch.</span></div><p>This is evidence of submission, not of a parser repair.</p><button class="quiet" id="case-back">← Back to overview</button>';
      $('case-back').addEventListener('click', () => { drawCase(n); $('case-page').querySelector('[data-evidence]').focus(); });
      $('case-back').focus({preventScroll:true});
    }));
  }
  const casePlayer = player('case-play','Play comparison', () => { drawCase((caseIndex + 1) % 3); return caseIndex !== 2; },2800);
  document.querySelectorAll('[data-case]').forEach(b => b.addEventListener('click', () => {casePlayer.stop();drawCase(Number(b.dataset.case));})); drawCase(0);

  const criteria = [
    {axis:'Content',color:'content',lead:'Does it preserve the right meaning?',items:[
      ['Faithfulness','Check report claims and visual encodings against the trajectory. Reporting a failed run accurately is faithful; presenting it as successful is not.'],
      ['Coverage','Retain important outcomes, conditions, limitations, and evidence. Repeating every execution step is not required.'],
      ['Self-contained understanding & verifiability','Supply the context, definitions, and supporting material needed to understand and check substantive conclusions.'],
      ['Conciseness','Measure the proportion of report information units aligned with important information. This is not a length limit, and the specified ratio does not separately penalize repetitions of important facts.']
    ]},
    {axis:'Visual Quality',color:'visual',lead:'Can the rendered elements be read?',items:[
      ['Text readability','Inspect contrast, clipping, overlap, visibility, and excessive density in the rendered page.'],
      ['Visual consistency','Check that elements with similar roles use consistent typography and alignment.'],
      ['Object readability','Inspect chart labels, tables, screenshots, code, and logs for the visible structure needed to interpret them.']
    ]},
    {axis:'Information Access',color:'access',lead:'Can readers reach what they need?',items:[
      ['Findability','For each frozen reader need, identify a visible answer or a descriptive entry point to it. A vague “More” button may conceal what is available.'],
      ['Continuity','For each related pair of needs, inspect the route between the answers: explicit links, labeled disclosures, or suitable placement and proximity.']
    ]}
  ];
  $('rubric-columns').innerHTML = criteria.map(c => `<section style="--axis-color:var(--${c.color})"><span class="axis-name">${c.axis}</span><h4>${c.lead}</h4>${c.items.map(([title,body],i) => `<details><summary><span>${i+1}</span>${title}</summary><p>${body}</p></details>`).join('')}<a href="paper.pdf#page=${c.color==='content'?13:c.color==='visual'?15:17}" class="small">Read detailed criteria ↗</a></section>`).join('');
  let evidenceOpened = false;
  function drawLab() {
    const claim=$('lab-claim').checked,overlap=$('lab-overlap').checked,hidden=$('lab-hidden').checked;
    $('lab-verdict').textContent = claim?'The parser was successfully fixed.':'The parser was not fixed.';
    $('lab-badge').hidden=!overlap; $('lab-more').hidden=!hidden;
    $('lab-evidence-wrap').hidden=hidden&&!evidenceOpened;
    $('lab-more').textContent=evidenceOpened?'Less':'More';$('lab-more').setAttribute('aria-expanded',String(evidenceOpened));
    const notes=[
      ['content', 'Content', claim?'Unsupported success claim':'The outcome matches the described patch',claim?'A reproduction file does not support the claim that the parser was repaired.':'No unsupported repair is claimed in this small example. This is not a full Content assessment.'],
      ['visual','Visual Quality',overlap?'Evidence becomes unreadable':'The patch remains readable',overlap?'The badge covers text the reader needs. Successful rendering does not make that content legible.':'The relevant text is visible at this layout size.'],
      ['access','Information Access',hidden?'The entry point conceals its purpose':'Outcome and evidence are adjacent',hidden?'The button says “More,” not what evidence it opens. A descriptive cue would help readers decide where to go.':'Readers can follow the outcome directly to the patch information.']
    ];
    $('lab-findings').innerHTML=notes.map(([color,title,head,body])=>`<div style="--axis-color:var(--${color})"><span>${title}</span><strong>${head}</strong><p>${body}</p></div>`).join('');
  }
  ['lab-claim','lab-overlap','lab-hidden'].forEach(id=>$(id).addEventListener('change',()=>{evidenceOpened=false;drawLab();}));
  $('lab-more').addEventListener('click',()=>{evidenceOpened=!evidenceOpened;drawLab();});
  $('lab-reset').addEventListener('click',()=>{['lab-claim','lab-overlap','lab-hidden'].forEach(id=>$(id).checked=false);evidenceOpened=false;drawLab();});drawLab();

  const needs={
    outcome:['Was the issue fixed?','No parser fix was produced.','The submitted artifact reproduces the issue, while the parser source remains unchanged.','change','What changed in the patch?','Findability: the question leads directly to an outcome, rather than a generic section title.'],
    change:['What did the patch change?','A reproduction file was added.','The report identifies reproduce.sas as the new file. It contains an example for the SAS parsing issue.','proof','What supports “not fixed”?','Continuity: the outcome leads to the concrete artifact behind it.'],
    proof:['What supports that conclusion?','No parser implementation was changed.','The inspected patch supports a limited conclusion: it provides a reproduction, not a repair of the parsing logic.','limit','What is the verification limit?','Continuity: the evidence is connected to the conclusion it supports.'],
    limit:['What can we not verify?','Do not invent an official test verdict.','The original Direct HTML report notes that official evaluation logs were stripped from its input. It bases the unresolved-issue conclusion on the submitted patch.','outcome','Return to the outcome','A caveat belongs on the reading path, so the conclusion keeps its proper scope.']
  };
  const needOrder=['outcome','change','proof','limit'];let needIndex=0;
  function drawNeed(key){needIndex=needOrder.indexOf(key);pressed('need',key);const n=needs[key];$('need-answer').innerHTML=`<span class="tiny-label">${n[0]}</span><h4>${n[1]}</h4><p>${n[2]}</p><button class="text-button" id="need-next">${n[4]} →</button><span class="need-source">Case: paper Figure 5 · editorial paraphrase</span>`;$('need-insight').textContent=n[5];$('need-next').addEventListener('click',()=>{needPlayer.stop();drawNeed(n[3]);$('need-next').focus({preventScroll:true});});}
  const needPlayer=player('need-play','Follow a reading path',()=>{drawNeed(needOrder[(needIndex+1)%4]);return needIndex!==3;},2800);
  document.querySelectorAll('[data-need]').forEach(b=>b.addEventListener('click',()=>{needPlayer.stop();drawNeed(b.dataset.need);}));drawNeed('outcome');

  const pipeline=[
    ['A reference for meaning, not a reference webpage.','The task and trajectory yield an atomic fact list, an important-information checklist, and a reader-need tree. A human corrects unsupported entries and reviews relevant needs. These references are frozen before report evaluation, then reused.','Task + completed trajectory → human-reviewed references'],
    ['Inspect what the page says and what readers can see.','Each report gets its own semantic map, screenshots, and captured interaction states. Desktop and mobile views reveal clipping or overlap that source-level extraction alone would miss. A screenshot alone can miss content behind a control.','Candidate report → semantic map + rendered evidence'],
    ['Make each judgment traceable.','Checks produce criterion-level judgments with supporting evidence. Content compares reported meaning with the execution; Visual checks rendered elements; Access checks answers and routes against reader needs. The resulting axis scores are kept separate.','References + relevant report evidence → judgments + scores']
  ];let pipelineIndex=0;
  function drawPipeline(n){pipelineIndex=n;pressed('pipeline',n);$('pipeline-detail').innerHTML=`<div class="pipeline-flow">${pipeline[n][2]}</div><h4>${pipeline[n][0]}</h4><p>${pipeline[n][1]}</p>`;}
  const pipelinePlayer=player('pipeline-play','Walk through',()=>{drawPipeline((pipelineIndex+1)%3);return pipelineIndex!==2;},3200);
  document.querySelectorAll('[data-pipeline]').forEach(b=>b.addEventListener('click',()=>{pipelinePlayer.stop();drawPipeline(Number(b.dataset.pipeline));}));drawPipeline(0);

  const domains=[['Audio-video understanding',5,'Collected for tasks without public trajectories'],['Code repair',5,'Trajectories obtained from public datasets'],['Daily web tasks',5,'Trajectories obtained from public datasets'],['Data analysis',5,'Collected for tasks without public trajectories'],['Desktop GUI',5,'Trajectories obtained from public datasets'],['Education / tutoring',5,'Collected for tasks without public trajectories'],['Paper reproduction',4,'Collected for tasks without public trajectories'],['Scientific computing',3,'Collected for tasks without public trajectories'],['Spreadsheet / office',5,'Collected for tasks without public trajectories'],['Terminal / DevOps',5,'Trajectories obtained from public datasets'],['Tool use / customer service',5,'Trajectories obtained from public datasets'],['Travel planning',3,'Collected for tasks without public trajectories'],['Web navigation',5,'Trajectories obtained from public datasets']];
  $('domain-list').innerHTML=domains.map(([name,n],i)=>`<button data-domain="${i}" aria-pressed="false">${name}<b>${n}</b></button>`).join('');
  $('domain-dots').innerHTML=domains.map(([name,n],i)=>Array.from({length:n},()=>`<i data-dot-domain="${i}" title="${name}"></i>`).join('')).join('');
  function drawDomain(i){pressed('domain',i);document.querySelectorAll('[data-dot-domain]').forEach(e=>e.classList.toggle('selected',Number(e.dataset.dotDomain)===i));$('domain-description').textContent=`${domains[i][0]}: ${domains[i][1]} of 60 trajectories. ${domains[i][2]}.`;}
  document.querySelectorAll('[data-domain]').forEach(b=>b.addEventListener('click',()=>drawDomain(Number(b.dataset.domain))));drawDomain(1);

  const data=window.HTMLPRESENT_DATA,axes=[['content','Content'],['visual','Visual Quality'],['access','Information Access']];let model='mean',method=1;
  data.models.forEach(m=>{const o=document.createElement('option');o.value=m;o.textContent=m;$('model-select').append(o);});
  $('method-tabs').innerHTML=data.methods.map((m,i)=>`<button data-method="${i}" aria-pressed="${i===1}">${m}</button>`).join('');
  function selectedRows(){return data.methods.map(m=>{
    if(model!=='mean')return data.records.find(r=>r.model===model&&r.method===m);
    const rs=data.records.filter(r=>r.method===m),row={method:m};['content','visual','access','cost'].forEach(k=>row[k]=rs.reduce((n,r)=>n+r[k],0)/rs.length);return row;
  });}
  function drawResults(){pressed('method',method);const rows=selectedRows();
    $('results-charts').innerHTML=axes.map(([key,label])=>`<section class="axis-chart" style="--axis-color:var(--${key})"><h4>${label}</h4><div class="axis-scale"><span>0</span><span>50</span><span>100</span></div>${rows.map((r,i)=>{const se=r[`${key}SE`];return `<div class="score-row ${i===method?'highlight':''}"><div class="score-row-label"><span>${r.method}</span><strong>${r[key].toFixed(1)}</strong></div><div class="score-track"><i style="width:${r[key]}%"></i>${se!==undefined?`<span class="error-bar" title="Standard error ±${se}" style="left:${Math.max(0,r[key]-se)}%;width:${Math.min(100,r[key]+se)-Math.max(0,r[key]-se)}%"></span>`:''}</div></div>`;}).join('')}</section>`).join('');
    const row=rows[method],base=rows[1],name=model==='mean'?'Across-model mean':model;
    const delta=axes.map(([k,label])=>{const v=row[k]-base[k];return `${label} ${v>0?'+':''}${v.toFixed(1)}`;}).join(' · ');
    $('results-takeaway').innerHTML=`<span class="tiny-label">${esc(name)} · ${row.method}</span><p>${method===1?'Direct HTML is the reference here. Select another method to see how all three axes change.':`Compared with Direct HTML: <strong>${delta}</strong> points.`}</p>`;
    $('uncertainty-note').textContent=model==='mean'?'Means of eleven reported model means; no pooled uncertainty is estimated.':'Whiskers show ±1 standard error over tasks, clipped at the 0–100 axis limits.';
    $('results-caption').textContent=`${name} · scores out of 100`;
    $('results-table').innerHTML=rows.map(r=>`<tr><th scope="row">${r.method}</th>${axes.map(([k])=>`<td>${r[k].toFixed(1)}${r[`${k}SE`]!==undefined?` ± ${r[`${k}SE`].toFixed(1)}`:''}</td>`).join('')}<td>$${r.cost.toFixed(3)}</td></tr>`).join('');
  }
  const resultPlayer=player('results-play','Compare methods',()=>{method=(method+1)%4;drawResults();return method!==3;},2800);
  document.querySelectorAll('[data-method]').forEach(b=>b.addEventListener('click',()=>{resultPlayer.stop();method=Number(b.dataset.method);drawResults();}));
  $('model-select').addEventListener('change',e=>{resultPlayer.stop();model=e.target.value;drawResults();});drawResults();

  const NS='http://www.w3.org/2000/svg';
  function svg(tag,attrs,text){const e=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));if(text!==undefined)e.textContent=text;return e;}
  let lastBoundDecision = null;
  function drawBounds(){const t=Number($('bounds-slider').value)/100,lo=1.4+.01*t,hi=1.5-.08*t,L=lo**3,H=hi**3,decided=H<=3;
    $('x-bounds').textContent=`${lo.toFixed(4)} < x < ${hi.toFixed(4)}`;
    $('cube-bounds').textContent=`${L.toFixed(4)} < x³ < ${H.toFixed(4)}`;
    const g=$('bounds-svg');g.replaceChildren(svg('title',{id:'bounds-title'},'Bounds on x cubed'),svg('desc',{id:'bounds-desc'},decided?'The interval lies entirely between 2 and 3. The floor is 2.':'The interval crosses 3. These bounds do not determine the floor.'));
    const compact=matchMedia('(max-width:760px)').matches,w=compact?480:900;g.setAttribute('viewBox',`0 0 ${w} 200`);
    const x=v=>35+(v-2)/1.6*(w-70),color=decided?'#3f7966':'#b07c35';
    g.append(svg('rect',{x:x(2),y:75,width:x(3)-x(2),height:75,fill:'#f1f6f3'}),svg('rect',{x:x(3),y:75,width:x(3.6)-x(3),height:75,fill:'#faf4eb'}));
    [2,2.5,3,3.5].forEach(v=>g.append(svg('line',{x1:x(v),x2:x(v),y1:70,y2:158,stroke:v===3?'#a07841':'#dde2df','stroke-dasharray':v===3?'4 4':'0'}),svg('text',{x:x(v),y:184,'text-anchor':'middle','font-size':compact?22:17,fill:'#6f7680'},v)));
    g.append(svg('text',{x:x(2.45),y:35,'text-anchor':'middle','font-size':compact?20:16,fill:'#507061'},'floor = 2'),svg('text',{x:x(3.32),y:35,'text-anchor':'middle','font-size':compact?20:16,fill:'#947342'},'floor = 3'));
    g.append(svg('rect',{x:x(L),y:99,width:x(H)-x(L),height:25,rx:6,fill:color}),svg('circle',{cx:x(2*Math.sqrt(2)),cy:112,r:6,fill:'white',stroke:color,'stroke-width':2}));
    if(lastBoundDecision!==decided){lastBoundDecision=decided;$('bounds-explanation').innerHTML=decided?'<strong>The interval now fits inside one integer band.</strong> Every permitted value has floor 2. The tighter bound resolves the question.':'<strong>The interval crosses 3.</strong> These bounds allow a floor of either 2 or 3. Knowing a range is not yet enough.';}
  }
  const boundsPlayer=player('bounds-play','Tighten the bounds',()=>{let v=Number($('bounds-slider').value);v=v>=100?0:v+2;$('bounds-slider').value=String(v);drawBounds();return v<100;},100);
  $('bounds-slider').addEventListener('input',()=>{boundsPlayer.stop();drawBounds();});
  $('bounds-loose').addEventListener('click',()=>{boundsPlayer.stop();$('bounds-slider').value='0';drawBounds();});
  $('bounds-tight').addEventListener('click',()=>{boundsPlayer.stop();$('bounds-slider').value='100';drawBounds();});
  matchMedia('(max-width:760px)').addEventListener('change',drawBounds);drawBounds();
  const sources={case:['Figure 5 · Same trajectory, three reports','assets/paper-figure-5.png',28],tutoring:['Figure 10 · The original tutoring examples','assets/paper-figure-10.png',33]};let sourceTrigger=null;
  document.querySelectorAll('[data-source]').forEach(b=>b.addEventListener('click',()=>{players.forEach(p=>p.stop());const [title,src,page]=sources[b.dataset.source];sourceTrigger=b;$('source-title').textContent=title;$('source-caption').textContent='Unedited page rendered from the supplied manuscript. Scores and examples belong to the original study.';$('source-image').src=src;$('source-image').alt=title;$('source-pdf').href=`paper.pdf#page=${page}`;$('source-dialog').showModal();}));
  $('source-close').addEventListener('click',()=>$('source-dialog').close());$('source-dialog').addEventListener('close',()=>sourceTrigger?.focus());
  const sections=[...document.querySelectorAll('.chapter')];
  function reading(){const max=document.documentElement.scrollHeight-innerHeight;$('reading-progress').style.width=`${max>0?scrollY/max*100:0}%`;let current='';sections.forEach(s=>{if(s.getBoundingClientRect().top<180)current=s.id;});document.querySelectorAll('.chapters a').forEach(a=>{if(a.hash===`#${current}`)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}
  window.addEventListener('scroll',reading,{passive:true});window.addEventListener('resize',reading);reading();
})();
