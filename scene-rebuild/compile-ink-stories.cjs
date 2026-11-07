'use strict';
// Browser bundle entry: compile registered, approved Ink source files at build time.
// Adding a story requires a manifest and chapter files, not edits to the Ink runtime.
const fs=require('node:fs'),path=require('node:path');
const {Compiler}=require('inkjs/full');
const root=path.join(__dirname,'stories');
const directories=fs.readdirSync(root,{withFileTypes:true}).filter(d=>d.isDirectory()).map(d=>d.name).sort();
const packages=directories.map(dir=>{
 const folder=path.join(root,dir);
 const manifest=JSON.parse(fs.readFileSync(path.join(folder,'manifest.json'),'utf8'));
 if(manifest.storyId!==dir)throw Error('Story folder ID mismatch: '+dir);
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
process.stdout.write('Compiled '+packages.length+' Ink story package(s): '+ids.join(', ')+'\n');
