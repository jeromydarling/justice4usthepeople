"use client";
import { useState } from "react";

// "Autopilot" — prompts that finish the job. The non-techy team should
// never be left holding a "now go click merge" or "now go run the
// workflow" task. Every request should describe the end state, not the
// start state. This section teaches the magic closing phrase and the
// patterns for common verbs.

const CLOSING = `Commit, push, open the PR, and merge it as soon as the build passes. If anything actually needs my approval (a content decision, a privacy call, or a new service that costs money), queue it and tell me at the end — don't stop and ask in the middle.`;

const verbPatterns: { verb: string; bad: string; good: string }[] = [
  {
    verb: "Make a change",
    bad: '"Update the People\'s Center phone."',
    good: '"Update the People\'s Center phone to 612-332-4973. Commit, push, and merge it."'
  },
  {
    verb: "Add new content",
    bad: '"Add a story to /stories."',
    good: '"Add a story to /stories: [details]. Commit and merge to main."'
  },
  {
    verb: "Translate a page",
    bad: '"Translate /know-your-rights into Somali."',
    good: '"Translate /know-your-rights into Somali at /so/know-your-rights. Commit, push, and merge — I trust your DeepL-quality phrasing."'
  },
  {
    verb: "Render a new promo",
    bad: '"Re-render the promo with new music."',
    good: '"Re-render the promo with new music. Trigger the Render promo video workflow, watch the run, open the PR for the new render-promo branch, and merge it."'
  },
  {
    verb: "Verify resources",
    bad: '"Run the resource verification check."',
    good: '"Run the Check resource URLs workflow. If it surfaces a broken URL, open the tracking issue and propose fixes I can review in one PR."'
  },
  {
    verb: "Roll back",
    bad: '"Undo your last change."',
    good: '"Revert your last change to the homepage. Commit and merge the revert PR — the live site should match where it was an hour ago."'
  }
];

const okToAutomate = [
  "Commit changes (with a clear, descriptive message)",
  "Push to a working branch",
  "Open a pull request with a useful body",
  "Merge the PR (squash-merge into main)",
  "Trigger workflows (Render promo, Check resources, Deploy worker)",
  "Open the PR for a workflow's output branch and merge that too",
  "Rebase a stale branch onto main",
  "Re-run a failed workflow"
];

const onlyYou = [
  "Whether new content is right (Claude can show a draft for confirmation)",
  "Whether to publish stories that involve real names or PII",
  "Adding new vendors / services (Stripe, ElevenLabs, etc. need keys you set)",
  "Spending money — re-rendering music, paid Mapbox tiers, etc.",
  "Major rebrand decisions"
];

export function Autopilot() {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard?.writeText(CLOSING).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }
  return (
    <section id="autopilot" className="container-wide pb-12">
      <div className="card p-8">
        <p className="eyebrow">Autopilot</p>
        <h2 className="mt-2 font-serif text-2xl">
          Never get stuck waiting on yourself.
        </h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Claude can commit, merge, deploy, and run workflows on its own — if
          you ask it to. Otherwise it stops at the safe step and waits for
          you to click. Use the closing phrase below at the end of any
          request and you&rsquo;ll be one step instead of three.
        </p>

        {/* The magic closing phrase */}
        <div className="mt-6 rounded-2xl bg-indigo-700/5 p-6 ring-2 ring-indigo-200">
          <div className="flex items-start justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
              The closing phrase — paste at the end of any request
            </p>
            <button
              type="button"
              onClick={copy}
              className="shrink-0 rounded-full border border-indigo-700 bg-indigo-700 px-3 py-1.5 text-xs font-medium text-bone-50 hover:bg-indigo-800"
            >
              {copied ? "Copied!" : "Copy phrase"}
            </button>
          </div>
          <p className="mt-3 font-serif text-lg leading-snug text-ink">
            &ldquo;{CLOSING}&rdquo;
          </p>
          <p className="mt-3 text-xs text-ink-muted">
            Tell Claude this once at the start of a session and it&rsquo;ll
            apply to every request after — or paste it at the end of any
            single prompt.
          </p>
        </div>

        {/* Patterns */}
        <h3 className="mt-8 font-serif text-xl">
          The pattern, by request type
        </h3>
        <p className="mt-2 text-sm text-ink-soft">
          The left column is what gets a non-techy stuck. The right column
          finishes the job.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wider text-ink-muted">
                <th className="py-2 pr-4">Type</th>
                <th className="py-2 pr-4">Half-baked prompt</th>
                <th className="py-2">Autopilot prompt</th>
              </tr>
            </thead>
            <tbody>
              {verbPatterns.map((p) => (
                <tr key={p.verb} className="border-b border-ink/5 align-top">
                  <td className="py-3 pr-4 font-medium text-ink">{p.verb}</td>
                  <td className="py-3 pr-4 text-ember-700">{p.bad}</td>
                  <td className="py-3 text-indigo-900">{p.good}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* What Claude can / can't do alone */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-indigo-700/5 p-5 ring-1 ring-indigo-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
              ✓ Always tell Claude to do these
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {okToAutomate.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="text-indigo-700">·</span>
                  <span className="text-ink">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-ember-50 p-5 ring-1 ring-ember-300">
            <p className="text-xs font-semibold uppercase tracking-wider text-ember-700">
              ✗ Things Claude SHOULD pause for
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {onlyYou.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="text-ember-700">·</span>
                  <span className="text-ink">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Standing-orders prompt */}
        <h3 className="mt-8 font-serif text-xl">
          Set it once, and forget it
        </h3>
        <p className="mt-2 text-sm text-ink-soft">
          At the start of every session with Claude, send this once. Then
          every request from then on auto-finishes.
        </p>
        <div className="mt-3 rounded-2xl bg-bone-100 p-4 ring-1 ring-ink/5">
          <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-ink">
{`Standing rules for this session:
1. Always commit, push, open a PR, and merge to main when you're done.
2. Run any GitHub Action / workflow needed to finish the task — don't
   leave a workflow for me to trigger.
3. If a workflow produces an output branch (e.g. render-promo), open
   that PR and merge it too.
4. Only stop and ask me when there's a real content decision, a
   privacy call, or money would be spent. Otherwise: finish the job.
5. End every reply with a one-line "what's now live" summary.`}
          </pre>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(`Standing rules for this session:
1. Always commit, push, open a PR, and merge to main when you're done.
2. Run any GitHub Action / workflow needed to finish the task — don't leave a workflow for me to trigger.
3. If a workflow produces an output branch (e.g. render-promo), open that PR and merge it too.
4. Only stop and ask me when there's a real content decision, a privacy call, or money would be spent. Otherwise: finish the job.
5. End every reply with a one-line "what's now live" summary.`);
              setCopied(false);
            }}
            className="mt-3 btn-link text-xs"
          >
            Copy the standing rules →
          </button>
        </div>

        <div className="mt-6 rounded-lg border border-ember-300 bg-ember-50 p-4 text-sm text-ember-900">
          <p className="font-semibold">Why this matters</p>
          <p className="mt-1">
            Claude will be polite by default — it&rsquo;ll commit and stop
            at the merge button so you can review. That&rsquo;s the right
            behavior for engineers, not for a non-techy CMS user. Telling
            Claude to finish the job (in the standing rules or per prompt)
            keeps you out of the loop on the mechanical bits and only in
            the loop for decisions that actually need you.
          </p>
        </div>
      </div>
    </section>
  );
}
