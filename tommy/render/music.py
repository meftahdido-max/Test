"""Original melodic-house score (warm piano stabs, pumping pads, off-beat bass, four-on-the-floor),
generated per video and shaped by the scenes: each scene has an energy level (0 = piano + pad,
1 = + bass/kick/hats, 2 = full groove with claps and plucks) and can switch to a darker minor
progression. Builds risers into energy jumps and changes patterns every few bars so it never loops.
Inspired by the *style* of emotional melodic house; no melody is taken from any existing song."""
import numpy as np
from scipy.signal import butter, lfilter, fftconvolve

SR = 44100
rng = np.random.default_rng(7)


def mtof(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def env_ad(n, a, d):
    t = np.arange(n) / SR
    return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)


def lp(x, fc, order=2):
    b, a = butter(order, fc / (SR / 2), 'low')
    return lfilter(b, a, x)


def hp(x, fc, order=2):
    b, a = butter(order, fc / (SR / 2), 'high')
    return lfilter(b, a, x)


def piano(m, dur, vel=1.0):
    n = int(dur * SR); t = np.arange(n) / SR; f = mtof(m); out = np.zeros(n)
    for h in range(1, 9):
        fh = f * h * (1 + 0.0004 * h * h)
        if fh > 9000: break
        out += np.sin(2 * np.pi * fh * t) / h ** 1.25 * np.exp(-t * (1.2 + 0.9 * h))
    return out * np.minimum(1, t / 0.004) * vel


def saw(f, t, nh=10):
    out = np.zeros_like(t)
    for h in range(1, nh + 1):
        if f * h > 8000: break
        out += np.sin(2 * np.pi * f * h * t) / h
    return out


def pad_chord(notes, dur):
    n = int(dur * SR); t = np.arange(n) / SR; out = np.zeros(n)
    for m in notes:
        for det in (-0.07, 0.07):
            out += saw(mtof(m + det), t, 7)
    a = np.minimum(1, t / 0.6) * np.minimum(1, (dur - t) / 0.5)
    return lp(out, 1400) * a / len(notes)


def pluck(m, dur):
    n = int(dur * SR); t = np.arange(n) / SR
    return lp(saw(mtof(m), t, 12), 2600) * np.exp(-t * 14)


def kick():
    t = np.arange(int(.3 * SR)) / SR
    f = 45 + 95 * np.exp(-t * 28)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9)


def clap():
    t = np.arange(int(.22 * SR)) / SR
    x = rng.standard_normal(len(t)); x = lfilter(*butter(2, [900 / (SR / 2), 4000 / (SR / 2)], 'band'), x)
    e = np.exp(-t * 22) + .6 * np.exp(-np.maximum(t - .012, 0) * 22) * (t > .012)
    return x * e * .5


def hat(open_=False):
    t = np.arange(int((.22 if open_ else .05) * SR)) / SR
    return hp(rng.standard_normal(len(t)), 7000) * np.exp(-t * (14 if open_ else 70)) * (.35 if open_ else .25)


def riser(dur):
    n = int(dur * SR); t = np.arange(n) / SR
    x = rng.standard_normal(n); out = np.zeros(n); seg = n // 16
    for i in range(16):  # step the band up over the riser
        s = slice(i * seg, (i + 1) * seg if i < 15 else n)
        out[s] = hp(x[s], 400 + i * 450)
    return out * (t / dur) ** 2 * .25


def crash():
    t = np.arange(int(1.6 * SR)) / SR
    return hp(rng.standard_normal(len(t)), 5000) * np.exp(-t * 2.5) * .2


# progressions: (pad/piano voicing, bass root)
MAJOR = [([62, 66, 69, 73], 38), ([59, 64, 68, 71], 40), ([61, 64, 66, 69], 42), ([61, 64, 69, 73], 45)]   # Dmaj7  E  F#m7  A/C#
MINOR = [([59, 62, 66, 71], 35), ([59, 62, 67, 71], 43), ([57, 62, 66, 69], 38), ([57, 61, 64, 69], 45)]   # Bm  G  D  A


