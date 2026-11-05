// Experimental Farm Story adapter. Sample content only; Ink runtime connection follows.
export function freshStory(){return {version:1,status:'available',chapter:0,harvests:0,choice:null,ink:null,receipts:[]};}
export function validStory(s){
 if(!s||s.version!==1||!['available','active','completed'].includes(s.status)||!Number.isInteger(s.chapter)||s.chapter<0||s.chapter>2||!Number.isInteger(s.harvests)||s.harvests<0||s.harvests>2||!(s.choice===null||['help','later'].includes(s.choice))||!(s.ink===null||typeof s.ink==='string')||!Array.isArray(s.receipts)||s.receipts.some(r=>!['wheat-harvest','neighbor-order'].includes(r))||new Set(s.receipts).size!==s.receipts.length)throw Error('Invalid story progress');
 return s;
}
export function storyView(s){
 validStory(s);
 if(s.status==='available')return {title:'Juliette Childers — A Farm Favor',lines:['Juliette has a small request for the farm. Would you like to help?'],actions:[['Accept invitation','accept']]};
 if(s.status==='completed')return {title:'Juliette — Thank You',lines:['Juliette thanks you for helping the farm supply the community.','Sample story complete.'],actions:[]};
 if(s.chapter===0)return {title:'Chapter 1 — Getting Started',lines:['Juliette: “Could you bring in some fresh wheat? Two harvests will help us get started.”', 'Wheat harvested: '+s.harvests+' / 2'],actions:s.harvests===2?[['Continue','next']]:[]};
 if(s.chapter===1)return {title:'Chapter 2 — A Neighborly Delivery',lines:['Juliette: “The farm helps more than one kitchen. Complete a neighbor order to keep our community supplied.”',s.receipts.includes('neighbor-order')?'Delivery completed.':'Complete any normal order from the Orders panel.'],actions:s.receipts.includes('neighbor-order')?[['Continue','next']]:[]};
 return {title:'Chapter 3 — A Good Day',lines:['Juliette: “Thank you. It means a great deal when neighbors look out for one another.”'],actions:[['Finish story','finish']]};
}
export function storyAction(s,action){
 validStory(s);
 if(action==='accept'&&s.status==='available'){s.status='active';return true}
 if(action==='next'&&s.status==='active'&&((s.chapter===0&&s.harvests===2)||(s.chapter===1&&s.receipts.includes('neighbor-order')))){s.chapter++;s.ink=null;return true}
 if(action==='finish'&&s.status==='active'&&s.chapter===2){s.status='completed';return true}
 return false;
}
export function storyEvent(s,event){
 validStory(s);
 if(s.status!=='active')return false;
 if(event==='harvest.wheat'&&s.chapter===0&&s.harvests<2){s.harvests++;if(s.harvests===2)s.receipts.push('wheat-harvest');return true}
 if(event==='order.delivered'&&s.chapter===1&&!s.receipts.includes('neighbor-order')){s.receipts.push('neighbor-order');return true}
 return false;
}
