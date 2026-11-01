const SCENE_URL = '../assets/farm-v2/background/workshop-scene%20(9).json';
const KEY = 'little-field-farm-scene-rebuild-v1';
const canvas = document.querySelector('#farm'), ctx = canvas.getContext('2d');
const notice = document.querySelector('#notice'), loading = document.querySelector('#loading');
const panel = document.querySelector('#panel'), panelTitle = document.querySelector('#panel-title'), panelContent = document.querySelector('#panel-content');
const NAMES = { wheat:'Wheat', 'rainbow-chard':'Rainbow Chard', pineapple:'Pineapple', strawberry:'Strawberry', squash:'Squash' };
const PRICES = { wheat:4, 'rainbow-chard':6, pineapple:9, strawberry:7, squash:8 };
const TIMES = { wheat:45000, 'rainbow-chard':55000, pineapple:90000, strawberry:65000, squash:75000 };
let scene, state, art = new Map(), background, selectedBed = -1;
const animatedObjects = new Map();
const now = () => Date.now();
const emptyState = () => ({version:1, coins:30, beds:Array(6).fill(null), inventory:Object.fromEntries(Object.keys(NAMES).map(k=>[k,0])), order:0, bakery:[], products:0, eggs:0, chickenFedAt:0});
function validateSave(s) {
 if(!s || s.version!==1 || !Array.isArray(s.beds) || s.beds.length!==6 || !s.inventory || typeof s.coins!=='number') throw Error('Unrecognized save; original data preserved.');
 return s;
}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){tell('Save failed. Export a backup before closing.');console.error(e);}}
function tell(s){notice.textContent=s;}
function image(src){return new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=reject;im.src=src;});}
async function getImage(src){if(!src)return null;if(!art.has(src))art.set(src,image(src).catch(e=>{console.warn('Image unavailable',e);return null;}));return art.get(src);}
function drawImage(img,x,y,w,h,rotation=0){if(!img)return;ctx.save();ctx.translate(x,y);ctx.rotate(rotation*Math.PI/180);ctx.drawImage(img,-w/2,-h/2,w,h);ctx.restore();}
function objectHeight(o,img){return o.w*img.height/img.width;}
function currentStage(bed){if(!bed)return -1;return Math.min(2,Math.floor((now()-bed.plantedAt)/TIMES[bed.crop]*3));}
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

function openPanel(title){panelTitle.textContent=title;panelContent.replaceChildren();panel.hidden=false;}
function closePanel(){panel.hidden=true;selectedBed=-1;}
document.querySelector('#close').onclick=closePanel;
document.addEventListener('keydown',e=>{if(e.key==='Escape')closePanel();});
function button(label,fn,disabled=false){const b=document.createElement('button');b.textContent=label;b.disabled=disabled;b.onclick=fn;return b;}
function entry(label,action,disabled=false){const div=document.createElement('div');div.className='entry';const span=document.createElement('span');span.textContent=label;div.append(span);if(action)div.append(button(action.label,action.fn,disabled));panelContent.append(div);}
function inventoryCount(c){return state.inventory[c]||0;}
function refresh(){document.querySelector('#coins').textContent='🪙 '+state.coins;draw();}
function plantBed(i,crop){state.beds[i]={crop,plantedAt:now()};save();closePanel();tell('Bed '+(i+1)+': planted '+NAMES[crop]+'.');refresh();}
function tapBed(i){
 const b=state.beds[i];
 if(b){if(ready(b)){state.inventory[b.crop]=(state.inventory[b.crop]||0)+1;state.beds[i]=null;save();tell('Harvested '+NAMES[b.crop]+' from bed '+(i+1)+'.');refresh();}
 else tell(NAMES[b.crop]+' growing — '+Math.ceil((TIMES[b.crop]-(now()-b.plantedAt))/1000)+' seconds left.');
 return;}
 selectedBed=i;openPanel('Plant bed '+(i+1));
 for(const c of scene.visualLocations[i].choices)entry(NAMES[c.id]||c.id,{label:'Plant',fn:()=>plantBed(i,c.id)});
}
function barn(){openPanel('Barn inventory');for(const c of Object.keys(NAMES))entry(NAMES[c]+': '+inventoryCount(c));entry('Eggs: '+state.eggs);entry('Bakery goods: '+state.products);}
function market(){openPanel('Farm market');for(const c of Object.keys(NAMES))entry(NAMES[c]+' · '+inventoryCount(c)+' stored · '+PRICES[c]+' coins each',{label:'Sell 1',fn:()=>{state.inventory[c]--;state.coins+=PRICES[c];save();refresh();market();}},inventoryCount(c)<1);
 entry('Bakery goods · '+state.products+' stored · 15 coins each',{label:'Sell 1',fn:()=>{state.products--;state.coins+=15;save();refresh();market();}},state.products<1);
 entry('Eggs · '+state.eggs+' stored · 5 coins each',{label:'Sell 1',fn:()=>{state.eggs--;state.coins+=5;save();refresh();market();}},state.eggs<1);}
