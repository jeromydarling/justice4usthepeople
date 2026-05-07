"use client";
import { useState } from "react";

// Simplified: the team should never have to think about workflows or PRs.
// Tell Claude what video you want, paste the autopilot phrase, done.
// Claude triggers the render, opens the PR, and merges when it's ready.

const PROMPT_BASE = `Make me a new promo video.

What I want:
[describe the video — e.g. "30-second cutdown for the March 21 march, focused on the call to show up; use the existing skyline backdrop"]

Finish the job:
- Update promo/index.html (or save a new variant if I'm asking for a cutdown)
- Trigger the Render promo video workflow
- Watch the run, open the PR for the new render-promo branch, and merge it
- The site picks up the new MP4 automatically — confirm when it's live

If anything actually needs my approval (a content decision, money for new music, or a brand-new service), queue it and tell me at the end. Otherwise: finish the job.`;

const QUICK_PROMPTS: { label: string; prompt: string }[] = [
  {
    label: "Re-render with fresh music",
    prompt:
      "Re-render the promo with a fresh ElevenLabs music track. Same composition, same skyline, just new music. Trigger the render workflow, open the PR, merge when it looks right. Confirm when the new MP4 is live."
  },
  {
    label: "30-second social cutdown",
    prompt:
      "Make a 30-second cutdown of the promo for social posting. Use beats 1, 4, 6, 7 (opening, three doors, KYR card, CTA). Save as promo/index-30s.html, render it, open the PR with the new MP4, and merge it. Confirm when it's live at /promo/promo-30s.mp4."
  },
  {
    label: "Spanish-language version",
    prompt:
      "Create a Spanish-language version of the promo. Translate every on-screen caption (DeepL quality). Save as promo/index-es.html, render it, open the PR, and merge it. Confirm when it's live at /promo/promo-es.mp4."
  },
  {
    label: "Holiday banner video",
    prompt:
      "Add a 10-second looping homepage banner video for [HOLIDAY/MOMENT]. Skyline backdrop, brand mark, and one short caption that I'll write below. Add a feature flag so we can toggle it on/off. Render and merge. Confirm when it's live.\n\nCaption text: [WRITE YOUR CAPTION]"
  },
  {
    label: "Event-specific teaser",
    prompt:
      "Create a 15-second teaser video for [EVENT NAME] on [DATE]. Skyline backdrop, big date display, location, partners, CTA URL. Save as promo/[event-slug]-teaser.html, render it, open the PR, and merge it. Confirm when it's live."
  },
  {
    label: "Just change the script copy",
    prompt:
      "On the promo, change beat [N] from \"[CURRENT TEXT]\" to \"[NEW TEXT]\". Re-render, open the PR, merge. Confirm when the updated MP4 is live."
  }
];

export function VideoRunbook() {
  const [copied, setCopied] = useState<string | null>(null);
  function copy(text: string) {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(text);
      setTimeout(() => setCopied(null), 1400);
    });
  }
  return (
    <section id="videos" className="container-wide pb-12">
      <div className="card p-8">
        <p className="eyebrow">Videos</p>
        <h2 className="mt-2 font-serif text-2xl">
          Want a new video? Just ask Claude.
        </h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          One paste-able prompt and Claude takes care of the whole thing —
          editing the video, generating new music, rendering, opening the
          PR, and merging it. You never touch GitHub Actions.
        </p>

        {/* The universal prompt */}
        <div className="mt-6 rounded-2xl bg-indigo-700/5 p-6 ring-2 ring-indigo-200">
          <div className="flex items-start justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
              The universal video prompt — paste, fill in the bracket, send
            </p>
            <button
              type="button"
              onClick={() => copy(PROMPT_BASE)}
              className="shrink-0 rounded-full border border-indigo-700 bg-indigo-700 px-3 py-1.5 text-xs font-medium text-bone-50 hover:bg-indigo-800"
            >
              {copied === PROMPT_BASE ? "Copied!" : "Copy prompt"}
            </button>
          </div>
          <pre className="mt-3 whitespace-pre-wrap font-mono text-xs leading-relaxed text-ink">
{PROMPT_BASE}
          </pre>
        </div>

        {/* Common pre-built prompts */}
        <h3 className="mt-8 font-serif text-xl">Common variants</h3>
        <p className="mt-2 text-sm text-ink-soft">
          Each one is already filled in — just copy, swap the bracketed
          values where needed, and paste into Claude.
        </p>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {QUICK_PROMPTS.map((q) => (
            <li
              key={q.label}
              className="rounded-2xl bg-bone-100 p-4 ring-1 ring-ink/5"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  {q.label}
                </p>
                <button
                  type="button"
                  onClick={() => copy(q.prompt)}
                  className={
                    "shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium transition " +
                    (copied === q.prompt
                      ? "border-indigo-700 bg-indigo-700 text-bone-50"
                      : "border-ink/15 bg-bone-50 text-ink hover:bg-ink/5")
                  }
                >
                  {copied === q.prompt ? "Copied!" : "Copy"}
                </button>
              </div>
              <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-ink">
                {q.prompt}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-7 rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-sm leading-relaxed text-indigo-900">
          <p className="font-semibold">A note on costs</p>
          <p className="mt-1">
            Each new music track from ElevenLabs costs a few dollars. Re-using
            existing music is free. If you don&rsquo;t want to spend on music,
            add{" "}
            <em>&ldquo;keep the existing music — don&rsquo;t regenerate.&rdquo;</em>{" "}
            to your prompt.
          </p>
        </div>

        <div className="mt-4 rounded-lg border border-ember-300 bg-ember-50 p-4 text-sm text-ember-900">
          <p className="font-semibold">If something breaks</p>
          <p className="mt-1">
            Tell Claude exactly what you saw or paste a screenshot. The
            workflow log is at{" "}
            <a
              href="https://github.com/jeromydarling/justice4usthepeople/actions/workflows/render-promo.yml"
              target="_blank"
              rel="noreferrer"
              className="btn-link"
            >
              GitHub → Actions → Render promo video
            </a>
            . Claude can read it directly when you ask.
          </p>
        </div>
      </div>
    </section>
  );
}
