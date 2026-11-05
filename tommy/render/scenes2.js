// Plant/payoff memory board + new scenes (gangs, lance, midcta, heist) and rewritten empire/betrayal/finale/ending.
const MEM = [['CHILDHOOD', '= ???'], ['SONNY', 'never visits'], ['KEN', 'survives'], ['LANCE', 'wants to matter'], ['PRINT SHOP', 'normal paper :)']];
const MEMCOL = ['#fff1a0', '#ffd1e3', '#c8f5ff', '#e0d0ff', '#c8f5d8'];
// board slides in at t0 (out at t1), shows notes 0..upto, newest pops at tNew, circles indices in `hi` at tHi
function memoryBoard(t, t0, t1, upto, o = {}) {
  const k = eout(prog(t, t0, .45)) - (t1 ? eout(prog(t, t1, .4)) : 0); if (k <= 0) return;
  ctx.save(); ctx.translate(lerp(900, 0, k), 0); ctx.rotate(.015);
  cork(1180, 110, 680, 760);
  rr(1350, 140, 340, 44, 4); fs('#f6efdc', 3); text('THINGS TO REMEMBER', 1520, 164, '600 26px Fredoka', INK, 'center', 'middle', '2px');
  for (let i = 0; i <= upto; i++) {
    const isNew = i === upto && o.tNew !== undefined; const s = isNew ? popS(t, o.tNew) : 1; if (s <= 0) continue;
    const x = 1360 + (i % 2) * 320 - (i % 2 ? 0 : 0), y = 300 + Math.floor(i / 2) * 200;
    ctx.save(); ctx.translate(x, y); ctx.rotate((i % 3 - 1) * .05); ctx.scale(s, s);
    rr(-140, -80, 280, 160, 4); fs(MEMCOL[i], 4);
    text(MEM[i][0], 0, -24, '700 44px Caveat', INK); text(MEM[i][1], 0, 30, '700 40px Caveat', '#e0263c');
    ell(0, -76, 12, 12); fs('#e0263c', 3); ctx.restore();
    if (o.hi && o.hi.includes(i)) scribbleCircle(t, o.tHi + o.hi.indexOf(i) * .5, x, y, 170, 105, PAL.pink);
  }
  ctx.restore();
}
function moneyStack(x, y, s, fake) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3 - (r > 1 ? 1 : 0); c++) { const bx = -150 + c * 100 + (r > 1 ? 50 : 0), by = -r * 34; rr(bx, by - 30, 96, 34, 4); fs('#7fd8a0', 3); line(bx + 10, by - 13, bx + 86, by - 13, 2, '#14a36a'); text('$', bx + 48, by - 13, '700 24px Fredoka', '#14a36a'); }
  if (fake) { ctx.save(); ctx.rotate(-.15); rr(-110, -100, 220, 50, 6); ctx.lineWidth = 5; ctx.strokeStyle = '#e0263c'; ctx.stroke(); text('PRINT SHOP', 0, -74, '700 30px Fredoka', '#e0263c'); ctx.restore(); }
  ctx.restore();
}
const CUBAN = { hair: 'short', hairCol: '#14100e', skin: '#d9a07a', shirt: '#ffffff', pants: '#2b3a6a', mouth: 'smirk', brow: 'angry', glasses: true };
const HAITIAN = { hair: 'short', hairCol: '#14100e', skin: '#5a3a26', shirt: '#2fbf6a', pants: '#3a3a4a', mouth: 'smirk', brow: 'angry' };

