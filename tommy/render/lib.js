// Core drawing helpers + timeline for the "born as" storybook style.
const W = 1920, H = 1080, INK = '#2b1d17', FPS = 30;
const PRE = 0.35, POST = 0.6, TR = 0.45;
let ctx;
const main = document.getElementById('cv').getContext('2d');
const bufA = new OffscreenCanvas(W, H).getContext('2d');
const bufB = new OffscreenCanvas(W, H).getContext('2d');

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const eio = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
const eout = t => 1 - Math.pow(1 - t, 3);
const back = t => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
const prog = (t, t0, d) => clamp((t - t0) / d);
const popS = (t, t0, d = .38) => t < t0 ? 0 : back(prog(t, t0, d));

function rr(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }
function ell(x, y, rx, ry) { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); }
function fs(fill, lw = 5) {
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = INK; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); }
}
function line(x1, y1, x2, y2, lw = 5, col = INK) { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineWidth = lw; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.stroke(); }
function text(s, x, y, font, color, align = 'center', base = 'middle', ls = '0px') {
  ctx.font = font; ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = base; ctx.letterSpacing = ls; ctx.fillText(s, x, y); ctx.letterSpacing = '0px';
}
function grad(y0, y1, stops) { const g = ctx.createLinearGradient(0, y0, 0, y1); stops.forEach((c, i) => g.addColorStop(i / (stops.length - 1), c)); return g; }
function rand(seed) { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; }

