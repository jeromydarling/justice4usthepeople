// A plain-English inventory of every secret and variable the site relies on.
// Helps the team know what's there, what each thing does, and how to refresh
// it when something expires or breaks.

type Item = {
  name: string;
  kind: "secret" | "variable";
  purpose: string;
  rotation: string;
  url?: string;
};

const items: Item[] = [
  {
    name: "ADMIN_PASSWORD_SHA256",
    kind: "secret",
    purpose: "The password lock for this admin page. Stored as a SHA-256 hash.",
    rotation:
      "Pick a new password, hash it (e.g. echo -n 'newpass' | shasum -a 256), paste the hex into the secret. No expiration — rotate when staff changes."
  },
  {
    name: "FORM_ENDPOINT",
    kind: "secret",
    purpose:
      "The Cloudflare Worker URL that catches form submissions and creates GitHub issues.",
    rotation:
      "Re-deploy the Worker (Actions → Deploy forms Worker), then update this secret with the new URL. No expiration."
  },
  {
    name: "WORKER_GITHUB_PAT",
    kind: "secret",
    purpose:
      "GitHub personal access token used by the form Worker to create issues in the private j4utp-submissions repo.",
    rotation:
      "Fine-grained PAT, scoped to j4utp-submissions only, with Issues: read/write. Set expiration ~1 year. Re-issue and update this secret before it expires.",
    url: "https://github.com/settings/personal-access-tokens"
  },
  {
    name: "CLOUDFLARE_API_TOKEN",
    kind: "secret",
    purpose: "Used by the deploy-forms-Worker workflow to deploy the Cloudflare Worker.",
    rotation: "Cloudflare → My Profile → API Tokens. Recreate before expiry.",
    url: "https://dash.cloudflare.com/profile/api-tokens"
  },
  {
    name: "CLOUDFLARE_ACCOUNT_ID",
    kind: "secret",
    purpose: "Cloudflare account this Worker lives in.",
    rotation: "Doesn't change unless you switch accounts."
  },
  {
    name: "MAPBOX_TOKEN",
    kind: "secret",
    purpose:
      "Public Mapbox token that powers the resource map and per-event maps.",
    rotation:
      "Mapbox → Account → Access tokens. URL-restrict to your domain for safety. Rotate yearly.",
    url: "https://account.mapbox.com/access-tokens/"
  },
  {
    name: "ELEVENLABS_API_KEY",
    kind: "secret",
    purpose: "Used by the render-promo workflow to generate the music track.",
    rotation:
      "ElevenLabs → Profile + API Keys. Keep usage under your plan limits.",
    url: "https://elevenlabs.io/app/settings/api-keys"
  },
  {
    name: "RSS2JSON_API_KEY",
    kind: "secret",
    purpose:
      "Optional: increases the rate limit for the public RSS-to-JSON service the news feed uses.",
    rotation: "rss2json.com → Account. Optional — feed works without it on a small site.",
    url: "https://rss2json.com/me"
  },
  {
    name: "STRIPE_DONATE_25 / 50 / 100 / 250 / CUSTOM",
    kind: "secret",
    purpose: "Stripe Payment Link URLs for the donate page.",
    rotation: "Create new Payment Links in Stripe and update these values.",
    url: "https://dashboard.stripe.com/payment-links"
  },
  {
    name: "STRIPE_MEMBERSHIP_MONTHLY / ANNUAL",
    kind: "secret",
    purpose: "Stripe Payment Links for recurring membership.",
    rotation: "Stripe Dashboard → Payment links → recurring."
  },
  {
    name: "STRIPE_YARDSIGN / TSHIRT / BUTTON_PACK",
    kind: "secret",
    purpose: "Stripe Payment Links for store products.",
    rotation: "Stripe Dashboard → Payment links."
  },
  {
    name: "SITE_URL",
    kind: "variable",
    purpose: "The canonical URL the site identifies as. Used in metadata and emails.",
    rotation: "Update if the domain changes."
  },
  {
    name: "SITE_DOMAIN",
    kind: "variable",
    purpose: "If set, emits a CNAME file for GitHub Pages to use a custom domain.",
    rotation: "Set when the org buys a domain; clear to revert to *.github.io."
  },
  {
    name: "BASE_PATH",
    kind: "variable",
    purpose:
      "Subpath for GitHub Pages project deployments. Empty for apex / custom domain.",
    rotation: 'Set to "/justice4usthepeople" if hosting at a project page.'
  }
];

export function SettingsAudit() {
  return (
    <section id="settings" className="container-wide pb-12">
      <div className="card p-8">
        <p className="eyebrow">Settings audit</p>
        <h2 className="mt-2 font-serif text-2xl">
          Every secret and variable, in plain English.
        </h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Lives at <strong>Settings → Secrets and variables → Actions</strong>{" "}
          on the GitHub repo. You don&rsquo;t need to manage these regularly,
          but when something breaks, this is your decoder ring.
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wider text-ink-muted">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Kind</th>
                <th className="py-2 pr-4">What it does</th>
                <th className="py-2">When to refresh</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.name} className="border-b border-ink/5 align-top">
                  <td className="py-2 pr-4 font-mono text-xs text-ink">
                    {it.name}
                  </td>
                  <td className="py-2 pr-4">
                    <span
                      className={
                        "inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium " +
                        (it.kind === "secret"
                          ? "bg-ember-100 text-ember-700"
                          : "bg-indigo-700/10 text-indigo-700")
                      }
                    >
                      {it.kind}
                    </span>
                  </td>
                  <td className="py-2 pr-4 text-ink">{it.purpose}</td>
                  <td className="py-2 text-ink-soft">
                    {it.rotation}
                    {it.url && (
                      <>
                        {" "}
                        <a
                          href={it.url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-link text-xs"
                        >
                          Open →
                        </a>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
