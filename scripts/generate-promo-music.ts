// Generates a 60-second instrumental backing track for the promo video
// using the ElevenLabs Music API and writes it to promo/music.wav.
//
// Requires the env var ELEVENLABS_API_KEY to be set. Run from repo root:
//   ELEVENLABS_API_KEY=sk_... npm run promo:music
//
// In CI, the render-promo.yml workflow injects the secret automatically.
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";

const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) {
  console.error(
    "ELEVENLABS_API_KEY is not set. Add it as a GitHub secret or export locally."
  );
  process.exit(2);
}

// Music brief — see promo/script.md for the editorial intent.
const PROMPT = [
  "Slow, hopeful instrumental. Fingerpicked acoustic guitar over a warm",
  "organ pad. Light brushed-kit percussion entering around the 18-second",
  "mark. Builds gently to a swell at 42 seconds, then resolves to a clean",
  "held chord at 55. Folk-Americana with a Midwestern dignity. No vocals,",
  "no overproduction."
].join(" ");

const LENGTH_MS = 60_000;
const OUT = resolve(process.cwd(), "promo", "music.wav");

async function main() {
  console.log("Requesting music from ElevenLabs…");
  console.log(`  prompt: ${PROMPT.slice(0, 80)}…`);
  console.log(`  length: ${LENGTH_MS} ms`);

  const res = await fetch("https://api.elevenlabs.io/v1/music", {
    method: "POST",
    headers: {
      "xi-api-key": KEY!,
      "Content-Type": "application/json",
      Accept: "audio/wav"
    },
    body: JSON.stringify({
      prompt: PROMPT,
      music_length_ms: LENGTH_MS,
      output_format: "wav_44100"
    })
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error(`ElevenLabs returned HTTP ${res.status}`);
    console.error(text.slice(0, 500));
    process.exit(1);
  }

  const buf = Buffer.from(await res.arrayBuffer());
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, buf);
  console.log(`Wrote ${OUT} (${(buf.byteLength / 1024).toFixed(0)} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