// ---------- UI elements ----------
function pill(t, t0, x, y, label, sub, o = {}) {
  const s = popS(t, t0); if (s <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  ctx.font = '600 40px Fredoka'; const w1 = ctx.measureText(label).width;
  let w2 = 0; if (sub) { ctx.font = '500 26px Fredoka'; w2 = ctx.measureText(sub).width; }
  const w = Math.max(w1, w2) + 60, h = sub ? 100 : 68, r = sub ? 28 : 34;
  rr(-w / 2 + 5, -h / 2 + 8, w, h, r); ctx.fillStyle = 'rgba(0,0,0,.22)'; ctx.fill();
  rr(-w / 2, -h / 2, w, h, r); fs(o.bg || '#fffaf0', 5);
  if (sub) { text(label, 0, -15, '600 40px Fredoka', o.fg || INK); text(sub, 0, 26, '500 26px Fredoka', '#8a7766'); }
  else text(label, 0, 3, '600 40px Fredoka', o.fg || INK);
  ctx.restore();
}
function counter(t, t0, x, y, label, value, o = {}) {
  const s = popS(t, t0); if (s <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || -0.03); ctx.scale(s, s);
  ctx.font = '600 28px Fredoka'; const lw = ctx.measureText(label).width + 44;
  ctx.font = '700 64px Fredoka'; const vw = ctx.measureText(value).width + 60;
  const w = Math.max(lw, vw);
  rr(-w / 2 + 5, -34 + 8, w, 124, 18); ctx.fillStyle = 'rgba(0,0,0,.22)'; ctx.fill();
  rr(-w / 2, -2, w, 92, 18); fs('#fffaf0');
  rr(-lw / 2, -34, lw, 46, 14); fs(INK, 0);
  text(label, 0, -10, '600 28px Fredoka', '#fffaf0', 'center', 'middle', '2px');
  text(value, 0, 50, '700 64px Fredoka', o.col || '#c8322a');
  ctx.restore();
}
function eraTag(t, label) {
  const a = clamp(t / .4); if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a;
  ctx.font = '600 24px Fredoka'; ctx.letterSpacing = '3px'; const w = ctx.measureText(label).width + 40; ctx.letterSpacing = '0px';
  rr(W - 60 - w, 50, w, 48, 12); ctx.fillStyle = 'rgba(30,20,15,.78)'; ctx.fill();
  text(label, W - 60 - w / 2, 76, '600 24px Fredoka', '#f3e6c8', 'center', 'middle', '3px');
  ctx.restore();
}
function strike(t, t0, x1, y, x2, col = '#c8322a', lw = 9) {
  const p = eout(prog(t, t0, .35)); if (p <= 0) return;
  line(x1, y, lerp(x1, x2, p), y + (x2 - x1) * p * 0.02, lw, col);
}
function scribbleCircle(t, t0, x, y, rx, ry, col = '#c8322a') {
  const p = eout(prog(t, t0, .6)); if (p <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(-0.04);
  ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, -2.6, -2.6 + p * Math.PI * 2.15);
  ctx.lineWidth = 7; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore();
}
function bubble(t, t0, x, y, txt, o = {}) {
  const s = popS(t, t0); if (s <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.font = '600 44px Fredoka'; const w = ctx.measureText(txt).width + 60;
  rr(-w / 2, -40, w, 80, 30); fs('#fff');
  ctx.beginPath(); ctx.moveTo(o.left ? w / 2 - 50 : -w / 2 + 30, 36); ctx.lineTo(o.left ? w / 2 - 10 : -w / 2 + 10, 70); ctx.lineTo(o.left ? w / 2 - 25 : -w / 2 + 60, 36); fs('#fff');
  ctx.fillStyle = '#fff'; ctx.fillRect(o.left ? w / 2 - 55 : -w / 2 + 25, 30, 40, 8);
  text(txt, 0, 2, '600 44px Fredoka', INK); ctx.restore();
}
function sparkle(t, t0, x, y, size = 30) {
  if (t < t0 || t > t0 + 1.2) return;
  const p = (t - t0) / 1.2, s = Math.sin(p * Math.PI) * size;
  ctx.save(); ctx.translate(x, y); ctx.rotate(p * 1.5);
  ctx.beginPath();
  for (let i = 0; i < 8; i++) { const r = i % 2 ? s * .28 : s; const a = i * Math.PI / 4; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
  ctx.closePath(); ctx.fillStyle = '#fff6b0'; ctx.shadowColor = '#fff'; ctx.shadowBlur = 20; ctx.fill(); ctx.restore();
}
function parchment(x, y, w, h) {
  rr(x + 8, y + 12, w, h, 6); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fill();
  rr(x, y, w, h, 6); fs('#f2e1b8');
  const g = ctx.createRadialGradient(x + w / 2, y + h / 2, h * .2, x + w / 2, y + h / 2, h * .8);
  g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(150,100,40,.25)'); rr(x, y, w, h, 6); ctx.fillStyle = g; ctx.fill();
  rr(x - 20, y - 22, w + 40, 40, 20); fs('#e3cc98'); rr(x - 20, y + h - 18, w + 40, 40, 20); fs('#e3cc98');
}

// ---------- Characters ----------
function hair(style, col) {
  ctx.beginPath();
  if (style === 'tommy') {
    ctx.moveTo(-66, 8); ctx.bezierCurveTo(-74, -62, -30, -96, 12, -90); ctx.bezierCurveTo(60, -86, 80, -48, 66, 8);
    ctx.lineTo(58, -18); ctx.bezierCurveTo(40, -40, 10, -50, -14, -44); ctx.bezierCurveTo(-34, -40, -50, -30, -58, -16); ctx.closePath();
    fs(col);
    ctx.beginPath(); ctx.moveTo(-20, -44); ctx.bezierCurveTo(-10, -66, 20, -70, 38, -58); ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.stroke();
  } else if (style === 'slick') {
    ctx.moveTo(-66, 0); ctx.bezierCurveTo(-70, -70, -20, -94, 20, -90); ctx.bezierCurveTo(64, -84, 76, -50, 66, 0);
    ctx.lineTo(60, -30); ctx.bezierCurveTo(30, -46, -30, -48, -60, -28); ctx.closePath(); fs(col);
    ctx.beginPath(); ctx.moveTo(-36, -60); ctx.bezierCurveTo(-10, -78, 20, -78, 40, -66); ctx.lineWidth = 6; ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.stroke();
  }
}
function face(o, t) {
  const lk = o.look || 0;
  const blink = ((t + (o.seed || 0)) % 3.6) < 0.12;
  if (blink) { line(-30 + lk, -2, -14 + lk, -2, 5); line(14 + lk, -2, 30 + lk, -2, 5); }
  else { ell(-22 + lk, -2, 7, 10); fs(INK, 0); ell(22 + lk, -2, 7, 10); fs(INK, 0); }
  const ang = o.brow === 'angry' ? 8 : o.brow === 'worried' ? -7 : 0;
  line(-38, -28 - ang * .3, -10, -26 + ang, 6); line(10, -26 + ang, 38, -28 - ang * .3, 6);
  ctx.beginPath(); ctx.moveTo(2, 6); ctx.quadraticCurveTo(14, 22, 0, 26); ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.stroke();
  if (o.stubble) { ell(0, 44, 44, 26); ctx.fillStyle = 'rgba(60,40,30,.12)'; ctx.fill(); }
  const m = o.mouth || 'flat';
  if (m === 'flat') line(-14, 44, 14, 44, 5);
  else if (m === 'smirk') { ctx.beginPath(); ctx.moveTo(-16, 44); ctx.quadraticCurveTo(4, 50, 20, 36); ctx.lineWidth = 5; ctx.strokeStyle = INK; ctx.stroke(); }
  else if (m === 'frown') { ctx.beginPath(); ctx.moveTo(-14, 48); ctx.quadraticCurveTo(0, 38, 14, 48); ctx.lineWidth = 5; ctx.strokeStyle = INK; ctx.stroke(); }
  else if (m === 'grin') {
    const g = o.grinW || 1;
    ctx.beginPath(); ctx.moveTo(-32 * g, 32); ctx.quadraticCurveTo(0, 36, 32 * g, 32); ctx.quadraticCurveTo(0, 78, -32 * g, 32); fs('#fff', 4);
    line(-26 * g, 42, 26 * g, 42, 3);
  }
  if (o.sweat) {
    const s = o.sweat; ctx.save(); ctx.translate(72, -40 + (1 - s) * -20); ctx.scale(s, s);
    ctx.beginPath(); ctx.moveTo(0, -24); ctx.quadraticCurveTo(18, 4, 0, 12); ctx.quadraticCurveTo(-18, 4, 0, -24); fs('#9fd4ff', 4); ctx.restore();
  }
}
function torsoPath() { rr(-92, -482, 184, 264, 34); }
function hawaii() {
  const r = rand(7);
  for (let gy = -500; gy < -200; gy += 62) for (let gx = -110; gx < 110; gx += 66) {
    const x = gx + ((gy / 62) % 2 ? 33 : 0) + r() * 10, y = gy + r() * 10;
    ctx.save(); ctx.translate(x, y); ctx.rotate(r() * 6);
    ctx.fillStyle = '#2b9d6c'; ell(16, 10, 16, 7); ctx.fill();
    ctx.fillStyle = r() > .5 ? '#ff7aa8' : '#ffd25a';
    for (let i = 0; i < 5; i++) { ctx.save(); ctx.rotate(i * 1.2566); ell(0, -11, 7, 11); ctx.fill(); ctx.restore(); }
    ctx.fillStyle = '#fff3c4'; ell(0, 0, 5, 5); ctx.fill(); ctx.restore();
  }
}
function person(o, t) {
  const s = o.s || 1;
  ctx.save(); ctx.translate(o.x, o.y); ctx.scale(s, s);
  const sw = o.walking ? Math.sin(o.phase) : 0;
  const bob = o.walking ? -Math.abs(Math.cos(o.phase)) * 10 : Math.sin(t * 2.1 + (o.seed || 0)) * 3;
  const skin = o.skin || '#e9b48e';
  ctx.save(); ell(0, 0, 120, 18); ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fill(); ctx.restore();
  ctx.translate(0, bob);
  const leg = (sx, a) => { ctx.save(); ctx.translate(sx, -235); ctx.rotate(a); rr(-25, -10, 50, 228, 18); fs(o.pants || '#3d5a8a'); ell(8, 222, 42, 20); fs(o.shoes || '#2b2220'); ctx.restore(); };
  leg(-33, sw * .3); leg(33, -sw * .3);
  const arm = (side, a) => {
    ctx.save(); ctx.translate(side * 90, -452); ctx.rotate(-side * a);
    rr(-21, -8, 42, 192, 20); fs(skin);
    rr(-24, -14, 48, o.longSleeve ? 178 : 78, 22); fs(o.sleeve || o.shirt);
    ell(0, 198, 24, 24); fs(skin); ctx.restore();
  };
  const aL = (o.armL ?? .14) + (o.walking ? sw * .25 : Math.sin(t * 2.1) * .02);
  const aR = (o.armR ?? .14) - (o.walking ? sw * .25 : Math.sin(t * 2.1) * .02);
  rr(-22, -515, 44, 45, 10); fs(skin);
  torsoPath(); ctx.fillStyle = o.jacket || o.shirt; ctx.fill();
  if (o.pattern === 'hawaii') { ctx.save(); torsoPath(); ctx.clip(); hawaii(); ctx.restore(); }
  torsoPath(); fs(null);
  if (o.jacket) {
    ctx.beginPath(); ctx.moveTo(-44, -482); ctx.lineTo(44, -482); ctx.lineTo(0, -330); ctx.closePath(); fs(o.shirt);
    if (o.tie) { ctx.beginPath(); ctx.moveTo(-12, -476); ctx.lineTo(12, -476); ctx.lineTo(16, -360); ctx.lineTo(0, -340); ctx.lineTo(-16, -360); ctx.closePath(); fs(o.tie, 4); }
    ctx.beginPath(); ctx.moveTo(-44, -482); ctx.lineTo(-62, -420); ctx.lineTo(-30, -400); ctx.lineTo(0, -330); ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(44, -482); ctx.lineTo(62, -420); ctx.lineTo(30, -400); ctx.lineTo(0, -330); ctx.stroke();
    if (o.buttons) { ell(0, -300, 6, 6); fs(INK, 0); ell(0, -260, 6, 6); fs(INK, 0); }
  } else {
    ctx.beginPath(); ctx.moveTo(-30, -482); ctx.lineTo(30, -482); ctx.lineTo(0, -425); ctx.closePath(); fs(skin, 4);
    ctx.beginPath(); ctx.moveTo(-32, -484); ctx.lineTo(-62, -470); ctx.lineTo(-40, -440); ctx.lineTo(0, -425); ctx.closePath(); fs(o.collar || o.shirt, 4);
    ctx.beginPath(); ctx.moveTo(32, -484); ctx.lineTo(62, -470); ctx.lineTo(40, -440); ctx.lineTo(0, -425); ctx.closePath(); fs(o.collar || o.shirt, 4);
  }
  arm(-1, aL); arm(1, aR);
  if (o.suitcase) {
    const a = aR, hx = 90 + 198 * Math.sin(a), hy = -452 + 198 * Math.cos(a);
    ctx.beginPath(); ctx.arc(hx, hy + 14, 20, Math.PI, 0); ctx.lineWidth = 8; ctx.strokeStyle = INK; ctx.stroke();
    rr(hx - 70, hy + 14, 140, 100, 12); fs('#8a5a34'); line(hx - 70, hy + 46, hx + 70, hy + 46, 4); rr(hx - 12, hy + 38, 24, 16, 4); fs('#d9b45a', 3);
  }
  ctx.save(); ctx.translate(0, -590); ctx.rotate(o.tilt || 0);
  ell(-64, 8, 14, 19); fs(skin); ell(64, 8, 14, 19); fs(skin);
  ell(0, 0, 64, 76); fs(skin);
  hair(o.hair || 'tommy', o.hairCol || '#3a2418');
  face(o, t);
  ctx.restore();
  ctx.restore();
}
// world position of a person's head top / mouth
const headTop = o => ({ x: o.x, y: o.y - 690 * (o.s || 1) });
const mouthAt = o => ({ x: o.x + 30 * (o.s || 1), y: o.y - 548 * (o.s || 1) });

function baby(x, y, s, o, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const skin = '#f0c09a';
  ell(-92, 10, 18, 24); fs(skin); ell(92, 10, 18, 24); fs(skin);
  ell(0, 0, 95, 92); fs(skin);
  for (const [cx, r] of [[-22, 20], [0, 24], [22, 19]]) { ctx.beginPath(); ctx.arc(cx, -86, r, Math.PI, 0); fs('#3a2418', 4); }
  ell(-44, 30, 16, 10); ctx.fillStyle = 'rgba(255,120,120,.35)'; ctx.fill(); ell(44, 30, 16, 10); ctx.fill();
  const blink = ((t + 1.3) % 3.2) < .12;
  if (blink) { line(-38, 4, -18, 4, 5); line(18, 4, 38, 4, 5); } else { ell(-28, 4, 8, 11); fs(INK, 0); ell(28, 4, 8, 11); fs(INK, 0); }
  const a = o.angry || 0;
  line(-46, -24 - a * 4, -16, -20 + a * 10, 6); line(16, -20 + a * 10, 46, -24 - a * 4, 6);
  if (a > .5) { ctx.beginPath(); ctx.moveTo(-14, 50); ctx.quadraticCurveTo(0, 40, 14, 50); ctx.lineWidth = 5; ctx.strokeStyle = INK; ctx.stroke(); }
  else { ell(0, 46, 8, 6); fs('#c9665a', 4); }
  ctx.restore();
}

// ---------- grain / vignette ----------
let grainPat;
function makeGrain() {
  const c = new OffscreenCanvas(256, 256), g = c.getContext('2d'), d = g.createImageData(256, 256), r = rand(42);
  for (let i = 0; i < d.data.length; i += 4) { const v = 110 + r() * 60; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
  g.putImageData(d, 0, 0); grainPat = main.createPattern(c, 'repeat');
}
function finish(c) {
  c.save(); c.globalCompositeOperation = 'overlay'; c.globalAlpha = .18; c.fillStyle = grainPat; c.fillRect(0, 0, W, H); c.restore();
  const v = c.createRadialGradient(W / 2, H / 2, H * .45, W / 2, H / 2, H * 1.05);
  v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(20,10,5,.55)'); c.fillStyle = v; c.fillRect(0, 0, W, H);
}

// ---------- timeline ----------
let TL = [], TOTAL = 0, EVENTS = [];
function at(id, phrase) {
  const s = SCRIPT.find(x => x.id === id); const i = s.text.indexOf(phrase);
  if (i < 0) throw new Error('phrase not found: ' + phrase);
  return PRE + DUR[id] * i / s.text.length;
}
function setup() {
  makeGrain();
  let t = 0;
  for (const sc of SCENES) {
    const d = (sc.len ? sc.len : PRE + (DUR[sc.id] || 0) + POST) + (sc.extra || 0);
    TL.push({ ...sc, start: t, dur: d }); t += d;
  }
  TOTAL = t + 0.6;
  TL.forEach((sc, i) => {
    if (sc.id && DUR[sc.id]) EVENTS.push({ type: 'voice', id: sc.id, t: sc.start + PRE });
    (sc.pops ? sc.pops() : []).forEach(p => EVENTS.push({ type: p[1] || 'pop', t: sc.start + p[0] }));
    if (i > 0) EVENTS.push({ type: 'whoosh', t: sc.start - TR * .7 });
  });
  window.TOTAL = TOTAL; window.EVENTS = EVENTS; window.TL = TL;
}
function drawScene(c, sc, lt) {
  ctx = c; c.save(); c.clearRect(0, 0, W, H);
  const z = 1 + 0.045 * clamp(lt / sc.dur, 0, 1.2);
  c.translate(W / 2, H / 2); c.scale(z, z); c.translate(-W / 2, -H / 2);
  sc.draw(lt, sc.dur); c.restore();
}
function renderFrame(T) {
  let i = TL.findIndex(s => T >= s.start && T < s.start + s.dur); if (i < 0) i = TL.length - 1;
  const a = TL[i], b = TL[i + 1];
  const endA = a.start + a.dur;
  main.save(); main.fillStyle = '#000'; main.fillRect(0, 0, W, H);
  drawScene(bufA, a, T - a.start);
  if (b && T > endA - TR) {
    const p = eio((T - (endA - TR)) / TR);
    drawScene(bufB, b, T - b.start);
    if (b.trans === 'zoom') {
      const [px, py] = b.zoomAt || [W / 2, H / 2];
      main.save(); main.globalAlpha = 1; main.translate(px, py); main.scale(1 + p * 2.2, 1 + p * 2.2); main.translate(-px, -py); main.drawImage(bufA.canvas, 0, 0); main.restore();
      main.save(); main.globalAlpha = p; main.translate(W / 2, H / 2); main.scale(1.15 - .15 * p, 1.15 - .15 * p); main.translate(-W / 2, -H / 2); main.drawImage(bufB.canvas, 0, 0); main.restore();
    } else {
      const bl = Math.sin(p * Math.PI) * 28;
      main.filter = `blur(${bl}px)`;
      main.drawImage(bufA.canvas, -p * W, 0); main.drawImage(bufB.canvas, W - p * W, 0);
      main.filter = 'none';
    }
  } else main.drawImage(bufA.canvas, 0, 0);
  finish(main);
  const fadeIn = clamp(T / .5), fadeOut = clamp((TOTAL - T) / .8);
  const f = Math.min(fadeIn, fadeOut); if (f < 1) { main.fillStyle = `rgba(0,0,0,${1 - f})`; main.fillRect(0, 0, W, H); }
  main.restore();
}
