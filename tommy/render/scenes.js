// Scene definitions for "What if you were born as Tommy Vercetti?" — GTA 6-style neon palette.
const TOMMY = { hair: 'tommy', hairCol: '#3a2418', skin: '#e9b48e', stubble: true };
const TOMMY_VC = { ...TOMMY, shirt: '#19b6e0', pattern: 'hawaii', collar: '#1597bd', pants: '#3f5f93', mouth: 'smirk' };
const SONNY = { hair: 'slick', hairCol: '#16110f', skin: '#e3ac84', shirt: '#f5f2ea', jacket: '#5d6470', longSleeve: true, sleeve: '#5d6470', pants: '#4c525d', tie: '#e0263c', buttons: true, mouth: 'grin', chain: false };
const KEN = { hair: 'curly', hairCol: '#6a3f22', skin: '#efc19f', shirt: '#ff8fc4', jacket: '#f4f1e8', longSleeve: true, sleeve: '#f4f1e8', pants: '#f4f1e8', shoes: '#8a5a34', brow: 'worried', mouth: 'frown' };
const LANCE = { hair: 'short', hairCol: '#14100e', skin: '#7a4a2e', shirt: '#ff5fb0', jacket: '#fbf8f0', longSleeve: true, sleeve: '#fbf8f0', pants: '#fbf8f0', shoes: '#e8e0d0', mouth: 'smirk' };
const DIAZ = { hair: 'curly', hairCol: '#14100e', skin: '#c98e62', shirt: '#e0263c', pattern: 'hawaii', collar: '#b81d30', pants: '#1d1d26', mustache: '#14100e', chain: true, brow: 'angry', mouth: 'grin' };
const CORTEZ = { hair: 'grey', hairCol: '#c9c9c9', skin: '#d9a77d', shirt: '#6b7a3a', jacket: '#6b7a3a', longSleeve: true, sleeve: '#6b7a3a', pants: '#56622e', mustache: '#dcdcdc', hat: 'cap', buttons: true };
const AVERY = { hair: 'grey', hairCol: '#e0e0e0', skin: '#f0c4a0', shirt: '#fff', jacket: '#c9a46a', longSleeve: true, sleeve: '#c9a46a', pants: '#c9a46a', tie: '#7a3cff', hat: 'cowboy', mouth: 'grin', shoes: '#6b3f22' };
const MASKED = { mask: true, skin: '#2a2234', shirt: '#2a2234', jacket: '#1d1826', longSleeve: true, sleeve: '#1d1826', pants: '#1d1826', hair: 'none' };

