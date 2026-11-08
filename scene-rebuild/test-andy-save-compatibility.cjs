'use strict';
const assert=require('node:assert/strict');
global.window={};
require('./story-ink-entry.cjs');
const create=window.FarmInk.createCoordinator;
const ids=window.FarmInk.storyIds;
assert.deepEqual(ids.sort(),['andy','juliette']);
function oldSave(snapshot){
 const s=structuredClone(snapshot);
 delete s.game.andy;
 delete s.narrative.invitations.andy;
 delete s.narrative.registry.stories.andy;
 return s;
}
function verify(old,expected){
 const restored=create(old);
 assert.deepEqual(restored.snapshot().narrative.registry.stories.juliette,expected.narrative.registry.stories.juliette);
 assert.deepEqual(restored.snapshot().game.juliette,expected.game.juliette);
 assert.equal(restored.view('juliette').invitation,expected.narrative.invitations.juliette);
 assert.equal(restored.snapshot().game.andy.completedChapters.length,0);
 assert.equal(restored.view('andy').chapter,'chapter-1');
 assert.deepEqual(create(restored.snapshot()).snapshot(),restored.snapshot());
}
const newGame=create();
verify(oldSave(newGame.snapshot()),newGame.snapshot());
const active=create();
active.decide('juliette','accept');
active.choose('juliette',0);
verify(oldSave(active.snapshot()),active.snapshot());
const completed=create();
completed.decide('juliette','accept');
completed.choose('juliette',0);
assert.equal(completed.event('juliette','wheat.delivered').completed,true);
completed.nextChapter('juliette');
completed.choose('juliette',0);
assert.equal(completed.event('juliette','chapter.advance').completed,true);
completed.nextChapter('juliette');
assert.equal(completed.event('juliette','finish.story').completed,true);
verify(oldSave(completed.snapshot()),completed.snapshot());
const invalid=oldSave(active.snapshot());
invalid.narrative.invitations.unknown='active';
assert.throws(()=>create(invalid),/Unknown saved invitation/);
const bad=oldSave(active.snapshot());
bad.narrative.registry.stories.juliette.contentVersion='corrupted';
assert.throws(()=>create(bad));
// Verify all three Andy chapters, each with three selectable branches.
for(const choiceIndex of [0,1,2]){
 const story=create();
 story.decide('andy','accept');
 for(const [chapter,event] of [['chapter-1','chapter.advance'],['chapter-2','clues.connected'],['chapter-3','finish.story']]){
  const view=story.view('andy');
  assert.equal(view.chapter,chapter);
  assert.equal(view.choices.length,3);
  story.choose('andy',choiceIndex);
  assert.equal(story.event('andy',event).completed,true);
  if(chapter!=='chapter-3')story.nextChapter('andy');
 }
 assert.equal(story.view('andy').invitation,'completed');
 assert.equal(story.snapshot().game.andy.completedChapters.length,3);
 assert.deepEqual(create(story.snapshot()).snapshot(),story.snapshot());
}
// Existing farm unlock records must acquire Andy's threshold without resetting counts.
require('./story-ink-registry.js');
require('./story-unlocks.js');
const unlocks=window.FarmStoryUnlocks;
const legacyUnlock={counts:[3,2,0,0],thresholds:{juliette:2},unlocked:['juliette'],completed:[]};
unlocks.initialize(legacyUnlock,()=>0);
assert.equal(legacyUnlock.counts[0],3);
assert.equal(legacyUnlock.counts[1],2);
assert.equal(legacyUnlock.thresholds.juliette,2);
assert.equal(legacyUnlock.thresholds.andy,2);
unlocks.reconcile(legacyUnlock);
assert.ok(legacyUnlock.unlocked.includes('andy'));
assert.ok(legacyUnlock.unlocked.includes('juliette'));
assert.equal(legacyUnlock.unlocked.length,2);
console.log('Story checks passed: legacy Juliette saves, invalid saves, all Andy choices, completion and reload');
