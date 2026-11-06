"""Mix voiceover clips, the generated score (music.py, shaped by render/music.json) and SFX using render/events.json.
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
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import music as score

VOICE_RMS = 10 ** (-19 / 20)  # every clip brought to the same loudness so no line sounds faded
scenes = []
for e in info["ev"]:
    if e["type"] == "voice":
        trimmed = f"{audio_dir}/trim/{e['id']}.wav"
        clip = load(trimmed if os.path.exists(trimmed) else f"{audio_dir}/{e['id']}.mp3")
        loud = clip[np.abs(clip) > .02]
        if len(loud): clip = clip * (VOICE_RMS / np.sqrt(np.mean(loud ** 2)))
        add(voice, clip, e["t"])
    elif e["type"] == "scene":
        scenes.append((e["t"], e["id"]))
    else:
        add(sfx, SFX[e["type"]](), e["t"], SFX_GAIN.get(e["type"], .2))

cfg_path = os.path.join(os.path.dirname(ev_path), "music.json")
cfg = json.load(open(cfg_path)) if os.path.exists(cfg_path) else {"levels": {}}
music = score.build(T, sorted(scenes) or [(0, "")], cfg)[:n]
music = np.pad(music, (0, n - len(music))) * 10 ** (cfg.get("db", -27) / 20)

# duck music under the voice
env = np.convolve(np.abs(voice), np.ones(4410) / 4410, mode="same")
duck = 1 - .5 * np.clip(env / .04, 0, 1)
mix = voice + music * duck + sfx
mix /= max(1.0, np.abs(mix).max() / .95)
with wave.open(out, "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype(np.int16).tobytes())
print("ok", T)
