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
console.log('Andy save compatibility checks passed: fresh, active, completed, round-trip, invalid saves');
