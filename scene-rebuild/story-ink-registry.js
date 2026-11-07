// Single source of truth for Ink story registration and farm unlock mapping.
// The Ink bundle must export a coordinator supporting each registered ID.
(function(root){
 'use strict';
 root.FarmInkStoryRegistry=[
  {id:'juliette',title:'The Dinner That Almost Wasn\'t',lead:'Juliette',unlockCustomer:0,
   minOrders:2,maxOrders:4,requires:[],chapterCount:3,
   chapters:[
    {id:'chapter-1',objective:{type:'deliver',item:'wheat',quantity:2,event:'wheat.delivered',label:'Deliver 2 wheat for Juliette’s bread'}},
    {id:'chapter-2',choiceEvents:['select.squash','select.rainbow-chard'],
     objective:{type:'selected-delivery',selectedKey:'vegetable',quantity:1,event:'vegetable.delivered'}},
    {id:'chapter-3',objective:{type:'finish',event:'finish.story'}}
   ]}
 ];
})(window);
