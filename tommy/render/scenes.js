// Scene definitions for "What if you were born as Tommy Vercetti?"
const TOMMY = { hair: 'tommy', hairCol: '#3a2418', skin: '#e9b48e', stubble: true };

// ---------- shared backgrounds ----------
function palm(x, y, s, flip) {
  ctx.save(); ctx.translate(x, y); ctx.scale(flip ? -s : s, s);
  ctx.beginPath(); ctx.moveTo(-18, 0); ctx.quadraticCurveTo(-10, -260, 60, -520); ctx.lineTo(84, -514); ctx.quadraticCurveTo(20, -260, 22, 0); ctx.closePath(); fs('#6b4a32');
  for (let i = 1; i < 9; i++) line(-14 + i * 6, -i * 58, 22 + i * 6, -i * 58 - 4, 3, 'rgba(43,29,23,.5)');
  const leaves = [[-2.6, 1], [-2.0, 1.1], [-1.2, 1], [-0.5, 1.1], [0.2, 1], [-3.1, .8]];
  ctx.translate(72, -518);
  for (const [a, l] of leaves) {
    ctx.save(); ctx.rotate(a);
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(120 * l, -60, 250 * l, 30); ctx.quadraticCurveTo(120 * l, 10, 0, 0); fs('#1f6b4e', 4);
    ctx.restore();
  }
  ctx.restore();
}
function viceSky() {
  ctx.fillStyle = grad(0, 760, ['#4a2a6e', '#b2457e', '#ff7a6b', '#ffb36b']); ctx.fillRect(-100, -100, W + 200, 900);
  ctx.save(); ctx.beginPath(); ctx.rect(-100, -100, W + 200, 560);
  for (let i = 0; i < 6; i++) { const y = 470 + i * 34; ctx.rect(-100, y, W + 200, 22 - i * 3); }
  ctx.clip(); ell(980, 600, 300, 300); ctx.fillStyle = grad(300, 900, ['#fff19a', '#ffb05c', '#ff5f8f']); ctx.fill(); ctx.restore();
}
function skyline(t) {
  const b = [[120, 150, 330, '#f6a6c1'], [280, 120, 250, '#7fd6c9'], [410, 170, 420, '#f3e3c3'], [600, 130, 300, '#c9a7e8'],
  [1240, 160, 380, '#7fd6c9'], [1410, 130, 280, '#f6a6c1'], [1550, 180, 450, '#f3e3c3'], [1740, 140, 320, '#c9a7e8']];
  for (const [x, w, h, c] of b) {
    const y = 760 - h;
    rr(x + w * .2, y - 40, w * .6, 44, 4); fs(c, 4); rr(x + w * .35, y - 70, w * .3, 34, 4); fs(c, 4);
    rr(x, y, w, h + 20, 4); fs(c, 4);
    for (let wy = y + 30; wy < 730; wy += 46) for (let wx = x + 18; wx < x + w - 20; wx += 34) {
      rr(wx, wy, 18, 26, 3); ctx.fillStyle = ((wx * 7 + wy * 3) % 5 < 2) ? '#ffe9a8' : 'rgba(43,29,23,.35)'; ctx.fill();
    }
  }
  ctx.save(); ctx.shadowColor = '#ff4fa0'; ctx.shadowBlur = 30 + Math.sin(t * 9) * 6;
  text('Vice City', 505, 300, '64px Pacifico', '#ffd1ea'); ctx.restore();
  ctx.fillStyle = grad(740, 1080, ['#2b7ea6', '#173b63']); ctx.fillRect(-100, 740, W + 200, 400);
  for (let i = 0; i < 14; i++) { const y = 770 + i * 22, o = Math.sin(t * 1.5 + i) * 30; line(780 + o - i * 6, y, 1180 + o + i * 6, y, 4, 'rgba(255,170,200,.45)'); }
}

