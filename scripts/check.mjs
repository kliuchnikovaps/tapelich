import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { projects } from '../content/projects.mjs';
import { talks, experience, profile } from '../content/site.mjs';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const files=fs.readdirSync(root).filter(f=>f.endsWith('.html'));
const documents=new Map(files.map(f=>[f,fs.readFileSync(path.join(root,f),'utf8')]));
const decode=s=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const failures=[];
let linkCount=0;
for(const [file,html] of documents){
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
  if(new Set(ids).size!==ids.length)failures.push(file+': duplicate IDs');
  if((html.match(/<h1\b/g)||[]).length!==1)failures.push(file+': expected one h1');
  if(!html.includes('name="description"')||!html.includes('rel="canonical"'))failures.push(file+': missing page metadata');
  if(/John Doe|Comming Soon|Coming Soon|Ram Maheshwari Logo/.test(html))failures.push(file+': old placeholder');
  for(const [,attribute,raw] of html.matchAll(/\b(href|src|poster)="([^"]*)"/g)){
    const url=decode(raw);if(!url||url==='#'){failures.push(file+': empty link');continue;}
    if(/^(https?:|mailto:|data:)/.test(url))continue;
    linkCount++;
    const [base,fragment]=url.split('#');
    const resolved=path.resolve(path.dirname(path.join(root,file)),decodeURIComponent(base.split('?')[0]||file));
    if(!fs.existsSync(resolved)){failures.push(file+': missing '+url);continue;}
    if(fragment&&resolved.endsWith('.html')){
      const target=fs.readFileSync(resolved,'utf8');
      if(!target.includes('id="'+decodeURIComponent(fragment)+'"'))failures.push(file+': missing anchor '+url);
    }
  }
  for(const [,attrs] of html.matchAll(/<img\b([^>]+)>/g))if(!/\balt="[^"]*"/.test(attrs))failures.push(file+': image missing alt');
}
assert.equal(new Set(projects.map(p=>p.id)).size,projects.length,'Duplicate project IDs');
assert.equal(projects.filter(p=>p.featured).length,4,'Home must feature four projects');
assert.equal(projects.filter(p=>p.category==='Sber').length,8,'Preserve all eight Sber areas');
assert.equal(projects.filter(p=>p.category==='VK / MY.GAMES').length,7,'Preserve all seven VK projects');
const notes=JSON.parse(fs.readFileSync(path.join(root,'content/original-notes.json'),'utf8'));
const referenced=[...projects,...talks].filter(p=>p.note).map(p=>p.note);
for(const key of Object.keys(notes))assert(referenced.includes(key),'Original notes omitted: '+key);
for(const p of [...projects,...talks]){
  const html=documents.get(p.id+'.html');assert(html,'Missing page: '+p.id);
  if(p.note){
    const match=html.match(/<div class="archival-text"[^>]*>([\s\S]*?)<\/div>/);
    assert(match,'Missing archive in '+p.id);
    assert.equal(decode(match[1]),notes[p.note],'Archive changed in '+p.id);
  }
}
const cog=documents.get('cogsci-2026.html');
const talk=talks.find(t=>t.id==='cogsci-2026');
if(!talk.video)assert(!cog.includes('Watch recording'),'Empty video must stay hidden');
if(!talk.slides)assert(!cog.includes('View slides'),'Empty slides must stay hidden');
assert(fs.existsSync(path.join(root,profile.cv)),'CV missing');
assert(experience.every(e=>documents.has(e.file)),'Missing experience page');
if(failures.length){console.error(failures.join('\n'));process.exit(1);}
console.log('PASS: '+files.length+' pages, '+linkCount+' local references, '+projects.length+' projects, '+Object.keys(notes).length+' intact original notes, four featured projects and hidden empty media links.');
