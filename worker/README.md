# Forms Worker

A Cloudflare Worker that receives form submissions from the static site and
creates a **GitHub Issue** in a private repo. No third-party email service.
No database. Submission data lives in GitHub.

The Worker source (`src/index.ts`) is the entire form handler — about 200
lines, all yours.

> ⚠️ **Do not deploy this via Cloudflare Pages.** Pages is for static sites;
> Workers is a separate product. Use the GitHub Actions workflow described
> below, or run `wrangler deploy` from your machine.

---

## How it works

```
[ static site form ]  →POST→  [ Cloudflare Worker ]  →POST→  [ GitHub Issues API ]
                                       │
                                       └→ honeypot, CORS, rate limit
```

For each submission:

- Validates the request comes from an allowed origin.
- Drops anything that fills the honeypot field (`_gotcha`).
- Optionally rate-limits by IP (up to N submissions/minute).
- Creates a GitHub Issue with a tidy markdown body, labeled with the form ID.

You and your teammates get normal GitHub notification emails. Issues can be
assigned, labeled, commented, closed — every submission becomes a ticket.

---

## Recommended setup: deploy via GitHub Actions (no terminal needed)

The workflow at `.github/workflows/worker-deploy.yml` deploys the Worker
automatically every time anything in `/worker` changes on `main`.

### 1. Create the submissions repo

Create a **private** GitHub repo to hold the issues. Recommended name:
`j4utp-submissions`. You don't need any code in it — only Issues are used.
Make sure `worker/wrangler.toml` points at it (already set).

### 2. Create a GitHub fine-grained PAT for the Worker

https://github.com/settings/personal-access-tokens/new

- **Resource owner**: `jeromydarling`
- **Repository access**: *Only select repositories* → `j4utp-submissions`
- **Permissions** → Repository permissions:
  - **Issues**: Read & write
  - everything else: No access
- **Expiration**: pick a date you'll rotate (1 year is fine)

Copy the token (starts with `github_pat_…`). Don't paste it anywhere public.

### 3. Create a Cloudflare API token

https://dash.cloudflare.com/profile/api-tokens

- Click **Create Token** → **Edit Cloudflare Workers** template
- Account / zone scope: leave default
- Click **Continue to summary** → **Create Token** → copy the token

You'll also need your **Cloudflare Account ID** — find it on the right side
of any page in the Cloudflare dashboard.

### 4. Add three GitHub repository secrets

Go to **Settings → Secrets and variables → Actions → New repository secret**
and add:

| Secret name | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | the token from step 3 |
| `CLOUDFLARE_ACCOUNT_ID` | your CF account ID |
| `WORKER_GITHUB_PAT` | the PAT from step 2 |

### 5. Trigger the deploy

Either push any change to `worker/` on `main`, or go to **Actions → Deploy
forms Worker → Run workflow**.

The job:
1. Installs `wrangler`
2. Pushes your `WORKER_GITHUB_PAT` into the Worker as the `GITHUB_TOKEN` secret
3. Deploys the Worker

The deploy log prints the public Worker URL, e.g.
`https://j4utp-forms.<your-cf-subdomain>.workers.dev`.

### 6. Wire the URL into the static site

Add one more GitHub secret:

| Secret name | Value |
|---|---|
| `FORM_ENDPOINT` | the Worker URL from step 5 |

Push or re-run the **Build & deploy to GitHub Pages** workflow. Forms on the
site will now POST to your Worker.

---

## Manual deploy (alternative)

If you'd rather deploy from your machine:

```bash
cd worker
npm install
npx wrangler login                                  # opens browser, one-time
npx wrangler secret put GITHUB_TOKEN                # paste your PAT
npx wrangler deploy
```

---

## Configuration

`wrangler.toml`:

| Var | What it does |
|---|---|
| `ALLOWED_ORIGINS` | Comma-separated. Set to your live domain(s). |
| `ISSUES_REPO` | `owner/repo` of the private submissions repo. |
| `ISSUES_LABEL` | Default label applied to every issue. |
| `RATE_LIMIT_PER_MIN` | Soft per-IP limit (requires the KV namespace below). |

Worker secrets (auto-pushed by the workflow, or manually via `wrangler secret put`):

| Secret | What it does |
|---|---|
| `GITHUB_TOKEN` | Fine-grained PAT scoped to the submissions repo. |

### Optional: enable per-IP rate limiting

```bash
cd worker
npx wrangler kv namespace create FORMS_RL
# copy the printed id, paste it into wrangler.toml under [[kv_namespaces]]
npx wrangler deploy
```

---

## Local development

```bash
cd worker
npm install
npm run dev
# Worker runs at http://localhost:8787
```

In the main site's `.env.local`:

```
NEXT_PUBLIC_FORM_ENDPOINT=http://localhost:8787
```

Add `http://localhost:3000` to `ALLOWED_ORIGINS` in `wrangler.toml`.

---

## What if I exposed my PAT?

Revoke it immediately at
https://github.com/settings/personal-access-tokens (click the token →
**Delete**), generate a new one, and update the `WORKER_GITHUB_PAT` GitHub
secret. Cloudflare's deploy log doesn't redact build commands, so never
paste tokens directly into the build command field.
