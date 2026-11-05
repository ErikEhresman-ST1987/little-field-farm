'use strict';
const {Compiler,Story}=require('inkjs/full');
const {SharedGameNarrative}=require('./story-engine/shared-game-narrative.cjs');
// Sample-only chapter dialogue; compiled with inkjs and executed by the browser runtime.
const chapters=[
`=== start ===
Juliette: Could you bring in some fresh wheat? Two harvests will help us get started.
+ [I'll get to work.]
    Juliette: Thank you. I'll be here when the wheat is ready.
    -> END
+ [I'll take my time.]
    Juliette: No rush. Farming takes patience.
    -> END
=== complete ===
Juliette: That's exactly what we needed.
-> END`,
`=== start ===
Juliette: The farm helps more than one kitchen. Complete a neighbor order to keep our community supplied.
+ [I'll make a delivery.]
    Juliette: Every neighbor counts.
    -> END
=== complete ===
Juliette: I heard the delivery went well.
-> END`,
`=== start ===
Juliette: Thank you. It means a great deal when neighbors look out for one another.
+ [Glad to help.]
    Juliette: I hope we'll work together again.
    -> END
=== complete ===
Juliette: Until next time!
-> END`
];
const compiled=chapters.map(source=>new Compiler(source).Compile().ToJson());
function createSession(chapter,saved){
 if(!Number.isInteger(chapter)||chapter<0||chapter>=compiled.length)throw Error('Invalid chapter');
 const story=new Story(compiled[chapter]);
 if(saved)story.state.LoadJson(saved);else story.ChoosePathString('start');
 return {
  view(){
   const lines=[];
   while(story.canContinue)lines.push(story.Continue().trim());
   return {lines:lines.filter(Boolean),choices:story.currentChoices.map((c,index)=>({index,text:c.text})),ink:story.state.ToJson()};
  },
  choose(index){
   if(!Number.isInteger(index)||index<0||index>=story.currentChoices.length)throw Error('Invalid Ink choice');
   story.ChooseChoiceIndex(index);return this.view();
  },
  snapshot(){return story.state.ToJson()}
 };
}
const manifest={
 schema:1,storyId:'juliette',contentVersion:'sample-1',sourceApproval:'TEST-FIXTURE-ONLY',
 chapters:compiled.map((_,i)=>({id:'chapter-'+(i+1),inkFile:'chapter-'+(i+1)+'.ink',entry:'start',completion:'complete'})),
 requiresFacts:[],events:['harvest.wheat','order.delivered'],effects:[]
};
function createCoordinator(saved){
 const createGame=()=>({
  progress:{wheat:0,order:false},
  snapshot(){return {...this.progress}},
  restore(s){if(!s||!Number.isInteger(s.wheat)||s.wheat<0||s.wheat>2||typeof s.order!=='boolean')throw Error('Invalid game event progress');this.progress={...s}},
  event(name,context){
   if(context.storyId!=='juliette')return {changed:false,completed:false};
   if(context.chapterId==='chapter-1'&&name==='harvest.wheat'&&this.progress.wheat<2){
    this.progress.wheat++;
    return {changed:true,completed:this.progress.wheat===2};
   }
   if(context.chapterId==='chapter-2'&&name==='order.delivered'&&!this.progress.order){
    this.progress.order=true;return {changed:true,completed:true};
   }
   return {changed:false,completed:false};
  }
 });
 return new SharedGameNarrative({
  packages:[{manifest,compiledChapters:Object.fromEntries(compiled.map((c,i)=>['chapter-'+(i+1),{compiled:c}]))}],
  createGame,save:saved
 });
}
window.FarmInk={createSession,createCoordinator};

