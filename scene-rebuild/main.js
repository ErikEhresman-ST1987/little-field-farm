import {freshStory,validStory,storyView,storyAction,storyEvent} from './farm-story.js';
const SCENE_URL = '../assets/farm-v2/background/workshop-scene%20(9).json';
const KEY = 'little-field-farm-scene-rebuild-v3';
const canvas = document.querySelector('#farm'), ctx = canvas.getContext('2d');
const notice = document.querySelector('#notice'), loading = document.querySelector('#loading');
const panel = document.querySelector('#panel'), panelTitle = document.querySelector('#panel-title'), panelContent = document.querySelector('#panel-content');
const NAMES = { wheat:'Wheat', 'rainbow-chard':'Rainbow Chard', pineapple:'Pineapple', strawberry:'Strawberry', squash:'Squash' };
const PRICES = { wheat:4, 'rainbow-chard':6, pineapple:9, strawberry:7, squash:8 };
const GOODS = {
 milk:['Milk',8], wool:['Wool',7], eggs:['Eggs',5],
 'farm-bread':['Farm Bread',28], 'squash-fritters':['Squash Fritters',55], 'strawberry-pie':['Strawberry Pie',58],
 'farmhouse-cheese':['Farmhouse Cheese',23], 'fresh-butter':['Fresh Butter',23], 'strawberry-yogurt':['Strawberry Yogurt',31],
 'strawberry-smoothie':['Strawberry Smoothie',30], 'pineapple-smoothie':['Pineapple Smoothie',35],
 'strawberry-pineapple-smoothie':['Strawberry-Pineapple Smoothie',63],
 'wool-yarn':['Wool Yarn',20], 'knitted-scarf':['Knitted Scarf',54], 'wool-blanket':['Wool Blanket',110]
};
const PRODUCT_ART = {
 wheat:'wheat.webp','rainbow-chard':'rainbow-chard.webp',pineapple:'pineapple.webp',
 strawberry:'stawberries.webp',squash:'crooked-neck-squash.webp',
 milk:'milk.webp',wool:'wool.webp',eggs:'eggs.webp',
 'farm-bread':'farm-bread.webp','squash-fritters':'squash-fritters.webp',
 'strawberry-pie':'strawberry-pie.webp','farmhouse-cheese':'farm-cheese.webp',
 'fresh-butter':'butter.webp','strawberry-yogurt':'strawberry-yogurt.webp',
 'strawberry-smoothie':'strawberry-smoothie.webp','pineapple-smoothie':'pineapple-smoothie.webp',
 'strawberry-pineapple-smoothie':'strawberry-pineapple-smoothie.webp',
 'wool-yarn':'yarn.webp','knitted-scarf':'wool-scarf.webp','wool-blanket':'wool-blanket.webp'
};
const NPC_ART = ['Juliette-Childers.webp','Andy-Tiller.webp','Keiko-Obrien.webp','Felix-Underwood.webp'];
function addArt(container,folder,file,alt,portrait=false){
 const img=document.createElement('img');
 img.src='../assets/farm-v2/'+folder+'/'+file;
 img.alt=alt;img.className=portrait?'npc-art':'product-art';
 img.loading='lazy';img.onerror=()=>img.remove();
 container.prepend(img);
}
function itemEntry(id,label,action,disabled=false){
 entry(label,action,disabled);
 const row=panelContent.lastElementChild;
 if(PRODUCT_ART[id])addArt(row,'products',PRODUCT_ART[id],itemName(id));
}
const TIMES = { wheat:45000, 'rainbow-chard':55000, pineapple:90000, strawberry:65000, squash:75000 };
let scene, state, art = new Map(), background, selectedBed = -1;
let liveProductionPanel = null;
let saveRecoveryRequired = false;
const animatedObjects = new Map();
const now = () => Date.now();
const RECIPES = {
 bakery:[
  ['farm-bread',{'wheat':3,milk:1},60],
  ['squash-fritters',{squash:2,eggs:1,'farmhouse-cheese':1},90],
  ['strawberry-pie',{strawberry:3,wheat:2,eggs:1,milk:1},120]
 ],
 creamery:[
  ['farmhouse-cheese',{milk:2},60],['fresh-butter',{milk:2},60],
  ['strawberry-yogurt',{milk:1,strawberry:2},75],
  ['strawberry-smoothie',{strawberry:2,milk:1},45],
  ['pineapple-smoothie',{pineapple:2,milk:1},60],
  ['strawberry-pineapple-smoothie',{strawberry:1,pineapple:1,'strawberry-yogurt':1},75]
 ],
 textile:[
  ['wool-yarn',{wool:2},45],['knitted-scarf',{'wool-yarn':2},90],
  ['wool-blanket',{'wool-yarn':4},150]
 ]
};
const CUSTOMERS = [
 {name:'Juliette Childers',role:'Restaurant owner',kind:'raw',message:'Fresh ingredients for tonight’s kitchen.'},
 {name:'Sheriff Andy Tiller',role:'Sheriff',kind:'any',message:'Supplies for the sheriff’s office.'},
 {name:"Miss Keiko O'Brien",role:'Schoolteacher',kind:'any',message:'Something useful for the school.'},
 {name:'Felix Underwood',role:'General store owner',kind:'finished',message:'Finished goods for the store shelves.'}
];
const freshInventory=()=>Object.fromEntries([...Object.keys(NAMES),...Object.keys(GOODS)].map(k=>[k,0]));
const emptyState=()=>({
 version:3,coins:30,beds:Array(6).fill(null),inventory:freshInventory(),order:0,
 queues:{bakery:[],creamery:[],textile:[]},animals:{cow:0,sheep:0,chicken:0},
 unlocked:[],pendingOrder:null,story:freshStory()
});
function validateSave(s){
 const fail=()=>{throw Error('Invalid or incompatible farm backup.');};
 const integer=(n,min=0)=>Number.isSafeInteger(n)&&n>=min;
 const stamp=n=>Number.isSafeInteger(n)&&n>0;
 if(!s||typeof s!=='object'||Array.isArray(s)||s.version!==3||
  !integer(s.coins)||!integer(s.order)||!Array.isArray(s.beds)||s.beds.length!==6||
  !s.inventory||typeof s.inventory!=='object'||Array.isArray(s.inventory)||
  !s.queues||typeof s.queues!=='object'||!s.animals||typeof s.animals!=='object'||
  !Array.isArray(s.unlocked)||!s.unlocked.every(id=>typeof id==='string'&&Object.hasOwn(GOODS,id)))fail();
 const allIds=[...Object.keys(NAMES),...Object.keys(GOODS)];
 for(const id of allIds)if(!integer(s.inventory[id]))fail();
 for(const bed of s.beds)if(bed!==null&&(!bed||typeof bed!=='object'||
  !Object.hasOwn(TIMES,bed.crop)||!stamp(bed.plantedAt)))fail();
 for(const [factoryId,recipes] of Object.entries(RECIPES)){
  const queue=s.queues[factoryId];
  if(!Array.isArray(queue)||queue.length>3)fail();
  for(const job of queue)if(!job||typeof job!=='object'||
   !recipes.some(recipe=>recipe[0]===job.product)||!stamp(job.finish))fail();
 }
 for(const animal of Object.keys(ANIMALS)){
  const started=s.animals[animal];
  if(started!==0&&!stamp(started))fail();
 }
 if(s.pendingOrder!==null){
  const o=s.pendingOrder;
  if(!o||typeof o!=='object'||!integer(o.customer)||o.customer>=CUSTOMERS.length||
   !allIds.includes(o.item)||!integer(o.quantity,1)||!integer(o.reward))fail();
 }
 if(s.story===undefined)s.story=freshStory();
 validStory(s.story);
 return s;
}
function save(){if(saveRecoveryRequired){tell('Save blocked: restore a valid backup before continuing.');return;}try{validateSave(state);localStorage.setItem(KEY,JSON.stringify(state));}catch(e){tell('Save failed. Export a backup before closing.');console.error(e);}}
function tell(s){notice.textContent=s;}
function image(src){return new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=reject;im.src=src;});}
async function getImage(src){if(!src)return null;if(!art.has(src))art.set(src,image(src).catch(e=>{console.warn('Image unavailable',e);return null;}));return art.get(src);}
function drawImage(img,x,y,w,h,rotation=0){if(!img)return;ctx.save();ctx.translate(x,y);ctx.rotate(rotation*Math.PI/180);ctx.drawImage(img,-w/2,-h/2,w,h);ctx.restore();}
function objectHeight(o,img){return o.w*img.height/img.width;}
function currentStage(bed){if(!bed)return -1;const elapsed=now()-bed.plantedAt;const duration=TIMES[bed.crop];return elapsed>=duration?2:elapsed>=duration/2?1:0;}
function ready(bed){return bed && now()-bed.plantedAt>=TIMES[bed.crop];}
function draw(){
 if(!scene)return;
 ctx.clearRect(0,0,canvas.width,canvas.height);
 if(background)ctx.drawImage(background,0,0,canvas.width,canvas.height);
 // Render in explicit visual layers. Scene Editor y coordinates describe placement,
 // not the stacking order: pens and soil must never cover their occupants.
 const penBases=[], buildings=[], animals=[];
 for(const o of scene.objects){
   const img=art.get(o.data);
   if(!img)continue;
   const render=()=>{const animation=animatedObjects.get(o);const frame=animation?animation.frames[Math.floor(performance.now()/1000*animation.fps)%animation.frames.length]:img;drawImage(frame,o.x,o.y,o.w,objectHeight(o,frame),o.rotation||0);};
   const name=(o.name||o.asset||'').toLowerCase();
   if(name.includes('empty-field'))penBases.push(render);
   else if(name.includes('cow')||name.includes('sheep')||name.includes('chicken')||name.includes('animation-6frames'))animals.push(render);
   else buildings.push(render);
 }
 for(const render of penBases)render();
 // Foundation artwork is always below crops, regardless of editor coordinates.
 for(const bed of scene.visualLocations){
   const f=bed.foundation, img=art.get(f.data);
   if(img)drawImage(img,f.x,f.y,f.width,f.height,f.rotation||0);
 }
 for(const render of buildings)render();
 for(let i=0;i<scene.visualLocations.length;i++){
   const bed=scene.visualLocations[i], planted=state.beds[i];
   if(!planted)continue;
   const choice=bed.choices.find(c=>c.id===planted.crop);
   const a=choice?.appearances[currentStage(planted)];
   const img=a&&art.get(a.data);
   if(img)drawImage(img,a.x,a.y,a.width,a.height,a.rotation||0);
 }
 for(const render of animals)render();
}
async function loadArtwork(){
 const data = await fetch(SCENE_URL,{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('Scene file unavailable ('+r.status+').');return r.json();});
 if(data.format!=='game-graphics-workshop-scene'||data.visualLocations?.length!==6)throw Error('Unexpected scene format.');
 scene=data; canvas.width=data.canvas.width;canvas.height=data.canvas.height;
 const sources = new Set([data.background]);
 for(const o of data.objects)sources.add(o.data);
 for(const bed of data.visualLocations){sources.add(bed.foundation.data);for(const choice of bed.choices)for(const a of choice.appearances)sources.add(a.data);}
 const resolved=await Promise.all([...sources].map(async src=>[src,await getImage(src)]));
 art=new Map(resolved);background=art.get(data.background);
 await loadAnimations();
 if(!background)throw Error('Background could not be decoded.');
 draw();
}
// Animation metadata describes playback; the embedded scene image is a static
// positioning preview and must never be mistaken for the sprite strip.
async function loadAnimations(){
 animatedObjects.clear();
 for(const o of scene.objects){
   if(!o.animation)continue;
   const config=o.animation;
   // The original Sprite Factory export uses the named source file in animals/.
   const base='../assets/farm-v2/animals/';
   const sourceName=config.metadata?.replace(/\.json$/i,'.webp')||config.asset;
   try{
     const [metadataResponse,strip]=await Promise.all([
       fetch(base+encodeURIComponent(config.metadata)),
       image(base+encodeURIComponent(sourceName))
     ]);
     if(!metadataResponse.ok)throw Error('Metadata not found');
     const metadata=await metadataResponse.json();
     const fw=metadata.frameWidth,fh=metadata.frameHeight,count=metadata.frameCount;
     if(metadata.layout!=='horizontal'||!Number.isInteger(count)||count<1||strip.width!==fw*count||strip.height!==fh)throw Error('Sprite strip dimensions do not match metadata');
     const frames=[];
     for(let i=0;i<count;i++){
       const frame=document.createElement('canvas');frame.width=fw;frame.height=fh;
       frame.getContext('2d').drawImage(strip,i*fw,0,fw,fh,0,0,fw,fh);
       frames.push(frame);
     }
     animatedObjects.set(o,{frames,fps:metadata.fps||config.fps||3});
   }catch(error){
     console.warn('Animation unavailable; keeping static scene preview:',o.name,error);
   }
 }
}

