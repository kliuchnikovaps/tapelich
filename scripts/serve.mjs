import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const port = Number(process.env.PORT || 4173);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.avif':'image/avif','.pdf':'application/pdf','.mp4':'video/mp4','.xml':'application/xml'};
const server = http.createServer((req,res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if (pathname.startsWith('/tapelich/')) pathname = pathname.slice('/tapelich'.length);
    if (pathname.endsWith('/')) pathname += 'index.html';
    const file = path.resolve(root,'.'+pathname);
    const relative = path.relative(root,file);
    if (relative.startsWith('..') || path.isAbsolute(relative) || relative.split(path.sep).some(p=>p.startsWith('.')) || /^(content|scripts)[\\/]/.test(relative)) {
      res.writeHead(403);res.end('Forbidden');return;
    }
    if (!fs.existsSync(file)||!fs.statSync(file).isFile()) {
      res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(fs.readFileSync(path.join(root,'404.html')));return;
    }
    const size=fs.statSync(file).size;
    const headers={'Content-Type':types[path.extname(file).toLowerCase()]||'application/octet-stream','Cache-Control':'no-store','Accept-Ranges':'bytes'};
    const range=req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    if(range){
      const start=Number(range[1]),end=range[2]?Math.min(Number(range[2]),size-1):size-1;
      if(start> end || start>=size){res.writeHead(416,{'Content-Range':'bytes */'+size});res.end();return;}
      res.writeHead(206,{...headers,'Content-Range':'bytes '+start+'-'+end+'/'+size,'Content-Length':end-start+1});
      if(req.method==='HEAD')res.end();else fs.createReadStream(file,{start,end}).pipe(res);
    }else{
      res.writeHead(200,{...headers,'Content-Length':size});
      if(req.method==='HEAD')res.end();else fs.createReadStream(file).pipe(res);
    }
  }catch{res.writeHead(400);res.end('Bad request');}
});
server.listen(port,'127.0.0.1',()=>console.log('Portfolio preview: http://127.0.0.1:'+port+'/tapelich/'));