const NEW_SCENES = {
  prison_board: (t) => memoryBoard(t, at('prison', 'Hold that') - .2, 0, 1, { tNew: at('prison', 'Hold that') + .2 }),
  ken_board: (t) => memoryBoard(t, at('ken', 'Remember that') - .3, 0, 2, { tNew: at('ken', 'Remember that') + .1 }),
  gangs: {
    id: 'gangs',
    pops: () => [[at('gangs', 'Cubans and')], [at('gangs', 'Haitians are')], [at('gangs', 'So you work')], [at('gangs', 'And for the')], [at('gangs', 'Both of them'), 'ding'], [at('gangs', 'Neither')]],
    draw(t) {
      ctx.fillStyle = grad(-100, 900, ['#0e5a8a', '#2a9ad8']); ctx.fillRect(-100, -100, 1060, 1300);
      ctx.fillStyle = grad(-100, 900, ['#0a5a2a', '#2fbf6a']); ctx.fillRect(960, -100, 1060, 1300);
      for (let i = 0; i < 14; i++) { ctx.save(); ctx.translate(960, 1100); ctx.rotate(-Math.PI + i * Math.PI / 13 + Math.sin(t) * .02); ctx.fillStyle = 'rgba(255,255,255,.06)'; ctx.fillRect(0, -30, 2000, 60); ctx.restore(); }
      ctx.save(); ctx.shadowColor = '#fff'; ctx.shadowBlur = 30; line(960, -100, 960, 1200, 10, '#fff'); ctx.restore();
      ctx.fillStyle = 'rgba(20,10,40,.35)'; ctx.fillRect(-100, 900, W + 200, 300);
      const w = (ph) => popS(t, at('gangs', ph));
      [[200, .9], [420, .95]].forEach(([x, s], i) => person({ ...CUBAN, x, y: 980, s, pop: w('Cubans and'), seed: i }, t));
      [[1500, .95], [1720, .9]].forEach(([x, s], i) => person({ ...HAITIAN, x, y: 980, s, pop: w('Haitians are'), seed: i + 4 }, t));
      neonText('CUBANS', 330, 120, '700 72px Fredoka', PAL.teal, t, 20); neonText('HAITIANS', 1600, 120, '700 72px Fredoka', PAL.mint, t, 20);
      const side = t < at('gangs', 'And for the') ? -1 : t < at('gangs', 'Both of them') ? 1 : 0;
      person({ ...TOMMY_VC, x: 960 + side * 200, y: 1000, s: .95, mouth: 'smirk', look: side * 10, tilt: side * .05, seed: 1 }, t);
      counter(t, at('gangs', 'So you work'), 620, 330, 'PAID BY CUBANS', '$$$', { col: '#14a36a' });
      counter(t, at('gangs', 'And for the'), 1300, 330, 'PAID BY HAITIANS', '$$$', { col: '#14a36a', rot: .03 });
      pill(t, at('gangs', 'Neither'), 960, 560, 'NEITHER FINDS OUT', null, { bg: PAL.mint });
      eraTag(t, 'VICE CITY · 1986');
    } },
  lance: {
    id: 'lance',
    pops: () => [[at('lance', 'loud')], [at('lance', 'flashy')], [at('lance', 'important')], [at('lance', 'gets caught'), 'stamp'], [at('lance', 'save him'), 'whoosh'], [at('lance', 'He says')], [at('lance', "doesn't mean"), 'swish']],
    draw(t) {
      viceBG(t, 'night', { car: [1650, PAL.gold, .85, true] });
      const sp = ctx.createRadialGradient(1000, 400, 50, 1000, 400, 520); sp.addColorStop(0, 'rgba(255,201,74,.45)'); sp.addColorStop(1, 'rgba(255,201,74,0)'); ctx.fillStyle = sp; ctx.fillRect(400, 0, 1200, 1000);
      const tc = at('lance', 'gets caught'), ts = at('lance', 'save him');
      const L = { ...LANCE, x: 1000, y: 900, s: 1.0, mouth: t > ts ? 'smirk' : t > tc ? 'frown' : 'grin', brow: t > tc && t < ts ? 'worried' : 'normal', look: t > at('lance', "doesn't mean") ? -12 : 0, glasses: t < tc, seed: 6 };
      person(L, t);
      if (t > tc) { const drop = t < ts ? eout(prog(t, tc, .25)) : 1 - eout(prog(t, ts, .4)); ctx.save(); ctx.translate(1000, lerp(-700, 0, drop)); rr(-200, 150, 400, 760, 10); ctx.lineWidth = 8; ctx.strokeStyle = '#3a3a52'; ctx.stroke(); for (let x = -160; x <= 160; x += 64) line(x, 150, x, 910, 10, '#3a3a52'); ctx.restore(); }
      person({ ...TOMMY_VC, x: lerp(-200, 520, eout(prog(t, ts, .6))), y: 900, s: .95, mouth: 'flat', seed: 1 }, t);
      pill(t, at('lance', 'loud'), 1420, 200, 'LOUD', null, { rot: .05 });
      pill(t, at('lance', 'flashy'), 1560, 320, 'FLASHY', null, { rot: -.04, bg: PAL.gold });
      pill(t, at('lance', 'important'), 1450, 450, 'WANTS TO MATTER', null, { rot: .03 });
      stampText(t, tc, 1000, 120, 'CAUGHT BY DIAZ', .9);
      bubble(t, at('lance', 'He says'), 1250, 260, 'Thanks.', {});
      pill(t, at('lance', "doesn't mean") + .1, 1250, 400, "(he doesn't mean it)", null, { bg: '#ffd1e3', fg: '#e0263c' });
      memoryBoard(t, at('lance', 'Remember that') - .3, 0, 3, { tNew: at('lance', 'Remember that') + .1 });
      eraTag(t, 'VICE CITY · 1986');
    } },
  midcta: {
    id: 'midcta',
    pops: () => [[.2, 'stamp'], [at('midcta', 'Which')], [at('midcta', 'Drop')], [at('midcta', 'Drop') + .3], [at('midcta', 'Drop') + .6], [at('midcta', 'most liked'), 'ding']],
    draw(t) {
      rays(t, '#1a0640', PAL.pink, PAL.purple);
      const sp = popS(t, .1); ctx.save(); ctx.translate(960, 150); ctx.scale(sp, sp); rr(-220, -55, 440, 110, 55); fs('#fff', 5); text('❚❚  QUICK PAUSE', 0, 4, '700 46px Fredoka', INK); ctx.restore();
      const k = eout(prog(t, at('midcta', 'Which'), .4)); if (k <= 0) return;
      ctx.save(); ctx.globalAlpha = k; ctx.translate(0, lerp(80, 0, k));
      rr(460, 260, 1000, 700, 26); fs('#1d1236', 5);
      text('Which character should be born next?', 960, 330, '700 44px Fredoka', '#fff');
      const cm = [['CJ', 'Grove Street. Home.', 9400], ['Niko Bellic', 'cousin, lets go bowling', 7100], ['Trevor Philips', 'chaos incarnate', 5200], ['Lucia', 'GTA 6 drops soon!!', 3800]];
      cm.forEach(([n, c, likes], i) => {
        const ti = at('midcta', 'Drop') + i * .3; if (t < ti) return; const s = popS(t, ti); ctx.save(); ctx.translate(510, 410 + i * 130); ctx.scale(1, s);
        ell(40, 0, 36, 36); fs([PAL.pink, PAL.teal, PAL.orange, PAL.purple][i], 3); text(n[0], 40, 2, '700 36px Fredoka', '#fff');
        text(n, 100, -18, '700 34px Fredoka', '#fff', 'left'); text(c, 100, 22, '500 28px Fredoka', '#b9a8d8', 'left');
        const lk = Math.floor(likes * (1 + clamp(t - ti, 0, 3) * .05)); text('♥ ' + lk.toLocaleString('en-US'), 880, 0, '700 32px Fredoka', PAL.pink, 'right');
        ctx.restore();
      });
      ctx.restore();
      pill(t, at('midcta', 'most liked'), 1500, 900, 'MOST LIKED = NEXT', null, { bg: PAL.gold, rot: -.05 });
    } },
  empire: {
    id: 'empire',
    pops: () => [[at('empire', 'taxi')], [at('empire', 'car showroom')], [at('empire', 'ice cream')], [at('empire', 'print shop')], [at('empire', 'Remember that') + .1, 'stamp']],
    draw(t) {
      rays(t, '#3a0f5e', PAL.pink, PAL.orange);
      const cards = [['taxi', 'TAXI CO.', PAL.gold, iconTaxi], ['car showroom', 'CAR SHOWROOM', PAL.teal, iconCar], ['ice cream', 'ICE CREAM', PAL.hot, iconIce], ['print shop', 'PRINT SHOP', PAL.mint, iconPrint]];
      const focus = t > at('empire', 'Remember that') - .3;
      cards.forEach(([ph, lab, col, ic], i) => {
        const s = popS(t, at('empire', ph)); if (s <= 0) return;
        const x = 330 + (i % 2) * 450, y = i < 2 ? 330 : 720;
        ctx.save(); ctx.translate(x, y); ctx.rotate(i % 2 ? .03 : -.03); ctx.scale(s, s);
        if (focus && lab !== 'PRINT SHOP') ctx.globalAlpha = .35;
        rr(-190, -150, 380, 300, 24); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fill(); rr(-200, -160, 380, 300, 24); fs('#fffaf5');
        rr(-200, -160, 380, 60, [24, 24, 0, 0]); fs(col); text(lab, -10, -128, '700 34px Fredoka', '#fff', 'center', 'middle', '2px');
        ctx.save(); ctx.translate(-10, 20); ic(t); ctx.restore();
        if (lab === 'PRINT SHOP') text('(normal paper)', -10, 112, '600 30px Caveat', '#8a7766');
        ctx.restore();
      });
      memoryBoard(t, at('empire', 'Remember that') - .2, 0, 4, { tNew: at('empire', 'Remember that') + .1 });
      eraTag(t, 'VICE CITY · 1986');
    } },
  heist: {
    id: 'heist',
    pops: () => [[at('heist', 'nightclub')], [at('heist', 'bank robbery'), 'whoosh'], [at('heist', 'called'), 'stamp'], [at('heist', 'real name')], [at('heist', 'had it coming'), 'ding']],
    draw(t) {
      const tb = at('heist', 'bank robbery');
      if (t < tb) {
        ctx.fillStyle = grad(-100, 1180, ['#14062a', '#3a0f5e']); ctx.fillRect(-100, -100, W + 200, H + 200);
        for (let i = 0; i < 8; i++) { const a = t * 1.5 + i; ctx.save(); ctx.globalAlpha = .35; ctx.translate(960, -50); ctx.rotate(Math.sin(a) * .6); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-90, 1200); ctx.lineTo(90, 1200); ctx.fillStyle = [PAL.pink, PAL.teal, PAL.purple, PAL.gold][i % 4]; ctx.fill(); ctx.restore(); }
        ell(960, 150, 90, 90); fs('#d8d8ef'); for (let y = 80; y < 230; y += 26) line(890, y, 1030, y, 3, 'rgba(36,18,46,.35)');
        ctx.fillStyle = '#2a1640'; ctx.fillRect(-100, 900, W + 200, 300);
        person({ ...TOMMY_VC, x: 760, y: 1000, s: .95, mouth: 'smirk', seed: 1 }, t);
        neonText('MALIBU', 1360, 380, '64px Pacifico', PAL.pink, t, 30);
        pill(t, at('heist', 'nightclub'), 1360, 520, 'YOUR NEW NIGHTCLUB', 'back room: planning');
        return;
      }
      ctx.fillStyle = grad(-100, 760, ['#2b7dff', '#46c8ff', '#ffd6ec']); ctx.fillRect(-100, -100, W + 200, 900);
      rr(260, 260, 1400, 560, 6); fs('#fff4dc'); ctx.beginPath(); ctx.moveTo(220, 270); ctx.lineTo(960, 90); ctx.lineTo(1700, 270); ctx.closePath(); fs('#f2e4c4');
      for (let i = 0; i < 8; i++) { rr(330 + i * 170, 330, 60, 480, 10); fs('#fffaf0'); }
      rr(820, 560, 280, 260, 8); fs('#3a2a5a');
      rr(420, 190, 1080, 90, 10); fs('#14a36a', 5);
      const sc = popS(t, at('heist', 'called'));
      ctx.save(); ctx.translate(960, 236); ctx.scale(sc, sc); text('EL BANCO CORRUPTO GRANDE', 0, 0, '700 54px Fredoka', '#fff6c0', 'center', 'middle', '3px'); ctx.restore();
      ctx.fillStyle = '#c9b8d8'; ctx.fillRect(-100, 820, W + 200, 400); line(-100, 820, W + 100, 820, 5);
      const crew = [[520, PAL.pink], [760, PAL.teal], [1160, PAL.gold], [1400, PAL.purple]];
      crew.forEach(([x, c], i) => person({ ...MASKED, skin: '#2a2234', jacket: c, sleeve: c, x, y: 1000, s: .85, pop: popS(t, tb + .2 + i * .12), seed: i }, t));
      pill(t, at('heist', 'real name'), 960, 420, 'REAL NAME', '(seriously)', { rot: -.04 });
      if (t > at('heist', 'had it coming')) for (let i = 0; i < 6; i++) { const p = clamp((t - at('heist', 'had it coming') - i * .12) / 1.2); if (p <= 0) continue; ctx.save(); ctx.translate(960 + (i - 2.5) * 140 * p * 2, 700 - Math.sin(p * Math.PI) * 400); ctx.rotate(p * 6); ell(0, 0, 50, 56); fs('#c9a46a'); text('$', 0, 6, '700 50px Fredoka', '#14a36a'); ctx.restore(); }
      eraTag(t, 'VICE CITY · 1986');
    } },
  betrayal: {
    id: 'betrayal',
    pops: () => [[.2, 'swish'], [at('betrayal', 'now he does')], [at('betrayal', 'He flies')], [at('betrayal', 'surprise'), 'ding'], [at('betrayal', 'Lance.')], [at('betrayal', 'never felt'), 'swish'], [at('betrayal', 'talking to Sonny'), 'stamp']],
    draw(t) {
      mansionBG(t, 'sunset');
      const tf = at('betrayal', 'He flies'), tl = at('betrayal', 'talking to Sonny');
      person({ ...TOMMY_VC, x: 960, y: 770, s: .6, mouth: t > tl ? 'frown' : 'flat', brow: t > tl ? 'angry' : 'normal', seed: 1 }, t);
      person({ ...SONNY, x: 760, y: 1010, s: .9, pop: popS(t, tf), seed: 2 }, t);
      const L = { ...LANCE, x: 1180, y: 1010, s: .88, pop: popS(t, at('betrayal', 'Lance.')), mouth: 'grin', seed: 6 }; person(L, t);
      counter(t, at('betrayal', 'now he does'), 520, 200, 'SONNY VISITS', '1', { col: PAL.pink });
      if (t > at('betrayal', 'Loud')) {
        const s = popS(t, at('betrayal', 'Loud')); ctx.save(); ctx.translate(1600, 300); ctx.rotate(.05); ctx.scale(s, s);
        rr(-170, -140, 340, 280, 8); fs(PAL.gold, 6); rr(-146, -116, 292, 232, 4); fs('#f2e6d0', 4);
        ctx.save(); rr(-146, -116, 292, 232, 4); ctx.clip(); ctx.filter = 'sepia(1)'; person({ ...TOMMY_VC, x: -70, y: 320, s: .5, mouth: 'grin' }, t); person({ ...LANCE, x: 70, y: 320, s: .5, mouth: 'grin' }, t); ctx.filter = 'none'; ctx.restore();
        text('YOU & LANCE', 0, 160, '700 40px Caveat', '#fff');
        if (t > tl) { const c = eout(prog(t, tl, .3)); ctx.beginPath(); ctx.moveTo(-140 * c, -110 * c); ctx.lineTo(-20, -10); ctx.lineTo(30, 30); ctx.lineTo(140 * c, 110 * c); ctx.moveTo(-20, -10); ctx.lineTo(80 * c, -110 * c); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke(); }
        ctx.restore();
      }
      pill(t, tl + .2, 1180, headTop(L).y - 70, 'TRAITOR', null, { bg: '#ffd1e3', fg: '#e0263c', rot: .05 });
      memoryBoard(t, 0, tf - .3, 3, { hi: [1, 3], tHi: .5 });
      eraTag(t, 'VERCETTI ESTATE · 1986');
    } },
  finale: {
    id: 'finale',
    pops: () => [[at('finale', 'Three million'), 'ding'], [at('finale', 'Normal paper')], [at('finale', 'He notices'), 'stamp'], [at('finale', 'settle it'), 'stamp'], [at('finale', 'settle it') + .3, 'stamp'], [at('finale', 'Both of them')], [at('finale', 'Both of them') + .4], [at('finale', 'hiding')], [at('finale', 'Told you'), 'ding']],
    draw(t) {
      const ts = at('finale', 'settle it'), tb = at('finale', "When it's over"), tk = at('finale', 'Told you');
      mansionBG(t, 'night');
      person({ ...TOMMY_VC, x: 960, y: 770, s: .6, mouth: t > tb ? 'smirk' : t < ts ? 'smirk' : 'flat', brow: t > ts && t < tb ? 'angry' : 'normal', seed: 1 }, t);
      const gone = 1 - prog(t, tb - .4, .3);
      const notice = t > at('finale', 'He notices');
      if (gone > 0) { person({ ...SONNY, x: 700, y: 1010, s: .9, pop: gone, mouth: notice ? 'frown' : 'grin', brow: notice ? 'angry' : 'normal', seed: 2 }, t); person({ ...LANCE, x: 1220, y: 1010, s: .88, pop: gone, mouth: 'frown', seed: 6 }, t); }
      if (t < ts) { const ms = popS(t, at('finale', 'Three million')); if (ms > 0) moneyStack(960, 960, ms * .9, notice); }
      if (t < ts) pill(t, at('finale', 'Three million'), 960, 160, '$3,000,000', 'fresh from your print shop');
      if (t < ts) pill(t, at('finale', 'Normal paper'), 1420, 330, 'NORMAL PAPER', '(right?)', { rot: .04 });
      if (t < ts) bubble(t, at('finale', 'He notices'), 520, 300, 'FAKE?!', { left: true });
      for (let i = 0; i < 6; i++) burst(t, ts + i * .16, 700 + (i % 3) * 260, 620 + (i % 2) * 120, 90);
      flash(t, ts); flash(t, ts + .3); smoke(t, ts + .4, 960, 820, 8);
      if (t > ts) { counter(t, at('finale', 'Both of them'), 520, 170, 'SONNY', 'FORELLI', { col: INK }); strike(t, at('finale', 'Both of them') + .3, 400, 220, 640, PAL.pink);
        counter(t, at('finale', 'Both of them') + .4, 1400, 170, 'LANCE', 'VANCE', { col: INK }); strike(t, at('finale', 'Both of them') + .7, 1300, 220, 1500, PAL.pink); }
      const kp = eout(prog(t, at('finale', 'hiding') - .2, .5));
      if (kp > 0) { ctx.save(); ctx.beginPath(); ctx.rect(1194, 0, 400, 2000); ctx.clip(); person({ ...KEN, x: lerp(1150, 1205, kp), y: 770, s: .6, sweat: 1, look: -10, seed: 3 }, t); ctx.restore(); rr(1150, 260, 44, 500, 8); fs('#fff'); pill(t, at('finale', 'Ken.'), 1360, 330, 'KEN', 'survived. again.'); }
      memoryBoard(t, tk - .2, 0, 4, { hi: [2], tHi: tk + .2 });
    } },
  ending: {
    id: 'ending',
    pops: () => [[.4, 'swish'], [at('ending', 'fifteen years')], [at('ending', 'lost a fortune')], [at('ending', 'owning the city'), 'stamp'], [at('ending', 'Not bad')]],
    draw(t) {
      viceBG(t, 'sunset', { car: [1650, PAL.pink, .9, true] });
      person({ ...TOMMY_VC, x: 560, y: 900, s: 1.0, mouth: 'smirk', armL: .2, armR: .2, seed: 1 }, t);
      const k = eout(prog(t, .3, .5)); ctx.save(); ctx.translate(lerp(800, 0, k), 0); ctx.rotate(-.025);
      parchment(1040, 200, 640, 520); text("TOMMY'S TO-DO LIST", 1360, 270, '700 50px Almendra', '#b0124f');
      ['Get my money back', 'Find who set me up', 'Take the whole city'].forEach((it, i) => {
        rr(1100, 360 + i * 110, 46, 46, 6); fs('#fffaf0', 4); text(it, 1170, 385 + i * 110, '700 52px Caveat', INK, 'left');
        const tc = [at('ending', 'fifteen years'), at('ending', 'lost a fortune'), at('ending', 'owning the city')][i];
        if (t > tc) { const p = eout(prog(t, tc, .25)); ctx.beginPath(); ctx.moveTo(1104, 384 + i * 110); ctx.lineTo(1122, 404 + i * 110); ctx.lineTo(lerp(1122, 1160, p), lerp(404, 350, p) + i * 110); ctx.lineWidth = 8; ctx.strokeStyle = '#14a36a'; ctx.stroke(); }
      });
      ctx.restore();
      counter(t, at('ending', 'owning the city'), 560, 120, 'CITIES OWNED', '1', { col: PAL.pink });
      pill(t, at('ending', 'Not bad'), 1360, 860, 'NOT BAD', 'for a guy who wanted his money back', { bg: PAL.mint });
      eraTag(t, 'VICE CITY · 1986');
    } },
};

// splice the new/rewritten scenes into the running order
(function () {
  const idx = id => SCENES.findIndex(s => s.id === id);
  for (const k of ['empire', 'betrayal', 'finale', 'ending']) SCENES[idx(k)] = NEW_SCENES[k];
  SCENES.splice(idx('allies') + 1, 0, NEW_SCENES.gangs, NEW_SCENES.lance);
  SCENES.splice(idx('mansion') + 1, 0, NEW_SCENES.midcta);
  SCENES.splice(idx('empire') + 1, 0, NEW_SCENES.heist);
  for (const [id, fn, ph] of [['prison', NEW_SCENES.prison_board, 'Hold that'], ['ken', NEW_SCENES.ken_board, 'Remember that']]) {
    const s = SCENES[idx(id)], od = s.draw.bind(s), op = s.pops;
    s.draw = (t, d) => { od(t, d); fn(t); };
    s.pops = () => [...op(), [at(id, ph) - .2, 'swish'], [at(id, ph) + .2]];
  }
})();
