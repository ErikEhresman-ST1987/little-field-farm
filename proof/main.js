import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@8.14.3/dist/pixi.min.mjs';
const stageEl=document.getElementById('stage'), status=document.getElementById('status');
const app=new PIXI.Application();
await app.init({resizeTo:stageEl,background:'#203b2a',antialias:true,resolution:Math.min(devicePixelRatio||1,2),autoDensity:true});
stageEl.appendChild(app.canvas);
const world=new PIXI.Container();app.stage.addChild(world);
const names=['empty','growing','mature'];
let textures;
try{
  const background=await PIXI.Assets.load('proof/assets/landscape.webp');
  textures=await Promise.all(names.map(n=>PIXI.Assets.load('proof/assets/kohlrabi-'+n+'.webp')));
  const scene=new PIXI.Sprite(background);scene.width=1536;scene.height=1024;world.addChild(scene);
}catch(err){status.textContent='Essential artwork is missing. Download the complete test package to run this proof.';throw err;}
const points=[[565,510],[765,580],[945,485]],plots=[];
points.forEach((p,i)=>{const sprite=new PIXI.Sprite(textures[i]);sprite.anchor.set(.5,.79);sprite.position.set(...p);sprite.width=185;sprite.height=185;sprite.eventMode='static';sprite.cursor='pointer';sprite.on('pointertap',()=>{if(moved)return;const obj=plots[i];obj.state=(obj.state+1)%3;obj.sprite.texture=textures[obj.state]});world.addChild(sprite);plots.push({sprite,state:i})});
let scale=1,moved=false,down=null,last=null,dist=0;
function fit(){const w=stageEl.clientWidth,h=stageEl.clientHeight;scale=Math.min(w/1100,h/760);world.scale.set(scale);world.position.set((w-1536*scale)/2,(h-1024*scale)/2)}
fit();
function zoom(f,cx,cy){const old=scale;scale=Math.max(.35,Math.min(2.8,scale*f));world.x=cx-(cx-world.x)*scale/old;world.y=cy-(cy-world.y)*scale/old;world.scale.set(scale)}
const pos=e=>{const r=app.canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}};
stageEl.addEventListener('pointerdown',e=>{stageEl.setPointerCapture(e.pointerId);const p=pos(e);down=p;last=p;moved=false});
stageEl.addEventListener('pointermove',e=>{if(!last)return;const p=pos(e);if(Math.hypot(p.x-down.x,p.y-down.y)>6)moved=true;world.x+=p.x-last.x;world.y+=p.y-last.y;last=p});
stageEl.addEventListener('pointerup',()=>{last=null;setTimeout(()=>moved=false,100)});
stageEl.addEventListener('pointercancel',()=>last=null);
stageEl.addEventListener('wheel',e=>{e.preventDefault();const p=pos(e);zoom(e.deltaY<0?1.08:.92,p.x,p.y)},{passive:false});
let pinch=null;
stageEl.addEventListener('touchmove',e=>{if(e.touches.length===2){const a=e.touches[0],b=e.touches[1],d=Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY);const r=app.canvas.getBoundingClientRect();const cx=(a.clientX+b.clientX)/2-r.left,cy=(a.clientY+b.clientY)/2-r.top;if(pinch)zoom(d/pinch,cx,cy);pinch=d}},{passive:true});
stageEl.addEventListener('touchend',()=>pinch=null);
document.getElementById('reset').onclick=fit;
document.getElementById('cycle').onclick=()=>plots.forEach(p=>{p.state=(p.state+1)%3;p.sprite.texture=textures[p.state]});
window.addEventListener('resize',fit);