// ---------- shared art ----------
function retroSun(x, y, r) {
  ctx.save(); ctx.beginPath(); ctx.rect(x - r - 10, y - r - 10, 2 * r + 20, r + 10);
  for (let i = 0; i < 7; i++) { const yy = y + i * 30; ctx.rect(x - r - 10, yy, 2 * r + 20, 20 - i * 2.5); }
  ctx.clip(); ell(x, y, r, r); ctx.fillStyle = grad(y - r, y + r, ['#fff3a0', PAL.gold, PAL.orange, PAL.pink]);
  ctx.shadowColor = PAL.pink; ctx.shadowBlur = 60; ctx.fill(); ctx.restore();
}
function palm(x, y, s, flip) {
  ctx.save(); ctx.translate(x, y); ctx.scale(flip ? -s : s, s);
  ctx.beginPath(); ctx.moveTo(-18, 0); ctx.quadraticCurveTo(-10, -260, 60, -520); ctx.lineTo(84, -514); ctx.quadraticCurveTo(20, -260, 22, 0); ctx.closePath(); fs('#7a4a34');
  for (let i = 1; i < 9; i++) line(-14 + i * 6, -i * 58, 22 + i * 6, -i * 58 - 4, 3, 'rgba(36,18,46,.5)');
  ctx.translate(72, -518);
  for (const [a, l] of [[-2.6, 1], [-2.0, 1.1], [-1.2, 1], [-0.5, 1.1], [0.2, 1], [-3.1, .8]]) {
    ctx.save(); ctx.rotate(a); ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(120 * l, -60, 250 * l, 30); ctx.quadraticCurveTo(120 * l, 10, 0, 0); fs('#14a36a', 4); ctx.restore();
  }
  ctx.restore();
}
function neonText(s, x, y, font, col, t, glow = 30) {
  ctx.save(); ctx.shadowColor = col; ctx.shadowBlur = glow + Math.sin(t * 9 + x) * 5; text(s, x, y, font, '#fff'); ctx.shadowBlur = glow * .5; text(s, x, y, font, col); ctx.restore();
}
function car(x, y, s, col, flip) {
  ctx.save(); ctx.translate(x, y); ctx.scale(flip ? -s : s, s);
  ctx.beginPath(); ctx.moveTo(-260, -40); ctx.lineTo(-250, -100); ctx.lineTo(-120, -110); ctx.lineTo(-60, -150); ctx.lineTo(-20, -150); ctx.lineTo(10, -110); ctx.lineTo(240, -100); ctx.lineTo(260, -40); ctx.closePath(); fs(col);
  line(-230, -80, 230, -72, 5, 'rgba(255,255,255,.6)'); ctx.beginPath(); ctx.moveTo(-58, -146); ctx.lineTo(-20, -146); ctx.lineTo(0, -112); ctx.lineTo(-80, -112); ctx.closePath(); fs('rgba(160,240,255,.7)', 4);
  for (const wx of [-160, 160]) { ell(wx, -36, 50, 50); fs('#1d1826'); ell(wx, -36, 24, 24); fs('#d8d8e8', 4); }
  ell(250, -70, 14, 10); fs('#fff3a0', 3); ctx.restore();
}
function hotel(x, w, h, col, trim, neon, sign, t, mode) {
  const base = 730, top = base - h, lit = mode !== 'day';
  rr(x + w * .15, top - 34, w * .7, 40, 4); fs(col, 4); rr(x + w * .34, top - 66, w * .32, 36, 4); fs(col, 4);
  rr(x, top, w, h, 6); fs(col, 4);
  for (let y = top + 60; y < base - 20; y += 72) {
    rr(x - 8, y, w + 16, 12, 4); fs(trim, 3);
    for (let wx = x + 22; wx < x + w - 30; wx += 46) { rr(wx, y + 20, 26, 36, 4); ctx.fillStyle = lit ? (((wx * 3 + y) % 7 < 3) ? '#ffe6a3' : (((wx + y) % 5 < 2) ? '#ff9ad5' : '#3a2a5a')) : '#7fe7ff'; ctx.fill(); }
  }
  if (lit) { ctx.save(); ctx.shadowColor = neon; ctx.shadowBlur = 28; rr(x, top, w, h, 6); ctx.lineWidth = 5; ctx.strokeStyle = neon; ctx.stroke(); ctx.restore(); }
  if (sign) {
    const sx = x + w / 2, sh = sign.length * 50 + 30;
    rr(sx - 34, top - 40, 68, sh, 10); fs(lit ? '#2a1640' : trim, 4);
    [...sign].forEach((c, i) => lit ? neonText(c, sx, top - 4 + i * 50, '700 44px Fredoka', neon, t, 26) : text(c, sx, top - 4 + i * 50, '700 44px Fredoka', neon));
  }
}
function viceBG(t, mode = 'sunset', o = {}) {
  const skies = { sunset: ['#2a0b52', '#7b1fa2', '#ff2d95', '#ff8a3d', '#ffd36b'], night: ['#07051f', '#1d0f4a', '#4a1878', '#9a2a85'], day: ['#2b7dff', '#46c8ff', '#a9ecff', '#ffd6ec'] };
  ctx.fillStyle = grad(-100, 740, skies[mode]); ctx.fillRect(-100, -100, W + 200, 860);
  if (mode === 'sunset') retroSun(o.sunX || 960, 600, 300);
  if (mode === 'night') { const r = rand(9); for (let i = 0; i < 90; i++) { ell(r() * W, r() * 420, 2, 2); ctx.fillStyle = `rgba(255,255,255,${.4 + .5 * Math.sin(t * 3 + i)})`; ctx.fill(); } ell(1500, 170, 60, 60); ctx.fillStyle = '#ffe9f5'; ctx.shadowColor = '#ff9ad5'; ctx.shadowBlur = 50; ctx.fill(); ctx.shadowBlur = 0; }
  if (mode === 'day') for (let i = 0; i < 4; i++) { const x = ((i * 560 + t * 20) % 2400) - 300; ell(x, 130 + i * 50, 170, 44); ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.fill(); }
  ctx.fillStyle = mode === 'day' ? 'rgba(120,90,200,.35)' : 'rgba(60,20,110,.75)';
  for (const [x, w, h] of [[60, 90, 300], [180, 70, 380], [1300, 100, 420], [1450, 80, 330], [1700, 110, 360], [900, 80, 300]]) ctx.fillRect(x, 730 - h, w, h);
  const hs = o.hotels || [[-20, 300, 420, '#ff9ccf', '#fff0f8', PAL.pink, 'HOTEL'], [330, 260, 330, '#8af7dc', '#effffa', PAL.teal, 'OCEAN'], [640, 300, 460, '#ffd39a', '#fff7ea', PAL.orange, ''],
  [1000, 280, 360, '#c7a6ff', '#f5efff', PAL.purple, 'NEON'], [1330, 320, 440, '#ff9ccf', '#fff0f8', PAL.hot, 'PALMS'], [1700, 260, 340, '#8af7dc', '#effffa', PAL.teal, '']];
  for (const hh of hs) hotel(...hh, t, mode);
  ctx.fillStyle = mode === 'day' ? '#ffd1e3' : '#c98ab8'; ctx.fillRect(-100, 730, W + 200, 160);
  for (let x = -100; x < W + 100; x += 90) line(x, 730, x - 40, 890, 2, 'rgba(36,18,46,.18)');
  line(-100, 730, W + 100, 730, 5); rr(-100, 880, W + 200, 22, 0); fs('#f6f0ff', 4);
  ctx.fillStyle = grad(900, 1080, mode === 'day' ? ['#4a3f6e', '#2e2550'] : ['#3b2160', '#1a0e33']); ctx.fillRect(-100, 902, W + 200, 300);
  if (mode !== 'day') for (const [x, c] of [[150, PAL.pink], [460, PAL.teal], [790, PAL.orange], [1140, PAL.purple], [1490, PAL.hot]]) { const g = ctx.createLinearGradient(0, 902, 0, 1080); g.addColorStop(0, c + '66'); g.addColorStop(1, c + '00'); ctx.fillStyle = g; ctx.fillRect(x - 40, 902, 80, 180); }
  for (let x = -100 - (t * 0) % 200; x < W + 100; x += 200) rr(x, 1010, 110, 12, 6), ctx.fillStyle = PAL.gold, ctx.fill();
  if (o.palms !== false) { palm(310, 790, .95, false); palm(980, 790, .9, true); palm(1660, 790, 1, false); }
  if (o.car) car(o.car[0], 1060, o.car[2] || .9, o.car[1] || PAL.pink, o.car[3]);
}
function beachBG(t) {
  ctx.fillStyle = grad(-100, 560, ['#2b7dff', '#46c8ff', '#b4f0ff', '#ffd6ec']); ctx.fillRect(-100, -100, W + 200, 680);
  for (let i = 0; i < 4; i++) { const x = ((i * 560 + t * 20) % 2400) - 300; ell(x, 120 + i * 40, 170, 40); ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.fill(); }
  ctx.fillStyle = 'rgba(122,60,255,.35)'; for (const [x, w, h] of [[80, 70, 160], [170, 60, 220], [260, 90, 180], [1500, 80, 200], [1600, 60, 260], [1680, 100, 170]]) ctx.fillRect(x, 560 - h, w, h);
  ctx.fillStyle = grad(560, 780, ['#19b6e0', '#0f7fb8']); ctx.fillRect(-100, 560, W + 200, 230);
  for (let i = 0; i < 10; i++) { const o = Math.sin(t * 1.4 + i) * 40; line(200 + i * 160 + o, 600 + (i % 3) * 50, 300 + i * 160 + o, 600 + (i % 3) * 50, 4, 'rgba(255,255,255,.5)'); }
  ctx.fillStyle = grad(770, 1080, ['#ffe6b8', '#ffcf94']); ctx.fillRect(-100, 770, W + 200, 330);
  ctx.beginPath(); ctx.moveTo(-100, 775); for (let x = -100; x < W + 120; x += 60) ctx.quadraticCurveTo(x + 30, 760 + Math.sin(t * 2 + x) * 6, x + 60, 775); ctx.lineWidth = 8; ctx.strokeStyle = '#fff'; ctx.stroke();
}
function yacht(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-200, 0); ctx.lineTo(220, 0); ctx.lineTo(170, 60); ctx.lineTo(-170, 60); ctx.closePath(); fs('#fff');
  rr(-120, -60, 220, 60, 10); fs('#f4f4ff'); rr(-60, -110, 120, 50, 10); fs('#f4f4ff');
  for (let i = 0; i < 5; i++) { rr(-104 + i * 42, -44, 28, 22, 4); fs('#2b7dff', 3); }
  line(-190, 20, 200, 20, 6, PAL.pink); ctx.restore();
}
function mansionBG(t, mode = 'night') {
  const sk = mode === 'night' ? ['#07051f', '#22104d', '#5a1a7a', '#b02a7a'] : ['#2a0b52', '#9a1f8a', '#ff4f8a', '#ffa45a'];
  ctx.fillStyle = grad(-100, 760, sk); ctx.fillRect(-100, -100, W + 200, 900);
  if (mode === 'night') { const r = rand(4); for (let i = 0; i < 70; i++) { ell(r() * W, r() * 300, 2, 2); ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fill(); } }
  else retroSun(960, 330, 220);
  rr(300, 240, 1320, 520, 6); fs('#f7f0ff');
  rr(260, 210, 1400, 46, 8); fs('#efe6ff'); rr(700, 130, 520, 90, 8); fs('#efe6ff');
  ctx.save(); ctx.shadowColor = PAL.pink; ctx.shadowBlur = 30; line(260, 210, 1660, 210, 6, PAL.pink); line(700, 130, 1220, 130, 6, PAL.teal); ctx.restore();
  for (let i = 0; i < 6; i++) { const x = 360 + i * 120 + (i > 2 ? 480 : 0); rr(x, 300, 80, 160, 40); fs(mode === 'night' ? '#ffd98a' : '#9ad8ff'); rr(x, 520, 80, 160, 6); fs(mode === 'night' ? '#ffb8e0' : '#9ad8ff'); }
  rr(820, 400, 280, 360, 140); fs('#3a1a5a');
  for (const x of [730, 1150]) { rr(x, 260, 44, 500, 8); fs('#fff'); rr(x - 10, 250, 64, 26, 6); fs('#efe6ff'); }
  ctx.beginPath(); ctx.moveTo(760, 760); ctx.lineTo(1160, 760); ctx.lineTo(1400, 1000); ctx.lineTo(520, 1000); ctx.closePath(); fs('#efe6ff');
  for (let i = 1; i < 8; i++) { const y = 760 + i * 30, k = i / 8; line(lerp(760, 520, k), y, lerp(1160, 1400, k), y, 4, 'rgba(36,18,46,.35)'); }
  ctx.beginPath(); ctx.moveTo(900, 760); ctx.lineTo(1020, 760); ctx.lineTo(1080, 1000); ctx.lineTo(840, 1000); ctx.closePath(); fs('#e0263c', 3);
  ctx.fillStyle = mode === 'night' ? '#2a1640' : '#4a2a5a'; ctx.fillRect(-100, 1000, W + 200, 100); ctx.fillStyle = '#1aa36a'; ctx.fillRect(-100, 760, 620, 240); ctx.fillRect(1400, 760, 700, 240);
  line(-100, 760, 520, 760, 5); line(1400, 760, W + 100, 760, 5);
  palm(160, 1000, 1.05, false); palm(1780, 1000, 1.05, true);
}
function libertyNight(t) {
  ctx.fillStyle = grad(-100, 900, ['#0b0a2a', '#1f1d5a', '#3b2a7a']); ctx.fillRect(-100, -100, W + 200, 1100);
  ctx.fillStyle = '#2a2f6a'; ctx.fillRect(-100, 80, 520, 900); ctx.fillRect(1500, 80, 600, 900);
  for (let r = 0; r < 30; r++) { const y = 90 + r * 30; line(-100, y, 420, y, 2, 'rgba(0,0,0,.25)'); line(1500, y, W + 100, y, 2, 'rgba(0,0,0,.25)'); }
  rr(420, 160, 1080, 760, 0); fs('#3a3f86', 0);
  for (let r = 0; r < 25; r++) { const y = 170 + r * 30; line(420, y, 1500, y, 2, 'rgba(0,0,0,.2)'); for (let x = 420 + (r % 2) * 40; x < 1500; x += 80) line(x, y, x, y + 30, 2, 'rgba(0,0,0,.2)'); }
  for (let i = 0; i < 4; i++) { line(500, 260 + i * 140, 800, 260 + i * 140, 6, '#14122e'); for (let x = 500; x <= 800; x += 30) line(x, 260 + i * 140, x, 290 + i * 140, 3, '#14122e'); }
  rr(1150, 520, 260, 160, 10); fs('#2e7a52'); line(1150, 560, 1410, 560, 4);
  const lg = ctx.createRadialGradient(960, 160, 10, 960, 160, 520); lg.addColorStop(0, 'rgba(25,224,208,.45)'); lg.addColorStop(1, 'rgba(25,224,208,0)'); ctx.fillStyle = lg; ctx.fillRect(400, 0, 1120, 900);
  rr(910, 120, 100, 40, 8); fs('#14122e');
  ctx.fillStyle = grad(900, 1080, ['#2a2550', '#151230']); ctx.fillRect(-100, 900, W + 200, 300); line(-100, 900, W + 100, 900, 5);
}
function chapterCard(t, num, title) {
  const g = ctx.createRadialGradient(960, 540, 50, 960, 540, 1000); g.addColorStop(0, '#3a0f5e'); g.addColorStop(1, '#0a0418'); ctx.fillStyle = g; ctx.fillRect(-100, -100, W + 200, H + 200);
  for (let i = 0; i < 24; i++) { ctx.save(); ctx.translate(960, 540); ctx.rotate(i * Math.PI / 12 + t * .08); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(1400, -60); ctx.lineTo(1400, 60); ctx.closePath(); ctx.fillStyle = i % 2 ? 'rgba(255,45,149,.06)' : 'rgba(122,60,255,.06)'; ctx.fill(); ctx.restore(); }
  const a = clamp(t / .5);
  ctx.save(); ctx.globalAlpha = a;
  const s = popS(t, .1, .5); ctx.save(); ctx.translate(960, 390); ctx.scale(s, s);
  ctx.beginPath(); for (let i = 0; i < 6; i++) { const an = i * Math.PI / 3 - Math.PI / 2; ctx.lineTo(Math.cos(an) * 64, Math.sin(an) * 64); } ctx.closePath();
  ctx.shadowColor = PAL.pink; ctx.shadowBlur = 30; ctx.lineWidth = 6; ctx.strokeStyle = PAL.pink; ctx.stroke(); ctx.shadowBlur = 0;
  text(num, 0, 4, '700 52px Almendra', '#fff'); ctx.restore();
  text('CHAPTER ' + num, 960, 510, '600 30px Fredoka', PAL.mint, 'center', 'middle', '10px');
  ctx.font = '700 104px Almendra'; const gw = ctx.measureText(title).width;
  const tg = ctx.createLinearGradient(960 - gw / 2, 0, 960 + gw / 2, 0); tg.addColorStop(0, PAL.gold); tg.addColorStop(.5, PAL.pink); tg.addColorStop(1, PAL.purple);
  ctx.shadowColor = 'rgba(255,45,149,.7)'; ctx.shadowBlur = 30; text(title, 960, 630, '700 104px Almendra', tg);
  ctx.restore();
}
function splitPhone(t, left, right) {
  ctx.save(); ctx.beginPath(); ctx.moveTo(-100, -100); ctx.lineTo(1020, -100); ctx.lineTo(900, 1200); ctx.lineTo(-100, 1200); ctx.closePath(); ctx.clip(); left(); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.moveTo(1020, -100); ctx.lineTo(W + 100, -100); ctx.lineTo(W + 100, 1200); ctx.lineTo(900, 1200); ctx.closePath(); ctx.clip(); right(); ctx.restore();
  ctx.save(); ctx.shadowColor = PAL.pink; ctx.shadowBlur = 30; line(1020, -100, 900, 1200, 14, '#fff'); ctx.restore();
}
function liberyRoom(t) {
  ctx.fillStyle = grad(-100, 900, ['#3a0e1e', '#6a1a2a']); ctx.fillRect(-100, -100, W + 200, 1100);
  for (let x = 900; x < W + 100; x += 80) { ctx.fillStyle = 'rgba(0,0,0,.15)'; ctx.fillRect(x, -100, 34, 1100); }
  rr(1400, 200, 340, 260, 6); fs('#2a0a14'); ctx.fillStyle = grad(210, 450, ['#0b0a2a', '#3b2a7a']); ctx.fillRect(1412, 212, 316, 236);
  for (const [x, w, h] of [[1420, 50, 120], [1480, 70, 180], [1560, 40, 100], [1610, 80, 160], [1700, 30, 90]]) { ctx.fillStyle = '#14122e'; ctx.fillRect(x, 448 - h, w, h); }
  rr(1100, 640, 800, 60, 6); fs('#4a2a1a'); ctx.fillStyle = '#2a1410'; ctx.fillRect(-100, 900, W + 200, 300);
}
function cork(x, y, w, h) {
  rr(x, y, w, h, 14); fs('#5a3420', 6); rr(x + 26, y + 26, w - 52, h - 52, 6); fs('#c08a52', 3);
  const r = rand(3); for (let i = 0; i < 200; i++) { ell(x + 30 + r() * (w - 60), y + 30 + r() * (h - 60), 3, 3); ctx.fillStyle = 'rgba(80,50,20,.35)'; ctx.fill(); }
}
function polaroid(t, t0, x, y, rot, who, label, o = {}) {
  const s = popS(t, t0); if (s <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s * (o.s || 1), s * (o.s || 1));
  rr(-110, -130, 220, 260, 4); fs('#fff', 4);
  ctx.save(); rr(-94, -114, 188, 180, 2); ctx.clip(); ctx.fillStyle = o.bg || '#ffd1e3'; ctx.fillRect(-94, -114, 188, 180);
  person({ ...who, x: 0, y: 470 * .55 + 30, s: .55, alpha: 1 }, t); ctx.restore();
  rr(-94, -114, 188, 180, 2); fs(null, 3);
  text(label, 0, 100, '700 34px Caveat', INK);
  ell(0, -122, 12, 12); fs('#e0263c', 3); ctx.restore();
}
function subscribeBanner(t, t0, t1) {
  const k = eout(prog(t, t0, .5)) - eout(prog(t, t1, .5)); if (k <= 0) return;
  ctx.save(); ctx.translate(lerp(-560, 40, k), 120);
  parchment(0, 0, 480, 110); text('Subscribe', 130, 36, '700 46px Almendra', '#8a1f1a', 'left'); text('for the next life', 130, 80, '600 30px Caveat', INK, 'left');
  ell(64, 55, 42, 42); fs(PAL.pink); text('▶', 68, 57, '700 36px Fredoka', '#fff');
  if (t > t0 + 1.2) { ctx.save(); ctx.translate(380, 70); ctx.rotate(-.18); const sk = popS(t, t0 + 1.2); ctx.scale(sk, sk); rr(-90, -24, 180, 48, 6); ctx.lineWidth = 5; ctx.strokeStyle = '#e0263c'; ctx.stroke(); text('SUBSCRIBED', 0, 2, '700 28px Fredoka', '#e0263c'); ctx.restore(); }
  ctx.restore();
}
function flash(t, t0) { if (t < t0 || t > t0 + .3) return; ctx.save(); ctx.globalAlpha = 1 - (t - t0) / .3; ctx.fillStyle = '#fff6e0'; ctx.fillRect(-100, -100, W + 200, H + 200); ctx.restore(); }
function burst(t, t0, x, y, sz = 70, col = PAL.gold) {
  if (t < t0 || t > t0 + .35) return; const p = (t - t0) / .35, s = Math.sin(p * Math.PI) * sz;
  ctx.save(); ctx.translate(x, y); ctx.beginPath(); for (let i = 0; i < 16; i++) { const r = i % 2 ? s * .4 : s; const a = i * Math.PI / 8; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.closePath(); fs(col, 4); ctx.restore();
}
function smoke(t, t0, x, y, n = 8) {
  const a = 1 - prog(t, t0 + 1.2, 1.2); if (t < t0 || a <= 0) return; const r = rand(11);
  ctx.save(); ctx.globalAlpha = a * .9; for (let i = 0; i < n; i++) { const rx = x + (r() - .5) * 900, ry = y + (r() - .5) * 300, rs = 90 + r() * 90 + (t - t0) * 30; ell(rx, ry, rs, rs * .8); ctx.fillStyle = i % 2 ? '#e8dcf2' : '#d6c6e8'; ctx.fill(); } ctx.restore();
}
const pp = (t, t0) => t0 === undefined ? 1 : popS(t, t0);

// ---------- scenes ----------
const SCENES = [
  // 1. Cold open: "If you were born as..." close-up, then the to-do list struck in sync with the voice
  { id: 'hook1',
    pops: () => { const L = hookList(); return [[at('hook1', 'Tommy') + .6], [at('hook1', "you'd take") - .1, 'whoosh'], ...L.flatMap(i => [[i.t0], [i.t1, 'swish']])]; },
    draw(t) {
      const tl = at('hook1', "you'd take") - .1;
      viceBG(t, 'night', { palms: true });
      const g = ctx.createRadialGradient(960, 520, 50, 960, 520, 620); g.addColorStop(0, 'rgba(255,45,149,.55)'); g.addColorStop(1, 'rgba(255,45,149,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      person({ ...TOMMY_VC, x: 960, y: 1560, s: 1.75, mouth: 'smirk', brow: 'angry', armL: .1, armR: .1, seed: 1 }, t);
      pill(t, at('hook1', 'Tommy') + .6, 520, 330, 'TOMMY VERCETTI', "GTA Vice City · (that's you)", { rot: -.04 });
      const k = eout(prog(t, tl, .45)); if (k <= 0) return;
      ctx.save(); ctx.globalAlpha = k; rays(t, '#1a0640', PAL.pink, PAL.purple); ctx.restore();
      ctx.save(); ctx.translate(0, lerp(1100, 0, k));
      for (const x of [230, 1690]) { ctx.save(); ctx.shadowColor = PAL.pink; ctx.shadowBlur = 40; ctx.beginPath(); ctx.moveTo(x - 40, 900); ctx.quadraticCurveTo(x - 60, 820 - Math.sin(t * 12) * 10, x, 760 + Math.sin(t * 9) * 12); ctx.quadraticCurveTo(x + 60, 820, x + 40, 900); ctx.closePath(); ctx.fillStyle = PAL.orange; ctx.fill(); ctx.restore(); rr(x - 60, 900, 120, 30, 6); fs('#3a2a5a'); }
      rr(470, 90, 980, 800, 30); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fill();
      rr(460, 70, 980, 800, 30); fs('#efe2ff', 6);
      text("TOMMY'S", 950, 120, '700 30px Fredoka', '#8a5aa8', 'center', 'middle', '8px');
      text('TO-DO LIST', 950, 180, '700 78px Almendra', INK);
      line(560, 235, 1340, 235, 4, 'rgba(36,18,46,.4)');
      hookList().forEach((it, i) => {
        if (t < it.t0) return; const y = 360 + i * 200, s = popS(t, it.t0);
        ctx.save(); ctx.translate(560, y); ctx.scale(s, s);
        ell(50, 0, 50, 50); fs(it.col); text(it.icon, 50, 3, '700 44px Fredoka', '#fff');
        text(it.label, 130, -12, '700 72px Fredoka', INK, 'left'); text(it.sub, 134, 48, '600 32px Caveat', '#8a5aa8', 'left');
        ctx.restore();
        const p = eout(prog(t, it.t1, .35));
        if (p > 0) { ctx.font = '700 72px Fredoka'; const w = ctx.measureText(it.label).width; line(680, y - 14, 680 + (w + 20) * p, y - 18, 10, '#e0263c'); burst(t, it.t1 + .3, 700 + w, y - 18, 40, PAL.gold); }
      });
      ctx.restore();
    } },
  // 2. Twist: who comes for you
  { id: 'hook2',
    pops: () => [[.2], [.4], [at('hook2', 'oldest boss'), 'stamp'], [at('hook2', 'best friend'), 'stamp'], [at('hook2', 'best friend') + .7, 'swish']],
    draw(t) {
      rays(t, '#14041e', '#e0263c', PAL.purple);
      ctx.save(); ctx.globalAlpha = clamp(t / .4);
      ctx.font = '700 84px Almendra'; const gw = ctx.measureText('Who comes for you?').width;
      const tg = ctx.createLinearGradient(960 - gw / 2, 0, 960 + gw / 2, 0); tg.addColorStop(0, PAL.gold); tg.addColorStop(.5, PAL.pink); tg.addColorStop(1, PAL.purple);
      ctx.shadowColor = 'rgba(255,45,149,.7)'; ctx.shadowBlur = 30; text('Who comes for you?', 960, 140, '700 84px Almendra', tg); ctx.restore();
      [[620, .2, SONNY, 'oldest boss', 'your oldest boss', -.04], [1300, .4, LANCE, 'best friend', 'your best friend', .04]].forEach(([x, t0, who, ph, lab, rot]) => {
        const s = popS(t, t0); if (s <= 0) return; const shown = t > at('hook2', ph);
        ctx.save(); ctx.translate(x, 560); ctx.rotate(rot); ctx.scale(s, s);
        rr(-230, -290, 460, 560, 10); fs(PAL.gold, 6); rr(-200, -260, 400, 440, 4); fs(shown ? '#ffd1e3' : '#2a1640', 4);
        if (shown) { const r = eout(prog(t, at('hook2', ph), .3)); ctx.save(); rr(-200, -260, 400, 440, 4); ctx.clip(); ctx.globalAlpha = r; person({ ...who, x: 0, y: 420, s: .95, mouth: 'grin', brow: 'angry' }, t); ctx.restore(); rr(-200, -260, 400, 440, 4); fs(null, 4); }
        else text('?', 0, -40, '700 220px Almendra', 'rgba(255,255,255,.25)');
        if (shown) text(lab, 0, 228, '700 50px Caveat', INK);
        if (lab.includes('friend') && t > at('hook2', 'best friend') + .7) { const c = eout(prog(t, at('hook2', 'best friend') + .7, .25)); ctx.beginPath(); ctx.moveTo(-200 * c, -250 * c); ctx.lineTo(-30, -60); ctx.lineTo(20, 10); ctx.lineTo(190 * c, 170 * c); ctx.moveTo(-30, -60); ctx.lineTo(150 * c, -250 * c); ctx.lineWidth = 7; ctx.strokeStyle = '#fff'; ctx.stroke(); }
        ctx.restore();
      });
    } },
  // 3. "But right now..." rewind into the book
  { id: 'book', extra: 1.5, pops: () => [[.1, 'whoosh'], [.45, 'swish'], [.75, 'swish'], [1.05, 'swish'], [1.6], [2.2, 'stamp']], draw: t => bookScene(t) },
  { id: 'birth', trans: 'zoom', zoomAt: [1280, 440],
    pops: () => [[.9], [at('birth', 'Nobody'), 'swish'], [at('birth', 'Nobody') + .5], [at('birth', 'probably'), 'stamp']],
    draw(t) {
      ctx.fillStyle = '#ffd9e8'; ctx.fillRect(-100, -100, W + 200, 1000);
      for (let x = -100; x < W + 100; x += 80) { ctx.fillStyle = '#ffc4dc'; ctx.fillRect(x, -100, 34, 1000); }
      rr(-100, 170, W + 200, 26, 0); fs(PAL.purple, 4);
      ctx.fillStyle = '#a8704a'; ctx.fillRect(-100, 830, W + 200, 400); line(-100, 830, W + 100, 830, 6);
      for (let y = 870; y < 1100; y += 50) line(-100, y, W + 100, y, 3, 'rgba(36,18,46,.25)');
      rr(240, 230, 420, 380, 6); fs('#7a4a2c', 6);
      ctx.save(); rr(270, 260, 360, 320, 2); ctx.clip(); ctx.fillStyle = grad(260, 580, ['#7a6ad8', '#ff9ad5']); ctx.fillRect(270, 260, 360, 320);
      for (const [x, w, h] of [[270, 70, 200], [330, 60, 260], [380, 80, 170], [450, 50, 230], [500, 90, 150], [580, 60, 210]]) { ctx.fillStyle = '#3a2a6a'; ctx.fillRect(x, 580 - h, w, h); for (let wy = 600 - h; wy < 570; wy += 26) for (let wx = x + 8; wx < x + w - 10; wx += 20) { ctx.fillStyle = (wx + wy) % 3 ? '#ffe39a' : '#2a1f4f'; ctx.fillRect(wx, wy, 8, 12); } }
      ctx.restore(); line(450, 260, 450, 580, 8, '#7a4a2c'); line(270, 420, 630, 420, 8, '#7a4a2c');
      ctx.beginPath(); ctx.moveTo(200, 210); ctx.quadraticCurveTo(280, 400, 230, 640); ctx.lineTo(180, 640); ctx.lineTo(180, 210); fs(PAL.teal);
      ctx.beginPath(); ctx.moveTo(700, 210); ctx.quadraticCurveTo(620, 400, 670, 640); ctx.lineTo(720, 640); ctx.lineTo(720, 210); fs(PAL.teal);
      rr(770, 520, 380, 300, 10); fs('#d9a873');
      baby(960, 560, 1, { angry: clamp((t - at('birth', 'probably')) / .25) }, t);
      rr(800, 640, 320, 130, 30); fs('#8af7dc'); for (let i = 0; i < 6; i++) { ell(840 + i * 50, 690 + (i % 2) * 30, 7, 7); fs('#fff', 0); }
      for (let x = 790; x <= 1130; x += 42) { rr(x, 610, 18, 230, 8); fs('#f0c08a', 4); }
      rr(760, 590, 400, 34, 14); fs('#c98a52'); rr(760, 820, 400, 30, 10); fs('#c98a52'); line(780, 850, 780, 900, 14, INK); line(1140, 850, 1140, 900, 14, INK);
      pill(t, .9, 960, 340, 'TOMMY', 'age 0');
      const cb = eout(prog(t, at('birth', 'Nobody'), .5));
      if (cb > 0) {
        ctx.save(); ctx.translate(lerp(800, 0, cb), 0); ctx.rotate(.02); cork(1260, 230, 520, 420);
        rr(1350, 268, 340, 44, 4); fs('#f6efdc', 3); text('THINGS TO REMEMBER', 1520, 292, '600 26px Fredoka', INK, 'center', 'middle', '2px');
        const ns = popS(t, at('birth', 'Nobody') + .5);
        if (ns > 0) { ctx.save(); ctx.translate(1520, 460); ctx.rotate(-.06); ctx.scale(ns, ns); rr(-150, -110, 300, 230, 4); fs('#fff1a0', 4); text('CHILDHOOD', 0, -30, '700 58px Caveat', INK); text('= ???', 0, 40, '700 64px Caveat', PAL.pink); ell(0, -100, 14, 14); fs('#e0263c', 4); ctx.restore(); }
        stampText(t, at('birth', 'probably'), 1530, 470, 'CLASSIFIED');
        ctx.restore();
      }
      eraTag(t, 'LIBERTY CITY · 1951');
    } },
  { id: 'forelli',
    pops: () => [[at('forelli', 'Your boss')], [at('forelli', 'He smiles'), 'ding'], [at('forelli', 'worry')]],
    draw(t) {
      forelliBG(t);
      const worry = t > at('forelli', 'That should');
      const tom = { ...TOMMY, stubble: false, x: 600, y: 1000, s: .95, shirt: '#f2efe6', jacket: '#4a3226', longSleeve: true, sleeve: '#4a3226', pants: '#2f3442',
        mouth: worry ? 'frown' : 'flat', brow: worry ? 'worried' : 'normal', look: worry ? 8 : 0, sweat: worry ? eout(prog(t, at('forelli', 'That should'), .4)) : 0, seed: .2 };
      const son = { ...SONNY, x: 1340, y: 1000, s: 1.02, grinW: t > at('forelli', 'He smiles') ? lerp(1, 1.3, eout(prog(t, at('forelli', 'He smiles'), .3))) : 1, look: -6, seed: 2 };
      person(tom, t); person(son, t);
      const st = headTop(son), tt = headTop(tom);
      pill(t, at('forelli', 'Your boss'), st.x, st.y - 60, 'SONNY FORELLI', 'your boss');
      const m = mouthAt(son); sparkle(t, at('forelli', 'He smiles') + .1, m.x + 10, m.y - 6, 42);
      bubble(t, at('forelli', 'worry') + .1, tt.x + 120, tt.y + 10, '...');
      eraTag(t, 'LIBERTY CITY · 1960s');
    } },
  { id: 'ch1', len: 1.85, pops: () => [[.1, 'stamp']], draw: t => chapterCard(t, 'I', 'The Harwood Butcher') },
  { id: 'harwood',
    pops: () => [[at('harwood', 'Harwood')], [at('harwood', 'setup'), 'stamp'], ...Array.from({ length: 11 }, (_, i) => [at('harwood', 'Eleven') + i * .07]), [at('harwood', 'You walk out'), 'whoosh'], [at('harwood', "They don't")]],
    draw(t) {
      libertyNight(t);
      const ts = at('harwood', 'Eleven'), tw = at('harwood', 'You walk out');
      const spots = [[200, 920, .7], [360, 960, .78], [520, 900, .66], [1400, 900, .66], [1560, 960, .78], [1720, 920, .7], [300, 1060, .9], [1620, 1060, .9], [700, 880, .58], [1220, 880, .58], [960, 860, .5]];
      spots.forEach(([x, y, s], i) => { const p = t < tw ? popS(t, ts + i * .07) : 1 - prog(t, tw + i * .03, .2); if (p > 0) person({ ...MASKED, x, y, s, pop: p, seed: i }, t); });
      person({ ...TOMMY, stubble: false, x: 960, y: 1000, s: .95, shirt: '#f2efe6', jacket: '#4a3226', longSleeve: true, sleeve: '#4a3226', pants: '#2f3442', mouth: t > tw ? 'smirk' : 'flat', brow: t > ts && t < tw ? 'angry' : 'normal', seed: .2 }, t);
      pill(t, at('harwood', 'Harwood'), 960, 140, 'HARWOOD', 'one man. easy job.');
      stampText(t, at('harwood', 'setup'), 960, 320, 'SETUP');
      if (t < tw + .2) counter(t, ts, 1640, 260, 'WAITING FOR YOU', '11');
      else counter(t, tw + .2, 1640, 260, 'STILL STANDING', '1', { col: PAL.teal });
      eraTag(t, 'LIBERTY CITY · 1971');
    } },
  { id: 'news',
    pops: () => [[.2, 'whoosh'], [at('news', 'The judge'), 'stamp']],
    draw(t) {
      rays(t, '#2a0b52', PAL.pink, PAL.purple);
      const k = eout(prog(t, .1, .7)); ctx.save(); ctx.translate(960, 540); ctx.rotate((1 - k) * 6 - .04); ctx.scale(lerp(.1, 1, k), lerp(.1, 1, k));
      rr(-560, -380, 1120, 760, 4); fs('#f6f1e6');
      text('LIBERTY DAILY', 0, -310, '700 76px Almendra', INK); line(-520, -260, 520, -260, 4); text('1971 · LATE EDITION', 0, -236, '600 24px Fredoka', '#6a5a7a', 'center', 'middle', '4px'); line(-520, -212, 520, -212, 2);
      text('THE HARWOOD', 0, -130, '700 96px Fredoka', INK); text('BUTCHER', 0, -30, '700 110px Fredoka', '#e0263c');
      rr(-500, 50, 360, 280, 2); fs('#d9d2c4', 3);
      ctx.save(); rr(-500, 50, 360, 280, 2); ctx.clip(); ctx.filter = 'grayscale(1)'; person({ ...TOMMY, stubble: false, x: -320, y: 520, s: .6, shirt: '#f2efe6', jacket: '#4a3226', longSleeve: true, sleeve: '#4a3226', mouth: 'flat' }, t); ctx.filter = 'none'; ctx.restore();
      for (let i = 0; i < 8; i++) line(-100, 70 + i * 34, 500, 70 + i * 34, 6, 'rgba(36,18,46,.25)');
      ctx.restore();
      stampText(t, at('news', 'The judge'), 1260, 760, '15 YEARS', 1.3);
    } },
  { id: 'prison',
    pops: () => [[at('prison', 'never give up')], [at('prison', 'Sonny never')]],
    draw(t, d) {
      ctx.fillStyle = '#4a4878'; ctx.fillRect(-100, -100, W + 200, 1000);
      for (let r = 0; r < 18; r++) { const y = r * 50; line(-100, y, W + 100, y, 2, 'rgba(0,0,0,.2)'); for (let x = (r % 2) * 60 - 100; x < W + 100; x += 120) line(x, y, x, y + 50, 2, 'rgba(0,0,0,.2)'); }
      rr(1300, 160, 260, 200, 6); fs('#2a1f4f'); ctx.fillStyle = grad(160, 360, ['#1d0f4a', '#7a3cff']); ctx.fillRect(1306, 166, 248, 188); for (let x = 1340; x < 1560; x += 44) line(x, 166, x, 354, 8, '#2a2a42');
      const lg = ctx.createLinearGradient(1300, 360, 1100, 900); lg.addColorStop(0, 'rgba(138,247,220,.35)'); lg.addColorStop(1, 'rgba(138,247,220,0)'); ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(1300, 360); ctx.lineTo(1560, 360); ctx.lineTo(1400, 900); ctx.lineTo(1000, 900); ctx.fill();
      rr(1180, 640, 600, 70, 8); fs('#6a6488'); rr(1180, 600, 600, 50, 12); fs('#e8e0f0');
      const marks = Math.floor(lerp(4, 60, clamp(t / d)));
      for (let i = 0; i < marks; i++) { const g = Math.floor(i / 5), j = i % 5, x = 160 + (g % 6) * 120 + (j < 4 ? j * 18 : 0), y = 200 + Math.floor(g / 6) * 110; if (j < 4) line(x, y, x, y + 70, 5, '#f0e8ff'); else line(x - 66, y + 56, x + 6, y + 14, 5, '#f0e8ff'); }
      ctx.fillStyle = '#3a3660'; ctx.fillRect(-100, 900, W + 200, 300); line(-100, 900, W + 100, 900, 5);
      person({ ...TOMMY, stubble: true, x: 960, y: 1000, s: .95, shirt: '#ff8a3d', pants: '#ff8a3d', longSleeve: true, mouth: 'flat', brow: t > at('prison', 'Sonny never') ? 'angry' : 'normal', seed: .3 }, t);
      for (let x = 40; x < W; x += 150) { rr(x, -100, 26, 1300, 12); fs('#5a5a78', 4); }
      rr(-100, 80, W + 200, 30, 0); fs('#5a5a78', 4);
      bubble(t, at('prison', 'mouth shut'), 1180, 260, '...', {});
      counter(t, at('prison', 'never give up'), 520, 760, 'NAMES GIVEN', '0', { col: PAL.teal });
      counter(t, at('prison', 'Sonny never'), 1500, 820, 'VISITS FROM SONNY', '0');
    } },
  { id: 'ch2', len: 1.85, pops: () => [[.1, 'stamp']], draw: t => chapterCard(t, 'II', 'Welcome to Vice City') },
  { id: 'arrive',
    pops: () => [[at('arrive', 'Vice City')], [at('arrive', 'watch over')], [at('arrive', 'low profile')]],
    draw(t) {
      viceBG(t, 'sunset', { car: [1500, PAL.pink, .9, true] });
      const px = lerp(-300, 2300, clamp(t / 6)); ctx.save(); ctx.translate(px, 220 - t * 8); ctx.rotate(-.05);
      rr(-140, -20, 280, 44, 22); fs('#fff'); ctx.beginPath(); ctx.moveTo(-30, 0); ctx.lineTo(-90, -90); ctx.lineTo(-50, -90); ctx.lineTo(40, 0); fs('#fff'); ctx.beginPath(); ctx.moveTo(-120, -10); ctx.lineTo(-150, -60); ctx.lineTo(-120, -60); ctx.lineTo(-100, -10); fs(PAL.pink);
      for (let i = 0; i < 6; i++) { ell(-60 + i * 30, 0, 6, 6); fs(PAL.teal, 0); } ctx.restore();
      const wp = clamp(t / 3.5);
      const o = { ...TOMMY_VC, x: lerp(-150, 760, eout(wp)), y: 900, s: .95, walking: t < 3.5, phase: t * 7.5, suitcase: true, armR: .05, seed: 1 };
      person(o, t);
      pill(t, at('arrive', 'Vice City'), 960, 150, 'WELCOME TO', 'VICE CITY');
      pill(t, at('arrive', 'watch over'), 1360, 360, 'THE JOB', 'watch over a little deal', { rot: .03 });
      pill(t, at('arrive', 'low profile'), 1320, 520, 'KEEP A LOW PROFILE', '(in that shirt?)', { rot: -.03 });
      eraTag(t, 'VICE CITY · 1986');
    } },
  { id: 'ken',
    pops: () => [[at('ken', 'Ken Rosenberg')], [at('ken', 'talks fast')], [at('ken', 'sweats')], [at('ken', 'Great sign'), 'ding']],
    draw(t) {
      viceBG(t, 'day', { car: [1600, PAL.purple, .85, true] });
      const sw = t > at('ken', 'sweats');
      const k = { ...KEN, x: 1150, y: 900, s: .95, sweat: sw ? .6 + .4 * Math.abs(Math.sin(t * 4)) : 0, look: -8 + Math.sin(t * 12) * 4, seed: 3 };
      person({ ...TOMMY_VC, x: 640, y: 900, s: .97, mouth: 'flat', seed: 1 }, t); person(k, t);
      const kt = headTop(k); pill(t, at('ken', 'Ken Rosenberg'), kt.x, kt.y - 60, 'KEN ROSENBERG', 'your lawyer');
      counter(t, at('ken', 'talks fast'), 1620, 200, 'WORDS PER SECOND', '11');
      counter(t, at('ken', 'sweats'), 1620, 430, 'NERVES', '100%', { rot: .03 });
      pill(t, at('ken', 'Great sign'), 640, 140, 'GREAT SIGN', null, { rot: -.05, bg: PAL.mint });
      eraTag(t, 'VICE CITY · 1986');
    } },
  { id: 'deal',
    pops: () => [[.4], [at('deal', 'Masked')], [at('deal', 'Gunfire'), 'stamp'], [at('deal', 'Gunfire') + .25, 'stamp'], [at('deal', 'money? Gone')], [at('deal', 'Gone.') + .05, 'swish'], [at('deal', 'product? Gone')], [at('deal', 'product? Gone') + .6, 'swish'], [at('deal', 'barely'), 'whoosh']],
    draw(t) {
      ctx.fillStyle = grad(-100, 620, ['#07051f', '#24104f', '#7a1f7a']); ctx.fillRect(-100, -100, W + 200, 740);
      ctx.fillStyle = 'rgba(60,20,110,.9)'; for (const [x, w, h] of [[100, 120, 260], [260, 90, 340], [380, 150, 220], [1300, 130, 300], [1460, 100, 380], [1600, 150, 250]]) { ctx.fillRect(x, 620 - h, w, h); for (let y = 640 - h; y < 600; y += 30) for (let xx = x + 10; xx < x + w - 10; xx += 24) { ctx.fillStyle = (xx + y) % 4 ? 'rgba(255,154,213,.7)' : 'rgba(25,224,208,.6)'; ctx.fillRect(xx, y, 10, 12); } ctx.fillStyle = 'rgba(60,20,110,.9)'; }
      ctx.fillStyle = grad(620, 1080, ['#1a1a5a', '#0a0a2a']); ctx.fillRect(-100, 620, W + 200, 460);
      for (let i = 0; i < 10; i++) line(200 + i * 160 + Math.sin(t + i) * 30, 660 + i % 3 * 40, 280 + i * 160 + Math.sin(t + i) * 30, 660 + i % 3 * 40, 4, 'rgba(255,95,176,.4)');
      ctx.fillStyle = '#8a5a3a'; ctx.fillRect(-100, 820, W + 200, 260); for (let x = -100; x < W + 100; x += 90) line(x, 820, x, 1080, 3, 'rgba(36,18,46,.4)'); line(-100, 820, W + 100, 820, 5);
      for (const [x, y] of [[1350, 800], [1470, 800], [1410, 700]]) { rr(x, y, 120, 100, 4); fs('#b07a4a'); line(x, y, x + 120, y + 100, 3); line(x + 120, y, x, y + 100, 3); }
      const tg = at('deal', 'barely'), run = t > tg;
      const masked = t > at('deal', 'Masked');
      if (masked) for (const [x, i] of [[1300, 0], [1500, 1], [1700, 2]]) person({ ...MASKED, x, y: 980, s: .85, pop: popS(t, at('deal', 'Masked') + i * .1), seed: i }, t);
      const rx = run ? -eio(prog(t, tg, 1.6)) * 900 : 0;
      person({ ...TOMMY_VC, x: 560 + rx, y: 1000, s: .95, mouth: masked ? 'frown' : 'flat', brow: masked ? 'angry' : 'normal', walking: run, phase: t * 12, seed: 1 }, t);
      person({ ...KEN, x: 860 + rx * 1.1, y: 1000, s: .9, sweat: masked ? 1 : 0, walking: run, phase: t * 13, seed: 3 }, t);
      if (!run) { rr(650, 930, 120, 80, 8); fs('#2a2a3a'); line(690, 930, 730, 930, 8); }
      for (let i = 0; i < 6; i++) burst(t, at('deal', 'Gunfire') + i * .18, 1250 + (i % 3) * 200, 520 + (i % 2) * 40);
      flash(t, at('deal', 'Gunfire'));
      counter(t, at('deal', 'money? Gone'), 640, 170, 'THE MONEY', '$$$', { col: '#14a36a' }); strike(t, at('deal', 'Gone.'), 540, 220, 740, PAL.pink);
      counter(t, at('deal', 'product? Gone'), 1000, 170, 'THE PRODUCT', 'ALL OF IT', { col: INK }); strike(t, at('deal', 'product? Gone') + .6, 860, 220, 1140, PAL.pink);
      pill(t, .4, 1500, 330, 'THE DEAL', 'what could go wrong?');
      eraTag(t, 'VICE CITY DOCKS · 1986');
    } },
  { id: 'phone',
    pops: () => [[.2, 'ding'], [.6, 'ding'], [at('phone', "It's Sonny")], [at('phone', 'He wants')]],
    draw(t) {
      splitPhone(t, () => { viceBG(t, 'night', { palms: true }); person({ ...TOMMY_VC, x: 520, y: 900, s: .95, phone: t > 1.2, mouth: 'frown', seed: 1, tilt: Math.sin(t * 30) * (t < 1.2 ? .02 : 0) }, t); },
        () => { liberyRoom(t); person({ ...SONNY, x: 1420, y: 1000, s: 1.0, phone: true, mouth: 'grin', brow: 'angry', seed: 2 }, t); });
      if (t < 1.2) { text('RING', 760, 300 + Math.sin(t * 40) * 6, '700 60px Fredoka', PAL.gold); text('RING', 1180, 260 + Math.cos(t * 40) * 6, '700 60px Fredoka', PAL.gold); }
      pill(t, at('phone', "It's Sonny"), 1420, 200, 'SONNY', 'calling from Liberty City');
      bubble(t, at('phone', 'He wants'), 1120, 290, 'MY MONEY. ALL OF IT.', { left: true });
    } },
  { id: 'ch3', len: 1.85, pops: () => [[.1, 'stamp']], draw: t => chapterCard(t, 'III', 'Who Did This?') },
  { id: 'allies',
    pops: () => [[.6, 'swish'], [1.8, 'stamp'], [at('allies', 'colonel')], [at('allies', 'real estate')], [at('allies', 'Lance Vance')], [at('allies', 'team up'), 'ding']],
    draw(t) {
      beachBG(t); yacht(1450, 640, .9 * pp(t, at('allies', 'colonel')) || 0.0001);
      ctx.fillStyle = '#ff9ccf'; rr(120, 560, 160, 120, 6); fs('#ff9ccf'); for (const x of [130, 260]) line(x, 680, x - 20, 800, 8, INK); ctx.beginPath(); ctx.moveTo(100, 560); ctx.lineTo(200, 500); ctx.lineTo(300, 560); ctx.closePath(); fs(PAL.teal);
      palm(1800, 860, .9, true);
      const C = { ...CORTEZ, x: 340, y: 960, s: .85, pop: popS(t, at('allies', 'colonel')), seed: 4 };
      const A = { ...AVERY, x: 720, y: 960, s: .85, pop: popS(t, at('allies', 'real estate')), seed: 5 };
      const L = { ...LANCE, x: 1110, y: 960, s: .9, pop: popS(t, at('allies', 'Lance Vance')), seed: 6 };
      const T = { ...TOMMY_VC, x: 1480, y: 960, s: .92, pop: popS(t, at('allies', 'team up') - .2), seed: 1 };
      person(C, t); person(A, t); person(L, t); person(T, t);
      pill(t, at('allies', 'colonel') + .15, 340, headTop(C).y - 70, 'THE COLONEL', 'owns a yacht');
      pill(t, at('allies', 'real estate') + .15, 720, headTop(A).y - 110, 'AVERY', 'real estate, big hat');
      pill(t, at('allies', 'Lance Vance') + .15, 1110, headTop(L).y - 70, 'LANCE VANCE', 'wants revenge');
      pill(t, at('allies', 'team up'), 1300, 300, 'PARTNERS', null, { bg: PAL.mint, rot: -.04 });
      subscribeBanner(t, .6, 4.4);
      eraTag(t, 'VICE CITY BEACH · 1986');
    } },
  { id: 'diaz',
    pops: () => [[.3], [.6], [.9], [at('diaz', 'Ricardo'), 'stamp'], [at('diaz', 'robbed you'), 'stamp']],
    draw(t) {
      ctx.fillStyle = grad(-100, 1180, ['#2a0b52', '#4a1878']); ctx.fillRect(-100, -100, W + 200, H + 200);
      cork(160, 90, 1600, 900);
      const C = { ...CORTEZ, mouth: 'flat' }, A = { ...AVERY }, L = { ...LANCE }, D = { ...DIAZ };
      const pts = [[420, 330], [420, 720], [1500, 330], [960, 540]];
      const tr = at('diaz', 'one man');
      for (let i = 0; i < 3; i++) { const p = eout(prog(t, tr + i * .2, .4)); if (p > 0) line(pts[i][0], pts[i][1] - 120, lerp(pts[i][0], 960, p), lerp(pts[i][1] - 120, 420, p), 5, '#e0263c'); }
      polaroid(t, .3, 420, 330, -.08, C, 'the colonel', { s: 1 });
      polaroid(t, .6, 420, 720, .06, A, 'avery', { s: 1 });
      polaroid(t, .9, 1500, 330, .07, L, 'lance', { s: 1 });
      polaroid(t, at('diaz', 'Ricardo'), 960, 560, -.03, D, 'RICARDO DIAZ', { s: 1.45, bg: '#ffc94a' });
      scribbleCircle(t, at('diaz', 'Ricardo') + .3, 960, 560, 200, 240, PAL.pink);
      pill(t, at('diaz', 'drug lord'), 1480, 760, 'RICARDO DIAZ', 'your employer');
      stampText(t, at('diaz', 'robbed you'), 960, 880, 'HE DID IT', 1.1);
    } },
  { id: 'mansion',
    pops: () => [[.3, 'whoosh'], [at('mansion', 'smoke clears'), 'swish'], [at('mansion', 'Nice house')], [at('mansion', "It's yours"), 'stamp']],
    draw(t) {
      mansionBG(t, 'night');
      const sc = at('mansion', 'smoke clears');
      person({ ...TOMMY_VC, x: 960, y: 770, s: .6, pop: t > sc ? 1 : 0, mouth: 'smirk', seed: 1 }, t);
      person({ ...LANCE, x: 1240, y: 1000, s: .85, pop: t > sc ? 1 : 0, seed: 6 }, t);
      for (let i = 0; i < 5; i++) burst(t, .4 + i * .25, 500 + i * 230, 520 + (i % 2) * 120, 80);
      smoke(t, .5, 960, 600, 10);
      if (t > at('mansion', 'Nice house')) {
        ctx.save(); const k = eout(prog(t, at('mansion', 'Nice house'), .4)); ctx.translate(lerp(600, 0, k), 0); ctx.rotate(.03);
        parchment(1460, 120, 400, 330); text('TO-DO', 1660, 170, '700 40px Almendra', '#b0124f');
        ['money back', 'who set me up', 'whole city'].forEach((it, i) => { rr(1490, 220 + i * 70, 34, 34, 4); fs('#fff', 3); text(it, 1540, 238 + i * 70, '700 38px Caveat', INK, 'left'); });
        if (t > at('mansion', 'Nice house') + .4) { line(1494, 306, 1508, 322, 6, '#14a36a'); line(1508, 322, 1530, 290, 6, '#14a36a'); }
        ctx.restore();
      }
      pill(t, at('mansion', 'Nice house'), 960, 140, 'NEW HOUSE', 'previous owner: Diaz');
      stampText(t, at('mansion', "It's yours"), 520, 260, 'YOURS NOW');
      eraTag(t, 'DIAZ MANSION · 1986');
    } },
  { id: 'ch4', len: 1.85, pops: () => [[.1, 'stamp']], draw: t => chapterCard(t, 'IV', 'The Empire') },
  { id: 'empire',
    pops: () => [[at('empire', 'nightclub')], [at('empire', 'taxi')], [at('empire', 'car showroom')], [at('empire', 'print shop')], [at('empire', 'ice cream')], [at('empire', 'Every single'), 'ding']],
    draw(t) {
      rays(t, '#3a0f5e', PAL.pink, PAL.orange);
      const cards = [['nightclub', 'NIGHTCLUB', PAL.pink, iconClub], ['taxi', 'TAXI CO.', PAL.gold, iconTaxi], ['car showroom', 'CAR SHOWROOM', PAL.teal, iconCar],
      ['print shop', 'PRINT SHOP', PAL.mint, iconPrint], ['ice cream', 'ICE CREAM', PAL.hot, iconIce]];
      cards.forEach(([ph, lab, col, ic], i) => {
        const s = popS(t, at('empire', ph)); if (s <= 0) return;
        const x = 280 + (i % 3) * 460 + (i > 2 ? 230 : 0), y = i < 3 ? 330 : 690;
        ctx.save(); ctx.translate(x, y); ctx.rotate((i % 2 ? .03 : -.03)); ctx.scale(s, s);
        rr(-190, -150, 380, 300, 24); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fill(); rr(-200, -160, 380, 300, 24); fs('#fffaf5');
        rr(-200, -160, 380, 60, [24, 24, 0, 0]); fs(col); text(lab, -10, -128, '700 34px Fredoka', '#fff', 'center', 'middle', '2px');
        ctx.save(); ctx.translate(-10, 20); ic(t); ctx.restore();
        if (lab === 'PRINT SHOP') text('(normal paper)', -10, 112, '600 30px Caveat', '#8a7766');
        ctx.restore();
      });
      const k = clamp((t - at('empire', 'Every single')) / 2.5);
      if (t > at('empire', 'Every single')) counter(t, at('empire', 'Every single'), 1330, 900, 'INCOME PER DAY', '$' + Math.floor(lerp(0, 48000, eout(k))).toLocaleString('en-US'), { col: '#14a36a' });
      person({ ...TOMMY_VC, x: 1720, y: 1100, s: .75, mouth: 'smirk', seed: 1 }, t);
      eraTag(t, 'VICE CITY · 1986');
    } },
  { id: 'sonnycall',
    pops: () => [[.3, 'ding'], [at('sonnycall', 'his cut')], [at('sonnycall', 'You tell')], [at('sonnycall', 'Not that'), 'stamp']],
    draw(t) {
      splitPhone(t, () => { mansionBG(t, 'sunset'); person({ ...TOMMY_VC, x: 520, y: 1000, s: .95, phone: true, mouth: 'smirk', seed: 1 }, t); },
        () => { liberyRoom(t); person({ ...SONNY, x: 1420, y: 1000, s: 1.0, phone: true, mouth: 'grin', seed: 2 }, t); });
      bubble(t, at('sonnycall', 'his cut'), 1150, 290, 'I WANT MY CUT.', { left: true });
      if (t < at('sonnycall', 'Not that')) bubble(t, at('sonnycall', 'You tell'), 700, 250, 'No, thank you.');
      else bubble(t, at('sonnycall', 'Not that'), 700, 250, '#@$%&!');
    } },
  { id: 'ch5', len: 1.85, pops: () => [[.1, 'stamp']], draw: t => chapterCard(t, 'V', 'Keep Your Friends Close') },
  { id: 'betrayal',
    pops: () => [[at('betrayal', 'Sonny comes')], [at('betrayal', 'surprise'), 'ding'], [at('betrayal', 'Lance.')], [at('betrayal', 'talking to Sonny'), 'stamp']],
    draw(t) {
      mansionBG(t, 'sunset');
      person({ ...TOMMY_VC, x: 960, y: 770, s: .6, mouth: t > at('betrayal', 'talking') ? 'frown' : 'flat', brow: t > at('betrayal', 'talking') ? 'angry' : 'normal', seed: 1 }, t);
      person({ ...SONNY, x: 760, y: 1010, s: .9, pop: popS(t, at('betrayal', 'Sonny comes')), seed: 2 }, t);
      const L = { ...LANCE, x: 1180, y: 1010, s: .88, pop: popS(t, at('betrayal', 'Lance.')), mouth: 'grin', seed: 6 }; person(L, t);
      pill(t, at('betrayal', 'Sonny comes'), 760, 300, 'SONNY', 'came to collect');
      if (t > at('betrayal', 'friend')) {
        const s = popS(t, at('betrayal', 'friend')); ctx.save(); ctx.translate(1600, 300); ctx.rotate(.05); ctx.scale(s, s);
        rr(-170, -140, 340, 280, 8); fs(PAL.gold, 6); rr(-146, -116, 292, 232, 4); fs('#f2e6d0', 4);
        ctx.save(); rr(-146, -116, 292, 232, 4); ctx.clip(); ctx.filter = 'sepia(1)'; person({ ...TOMMY_VC, x: -70, y: 320, s: .5, mouth: 'grin' }, t); person({ ...LANCE, x: 70, y: 320, s: .5, mouth: 'grin' }, t); ctx.filter = 'none'; ctx.restore();
        text('YOU & LANCE', 0, 160, '700 40px Caveat', '#fff');
        if (t > at('betrayal', 'talking to Sonny')) { const c = eout(prog(t, at('betrayal', 'talking to Sonny'), .3)); ctx.beginPath(); ctx.moveTo(-140 * c, -110 * c); ctx.lineTo(-20, -10); ctx.lineTo(30, 30); ctx.lineTo(140 * c, 110 * c); ctx.moveTo(-20, -10); ctx.lineTo(80 * c, -110 * c); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke(); }
        ctx.restore();
      }
      pill(t, at('betrayal', 'talking to Sonny') + .2, 1180, headTop(L).y - 70, 'TRAITOR', null, { bg: '#ffd1e3', fg: '#e0263c', rot: .05 });
      eraTag(t, 'VERCETTI ESTATE · 1986');
    } },
  { id: 'finale',
    pops: () => [[at('finale', 'settle it'), 'stamp'], [at('finale', 'settle it') + .3, 'stamp'], [at('finale', 'Both of them')], [at('finale', 'Both of them') + .4], [at('finale', 'hiding')]],
    draw(t) {
      mansionBG(t, 'night');
      const ts = at('finale', 'settle it'), tb = at('finale', "When it's over");
      person({ ...TOMMY_VC, x: 960, y: 770, s: .6, mouth: t > tb ? 'smirk' : 'flat', brow: t < tb ? 'angry' : 'normal', seed: 1 }, t);
      const gone = 1 - prog(t, tb - .4, .3);
      if (gone > 0) { person({ ...SONNY, x: 760, y: 1010, s: .9, pop: gone, mouth: 'frown', seed: 2 }, t); person({ ...LANCE, x: 1180, y: 1010, s: .88, pop: gone, mouth: 'frown', seed: 6 }, t); }
      for (let i = 0; i < 6; i++) burst(t, ts + i * .16, 700 + (i % 3) * 260, 620 + (i % 2) * 120, 90);
      flash(t, ts); flash(t, ts + .3);
      smoke(t, ts + .4, 960, 820, 8);
      counter(t, at('finale', 'Both of them'), 520, 170, 'SONNY', 'FORELLI', { col: INK }); strike(t, at('finale', 'Both of them') + .3, 400, 220, 640, PAL.pink);
      counter(t, at('finale', 'Both of them') + .4, 1400, 170, 'LANCE', 'VANCE', { col: INK }); strike(t, at('finale', 'Both of them') + .7, 1300, 220, 1500, PAL.pink);
      const kp = eout(prog(t, at('finale', 'hiding') - .2, .5));
      if (kp > 0) { ctx.save(); ctx.beginPath(); ctx.rect(1194, 0, 400, 2000); ctx.clip(); person({ ...KEN, x: lerp(1150, 1205, kp), y: 770, s: .6, sweat: 1, look: -10, seed: 3 }, t); ctx.restore(); rr(1150, 260, 44, 500, 8); fs('#fff'); pill(t, at('finale', 'still sweating'), 1360, 300, 'KEN', 'still sweating'); }
    } },
  { id: 'ending',
    pops: () => [[.4, 'swish'], [.7], [1.0], [1.3], [at('ending', 'whole city'), 'stamp'], [at('ending', 'Not bad')]],
    draw(t) {
      viceBG(t, 'sunset', { car: [1650, PAL.pink, .9, true] });
      person({ ...TOMMY_VC, x: 560, y: 900, s: 1.0, mouth: 'smirk', armL: .2, armR: .2, seed: 1 }, t);
      const k = eout(prog(t, .3, .5)); ctx.save(); ctx.translate(lerp(800, 0, k), 0); ctx.rotate(-.025);
      parchment(1040, 200, 640, 520); text("TOMMY'S TO-DO LIST", 1360, 270, '700 50px Almendra', '#b0124f');
      ['Get my money back', 'Find who set me up', 'Take the whole city'].forEach((it, i) => {
        rr(1100, 360 + i * 110, 46, 46, 6); fs('#fffaf0', 4); text(it, 1170, 385 + i * 110, '700 52px Caveat', INK, 'left');
        const tc = i < 2 ? .7 + i * .3 : at('ending', 'whole city');
        if (t > tc) { const p = eout(prog(t, tc, .25)); ctx.beginPath(); ctx.moveTo(1104, 384 + i * 110); ctx.lineTo(1122, 404 + i * 110); ctx.lineTo(lerp(1122, 1160, p), lerp(404, 350, p) + i * 110); ctx.lineWidth = 8; ctx.strokeStyle = '#14a36a'; ctx.stroke(); }
      });
      ctx.restore();
      counter(t, at('ending', 'whole city'), 560, 120, 'CITIES OWNED', '1', { col: PAL.pink });
      pill(t, at('ending', 'Not bad'), 1360, 860, 'NOT BAD', 'for a guy who wanted his money back', { bg: PAL.mint });
      eraTag(t, 'VICE CITY · 1986');
    } },
  { id: 'outro', extra: 1.8, pops: () => [[.4], [1.4, 'stamp']], draw: t => outroBook(t) },
];

// ---------- extra pieces used above ----------
function rays(t, bg, c1, c2) {
  const g = ctx.createRadialGradient(960, 540, 50, 960, 540, 1100); g.addColorStop(0, '#7a1f7a'); g.addColorStop(1, bg); ctx.fillStyle = g; ctx.fillRect(-100, -100, W + 200, H + 200);
  for (let i = 0; i < 20; i++) { ctx.save(); ctx.translate(960, 540); ctx.rotate(i * Math.PI / 10 + t * .15); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(1500, -120); ctx.lineTo(1500, 120); ctx.closePath(); ctx.fillStyle = (i % 2 ? c1 : c2) + '33'; ctx.fill(); ctx.restore(); }
}
function stampText(t, t0, x, y, label, sc0 = 1) {
  if (t < t0) return; const k = eout(prog(t, t0, .22)), sc = lerp(2.2, 1, k) * sc0;
  ctx.save(); ctx.globalAlpha = k; ctx.translate(x, y); ctx.rotate(-.18); ctx.scale(sc, sc);
  ctx.font = '700 62px Fredoka'; ctx.letterSpacing = '4px'; const w = ctx.measureText(label).width + 60; ctx.letterSpacing = '0px';
  rr(-w / 2, -48, w, 96, 10); ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.fill(); ctx.lineWidth = 9; ctx.strokeStyle = '#e0263c'; ctx.stroke();
  text(label, 0, 4, '700 62px Fredoka', '#e0263c', 'center', 'middle', '4px'); ctx.restore();
}
function forelliBG(t) {
  ctx.fillStyle = grad(0, 300, ['#2a0b52', '#c0408f', '#ff8a3d']); ctx.fillRect(-100, -100, W + 200, 400);
  ctx.fillStyle = '#9a3a4a'; ctx.fillRect(-100, 110, W + 200, 760);
  for (let r = 0; r < 26; r++) { const y = 130 + r * 28; line(-100, y, W + 100, y, 2, 'rgba(36,18,46,.25)'); for (let x = (r % 2) * 40 - 100; x < W + 100; x += 80) line(x, y, x, y + 28, 2, 'rgba(36,18,46,.25)'); }
  line(-100, 110, W + 100, 110, 6);
  for (const x of [140, 1500, 1720]) { rr(x, 160, 130, 170, 6); fs('#3b2d33'); rr(x + 10, 170, 110, 150, 2); ctx.fillStyle = x === 1500 ? '#ffd98a' : '#5a4a8a'; ctx.fill(); }
  rr(640, 250, 640, 100, 10); fs('#1f4a35', 6); neonText("FORELLI'S", 960, 302, '700 64px Almendra', PAL.mint, t, 20);
  const aw = () => { ctx.beginPath(); ctx.moveTo(640, 380); ctx.lineTo(1280, 380); ctx.lineTo(1320, 470); ctx.lineTo(600, 470); ctx.closePath(); };
  aw(); fs('#14a36a'); ctx.save(); aw(); ctx.clip(); for (let x = 560; x < 1340; x += 80) { ctx.fillStyle = '#f2eedf'; ctx.beginPath(); ctx.moveTo(x, 380); ctx.lineTo(x + 40, 380); ctx.lineTo(x + 46, 470); ctx.lineTo(x + 4, 470); ctx.fill(); } ctx.restore(); aw(); fs(null);
  rr(700, 490, 520, 330, 6); fs('#ffd98a'); ctx.fillStyle = 'rgba(90,50,20,.45)'; for (const x of [780, 960, 1140]) { ell(x, 760, 60, 14); ctx.fill(); ctx.fillRect(x - 6, 760, 12, 60); } line(960, 490, 960, 820, 6);
  rr(470, 520, 170, 300, 6); fs('#4a2a20'); ell(610, 680, 8, 8); fs(PAL.gold, 3);
  ctx.fillStyle = grad(860, 1080, ['#8a86a8', '#5f5b80']); ctx.fillRect(-100, 860, W + 200, 400); line(-100, 862, W + 100, 862, 6);
  rr(250, 260, 18, 610, 4); fs('#2d2d33'); rr(215, 220, 88, 60, 10); fs('#2d2d33');
  const lg = ctx.createRadialGradient(259, 260, 10, 259, 260, 200); lg.addColorStop(0, 'rgba(255,200,140,.6)'); lg.addColorStop(1, 'rgba(255,200,140,0)'); ctx.fillStyle = lg; ctx.fillRect(50, 60, 420, 420);
}
function bookBase(t) {
  const g = ctx.createRadialGradient(960, 560, 100, 960, 560, 1100); g.addColorStop(0, '#5a2a4a'); g.addColorStop(1, '#170a1e');
  ctx.fillStyle = g; ctx.fillRect(-100, -100, W + 200, H + 200);
  rr(150, 560, 70, 300, 10); fs('#f3ead6'); ell(185, 860, 110, 22); fs('#8a6a40');
  const fl = Math.sin(t * 13) * 4 + Math.sin(t * 7.3) * 3;
  const cg = ctx.createRadialGradient(185, 500, 10, 185, 500, 260); cg.addColorStop(0, 'rgba(255,170,120,.5)'); cg.addColorStop(1, 'rgba(255,170,120,0)'); ctx.fillStyle = cg; ctx.fillRect(-100, 200, 600, 600);
  ctx.beginPath(); ctx.moveTo(185 + fl * .3, 470 + fl); ctx.quadraticCurveTo(212, 530, 185, 552); ctx.quadraticCurveTo(158, 530, 185 + fl * .3, 470 + fl); ctx.fillStyle = '#ffd36b'; ctx.fill(); line(185, 548, 185, 562, 4);
  rr(300, 160, 1320, 800, 18); fs('#4a1a3a');
  rr(330, 180, 630, 760, 10); fs('#f6e8cf'); rr(960, 180, 630, 760, 10); fs('#f6e8cf');
  const gg = ctx.createLinearGradient(900, 0, 1020, 0); gg.addColorStop(0, 'rgba(0,0,0,0)'); gg.addColorStop(.5, 'rgba(60,20,40,.35)'); gg.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = gg; ctx.fillRect(900, 180, 120, 760);
  rr(944, 900, 34, 120, 0); fs('#e0263c', 3);
}
function seal(t, t0, x, y) {
  const ss = popS(t, t0); if (ss <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(ss, ss); ctx.beginPath();
  for (let i = 0; i < 40; i++) { const a = i / 40 * Math.PI * 2, r = 70 + Math.sin(i * 2.7) * 6; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
  ctx.closePath(); fs('#d81b60', 4); ell(0, 0, 50, 50); fs('#a3124a', 3); text('★', 0, 4, '700 54px Fredoka', '#ffe0ef'); ctx.restore();
}
function hookList() {
  return [
    { icon: '11', label: '11 MEN', sub: '(one night)', col: PAL.pink, t0: at('hook1', 'eleven'), t1: at('hook1', 'do fifteen') - .15 },
    { icon: '15', label: '15 YEARS', sub: '(zero names given)', col: PAL.purple, t0: at('hook1', 'fifteen'), t1: at('hook1', 'then take') - .15 },
    { icon: '★', label: 'VICE CITY', sub: '(all of it)', col: PAL.orange, t0: at('hook1', 'take over'), t1: at('hook1', 'entire city') + .5 }];
}
function bookScene(t) {
  bookBase(t);
  if (t < 1.1) {
    const a = .6 + .4 * Math.sin(t * 14);
    ctx.save(); ctx.globalAlpha = a; text('◀◀', 120, 110, '700 70px Fredoka', '#fff'); ctx.restore();
    for (let i = 0; i < 3; i++) {
      const p = prog(t, .3 + i * .3, .3); if (p <= 0 || p >= 1) continue;
      const w = 630 * Math.cos(p * Math.PI);
      ctx.save(); ctx.beginPath(); ctx.moveTo(960, 180); ctx.lineTo(960 + w, 180 + Math.sin(p * Math.PI) * 30); ctx.lineTo(960 + w, 940 - Math.sin(p * Math.PI) * 30); ctx.lineTo(960, 940); ctx.closePath();
      fs(p < .5 ? '#f6e8cf' : '#eddcbc', 3); ctx.restore();
    }
    return;
  }
  const t2 = t - 1.1;
  ctx.save(); ctx.globalAlpha = clamp(t2 / .5);
  text('Prologue', 645, 320, 'italic 400 48px Almendra', '#8a4a6a');
  text('The Kid from', 645, 425, '700 80px Almendra', '#3a1030'); text('Liberty City', 645, 515, '700 80px Almendra', '#3a1030');
  line(545, 575, 745, 575, 3, '#b07a9a'); ell(645, 575, 8, 8); fs('#b07a9a', 0);
  for (let y = 640; y < 900; y += 46) line(400, y, 890, y, 2, 'rgba(140,80,110,.25)');
  ctx.restore();
  ctx.save(); ctx.globalAlpha = clamp((t2 - .5) / .5);
  rr(1090, 270, 380, 320, 6); fs('#f0dcc0', 6);
  ctx.save(); ctx.translate(1280, 470); ctx.scale(.5, .5);
  line(-200, 80, 200, 80, 7, '#8a5a6a'); for (let x = -180; x <= 180; x += 45) line(x, -40, x, 140, 6, '#8a5a6a');
  line(-200, -40, 200, -40, 7, '#8a5a6a'); ctx.beginPath(); ctx.arc(0, -70, 80, 0, Math.PI * 2); ctx.lineWidth = 7; ctx.strokeStyle = '#8a5a6a'; ctx.stroke(); ctx.restore();
  text('you, age 0', 1280, 645, '600 50px Caveat', '#6a3a5a'); ctx.restore();
  seal(t, 2.2, 1280, 815);
}
function outroBook(t) {
  bookBase(t);
  ctx.save(); ctx.globalAlpha = clamp((t - .3) / .5);
  text('Would you have', 645, 330, '700 64px Almendra', '#3a1030'); text('trusted Lance?', 645, 410, '700 64px Almendra', '#3a1030');
  text('Which character should be born next?', 645, 520, '700 40px Caveat', '#8a4a6a'); text('Tell me in the comments.', 645, 570, '700 40px Caveat', '#8a4a6a');
  for (let y = 650; y < 900; y += 46) line(400, y, 890, y, 2, 'rgba(140,80,110,.25)');
  ctx.restore();
  ctx.save(); ctx.globalAlpha = clamp((t - .8) / .5);
  text('the next life', 1280, 230, '600 34px Caveat', '#8a4a6a'); rr(1090, 270, 380, 320, 6); ctx.setLineDash([14, 10]); fs(null, 4); ctx.setLineDash([]);
  text('?', 1280, 430, '700 160px Almendra', 'rgba(138,74,106,.35)');
  ctx.restore();
  seal(t, 1.4, 1280, 760); text('subscribe', 1280, 860, '600 34px Caveat', '#8a4a6a');
  text('Unofficial fan work. Not affiliated with or endorsed by Rockstar Games or Take-Two Interactive.', 960, 1050, '500 20px Fredoka', 'rgba(255,255,255,.6)');
}
function iconClub(t) { ell(0, -10, 70, 70); fs('#c7c7e0'); for (let i = -60; i <= 60; i += 24) line(-Math.sqrt(4900 - i * i), i - 10, Math.sqrt(4900 - i * i), i - 10, 3, 'rgba(36,18,46,.4)'); line(0, -80, 0, -110, 4); sparkle(t % 1.2, 0, 50, -50, 26); }
function iconTaxi(t) { ctx.save(); ctx.scale(.55, .55); car(0, 80, 1, PAL.gold); rr(-60, -100, 120, 34, 8); fs('#fff', 4); text('TAXI', 0, -82, '700 26px Fredoka', INK); ctx.restore(); }
function iconCar(t) { ctx.save(); ctx.scale(.6, .6); car(0, 70 + Math.sin(t * 3) * 4, 1, PAL.teal); ctx.restore(); }
function iconPrint(t) { rr(-90, -40, 180, 90, 12); fs('#9a9ab8'); rr(-60, -90, 120, 56, 4); fs('#fff', 4); const o = (t * 40) % 60; rr(-50, 30 + o * .5, 100, 50, 4); fs('#c8f5d8', 4); text('$', 0, 56 + o * .5, '700 34px Fredoka', '#14a36a'); }
function iconIce(t) { ctx.beginPath(); ctx.moveTo(-40, -10); ctx.lineTo(40, -10); ctx.lineTo(0, 90); ctx.closePath(); fs('#e0a060'); ell(0, -40, 46, 40); fs('#ffb8d8'); ell(-14, -78, 32, 28); fs('#fff3c4'); ell(16, -72, 26, 24); fs('#b8f0e0'); }
