// "What if you were born as Joel Miller?" — reuses the shared kit from tommy/render (lib.js, scenes.js, scenes2.js)
// and swaps in a Last of Us palette, memory notes and scene list.
Object.assign(PAL, { pink: '#e0743a', hot: '#f0a050', orange: '#e8b04a', gold: '#f0c860', purple: '#2f6b55', deep: '#14241c', teal: '#5fb8a0', mint: '#b8e8c8', vig: 'rgba(10,20,12,.55)' });
MEM.length = 0; MEM.push(['THE WATCH', 'she fixed it'], ['PUN BOOK', 'you hate it (lie)'], ['THE SURGEON', 'had a daughter']);
MEMCOL.length = 0; MEMCOL.push('#fff1a0', '#c8f5d8', '#ffd1c0');

const J13 = { hair: 'short', hairCol: '#3a2a20', skin: '#d9a07a', beard: '#3a2a20', shirt: '#3a6b8a', pattern: 'plaid', pants: '#3d4a6a', mouth: 'flat' };
const J33 = { ...J13, hairCol: '#5a4a42', beard: '#8a7a70', shirt: '#56707a', pants: '#3a4a5e', backpack: '#5a3a2a', brow: 'normal' };
const SARAH = { hair: 'long', hairCol: '#5a3a22', skin: '#e8b894', shirt: '#4a7ad8', pants: '#3a4a6a', mouth: 'grin', grinW: .7 };
const ELLIE = { hair: 'ponytail', hairCol: '#8a4a2a', skin: '#f0c4a0', freckles: true, shirt: '#8a8f86', sleeve: '#a0505a', longSleeve: true, pants: '#4a5a7a', backpack: '#7a3a3a', mouth: 'smirk' };
const TOMMYM = { hair: 'short', hairCol: '#2a1e16', beard: '#2a1e16', skin: '#d9a07a', jacket: '#6a4a2a', shirt: '#c8c0a8', longSleeve: true, sleeve: '#6a4a2a', pants: '#3a4a5a', mouth: 'smirk' };
const TESS = { hair: 'ponytail', hairCol: '#2a1e16', skin: '#e8b894', jacket: '#4a5a6a', shirt: '#a8a8a0', longSleeve: true, sleeve: '#4a5a6a', pants: '#3a3a4a', mouth: 'flat' };
const MARLENE = { hair: 'short', hairCol: '#1a1410', skin: '#7a4a30', jacket: '#5a6a4a', shirt: '#c8b890', longSleeve: true, sleeve: '#5a6a4a', pants: '#3a3a3a', mouth: 'flat' };
const SURGEON = { hair: 'grey', hairCol: '#9a9a9a', skin: '#e0b090', shirt: '#5fa8b0', longSleeve: false, pants: '#5fa8b0', mouth: 'flat', glasses: false };
const ABBY = { hair: 'braid', hairCol: '#e0c070', skin: '#f0c4a0', jacket: '#3a4a3a', shirt: '#6a7a6a', longSleeve: true, sleeve: '#3a4a3a', pants: '#2e2e2e', mouth: 'flat', brow: 'angry' };
const CLICKER = { hair: 'none', fungus: true, skin: '#8a9a7a', shirt: '#5a6a5a', pants: '#4a4a4a', armL: .7, armR: .7 };
const SOLDIER = { hair: 'short', hairCol: '#2a2a2a', skin: '#d9a07a', jacket: '#4d5a3a', shirt: '#4d5a3a', longSleeve: true, sleeve: '#4d5a3a', pants: '#4d5a3a', hat: 'cap', brow: 'angry', mouth: 'flat' };

function personRot(o, t, rot) { ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(rot); person({ ...o, x: 0, y: 0 }, t); ctx.restore(); }
function sky(stops) { ctx.fillStyle = grad(-100, 800, stops); ctx.fillRect(-100, -100, W + 200, 1000); }
function ground(y, c1, c2) { ctx.fillStyle = grad(y, 1080, [c1, c2]); ctx.fillRect(-100, y, W + 200, 1200 - y); line(-100, y, W + 100, y, 5); }
function chapterJ(t, num, title) {
  const g = ctx.createRadialGradient(960, 540, 50, 960, 540, 1000); g.addColorStop(0, '#2a3a24'); g.addColorStop(1, '#070b06'); ctx.fillStyle = g; ctx.fillRect(-100, -100, W + 200, H + 200);
  const r = rand(5); for (let i = 0; i < 40; i++) { const x = (r() * W + t * 20 * (r() - .5)) % W, y = (r() * H + t * 30) % H; ell(x, y, 3, 3); ctx.fillStyle = `rgba(240,200,96,${.3 + .3 * Math.sin(t * 3 + i)})`; ctx.fill(); }
  ctx.save(); ctx.globalAlpha = clamp(t / .5);
  const s = popS(t, .1, .5); ctx.save(); ctx.translate(960, 390); ctx.scale(s, s); ell(0, 0, 60, 60); ctx.shadowColor = PAL.gold; ctx.shadowBlur = 30; ctx.lineWidth = 6; ctx.strokeStyle = PAL.gold; ctx.stroke(); ctx.shadowBlur = 0; text(num, 0, 4, '700 52px Almendra', '#fff'); ctx.restore();
  text('CHAPTER ' + num, 960, 510, '600 30px Fredoka', PAL.mint, 'center', 'middle', '10px');
  ctx.shadowColor = 'rgba(240,160,80,.6)'; ctx.shadowBlur = 30; text(title, 960, 630, '700 104px Almendra', '#f3e6c8'); ctx.restore();
}
function raysJ(t) { const g = ctx.createRadialGradient(960, 540, 50, 960, 540, 1100); g.addColorStop(0, '#4a3a20'); g.addColorStop(1, '#0e140c'); ctx.fillStyle = g; ctx.fillRect(-100, -100, W + 200, H + 200);
  for (let i = 0; i < 20; i++) { ctx.save(); ctx.translate(960, 540); ctx.rotate(i * Math.PI / 10 + t * .12); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(1500, -120); ctx.lineTo(1500, 120); ctx.closePath(); ctx.fillStyle = i % 2 ? 'rgba(224,116,58,.12)' : 'rgba(95,184,160,.08)'; ctx.fill(); ctx.restore(); } }
