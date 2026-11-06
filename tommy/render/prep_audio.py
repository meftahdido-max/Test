"""Trim leading/trailing silence from every voice clip and rewrite render/durations.js.
Usage: python3 prep_audio.py <project_dir>   (expects <project_dir>/script.json and <project_dir>/audio/*.mp3)
Writes trimmed clips to <project_dir>/audio/trim/<id>.wav — mix.py prefers those."""
import json, os, subprocess, sys

proj = sys.argv[1]
script = json.load(open(os.path.join(proj, "script.json")))
os.makedirs(os.path.join(proj, "audio", "trim"), exist_ok=True)
# silenceremove at the start, then reverse + remove + reverse to trim the tail; keep 40 ms so words aren't clipped
flt = ("silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.04,"
       "areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.06,areverse,"
       # clarity: cut rumble and mud, lift presence, gentle compression so the voice sits forward
       "highpass=f=70,equalizer=f=250:t=q:w=1:g=-2.5,equalizer=f=3200:t=q:w=1.2:g=3,"
       "acompressor=threshold=-22dB:ratio=3:attack=5:release=90:makeup=2")
dur = {}
for x in script:
    if not x["text"]:
        continue
    src = os.path.join(proj, "audio", f"{x['id']}.mp3")
    dst = os.path.join(proj, "audio", "trim", f"{x['id']}.wav")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-af", flt, "-ac", "1", "-ar", "44100", dst], check=True)
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", dst],
                         capture_output=True, text=True, check=True).stdout
    dur[x["id"]] = float(out)
with open(os.path.join(proj, "render", "durations.js"), "w") as f:
    f.write("window.DUR=" + json.dumps(dur) + ";window.SCRIPT=" + json.dumps(script) + ";")
print(f"{len(dur)} clips, {sum(dur.values()):.1f}s voice")