function openPanel(title){liveProductionPanel=null;panelTitle.textContent=title;panelContent.replaceChildren();panel.hidden=false;}
function closePanel(){panel.hidden=true;selectedBed=-1;liveProductionPanel=null;}
document.querySelector('#close').onclick=closePanel;
document.addEventListener('keydown',e=>{if(e.key==='Escape')closePanel();});
function button(label,fn,disabled=false){const b=document.createElement('button');b.textContent=label;b.disabled=disabled;b.onclick=fn;return b;}
function entry(label,action,disabled=false){const div=document.createElement('div');div.className='entry';const span=document.createElement('span');span.textContent=label;div.append(span);if(action)div.append(button(action.label,action.fn,disabled));panelContent.append(div);}
function inventoryCount(c){return state.inventory[c]||0;}
function refresh(){document.querySelector('#coins').textContent='🪙 '+state.coins;draw();}
function plantBed(i,crop){state.beds[i]={crop,plantedAt:now()};save();closePanel();tell('Bed '+(i+1)+': planted '+NAMES[crop]+'.');refresh();}
function tapBed(i){
 const b=state.beds[i];
 if(b){if(ready(b)){state.inventory[b.crop]=(state.inventory[b.crop]||0)+1;storyEvent(state.story,'harvest.'+b.crop);state.beds[i]=null;save();tell('Harvested '+NAMES[b.crop]+' from bed '+(i+1)+'.');refresh();}
 else tell(NAMES[b.crop]+' growing — '+Math.ceil((TIMES[b.crop]-(now()-b.plantedAt))/1000)+' seconds left.');
 return;}
 selectedBed=i;openPanel('Plant bed '+(i+1));
 for(const c of scene.visualLocations[i].choices)itemEntry(c.id,(NAMES[c.id]||c.id)+' · '+Math.ceil(TIMES[c.id]/1000)+' sec to grow',{label:'Plant',fn:()=>plantBed(i,c.id)});
}
const itemName=id=>NAMES[id]||GOODS[id]?.[0]||id;
const itemPrice=id=>PRICES[id]||GOODS[id]?.[1]||0;
const hasItems=needs=>Object.entries(needs).every(([id,n])=>inventoryCount(id)>=n);
const ingredients=needs=>Object.entries(needs).map(([id,n])=>n+' '+itemName(id)).join(' + ');
function barn(){
 openPanel('Barn inventory');
 for(const id of [...Object.keys(NAMES),...Object.keys(GOODS)])
  itemEntry(id,itemName(id)+': '+inventoryCount(id));
}
function market(){
 openPanel('Farm market');
 for(const id of [...Object.keys(NAMES),...Object.keys(GOODS)]){
  const price=itemPrice(id);
  itemEntry(id,itemName(id)+' · '+inventoryCount(id)+' stored · '+price+' coins each',
   {label:'Sell 1',fn:()=>{if(inventoryCount(id)<1)return;state.inventory[id]--;state.coins+=price;save();refresh();market();}},
   inventoryCount(id)<1);
 }
}
const ANIMALS={
 cow:{name:'Cow',resource:'milk',quantity:2,seconds:90,feed:'wheat'},
 sheep:{name:'Sheep',resource:'wool',quantity:2,seconds:90,feed:'wheat'},
 chicken:{name:'Chickens',resource:'eggs',quantity:2,seconds:60,feed:'rainbow-chard'}
};
function animals(){
 const previousScroll=panel.scrollTop;
 openPanel('Farm animals');
 liveProductionPanel=animals;
 for(const [id,a] of Object.entries(ANIMALS)){
  const started=state.animals[id],remaining=started?Math.max(0,Math.ceil((started+a.seconds*1000-now())/1000)):0;
  const section=document.createElement('section');
  section.className='animal-production';
  const heading=document.createElement('h3');heading.textContent=a.name;section.append(heading);
  const output=document.createElement('div');output.className='animal-product-line';
  if(PRODUCT_ART[a.resource])addArt(output,'products',PRODUCT_ART[a.resource],itemName(a.resource));
  const summary=document.createElement('span');
  summary.textContent='Produces '+a.quantity+' '+itemName(a.resource)+' · '+(started?(remaining?remaining+' sec remaining':'Ready to collect'):'Ready to feed');
  output.append(summary);section.append(output);
  const feed=document.createElement('div');feed.className='animal-feed-line';
  if(a.feed&&PRODUCT_ART[a.feed])addArt(feed,'products',PRODUCT_ART[a.feed],itemName(a.feed));
  const feedLabel=document.createElement('span');
  feedLabel.textContent=a.feed?'Feed: 1 '+itemName(a.feed)+' · '+inventoryCount(a.feed)+' in barn':'Start production';
  feed.append(feedLabel);
  feed.append(button(a.feed?'Feed':'Start',()=>{
   if(state.animals[id]||a.feed&&inventoryCount(a.feed)<1)return;
   if(a.feed)state.inventory[a.feed]--;
   state.animals[id]=now();save();animals();
  },!!started||!!a.feed&&inventoryCount(a.feed)<1));
  section.append(feed);
  const collection=document.createElement('div');collection.className='animal-collect-line';
  const collectionLabel=document.createElement('span');
  collectionLabel.textContent=started?(remaining?'Production in progress':'Ready: '+a.quantity+' '+itemName(a.resource)):'Not producing yet';
  collection.append(collectionLabel);
  collection.append(button('Collect',()=>{
   if(!state.animals[id]||now()-state.animals[id]<a.seconds*1000)return;
   state.inventory[a.resource]+=a.quantity;state.animals[id]=0;
   if(!state.unlocked.includes(a.resource))state.unlocked.push(a.resource);
   save();refresh();animals();
  },!started||remaining>0));
  section.append(collection);
  panelContent.append(section);
 }
 panel.scrollTop=previousScroll;
}
function factory(id){
 const previousScroll=panel.scrollTop;
 const title={bakery:'Farm Bakery',creamery:'Creamery & Smoothies',textile:'Textile Workshop'}[id];
 openPanel(title);
 liveProductionPanel=()=>factory(id);
 const queue=state.queues[id];
 entry('Production queue: '+queue.length+' / 3');
 queue.forEach((job,i)=>{
  const remaining=Math.max(0,Math.ceil((job.finish-now())/1000));
  itemEntry(job.product,itemName(job.product)+(remaining?' · '+remaining+' sec remaining':' · Ready'),
   {label:'Collect',fn:()=>{
    if(now()<job.finish||state.queues[id][i]!==job)return;
    state.inventory[job.product]++;
    state.queues[id].splice(i,1);
    if(!state.unlocked.includes(job.product))state.unlocked.push(job.product);
    save();refresh();factory(id);
   }},remaining>0);
 });
 for(const [product,needs,seconds] of RECIPES[id]){
  const recipe=document.createElement('section');recipe.className='recipe-card';
  const heading=document.createElement('div');heading.className='recipe-heading';
  if(PRODUCT_ART[product])addArt(heading,'products',PRODUCT_ART[product],itemName(product));
  const name=document.createElement('strong');name.textContent=itemName(product)+' · '+seconds+' sec';heading.append(name);
  const make=button('Make',()=>{
   if(state.queues[id].length>=3||!hasItems(needs))return;
   for(const [ingredient,n] of Object.entries(needs))state.inventory[ingredient]-=n;
   const last=state.queues[id].reduce((end,j)=>Math.max(end,j.finish),now());
   state.queues[id].push({product,finish:last+seconds*1000});
   save();refresh();factory(id);
  },queue.length>=3||!hasItems(needs));
  heading.append(make);recipe.append(heading);
  const list=document.createElement('div');list.className='recipe-ingredients';
  for(const [ingredient,needed] of Object.entries(needs)){
   const available=inventoryCount(ingredient),line=document.createElement('div');
   line.className='recipe-ingredient'+(available<needed?' ingredient-short':'');
   if(PRODUCT_ART[ingredient])addArt(line,'products',PRODUCT_ART[ingredient],itemName(ingredient));
   const label=document.createElement('span');
   label.textContent=itemName(ingredient)+': '+available+' / '+needed+(available<needed?' · Need '+(needed-available)+' more':' · Ready');
   line.append(label);list.append(line);
  }
  recipe.append(list);panelContent.append(recipe);
 }
 panel.scrollTop=previousScroll;
}
function bakery(){factory('bakery');}
function creamery(){factory('creamery');}
function textile(){factory('textile');}
const RAW_IDS=[...Object.keys(NAMES),'milk','eggs','wool'];
const FINISHED_IDS=Object.keys(GOODS).filter(id=>!['milk','eggs','wool'].includes(id));
function makeOrder(){
 const customer=CUSTOMERS[state.order%CUSTOMERS.length];
 const raw=RAW_IDS.filter(id=>Object.hasOwn(NAMES,id)||state.unlocked.includes(id));
 const finished=FINISHED_IDS.filter(id=>state.unlocked.includes(id));
 let pool=customer.kind==='raw'?raw:customer.kind==='finished'?finished:[...raw,...finished];
 // The store owner waits for a first crafted product, rather than demanding an impossible delivery.
 if(!pool.length)pool=raw;
 const item=pool[(Math.floor(state.order/CUSTOMERS.length)+state.order)%pool.length];
 const quantity=FINISHED_IDS.includes(item)?1:2+(state.order%3);
 return {customer:state.order%CUSTOMERS.length,item,quantity,reward:Math.round(quantity*itemPrice(item)*1.25)};
}
function orders(){
 if(!state.pendingOrder){state.pendingOrder=makeOrder();save();}
 const o=state.pendingOrder,c=CUSTOMERS[o.customer];
 openPanel('Neighbor order');
 entry(c.name+' · '+c.role);
 addArt(panelContent,'NPCs',NPC_ART[o.customer],c.name,true);
 entry(c.message);
 itemEntry(o.item,'Request: '+o.quantity+' '+itemName(o.item));
 entry('In barn: '+inventoryCount(o.item));
 entry('Reward: '+o.reward+' coins (25% order bonus)');
 entry('Deliver order',{label:'Deliver',fn:()=>{
  if(inventoryCount(o.item)<o.quantity)return;
  state.inventory[o.item]-=o.quantity;state.coins+=o.reward;
  state.order++;state.pendingOrder=null;storyEvent(state.story,'order.delivered');save();refresh();orders();tell('Order delivered to '+c.name+'!');
 }},inventoryCount(o.item)<o.quantity);
}

