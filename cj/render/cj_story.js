// CJ — rest of the story (after the preview scenes in cj_scenes.js).
const CATALINA = { hair: 'long', hairCol: '#1a100a', skin: '#c8906a', shirt: '#c8322a', pants: '#2a2a3a', mouth: 'smirk', brow: 'angry' };
const WOOZIE = { hair: 'short', hairCol: '#140e0a', skin: '#f0cfa0', jacket: '#2a2a3a', shirt: '#c8322a', longSleeve: true, sleeve: '#2a2a3a', pants: '#2a2a3a', glasses: true, mouth: 'flat' };
const MADD = { hair: 'none', skin: '#4a2c18', jacket: '#7a3cc0', shirt: '#f4f4ee', longSleeve: true, sleeve: '#7a3cc0', pants: '#2a2a2a', mustache: '#140e0a', chain: true, mouth: 'frown', brow: 'worried' };

function chapterCJ(t, num, title) {
  const g = ctx.createRadialGradient(960, 540, 50, 960, 540, 1000); g.addColorStop(0, '#1e3a1e'); g.addColorStop(1, '#060a06'); ctx.fillStyle = g; ctx.fillRect(-100, -100, W + 200, H + 200);
  for (let i = 0; i < 4; i++) skinnyPalm(150 + i * 520, 1100, 760, t);
  ctx.fillStyle = 'rgba(6,10,6,.55)'; ctx.fillRect(-100, -100, W + 200, H + 200);
  ctx.save(); ctx.globalAlpha = clamp(t / .4);
  const s = popS(t, .1, .5); ctx.save(); ctx.translate(960, 390); ctx.scale(s, s); ell(0, 0, 60, 60); ctx.shadowColor = PAL.pink; ctx.shadowBlur = 30; ctx.lineWidth = 6; ctx.strokeStyle = PAL.pink; ctx.stroke(); ctx.shadowBlur = 0; text(num, 0, 4, '700 52px Almendra', '#fff'); ctx.restore();
  text('CHAPTER ' + num, 960, 510, '600 30px Fredoka', PAL.gold, 'center', 'middle', '10px');
  ctx.shadowColor = 'rgba(47,191,74,.6)'; ctx.shadowBlur = 30; text(title, 960, 630, '700 104px Almendra', '#f4f0e0'); ctx.restore();
}
function nightShade(a = .45) { ctx.fillStyle = `rgba(10,6,30,${a})`; ctx.fillRect(-100, -100, W + 200, H + 200); }
function train(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rr(0, -220, 360, 190, 14); fs('#c8a040'); rr(260, -300, 100, 90, 8); fs('#c8a040'); rr(280, -285, 60, 50, 4); fs('#9ac8e0', 3); rr(-20, -60, 400, 30, 6); fs('#3a3a3a');
  for (let k = 1; k < 4; k++) { rr(-k * 420, -200, 400, 170, 8); fs(['#8a3a2a', '#5a6a7a', '#7a5a3a'][k - 1]); rr(-k * 420 - 10, -60, 420, 26, 6); fs('#3a3a3a'); for (const wx of [60, 320]) { ell(-k * 420 + wx, -30, 34, 34); fs('#222'); } }
  for (const wx of [60, 300]) { ell(wx, -30, 34, 34); fs('#222'); }
  ctx.restore();
}
function tracks(y) { rr(-100, y, W + 200, 16, 0); fs('#6a5a4a', 3); for (let x = -100; x < W + 100; x += 60) { rr(x, y - 10, 18, 36, 2); fs('#5a4030', 2); } }
function desertBG(t) { laSky(t, 'day'); ground(700, '#e8c890', '#c8a070'); for (const [x, s] of [[200, 1], [700, .7], [1500, .9]]) { ctx.save(); ctx.translate(x, 700); ctx.scale(s, s); rr(-20, -200, 40, 200, 18); fs('#3a7a3a'); rr(-70, -150, 30, 80, 14); fs('#3a7a3a'); rr(40, -170, 30, 90, 14); fs('#3a7a3a'); ctx.restore(); } }
function countryBG(t) {
  laSky(t, 'day'); ctx.fillStyle = '#7aa85a'; ctx.beginPath(); ctx.moveTo(-100, 640); for (let x = -100; x <= W + 100; x += 200) ctx.lineTo(x, 560 + Math.sin(x * .004) * 50); ctx.lineTo(W + 100, 760); ctx.lineTo(-100, 760); ctx.fill();
  rr(260, 480, 260, 220, 6); fs('#a8322a'); ctx.beginPath(); ctx.moveTo(240, 490); ctx.lineTo(390, 400); ctx.lineTo(540, 490); ctx.closePath(); fs('#7a2a20'); rr(350, 580, 80, 120, 4); fs('#f4e8d0');
  rr(1240, 520, 420, 220, 6); fs('#f0f0e0'); rr(1220, 470, 460, 60, 8); fs('#e0263c'); text('24 / 7  GAS', 1450, 502, '700 40px Fredoka', '#fff'); rr(1290, 600, 120, 140, 4); fs('#9ac8e0', 3);
  ground(760, '#c8a868', '#a88848'); ctx.fillStyle = '#5a5a5a'; ctx.fillRect(-100, 870, W + 200, 160); for (let x = -100; x < W + 100; x += 260) rr(x, 945, 140, 12, 6), ctx.fillStyle = PAL.gold, ctx.fill();
}
function sfBG(t, chinatown) {
  ctx.fillStyle = grad(-100, 760, ['#8ab0c8', '#c8d8e0', '#f0e8d8']); ctx.fillRect(-100, -100, W + 200, 900);
  ctx.save(); ctx.strokeStyle = '#c8402a'; ctx.lineWidth = 14; for (const x of [1300, 1700]) { line(x, 640, x, 200, 22, '#c8402a'); } ctx.beginPath(); ctx.moveTo(1100, 420); ctx.quadraticCurveTo(1500, 760, 1900, 420); ctx.lineWidth = 6; ctx.stroke(); line(1050, 560, 1980, 560, 16, '#c8402a'); ctx.restore();
  ctx.fillStyle = 'rgba(255,255,255,.5)'; for (let i = 0; i < 4; i++) { ell((i * 600 + t * 30) % 2400 - 200, 600 + i * 20, 400, 60); ctx.fill(); }
  for (let i = 0; i < 9; i++) { const x = -60 + i * 130, h = 260 + (i % 3) * 60; rr(x, 760 - h, 120, h, 4); fs(['#f0d8c0', '#d8e0f0', '#f0e0e8'][i % 3]); for (let wy = 790 - h; wy < 730; wy += 50) { rr(x + 20, wy, 30, 30, 3); fs('#7aa8c8', 2); rr(x + 70, wy, 30, 30, 3); fs('#7aa8c8', 2); } }
  if (chinatown) { for (let i = 0; i < 7; i++) { const x = 140 + i * 260; line(x, 120, x + 260, 160, 3, '#3a2a2a'); ell(x + 130, 190 + Math.sin(t * 2 + i) * 6, 30, 38); ctx.save(); ctx.shadowColor = '#ff4a2a'; ctx.shadowBlur = 25; fs('#e0263c', 3); ctx.restore(); } }
  ground(760, '#b8b0a8', '#989088'); ctx.fillStyle = '#5a5a62'; ctx.fillRect(-100, 870, W + 200, 160);
}
function vegasBG(t) {
  ctx.fillStyle = grad(-100, 760, ['#06041a', '#1a0a3a', '#5a1a6a']); ctx.fillRect(-100, -100, W + 200, 900);
  const r = rand(4); for (let i = 0; i < 60; i++) { ell(r() * W, r() * 300, 2, 2); ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fill(); }
  const B = [[60, 260, 460, '#f0c040', 'CASINO'], [380, 220, 380, '#e0263c', 'HOTEL'], [660, 300, 520, '#3ad0c0', 'FOUR DRAGONS'], [1020, 260, 420, '#f08aa8', 'LUCKY 7'], [1340, 300, 500, '#f0c040', 'CASINO'], [1700, 240, 360, '#8a3cc0', 'SLOTS']];
  for (const [x, w, h, c, sname] of B) { rr(x, 760 - h, w, h, 4); fs('#1e1630'); for (let wy = 790 - h; wy < 740; wy += 40) for (let wx = x + 16; wx < x + w - 20; wx += 30) { ctx.fillStyle = (wx * 7 + wy) % 5 < 2 ? '#ffd27a' : '#2a2040'; ctx.fillRect(wx, wy, 14, 18); }
    ctx.save(); ctx.shadowColor = c; ctx.shadowBlur = 30 + 8 * Math.sin(t * 7 + x); rr(x, 760 - h, w, h, 4); ctx.lineWidth = 5; ctx.strokeStyle = c; ctx.stroke(); ctx.restore(); neonText(sname, x + w / 2, 730 - h, '700 40px Fredoka', c, t, 24); }
  ground(760, '#3a2a4a', '#1e1630');
}
function jetpackCJ(x, y, s, t) {
  ctx.save(); for (const dx of [-50, 50]) { const fl = 80 + 30 * Math.sin(t * 30 + dx); ctx.beginPath(); ctx.moveTo(x + dx * s - 22 * s, y - 380 * s); ctx.quadraticCurveTo(x + dx * s, y - 380 * s + fl * 2 * s, x + dx * s + 22 * s, y - 380 * s); ctx.closePath(); ctx.shadowColor = '#ffb030'; ctx.shadowBlur = 40; ctx.fillStyle = '#ffb030'; ctx.fill(); } ctx.restore();
  rr(x - 80 * s, y - 520 * s, 160 * s, 150 * s, 20 * s); fs('#8a8a9a');
  person({ ...CJ, x, y, s, mouth: 'grin', armL: .5, armR: .5, seed: 1 }, t);
}
function fireTruck(x, y, s, rot) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  rr(-360, -200, 720, 160, 14); fs('#d82a2a'); rr(180, -300, 180, 120, 10); fs('#d82a2a'); rr(200, -285, 140, 70, 6); fs('#9ac8e0', 3);
  line(-340, -230, 160, -260, 12, '#c8c8c8'); for (let i = -320; i < 160; i += 40) line(i, -228, i + 4, -256, 6, '#c8c8c8');
  for (const wx of [-240, 0, 260]) { ell(wx, -30, 52, 52); fs('#1a1a1a'); ell(wx, -30, 22, 22); fs('#aaa', 4); }
  ctx.restore();
}
function fires(t, xs, base) { for (const x of xs) { for (let i = 0; i < 3; i++) { const h = 70 + 40 * Math.sin(t * 9 + x + i); ctx.beginPath(); ctx.moveTo(x - 40 + i * 30, base); ctx.quadraticCurveTo(x - 25 + i * 30, base - h * 2, x - 10 + i * 30, base); ctx.fillStyle = i % 2 ? '#ff8a3a' : '#ffc84a'; ctx.fill(); } } }

