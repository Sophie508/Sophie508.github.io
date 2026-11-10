'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const setPressed = (selector, key, value) => document.querySelectorAll(selector).forEach(b => b.setAttribute('aria-pressed', String(b.dataset[key] === String(value))));
  const recipientCopy = {
    team: ['The user’s request', 'The user named the team.'],
    extra: ['A workspace file', 'No grant for this extra recipient.']
  };
  document.querySelectorAll('[data-recipient]').forEach(b => b.addEventListener('click', () => {
    setPressed('[data-recipient]', 'recipient', b.dataset.recipient);
    const [origin, authority] = recipientCopy[b.dataset.recipient];
    $('recipient-origin').textContent = origin; $('recipient-authority').textContent = authority;
  }));
  const ns='http://www.w3.org/2000/svg';
  function svg(tag,attrs={},text){const e=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));if(text!==undefined)e.textContent=text;return e;}
  function node(g,x,y,w,title,subtitle,kind=''){const group=svg('g',{class:`graph-node ${kind}`});group.append(svg('rect',{x,y,width:w,height:75,rx:9}),svg('text',{x:x+16,y:y+29},title),svg('text',{x:x+16,y:y+53,class:'node-small'},subtitle));g.append(group);}
  function edge(g,d,kind,label,x,y){g.append(svg('path',{d,class:`graph-edge ${kind}`,'marker-end':`url(#${kind.includes('grant')?'grant-arrow':'source-arrow'})`}));if(label)g.append(svg('text',{x,y,fill:kind.includes('grant')?'#3f7966':'#ac7945','font-size':12},label));}
  const graphNotes=[
    'The user’s task supplies the allowed scope. External content has not entered the record.',
    'Reading the file adds an operation and its observed output. The fixed scope does not gain a new recipient.',
    'The team destination is covered. The extra address depends on file content; a data-dependency edge does not create permission.',
    'In this selective-removal illustration, the team delivery executes and enters history. The dropped recipient never becomes an executed node.'
  ];
  function drawGraph(n){setPressed('[data-graph]','graph',n);const g=$('authority-svg');g.replaceChildren(svg('title', {id:'graph-title'},'Fixed task authority and evolving operations'),svg('desc',{id:'graph-description'},graphNotes[n]));
    const defs=svg('defs');for(const [id,color] of [['grant-arrow','#3f7966'],['source-arrow','#ac7945']]){const m=svg('marker',{id,viewBox:'0 0 10 10',refX:9,refY:5,markerWidth:6,markerHeight:6,orient:'auto-start-reverse'});m.append(svg('path',{d:'M0 0L10 5L0 10Z',fill:color}));defs.append(m);}g.append(defs);
    g.append(svg('text',{x:30,y:25,'font-size':11,fill:'#89918b','letter-spacing':1.5},'FIXED AUTHORITY'),svg('text',{x:335,y:25,'font-size':11,fill:'#89918b','letter-spacing':1.5},'EXECUTION RECORD'));
    node(g,30,75,240,'User task + policy','Read file · send to team','allowed');
    if(n>=1){edge(g,'M270 110 H330','grant','allows read',278,58);node(g,330,75,225,'Read workspace file','Output contains extra address','low');}
    if(n>=2){edge(g,'M150 150 V325 H930 V110 H910','grant','allows team delivery',290,314);node(g,650,75,260,'Send → team',n===3?'Executed · committed':'Covered · pending',n===3?'allowed':'allowed pending');edge(g,'M555 113 H595 V230 H650','source proposed','supplies address',485,215);node(g,650,195,260,n===3?'Extra recipient removed':'Send → extra address',n===3?'Not executed · not committed':'File-derived · no grant',n===3?'blocked':'low pending');}
    if(n===0)g.append(svg('text',{x:335,y:118,'font-size':20,fill:'#89918b'},'The graph will grow here.'));
    $('graph-insight').textContent=graphNotes[n];
  }
  document.querySelectorAll('[data-graph]').forEach(b=>b.addEventListener('click',()=>drawGraph(Number(b.dataset.graph))));drawGraph(2);

  const data=window.AIRGUARD_RESULTS;
  const colors={'No defense':'#928a81',ARGUS:'#70879b',MELON:'#96819b',CaMeL:'#a68a51',VIGIL:'#b17868',AIRGuard:'#3f7065'};
  let benchmark='AgentTrap',model='GPT-5.6 Sol',defense='AIRGuard';
  data.models.forEach(m=>{const o=document.createElement('option');o.value=m;o.textContent=m;$('model-select').append(o);});$('model-select').value=model;
  function drawResults(){const focusedDefense=document.activeElement?.dataset.defense;const rows=data.records.filter(r=>r.benchmark===benchmark&&r.model===model),g=$('results-svg');
    g.replaceChildren(svg('title',{id:'results-title'},`${benchmark}: ${model}`),svg('desc',{id:'results-description'},rows.map(r=>`${r.defense}: attack success ${r.asr}%, benign completion ${r.utility}%`).join('; ')));
    const compact=matchMedia('(max-width:760px)').matches,left=compact?48:65,right=compact?420:655,bottom=compact?300:350,top=60,font=compact?16:13;
    g.setAttribute('viewBox',compact?'0 0 440 380':'0 0 700 430');
    const x=v=>left+v/30*(right-left),y=v=>bottom-v/100*(bottom-top);
    [0,20,40,60,80,100].forEach(v=>{g.append(svg('line',{x1:left,x2:right,y1:y(v),y2:y(v),stroke:'#e2e6eb'}),svg('text',{x:left-12,y:y(v)+5,'font-size':font,fill:'#7d8592','text-anchor':'end'},v));});
    (compact?[0,10,20,30]:[0,5,10,15,20,25,30]).forEach(v=>g.append(svg('text',{x:x(v),y:bottom+27,'font-size':font,fill:'#7d8592','text-anchor':'middle'},v)));
    g.append(svg('text',{x:left,y:30,'font-size':compact?17:14,fill:'#737c88'},'Benign completion (%) ↑'),svg('text',{x:right,y:bottom+60,'font-size':compact?17:14,fill:'#737c88','text-anchor':'end'},'Attack success (%) →'));
    const base=rows.find(r=>r.defense==='No defense'),air=rows.find(r=>r.defense==='AIRGuard');
    g.append(svg('line',{x1:x(base.asr),y1:y(base.utility),x2:x(air.asr),y2:y(air.utility),stroke:'#a6bcb2','stroke-width':2,'stroke-dasharray':'5 5'}));
    const ordered=[...rows.filter(r=>r.defense!==defense),...rows.filter(r=>r.defense===defense)];
    ordered.forEach(r=>{if(r.defense===defense)g.append(svg('circle',{cx:x(r.asr),cy:y(r.utility),r:15,fill:'none',stroke:colors[r.defense],'stroke-width':1.5}));const point=svg('circle',{cx:x(r.asr),cy:y(r.utility),r:7.5,fill:colors[r.defense],stroke:'white','stroke-width':2});point.append(svg('title',{},`${r.defense}: ASR ${r.asr}%, utility ${r.utility}%`));g.append(point);});
    $('method-buttons').replaceChildren();rows.forEach(r=>{const b=document.createElement('button');b.className='method-button';b.dataset.defense=r.defense;b.style.setProperty('--method-color',colors[r.defense]);b.setAttribute('aria-pressed',String(defense===r.defense));b.innerHTML=`<span><i aria-hidden="true"></i>${r.defense}</span><small>${r.asr.toFixed(1)} / ${r.utility.toFixed(0)}</small>`;b.addEventListener('click',()=>{defense=r.defense;drawResults();});$('method-buttons').append(b);});
    if(focusedDefense) [...$('method-buttons').children].find(b=>b.dataset.defense===focusedDefense)?.focus({preventScroll:true});
    const current=rows.find(r=>r.defense===defense);
    $('metric-detail').innerHTML=`<div><strong>${current.asr.toFixed(1)}%</strong><span>Attack success · ${defense}</span></div><div><strong>${current.utility.toFixed(1)}%</strong><span>Benign completion · ${defense}</span></div><div><strong>${current.tokens.toFixed(1)}M</strong><span>Recorded total tokens · ${defense}</span></div>`;
    const delta=air.utility-base.utility;
    $('result-takeaway').textContent=`${model}: AIRGuard changes attack success from ${base.asr.toFixed(1)}% to ${air.asr.toFixed(1)}%, and benign completion from ${base.utility.toFixed(1)}% to ${air.utility.toFixed(1)}% (${delta>0?'+':''}${delta.toFixed(0)} percentage points).`;
    $('benchmark-note').textContent=benchmark==='AgentTrap'?'AgentTrap: 91 attacks + 50 benign tasks per method/backbone. These comparisons include different security–utility trade-offs; low attack success alone is not the objective.':'DTAP-150: ASR combines 50 direct attacks and 50 indirect injections; only the indirect group is within the stated threat model. ARGUS/MELON also use a different agent loop, so utility gaps cannot be attributed to the defense alone. This adapter does not exercise recipient extraction.';
    $('results-table').innerHTML=rows.map(r=>`<tr><td>${r.defense}</td><td>${r.asr.toFixed(1)}%</td><td>${r.utility.toFixed(1)}%</td><td>${r.tokens.toFixed(1)}M</td></tr>`).join('');
  }
  matchMedia('(max-width:760px)').addEventListener('change',drawResults);
  $('model-select').addEventListener('change',e=>{model=e.target.value;drawResults();});
  document.querySelectorAll('[data-benchmark]').forEach(b=>b.addEventListener('click',()=>{benchmark=b.dataset.benchmark;setPressed('[data-benchmark]','benchmark',benchmark);drawResults();}));drawResults();
  const mechanisms=[
    {name:'Script effect check',n:39,color:'#497b68',text:'An effect check on the script blocked the whole execution call. This is the largest recorded intervention category in this selected subset.'},
    {name:'Authority graph: script',n:3,color:'#80a894',text:'The authority graph blocked scripts that wrote a startup file the user had not named.'},
    {name:'Recipient removal',n:1,color:'#b1cbbd',text:'One run removed a recipient introduced by a workspace file while still sending the email. This supports a concrete example of selective intervention, not a general attribution of the utility gains.'},
    {name:'Risk tag',n:1,color:'#b9a6c7',text:'A risk tag decided one run in the selected subset.'},
    {name:'Deletion rule',n:1,color:'#d3b68c',text:'The deletion rule decided one run in the selected subset.'},
    {name:'Sequence audit',n:1,color:'#8aa8bf',text:'Sequence audit decided one run. The manuscript does not report an isolated sequence-audit ablation.'},
    {name:'No guard intervention',n:28,color:'#ddd5cc',text:'The guard took no action and the agent did not attempt the attack. Part of the observed difference reflects variation between runs; these are not 28 demonstrated guard blocks.'}
  ];
  mechanisms.forEach((m,i)=>{
    const mark=document.createElement('span');mark.className='mechanism-mark';mark.dataset.category=i;mark.style.setProperty('--mark-color',m.color);mark.style.width=`${100*m.n/74}%`;mark.setAttribute('aria-hidden','true');$('mechanism-grid').append(mark);
    const b=document.createElement('button');b.dataset.mechanism=i;b.style.setProperty('--mark-color',m.color);b.innerHTML=`<i aria-hidden="true"></i>${m.name} <strong>${m.n}</strong>`;b.addEventListener('click',()=>drawMechanism(i));$('mechanism-legend').append(b);
  });
  function drawMechanism(i){setPressed('[data-mechanism]','mechanism',i);document.querySelectorAll('.mechanism-mark').forEach(e=>{e.classList.toggle('dimmed',Number(e.dataset.category)!==i);e.classList.toggle('active',Number(e.dataset.category)===i);});const m=mechanisms[i];$('mechanism-detail').innerHTML=`<strong>${m.n} of 74 · ${m.name}</strong><p>${m.text}</p>`;}
  drawMechanism(0);
  const sections=[...document.querySelectorAll('.chapter')],nav=[...document.querySelectorAll('.chapters a')];
  function progress(){const length=document.documentElement.scrollHeight-innerHeight;$('reading-progress').style.width=`${length>0?scrollY/length*100:0}%`;let current=null;sections.forEach(s=>{if(s.getBoundingClientRect().top<=180)current=s.id;});nav.forEach(a=>{if(a.hash===`#${current}`)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}
  function revealAnchor(){
    let target;try{target=$(decodeURIComponent(location.hash.slice(1)));}catch{return;}
    if(!target)return;
    for(let p=target;p;p=p.parentElement){if(p.tagName==='DETAILS')p.open=true;}
    requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));
  }
  window.addEventListener('hashchange',revealAnchor);if(location.hash)revealAnchor();
  document.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',progress));
  window.addEventListener('scroll',progress,{passive:true});window.addEventListener('resize',progress);progress();
})();
