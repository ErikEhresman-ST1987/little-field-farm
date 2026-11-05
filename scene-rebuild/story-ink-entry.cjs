'use strict';
const {Compiler,Story}=require('inkjs/full');
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
window.FarmInk={createSession};
