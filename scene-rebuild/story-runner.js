// Reusable, data-driven story runner. Story text and objectives live in story-catalog.js.
(function(root){
'use strict';
const catalog=()=>root.FarmStoryCatalog||[];
const initial=()=>({stories:{}});
function progress(save,id){save.stories ||= {};return save.stories[id] ||= {chapter:0,choice:null,delivered:false,completed:false};}
function validate(save){
 if(!save||typeof save!=='object'||!save.stories||typeof save.stories!=='object')throw Error('Invalid story progress');
 for(const [id,p] of Object.entries(save.stories)){
  const story=catalog().find(s=>s.id===id);
  if(!story||!p||!Number.isInteger(p.chapter)||p.chapter<0||p.chapter>=story.chapters.length||
   !(p.choice===null||Number.isInteger(p.choice))||typeof p.delivered!=='boolean'||typeof p.completed!=='boolean')throw Error('Invalid story progress');
 }
 return save;
}
function show({state,openPanel,entry,storyLine,inventoryCount,save,refresh}){
 openPanel('Your Farm Stories');
 document.querySelector('#panel').classList.add('story-panel');
 entry('Your neighbors have stories to share!');
 entry('Complete customer orders to discover new adventures.');
 for(const story of catalog()){
  const available=state.storyUnlocks.unlocked.includes(story.id)||state.storyUnlocks.completed.includes(story.id);
  if(!available)continue;
  const p=progress(state.storyEngine,story.id);
  entry(story.lead+' — '+story.title+' · '+(p.completed?'Completed':'Chapter '+(p.chapter+1)+' of '+story.chapters.length),{
   label:p.completed?'View':'Open',fn:()=>openStory(story,{state,openPanel,entry,storyLine,inventoryCount,save,refresh})
  });
 }
 if(!catalog().some(s=>state.storyUnlocks.unlocked.includes(s.id)||state.storyUnlocks.completed.includes(s.id)))entry('No story invitations yet.');
}
function openStory(story,api){
 const {state,openPanel,entry,storyLine,inventoryCount,save,refresh}=api;
 const p=progress(state.storyEngine,story.id),chapter=story.chapters[p.chapter];
 openPanel(story.lead+' — '+story.title);
 document.querySelector('#panel').classList.add('story-panel');
 entry('Chapter '+(p.chapter+1)+' of '+story.chapters.length+' — '+chapter.title);
 for(const line of chapter.lines)storyLine(line);
 if(p.choice!==null&&chapter.choices?.[p.choice])for(const line of chapter.choices[p.choice].reply||[])storyLine(line);
 if(p.completed){entry('Story completed.');return;}
 const update=()=>{save();openStory(story,api);};
 if(chapter.choices&&p.choice===null){
  for(let i=0;i<chapter.choices.length;i++)entry(chapter.choices[i].text,{label:'Choose',fn:()=>{p.choice=i;update();}});
  return;
 }
 const objective=chapter.objective;
 if(objective&&!p.delivered){
  if(objective.type!=='deliver'){entry('Unsupported objective: '+objective.type);return;}
  entry(objective.label+'. In barn: '+inventoryCount(objective.item));
  entry('Deliver ingredients',{label:'Deliver',fn:()=>{
   if(inventoryCount(objective.item)<objective.quantity)return;
   state.inventory[objective.item]-=objective.quantity;p.delivered=true;save();refresh();openStory(story,api);
  }},inventoryCount(objective.item)<objective.quantity);
  return;
 }
 const last=p.chapter===story.chapters.length-1;
 entry(last?'Finish story':'Next chapter',{label:last?'Finish':'Continue',fn:()=>{
  if(last){
   p.completed=true;
   if(state.storyUnlocks.unlocked.includes(story.id))root.FarmStoryUnlocks.complete(state.storyUnlocks,story.id);
  }else{p.chapter++;p.choice=null;p.delivered=false;}
  update();
 }});
}
root.FarmStories={initial,validate,show};
})(window);
