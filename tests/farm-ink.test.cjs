'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
global.window={};
require('../scene-rebuild/story-ink-entry.cjs');
const {createSession}=window.FarmInk;
test('Ink dialogue choice and saved state resume without duplicate choices',()=>{
 const session=createSession(0);
 const first=session.view();
 assert.match(first.lines.join(' '),/Juliette/);
 assert.equal(first.choices.length,2);
 const chosen=session.choose(0);
 assert.match(chosen.lines.join(' '),/Thank you/);
 assert.equal(chosen.choices.length,0);
 const restored=createSession(0,chosen.ink);
 const again=restored.view();
 assert.equal(again.choices.length,0);
 assert.equal(again.lines.length,0);
});
test('Ink chapters are independently loadable',()=>{
 for(let i=0;i<3;i++)assert.ok(createSession(i).view().lines.length>0);
 assert.throws(()=>createSession(3),/Invalid chapter/);
});
