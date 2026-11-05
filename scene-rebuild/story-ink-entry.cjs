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
function dialogue(chapter,choice=null){
 if(!Number.isInteger(chapter)||chapter<0||chapter>=compiled.length)throw Error('Invalid chapter');
 const story=new Story(compiled[chapter]);story.ChoosePathString('start');
 const lines=[];while(story.canContinue)lines.push(story.Continue().trim());
 const choices=story.currentChoices.map((c,index)=>({index,text:c.text}));
 if(choice!==null){
  if(!Number.isInteger(choice)||choice<0||choice>=choices.length)throw Error('Invalid choice');
  story.ChooseChoiceIndex(choice);
  while(story.canContinue)lines.push(story.Continue().trim());
 }
 return {lines:lines.filter(Boolean),choices:choice===null?choices:[]};
}
window.FarmInk={dialogue};