function vines(x, y, len, seed) { const r = rand(seed); ctx.beginPath(); ctx.moveTo(x, y); for (let i = 1; i < 8; i++) ctx.lineTo(x + (r() - .5) * 30, y + i * len / 8); ctx.lineWidth = 5; ctx.strokeStyle = '#2f6b3a'; ctx.stroke(); for (let i = 0; i < 8; i++) { ell(x + (r() - .5) * 40, y + r() * len, 14, 9); ctx.fillStyle = r() > .5 ? '#3f8a48' : '#5aa85a'; ctx.fill(); } }
function ruinsBG(t, season = 'summer', scroll = 0) {
  const skies = { summer: ['#7fb8d8', '#c8e0d8', '#f0d8a8'], autumn: ['#d88a4a', '#f0b878', '#f8e0b8'], winter: ['#9ab0c0', '#c8d4dc', '#e8eef0'], spring: ['#88c8e8', '#c0e8e0', '#f8e8d0'], sunset: ['#3a2a4a', '#c86a4a', '#f0b060'] };
  sky(skies[season]);
  const off = -(scroll % 600);
  const bcol = season === 'winter' ? '#7a8088' : season === 'autumn' ? '#8a6a5a' : '#6a7a7a';
  for (let k = -1; k < 5; k++) { const x = off + k * 600, r = rand(k + 20);
    const h = 380 + r() * 260, w = 260 + r() * 120; rr(x, 760 - h, w, h + 20, 4); fs(bcol, 4);
    for (let wy = 780 - h; wy < 720; wy += 60) for (let wx = x + 24; wx < x + w - 30; wx += 54) { rr(wx, wy, 30, 38, 3); ctx.fillStyle = r() > .3 ? '#2a3030' : '#4a5a5a'; ctx.fill(); }
    ctx.beginPath(); ctx.moveTo(x + w - 60, 760 - h); ctx.lineTo(x + w - 20, 760 - h + 50); ctx.lineTo(x + w, 760 - h + 20); ctx.lineTo(x + w, 760 - h); ctx.closePath(); ctx.fillStyle = skies[season][0]; ctx.fill();
    if (season !== 'winter') { vines(x + 30, 760 - h, h * .7, k + 3); vines(x + w - 40, 760 - h + 40, h * .5, k + 9); }
    if (season === 'winter') { rr(x - 6, 760 - h - 10, w + 12, 22, 10); fs('#fff', 3); }
  }
  const gc = { summer: ['#7a9a5a', '#4a6a3a'], autumn: ['#a87a4a', '#7a5a3a'], winter: ['#f4f6f8', '#d8e0e6'], spring: ['#8ac86a', '#5a9a4a'], sunset: ['#6a5a3a', '#3a3020'] }[season];
  ground(760, gc[0], gc[1]);
  ctx.fillStyle = season === 'winter' ? '#c8d0d8' : '#6a6a62'; ctx.fillRect(-100, 860, W + 200, 140);
  for (let x = off * 1.5 % 300 - 300; x < W + 300; x += 300) { rr(x, 920, 120, 10, 5); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fill(); }
  if (season !== 'winter') for (let i = 0; i < 18; i++) { const x = ((i * 137 + off * 1.5) % (W + 200) + W + 200) % (W + 200) - 100; ctx.beginPath(); ctx.moveTo(x, 880); ctx.lineTo(x + 8, 850); ctx.lineTo(x + 16, 880); ctx.fillStyle = season === 'autumn' ? '#c8843a' : '#5aa84a'; ctx.fill(); }
  if (season === 'autumn') { const r = rand(8); for (let i = 0; i < 25; i++) { const x = (r() * W + t * 60) % W, y = (r() * 900 + t * 80) % 900; ell(x, y, 8, 5); ctx.fillStyle = r() > .5 ? '#e0743a' : '#f0b040'; ctx.fill(); } }
  if (season === 'winter') snow(t, 60);
}
function snow(t, n, storm = 0) { const r = rand(3); ctx.fillStyle = 'rgba(255,255,255,.85)'; for (let i = 0; i < n; i++) { const sp = 60 + r() * 80, x = ((r() * W + t * (20 + storm * 400) * (r() + .5)) % (W + 100)) - 50, y = (r() * H + t * sp * (1 + storm)) % H; ell(x, y, 3 + r() * 4, 3 + r() * 4); ctx.fill(); } }
function watchFace(x, y, s, t, cracked) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rr(-60, -260, 120, 520, 20); fs('#6a4a2a'); for (let i = -200; i < 260; i += 60) { ell(0, i, 6, 6); fs('#3a2a1a', 0); }
  ell(0, 0, 150, 150); fs('#c8c0b0', 6); ell(0, 0, 124, 124); fs('#f8f2e6', 4);
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; line(Math.cos(a) * 100, Math.sin(a) * 100, Math.cos(a) * 112, Math.sin(a) * 112, 5); }
  const hm = cracked ? -1.2 : t * .05, mm = cracked ? .9 : t * .6; line(0, 0, Math.cos(hm - 1.57) * 60, Math.sin(hm - 1.57) * 60, 9); line(0, 0, Math.cos(mm - 1.57) * 95, Math.sin(mm - 1.57) * 95, 6);
  ell(0, 0, 10, 10); fs(INK, 0);
  if (cracked) { ctx.beginPath(); ctx.moveTo(-110, -50); ctx.lineTo(-20, 10); ctx.lineTo(40, -30); ctx.lineTo(100, 60); ctx.moveTo(-20, 10); ctx.lineTo(-10, 110); ctx.moveTo(40, -30); ctx.lineTo(60, -110); ctx.lineWidth = 4; ctx.strokeStyle = '#3a3a3a'; ctx.stroke(); }
  ctx.restore();
}
function truck(x, y, s, flip) {
  ctx.save(); ctx.translate(x, y); ctx.scale(flip ? -s : s, s);
  rr(-280, -170, 560, 120, 14); fs('#8a3a2a'); rr(-60, -270, 220, 110, 16); fs('#8a3a2a'); rr(-40, -255, 180, 80, 8); fs('#bfe0f0', 4);
  for (const wx of [-170, 170]) { ell(wx, -40, 56, 56); fs('#222'); ell(wx, -40, 24, 24); fs('#aaa', 4); }
  ell(270, -130, 18, 14); fs('#fff3a0', 3); ctx.restore();
}
function giraffe(x, y, s, t, seed) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const b = Math.sin(t * 1.5 + seed) * .04;
  for (const lx of [-70, -40, 50, 80]) { rr(lx, -230, 20, 230, 8); fs('#e8b860', 4); }
  ell(0, -260, 120, 60); fs('#e8b860');
  ctx.save(); ctx.translate(90, -290); ctx.rotate(-.35 + b); rr(-18, -300, 36, 310, 16); fs('#e8b860'); ell(10, -310, 50, 30); fs('#e8b860'); ell(30, -316, 6, 6); fs(INK, 0); line(-4, -335, -10, -365, 6); line(16, -335, 18, -365, 6); ctx.restore();
  const r = rand(seed); ctx.fillStyle = '#9a6a3a'; for (let i = 0; i < 10; i++) { ell(-90 + r() * 180, -280 + r() * 40, 14, 10); ctx.fill(); }
  ctx.restore();
}
function fireflyLogo(x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ell(0, 0, 70, 70); fs('#1e2a1e', 5); ctx.shadowColor = PAL.gold; ctx.shadowBlur = 30 + 10 * Math.sin(t * 4); ell(0, 14, 18, 26); ctx.fillStyle = PAL.gold; ctx.fill(); ctx.shadowBlur = 0; ell(0, -20, 14, 14); fs('#3a3a2a', 3); ell(-26, -6, 24, 12); fs('rgba(220,240,230,.7)', 3); ell(26, -6, 24, 12); fs('rgba(220,240,230,.7)', 3); ctx.restore(); }
function homeBG(t, night) {
  ctx.fillStyle = night ? '#6a5a4a' : '#d8c4a0'; ctx.fillRect(-100, -100, W + 200, 1000);
  for (let x = -100; x < W + 100; x += 90) { ctx.fillStyle = 'rgba(0,0,0,.05)'; ctx.fillRect(x, -100, 40, 1000); }
  rr(240, 220, 380, 320, 6); fs('#5a3a22', 6); ctx.fillStyle = grad(230, 530, night ? ['#0e1430', '#2a2a5a'] : ['#8ac8f0', '#d8f0f8']); ctx.fillRect(254, 234, 352, 292); line(430, 234, 430, 526, 6); line(254, 380, 606, 380, 6);
  rr(1300, 400, 360, 240, 10); fs('#222'); rr(1320, 420, 320, 200, 4); ctx.fillStyle = `rgba(95,184,200,${.6 + .2 * Math.sin(t * 20)})`; ctx.fill(); text('BREAKING', 1480, 470, '700 34px Fredoka', '#fff'); text('NEWS', 1480, 520, '700 44px Fredoka', '#e0263c');
  rr(1430, 640, 100, 60, 4); fs('#3a2a1a');
  ground(860, '#8a6a4a', '#6a4a30');
  rr(700, 640, 520, 160, 30); fs('#6a8a7a'); rr(680, 600, 80, 220, 26); fs('#6a8a7a'); rr(1160, 600, 80, 220, 26); fs('#6a8a7a');
  ell(160, 300, 60, 40); ctx.fillStyle = 'rgba(255,220,150,.35)'; ctx.fill(); rr(150, 300, 20, 560, 4); fs('#3a2a1a'); ctx.beginPath(); ctx.moveTo(100, 300); ctx.lineTo(220, 300); ctx.lineTo(190, 220); ctx.lineTo(130, 220); ctx.closePath(); fs('#f0e0b0');
}
function bostonBG(t) {
  sky(['#3a4a4a', '#8a8a6a', '#e0a060']);
  for (const [x, w, h] of [[80, 200, 520], [320, 160, 600], [1340, 220, 560], [1600, 180, 480]]) { rr(x, 700 - h, w, h, 2); fs('#4a5452', 4); for (let wy = 730 - h; wy < 680; wy += 50) for (let wx = x + 16; wx < x + w - 20; wx += 40) { ctx.fillStyle = '#2a3030'; ctx.fillRect(wx, wy, 22, 30); } vines(x + 20, 700 - h, h * .6, x); }
  rr(-100, 520, W + 200, 300, 0); fs('#8a8a80'); for (let x = -100; x < W + 100; x += 160) line(x, 520, x, 820, 3, 'rgba(0,0,0,.25)');
  ctx.beginPath(); for (let x = -100; x < W + 110; x += 26) ctx.lineTo(x, 506 + (x / 26 % 2 ? -10 : 6)); ctx.lineWidth = 3; ctx.strokeStyle = INK; ctx.stroke();
  rr(760, 360, 400, 70, 6); fs('#e8d040'); text('QZ CHECKPOINT', 960, 396, '700 40px Fredoka', INK, 'center', 'middle', '4px');
  rr(1650, 200, 140, 320, 4); fs('#5a5a52'); rr(1620, 170, 200, 70, 6); fs('#4a4a42'); const sw = Math.sin(t * .8) * .5; ctx.save(); ctx.translate(1720, 210); ctx.rotate(sw + .6); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(600, -80); ctx.lineTo(600, 80); ctx.closePath(); ctx.fillStyle = 'rgba(255,250,200,.18)'; ctx.fill(); ctx.restore();
  ground(820, '#7a7a72', '#5a5a52'); for (let i = 0; i < 4; i++) { ell(300 + i * 420, 960, 120, 18); ctx.fillStyle = 'rgba(140,180,200,.35)'; ctx.fill(); }
}
function jacksonBG(t, night) {
  sky(night ? ['#0a1022', '#1a2a4a', '#3a4a6a'] : ['#7aa8d0', '#b8d4e8', '#e8f0f4']);
  ctx.fillStyle = night ? '#2a3448' : '#9ab0c8'; ctx.beginPath(); ctx.moveTo(-100, 620); for (const [x, y] of [[200, 300], [420, 520], [700, 260], [960, 480], [1240, 240], [1500, 500], [1760, 300], [2020, 620]]) ctx.lineTo(x, y); ctx.fill();
  ctx.fillStyle = '#fff'; for (const [x, y] of [[200, 300], [700, 260], [1240, 240], [1760, 300]]) { ctx.beginPath(); ctx.moveTo(x - 60, y + 60); ctx.lineTo(x, y); ctx.lineTo(x + 60, y + 60); ctx.fill(); }
  for (const [x, w, h, c] of [[120, 300, 220, '#8a5a3a'], [520, 260, 260, '#7a4a32'], [1180, 320, 230, '#8a5a3a'], [1580, 260, 250, '#6a4a30']]) { rr(x, 760 - h, w, h, 4); fs(c); ctx.beginPath(); ctx.moveTo(x - 20, 770 - h); ctx.lineTo(x + w / 2, 680 - h); ctx.lineTo(x + w + 20, 770 - h); ctx.closePath(); fs('#f4f6f8'); for (let i = 0; i < 2; i++) { rr(x + 40 + i * (w - 140), 800 - h, 60, 70, 4); ctx.fillStyle = night ? '#ffd27a' : '#c8e0f0'; ctx.fill(); if (night) { ctx.save(); ctx.shadowColor = '#ffd27a'; ctx.shadowBlur = 30; ctx.fill(); ctx.restore(); } } }
  ground(760, '#f4f6f8', '#d8e0e6'); for (let x = -100; x < W + 100; x += 80) { rr(x, 800, 14, 90, 3); fs('#7a5a3a', 3); } line(-100, 820, W + 100, 820, 8, '#7a5a3a'); line(-100, 860, W + 100, 860, 8, '#7a5a3a');
  snow(t, night ? 40 : 30);
}
function hospitalBG(t) {
  ctx.fillStyle = grad(-100, 900, ['#d8e8e8', '#b8d0d0']); ctx.fillRect(-100, -100, W + 200, 1000);
  for (let x = 100; x < W; x += 420) { rr(x, 240, 240, 420, 6); fs('#e8f4f4'); rr(x + 20, 280, 200, 120, 4); fs('#8ab0b8', 3); }
  rr(-100, 140, W + 200, 30, 0); fs('#5fa8b0', 4); fireflyLogo(960, 160, .8, t);
  for (let i = 0; i < 5; i++) { rr(160 + i * 380, 40, 180, 30, 10); ctx.fillStyle = `rgba(255,255,255,${.7 + .3 * Math.sin(t * 6 + i)})`; ctx.fill(); }
  ground(820, '#a8c0c0', '#88a0a0'); for (let x = -100; x < W + 100; x += 120) line(x, 820, x - 60, 1080, 2, 'rgba(0,0,0,.12)');
}
function museumBG(t) {
  ctx.fillStyle = grad(-100, 900, ['#2a2440', '#4a4060']); ctx.fillRect(-100, -100, W + 200, 1000);
  ctx.save(); ctx.strokeStyle = '#f0e8d8'; ctx.lineWidth = 12; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(140, 560); ctx.quadraticCurveTo(400, 380, 700, 520); ctx.quadraticCurveTo(820, 600, 900, 420); ctx.stroke();
  for (let i = 0; i < 9; i++) { const x = 260 + i * 50; line(x, 470 - Math.sin(i / 3) * 40, x, 600, 8, '#f0e8d8'); }
  line(380, 560, 360, 800, 12, '#f0e8d8'); line(600, 560, 620, 800, 12, '#f0e8d8'); ell(920, 400, 60, 40); ctx.stroke(); ctx.restore();
  for (let i = 0; i < 30; i++) { const r = rand(i + 1)(); ell(1100 + (i * 37) % 760, 120 + (i * 53) % 400, 3, 3); ctx.fillStyle = `rgba(255,255,255,${.4 + .4 * Math.sin(t * 3 + i)})`; ctx.fill(); }
  ell(1500, 320, 110, 110); fs('#e0743a'); ell(1460, 290, 30, 22); ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fill(); rr(1300, 520, 400, 60, 10); fs('#f0c860'); text('SPACE EXHIBIT', 1500, 552, '700 34px Fredoka', INK, 'center', 'middle', '3px');
  ground(820, '#6a5a4a', '#4a3a2a');
}
function bookJ(t, prologue, picture, outro) {
  const g = ctx.createRadialGradient(960, 560, 100, 960, 560, 1100); g.addColorStop(0, '#4a3a26'); g.addColorStop(1, '#120c08'); ctx.fillStyle = g; ctx.fillRect(-100, -100, W + 200, H + 200);
  rr(150, 560, 70, 300, 10); fs('#f3ead6'); ell(185, 860, 110, 22); fs('#8a6a40');
  const fl = Math.sin(t * 13) * 4 + Math.sin(t * 7.3) * 3; const cg = ctx.createRadialGradient(185, 500, 10, 185, 500, 260); cg.addColorStop(0, 'rgba(255,190,110,.5)'); cg.addColorStop(1, 'rgba(255,190,110,0)'); ctx.fillStyle = cg; ctx.fillRect(-100, 200, 600, 600);
  ctx.beginPath(); ctx.moveTo(185 + fl * .3, 470 + fl); ctx.quadraticCurveTo(212, 530, 185, 552); ctx.quadraticCurveTo(158, 530, 185 + fl * .3, 470 + fl); ctx.fillStyle = '#ffd36b'; ctx.fill(); line(185, 548, 185, 562, 4);
  rr(300, 160, 1320, 800, 18); fs('#3a2a1e'); rr(330, 180, 630, 760, 10); fs('#f3e6c8'); rr(960, 180, 630, 760, 10); fs('#f3e6c8');
  const gg = ctx.createLinearGradient(900, 0, 1020, 0); gg.addColorStop(0, 'rgba(0,0,0,0)'); gg.addColorStop(.5, 'rgba(60,40,20,.35)'); gg.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = gg; ctx.fillRect(900, 180, 120, 760); rr(944, 900, 34, 120, 0); fs('#e0743a', 3);
  if (outro) {
    ctx.save(); ctx.globalAlpha = clamp((t - .3) / .5); text('Would you have', 645, 330, '700 64px Almendra', '#2a1a10'); text('saved Ellie?', 645, 410, '700 64px Almendra', '#2a1a10');
    text('Which character should be born next?', 645, 520, '700 40px Caveat', '#7a5a3a'); text('Tell me in the comments.', 645, 570, '700 40px Caveat', '#7a5a3a'); ctx.restore();
    ctx.save(); ctx.globalAlpha = clamp((t - .8) / .5); text('the next life', 1280, 230, '600 34px Caveat', '#7a5a3a'); rr(1090, 270, 380, 320, 6); ctx.setLineDash([14, 10]); fs(null, 4); ctx.setLineDash([]); text('?', 1280, 430, '700 160px Almendra', 'rgba(120,90,60,.35)'); ctx.restore();
    seal(t, 1.4, 1280, 760); text('subscribe', 1280, 860, '600 34px Caveat', '#7a5a3a');
    text('Unofficial fan work. Not affiliated with or endorsed by Naughty Dog or Sony Interactive Entertainment.', 960, 1050, '500 20px Fredoka', 'rgba(255,255,255,.6)');
    return;
  }
  if (t < 1.35) { ctx.save(); ctx.globalAlpha = .6 + .4 * Math.sin(t * 14); text('◀◀', 120, 110, '700 70px Fredoka', '#fff'); ctx.restore();
    for (let i = 0; i < 3; i++) { const p = prog(t, .3 + i * .3, .3); if (p <= 0 || p >= 1) continue; const w = 630 * Math.cos(p * Math.PI); ctx.beginPath(); ctx.moveTo(960, 180); ctx.lineTo(960 + w, 180 + Math.sin(p * Math.PI) * 30); ctx.lineTo(960 + w, 940 - Math.sin(p * Math.PI) * 30); ctx.lineTo(960, 940); ctx.closePath(); fs(p < .5 ? '#f3e6c8' : '#e8d8b4', 3); } return; }
  const t2 = t - 1.35; ctx.save(); ctx.globalAlpha = clamp(t2 / .5);
  text('Prologue', 645, 320, 'italic 400 48px Almendra', '#7a5a3a'); text(prologue[0], 645, 425, '700 80px Almendra', '#2a1a10'); text(prologue[1], 645, 515, '700 80px Almendra', '#2a1a10');
  line(545, 575, 745, 575, 3, '#a08060'); for (let y = 640; y < 900; y += 46) line(400, y, 890, y, 2, 'rgba(120,90,60,.25)'); ctx.restore();
  ctx.save(); ctx.globalAlpha = clamp((t2 - .5) / .5); rr(1090, 270, 380, 320, 6); fs('#ecdcbc', 6);
  ctx.save(); rr(1090, 270, 380, 320, 6); ctx.clip(); ctx.filter = 'sepia(1)'; picture(t); ctx.filter = 'none'; ctx.restore();
  text('you, 2013', 1280, 645, '600 50px Caveat', '#5a3a2a'); ctx.restore(); seal(t, 3.0, 1280, 815);
}
function bigList(t, title, items) {
  rr(470, 90, 980, 800, 30); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fill(); rr(460, 70, 980, 800, 30); fs('#f3e6c8', 6);
  text(title[0], 950, 130, '700 30px Fredoka', '#7a5a3a', 'center', 'middle', '8px'); text(title[1], 950, 190, '700 72px Almendra', INK); line(560, 240, 1340, 240, 4, 'rgba(36,18,46,.4)');
  items.forEach((it, i) => { if (t < it.t0) return; const y = 360 + i * 200, s = popS(t, it.t0); ctx.save(); ctx.translate(560, y); ctx.scale(s, s);
    ell(50, 0, 50, 50); fs(it.col); text(it.icon, 50, 3, '700 40px Fredoka', '#fff'); text(it.label, 130, -12, '700 70px Fredoka', INK, 'left'); text(it.sub, 134, 48, '600 34px Caveat', '#7a5a3a', 'left'); ctx.restore();
    if (it.t1) { const p = eout(prog(t, it.t1, .35)); if (p > 0) { ctx.font = '700 70px Fredoka'; const w = ctx.measureText(it.label).width; line(680, y - 14, 680 + (w + 20) * p, y - 18, 10, '#c8322a'); } }
    if (it.stamp && t > it.t1) stampText(t, it.t1 + .2, 1180, y, it.stamp, .7); });
}