def build(T, scenes, cfg):
    """T: total seconds. scenes: [(t_start, scene_id)] sorted. cfg: {'bpm', 'levels': {id: 0-2}, 'minor': [ids]}"""
    bpm = cfg.get('bpm', 120); beat = 60 / bpm; bar = beat * 4
    n = int((T + 4) * SR)
    harm = np.zeros(n); bass = np.zeros(n); drums = np.zeros(n); fx = np.zeros(n); kicks = []

    def put(buf, x, t):
        i = int(t * SR)
        if i >= len(buf): return
        m = min(len(x), len(buf) - i); buf[i:i + m] += x[:m]

    def scene_at(t):
        cur = scenes[0][1]
        for s, sid in scenes:
            if s <= t + .05: cur = sid
        return cur

    K, C, HC, HO = kick(), clap(), hat(), hat(True)
    nbars = int(T / bar) + 2; prev_lvl = 0
    for b in range(nbars):
        tb = b * bar; sid = scene_at(tb)
        lvl = cfg['levels'].get(sid, 1); minor = sid in cfg.get('minor', [])
        prog = MINOR if minor else MAJOR; notes, root = prog[b % 4]
        var = (b // 4) % 3  # pattern variation every 4 bars
        if lvl > prev_lvl and b > 0:
            put(fx, riser(bar), tb - bar); put(fx, crash(), tb)
        prev_lvl = lvl
        put(harm, pad_chord(notes, bar + .5) * (.55 if lvl == 0 else .35), tb)
        # piano: sustained/broken chords when calm, syncopated house stabs when grooving
        if lvl == 0:
            for i, m in enumerate(notes + [notes[1] + 12]):
                put(harm, piano(m, 2.2, .5), tb + i * beat * (1 if var != 1 else .5))
        else:
            hits = [[0, 3, 6], [0, 3, 5, 6], [0, 2, 3, 6]][var]
            for h in hits:
                for m in notes:
                    put(harm, piano(m, .9, .32), tb + h * beat / 2)
        if lvl >= 1:
            for e8 in range(8):  # off-beat sub bass
                if e8 % 2 == 1 or (var == 2 and e8 == 6):
                    t0 = tb + e8 * beat / 2; nn = int(beat / 2 * .95 * SR); tt = np.arange(nn) / SR
                    f = mtof(root)
                    put(bass, (np.sin(2 * np.pi * f * tt) + .3 * np.sin(4 * np.pi * f * tt)) * env_ad(nn, .005, .18) * .55, t0)
            for q in range(4):
                put(drums, K * (.8 if lvl == 2 else .5), tb + q * beat); kicks.append(tb + q * beat)
                for s16 in range(4):
                    put(drums, HC * (1 if s16 == 2 else .45), tb + q * beat + s16 * beat / 4)
        if lvl >= 2:
            for q in (1, 3): put(drums, C, tb + q * beat)
            for q in range(4): put(drums, HO, tb + q * beat + beat / 2)
            if b % 8 == 7:  # little clap fill into the next phrase
                for k in range(4): put(drums, C * .5, tb + 3 * beat + k * beat / 4)
            arp = [notes[0] + 12, notes[2] + 12, notes[1] + 12, notes[3] + 12]
            if var == 1: arp = arp[::-1]
            if var == 2: arp = [arp[0], arp[2], arp[1], arp[2]]
            for s16 in range(16):
                put(harm, pluck(arp[s16 % 4], beat / 4 + .15) * .22, tb + s16 * beat / 4)
    # sidechain pump on pad/piano/bass from every kick
    t_all = np.arange(n) / SR; duck = np.ones(n)
    for k in kicks:
        i = int(k * SR); m = min(int(.35 * SR), n - i)
        if m > 0: duck[i:i + m] = np.minimum(duck[i:i + m], 1 - .55 * np.exp(-np.arange(m) / SR / .09))
    harm *= duck; bass *= duck
    ir_t = np.arange(int(2.4 * SR)) / SR; ir = rng.standard_normal(len(ir_t)) * np.exp(-ir_t * 2.6); ir /= np.sqrt(np.sum(ir ** 2))
    wet = fftconvolve(harm + .4 * drums, ir)[:n]
    out = harm + .28 * wet + bass + drums * .9 + fx
    out = hp(out, 35)
    fade = np.clip(t_all / 1.5, 0, 1) * np.clip((T - t_all) / 2.0, 0, 1)
    out = (out * fade)[:int(T * SR) + SR]
    return (out / (np.sqrt(np.mean(out ** 2)) + 1e-9)).astype(np.float32)  # unit RMS; caller sets level


# ---------------------------------------------------------------------------
# "acoustic" style — sparse, post-apocalyptic: fingerpicked guitar, a lonely high plucked string,
# a low bowed drone, wind, and distant low drum hits for tension. Original; no existing theme used.
def guitar(m, dur, vel=1.0, pos=.18, bright=1.0):
    n = int(dur * SR); t = np.arange(n) / SR; f = mtof(m); out = np.zeros(n)
    for h in range(1, 14):
        fh = f * h * (1 + .0002 * h * h)
        if fh > 10000: break
        amp = abs(np.sin(np.pi * h * pos)) / h ** (1.6 / bright)
        out += amp * np.sin(2 * np.pi * fh * t) * np.exp(-t * (1.6 + .55 * h * h / bright))
    click = rng.standard_normal(n) * np.exp(-t * 900) * .05
    return (out + click) * np.minimum(1, t / .002) * vel


def drone(m, dur, swell=1.2):
    n = int(dur * SR); t = np.arange(n) / SR; f = mtof(m)
    vib = 1 + .004 * np.sin(2 * np.pi * 5 * t)
    ph = 2 * np.pi * np.cumsum(f * vib) / SR; out = np.zeros(n)
    for h in range(1, 9): out += np.sin(h * ph) / h
    a = np.minimum(1, t / swell) * np.minimum(1, (dur - t) / swell)
    return lp(out, 700) * a


def wind(n):
    t = np.arange(n) / SR
    x = lfilter(*butter(2, [250 / (SR / 2), 1100 / (SR / 2)], 'band'), rng.standard_normal(n))
    gust = .55 + .3 * np.sin(2 * np.pi * t * .07) + .15 * np.sin(2 * np.pi * t * .23 + 1)
    return x * gust * .5


def boom():
    t = np.arange(int(2.2 * SR)) / SR
    return (np.sin(2 * np.pi * (58 * t - 6 * t * t)) * np.exp(-t * 2.2) + lp(rng.standard_normal(len(t)), 400) * np.exp(-t * 6) * .4) * .9


HOPE = [([43, 50, 55, 59, 62], 31), ([42, 50, 57, 62, 66], 30), ([40, 47, 52, 55, 59], 28), ([48, 52, 55, 60, 64], 36)]   # G  D/F#  Em  C
DARK = [([45, 52, 57, 60, 64], 33), ([41, 48, 53, 57, 60], 29), ([48, 52, 55, 60, 64], 36), ([40, 47, 52, 56, 59], 28)]   # Am  F  C  E
PENTA = {False: [67, 69, 71, 74, 76, 79], True: [69, 72, 74, 76, 79, 81]}


def build_acoustic(T, scenes, cfg):
    bpm = cfg.get('bpm', 72); beat = 60 / bpm; bar = beat * 4
    n = int((T + 4) * SR); gtr = np.zeros(n); low = np.zeros(n); perc = np.zeros(n)

    def put(buf, x, t):
        i = int(t * SR)
        if i >= len(buf) or i < 0: return
        m = min(len(x), len(buf) - i); buf[i:i + m] += x[:m]

    def scene_at(t):
        cur = scenes[0][1]
        for s, sid in scenes:
            if s <= t + .05: cur = sid
        return cur

    B = boom(); mel_i = 2; nbars = int(T / bar) + 2
    for b in range(nbars):
        tb = b * bar; sid = scene_at(tb)
        lvl = cfg['levels'].get(sid, 1); dark = sid in cfg.get('minor', [])
        notes, root = (DARK if dark else HOPE)[b % 4]; var = (b // 4) % 3
        put(low, drone(root + 12, bar + 1.2, 1.0) * (.5 if lvl == 0 else .7), tb)
        # fingerpicking: thumb on the bass string, fingers walking up the chord
        order = [[0, 2, 3, 4, 3, 2, 3, 4], [0, 3, 2, 4, 1, 3, 2, 4], [0, 2, 4, 3, 1, 2, 4, 3]][var]
        skip = {0: {1, 5}, 1: set(), 2: set()}[min(lvl, 2)]
        for e8, idx in enumerate(order):
            if e8 in skip: continue
            put(gtr, guitar(notes[idx] + 12 * (idx > 0 and lvl == 2 and e8 % 2), 2.6, .55 if e8 else .7), tb + e8 * beat / 2 + rng.uniform(0, .012))
        if lvl >= 1:  # lonely high plucked line, sparse
            for q in (0, 2) if lvl == 1 else (0, 1, 2, 3):
                if rng.random() < (.55 if lvl == 1 else .7):
                    mel_i = int(np.clip(mel_i + rng.integers(-1, 2), 0, 5))
                    put(gtr, guitar(PENTA[dark][mel_i], 1.8, .45, pos=.09, bright=1.6), tb + q * beat + rng.uniform(0, .02))
        if lvl >= 2:  # distant drum hits on 1 and the "and" of 3
            put(perc, B * .7, tb); put(perc, B * .45, tb + 2.5 * beat)
            if b % 4 == 3: put(perc, B * .35, tb + 3.5 * beat)
    ir_t = np.arange(int(3.2 * SR)) / SR; ir = rng.standard_normal(len(ir_t)) * np.exp(-ir_t * 1.8); ir /= np.sqrt(np.sum(ir ** 2))
    dry = gtr + .55 * low
    wet = fftconvolve(dry + perc, ir)[:n]
    out = dry + .45 * wet + perc * .8 + wind(n) * cfg.get('wind', .25)
    out = hp(out, 40)
    t_all = np.arange(n) / SR
    fade = np.clip(t_all / 2.5, 0, 1) * np.clip((T - t_all) / 3.0, 0, 1)
    out = (out * fade)[:int(T * SR) + SR]
    return (out / (np.sqrt(np.mean(out ** 2)) + 1e-9)).astype(np.float32)


_build_house = build


def build(T, scenes, cfg):
    return build_acoustic(T, scenes, cfg) if cfg.get('style') == 'acoustic' else _build_house(T, scenes, cfg)
