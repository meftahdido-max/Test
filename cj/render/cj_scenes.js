// "What if you were born as CJ?" — GTA San Andreas. Reuses the shared kit from tommy/render.
Object.assign(PAL, { pink: '#2fbf4a', hot: '#5fd86a', orange: '#f08a30', gold: '#f0c040', purple: '#8a3cc0', deep: '#1a0f2a', teal: '#3ad0c0', mint: '#b8f0c0', vig: 'rgba(40,20,10,.5)' });
MEM.length = 0; MEM.push(['TENPENNY', 'crooked cop'], ['BIG SMOKE', 'orders a lot']);
MEMCOL.length = 0; MEMCOL.push('#ffd1c0', '#c8f5d8');

const SK = '#6a4228';
const CJ = { hair: 'short', hairCol: '#140e0a', skin: SK, shirt: '#f4f4ee', sleeve: SK, pants: '#3d5a8a', shoes: '#f4f4f4', mustache: '#140e0a', mouth: 'flat' };
const CJKID = { ...CJ, mustache: null, shirt: '#2fbf4a', sleeve: '#2fbf4a' };
const SWEET = { hair: 'none', skin: '#5a3620', shirt: '#2f8a3a', sleeve: '#2f8a3a', pants: '#2a2a2a', mustache: '#140e0a', mouth: 'flat' };
const KENDL = { hair: 'ponytail', hairCol: '#140e0a', skin: SK, shirt: '#f08aa8', pants: '#3d5a8a', mouth: 'grin', grinW: .7 };
const BRIAN = { hair: 'short', hairCol: '#140e0a', skin: SK, shirt: '#f0c040', pants: '#3d5a8a', mouth: 'smirk' };
const MOM = { hair: 'long', hairCol: '#2a1a10', skin: '#5a3620', shirt: '#c84a6a', pants: '#4a3a5a', mouth: 'grin', grinW: .8 };
const SMOKE = { hair: 'short', hairCol: '#140e0a', skin: '#7a4a30', shirt: '#2f8a3a', sleeve: '#2f8a3a', pants: '#2a2a2a', glasses: true, wide: 1.3, mouth: 'grin' };
const RYDER = { hair: 'short', hairCol: '#140e0a', skin: '#5a3620', shirt: '#2f8a3a', jacket: '#3a3a3a', longSleeve: true, sleeve: '#3a3a3a', pants: '#2a2a3a', hat: 'cap', capCol: '#2f8a3a', capBill: '#1a1a1a', glasses: true, mouth: 'smirk' };
const COP = { hair: 'none', skin: '#3a2416', mustache: '#140e0a', jacket: '#1e2a4a', shirt: '#c8d0e0', longSleeve: true, sleeve: '#1e2a4a', pants: '#1e2a4a', tie: '#111', brow: 'angry', mouth: 'grin' };
const PULASKI = { ...COP, hair: 'short', hairCol: '#8a6a40', skin: '#f0c4a0', mustache: null, mouth: 'smirk' };