const J = [
  { id: 'hook1', pops: () => [[at('hook1', 'Joel Miller') + .6], [at('hook1', "you'd lose") - .1, 'whoosh'], [at('hook1', "you'd lose") + .2], [at('hook1', 'spend twenty')], [at('hook1', 'then doom')], [at('hook1', 'refusing'), 'swish'], [at('hook1', 'for one kid'), 'stamp']],
    draw(t) {
      ruinsBG(t, 'sunset'); const g = ctx.createRadialGradient(960, 520, 50, 960, 520, 620); g.addColorStop(0, 'rgba(240,160,80,.45)'); g.addColorStop(1, 'rgba(240,160,80,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      person({ ...J33, x: 960, y: 1560, s: 1.75, brow: 'angry', seed: 1 }, t);
      pill(t, at('hook1', 'Joel Miller') + .6, 520, 330, 'JOEL MILLER', "(that's you)", { rot: -.04 });
      const tl = at('hook1', "you'd lose") - .1, k = eout(prog(t, tl, .45)); if (k <= 0) return;
      ctx.save(); ctx.globalAlpha = k; raysJ(t); ctx.restore(); ctx.save(); ctx.translate(0, lerp(1100, 0, k));
      bigList(t, ["JOEL'S", 'LIFE IN 3 LINES'], [
        { icon: '♥', label: 'SARAH', sub: '(the worst night)', col: PAL.pink, t0: at('hook1', "you'd lose") + .2 },
        { icon: '20', label: '20 YEARS', sub: '(feelings: switched off)', col: PAL.purple, t0: at('hook1', 'spend twenty'), t1: at('hook1', 'refusing') + .4 },
        { icon: '✚', label: 'THE CURE', sub: '(traded for one kid)', col: PAL.orange, t0: at('hook1', 'then doom'), t1: at('hook1', 'for one kid'), stamp: 'TRADED' }]);
      ctx.restore();
    } },
  { id: 'hook2', pops: () => [[.2], [at('hook2', 'do it again'), 'ding'], [at('hook2', 'never tell'), 'stamp']],
    draw(t) {
      ruinsBG(t, 'sunset');
      person({ ...J33, x: 760, y: 980, s: 1, look: t > at('hook2', 'never tell') ? -12 : 0, seed: 1 }, t);
      person({ ...ELLIE, x: 1130, y: 980, s: .82, look: -10, mouth: 'flat', seed: 2 }, t);
      pill(t, at('hook2', 'do it again'), 760, 180, "YOU'D DO IT AGAIN", null, { rot: -.03 });
      stampText(t, at('hook2', 'never tell'), 1180, 260, 'NEVER TELL HER');
    } },
  { id: 'book', extra: 2.6, pops: () => [[.1, 'whoosh'], [.45, 'swish'], [.75, 'swish'], [1.05, 'swish'], [2.0], [3.0, 'stamp']],
    draw: t => bookJ(t, ['Austin,', 'Texas'], (t) => { homeBG(t, false); person({ ...J13, x: 1200, y: 560, s: .4 }, t); person({ ...SARAH, x: 1340, y: 560, s: .3 }, t); }) },
  { id: 'dad', trans: 'zoom', zoomAt: [1280, 440], pops: () => [[at('dad', 'single dad')], [at('dad', 'always tired')], [at('dad', 'Sarah')], [at('dad', 'smarter'), 'ding']],
    draw(t) {
      homeBG(t, false); person({ ...J13, x: 700, y: 980, s: 1, brow: 'worried', mouth: 'flat', seed: 1 }, t); person({ ...SARAH, x: 1130, y: 980, s: .72, look: -8, seed: 2 }, t);
      pill(t, at('dad', 'single dad'), 700, 200, 'JOEL', 'single dad · construction');
      counter(t, at('dad', 'always tired'), 330, 470, 'SLEEP', '4 HRS');
      pill(t, at('dad', 'Sarah'), 1130, 390, 'SARAH', '12 years old', { rot: .03 });
      counter(t, at('dad', 'smarter'), 1560, 260, 'SMARTER THAN YOU', '100%', { col: PAL.purple, rot: .03 });
      eraTag(t, 'AUSTIN, TEXAS · 2013');
    } },
  { id: 'watch', pops: () => [[at('watch', "birthday")], [at('watch', 'gives you'), 'ding'], [at('watch', 'Mostly')], [at('watch', 'Remember that') - .2, 'swish'], [at('watch', 'Remember that') + .2]],
    draw(t) {
      homeBG(t, true); person({ ...J13, x: 640, y: 980, s: 1, mouth: t > at('watch', 'gives you') ? 'grin' : 'flat', seed: 1 }, t); person({ ...SARAH, x: 1000, y: 980, s: .72, look: -8, seed: 2 }, t);
      const cs = popS(t, at('watch', 'birthday')); if (cs > 0) { ctx.save(); ctx.translate(820, 640); ctx.scale(cs, cs); rr(-110, -40, 220, 90, 14); fs('#f4c8d0'); rr(-110, -40, 220, 26, 12); fs('#fff'); for (let i = -2; i <= 2; i++) { rr(i * 36 - 5, -90, 10, 50, 4); fs(['#e0743a', '#5fb8a0', '#f0c860', '#4a7ad8', '#e0743a'][i + 2], 3); ell(i * 36, -100, 8, 12); ctx.fillStyle = '#ffd36b'; ctx.fill(); } ctx.restore(); }
      const ws = popS(t, at('watch', 'gives you')); if (ws > 0) { ctx.save(); ctx.translate(1360, 420); ctx.scale(ws, ws); ell(0, 0, 230, 230); fs('#3a2a20', 6); watchFace(0, 0, 1.2, t, false); ctx.restore(); }
      pill(t, at('watch', 'Mostly'), 1360, 720, 'SHE FIXED IT', '(mostly)', { rot: .04 });
      memoryBoard(t, at('watch', 'Remember that') - .3, 0, 0, { tNew: at('watch', 'Remember that') + .1 });
      eraTag(t, 'AUSTIN, TEXAS · 2013');
    } },
  { id: 'outbreak', pops: () => [[at('outbreak', 'fungus'), 'stamp'], [at('outbreak', 'You grab')], [at('outbreak', 'Tommy grabs'), 'whoosh'], [at('outbreak', 'A soldier'), 'stamp'], [at('outbreak', 'You make it out'), 'whoosh']],
    draw(t) {
      const tc = at('outbreak', 'You make it out');
      if (t > tc) { ctx.fillStyle = '#050505'; ctx.fillRect(-100, -100, W + 200, H + 200); const a = clamp((t - tc) / .8); ctx.save(); ctx.globalAlpha = a; watchFace(960, 470, 1.15, t, true); text('SEPTEMBER 26, 2013', 960, 900, '600 40px Fredoka', '#d8d0c0', 'center', 'middle', '8px'); ctx.restore(); return; }
      sky(['#0a0a14', '#2a1a20', '#8a3a1a']); const fg = ctx.createRadialGradient(960, 760, 50, 960, 760, 900); fg.addColorStop(0, 'rgba(255,120,40,.5)'); fg.addColorStop(1, 'rgba(255,120,40,0)'); ctx.fillStyle = fg; ctx.fillRect(-100, 200, W + 200, 900);
      for (const [x, w, h] of [[60, 240, 180], [360, 200, 220], [1300, 260, 200], [1620, 220, 170]]) { rr(x, 760 - h, w, h, 2); fs('#1a1418', 4); ctx.beginPath(); ctx.moveTo(x - 10, 760 - h); ctx.lineTo(x + w / 2, 700 - h); ctx.lineTo(x + w + 10, 760 - h); ctx.fillStyle = '#1a1418'; ctx.fill(); for (let i = 0; i < 4; i++) { const fx = x + 30 + i * w / 4, fh = 50 + 30 * Math.sin(t * 9 + i + x); ctx.beginPath(); ctx.moveTo(fx - 26, 760 - h); ctx.quadraticCurveTo(fx, 760 - h - fh * 2, fx + 26, 760 - h); ctx.fillStyle = i % 2 ? '#ff8a3a' : '#ffc84a'; ctx.fill(); } }
      ground(760, '#3a3030', '#1a1414'); smoke(t, -2, 960, 400, 6);
      const tg = at('outbreak', 'Tommy grabs'); truck(lerp(-500, 960, eout(prog(t, tg, 1.2))), 960, .9);
      if (t < tg) { person({ ...J13, x: 760, y: 1000, s: .95, brow: 'worried', mouth: 'frown', seed: 1 }, t); person({ ...SARAH, x: 1000, y: 1000, s: .7, mouth: 'frown', brow: 'worried', seed: 2 }, t); }
      for (let i = 0; i < 3; i++) person({ ...CLICKER, x: 1500 + i * 150 - clamp(t - at('outbreak', 'fungus'), 0, 9) * 30, y: 880, s: .6, pop: popS(t, at('outbreak', 'fungus') + i * .2), seed: i }, t);
      pill(t, at('outbreak', 'fungus'), 960, 160, 'THE OUTBREAK', 'a fungus. seriously.');
      pill(t, at('outbreak', 'Tommy grabs') + .2, 960, 330, 'TOMMY', 'your brother · driving');
      if (t > at('outbreak', 'A soldier')) { person({ ...SOLDIER, x: 1680, y: 980, s: .9, seed: 5 }, t); ctx.save(); ctx.translate(1600, 600); ctx.rotate(Math.PI - .15); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(900, -120); ctx.lineTo(900, 120); ctx.closePath(); ctx.fillStyle = 'rgba(255,250,210,.25)'; ctx.fill(); ctx.restore(); pill(t, at('outbreak', 'A soldier'), 1600, 200, 'ORDERS', 'nobody leaves'); }
    } },
  { id: 'ch1', len: 2.8, pops: () => [[.1, 'stamp']], draw: t => chapterJ(t, 'I', 'Twenty Years Later') },
  { id: 'smuggler', pops: () => [[at('smuggler', 'smuggler')], [at('smuggler', 'allergic')], [at('smuggler', 'You still wear') - .2, 'swish'], [at('smuggler', 'still broken'), 'ding']],
    draw(t) {
      bostonBG(t); person({ ...J33, x: 760, y: 1000, s: 1, brow: 'angry', seed: 1 }, t);
      pill(t, at('smuggler', 'smuggler'), 760, 200, 'JOEL', 'smuggler · 20 years on');
      counter(t, at('smuggler', 'allergic'), 1240, 620, 'FEELINGS', '0%', { col: PAL.pink });
      memoryBoard(t, at('smuggler', 'You still wear') - .3, 0, 0, { hi: [0], tHi: at('smuggler', 'still broken') });
      eraTag(t, 'BOSTON QZ · 2033');
    } },
  { id: 'ellie', pops: () => [[at('ellie', 'Fireflies')], [at('ellie', 'Smuggle')], [at('ellie', 'Her name')], [at('ellie', 'swears')], [at('ellie', 'bitten'), 'stamp'], [at('ellie', 'should be dead'), 'stamp']],
    draw(t) {
      bostonBG(t); fireflyLogo(300, 260, 1, t);
      person({ ...J33, x: 600, y: 1000, s: 1, seed: 1 }, t);
      person({ ...MARLENE, x: 1500, y: 1000, s: .95, pop: popS(t, at('ellie', 'Fireflies')), seed: 4 }, t);
      const E = { ...ELLIE, x: 1100, y: 1000, s: .82, pop: popS(t, at('ellie', 'Her name')), mouth: t > at('ellie', 'swears') ? 'grin' : 'smirk', seed: 2 }; person(E, t);
      pill(t, at('ellie', 'Fireflies') + .2, 1500, 230, 'MARLENE', 'the Fireflies');
      pill(t, at('ellie', 'Her name'), 1100, headTop(E).y - 70, 'ELLIE', '14 years old');
      counter(t, at('ellie', 'swears'), 1480, 520, 'SWEARS / MINUTE', '12', { col: PAL.pink });
      stampText(t, at('ellie', 'bitten'), 700, 230, 'BITTEN · 3 WEEKS AGO', .7);
      pill(t, at('ellie', 'should be dead') + .3, 1100, 140, 'SHE SHOULD BE DEAD', '(she is not)', { bg: PAL.mint });
      eraTag(t, 'BOSTON QZ · 2033');
    } },
  { id: 'tess', pops: () => [[at('tess', 'Tess')], [at('tess', 'stays behind'), 'swish'], [at('tess', 'just you'), 'whoosh']],
    draw(t) {
      ruinsBG(t, 'summer'); const tr = at('tess', 'just you'); const run = clamp((t - tr) / 2);
      person({ ...TESS, x: 1260, y: 990, s: .95, mouth: 'smirk', alpha: 1 - clamp((t - tr) / 1), seed: 3 }, t);
      for (let i = 0; i < 3; i++) person({ ...CLICKER, x: 1700 + i * 120 - t * 20, y: 900, s: .6, pop: popS(t, at('tess', 'stays behind') + i * .2), seed: i }, t);
      person({ ...J33, x: 700 - run * 700, y: 1000, s: 1, walking: run > 0, phase: t * 12, seed: 1 }, t);
      person({ ...ELLIE, x: 920 - run * 720, y: 1000, s: .82, walking: run > 0, phase: t * 13, mouth: 'frown', seed: 2 }, t);
      pill(t, at('tess', 'Tess'), 1260, 230, 'TESS', 'your partner'); stampText(t, at('tess', 'Tess') + .8, 1500, 420, 'BITTEN', .8);
      pill(t, at('tess', 'stays behind'), 1260, 360, 'STAYS BEHIND', 'so you can run', { bg: PAL.mint });
    } },
  { id: 'ch2', len: 2.8, pops: () => [[.1, 'stamp']], draw: t => chapterJ(t, 'II', 'The Road West') },
  { id: 'road', pops: () => [[at('road', 'cross the country')], [at('road', 'terrible puns'), 'ding'], [at('road', 'pretend')], [at('road', 'Hold that') - .2, 'swish'], [at('road', 'Hold that') + .2]],
    draw(t) {
      ruinsBG(t, 'summer', t * 140);
      person({ ...J33, x: 700, y: 1000, s: 1, walking: true, phase: t * 7, mouth: t > at('road', 'pretend') ? 'frown' : 'flat', brow: t > at('road', 'terrible') ? 'angry' : 'normal', seed: 1 }, t);
      person({ ...ELLIE, x: 980, y: 1000, s: .82, walking: true, phase: t * 7.5, mouth: 'grin', seed: 2 }, t);
      const bs = popS(t, at('road', 'terrible puns')); if (bs > 0) { ctx.save(); ctx.translate(1110, 640); ctx.rotate(-.2); ctx.scale(bs, bs); rr(-70, -50, 140, 100, 6); fs('#e0743a'); text('PUNS', 0, 2, '700 34px Fredoka', '#fff'); ctx.restore(); }
      bubble(t, at('road', 'terrible puns') + .3, 1250, 300, 'Get it?? GET IT??', { left: true });
      pill(t, at('road', 'pretend'), 560, 220, 'YOU: NOT LAUGHING', null, { rot: -.04 });
      pill(t, at('road', 'cross the country'), 960, 120, 'BOSTON → ???', 'a whole country of this');
      memoryBoard(t, at('road', 'Hold that') - .3, 0, 1, { tNew: at('road', 'Hold that') + .1 });
      eraTag(t, 'THE ROAD · 2033');
    } },
  { id: 'tommy', pops: () => [[at('tommy', 'brother Tommy')], [at('tommy', 'hand Ellie'), 'swish'], [at('tommy', 'everyone she')], [at('tommy', 'So you stay'), 'stamp']],
    draw(t) {
      jacksonBG(t, false); const st = t > at('tommy', 'So you stay');
      person({ ...J33, x: 620, y: 1000, s: 1, brow: st ? 'normal' : 'worried', seed: 1 }, t);
      person({ ...TOMMYM, x: 1380, y: 1000, s: .98, pop: popS(t, at('tommy', 'brother Tommy')), seed: 3 }, t);
      const ex = t > at('tommy', 'hand Ellie') && !st ? lerp(960, 1160, eout(prog(t, at('tommy', 'hand Ellie'), .6))) : st ? lerp(1160, 860, eout(prog(t, at('tommy', 'So you stay'), .6))) : 960;
      person({ ...ELLIE, x: ex, y: 1000, s: .82, mouth: t > at('tommy', 'everyone she') && !st ? 'frown' : 'smirk', brow: t > at('tommy', 'everyone she') && !st ? 'worried' : 'normal', seed: 2 }, t);
      pill(t, at('tommy', 'brother Tommy'), 1380, 230, 'TOMMY', 'your little brother');
      pill(t, at('tommy', 'everyone she'), 960, 150, 'EVERYONE SHE CARED ABOUT', 'died or left her', { bg: '#ffd1c0' });
      stampText(t, at('tommy', 'So you stay'), 640, 300, 'YOU STAY');
      eraTag(t, 'WYOMING · 2033');
    } },
  { id: 'fall', pops: () => [[at('fall', 'metal bar'), 'stamp'], [at('fall', 'keeping you alive'), 'whoosh'], [at('fall', 'All winter')], [at('fall', 'fourteen'), 'ding']],
    draw(t) {
      const tw = at('fall', 'keeping you alive');
      if (t < tw) { ruinsBG(t, 'autumn'); const f = eout(prog(t, at('fall', 'metal bar'), .5));
        personRot({ ...J33, x: 900, y: lerp(1000, 960, f), s: .95, brow: 'worried', mouth: 'frown', seed: 1 }, t, f * -1.45);
        person({ ...ELLIE, x: 1300, y: 1000, s: .82, brow: 'worried', mouth: 'frown', seed: 2 }, t);
        stampText(t, at('fall', 'metal bar'), 960, 200, 'OUCH', 1); eraTag(t, 'COLORADO · FALL'); return; }
      ruinsBG(t, 'winter'); rr(380, 860, 700, 80, 20); fs('#7a5a4a');
      personRot({ ...J33, x: 1000, y: 880, s: .8, brow: 'worried', mouth: 'flat', seed: 1 }, t, -1.57);
      rr(640, 820, 400, 70, 30); fs('#a87a5a');
      person({ ...ELLIE, x: 1300, y: 1000, s: .86, brow: 'angry', mouth: 'flat', seed: 2 }, t);
      pill(t, at('fall', 'keeping you alive'), 1300, 200, 'ELLIE', 'keeping you alive');
      counter(t, at('fall', 'All winter'), 640, 300, 'DAYS OF WINTER', String(Math.floor(clamp((t - at('fall', 'All winter')) / 2.5) * 90)), { col: PAL.purple });
      pill(t, at('fall', 'fourteen'), 1300, 340, "SHE'S 14", null, { bg: PAL.mint, rot: .04 });
      eraTag(t, 'COLORADO · WINTER');
    } },
  { id: 'giraffe', pops: () => [[at('giraffe', 'giraffes'), 'ding'], [at('giraffe', 'For one second')], [at('giraffe', 'reads you')], [at('giraffe', 'you laugh'), 'stamp'], [at('giraffe', 'Told you') - .2, 'swish']],
    draw(t) {
      ruinsBG(t, 'spring'); giraffe(lerp(1500, 1300, clamp(t / 8)), 820, .9, t, 1); giraffe(lerp(1800, 1600, clamp(t / 8)), 800, .7, t, 2);
      const lg = t > at('giraffe', 'you laugh');
      person({ ...J33, x: 520, y: 1000, s: 1, mouth: lg ? 'grin' : 'flat', seed: 1 }, t); person({ ...ELLIE, x: 800, y: 1000, s: .82, mouth: 'grin', look: 8, seed: 2 }, t);
      pill(t, at('giraffe', 'For one second'), 960, 150, 'THE WORLD', 'not over (for one second)');
      bubble(t, at('giraffe', 'you laugh'), 420, 300, 'HA!', {});
      memoryBoard(t, at('giraffe', 'Told you') - .3, 0, 1, { hi: [1], tHi: at('giraffe', 'Told you') + .1 });
      eraTag(t, 'SALT LAKE CITY · SPRING');
    } },
  { id: 'ch3', len: 2.8, pops: () => [[.1, 'stamp']], draw: t => chapterJ(t, 'III', 'The Hospital') },
  { id: 'hospital', pops: () => [[at('hospital', 'Fireflies finally')], [at('hospital', 'Good news'), 'ding'], [at('hospital', 'Bad news'), 'stamp'], [at('hospital', 'nobody'), 'stamp']],
    draw(t) {
      hospitalBG(t); rr(760, 700, 400, 60, 14); fs('#f4f8f8'); line(800, 760, 800, 900, 10); line(1120, 760, 1120, 900, 10);
      ctx.save(); ctx.translate(960, 680); ctx.rotate(-1.57); person({ ...ELLIE, x: 0, y: 160, s: .55, backpack: null, brow: 'normal', mouth: 'flat' }, t); ctx.restore();
      person({ ...MARLENE, x: 1450, y: 1000, s: .95, seed: 4 }, t); person({ ...SURGEON, x: 470, y: 1000, s: .95, seed: 5 }, t);
      pill(t, at('hospital', 'Good news'), 620, 220, 'GOOD NEWS', 'a cure for everyone', { bg: PAL.mint });
      pill(t, at('hospital', 'Bad news'), 1300, 220, 'BAD NEWS', 'the surgery kills her', { bg: '#ffd1c0', rot: .03 });
      stampText(t, at('hospital', 'nobody'), 960, 430, 'NOBODY ASKS HER', .9);
      eraTag(t, 'SALT LAKE CITY · 2034');
    } },
  { id: 'choice', pops: () => [[at('choice', 'whole hospital'), 'whoosh'], [at('choice', 'carry her out')], [at('choice', 'The surgeon')], [at('choice', 'Remember that') - .2, 'swish'], [at('choice', 'Remember that') + .2]],
    draw(t) {
      hospitalBG(t); const walk = clamp(t / 5);
      for (let i = 0; i < 6; i++) { const p = clamp((t - .2 - i * .5) / 1.5); if (p <= 0 || p >= 1) continue; ctx.save(); ctx.globalAlpha = Math.sin(p * Math.PI) * .25; ctx.fillStyle = '#e0263c'; ctx.fillRect(-100, -100, W + 200, H + 200); ctx.restore(); }
      const jx = lerp(300, 900, walk);
      person({ ...J33, x: jx, y: 1000, s: 1, walking: walk < 1, phase: t * 6, brow: 'angry', armL: .5, armR: .5, seed: 1 }, t);
      if (t > at('choice', 'carry her out')) { ctx.save(); ctx.translate(jx, 560); ctx.rotate(-1.4); person({ ...ELLIE, x: 0, y: 150, s: .5, mouth: 'flat' }, t); ctx.restore(); }
      person({ ...SURGEON, x: 1500, y: 1000, s: .95, alpha: 1 - clamp((t - at('choice', 'had a daughter') - .3) / .8), seed: 5 }, t);
      pill(t, at('choice', 'The surgeon'), 1500, 230, 'THE SURGEON', 'had a daughter');
      memoryBoard(t, at('choice', 'Remember that') - .3, 0, 2, { tNew: at('choice', 'Remember that') + .1 });
    } },
  { id: 'lie', pops: () => [[at('lie', 'you lie'), 'stamp'], [at('lie', 'others like her')], [at('lie', 'swear')], [at('lie', 'You swear'), 'ding']],
    draw(t) {
      ruinsBG(t, 'sunset');
      person({ ...J33, x: 720, y: 1000, s: 1, look: t > at('lie', 'You swear') ? -10 : 0, seed: 1 }, t); person({ ...ELLIE, x: 1100, y: 1000, s: .82, mouth: 'flat', brow: 'worried', look: -10, seed: 2 }, t);
      stampText(t, at('lie', 'you lie'), 960, 160, 'THE LIE');
      bubble(t, at('lie', 'others like her'), 520, 340, "There were others. Didn't work.", {});
      bubble(t, at('lie', 'swear'), 1300, 420, 'Swear to me.', { left: true });
      bubble(t, at('lie', 'You swear'), 600, 480, 'I swear.', {});
      eraTag(t, 'ON THE ROAD · 2034');
    } },
  { id: 'midcta', pops: () => [[.2, 'stamp'], [at('midcta', 'Which')], [at('midcta', 'Drop')], [at('midcta', 'Drop') + .3], [at('midcta', 'Drop') + .6], [at('midcta', 'most liked'), 'ding']],
    draw(t) {
      raysJ(t); const sp = popS(t, .1); ctx.save(); ctx.translate(960, 150); ctx.scale(sp, sp); rr(-220, -55, 440, 110, 55); fs('#fff', 5); text('❚❚  QUICK PAUSE', 0, 4, '700 46px Fredoka', INK); ctx.restore();
      const k = eout(prog(t, at('midcta', 'Which'), .4)); if (k <= 0) return; ctx.save(); ctx.globalAlpha = k; ctx.translate(0, lerp(80, 0, k));
      rr(460, 260, 1000, 700, 26); fs('#1a221a', 5); text('Which character should be born next?', 960, 330, '700 44px Fredoka', '#fff');
      [['Ellie', 'Part II from her side pls', 9800], ['Leon Kennedy', 'where is everyone going, bingo?', 7300], ['Master Chief', 'finish the fight', 5100], ['Tommy Vercetti', 'already done, go watch it!', 4200]].forEach(([n, c, likes], i) => {
        const ti = at('midcta', 'Drop') + i * .3; if (t < ti) return; const s = popS(t, ti); ctx.save(); ctx.translate(510, 410 + i * 130); ctx.scale(1, s);
        ell(40, 0, 36, 36); fs([PAL.pink, PAL.teal, PAL.orange, PAL.purple][i], 3); text(n[0], 40, 2, '700 36px Fredoka', '#fff'); text(n, 100, -18, '700 34px Fredoka', '#fff', 'left'); text(c, 100, 22, '500 28px Fredoka', '#a8c0a8', 'left');
        text('♥ ' + Math.floor(likes * (1 + clamp(t - ti, 0, 3) * .05)).toLocaleString('en-US'), 880, 0, '700 32px Fredoka', PAL.pink, 'right'); ctx.restore(); });
      ctx.restore(); pill(t, at('midcta', 'most liked'), 1500, 900, 'MOST LIKED = NEXT', null, { bg: PAL.gold, rot: -.05 });
    } },
  { id: 'ch4', len: 2.8, pops: () => [[.1, 'stamp']], draw: t => chapterJ(t, 'IV', 'Jackson') },
  { id: 'jackson', pops: () => [[at('jackson', 'Jackson')], [at('jackson', 'guitar'), 'ding'], [at('jackson', 'museum'), 'whoosh'], [at('jackson', 'astronaut')], [at('jackson', 'Best day'), 'ding']],
    draw(t) {
      const tm = at('jackson', 'museum');
      if (t < tm) { jacksonBG(t, false); person({ ...J33, backpack: null, x: 700, y: 1000, s: 1, mouth: 'grin', seed: 1 }, t); person({ ...ELLIE, backpack: null, x: 1080, y: 1000, s: .9, mouth: 'grin', seed: 2 }, t);
        const gs = popS(t, at('jackson', 'guitar')); if (gs > 0) { ctx.save(); ctx.translate(1080, 640); ctx.rotate(-.6); ctx.scale(gs, gs); ell(0, 60, 70, 80); fs('#b8783a'); ell(0, -30, 54, 60); fs('#b8783a'); ell(0, 20, 20, 20); fs('#3a2a1a', 3); rr(-10, -260, 20, 220, 4); fs('#6a4a2a'); ctx.restore(); }
        pill(t, at('jackson', 'guitar'), 1080, 220, 'GUITAR LESSONS', 'with dad (basically)'); eraTag(t, 'JACKSON, WYOMING · 2038'); return; }
      museumBG(t); person({ ...J33, backpack: null, x: 700, y: 1000, s: 1, mouth: 'grin', seed: 1 }, t);
      const E = { ...ELLIE, backpack: null, x: 1060, y: 1000, s: .9, mouth: 'grin', seed: 2 }; person(E, t);
      if (t > at('jackson', 'astronaut')) { const hs = popS(t, at('jackson', 'astronaut')); ctx.save(); ctx.translate(1060, 1000 - 590 * .9); ctx.scale(hs, hs); ell(0, 0, 100, 104); ctx.fillStyle = 'rgba(200,230,255,.35)'; ctx.fill(); ctx.lineWidth = 12; ctx.strokeStyle = '#f4f4f4'; ctx.stroke(); line(-60, -50, -30, -70, 6, 'rgba(255,255,255,.8)'); ctx.restore(); }
      pill(t, at('jackson', 'Best day'), 1060, 230, 'BEST DAY EVER', null, { bg: PAL.gold, rot: .04 }); eraTag(t, 'MUSEUM · HER BIRTHDAY');
    } },
  { id: 'truth', pops: () => [[at('truth', 'goes back'), 'whoosh'], [at('truth', 'truth'), 'stamp'], [at('truth', 'stops talking')]],
    draw(t) {
      hospitalBG(t); ctx.fillStyle = 'rgba(20,30,30,.45)'; ctx.fillRect(-100, -100, W + 200, H + 200);
      person({ ...ELLIE, backpack: null, x: 960, y: 1000, s: .95, mouth: 'frown', brow: t > at('truth', 'truth') ? 'angry' : 'worried', seed: 2 }, t);
      stampText(t, at('truth', 'truth'), 960, 200, 'THE TRUTH');
      counter(t, at('truth', 'stops talking'), 1450, 560, 'DAYS NOT TALKING', String(Math.floor(clamp((t - at('truth', 'stops talking')) / 2.5) * 700)), { col: PAL.pink });
      eraTag(t, 'SALT LAKE CITY · AGAIN');
    } },
  { id: 'porch', pops: () => [[at('porch', "can't forgive"), 'swish'], [at('porch', 'like to try'), 'ding']],
    draw(t) {
      jacksonBG(t, true); rr(300, 560, 1320, 40, 6); fs('#5a3a22'); for (const x of [340, 1560]) { rr(x, 560, 30, 340, 4); fs('#5a3a22'); } rr(260, 880, 1400, 40, 6); fs('#6a4a2a');
      ell(960, 620, 26, 34); ctx.save(); ctx.shadowColor = '#ffd27a'; ctx.shadowBlur = 50; ctx.fillStyle = '#ffd27a'; ctx.fill(); ctx.restore();
      person({ ...J33, backpack: null, x: 700, y: 900, s: .95, mouth: t > at('porch', 'like to try') ? 'smirk' : 'flat', seed: 1 }, t); person({ ...ELLIE, backpack: null, x: 1200, y: 900, s: .85, mouth: 'flat', look: -8, seed: 2 }, t);
      bubble(t, at('porch', "can't forgive"), 1280, 280, "I can't forgive you.", { left: true });
      bubble(t, at('porch', 'like to try'), 1280, 400, "But I'd like to try.", { left: true });
      eraTag(t, 'JACKSON · THE PORCH');
    } },
  { id: 'ch5', len: 2.8, pops: () => [[.1, 'stamp']], draw: t => chapterJ(t, 'V', 'The Daughter') },
  { id: 'abby', pops: () => [[at('abby', 'snowstorm'), 'whoosh'], [at('abby', 'Abby')], [at('abby', 'Remember that surgeon') - .2, 'swish'], [at('abby', "That's her"), 'stamp'], [at('abby', 'very long way')]],
    draw(t) {
      sky(['#5a6a7a', '#9aaab8', '#d8e0e8']); ground(780, '#f4f6f8', '#d0d8e0');
      for (let i = 0; i < 9; i++) { const x = 80 + i * 230, h = 300 + (i % 3) * 60; ctx.beginPath(); ctx.moveTo(x, 790); ctx.lineTo(x + 70, 790 - h); ctx.lineTo(x + 140, 790); ctx.fillStyle = '#3a5a4a'; ctx.fill(); }
      person({ ...J33, backpack: null, jacket: '#6a4a2a', longSleeve: true, sleeve: '#6a4a2a', x: 700, y: 1000, s: 1, seed: 1 }, t);
      const ab = { ...ABBY, x: lerp(1500, 1250, eout(prog(t, at('abby', 'very long way'), 1.5))), y: 1000, s: .97, pop: popS(t, at('abby', 'Abby')), seed: 7 }; person(ab, t);
      snow(t, 160, .6); pill(t, at('abby', 'Abby'), ab.x, 210, 'ABBY', 'a stranger in the snow');
      memoryBoard(t, at('abby', 'Remember that surgeon') - .3, at('abby', "That's her") + 1.3, 2, { hi: [2], tHi: at('abby', "That's her") });
      const dk = clamp((t - at('abby', 'very long way') - 1.6) / 1.5); if (dk > 0) { ctx.fillStyle = `rgba(0,0,0,${dk * .85})`; ctx.fillRect(-100, -100, W + 200, H + 200); }
      eraTag(t, 'JACKSON · 2038');
    } },
  { id: 'ending', pops: () => [[.4, 'swish'], [at('ending', 'lost a daughter')], [at('ending', 'found another')], [at('ending', 'chose her'), 'stamp'], [at('ending', 'Not bad')]],
    draw(t) {
      ruinsBG(t, 'sunset'); person({ ...J33, x: 520, y: 1000, s: 1, mouth: 'smirk', seed: 1 }, t); person({ ...ELLIE, x: 800, y: 1000, s: .84, mouth: 'grin', look: -8, seed: 2 }, t);
      const k = eout(prog(t, .3, .5)); ctx.save(); ctx.translate(lerp(800, 0, k), 0); ctx.rotate(-.025); parchment(1060, 200, 620, 520); text("JOEL'S LIFE", 1370, 270, '700 52px Almendra', '#8a3a1a');
      ['Lost a daughter', 'Found another one', 'Chose her over the world'].forEach((it, i) => { const tc = [at('ending', 'lost a daughter'), at('ending', 'found another'), at('ending', 'chose her')][i]; if (t < tc) return; ctx.save(); ctx.globalAlpha = clamp((t - tc) / .25); text('•  ' + it, 1110, 385 + i * 110, '700 50px Caveat', INK, 'left'); ctx.restore(); });
      ctx.restore(); pill(t, at('ending', 'Not bad'), 1370, 860, 'NOT BAD', 'for a guy who tried not to care', { bg: PAL.mint });
    } },
  { id: 'outro', extra: 3, pops: () => [[.4], [1.4, 'stamp']], draw: t => bookJ(t, null, null, true) },
];
SCENES.length = 0; SCENES.push(...J);