function backup(){openPanel('Farm backup');entry('This new farm has separate saved progress from the previous game.');
 if(saveRecoveryRequired)entry('Saved data could not be loaded. Restore a valid backup to resume saving.');entry('Download a backup',{label:'Export',fn:()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='little-field-farm-new-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);}});
 const input=document.createElement('input');input.type='file';input.accept='.json,application/json';panelContent.append(input);
 entry('Restore selected backup',{label:'Restore',fn:async()=>{if(!input.files?.[0]){tell('Choose a backup first.');return;}try{const s=validateSave(JSON.parse(await input.files[0].text()));if(!confirm('Replace this new farm\'s saved progress?'))return;state=s;saveRecoveryRequired=false;save();refresh();closePanel();tell('Backup restored.');}catch(e){tell('Restore failed: '+e.message);}}});}
function stories(){
 const view=storyView(state.story);
 openPanel(view.title);
 for(const line of view.lines)entry(line);
 for(const [label,action] of view.actions)entry(label,{label,fn:()=>{if(storyAction(state.story,action)){save();stories();}}});
}
const panels={barn,market,orders,bakery,creamery,textile,animals,backup,stories};
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>panels[b.dataset.panel]());
function hit(rect,x,y){return x>=rect.x&&x<=rect.x+rect.width&&y>=rect.y&&y<=rect.y+rect.height;}
canvas.addEventListener('pointerup',e=>{
 if(!scene||!panel.hidden)return;
 const r=canvas.getBoundingClientRect(),x=(e.clientX-r.left)*canvas.width/r.width,y=(e.clientY-r.top)*canvas.height/r.height;
 for(const [i,b] of scene.visualLocations.entries())if(hit(b.touchZone,x,y)){tapBed(i);return;}
 for(const h of scene.hotspots)if(hit(h,x,y)){const name=h.name.toLowerCase();if(name.includes('market'))market();else if(name.includes('order'))orders();else if(name.includes('barn')||name.includes('storage'))barn();return;}
 for(const o of [...scene.objects].reverse()){if(!o.interactive||!o.touchZone||!hit(o.touchZone,x,y))continue;const name=o.name.toLowerCase();if(name.includes('bakery'))bakery();else if(o.animation||name.includes('chicken')||name.includes('cow')||name.includes('sheep'))animals();else if(name.includes('creamery'))creamery();else if(name.includes('textile'))textile();return;}
});
try{
 const saved=localStorage.getItem(KEY);
  try{state=saved?validateSave(JSON.parse(saved)):emptyState();}
  catch(error){
   console.error('Saved farm failed validation; preserving original save:',error);
   state=emptyState();saveRecoveryRequired=true;
   tell('Saved progress could not be read. Saving is blocked until a valid backup is restored.');
  }
 await loadArtwork();loading.remove();refresh();if(!saved)tell('Tap a bed to plant. Your new farm saves automatically.');
 setInterval(()=>{if(panel.hidden)draw();},100);
  // Refresh time-dependent labels and button states while production panels stay open.
  setInterval(()=>{if(!panel.hidden&&liveProductionPanel)liveProductionPanel();},1000);
}catch(e){console.error(e);loading.textContent='Farm could not start: '+e.message;loading.style.color='#fff';}
