'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('scene-rebuild/farm-story.js','utf8').replaceAll('export function ','function ');
const ctx={};vm.createContext(ctx);vm.runInContext(source+'\nthis.api={freshStory,validStory,storyAction,storyEvent,storyView};',ctx);
const {freshStory,validStory,storyAction,storyEvent,storyView}=ctx.api;
test('sample story follows actual wheat harvest and neighbor delivery',()=>{
 const s=freshStory();
 assert.equal(storyEvent(s,'harvest.wheat'),false);
 assert.equal(storyAction(s,'accept'),true);
 assert.equal(storyEvent(s,'harvest.wheat'),true);
 assert.equal(storyAction(s,'next'),false);
 assert.equal(storyEvent(s,'harvest.wheat'),true);
 assert.equal(storyEvent(s,'harvest.wheat'),false);
 assert.equal(storyAction(s,'next'),true);
 assert.equal(storyEvent(s,'order.delivered'),true);
 assert.equal(storyEvent(s,'order.delivered'),false);
 assert.equal(storyAction(s,'next'),true);
 assert.equal(storyAction(s,'finish'),true);
 assert.equal(s.status,'completed');
 assert.equal(storyEvent(s,'order.delivered'),false);
 assert.equal(storyView(s).actions.length,0);
});
test('save roundtrip, old save defaults, and malformed receipts',()=>{
 const s=freshStory();storyAction(s,'accept');s.lines=['Juliette spoke'];s.ink='sample';
 const saved=JSON.parse(JSON.stringify(s));validStory(saved);
 assert.equal(saved.lines[0],'Juliette spoke');
 saved.receipts=['neighbor-order','neighbor-order'];
 assert.throws(()=>validStory(saved),/Invalid story/);
});
