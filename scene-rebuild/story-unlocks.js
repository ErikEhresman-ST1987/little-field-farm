// Story opportunity progression, independent of Ink chapter mechanics.
(function(root){
 'use strict';
 const LIMIT=2;
 const STORIES=[{id:'juliette',customer:0,minOrders:2,maxOrders:4,requires:[]}];
 const fresh=()=>({counts:[0,0,0,0],thresholds:{},unlocked:[],completed:[]});
 function valid(p){
  if(!p||!Array.isArray(p.counts)||p.counts.length!==4||p.counts.some(n=>!Number.isSafeInteger(n)||n<0)||
   !p.thresholds||typeof p.thresholds!=='object'||Array.isArray(p.thresholds)||
   !Array.isArray(p.unlocked)||!Array.isArray(p.completed)||
   [...p.unlocked,...p.completed].some(id=>!STORIES.some(s=>s.id===id))||
   new Set(p.unlocked).size!==p.unlocked.length||new Set(p.completed).size!==p.completed.length||
   p.unlocked.length>LIMIT||p.completed.some(id=>p.unlocked.includes(id)))throw Error('Invalid story unlock progress');
  for(const s of STORIES)if(p.thresholds[s.id]!==undefined&&
   (!Number.isSafeInteger(p.thresholds[s.id])||p.thresholds[s.id]<s.minOrders||p.thresholds[s.id]>s.maxOrders))
   throw Error('Invalid story unlock threshold');
  return p;
 }
 function initialize(p,random=Math.random){
  p=p||fresh();valid(p);
  for(const s of STORIES)if(p.thresholds[s.id]===undefined)
   p.thresholds[s.id]=s.minOrders+Math.floor(Math.min(0.999999999999,Math.max(0,random()))*(s.maxOrders-s.minOrders+1));
  return p;
 }
 function reconcile(p){
  valid(p);
  for(const s of STORIES){
   if(p.unlocked.length>=LIMIT)break;
   if(!p.unlocked.includes(s.id)&&!p.completed.includes(s.id)&&
    s.requires.every(id=>p.completed.includes(id))&&p.counts[s.customer]>=p.thresholds[s.id])
    p.unlocked.push(s.id);
  }
  return p;
 }
 function delivered(p,customer){
  valid(p);
  if(!Number.isInteger(customer)||customer<0||customer>=p.counts.length)throw Error('Invalid customer');
  p.counts[customer]++;
  return reconcile(p);
 }
 function complete(p,id){
  valid(p);
  if(!p.unlocked.includes(id))throw Error('Story not unlocked');
  p.unlocked.splice(p.unlocked.indexOf(id),1);p.completed.push(id);
  return reconcile(p);
 }
 root.FarmStoryUnlocks={LIMIT,STORIES,fresh,valid,initialize,reconcile,delivered,complete};
})(typeof window==='undefined'?globalThis:window);
