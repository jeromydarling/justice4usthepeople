# Justice 4 Us The People

A neighbor-led, immigrant-led movement in the Twin Cities.
**ICE OUT — Stand in solidarity with Minnesota.**

This is a static Next.js site that ships from `main` to **GitHub Pages** via
GitHub Actions. It's designed so a single editor can update copy, programs,
resources, and product links without touching server infrastructure.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in keys you have so far
npm run dev
```

Open http://localhost:3000.

The site uses **server-less primitives** so it works on GitHub Pages with
zero infrastructure:

| Concern | Service | How |
|---|---|---|
| Form submissions | [Formspree](https://formspree.io) | One endpoint per form — set `NEXT_PUBLIC_FORMSPREE_*` |
| Donations + store | [Stripe Payment Links](https://stripe.com/payments/payment-links) | Create the link in Stripe, paste URL into env |
| News | [rss2json.com](https://rss2json.com) | Client-side RSS, no API key needed for low volume |
| Map | [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/) | Free tier — set `NEXT_PUBLIC_MAPBOX_TOKEN` |

Until each env var is set, the affected feature shows a **subtle setup hint
in the UI** so you know exactly which key is missing — nothing breaks.

---

## Deploying to GitHub Pages

1. **Push `main`.** The included workflow at `.github/workflows/deploy.yml`
   builds the static export and publishes it.
2. In the GitHub repo, go to **Settings → Pages** and choose **Source: GitHub
   Actions**.
3. Add your secrets and variables under **Settings → Secrets and variables →
   Actions**:

   **Repository variables**
   - `SITE_URL` — e.g. `https://justice4usthepeople.org`
   - `SITE_NAME` — e.g. `Justice 4 Us The People`
   - `BASE_PATH` — leave **empty** if using a custom domain. Set to
     `/repo-name` if deploying to `https://user.github.io/repo-name/`.
   - `SITE_DOMAIN` — set this if you want the workflow to write a `CNAME`
     file each deploy (e.g. `justice4usthepeople.org`).

   **Repository secrets** (all optional — set as you go)
   - `FORMSPREE_GENERAL`, `FORMSPREE_RENTAL`, `FORMSPREE_FOOD`,
     `FORMSPREE_LEGAL`, `FORMSPREE_VOLUNTEER`, `FORMSPREE_MEMBERSHIP`
   - `STRIPE_DONATE_25`, `STRIPE_DONATE_50`, `STRIPE_DONATE_100`,
     `STRIPE_DONATE_250`, `STRIPE_DONATE_CUSTOM`,
     `STRIPE_MEMBERSHIP_MONTHLY`, `STRIPE_MEMBERSHIP_ANNUAL`,
     `STRIPE_YARDSIGN`, `STRIPE_TSHIRT`, `STRIPE_BUTTON_PACK`
   - `MAPBOX_TOKEN`
   - `RSS2JSON_API_KEY` (optional)

That's it. Push to `main`, watch the Actions tab, and the site is live.

---

## Editing content

Most editorial copy lives in a small set of files — no React knowledge
required to change words:

- `src/lib/site.ts` — org name, mission, contact info, social links
- `src/lib/programs.tsx` — the three relief programs (name, blurb, dignity note)
- `src/lib/program-forms.ts` — form fields per program (rename / add / remove)
- `src/lib/resources.ts` — Twin Cities resource list shown on the map
- `src/lib/news.ts` — RSS feeds + topic tags
- `src/lib/products.ts` — store products
- `src/app/values/page.tsx` — the eight principles ("Our Values")
- `src/app/know-your-rights/page.tsx` — KYR scenario cards

---

## Brand

Inspired by the existing **loon-rising-with-north-star** mark.

- The loon is Minnesota's bird — guardian, watchful, rising.
- The north star is the steady light of justice and belonging.
- The scales mark (globe ↔ flag) lives on as the original wordmark and can
  be dropped in at `/public/brand/logo-scales.svg`.

Brand palette (Tailwind):

- `indigo` — deep navy (justice, wisdom, the night water)
- `ember` — warm gold (the star, the lamp on the porch)
- `terra` — earth (the people, the ground)
- `bone` — cream (paper, broadsheets, breathing room)
- `ink` — quiet black (text)

Type pairing: **Fraunces** (editorial serif) + **Inter** (calm sans).

To replace the inline SVG mark with a real logo file:
1. Drop `logo.svg` (or `.png`) into `/public/brand/`.
2. In `src/components/Logo.tsx`, flip `hasFile` to `true` (or simply update
   the `<BrandMark>` JSX to render an `<Image>` instead of inline SVG).

---

## Forms — replacing the Google Forms

The current relief application Google Forms map to these new embedded forms:

| Old Google Form | New page | Form schema |
|---|---|---|
| Rental / utility relief | `/get-help/rental-utility` | `rentalForm` in `src/lib/program-forms.ts` |
| Immediate food relief | `/get-help/food` | `foodForm` |
| Legal resources | `/get-help/legal` | `legalForm` |
| Volunteer / contact | `/take-action`, `/contact` | `volunteerForm`, `contactForm` |

Each form posts directly to its Formspree endpoint with a honeypot, success
state, and accessible labels. **Compare each form's fields to the live Google
Form** and tweak `program-forms.ts` to match — labels and required flags are
plain TypeScript and shouldn't take more than a few minutes per form.

---

## Donations — replacing the GoFundMe

The GoFundMe page is still linked as a fallback CTA, but the primary path is
now Stripe Payment Links (no server, no webhooks, no PCI scope):

1. In your Stripe dashboard, create a **Payment Link** for each amount /
   product.
2. Copy the URL (looks like `https://buy.stripe.com/abc...`).
3. Paste it into the matching repo secret (`STRIPE_DONATE_25` etc).
4. Push — the workflow rebuilds and the new link is live.

GoFundMe doesn't allow iframe embeds (X-Frame-Options blocks it), so the
GoFundMe lives as a clearly-labeled supplemental "or use our existing
campaign" card on the donate page.

---

## Suggestions for future stickiness

A few ideas worth picking up next:

- **Weekly briefing** — a low-volume email send (Buttondown or Substack) that
  recaps relief delivered, KYR clinics, and one neighbor story. Embed signup
  in the footer.
- **Court-watch calendar** — `.ics` feed of upcoming local immigration court
  dates with sign-ups for accompaniment.
- **Story wall** — a moderated stream of one-paragraph stories from neighbors
  who've been helped (with consent), surfaced on the home page.
- **Live impact ticker** — a tiny static JSON file (`/public/impact.json`)
  with the running totals updated weekly, fetched on the home page.
- **SMS broadcast** — a "Text JOIN to 555..." channel for rapid-response
  alerts. Twilio Studio handles this without a backend.

---

## License

Code released for the work. © Justice 4 Us The People.
