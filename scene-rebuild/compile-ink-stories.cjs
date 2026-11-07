'use strict';
// Browser bundle entry: compile registered, approved Ink source files at build time.
// Adding a story requires a manifest and chapter files, not edits to the Ink runtime.
const fs=require('node:fs'),path=require('node:path');
const {Compiler}=require('inkjs/full');
const {validateManifest}=require('./story-engine/validate-manifest.cjs');
const root=path.join(__dirname,'stories');
const directories=fs.readdirSync(root,{withFileTypes:true}).filter(d=>d.isDirectory()).map(d=>d.name).sort();
const packages=directories.map(dir=>{
 const folder=path.join(root,dir);
 const manifest=JSON.parse(fs.readFileSync(path.join(folder,'manifest.json'),'utf8'));
 validateManifest(manifest);
 if(manifest.storyId!==dir)throw Error('Story folder ID mismatch: '+dir);
 if(!manifest.title||!manifest.lead||!Number.isInteger(manifest.unlockCustomer)||manifest.unlockCustomer<0||manifest.unlockCustomer>3)throw Error('Invalid farm story metadata: '+dir);
 if(!Array.isArray(manifest.chapterObjectives)||manifest.chapterObjectives.length!==manifest.chapters.length)throw Error('Missing chapter objectives: '+dir);
 for(const o of manifest.chapterObjectives){
  if(!o||!['deliver','advance','finish'].includes(o.type)||!manifest.events.includes(o.event))throw Error('Invalid chapter objective: '+dir);
  if(o.type==='deliver'&&(!/^[a-z][a-z0-9-]*$/.test(o.item)||!Number.isSafeInteger(o.quantity)||o.quantity<1))throw Error('Invalid delivery objective: '+dir);
 }
 const compiledChapters={};
 for(const chapter of manifest.chapters){
  const file=path.join(folder,chapter.inkFile);
  if(path.dirname(file)!==folder)throw Error('Invalid chapter path');
  compiledChapters[chapter.id]={compiled:new Compiler(fs.readFileSync(file,'utf8')).Compile().ToJson()};
 }
 return {manifest,compiledChapters};
});
const ids=packages.map(p=>p.manifest.storyId);
if(new Set(ids).size!==ids.length)throw Error('Duplicate story IDs');
const output=path.join(__dirname,'story-ink-generated.cjs');
fs.writeFileSync(output,"'use strict';\nmodule.exports="+JSON.stringify(packages)+";\n");
const registry=packages.map(({manifest:m})=>({id:m.storyId,title:m.title,lead:m.lead,unlockCustomer:m.unlockCustomer,minOrders:m.minOrders??2,maxOrders:m.maxOrders??4,requires:m.requiresFacts,chapterCount:m.chapters.length,chapters:m.chapters.map((c,i)=>({id:c.id,objective:m.chapterObjectives[i]}))}));
fs.writeFileSync(path.join(__dirname,'story-ink-registry.js'),'(function(root){\'use strict\';root.FarmInkStoryRegistry='+JSON.stringify(registry)+';})(window);\n');
process.stdout.write('Compiled '+packages.length+' Ink story package(s): '+ids.join(', ')+'\n');
