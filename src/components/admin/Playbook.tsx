// Two practical sections in one card:
//   1. Operational rhythms — what to look at, when
//   2. When something looks wrong — symptom → action
//
// All actions are framed as "ask Claude" so the team never has to remember
// where any tool lives.

const cadence: { interval: string; items: string[] }[] = [
  {
    interval: "Daily (1–2 minutes)",
    items: [
      "Glance at form submissions — the GitHub issues link in Quick Links.",
      "Skim the homepage news strip for ICE-related stories worth amplifying."
    ]
  },
  {
    interval: "Weekly (~15 minutes)",
    items: [
      'Compose & send the digest from the "Compose this week\'s digest" section below.',
      "Update the homepage's \"Next event\" if the previous one passed.",
      "Make sure /events lists this week's gatherings."
    ]
  },
  {
    interval: "Monthly",
    items: [
      'Review the open "Resource verification" issue — fix or remove broken URLs and bump verifiedAt for the ones you confirm.',
      "Refresh the donation transparency numbers on the homepage."
    ]
  },
  {
    interval: "Quarterly",
    items: [
      "Add at least one new story to /stories.",
      "Review the coalition partners list on /partners."
    ]
  }
];

const fixes: { symptom: string; action: string }[] = [
  {
    symptom: "My change isn't showing on the live site.",
    action:
      "Hard-refresh first (Cmd/Ctrl + Shift + R). Static deploys take ~90 seconds. If still missing, check the Actions tab — if the build failed, paste the error message into Claude."
  },
  {
    symptom: "Form submissions stopped coming through.",
    action:
      'Check the private j4utp-submissions repo for new issues. If they\'re landing there but not in your inbox, the Make.com scenario may be paused. If nothing is landing in GitHub, ask Claude: "Investigate why the contact form isn\'t creating issues."'
  },
  {
    symptom: "The site looks broken on my phone.",
    action:
      "Hard-refresh first; cached CSS is the most common culprit. If still broken, take a screenshot and paste it to Claude with: \"This page looks broken on my phone — fix this.\""
  },
  {
    symptom: "I made a change and want to undo it.",
    action:
      'Tell Claude: "Revert the last change you made to [page]," or "Undo PR #X." Claude opens a small reverse-PR you can merge in one click.'
  },
  {
    symptom: "The map is empty / markers don't appear.",
    action:
      'Most likely the Mapbox token expired. Ask Claude: "The map isn\'t loading — help me check the Mapbox token." Claude points you to the secret to refresh.'
  },
  {
    symptom: "I want to roll back to yesterday's version.",
    action:
      "Tell Claude the date or what was the last good state. Claude finds the right commit and opens a revert PR."
  }
];

export function Playbook() {
  return (
    <section id="playbook" className="container-wide pb-12">
      <div className="card p-8">
        <p className="eyebrow">Common tasks playbook</p>
        <h2 className="mt-2 font-serif text-2xl">
          What to do, when. What to do when something&rsquo;s off.
        </h2>

        <h3 className="mt-7 font-serif text-xl">A simple cadence</h3>
        <ul className="mt-3 grid gap-4 md:grid-cols-2">
          {cadence.map((c) => (
            <li
              key={c.interval}
              className="rounded-2xl bg-bone-100 p-5 ring-1 ring-ink/5"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-ember-700">
                {c.interval}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-ink">
                {c.items.map((it, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-indigo-700">·</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <h3 className="mt-10 font-serif text-xl">When something looks wrong</h3>
        <p className="mt-2 text-sm text-ink-soft">
          Match the symptom to the action. When in doubt, paste a screenshot
          into Claude.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wider text-ink-muted">
                <th className="py-2 pr-4">Symptom</th>
                <th className="py-2">What to do</th>
              </tr>
            </thead>
            <tbody>
              {fixes.map((f) => (
                <tr key={f.symptom} className="border-b border-ink/5 align-top">
                  <td className="py-3 pr-4 font-medium text-ink">{f.symptom}</td>
                  <td className="py-3 text-ink-soft">{f.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-7 rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-900">
          <p className="font-semibold">A safety net you can lean on</p>
          <p className="mt-1">
            Every change Claude makes is recorded as a commit. You can roll
            back any change just by saying so. Nothing is destructive.
          </p>
        </div>
      </div>
    </section>
  );
}
