'use strict';
const {Compiler}=require('inkjs/full');
const {SharedGameNarrative}=require('./story-engine/shared-game-narrative.cjs');
// Approved OmniQuest narrative: The Dinner That Almost Wasn't (2026-11-05).
const chapters=[
`=== start ===
Juliette arrives at the farm carrying a notebook, a shopping basket, and the unmistakable expression of someone who has just had a wonderful idea.
Juliette: I've decided to have a dinner!
Juliette: No birthday, no holiday, no particular occasion. Just good food and good company. Surely that's reason enough?
Juliette: And I thought, what could be better than fresh bread? Would you be willing to supply some wheat?
Juliette opens her notebook.
Juliette: Andy has offered to help with arrangements. Keiko is bringing something special, and Felix is taking care of supplies.
Juliette: Everyone is being so helpful! I can hardly imagine what could go wrong.
Juliette closes the notebook with satisfaction.
Juliette: I'll look forward to seeing you when the wheat is ready!
-> END
=== complete ===
Juliette inspects the wheat with delight.
Juliette: Perfect! Fresh bread always makes a meal feel welcoming.
Juliette looks down at her notebook. Her smile becomes slightly uncertain.
Juliette: That's curious. Felix says he's arranged all the vegetables. Keiko says she's bringing vegetables, too.
Juliette: And Andy has apparently made a list of everything we're supposed to have.
Juliette: Well, there's certainly no shortage of enthusiasm!
For the first time, she looks as though she might be wondering whether enthusiasm is enough.
-> END`,
`=== start ===
Juliette returns to the farm with her notebook. Several pages have been folded over, and one is covered with crossed-out ingredients.
Juliette: I believe we've had a small misunderstanding.
Juliette: Felix arranged exactly what he thought I needed. Keiko prepared ingredients for the dish she thought I was making. And Andy made certain everyone knew when to arrive.
Juliette: Unfortunately, they were all working from different plans!
Juliette: We have enough ingredients for several rather unusual meals, but not quite enough for the one I imagined.
Juliette: And they've all worked so hard. I don't want anyone thinking their help wasn't appreciated.
Juliette: Perhaps we don't need to start over. We could make something wonderful with what we have.
Juliette: Would you help me choose a vegetable dish?
+ [Supply squash]
    Juliette: Roasted squash! Warm, comforting, and just the thing to serve with fresh bread. Oh, I can already imagine it!
    Juliette: Thank you. I'll leave that part in your capable hands.
    -> END
+ [Supply rainbow chard]
    Juliette: Rainbow chard! Keiko will be delighted. A colorful vegetable dish would make the whole table look cheerful.
    Juliette: Thank you. I'll leave that part in your capable hands.
    -> END
=== complete ===
Juliette's relief is immediate.
Juliette: Wonderful! Now we have something we can actually prepare.
Juliette: Do you know what the strangest part is? Everyone keeps asking what else they can do.
Juliette: And I keep telling them I've got everything under control.
Juliette glances at the much-corrected notebook.
Juliette: Which is becoming a rather difficult statement to defend.
Juliette: Perhaps I should stop trying to make every decision on my own.
-> END`,
`=== start ===
Juliette visits the farm after the dinner. She looks tired, happy, and considerably more relaxed than before.
Juliette: Oh, you should have seen it!
Juliette: Andy had everyone settled comfortably before I could even ask. Keiko made the table beautiful with flowers and greenery. And Felix—well, Felix somehow managed to organize all those mismatched supplies.
Juliette: He even made a new inventory list. Two copies, naturally.
Juliette: And the food!
Juliette: It wasn't the dinner I originally imagined.
Juliette: But everyone seemed so happy. And I spent more time laughing with my friends than worrying over the menu.
Juliette: I suppose I was so busy trying to give everyone a wonderful evening that I nearly forgot to let them help.
+ [They wanted to do something for you, too.]
    Juliette smiles softly.
    Juliette: Yes. I think you're right. I wanted to take care of everyone, and they wanted to take care of me. That's rather lovely, isn't it?
    -> END
+ [It sounds like everyone made the dinner special.]
    Juliette nods.
    Juliette: They certainly did. Even the mix-ups became part of the fun. I couldn't have planned an evening quite like that if I'd tried!
    -> END
=== complete ===
Juliette: Next time, I think I'll invite everyone to help from the beginning.
Juliette: Although perhaps we'll agree on the menu first.
Juliette laughs.
Juliette: Thank you for helping, and for reminding me what makes a good dinner.
Juliette: It isn't just what we put on the table. It's the people we share it with.
Juliette heads home, already thinking about what to cook next.
-> END`
];
const compiled=chapters.map(source=>new Compiler(source).Compile().ToJson());
const manifest={
 schema:1,storyId:'juliette',contentVersion:'dinner-1',sourceApproval:'APPROVED-2026-11-05',
 chapters:compiled.map((_,i)=>({id:'chapter-'+(i+1),inkFile:'chapter-'+(i+1)+'.ink',entry:'start',completion:'complete'})),
 requiresFacts:[],events:['wheat.delivered','select.squash','select.rainbow-chard','vegetable.delivered','finish.story'],effects:[]
};
function createCoordinator(saved){
 const createGame=()=>({
  progress:{wheat:false,vegetable:null,delivered:false},
  snapshot(){return {...this.progress}},
  restore(s){
   if(!s||typeof s.wheat!=='boolean'||![null,'squash','rainbow-chard'].includes(s.vegetable)||typeof s.delivered!=='boolean'||(s.delivered&&!s.vegetable))throw Error('Invalid dinner progress');
   this.progress={...s};
  },
  event(name,context){
   if(context.storyId!=='juliette')return {changed:false,completed:false};
   const p=this.progress;
   if(context.chapterId==='chapter-1'&&name==='wheat.delivered'&&!p.wheat){p.wheat=true;return {changed:true,completed:true};}
   if(context.chapterId==='chapter-2'){
    if(name.startsWith('select.')&&!p.vegetable){
     const crop=name.slice(7);
     if(!['squash','rainbow-chard'].includes(crop))return {changed:false,completed:false};
     p.vegetable=crop;return {changed:true,completed:false};
    }
    if(name==='vegetable.delivered'&&p.vegetable&&!p.delivered){p.delivered=true;return {changed:true,completed:true};}
   }
   if(context.chapterId==='chapter-3'&&name==='finish.story'&&p.delivered)return {changed:true,completed:true};
   return {changed:false,completed:false};
  }
 });
 return new SharedGameNarrative({packages:[{manifest,compiledChapters:Object.fromEntries(compiled.map((c,i)=>['chapter-'+(i+1),{compiled:c}]))}],createGame,save:saved});
}
window.FarmInk={createCoordinator};
