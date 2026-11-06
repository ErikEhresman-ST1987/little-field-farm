'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const ctx={Math};vm.createContext(ctx);
vm.runInContext(fs.readFileSync('scene-rebuild/story-unlocks.js','utf8'),ctx);
const U=ctx.FarmStoryUnlocks;
test('variable Juliette thresholds are assigned once and persisted',()=>{
 const a=U.initialize(null,()=>0),b=U.initialize(null,()=>0.999);
 assert.equal(a.thresholds.juliette,2);assert.equal(b.thresholds.juliette,4);
 U.initialize(a,()=>0.999);assert.equal(a.thresholds.juliette,2);
});
test('only Juliette orders count toward Juliette invitation',()=>{
 const p=U.initialize(null,()=>0);
 U.delivered(p,1);U.delivered(p,2);U.delivered(p,0);
 assert.equal(p.unlocked.length,0);
 U.delivered(p,0);assert.equal(p.unlocked[0],'juliette');
 U.delivered(p,0);assert.equal(p.unlocked.length,1);
 U.complete(p,'juliette');assert.equal(p.unlocked.length,0);
 assert.equal(p.completed[0],'juliette');
 U.delivered(p,0);assert.equal(p.unlocked.length,0);
});
test('saved thresholds, invalid counts and invalid unlocks are checked',()=>{
 const p=U.initialize(null,()=>0.5);
 const restored=JSON.parse(JSON.stringify(p));U.initialize(restored);
 assert.equal(restored.thresholds.juliette,p.thresholds.juliette);
 restored.counts[0]=-1;assert.throws(()=>U.valid(restored));
 restored.counts[0]=0;restored.unlocked=['bogus'];assert.throws(()=>U.valid(restored));
});
test('two-slot limit and story prerequisites are respected by the generic gate',()=>{
 const original=U.STORIES.slice();
 try{
  U.STORIES.push({id:'other',customer:1,minOrders:1,maxOrders:1,requires:[]},
   {id:'sequel',customer:2,minOrders:1,maxOrders:1,requires:['juliette']});
  const p=U.initialize(null,()=>0);
  U.delivered(p,0);U.delivered(p,0);U.delivered(p,1);U.delivered(p,2);
  assert.equal(p.unlocked.length,2);assert.equal(p.unlocked.includes('sequel'),false);
  U.complete(p,'juliette');
  assert.equal(p.unlocked.includes('sequel'),true);
  assert.equal(p.unlocked.length,2);
 }finally{U.STORIES.splice(0,U.STORIES.length,...original);}
});
