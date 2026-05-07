// Plain-English definitions. Designed for someone who's never written code,
// so they can read a Claude reply or a GitHub UI without getting lost in
// jargon. Sorted A→Z within each group.

const groups: { label: string; items: { term: string; def: string }[] }[] = [
  {
    label: "Where the site lives",
    items: [
      {
        term: "Repo (repository)",
        def: "The box that holds the website's code. Think of it as a Google Drive folder, but for code, with full version history."
      },
      {
        term: "Branch",
        def: "A parallel copy of the repo for a specific change. Claude usually makes a branch for each task. Branches don't affect the live site until merged."
      },
      {
        term: "Commit",
        def: "A saved snapshot. Each commit is a recorded change with a one-line description. You'll see Claude's commits in the GitHub history."
      },
      {
        term: "Pull request (PR)",
        def: "A bundle of changes proposed for review before merging into the live site. Claude usually creates one, then merges it for you."
      },
      {
        term: "Merge",
        def: "Apply a branch's changes to the main code. After a merge, the live site rebuilds and the changes appear in ~90 seconds."
      },
      {
        term: "Issue",
        def: "A tracked task or report. Form submissions land as issues in the private j4utp-submissions repo."
      },
      {
        term: "Action / workflow",
        def: "An automated job that runs in GitHub — e.g. building the site, rendering the promo video, checking resource URLs. Listed in the 'Actions' tab."
      },
      {
        term: "Deploy",
        def: "The process of pushing changes onto the live website. Happens automatically after every merge to main."
      }
    ]
  },
  {
    label: "Behind the scenes",
    items: [
      {
        term: "Secret",
        def: "A piece of sensitive info (password, API key) stored encrypted on GitHub. Workflows can use it; humans can't see the value once set."
      },
      {
        term: "Environment variable",
        def: "A value passed into the build at deploy time — secrets become these. You'll rarely interact with them directly."
      },
      {
        term: "API",
        def: "A way for one service to talk to another (Stripe for payments, Mapbox for the map, ElevenLabs for music)."
      },
      {
        term: "API key",
        def: "A password specifically for talking to an API. Always stored as a secret."
      },
      {
        term: "CDN",
        def: "Content delivery network. Caches the site close to your visitors so it loads fast. GitHub Pages uses one automatically."
      },
      {
        term: "Static site",
        def: "A website where every page is pre-built into a file. Fast, cheap, secure. That's what this is."
      }
    ]
  },
  {
    label: "Tools you'll see Claude use",
    items: [
      {
        term: "Cloudflare Worker",
        def: "A tiny piece of server code that handles form submissions. It catches the form POST, sanity-checks it, and creates a GitHub issue."
      },
      {
        term: "Mapbox",
        def: "The mapping service that powers the resource map and the per-event maps."
      },
      {
        term: "Make.com",
        def: "A no-code automation tool. Watches the submissions repo for new issues and emails them to the org."
      },
      {
        term: "Stripe",
        def: "The payment processor for donations and store purchases."
      },
      {
        term: "ElevenLabs",
        def: "AI voice and music generator. Used for the promo video's backing track."
      },
      {
        term: "DeepL",
        def: "AI translation service. Used to refine Spanish and Somali translations on the site."
      }
    ]
  }
];

export function Glossary() {
  return (
    <section id="glossary" className="container-wide pb-12">
      <div className="card p-8">
        <p className="eyebrow">Glossary</p>
        <h2 className="mt-2 font-serif text-2xl">
          Plain-English definitions.
        </h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          When Claude or GitHub uses a word that loses you, find it here.
          You don&rsquo;t need to memorize any of this.
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {groups.map((g) => (
            <div key={g.label}>
              <h3 className="font-serif text-lg">{g.label}</h3>
              <dl className="mt-3 space-y-3 text-sm">
                {g.items.map((it) => (
                  <div key={it.term}>
                    <dt className="font-medium text-ink">{it.term}</dt>
                    <dd className="mt-0.5 text-ink-soft">{it.def}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
