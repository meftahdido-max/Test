// Usage: node render.js <out.mp4>  — renders frames via headless Chromium, pipes to ffmpeg, dumps events.json
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');const {spawn}=require('child_process');
(async()=>{const out=process.argv[2];const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
await p.goto('file://'+path.resolve(__dirname,'index.html'));await p.waitForFunction(()=>window.READY===true);
const info=await p.evaluate(()=>({T:TOTAL,ev:EVENTS}));fs.writeFileSync(path.join(__dirname,'events.json'),JSON.stringify(info));
const N=Math.ceil(info.T*30);const ff=spawn('ffmpeg',['-y','-v','error','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-pix_fmt','yuv420p','-crf','19','-preset','fast',out],{stdio:['pipe','inherit','inherit']});
for(let f=0;f<N;f++){const d=await p.evaluate(t=>{renderFrame(t);return document.getElementById('cv').toDataURL('image/jpeg',0.93)},f/30);
 if(!ff.stdin.write(Buffer.from(d.slice(d.indexOf(',')+1),'base64')))await new Promise(r=>ff.stdin.once('drain',r)); if(f%150==0)console.log(f+'/'+N);}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();console.log('done',N);})();
