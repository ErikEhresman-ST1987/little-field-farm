'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
global.window={};require('../scene-rebuild/story-ink-entry.cjs');
test('approved Ink dialogue loads all chapters and keeps chosen lines after refresh',()=>{
 let e=window.FarmInk.createCoordinator();
 e.decide('juliette','accept');
 assert.match(e.view('juliette').lines.join(' '),/No birthday, no holiday/);
 e.event('juliette','wheat.delivered');e.nextChapter('juliette');
 assert.equal(e.view('juliette').choices.length,2);
 e.choose('juliette',1);e.event('juliette','select.rainbow-chard');
 e=window.FarmInk.createCoordinator(e.snapshot());
 assert.equal(e.view('juliette').choices.length,0);
 assert.match(e.view('juliette').lines.join(' '),/Keiko will be delighted/);
 e.event('juliette','vegetable.delivered');e.nextChapter('juliette');
 assert.match(e.view('juliette').lines.join(' '),/inventory list/);
 assert.equal(e.view('juliette').choices.length,2);
});