function laSky(t, mode) {
  const sk = { sunset: ['#2a1a4a', '#a8405a', '#f08a40', '#f8d070'], day: ['#5aa8e0', '#a8d8f0', '#f8e8c0'], ballas: ['#1a0a2a', '#5a1a6a', '#a04aa0', '#e08a70'] }[mode];
  ctx.fillStyle = grad(-100, 760, sk); ctx.fillRect(-100, -100, W + 200, 900);
  if (mode !== 'day') { ell(1400, 520, 150, 150); ctx.fillStyle = 'rgba(255,220,140,.75)'; ctx.fill(); }
  ctx.fillStyle = mode === 'day' ? 'rgba(120,130,170,.45)' : 'rgba(80,40,90,.55)';
  for (const [x, w, h] of [[1150, 70, 330], [1230, 90, 420], [1330, 60, 280], [1400, 110, 380], [1520, 70, 300], [1600, 90, 350]]) ctx.fillRect(x, 640 - h, w, h);
}
function skinnyPalm(x, y, h, t) {
  line(x, y, x + 14, y - h, 9, '#3a2418');
  ctx.save(); ctx.translate(x + 14, y - h);
  for (let i = 0; i < 7; i++) { ctx.save(); ctx.rotate(i * .9 + Math.sin(t + i) * .05); ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(50, -20, 95, 18); ctx.quadraticCurveTo(50, -4, 0, 0); ctx.fillStyle = '#2a3a20'; ctx.fill(); ctx.restore(); }
  ctx.restore();
}
function house(x, w, col, trim, night) {
  rr(x, 520, w, 240, 4); fs(col); ctx.beginPath(); ctx.moveTo(x - 20, 530); ctx.lineTo(x + w / 2, 440); ctx.lineTo(x + w + 20, 530); ctx.closePath(); fs('#7a4a3a');
  rr(x + 30, 580, 90, 80, 4); fs(night ? '#ffd27a' : '#9ac8e0'); line(x + 75, 580, x + 75, 660, 4); rr(x + w - 110, 600, 70, 160, 4); fs(trim);
  rr(x - 10, 740, w + 20, 20, 4); fs('#c8b8a0');
}
function groveBG(t, mode = 'sunset') {
  laSky(t, mode); const ballas = mode === 'ballas';
  for (const x of [80, 560, 1040, 1700]) skinnyPalm(x, 760, 560, t);
  const cols = ballas ? [['#b8a0c8', '#6a2a8a'], ['#c8b0b8', '#6a2a8a'], ['#a898b8', '#6a2a8a'], ['#c0a8c8', '#6a2a8a']] : [['#e8d8b0', '#2f8a3a'], ['#c8d8b0', '#2f8a3a'], ['#f0c8a0', '#2f8a3a'], ['#e0d0c0', '#2f8a3a']];
  [[140, 360], [560, 340], [960, 360], [1380, 360]].forEach(([x, w], i) => house(x, w, cols[i][0], cols[i][1], mode !== 'day'));
  rr(-100, 700, W + 200, 60, 0); ctx.fillStyle = 'rgba(200,200,200,.4)'; ctx.fill();
  for (let x = -100; x < W + 100; x += 24) line(x, 700, x + 24, 760, 2, 'rgba(60,60,60,.5)'); for (let x = -100; x < W + 100; x += 24) line(x + 24, 700, x, 760, 2, 'rgba(60,60,60,.5)'); line(-100, 700, W + 100, 700, 5, '#6a6a6a');
  ctx.save(); ctx.translate(1700, 640); ctx.rotate(-.06); text(ballas ? 'BALLAS' : 'GROVE ST', 0, 0, '700 64px Pacifico', ballas ? '#a04ad0' : '#2fbf4a'); ctx.restore();
  ground(760, '#c8b8a0', '#a89880'); ctx.fillStyle = '#5a5a62'; ctx.fillRect(-100, 860, W + 200, 240); line(-100, 860, W + 100, 860, 5);
  for (let x = -100; x < W + 100; x += 260) rr(x, 960, 140, 12, 6), ctx.fillStyle = PAL.gold, ctx.fill();
}
function ground(y, c1, c2) { ctx.fillStyle = grad(y, 1080, [c1, c2]); ctx.fillRect(-100, y, W + 200, 1200 - y); line(-100, y, W + 100, y, 5); }
function policeCar(x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rr(-280, -130, 560, 90, 20); fs('#f4f4f4'); rr(-280, -100, 160, 60, 10); fs('#1a1a1a'); rr(120, -100, 160, 60, 10); fs('#1a1a1a');
  ctx.beginPath(); ctx.moveTo(-150, -130); ctx.lineTo(-90, -210); ctx.lineTo(110, -210); ctx.lineTo(170, -130); ctx.closePath(); fs('#f4f4f4'); rr(-80, -200, 180, 60, 6); fs('#9ac8e0', 4);
  rr(-30, -240, 80, 26, 6); fs(Math.sin(t * 14) > 0 ? '#e0263c' : '#2a6ae0'); text('POLICE', 0, -82, '700 34px Fredoka', '#f4f4f4');
  for (const wx of [-170, 170]) { ell(wx, -36, 50, 50); fs('#1a1a1a'); ell(wx, -36, 22, 22); fs('#aaa', 4); }
  ctx.restore();
}
function bmx(x, y, s, t, flip) {
  ctx.save(); ctx.translate(x, y); ctx.scale(flip ? -s : s, s);
  for (const wx of [-110, 110]) { ell(wx, -70, 70, 70); ctx.lineWidth = 10; ctx.strokeStyle = INK; ctx.stroke(); ell(wx, -70, 8, 8); fs(INK, 0); }
  ctx.beginPath(); ctx.moveTo(-110, -70); ctx.lineTo(-10, -70); ctx.lineTo(60, -170); ctx.lineTo(-40, -170); ctx.closePath(); ctx.moveTo(60, -170); ctx.lineTo(110, -70); ctx.moveTo(60, -170); ctx.lineTo(50, -230); ctx.lineTo(90, -240); ctx.lineWidth = 10; ctx.strokeStyle = '#e0263c'; ctx.stroke();
  rr(-70, -190, 60, 18, 8); fs('#1a1a1a'); const a = t * 8; line(-10, -70, -10 + Math.cos(a) * 34, -70 + Math.sin(a) * 34, 8, INK);
  ctx.restore();
}
function bookCJ(t) {
  const g = ctx.createRadialGradient(960, 560, 100, 960, 560, 1100); g.addColorStop(0, '#4a3020'); g.addColorStop(1, '#120a06'); ctx.fillStyle = g; ctx.fillRect(-100, -100, W + 200, H + 200);
  rr(150, 560, 70, 300, 10); fs('#f3ead6'); ell(185, 860, 110, 22); fs('#8a6a40');
  const fl = Math.sin(t * 13) * 4 + Math.sin(t * 7.3) * 3; ctx.beginPath(); ctx.moveTo(185 + fl * .3, 470 + fl); ctx.quadraticCurveTo(212, 530, 185, 552); ctx.quadraticCurveTo(158, 530, 185 + fl * .3, 470 + fl); ctx.fillStyle = '#ffd36b'; ctx.fill();
  rr(300, 160, 1320, 800, 18); fs('#2a3a20'); rr(330, 180, 630, 760, 10); fs('#f3e6c8'); rr(960, 180, 630, 760, 10); fs('#f3e6c8'); rr(944, 900, 34, 120, 0); fs(PAL.pink, 3);
  if (t < 1.1) { ctx.save(); ctx.globalAlpha = .6 + .4 * Math.sin(t * 14); text('◀◀', 120, 110, '700 70px Fredoka', '#fff'); ctx.restore();
    for (let i = 0; i < 3; i++) { const p = prog(t, .3 + i * .3, .3); if (p <= 0 || p >= 1) continue; const w = 630 * Math.cos(p * Math.PI); ctx.beginPath(); ctx.moveTo(960, 180); ctx.lineTo(960 + w, 180 + Math.sin(p * Math.PI) * 30); ctx.lineTo(960 + w, 940 - Math.sin(p * Math.PI) * 30); ctx.lineTo(960, 940); ctx.closePath(); fs(p < .5 ? '#f3e6c8' : '#e8d8b4', 3); } return; }
  const t2 = t - 1.1; ctx.save(); ctx.globalAlpha = clamp(t2 / .5);
  text('Prologue', 645, 320, 'italic 400 48px Almendra', '#5a4a2a'); text('Grove', 645, 425, '700 84px Almendra', '#1a2a10'); text('Street', 645, 515, '700 84px Almendra', '#1a2a10');
  line(545, 575, 745, 575, 3, '#8a7a5a'); for (let y = 640; y < 900; y += 46) line(400, y, 890, y, 2, 'rgba(90,80,50,.25)'); ctx.restore();
  ctx.save(); ctx.globalAlpha = clamp((t2 - .5) / .5); rr(1090, 270, 380, 320, 6); fs('#ecdcbc', 6);
  ctx.save(); rr(1090, 270, 380, 320, 6); ctx.clip(); ctx.filter = 'sepia(1)'; ctx.translate(1090, 270); ctx.scale(.2, .3); groveBG(t, 'day'); ctx.restore(); ctx.filter = 'none';
  text('you, Los Santos', 1280, 645, '600 50px Caveat', '#4a3a2a'); ctx.restore(); seal(t, 2.2, 1280, 815);
}