function orderSpec(){const crops=Object.keys(NAMES);const crop=crops[state.order%crops.length];return {crop,quantity:2+(state.order%3),reward:(2+(state.order%3))*PRICES[crop]+8};}
function orders(){openPanel('Neighbor order');const o=orderSpec();entry('Request: '+o.quantity+' '+NAMES[o.crop]);entry('In barn: '+inventoryCount(o.crop));entry('Reward: '+o.reward+' coins');entry('Complete this order',{label:'Deliver',fn:()=>{state.inventory[o.crop]-=o.quantity;state.coins+=o.reward;state.order++;save();refresh();orders();tell('Order delivered!');}},inventoryCount(o.crop)<o.quantity);}
function bakery(){openPanel('Farm bakery');const done=state.bakery.filter(t=>t<=now()).length;entry('Finished goods waiting: '+done,{label:'Collect',fn:()=>{state.products+=done;state.bakery=state.bakery.filter(t=>t>now());save();bakery();}},!done);entry('Oven queue: '+state.bakery.length+' / 3');
 entry('Bake a farm loaf: 2 wheat + 1 strawberry',{label:'Bake',fn:()=>{state.inventory.wheat-=2;state.inventory.strawberry--;state.bakery.push(Math.max(now(),...state.bakery)+60000);save();bakery();}},state.bakery.length>=3||inventoryCount('wheat')<2||inventoryCount('strawberry')<1);}
function animals(){openPanel('Farm animals');entry('Cow and sheep are part of the farm scene.');entry('Chickens: '+(state.chickenFedAt?(now()-state.chickenFedAt>=60000?'Eggs ready':'Fed and resting'):'Ready to feed'));
 entry('Feed chickens 1 rainbow chard',{label:'Feed',fn:()=>{state.inventory['rainbow-chard']--;state.chickenFedAt=now();save();animals();}},!!state.chickenFedAt||inventoryCount('rainbow-chard')<1);
 entry('Collect 2 eggs',{label:'Collect',fn:()=>{state.eggs+=2;state.chickenFedAt=0;save();animals();}},!state.chickenFedAt||now()-state.chickenFedAt<60000);}
function backup(){openPanel('Farm backup');entry('This new farm has separate saved progress from the previous game.');entry('Download a backup',{label:'Export',fn:()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='little-field-farm-new-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);}});
 const input=document.createElement('input');input.type='file';input.accept='.json,application/json';panelContent.append(input);
 entry('Restore selected backup',{label:'Restore',fn:async()=>{if(!input.files?.[0]){tell('Choose a backup first.');return;}try{const s=validateSave(JSON.parse(await input.files[0].text()));if(!confirm('Replace this new farm\'s saved progress?'))return;state=s;save();refresh();closePanel();tell('Backup restored.');}catch(e){tell('Restore failed: '+e.message);}}});}
const panels={barn,market,orders,bakery,animals,backup};
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>panels[b.dataset.panel]());
function hit(rect,x,y){return x>=rect.x&&x<=rect.x+rect.width&&y>=rect.y&&y<=rect.y+rect.height;}
canvas.addEventListener('pointerup',e=>{
 if(!scene||!panel.hidden)return;
 const r=canvas.getBoundingClientRect(),x=(e.clientX-r.left)*canvas.width/r.width,y=(e.clientY-r.top)*canvas.height/r.height;
 for(const [i,b] of scene.visualLocations.entries())if(hit(b.touchZone,x,y)){tapBed(i);return;}
 for(const h of scene.hotspots)if(hit(h,x,y)){const name=h.name.toLowerCase();if(name.includes('market'))market();else if(name.includes('order'))orders();else if(name.includes('barn')||name.includes('storage'))barn();return;}
 for(const o of [...scene.objects].reverse()){if(!o.interactive||!o.touchZone||!hit(o.touchZone,x,y))continue;const name=o.name.toLowerCase();if(name.includes('bakery'))bakery();else if(o.animation||name.includes('chicken')||name.includes('cow')||name.includes('sheep'))animals();else if(name.includes('creamery')||name.includes('textile'))tell('This building is ready for a future production upgrade.');return;}
});
try{
 const saved=localStorage.getItem(KEY);state=saved?validateSave(JSON.parse(saved)):emptyState();
 await loadArtwork();loading.remove();refresh();tell('Tap a bed to plant. Your new farm saves automatically.');
 setInterval(()=>{if(panel.hidden)draw();},100);
}catch(e){console.error(e);loading.textContent='Farm could not start: '+e.message;loading.style.color='#fff';}
