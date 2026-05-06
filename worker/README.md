# Forms Worker

A Cloudflare Worker that receives form submissions from the static site and
creates a **GitHub Issue** in a private repo. No third-party email service.
No database. Submission data lives in GitHub.

The Worker source (`src/index.ts`) is the entire form handler — about 200
lines, all yours. Adapt it however you want.

---

## What it does

```
[ static site form ]  →POST→  [ Cloudflare Worker ]  →POST→  [ GitHub Issues API ]
                                       │
                                       └→ honeypot, CORS, rate limit
```

For each submission:

- Validates the request comes from an allowed origin.
- Drops anything that fills the honeypot field (`_gotcha`).
- Optionally rate-limits by IP (up to N submissions/minute).
- Creates a GitHub Issue with:
  - **Title**: from the form's `_subject` field
  - **Body**: a tidy markdown table of every field, plus quoted long-text
    blocks for `story` / `message` / etc.
  - **Labels**: a default label (e.g. `form-submission`) plus the form ID.

You and your teammates get a normal GitHub notification email. Issues can be
assigned, labeled, commented, closed — every submission becomes a ticket.

---

## One-time setup

### 1. Create the submissions repo

Create a **private** GitHub repo to hold the issues. Recommended name:
`j4utp-submissions`. Submissions contain PII (phone numbers, addresses,
sometimes immigration status); the repo must be private.

You don't need any code in this repo — only Issues are used.

### 2. Create a fine-grained Personal Access Token

Go to https://github.com/settings/personal-access-tokens/new and create a
**fine-grained** token:

- **Resource owner**: `jeromydarling`
- **Repository access**: *Only select repositories* → choose `j4utp-submissions`
- **Permissions**: under "Repository permissions"
  - **Issues**: Read & write
  - (everything else: No access)
- **Expiration**: pick a date you'll remember to rotate (e.g. 1 year)

Copy the token. You'll paste it into the Worker as a secret.

### 3. Install Wrangler & deploy

```bash
cd worker
npm install
npx wrangler login                                 # one-time, opens browser
npx wrangler secret put GITHUB_TOKEN               # paste the PAT from step 2
npx wrangler deploy
```

`wrangler deploy` prints the Worker URL, which looks like:

```
https://j4utp-forms.<your-cf-subdomain>.workers.dev
```

Copy that URL.

### 4. Wire it into the site

Add it as a repository **secret** in your GitHub repo:

- **Settings → Secrets and variables → Actions → New repository secret**
  - Name: `FORM_ENDPOINT`
  - Value: the Worker URL from step 3

Push to `main` (or re-run the deploy workflow). The site will now POST every
form to your Worker, which creates issues in your submissions repo.

---

## Configuration knobs

All in `wrangler.toml`:

| Var | What it does |
|---|---|
| `ALLOWED_ORIGINS` | Comma-separated. Set to your live domain(s). Use `*` only for testing. |
| `ISSUES_REPO` | `owner/repo` of the private submissions repo. |
| `ISSUES_LABEL` | Default label applied to every issue. |
| `RATE_LIMIT_PER_MIN` | Soft per-IP limit. Requires the KV namespace below. |

Secrets (set via `wrangler secret put NAME`):

| Secret | What it does |
|---|---|
| `GITHUB_TOKEN` | Fine-grained PAT scoped to the submissions repo. |

Optional: enable per-IP rate limiting.

```bash
npx wrangler kv namespace create FORMS_RL
# copy the printed id, paste it into wrangler.toml under [[kv_namespaces]]
npx wrangler deploy
```

---

## Local development

```bash
cd worker
npm run dev
# Worker runs at http://localhost:8787
```

In the main site's `.env.local`:

```
NEXT_PUBLIC_FORM_ENDPOINT=http://localhost:8787
```

Add `http://localhost:3000` to `ALLOWED_ORIGINS` in `wrangler.toml`.

---

## Swapping in another backend

The handler in `src/index.ts` is simple and modular. To send email instead of
creating issues, replace `createIssue` with a call to whatever provider you
prefer (Resend, Postmark, your own SMTP relay). The fetch+CORS+honeypot
plumbing stays the same.