// ---------- scenes ----------
const SCENES = [
  // 1. Prison release
  {
    id: 'hook1',
    pops: () => [[0.9], [at('hook1', 'No money')], [at('hook1', 'No friends')], [at('hook1', 'Fifteen')], [at('hook1', 'gone'), 'swish']],
    draw(t) {
      ctx.fillStyle = grad(0, 820, ['#7d93ab', '#c3ced8']); ctx.fillRect(-100, -100, W + 200, 1000);
      for (let i = 0; i < 4; i++) { const x = ((i * 520 + t * 25) % 2400) - 300; ell(x, 140 + i * 40, 160, 40); ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fill(); }
      rr(140, 110, 170, 720, 0); fs('#8d8781'); rr(110, 80, 230, 120, 8); fs('#77716b'); rr(160, 110, 130, 60, 4); fs('#3a3532', 4);
      ctx.beginPath(); ctx.moveTo(90, 85); ctx.lineTo(225, 20); ctx.lineTo(360, 85); ctx.closePath(); fs('#5e5853');
      rr(-50, 330, W + 100, 500, 0); fs('#a39e98');
      for (let r = 0; r < 8; r++) { const y = 360 + r * 60; line(-50, y, W + 50, y, 3, 'rgba(43,29,23,.22)'); for (let x = (r % 2) * 70; x < W; x += 140) line(x, y, x, y + 60, 3, 'rgba(43,29,23,.22)'); }
      rr(-50, 300, W + 100, 40, 0); fs('#8a857f');
      ctx.beginPath(); for (let x = -50; x < W + 60; x += 30) ctx.lineTo(x, 280 + (x / 30 % 2 ? -14 : 8)); ctx.lineWidth = 3; ctx.strokeStyle = INK; ctx.stroke();
      rr(720, 380, 480, 70, 8); fs('#5e5853'); text('STATE PRISON', 960, 418, '700 44px Fredoka', '#e9e2d6', 'center', 'middle', '6px');
      rr(780, 470, 360, 360, 0); fs('#2e2a28');
      const open = eout(prog(t, 0, 1));
      for (const side of [-1, 1]) {
        ctx.save(); ctx.translate(960 + side * 180, 470); const w = 180 * (1 - open * .75);
        rr(side < 0 ? 0 : -w, 0, w, 360, 0); fs('#5a5a5e'); for (let i = 1; i < 5; i++) { const bx = (side < 0 ? 0 : -w) + i * w / 5; line(bx, 0, bx, 360, 6, '#3a3a3e'); }
        ctx.restore();
      }
      ctx.fillStyle = grad(820, 1080, ['#bdb6aa', '#a49c90']); ctx.fillRect(-100, 820, W + 200, 400);
      line(960, 840, 960, 1080, 10, 'rgba(255,255,255,.5)');
      const wp = clamp(t / 3.2), walking = t < 3.2;
      const o = { ...TOMMY, x: lerp(960, 640, eio(wp)), y: lerp(860, 990, eio(wp)), s: lerp(.72, .98, eio(wp)), walking, phase: t * 7.5,
        shirt: '#ece8df', pants: '#5b606b', mouth: 'flat', suitcase: true, armR: .05, seed: .5 };
      person(o, t);
      const ht = headTop(o);
      pill(t, 0.9, ht.x, ht.y - 50, 'TOMMY VERCETTI', "(that's you)");
      counter(t, at('hook1', 'No money'), 1420, 200, 'MONEY', '$0');
      counter(t, at('hook1', 'No friends'), 1690, 330, 'FRIENDS', '0', { rot: .04 });
      counter(t, at('hook1', 'Fifteen'), 1480, 520, 'YOUR LIFE', '15 YEARS', { col: INK });
      strike(t, at('hook1', 'gone'), 1340, 570, 1620);
      eraTag(t, 'LIBERTY CITY · 1986');
    }
  },
  // 2. Vice City + to-do list
  {
    id: 'hook2',
    pops: () => [[at('hook2', 'own an entire')], [at('hook2', 'And all') - .3, 'swish'], [at('hook2', 'And all')], [at('hook2', 'And all') + .25], [at('hook2', 'And all') + .5], [at('hook2', 'money back'), 'swish']],
    draw(t) {
      viceSky(); skyline(t);
      rr(-60, 900, W + 120, 200, 0); fs('#f1e2c6');
      for (let x = -60; x < W + 60; x += 120) line(x, 900, x - 60, 1080, 3, 'rgba(43,29,23,.2)');
      rr(-60, 860, W + 120, 30, 6); fs('#fff4dc'); for (let x = 0; x < W; x += 70) { rr(x, 890, 22, 10, 2); fs('#fff4dc', 3); }
      palm(90, 1000, 1.1, false); palm(1860, 1020, 1.0, true);
      const o = { ...TOMMY, x: 790, y: 1010, s: 1.0, shirt: '#2f86c4', pattern: 'hawaii', collar: '#2a76ad', pants: '#3f5f93', mouth: 'smirk', armL: .18, armR: .18, seed: 1 };
      person(o, t);
      counter(t, at('hook2', 'own an entire'), 960, 160, 'CITIES OWNED', '1', { col: '#2f86c4' });
      const t0 = at('hook2', 'And all') - .3, sl = eout(prog(t, t0, .5));
      if (sl > 0) {
        ctx.save(); ctx.translate(lerp(700, 0, sl), 0); ctx.rotate(-.025);
        parchment(1180, 300, 600, 560);
        text("TOMMY'S TO-DO LIST", 1480, 375, '700 50px Almendra', '#8a1f1a');
        line(1250, 410, 1710, 410, 3, 'rgba(138,31,26,.6)');
        const items = ['Get my money back', 'Find who set me up', 'Take the whole city'];
        items.forEach((it, i) => {
          const tt = at('hook2', 'And all') + i * .25; if (t < tt) return;
          ctx.save(); ctx.globalAlpha = clamp((t - tt) / .2);
          rr(1240, 480 + i * 120, 46, 46, 6); fs('#fffaf0', 4);
          text(it, 1310, 505 + i * 120, '700 52px Caveat', '#2b1d17', 'left'); ctx.restore();
        });
        scribbleCircle(t, at('hook2', 'money back'), 1480, 505, 260, 52);
        ctx.restore();
      }
      eraTag(t, 'VICE CITY · 1986');
    }
  },
  // 3. The book
  {
    id: 'book', extra: .4,
    pops: () => [[1.2], [2.0, 'stamp']],
    draw(t) {
      const g = ctx.createRadialGradient(960, 560, 100, 960, 560, 1100); g.addColorStop(0, '#5a3a26'); g.addColorStop(1, '#1d120c');
      ctx.fillStyle = g; ctx.fillRect(-100, -100, W + 200, H + 200);
      // candle
      rr(150, 560, 70, 300, 10); fs('#f3ead6'); ell(185, 860, 110, 22); fs('#8a6a40');
      const fl = Math.sin(t * 13) * 4 + Math.sin(t * 7.3) * 3;
      const cg = ctx.createRadialGradient(185, 500, 10, 185, 500, 260); cg.addColorStop(0, 'rgba(255,200,110,.45)'); cg.addColorStop(1, 'rgba(255,200,110,0)');
      ctx.fillStyle = cg; ctx.fillRect(-100, 200, 600, 600);
      ctx.beginPath(); ctx.moveTo(185 + fl * .3, 470 + fl); ctx.quadraticCurveTo(212, 530, 185, 552); ctx.quadraticCurveTo(158, 530, 185 + fl * .3, 470 + fl); ctx.fillStyle = '#ffd36b'; ctx.fill();
      line(185, 548, 185, 562, 4);
      const s = lerp(.94, 1, eout(prog(t, 0, .8)));
      ctx.save(); ctx.translate(960, 560); ctx.scale(s, s); ctx.translate(-960, -560);
      rr(300, 160, 1320, 800, 18); fs('#5a2e1e');
      rr(330, 180, 630, 760, 10); fs('#f1e3c2'); rr(960, 180, 630, 760, 10); fs('#f1e3c2');
      const gg = ctx.createLinearGradient(900, 0, 1020, 0); gg.addColorStop(0, 'rgba(0,0,0,0)'); gg.addColorStop(.5, 'rgba(60,30,10,.35)'); gg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gg; ctx.fillRect(900, 180, 120, 760);
      ctx.save(); ctx.globalAlpha = clamp((t - .3) / .5);
      text('Prologue', 645, 320, 'italic 400 48px Almendra', '#6b4a32');
      text('The Harwood', 645, 425, '700 84px Almendra', '#3a1f14'); text('Butcher', 645, 515, '700 84px Almendra', '#3a1f14');
      line(545, 575, 745, 575, 3, '#8a6a4a'); ell(645, 575, 8, 8); fs('#8a6a4a', 0);
      for (let y = 640; y < 900; y += 46) line(400, y, 890, y, 2, 'rgba(120,90,60,.25)');
      ctx.restore();
      ctx.save(); ctx.globalAlpha = clamp((t - .8) / .5);
      rr(1090, 270, 380, 320, 6); fs('#e8d6ae', 6);
      ctx.save(); ctx.translate(1280, 470); ctx.scale(.5, .5);
      line(-200, 80, 200, 80, 7, '#7a5b40'); for (let x = -180; x <= 180; x += 45) line(x, -40, x, 140, 6, '#7a5b40');
      line(-200, -40, 200, -40, 7, '#7a5b40'); ctx.beginPath(); ctx.arc(0, -70, 80, 0, Math.PI * 2); ctx.lineWidth = 7; ctx.strokeStyle = '#7a5b40'; ctx.stroke();
      ctx.restore();
      text('you, age 0', 1280, 645, '600 50px Caveat', '#5b4030');
      ctx.restore();
      const ss = popS(t, 2.0);
      if (ss > 0) {
        ctx.save(); ctx.translate(1280, 815); ctx.scale(ss, ss); ctx.beginPath();
        for (let i = 0; i < 40; i++) { const a = i / 40 * Math.PI * 2, r = 70 + Math.sin(i * 2.7) * 6; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
        ctx.closePath(); fs('#a3262a', 4); ell(0, 0, 50, 50); fs('#8a1d22', 3);
        text('★', 0, 4, '700 54px Fredoka', '#f3d7a8'); ctx.restore();
      }
      rr(944, 900, 34, 120, 0); fs('#a3262a', 3);
      ctx.restore();
    }
  },
  // 4. Baby in Liberty City
  {
    id: 'birth', trans: 'zoom', zoomAt: [1280, 440],
    pops: () => [[.9], [at('birth', 'Nobody'), 'swish'], [at('birth', 'Nobody') + .5], [at('birth', 'probably'), 'stamp']],
    draw(t) {
      ctx.fillStyle = '#ead9b5'; ctx.fillRect(-100, -100, W + 200, 1000);
      for (let x = -100; x < W + 100; x += 80) { ctx.fillStyle = '#e1cba1'; ctx.fillRect(x, -100, 34, 1000); }
      rr(-100, 170, W + 200, 26, 0); fs('#b05a3c', 4);
      ctx.fillStyle = '#9c6b44'; ctx.fillRect(-100, 830, W + 200, 400); line(-100, 830, W + 100, 830, 6);
      for (let y = 870; y < 1100; y += 50) line(-100, y, W + 100, y, 3, 'rgba(43,29,23,.25)');
      rr(240, 230, 420, 380, 6); fs('#7a4a2c', 6);
      ctx.save(); rr(270, 260, 360, 320, 2); ctx.clip();
      ctx.fillStyle = grad(260, 580, ['#8fa6bd', '#c9d4de']); ctx.fillRect(270, 260, 360, 320);
      const bl = [[270, 70, 200], [330, 60, 260], [380, 80, 170], [450, 50, 230], [500, 90, 150], [580, 60, 210]];
      for (const [x, w, h] of bl) { ctx.fillStyle = '#4b5566'; ctx.fillRect(x, 580 - h, w, h); for (let wy = 600 - h; wy < 570; wy += 26) for (let wx = x + 8; wx < x + w - 10; wx += 20) { ctx.fillStyle = (wx + wy) % 3 ? '#ffe39a' : '#39414f'; ctx.fillRect(wx, wy, 8, 12); } }
      ctx.restore();
      line(450, 260, 450, 580, 8, '#7a4a2c'); line(270, 420, 630, 420, 8, '#7a4a2c');
      ctx.beginPath(); ctx.moveTo(200, 210); ctx.quadraticCurveTo(280, 400, 230, 640); ctx.lineTo(180, 640); ctx.lineTo(180, 210); fs('#a8463a');
      ctx.beginPath(); ctx.moveTo(700, 210); ctx.quadraticCurveTo(620, 400, 670, 640); ctx.lineTo(720, 640); ctx.lineTo(720, 210); fs('#a8463a');
      // crib
      rr(770, 520, 380, 300, 10); fs('#c99a66');
      const ang = clamp((t - at('birth', 'probably')) / .25);
      baby(960, 560, 1, { angry: ang }, t);
      rr(800, 640, 320, 130, 30); fs('#9cc7e6'); for (let i = 0; i < 6; i++) { ell(840 + i * 50, 690 + (i % 2) * 30, 7, 7); fs('#fff', 0); }
      for (let x = 790; x <= 1130; x += 42) { rr(x, 610, 18, 230, 8); fs('#d9a873', 4); }
      rr(760, 590, 400, 34, 14); fs('#b98652'); rr(760, 820, 400, 30, 10); fs('#b98652');
      line(780, 850, 780, 900, 14, INK); line(1140, 850, 1140, 900, 14, INK);
      pill(t, .9, 960, 340, 'TOMMY', 'age 0');
      const cb = eout(prog(t, at('birth', 'Nobody'), .5));
      if (cb > 0) {
        ctx.save(); ctx.translate(lerp(800, 0, cb), 0); ctx.rotate(.02);
        rr(1260, 230, 520, 420, 14); fs('#6b4228', 6); rr(1288, 258, 464, 364, 6); fs('#c08a52', 3);
        const r = rand(3); for (let i = 0; i < 160; i++) { ell(1290 + r() * 460, 260 + r() * 360, 3, 3); ctx.fillStyle = 'rgba(80,50,20,.35)'; ctx.fill(); }
        rr(1350, 268, 340, 44, 4); fs('#f6efdc', 3); text('THINGS TO REMEMBER', 1520, 292, '600 26px Fredoka', INK, 'center', 'middle', '2px');
        const ns = popS(t, at('birth', 'Nobody') + .5);
        if (ns > 0) {
          ctx.save(); ctx.translate(1520, 460); ctx.rotate(-.06); ctx.scale(ns, ns);
          rr(-150, -110, 300, 230, 4); fs('#fff1a0', 4);
          text('CHILDHOOD', 0, -30, '700 58px Caveat', INK); text('= ???', 0, 40, '700 64px Caveat', '#c8322a');
          ell(0, -100, 14, 14); fs('#d23a2a', 4); ctx.restore();
        }
        const st = at('birth', 'probably');
        if (t > st) {
          const k = eout(prog(t, st, .22)), sc = lerp(2.2, 1, k);
          ctx.save(); ctx.globalAlpha = k; ctx.translate(1530, 470); ctx.rotate(-.22); ctx.scale(sc, sc);
          rr(-190, -48, 380, 96, 10); ctx.lineWidth = 9; ctx.strokeStyle = '#c8322a'; ctx.stroke();
          text('CLASSIFIED', 0, 4, '700 62px Fredoka', '#c8322a', 'center', 'middle', '4px'); ctx.restore();
        }
        ctx.restore();
      }
      eraTag(t, 'LIBERTY CITY · 1951');
    }
  },
  // 5. Sonny Forelli
  {
    id: 'forelli',
    pops: () => [[at('forelli', 'Forelli family')], [at('forelli', 'Your boss')], [at('forelli', 'He smiles'), 'ding'], [at('forelli', 'That should'), 'pop']],
    draw(t) {
      ctx.fillStyle = grad(0, 300, ['#2c3e57', '#e98a5b']); ctx.fillRect(-100, -100, W + 200, 400);
      ctx.fillStyle = '#8b3d2c'; ctx.fillRect(-100, 110, W + 200, 760);
      for (let r = 0; r < 26; r++) { const y = 130 + r * 28; line(-100, y, W + 100, y, 2, 'rgba(43,29,23,.25)'); for (let x = (r % 2) * 40 - 100; x < W + 100; x += 80) line(x, y, x, y + 28, 2, 'rgba(43,29,23,.25)'); }
      line(-100, 110, W + 100, 110, 6);
      for (const x of [140, 1500, 1720]) { rr(x, 160, 130, 170, 6); fs('#3b2d33'); rr(x + 10, 170, 110, 150, 2); ctx.fillStyle = x === 1500 ? '#ffd98a' : '#4a5468'; ctx.fill(); }
      rr(640, 250, 640, 100, 10); fs('#1f4a35', 6);
      const fs2 = popS(t, at('forelli', 'Forelli family'));
      ctx.save(); ctx.translate(960, 302); ctx.scale(Math.max(fs2, 0.001) ? 1 : 1, 1); text("FORELLI'S", 0, 0, '700 64px Almendra', '#f3e2b0', 'center', 'middle', '6px'); ctx.restore();
      ctx.beginPath(); ctx.moveTo(640, 380); ctx.lineTo(1280, 380); ctx.lineTo(1320, 470); ctx.lineTo(600, 470); ctx.closePath(); fs('#2e7a52');
      ctx.save(); ctx.beginPath(); ctx.moveTo(640, 380); ctx.lineTo(1280, 380); ctx.lineTo(1320, 470); ctx.lineTo(600, 470); ctx.closePath(); ctx.clip();
      for (let x = 560; x < 1340; x += 80) { ctx.fillStyle = '#f2eedf'; ctx.beginPath(); ctx.moveTo(x, 380); ctx.lineTo(x + 40, 380); ctx.lineTo(x + 46, 470); ctx.lineTo(x + 4, 470); ctx.fill(); }
      ctx.restore(); ctx.beginPath(); ctx.moveTo(640, 380); ctx.lineTo(1280, 380); ctx.lineTo(1320, 470); ctx.lineTo(600, 470); ctx.closePath(); fs(null);
      rr(700, 490, 520, 330, 6); fs('#ffd98a');
      ctx.fillStyle = 'rgba(90,50,20,.45)'; for (const x of [780, 960, 1140]) { ell(x, 760, 60, 14); ctx.fill(); ctx.fillRect(x - 6, 760, 12, 60); }
      line(960, 490, 960, 820, 6);
      rr(470, 520, 170, 300, 6); fs('#4a2a20'); ell(610, 680, 8, 8); fs('#d9b45a', 3);
      ctx.fillStyle = grad(860, 1080, ['#8d8f94', '#6f7176']); ctx.fillRect(-100, 860, W + 200, 400); line(-100, 862, W + 100, 862, 6);
      rr(250, 260, 18, 610, 4); fs('#2d2d33'); rr(215, 220, 88, 60, 10); fs('#2d2d33');
      const lg = ctx.createRadialGradient(259, 260, 10, 259, 260, 200); lg.addColorStop(0, 'rgba(255,220,140,.6)'); lg.addColorStop(1, 'rgba(255,220,140,0)'); ctx.fillStyle = lg; ctx.fillRect(50, 60, 420, 420);
      const worry = t > at('forelli', 'That should');
      const tom = { ...TOMMY, stubble: false, x: 600, y: 1000, s: .95, shirt: '#f2efe6', jacket: '#4a3226', longSleeve: true, sleeve: '#4a3226', pants: '#2f3442',
        mouth: worry ? 'frown' : 'flat', brow: worry ? 'worried' : 'normal', look: worry ? 8 : 0, sweat: worry ? eout(prog(t, at('forelli', 'That should'), .4)) : 0, seed: .2 };
      const smile = t > at('forelli', 'He smiles');
      const son = { x: 1340, y: 1000, s: 1.02, hair: 'slick', hairCol: '#16110f', skin: '#e3ac84', shirt: '#f5f2ea', jacket: '#5d6470', longSleeve: true, sleeve: '#5d6470', pants: '#4c525d',
        tie: '#b3262c', buttons: true, mouth: 'grin', grinW: smile ? lerp(1, 1.3, eout(prog(t, at('forelli', 'He smiles'), .3))) : 1, look: -6, seed: 2 };
      person(tom, t); person(son, t);
      const st = headTop(son), tt = headTop(tom);
      pill(t, at('forelli', 'Your boss'), st.x, st.y - 60, 'SONNY FORELLI', 'your boss');
      const m = mouthAt(son); sparkle(t, at('forelli', 'He smiles') + .1, m.x + 10, m.y - 6, 42);
      bubble(t, at('forelli', 'worry') + .1, tt.x + 120, tt.y + 10, '...');
      eraTag(t, 'LIBERTY CITY · 1960s');
    }
  },
];
