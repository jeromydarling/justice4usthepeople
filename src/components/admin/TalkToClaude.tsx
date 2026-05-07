// Anatomy of a good prompt + side-by-side examples + always-works phrases.
// Designed to give a non-technical user the shape of a useful request without
// teaching them code or filenames.

const works = [
  "On /get-help, change the People's Center phone to 612-332-4973.",
  "Add a story to /stories. Title: \"After the call.\" Tag: court accompaniment. Body: 4 sentences in privacy-safe language.",
  "Translate /know-your-rights into Spanish — DeepL quality.",
  "Show me the diff before you apply it.",
  "Make this section feel like the existing Programs section."
];

const stuck = [
  "Make the site better.",
  "Fix the bug.",
  "Add a thing for volunteers.",
  "Update the page.",
  "Make it pop."
];

const phrases = [
  "Where would I edit X?",
  "Show me how X works first.",
  "What would you change?",
  "Don't touch X.",
  "Undo your last change.",
  "Make it match the existing X.",
  "What do you need from me to do this?",
  "What would break if I do X?"
];

export function TalkToClaude() {
  return (
    <section id="talk" className="container-wide pb-12">
      <div className="card p-8">
        <p className="eyebrow">How to talk to Claude</p>
        <h2 className="mt-2 font-serif text-2xl">
          Anatomy of a good prompt.
        </h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Three things make a request land cleanly. You don&rsquo;t need to
          know code or filenames — Claude finds those.
        </p>

        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          <li className="rounded-2xl bg-bone-100 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ember-700">
              1 · WHAT
            </p>
            <p className="mt-2 font-serif text-lg">The specific change.</p>
            <p className="mt-2 text-sm text-ink-soft">
              Use real numbers, real text, real names. Avoid &ldquo;make it
              nicer&rdquo; — what does nicer mean to you?
            </p>
          </li>
          <li className="rounded-2xl bg-bone-100 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ember-700">
              2 · WHERE
            </p>
            <p className="mt-2 font-serif text-lg">The page or section.</p>
            <p className="mt-2 text-sm text-ink-soft">
              A URL like <code>/get-help</code> is the cleanest signal.
              &ldquo;The page about resources&rdquo; works too.
            </p>
          </li>
          <li className="rounded-2xl bg-bone-100 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ember-700">
              3 · WHY (optional)
            </p>
            <p className="mt-2 font-serif text-lg">Context for the change.</p>
            <p className="mt-2 text-sm text-ink-soft">
              &ldquo;The org changed phone numbers&rdquo; or &ldquo;for our
              spring fundraising push&rdquo; helps Claude pick a tone.
            </p>
          </li>
        </ol>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-indigo-700/5 p-5 ring-1 ring-indigo-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
              ✓ Prompts that work
            </p>
            <ul className="mt-3 space-y-3 text-sm text-ink">
              {works.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-indigo-700">·</span>
                  <span>&ldquo;{p}&rdquo;</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-ember-50 p-5 ring-1 ring-ember-300">
            <p className="text-xs font-semibold uppercase tracking-wider text-ember-700">
              ✗ Prompts that get stuck
            </p>
            <ul className="mt-3 space-y-3 text-sm text-ink">
              {stuck.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-ember-700">·</span>
                  <span>&ldquo;{p}&rdquo;</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h3 className="mt-8 font-serif text-xl">Phrases that always work</h3>
        <p className="mt-2 text-sm text-ink-soft">
          When you don&rsquo;t know what to ask, lean on one of these.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {phrases.map((p) => (
            <li
              key={p}
              className="rounded-lg border border-ink/10 bg-bone-50 px-3 py-2 font-mono text-xs text-ink"
            >
              &ldquo;{p}&rdquo;
            </li>
          ))}
        </ul>

        <div className="mt-7 rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-900">
          <p className="font-semibold">One last note</p>
          <p className="mt-1">
            You can&rsquo;t break the live site by talking to Claude. Every
            change is a separate proposal you can review (or undo) before it
            goes live. If something feels wrong, say{" "}
            <em>&ldquo;undo your last change&rdquo;</em>.
          </p>
        </div>
      </div>
    </section>
  );
}
