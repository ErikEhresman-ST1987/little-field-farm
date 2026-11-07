'use strict';
const {SharedGameNarrative}=require('./story-engine/shared-game-narrative.cjs');
const packages=require('./story-ink-generated.cjs');
function createCoordinator(saved){
 const createGame=()=>({
  progress:Object.fromEntries(packages.map(p=>[p.manifest.storyId,{completedChapters:[]}])),
  snapshot(){return JSON.parse(JSON.stringify(this.progress));},
  restore(s){
   if(!s||typeof s!=='object'||Array.isArray(s))throw Error('Invalid game progress');
   for(const p of packages){
    const id=p.manifest.storyId,v=s[id];
    if(!v||!Array.isArray(v.completedChapters)||v.completedChapters.some(c=>!p.manifest.chapters.some(ch=>ch.id===c))||
     new Set(v.completedChapters).size!==v.completedChapters.length)throw Error('Invalid story progress '+id);
   }
   this.progress=JSON.parse(JSON.stringify(s));
  },
  event(name,{storyId,chapterId}){
   const pkg=packages.find(p=>p.manifest.storyId===storyId);
   if(!pkg)return {changed:false,completed:false};
   const chapterIndex=pkg.manifest.chapters.findIndex(c=>c.id===chapterId);
   const objective=pkg.manifest.chapterObjectives?.[chapterIndex];
   if(!objective||name!==objective.event||this.progress[storyId].completedChapters.includes(chapterId))
    return {changed:false,completed:false};
   this.progress[storyId].completedChapters.push(chapterId);
   return {changed:true,completed:true};
  }
 });
 return new SharedGameNarrative({packages,createGame,save:saved});
}
window.FarmInk={createCoordinator,storyIds:packages.map(p=>p.manifest.storyId)};