const CJS = [
  { id: 'hook1', pops: () => [[at('hook1', 'Carl Johnson') + .6], [at('hook1', "you'd rob") - .1, 'whoosh'], [at('hook1', "you'd rob") + .2], [at('hook1', 'Las Venturas'), 'stamp'], [at('hook1', 'steal a jetpack')], [at('hook1', 'military base'), 'stamp'], [at('hook1', 'and take down')], [at('hook1', 'Los Santos.'), 'stamp']],
    draw(t) {
      groveBG(t, 'sunset'); const g = ctx.createRadialGradient(960, 520, 50, 960, 520, 620); g.addColorStop(0, 'rgba(240,140,60,.4)'); g.addColorStop(1, 'rgba(240,140,60,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      person({ ...CJ, x: 960, y: 1560, s: 1.75, brow: 'angry', seed: 1 }, t);
      pill(t, at('hook1', 'Carl Johnson') + .6, 520, 330, "CARL 'CJ' JOHNSON", "GTA San Andreas · (that's you)", { rot: -.04 });
      const tl = at('hook1', "you'd rob") - .1, k = eout(prog(t, tl, .45)); if (k <= 0) return;
      ctx.save(); ctx.globalAlpha = k; rays(t, '#1a0f0a', '#2fbf4a', '#f08a30'); ctx.restore();
      ctx.save(); ctx.translate(0, lerp(1100, 0, k));
      rr(470, 90, 980, 800, 30); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fill(); rr(460, 70, 980, 800, 30); fs('#f4f0e0', 6);
      text("CJ'S", 950, 130, '700 30px Fredoka', '#4a6a3a', 'center', 'middle', '8px'); text('TO-DO LIST', 950, 190, '700 72px Almendra', INK); line(560, 240, 1340, 240, 4, 'rgba(36,18,46,.4)');
      [{ icon: '$', label: 'A CASINO', sub: '(the biggest in Las Venturas)', col: '#14a36a', t0: at('hook1', "you'd rob") + .2, st: at('hook1', 'Las Venturas'), stamp: 'ROBBED' },
       { icon: '✈', label: 'A JETPACK', sub: '(from a secret military base)', col: '#1e2a4a', t0: at('hook1', 'steal a jetpack'), st: at('hook1', 'military base'), stamp: 'STOLEN' },
       { icon: '★', label: 'TENPENNY', sub: '(the most crooked cop in LS)', col: '#c8322a', t0: at('hook1', 'and take down'), st: at('hook1', 'Los Santos.'), stamp: 'TAKEN DOWN' }].forEach((it, i) => {
        if (t < it.t0) return; const y = 360 + i * 200, s = popS(t, it.t0); ctx.save(); ctx.translate(560, y); ctx.scale(s, s);
        ell(50, 0, 50, 50); fs(it.col); text(it.icon, 50, 3, '700 44px Fredoka', '#fff'); text(it.label, 130, -12, '700 66px Fredoka', INK, 'left'); text(it.sub, 134, 48, '600 34px Caveat', '#4a6a3a', 'left'); ctx.restore();
        if (it.stamp) stampText(t, it.st, 1220, y, it.stamp, .7);
      });
      ctx.restore();
    } },
  { id: 'hook2', pops: () => [[.2], [.4], [at('hook2', 'sold out'), 'stamp'], [at('hook2', 'grew up'), 'ding']],
    draw(t) {
      rays(t, '#140a1e', '#8a3cc0', '#2fbf4a');
      ctx.save(); ctx.globalAlpha = clamp(t / .4); ctx.shadowColor = 'rgba(47,191,74,.7)'; ctx.shadowBlur = 30; text('Who sold out Grove Street?', 960, 140, '700 80px Almendra', '#f4f0e0'); ctx.restore();
      [[620, .2, SMOKE, 'BIG SMOKE', -.04], [1300, .4, RYDER, 'RYDER', .04]].forEach(([x, t0, who, name, rot]) => {
        const s = popS(t, t0); if (s <= 0) return; const shown = t > at('hook2', 'grew up');
        ctx.save(); ctx.translate(x, 560); ctx.rotate(rot); ctx.scale(s, s);
        rr(-230, -290, 460, 560, 10); fs(PAL.gold, 6); rr(-200, -260, 400, 440, 4); fs(shown ? '#d8f0d0' : '#1a2a1a', 4);
        if (shown) { const r = eout(prog(t, at('hook2', 'grew up'), .3)); ctx.save(); rr(-200, -260, 400, 440, 4); ctx.clip(); ctx.globalAlpha = r; person({ ...who, x: 0, y: 420, s: .95 }, t); ctx.restore(); rr(-200, -260, 400, 440, 4); fs(null, 4); text(name, 0, 228, '700 50px Caveat', INK); }
        else text('?', 0, -40, '700 220px Almendra', 'rgba(255,255,255,.25)');
        ctx.restore();
      });
      stampText(t, at('hook2', 'sold out'), 960, 900, 'SOLD YOU OUT', .9);
      pill(t, at('hook2', 'grew up') + .3, 960, 260, 'YOU GREW UP WITH THEM', null, { bg: '#ffd1c0' });
    } },
  { id: 'book', extra: 1.5, pops: () => [[.1, 'whoosh'], [.45, 'swish'], [.75, 'swish'], [1.05, 'swish'], [1.6], [2.2, 'stamp']], draw: t => bookCJ(t) },
  { id: 'grove', trans: 'zoom', zoomAt: [1280, 440], pops: () => [[at('grove', 'your mom')], [at('grove', 'Sweet')], [at('grove', 'Kendl')], [at('grove', 'brother Brian')], [at('grove', 'When Brian'), 'swish'], [at('grove', 'blames you'), 'stamp'], [at('grove', 'So you leave'), 'whoosh'], [at('grove', 'Five years')]],
    draw(t) {
      groveBG(t, 'day'); const tb = at('grove', 'When Brian'), tl = at('grove', 'So you leave');
      const fam = [[MOM, 360, 1, 'your mom'], [SWEET, 620, .9, 'Sweet'], [{ ...CJKID }, 860, .62, null], [BRIAN, 1060, .6, 'brother Brian'], [KENDL, 1240, .5, 'Kendl']];
      fam.forEach(([who, x, s, ph], i) => {
        const pop = ph ? popS(t, at('grove', ph)) : 1;
        let o = { ...who, x, y: 1000, s, pop, seed: i };
        if (who === BRIAN) o.alpha = 1 - clamp((t - tb) / .8);
        if (who === SWEET && t > at('grove', 'blames you')) { o.brow = 'angry'; o.mouth = 'frown'; }
        if (i === 2) { o.x = t > tl ? lerp(860, 2200, eio(prog(t, tl, 2.5))) : 860; o.walking = t > tl; o.phase = t * 9; o.s = t > tl ? lerp(.62, .95, prog(t, tl, 1)) : .62; o.shirt = t > tl ? '#f4f4ee' : CJKID.shirt; o.sleeve = t > tl ? SK : CJKID.sleeve; }
        person(o, t);
      });
      pill(t, at('grove', 'your mom'), 360, 280, 'MOM', 'Beverly Johnson');
      pill(t, at('grove', 'Sweet'), 620, 340, 'SWEET', 'big brother', { rot: -.03 });
      pill(t, at('grove', 'Kendl'), 1300, 500, 'KENDL', 'little sister', { rot: .03 });
      if (t < tb) pill(t, at('grove', 'brother Brian'), 1060, 420, 'BRIAN', null);
      if (t > tb) { const fs2 = popS(t, tb + .3); ctx.save(); ctx.translate(1600, 300); ctx.rotate(.05); ctx.scale(fs2, fs2); rr(-120, -140, 240, 280, 8); fs('#3a2a1a', 6); rr(-96, -116, 192, 210, 4); fs('#f0e0c0', 3); ctx.save(); rr(-96, -116, 192, 210, 4); ctx.clip(); ctx.filter = 'sepia(1)'; person({ ...BRIAN, x: 0, y: 330, s: .55 }, t); ctx.filter = 'none'; ctx.restore(); text('Brian', 0, 120, '700 34px Caveat', '#f0e0c0'); ctx.restore(); }
      stampText(t, at('grove', 'blames you'), 640, 180, 'SWEET BLAMES YOU', .75);
      counter(t, at('grove', 'Five years'), 1500, 650, 'YEARS IN LIBERTY CITY', '5', { col: PAL.pink });
      eraTag(t, 'GROVE STREET · LOS SANTOS');
    } },
  { id: 'home', pops: () => [[at('home', 'your mom is killed')], [at('home', 'fly home'), 'whoosh'], [at('home', 'Two cops'), 'stamp'], [at('home', 'Officer Tenpenny')], [at('home', 'takes your money'), 'swish'], [at('home', 'frames you'), 'stamp'], [at('home', 'drops you'), 'whoosh'], [at('home', 'With a bike'), 'ding'], [at('home', 'Remember Tenpenny') - .2, 'swish'], [at('home', 'Remember Tenpenny') + .2]],
    draw(t) {
      const tf = at('home', 'fly home'), tc = at('home', 'Two cops'), td = at('home', 'drops you');
      if (t < tf) {
        const g = ctx.createRadialGradient(960, 540, 50, 960, 540, 1000); g.addColorStop(0, '#3a2a1a'); g.addColorStop(1, '#0e0a06'); ctx.fillStyle = g; ctx.fillRect(-100, -100, W + 200, H + 200);
        const s = popS(t, at('home', 'your mom is killed')); ctx.save(); ctx.translate(960, 500); ctx.scale(s, s); rr(-200, -240, 400, 460, 10); fs('#5a3a22', 8); rr(-170, -210, 340, 360, 4); fs('#f0e0c0', 4);
        ctx.save(); rr(-170, -210, 340, 360, 4); ctx.clip(); ctx.filter = 'sepia(1)'; person({ ...MOM, x: 0, y: 470, s: .8 }, t); ctx.filter = 'none'; ctx.restore(); text('Mom', 0, 190, '700 50px Caveat', '#f0e0c0'); ctx.restore();
        for (const x of [640, 1280]) { rr(x - 20, 720, 40, 140, 6); fs('#f3ead6'); ctx.beginPath(); ctx.moveTo(x, 690 + Math.sin(t * 12 + x) * 4); ctx.quadraticCurveTo(x + 16, 712, x, 722); ctx.quadraticCurveTo(x - 16, 712, x, 690); ctx.fillStyle = '#ffd36b'; ctx.fill(); }
        return;
      }
      if (t < tc) {
        laSky(t, 'sunset'); ground(760, '#9a8a7a', '#7a6a5a'); rr(300, 380, 1320, 300, 6); fs('#e0d0c0'); text('LOS SANTOS INTERNATIONAL', 960, 450, '700 56px Fredoka', '#2a3a5a', 'center', 'middle', '4px'); for (let i = 0; i < 8; i++) { rr(360 + i * 160, 520, 110, 140, 4); fs('#9ac8e0', 3); }
        const px = lerp(-300, 2300, prog(t, tf, 3)); ctx.save(); ctx.translate(px, 240); ctx.rotate(.04); rr(-160, -22, 320, 50, 24); fs('#fff'); ctx.beginPath(); ctx.moveTo(-30, 0); ctx.lineTo(-90, 90); ctx.lineTo(-40, 90); ctx.lineTo(40, 0); fs('#fff'); ctx.restore();
        person({ ...CJ, x: 1500, y: 1000, s: .95, suitcase: true, armR: .05, seed: 1 }, t); eraTag(t, 'LOS SANTOS · 1992'); return;
      }
      if (t < td) {
        laSky(t, 'sunset'); ground(760, '#9a8a7a', '#7a6a5a'); policeCar(lerp(2400, 1350, eout(prog(t, tc, .8))), 980, .9, t);
        person({ ...CJ, x: 520, y: 1000, s: .95, brow: 'worried', mouth: 'frown', seed: 1 }, t);
        const T1 = { ...COP, x: 900, y: 1000, s: 1, pop: popS(t, at('home', 'Officer Tenpenny')), seed: 2 }; person(T1, t); person({ ...PULASKI, x: 1120, y: 1000, s: .95, pop: popS(t, tc + .3), seed: 3 }, t);
        pill(t, at('home', 'Officer Tenpenny'), 900, 220, 'OFFICER TENPENNY', 'very crooked');
        counter(t, at('home', 'takes your money'), 1560, 300, 'YOUR CASH', t > at('home', 'takes your money') + .8 ? '$0' : '$500', { col: PAL.pink });
        stampText(t, at('home', 'frames you'), 700, 420, 'FRAMED FOR MURDER', .75); eraTag(t, 'LOS SANTOS · 1992'); return;
      }
      groveBG(t, 'ballas');
      const ride = clamp((t - at('home', 'With a bike')) / 2.5), bx = lerp(1250, 560, eio(ride));
      if (t > at('home', 'With a bike')) bmx(bx, 1000, .95, t, true);
      person({ ...CJ, x: t > at('home', 'With a bike') ? bx : 1250, y: t > at('home', 'With a bike') ? 860 : 1000, s: .95, brow: 'angry', mouth: 'flat', seed: 1 }, t);
      pill(t, td + .1, 960, 160, 'ENEMY TERRITORY', 'purple. very purple.');
      bubble(t, at('home', 'With a bike') + .2, bx + 120, 280, 'Ah sh*t, here we go again.', { left: false });
      memoryBoard(t, at('home', 'Remember Tenpenny') - .3, 0, 0, { tNew: at('home', 'Remember Tenpenny') + .1 });
      eraTag(t, 'BALLAS TURF · 1992');
    } },
];
// (full story scenes are appended in cj_story.js)
SCENES.length = 0; SCENES.push(...CJS);
