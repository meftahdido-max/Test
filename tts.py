"""Generate a project's voiceover with the channel narrator (Brian by default).
Usage:
  python3 tts.py <project_dir>            # only lines that have no clip yet
  python3 tts.py <project_dir> --all      # re-record every line (e.g. after switching voice)
Then: python3 tommy/render/prep_audio.py <project_dir>  (trims + cleans clips, rewrites durations.js)

The ElevenLabs key is injected by the session's network proxy; when running locally, set
ELEVENLABS_API_KEY in your environment instead (never commit it)."""
import json, os, subprocess, sys

VOICE = {
    "voice_id": "nPczCjzI2devNBz1zQrb",  # Brian (ElevenLabs premade) — chosen as the channel narrator
    "model_id": "eleven_multilingual_v2",
    "voice_settings": {"stability": 0.3, "similarity_boost": 0.8, "style": 0.55, "use_speaker_boost": True},
}

proj = sys.argv[1]
redo = "--all" in sys.argv
script = json.load(open(os.path.join(proj, "script.json")))
todo = [x for x in script if x["text"] and (redo or not os.path.exists(os.path.join(proj, "audio", f"{x['id']}.mp3")))]
print(f"{len(todo)} lines, {sum(len(x['text']) for x in todo)} characters")
headers = ["-H", "Content-Type: application/json"]
if os.environ.get("ELEVENLABS_API_KEY"):
    headers += ["-H", "xi-api-key: " + os.environ["ELEVENLABS_API_KEY"]]
for x in todo:
    body = json.dumps({"text": x["text"], "model_id": VOICE["model_id"], "voice_settings": VOICE["voice_settings"]})
    dst = os.path.join(proj, "audio", f"{x['id']}.mp3")
    code = subprocess.run(["curl", "-sS", "-w", "%{http_code}", "-X", "POST",
                           f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE['voice_id']}?output_format=mp3_44100_128",
                           *headers, "-d", body, "-o", dst], capture_output=True, text=True).stdout
    if code != "200":
        print("FAILED", x["id"], code, open(dst).read()[:300]); os.remove(dst); sys.exit(1)
    print("ok", x["id"])
