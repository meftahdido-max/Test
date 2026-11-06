"""Mix voiceover clips, a synth music bed and SFX using render/events.json.
Usage: python3 mix.py <audio_dir> <events.json> <out.wav>"""
import json, os, subprocess, sys, wave
import numpy as np

SR = 44100
audio_dir, ev_path, out = sys.argv[1:4]
info = json.load(open(ev_path))
T = info["T"]
n = int(T * SR) + SR
voice = np.zeros(n, np.float32)
sfx = np.zeros(n, np.float32)
rng = np.random.default_rng(1)


def load(path):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32)


def add(buf, sig, t, gain=1.0):
    i = int(t * SR)
    if i < 0:
        sig, i = sig[-i:], 0
    m = min(len(sig), len(buf) - i)
    buf[i:i + m] += sig[:m] * gain


def tt(d):
    return np.arange(int(d * SR)) / SR


def lowpass(x, a):
    y = np.empty_like(x); acc = 0.0
    for i, v in enumerate(x):  # small signals only
        acc += a * (v - acc); y[i] = acc
    return y


def pop():
    t = tt(.09); f = 600 + 900 * (t / .09)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 40) * .5


def swish():
    t = tt(.28); x = rng.standard_normal(len(t)).astype(np.float32)
    return lowpass(x, .25) * np.sin(np.pi * t / .28) ** 2 * .35


def whoosh():
    t = tt(.55); x = rng.standard_normal(len(t)).astype(np.float32)
    return lowpass(x, .08) * np.sin(np.pi * t / .55) ** 3 * .9


def stamp():
    t = tt(.25)
    return (np.sin(2 * np.pi * 95 * t) * np.exp(-t * 18) * .8 +
            rng.standard_normal(len(t)) * np.exp(-t * 60) * .25).astype(np.float32)


def ding():
    t = tt(.8)
    return ((np.sin(2 * np.pi * 2093 * t) + .5 * np.sin(2 * np.pi * 3136 * t)) * np.exp(-t * 6) * .18).astype(np.float32)


# sound effects sit well under the voice (was a flat 0.7)
SFX_GAIN = {"pop": .18, "swish": .16, "whoosh": .14, "stamp": .22, "ding": .2}
SFX = {"pop": pop, "swish": swish, "whoosh": whoosh, "stamp": stamp, "ding": ding}
for e in info["ev"]:
    if e["type"] == "voice":
        trimmed = f"{audio_dir}/trim/{e['id']}.wav"
        add(voice, load(trimmed if os.path.exists(trimmed) else f"{audio_dir}/{e['id']}.mp3"), e["t"])
    else:
        add(sfx, SFX[e["type"]](), e["t"], SFX_GAIN.get(e["type"], .2))

# 80s synth pad: Am - F - C - G, 4 s per chord, soft saw + pulsing bass
chords = [[57, 60, 64], [53, 57, 60], [48, 55, 60], [55, 59, 62]]
music = np.zeros(n, np.float32)
cd = 4.0
t_all = np.arange(n) / SR
for k in range(int(T / cd) + 2):
    ch = chords[k % 4]; s, e = int(k * cd * SR), min(n, int((k + 1) * cd * SR + .6 * SR))
    if s >= n: break
    t = t_all[s:e] - k * cd
    env = np.clip(t / .8, 0, 1) * np.clip((cd + .6 - t) / .6, 0, 1)
    seg = np.zeros(e - s)
    for note in ch:
        f = 440 * 2 ** ((note - 69) / 12)
        for h in range(1, 6):
            seg += np.sin(2 * np.pi * f * h * t * (1 + .002 * (h % 2))) / h ** 1.6
    bf = 440 * 2 ** ((ch[0] - 24 - 69) / 12)
    pulse = (np.sin(2 * np.pi * 100 / 60 * 2 * t) > 0) * np.exp(-((t * 100 / 60 * 2) % 1) * 3)
    seg = seg * .06 * env + np.sin(2 * np.pi * bf * t) * .18 * pulse * env
    music[s:e] += seg.astype(np.float32)
music *= .55
fade = np.clip(t_all / 1.5, 0, 1) * np.clip((T - t_all) / 1.5, 0, 1)
music *= fade

# duck music under voice
env = np.convolve(np.abs(voice), np.ones(4410) / 4410, mode="same")
duck = 1 - .45 * np.clip(env / .05, 0, 1)
mix = voice * 1.0 + music * duck + sfx
mix /= max(1.0, np.abs(mix).max() / .95)
with wave.open(out, "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype(np.int16).tobytes())
print("ok", T)