const STORY = [
  { id: 'crew', pops: () => [[at('crew', 'old crew'), 'whoosh'], [at('crew', 'Sweet doesn')], [at('crew', 'Ryder doesn')], [at('crew', 'And Big Smoke')], [at('crew', 'orders enough'), 'ding'], [at('crew', 'Remember Big Smoke') - .2, 'swish'], [at('crew', 'Remember Big Smoke') + .2]],
    draw(t) {
      groveBG(t, 'day');
      const S = { ...SWEET, x: 420, y: 1000, s: .95, pop: popS(t, at('crew', 'Sweet doesn')), brow: 'angry', seed: 2 };
      const R = { ...RYDER, x: 720, y: 1000, s: .85, pop: popS(t, at('crew', 'Ryder doesn')), look: Math.sin(t * 3) * 10, seed: 3 };
      const B = { ...SMOKE, x: 1080, y: 1000, s: .95, pop: popS(t, at('crew', 'And Big Smoke')), mouth: 'grin', seed: 4 };
      person(S, t); person(R, t); person(B, t); person({ ...CJ, x: 1440, y: 1000, s: .95, seed: 1 }, t);
      counter(t, at('crew', 'Sweet doesn'), 420, 260, 'TRUSTS YOU', '0%', { col: PAL.pink });
      counter(t, at('crew', 'Ryder doesn'), 720, 420, 'TRUSTS ANYONE', '0%', { col: PAL.pink, rot: .03 });
      pill(t, at('crew', 'nicest guy'), 1080, 260, 'BIG SMOKE', 'nicest guy you know', { rot: -.03 });
      if (t > at('crew', 'orders enough')) { const os = popS(t, at('crew', 'orders enough')); ctx.save(); ctx.translate(1100, 560); ctx.rotate(.05); ctx.scale(os, os); rr(-150, -150, 300, 300, 8); fs('#fff8e8', 5); text('ORDER #1', 0, -110, '700 30px Fredoka', INK); ['2x #9', '#9 large', '#6 extra dip', '#7', '2x #45', 'large soda'].forEach((l, i) => text(l, -120, -60 + i * 38, '600 30px Caveat', INK, 'left')); ctx.restore(); }
      memoryBoard(t, at('crew', 'Remember Big Smoke') - .3, 0, 1, { tNew: at('crew', 'Remember Big Smoke') + .1 });
      eraTag(t, 'GROVE STREET · 1992');
    } },
  { id: 'train', pops: () => [[at('train', 'win the streets')], [at('train', 'Spray tags'), 'swish'], [at('train', 'turf wars'), 'stamp'], [at('train', 'very long chase'), 'whoosh'], [at('train', 'yelling'), 'ding']],
    draw(t) {
      const tc = at('train', 'very long chase');
      if (t < tc) {
        groveBG(t, 'sunset');
        const sp = clamp((t - at('train', 'Spray tags')) / 1.2); if (sp > 0) { ctx.save(); ctx.translate(560, 640); ctx.rotate(-.06); ctx.beginPath(); ctx.rect(-200, -80, 400 * sp, 160); ctx.clip(); text('GSF', 0, 0, '700 120px Pacifico', '#2fbf4a'); ctx.restore(); }
        person({ ...CJ, x: 960, y: 1000, s: .95, mouth: 'smirk', seed: 1 }, t);
        counter(t, at('train', 'win the streets'), 1500, 220, 'GROVE TERRITORY', Math.floor(lerp(10, 60, clamp(t / tc))) + '%', { col: PAL.pink });
        stampText(t, at('train', 'turf wars'), 960, 200, 'TURF WARS', .9); eraTag(t, 'LOS SANTOS · 1992'); return;
      }
      desertBG(t); tracks(860); train(lerp(1600, 2400, clamp((t - tc) / 6)), 860, 1);
      const bx = 700 + Math.sin(t * 2) * 30; bmxRider(CJ, bx, 1020, .8, t, false, { mouth: 'frown', brow: 'angry', seed: 1 });
      person({ ...SMOKE, x: 260, y: 1000, s: .85, mouth: 'grin', brow: 'angry', seed: 4 }, t);
      bubble(t, at('train', 'yelling'), 470, 420, 'FOLLOW THE TRAIN, CJ!', {});
      eraTag(t, 'THE TRAIN · AGAIN');
    } },
  { id: 'ch1', len: 1.85, pops: () => [[.1, 'stamp']], draw: t => chapterCJ(t, 'I', 'The Betrayal') },
  { id: 'sabre', pops: () => [[at('sabre', 'stop an ambush'), 'whoosh'], [at('sabre', 'green car'), 'ding'], [at('sabre', 'Big Smoke and Ryder')], [at('sabre', 'laughing with Tenpenny'), 'stamp'], [at('sabre', 'sold out'), 'stamp']],
    draw(t) {
      groveBG(t, 'ballas'); nightShade(.5);
      const gc = popS(t, at('sabre', 'green car')); if (gc > 0) { car(1250, 1060, .95 * gc, '#2f8a3a'); ctx.save(); ctx.shadowColor = '#5fd86a'; ctx.shadowBlur = 40; pill(t, at('sabre', 'green car'), 1250, 760, 'THE GREEN CAR', null, { bg: '#c8f0c8' }); ctx.restore(); }
      person({ ...SMOKE, x: 1050, y: 1000, s: .9, pop: popS(t, at('sabre', 'Big Smoke and Ryder')), mouth: 'grin', seed: 4 }, t);
      person({ ...RYDER, x: 1300, y: 1000, s: .82, pop: popS(t, at('sabre', 'Big Smoke and Ryder') + .2), mouth: 'grin', seed: 3 }, t);
      person({ ...COP, x: 1560, y: 1000, s: .95, pop: popS(t, at('sabre', 'laughing with Tenpenny')), mouth: 'grin', seed: 5 }, t);
      person({ ...CJ, x: 360, y: 1000, s: .95, brow: t > at('sabre', 'green car') ? 'angry' : 'normal', mouth: t > at('sabre', 'sold out') ? 'frown' : 'flat', seed: 1 }, t);
      person({ ...SWEET, x: 600, y: 1000, s: .95, brow: 'angry', mouth: 'frown', seed: 2 }, t);
      stampText(t, at('sabre', 'sold out'), 1300, 260, 'TRAITORS', 1);
      eraTag(t, 'THE GREEN SABRE · NIGHT');
    } },
  { id: 'exile', pops: () => [[at('exile', 'Sweet gets shot'), 'stamp'], [at('exile', 'locked up')], [at('exile', 'Tenpenny drives'), 'whoosh'], [at('exile', 'middle of nowhere')], [at('exile', 'Or else'), 'stamp']],
    draw(t) {
      const td = at('exile', 'Tenpenny drives');
      if (t < td) {
        ctx.fillStyle = grad(-100, 1180, ['#1a1a2a', '#3a3a4a']); ctx.fillRect(-100, -100, W + 200, H + 200);
        person({ ...SWEET, shirt: '#e8822a', sleeve: '#e8822a', pants: '#e8822a', x: 960, y: 1000, s: 1, brow: 'angry', mouth: 'frown', seed: 2 }, t);
        for (let x = 520; x < 1420; x += 110) { rr(x, -100, 26, 1300, 12); fs('#5a5a78', 4); }
        stampText(t, at('exile', 'Sweet gets shot'), 960, 180, 'SWEET: LOCKED UP', .9); return;
      }
      countryBG(t); nightShade(.55);
      policeCar(lerp(1300, 2600, eio(prog(t, at('exile', 'middle of nowhere'), 2))), 1000, .85, t);
      person({ ...CJ, x: 600, y: 1000, s: .95, brow: 'angry', mouth: 'frown', seed: 1 }, t);
      pill(t, at('exile', 'middle of nowhere'), 960, 180, 'THE MIDDLE OF NOWHERE', 'population: you');
      bubble(t, at('exile', 'Or else') - .1, 1300, 380, 'Stay here. Or else.', { left: true });
      eraTag(t, 'RED COUNTY');
    } },
  { id: 'ch2', len: 1.85, pops: () => [[.1, 'stamp']], draw: t => chapterCJ(t, 'II', 'Out of Town') },
  { id: 'country', pops: () => [[at('country', 'rob your way'), 'stamp'], [at('country', 'Catalina')], [at('country', 'very into you'), 'ding'], [at('country', 'very into crime'), 'stamp'], [at('country', 'San Fierro'), 'whoosh'], [at('country', 'buy a garage'), 'ding']],
    draw(t) {
      const tf = at('country', 'San Fierro');
      if (t < tf) {
        countryBG(t);
        person({ ...CJ, x: 640, y: 1000, s: .95, brow: 'worried', seed: 1 }, t);
        const C = { ...CATALINA, x: 1000, y: 1000, s: .9, pop: popS(t, at('country', 'Catalina')), seed: 6 }; person(C, t);
        pill(t, at('country', 'Catalina'), 1000, 300, 'CATALINA', "Cesar's cousin");
        counter(t, at('country', 'very into you'), 1480, 260, 'INTO YOU', '100%', { col: PAL.pink });
        counter(t, at('country', 'very into crime'), 1480, 470, 'INTO CRIME', '200%', { col: '#e0263c', rot: .03 });
        stampText(t, at('country', 'rob your way'), 520, 200, 'ROBBED', .8); eraTag(t, 'THE COUNTRYSIDE'); return;
      }
      sfBG(t, false); rr(500, 470, 620, 290, 6); fs('#d8d0c8'); rr(480, 420, 660, 70, 8); fs('#2f8a3a'); text("CJ'S GARAGE", 810, 457, '700 44px Fredoka', '#fff', 'center', 'middle', '4px'); rr(560, 560, 300, 200, 6); fs('#5a5a62');
      for (let y = 570; y < 760; y += 24) line(560, y, 860, y, 3, 'rgba(0,0,0,.3)');
      person({ ...CJ, x: 1100, y: 1000, s: .95, mouth: 'smirk', seed: 1 }, t);
      pill(t, at('country', 'buy a garage'), 1100, 280, 'NEW BUSINESS', 'a garage. legit. mostly.');
      eraTag(t, 'SAN FIERRO');
    } },
  { id: 'woozie', pops: () => [[at('woozie', 'meet Woozie')], [at('woozie', 'completely blind'), 'stamp'], [at('woozie', 'Nobody tells him'), 'swish'], [at('woozie', 'best friends'), 'ding'], [at('woozie', 'And Ryder'), 'whoosh'], [at('woozie', 'end of Ryder'), 'stamp']],
    draw(t) {
      const tr = at('woozie', 'And Ryder');
      if (t < tr) {
        sfBG(t, true);
        const Wz = { ...WOOZIE, x: 1100, y: 1000, s: .95, pop: popS(t, at('woozie', 'meet Woozie')), look: 18, seed: 7 }; person(Wz, t);
        person({ ...CJ, x: 680, y: 1000, s: .95, mouth: t > at('woozie', 'best friends') ? 'grin' : 'flat', seed: 1 }, t);
        pill(t, at('woozie', 'meet Woozie'), 1100, 280, 'WOOZIE', 'Triad boss');
        counter(t, at('woozie', 'completely blind'), 1560, 300, 'EYESIGHT', '0%', { col: PAL.pink });
        pill(t, at('woozie', 'Nobody tells him'), 1520, 520, 'NOBODY TELLS HIM', null, { bg: PAL.mint, rot: .04 });
        eraTag(t, 'SAN FIERRO · CHINATOWN'); return;
      }
      ctx.fillStyle = grad(-100, 620, ['#060a1a', '#1a2a4a']); ctx.fillRect(-100, -100, W + 200, 740); ctx.fillStyle = grad(620, 1080, ['#1a2a5a', '#0a1430']); ctx.fillRect(-100, 620, W + 200, 460);
      ctx.fillStyle = '#7a5a3a'; ctx.fillRect(-100, 820, W + 200, 260); for (let x = -100; x < W + 100; x += 90) line(x, 820, x, 1080, 3, 'rgba(0,0,0,.35)'); for (const [x, y] of [[1350, 720], [1470, 720], [1410, 620]]) { rr(x, y, 120, 100, 4); fs('#b07a4a'); }
      person({ ...RYDER, x: 1200, y: 1000, s: .85, alpha: 1 - clamp((t - at('woozie', 'end of Ryder')) / .8), mouth: 'frown', seed: 3 }, t);
      person({ ...CJ, x: 600, y: 1000, s: .95, brow: 'angry', seed: 1 }, t);
      counter(t, at('woozie', 'end of Ryder') + .2, 960, 200, 'RYDER', 'GONE', { col: INK }); strike(t, at('woozie', 'end of Ryder') + .5, 860, 250, 1060, PAL.pink);
      eraTag(t, 'SAN FIERRO DOCKS');
    } },
  { id: 'ch3', len: 1.85, pops: () => [[.1, 'stamp']], draw: t => chapterCJ(t, 'III', 'Las Venturas') },
  { id: 'venturas', pops: () => [[at('venturas', 'rob the biggest casino'), 'stamp'], [at('venturas', 'jetpack'), 'whoosh'], [at('venturas', 'buy an airport'), 'ding'], [at('venturas', 'Normal stuff')]],
    draw(t) {
      const tj = at('venturas', 'jetpack'), ta = at('venturas', 'buy an airport');
      if (t < tj) {
        vegasBG(t); person({ ...CJ, jacket: '#1a1a1a', longSleeve: true, sleeve: '#1a1a1a', tie: '#c8322a', shirt: '#f4f4ee', x: 700, y: 1000, s: .95, mouth: 'smirk', seed: 1 }, t);
        person({ ...WOOZIE, x: 1100, y: 1000, s: .95, look: 18, seed: 7 }, t);
        counter(t, at('venturas', 'rob the biggest casino') + .2, 1560, 300, 'CASINO VAULT', '$' + Math.floor(lerp(0, 9000000, clamp((t - at('venturas', 'rob the biggest casino')) / 1.5))).toLocaleString('en-US'), { col: '#14a36a' });
        stampText(t, at('venturas', 'rob the biggest casino'), 900, 200, 'HEIST', 1); eraTag(t, 'LAS VENTURAS'); return;
      }
      if (t < ta) {
        desertBG(t); rr(-100, 620, W + 200, 10, 0); for (let x = -100; x < W + 100; x += 30) line(x, 560, x, 640, 3, '#7a7a7a'); line(-100, 570, W + 100, 570, 3, '#7a7a7a');
        rr(1300, 420, 460, 220, 10); fs('#9a9a8a'); rr(1260, 370, 540, 70, 6); fs('#5a5a4a'); text('RESTRICTED · AREA 69', 1530, 405, '700 36px Fredoka', '#f0c040', 'center', 'middle', '3px');
        const up = eout(prog(t, tj, 2.2)); jetpackCJ(lerp(700, 1000, up), lerp(1000, 640, up), .85, t);
        pill(t, tj + .3, 560, 200, 'STOLEN', 'one (1) jetpack'); eraTag(t, 'A SECRET MILITARY BASE'); return;
      }
      desertBG(t); ctx.fillStyle = '#5a5a5a'; ctx.fillRect(-100, 760, W + 200, 160); for (let x = -100; x < W + 100; x += 200) rr(x, 830, 110, 14, 4), ctx.fillStyle = '#fff', ctx.fill();
      rr(1260, 480, 520, 280, 20); fs('#b8b8a8'); text('VERDANT MEADOWS', 1520, 540, '700 36px Fredoka', INK);
      ctx.save(); ctx.translate(lerp(1600, 600, prog(t, ta, 4)), 380); ctx.rotate(-.05); rr(-180, -24, 360, 52, 26); fs('#fff'); ctx.beginPath(); ctx.moveTo(-30, 0); ctx.lineTo(-100, 100); ctx.lineTo(-40, 100); ctx.lineTo(40, 0); fs('#fff'); ctx.restore();
      person({ ...CJ, x: 520, y: 1000, s: .95, mouth: 'grin', seed: 1 }, t);
      pill(t, ta, 1520, 250, 'YOU OWN AN AIRPORT', null, { bg: PAL.gold }); pill(t, at('venturas', 'Normal stuff'), 520, 250, 'NORMAL STUFF', null, { bg: PAL.mint, rot: -.04 });
      eraTag(t, 'YOUR AIRPORT');
    } },
  { id: 'madd', pops: () => [[at('madd', 'rhyme book'), 'swish'], [at('madd', 'jump off a roof'), 'stamp'], [at('madd', 'you catch him'), 'whoosh'], [at('madd', 'truck full of boxes'), 'stamp'], [at('madd', 'manage his career'), 'ding']],
    draw(t) {
      const tc = at('madd', 'you catch him'), tm = at('madd', 'manage his career');
      if (t < tm) {
        laSky(t, 'sunset'); rr(200, 260, 700, 900, 0); fs('#5a4a5a'); for (let y = 300; y < 1080; y += 70) for (let x = 240; x < 860; x += 90) { rr(x, y, 50, 40, 3); ctx.fillStyle = '#ffd27a'; ctx.fill(); }
        rr(180, 240, 740, 30, 4); fs('#3a2a3a');
        const fall = t > tc ? eio(prog(t, tc, 1.2)) : 0;
        person({ ...MADD, x: lerp(820, 1200, fall), y: lerp(240, 900, fall), s: .7, seed: 8 }, t);
        if (t > tc - .6) { const tx = lerp(2200, 1260, eout(prog(t, tc - .6, .8))); rr(tx - 250, 820, 500, 180, 14); fs('#e8e0d0'); rr(tx + 250, 860, 160, 140, 14); fs('#3a6ae0'); for (let i = 0; i < 6; i++) { rr(tx - 220 + (i % 3) * 140, 760 - Math.floor(i / 3) * 70, 120, 70, 4); fs('#c89a5a'); } for (const wx of [tx - 150, tx + 300]) { ell(wx, 1010, 46, 46); fs('#1a1a1a'); } }
        const bs = popS(t, at('madd', 'rhyme book')); if (bs > 0 && t < at('madd', 'jump off a roof')) { ctx.save(); ctx.translate(1300, 400); ctx.scale(bs, bs); ctx.rotate(-.1); rr(-130, -170, 260, 340, 10); fs('#2a2a2a'); text('RHYMES', 0, -60, '700 44px Fredoka', PAL.gold); text('Madd Dogg', 0, 0, '600 40px Caveat', '#fff'); ctx.restore(); }
        pill(t, at('madd', 'jump off a roof'), 1400, 200, 'MADD DOGG', 'famous rapper · having a bad day');
        stampText(t, at('madd', 'truck full of boxes'), 1300, 420, 'CAUGHT', 1); eraTag(t, 'LAS VENTURAS'); return;
      }
      rays(t, '#1a0f0a', '#f0c040', '#2fbf4a');
      person({ ...MADD, x: 760, y: 1000, s: .95, mouth: 'grin', brow: 'normal', seed: 8 }, t); person({ ...CJ, x: 1160, y: 1000, s: .95, mouth: 'grin', seed: 1 }, t);
      const gs = popS(t, tm); if (gs > 0) { ctx.save(); ctx.translate(960, 300); ctx.scale(gs, gs); ell(0, 0, 150, 150); fs('#f0c040', 6); ell(0, 0, 50, 50); fs('#1a1a1a', 4); text('GOLD', 0, 110, '700 30px Fredoka', INK); ctx.restore(); }
      pill(t, tm + .2, 960, 520, 'YOUR CLIENT', 'Madd Dogg · back on top');
    } },
  { id: 'midcta', pops: () => [[.2, 'stamp'], [at('midcta', 'Which')], [at('midcta', 'Drop')], [at('midcta', 'Drop') + .3], [at('midcta', 'Drop') + .6], [at('midcta', 'most liked'), 'ding']],
    draw(t) {
      rays(t, '#0e1a0e', '#2fbf4a', '#f0c040'); const sp = popS(t, .1); ctx.save(); ctx.translate(960, 150); ctx.scale(sp, sp); rr(-220, -55, 440, 110, 55); fs('#fff', 5); text('❚❚  QUICK PAUSE', 0, 4, '700 46px Fredoka', INK); ctx.restore();
      const k = eout(prog(t, at('midcta', 'Which'), .4)); if (k <= 0) return; ctx.save(); ctx.globalAlpha = k; ctx.translate(0, lerp(80, 0, k));
      rr(460, 260, 1000, 700, 26); fs('#141e14', 5); text('Which character should be born next?', 960, 330, '700 44px Fredoka', '#fff');
      [['Niko Bellic', 'cousin, lets go bowling', 9900], ['Trevor Philips', 'pure chaos please', 7600], ['Franklin', 'the next Grove Street story', 5300], ['Arthur Morgan', 'already done by others, do it better', 4100]].forEach(([nm, c, likes], i) => {
        const ti = at('midcta', 'Drop') + i * .3; if (t < ti) return; const s = popS(t, ti); ctx.save(); ctx.translate(510, 410 + i * 130); ctx.scale(1, s);
        ell(40, 0, 36, 36); fs([PAL.pink, PAL.gold, PAL.orange, PAL.purple][i], 3); text(nm[0], 40, 2, '700 36px Fredoka', '#fff'); text(nm, 100, -18, '700 34px Fredoka', '#fff', 'left'); text(c, 100, 22, '500 28px Fredoka', '#a8c8a8', 'left');
        text('♥ ' + Math.floor(likes * (1 + clamp(t - ti, 0, 3) * .05)).toLocaleString('en-US'), 880, 0, '700 32px Fredoka', PAL.pink, 'right'); ctx.restore(); });
      ctx.restore(); pill(t, at('midcta', 'most liked'), 1500, 900, 'MOST LIKED = NEXT', null, { bg: PAL.gold, rot: -.05 });
    } },
  { id: 'ch4', len: 1.85, pops: () => [[.1, 'stamp']], draw: t => chapterCJ(t, 'IV', 'Home') },
  { id: 'riots', pops: () => [[at('riots', 'Sweet finally'), 'ding'], [at('riots', 'walks free'), 'stamp'], [at('riots', 'riots'), 'whoosh'], [at('riots', 'go home')]],
    draw(t) {
      const tr = at('riots', 'riots');
      groveBG(t, 'sunset'); if (t > tr) { nightShade(.5); fires(t, [200, 620, 1050, 1500, 1800], 760); smoke(t, tr, 960, 300, 8); }
      person({ ...SWEET, x: 700, y: 1000, s: .95, mouth: 'grin', pop: popS(t, at('riots', 'Sweet finally')), seed: 2 }, t);
      person({ ...CJ, x: 1050, y: 1000, s: .95, mouth: t > tr ? 'flat' : 'grin', brow: t > tr ? 'angry' : 'normal', seed: 1 }, t);
      pill(t, at('riots', 'Sweet finally'), 700, 300, 'SWEET', 'out of jail');
      stampText(t, at('riots', 'walks free'), 1400, 260, 'TENPENNY: NOT GUILTY', .7);
      pill(t, at('riots', 'go home'), 960, 140, 'TIME TO GO HOME', null, { bg: PAL.mint });
      eraTag(t, 'LOS SANTOS · THE RIOTS');
    } },
  { id: 'smoke', pops: () => [[at('smoke', 'Big Smoke at the top'), 'whoosh'], [at('smoke', 'oldest friend')], [at('smoke', 'just wanted the money'), 'swish'], [at('smoke', 'Remember the nice guy') - .2, 'swish'], [at('smoke', 'Not so nice'), 'stamp']],
    draw(t) {
      ctx.fillStyle = grad(-100, 1180, ['#0a140a', '#1e2a1e']); ctx.fillRect(-100, -100, W + 200, H + 200);
      for (let i = 0; i < 5; i++) { rr(100 + i * 380, 120, 220, 560, 4); fs('#1a2a1a'); ctx.fillStyle = `rgba(95,216,106,${.15 + .1 * Math.sin(t * 2 + i)})`; ctx.fillRect(110 + i * 380, 130, 200, 540); }
      ground(860, '#2a3a2a', '#1a241a');
      const sm = t > at('smoke', 'Not so nice') + .6 ? 1 - clamp((t - at('smoke', 'Not so nice') - .6) / .8) : 1;
      person({ ...SMOKE, x: 880, y: 1000, s: 1, mouth: t > at('smoke', 'just wanted') ? 'smirk' : 'grin', brow: 'angry', alpha: sm, seed: 4 }, t);
      person({ ...CJ, x: 360, y: 1000, s: .95, brow: 'angry', mouth: 'frown', seed: 1 }, t);
      pill(t, at('smoke', 'oldest friend'), 880, 230, 'BIG SMOKE', 'your oldest friend');
      bubble(t, at('smoke', 'just wanted the money'), 700, 330, 'It was just business, CJ.', {});
      memoryBoard(t, at('smoke', 'Remember the nice guy') - .3, 0, 1, { hi: [1], tHi: at('smoke', 'Not so nice') });
      eraTag(t, 'THE CRACK PALACE');
    } },
  { id: 'tenpenny', pops: () => [[at('tenpenny', 'fire truck'), 'whoosh'], [at('tenpenny', 'off a bridge'), 'stamp'], [at('tenpenny', 'Remember Tenpenny') - .2, 'swish'], [at('tenpenny', 'remembers him too'), 'ding']],
    draw(t) {
      groveBG(t, 'sunset'); rr(-100, 260, W + 200, 60, 0); fs('#8a8a8a'); for (let x = 0; x < W; x += 320) { rr(x, 320, 50, 440, 4); fs('#7a7a7a'); }
      const tb = at('tenpenny', 'off a bridge'), drive = clamp((t - at('tenpenny', 'fire truck')) / 1.6), fall = clamp((t - tb) / 1.1);
      const fx = lerp(-400, 760, eio(drive)) + fall * 160, fy = 250 + fall * fall * 680;
      fireTruck(fx, fy, .7, fall * .6);
      if (fall >= 1) { smoke(t, tb + 1.1, 900, 900, 6); }
      person({ ...CJ, x: 180, y: 1000, s: .9, mouth: fall >= 1 ? 'smirk' : 'flat', seed: 1 }, t); person({ ...SWEET, x: 380, y: 1000, s: .86, seed: 2 }, t);
      pill(t, at('tenpenny', 'fire truck'), 960, 140, 'TENPENNY', 'stole a fire truck');
      memoryBoard(t, at('tenpenny', 'Remember Tenpenny') - .3, 0, 1, { hi: [0], tHi: at('tenpenny', 'remembers him too') - .3 });
      eraTag(t, 'GROVE STREET');
    } },
  { id: 'ending', pops: () => [[.3, 'swish'], [at('ending', 'Framed')], [at('ending', 'exiled')], [at('ending', 'betrayed')], [at('ending', 'running half'), 'stamp'], [at('ending', 'Not bad')]],
    draw(t) {
      groveBG(t, 'sunset');
      person({ ...SWEET, x: 260, y: 1000, s: .95, mouth: 'grin', seed: 2 }, t); person({ ...KENDL, x: 470, y: 1000, s: .82, seed: 9 }, t); person({ ...CJ, x: 700, y: 1000, s: 1, mouth: 'smirk', seed: 1 }, t);
      const k = eout(prog(t, .2, .5)); ctx.save(); ctx.translate(lerp(800, 0, k), 0); ctx.rotate(-.025); parchment(1040, 180, 680, 560); text("CJ'S LIFE", 1380, 250, '700 52px Almendra', '#1e5a28');
      [['Framed', 'Framed'], ['Exiled', 'exiled'], ['Betrayed', 'betrayed'], ['Running half the state', 'running half']].forEach(([lab, ph], i) => { const tc = at('ending', ph); if (t < tc) return; ctx.save(); ctx.globalAlpha = clamp((t - tc) / .2); text('•  ' + lab, 1100, 340 + i * 90, '700 52px Caveat', INK, 'left'); ctx.restore(); if (i < 3) strike(t, tc + .25, 1130, 340 + i * 90, 1130 + (lab.length * 22), '#c8322a', 6); });
      ctx.restore();
      pill(t, at('ending', 'Not bad'), 1380, 860, 'NOT BAD', 'for a guy who started on a BMX', { bg: PAL.mint });
      bmx(160 + ((t * 60) % 400), 1060, .5, t);
    } },
  { id: 'outro', extra: 1.8, pops: () => [[.4], [1.4, 'stamp']],
    draw(t) {
      const g = ctx.createRadialGradient(960, 560, 100, 960, 560, 1100); g.addColorStop(0, '#4a3020'); g.addColorStop(1, '#120a06'); ctx.fillStyle = g; ctx.fillRect(-100, -100, W + 200, H + 200);
      rr(150, 560, 70, 300, 10); fs('#f3ead6'); ell(185, 860, 110, 22); fs('#8a6a40'); const fl = Math.sin(t * 13) * 4; ctx.beginPath(); ctx.moveTo(185, 470 + fl); ctx.quadraticCurveTo(212, 530, 185, 552); ctx.quadraticCurveTo(158, 530, 185, 470 + fl); ctx.fillStyle = '#ffd36b'; ctx.fill();
      rr(300, 160, 1320, 800, 18); fs('#2a3a20'); rr(330, 180, 630, 760, 10); fs('#f3e6c8'); rr(960, 180, 630, 760, 10); fs('#f3e6c8');
      ctx.save(); ctx.globalAlpha = clamp((t - .3) / .5); text('Would you have', 645, 330, '700 64px Almendra', '#1a2a10'); text('trusted Big Smoke?', 645, 410, '700 60px Almendra', '#1a2a10');
      text('Which character should be born next?', 645, 520, '700 40px Caveat', '#4a6a3a'); text('Tell me in the comments.', 645, 570, '700 40px Caveat', '#4a6a3a'); ctx.restore();
      ctx.save(); ctx.globalAlpha = clamp((t - .8) / .5); text('the next life', 1280, 230, '600 34px Caveat', '#4a6a3a'); rr(1090, 270, 380, 320, 6); ctx.setLineDash([14, 10]); fs(null, 4); ctx.setLineDash([]); text('?', 1280, 430, '700 160px Almendra', 'rgba(60,90,50,.35)'); ctx.restore();
      seal(t, 1.4, 1280, 760); text('subscribe', 1280, 860, '600 34px Caveat', '#4a6a3a');
      text('Unofficial fan work. Not affiliated with or endorsed by Rockstar Games or Take-Two Interactive.', 960, 1050, '500 20px Fredoka', 'rgba(255,255,255,.6)');
    } },
];
SCENES.push(...STORY);
