'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
global.window={};require('../scene-rebuild/story-ink-entry.cjs');
const make=()=>window.FarmInk.createCoordinator();
test('approved dinner requires invitation and wheat delivery',()=>{
 const e=make();
 assert.equal(e.event('juliette','wheat.delivered').changed,false);
 e.decide('juliette','accept');
 assert.equal(e.view('juliette').chapter,'chapter-1');
 assert.equal(e.event('juliette','wheat.delivered').completed,true);
 assert.equal(e.event('juliette','wheat.delivered').changed,false);
 e.nextChapter('juliette');
 assert.equal(e.view('juliette').chapter,'chapter-2');
});
for(const crop of ['squash','rainbow-chard']){
 test('approved dinner persists '+crop+' and final choice through reload',()=>{
  let e=make();e.decide('juliette','accept');
  e.event('juliette','wheat.delivered');
  e=window.FarmInk.createCoordinator(JSON.parse(JSON.stringify(e.snapshot())));
  e.nextChapter('juliette');
  assert.equal(e.view('juliette').choices.length,2);
  e.choose('juliette',crop==='squash'?0:1);
  assert.equal(e.event('juliette','select.'+crop).changed,true);
  assert.equal(e.event('juliette','select.'+(crop==='squash'?'rainbow-chard':'squash')).changed,false);
  assert.equal(e.game.snapshot().vegetable,crop);
  e=window.FarmInk.createCoordinator(JSON.parse(JSON.stringify(e.snapshot())));
  assert.equal(e.game.snapshot().vegetable,crop);
  assert.equal(e.event('juliette','vegetable.delivered').completed,true);
  assert.equal(e.event('juliette','vegetable.delivered').changed,false);
  e.nextChapter('juliette');
  assert.equal(e.view('juliette').choices.length,2);
  e.choose('juliette',crop==='squash'?0:1);
  e=window.FarmInk.createCoordinator(JSON.parse(JSON.stringify(e.snapshot())));
  assert.equal(e.view('juliette').choices.length,0);
  assert.equal(e.event('juliette','finish.story').completed,true);
  assert.equal(e.view('juliette').invitation,'completed');
  assert.equal(window.FarmInk.createCoordinator(e.snapshot()).view('juliette').invitation,'completed');
 });
}
