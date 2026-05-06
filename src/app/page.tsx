import Link from "next/link";
import { BrandMark } from "@/components/Logo";
import { SectionHeader } from "@/components/SectionHeader";
import { ProgramCard, Arrow } from "@/components/ProgramCard";
import { programs } from "@/lib/programs";
import { site } from "@/lib/site";
import { sortEvents, formatDate, formatTime, icsHref } from "@/lib/events";

export default function HomePage() {
  const { upcoming } = sortEvents();
  const nextEvent = upcoming[0];
  return (
    <>
      {/* Hero ----------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-bone-50 via-bone-100 to-bone-50">
        <Backdrop />
        <div className="container-wide relative grid items-center gap-12 py-20 md:grid-cols-12 md:py-28 lg:py-32">
          <div className="md:col-span-7">
            <p className="eyebrow">A neighbor-led movement · {site.city}</p>
            <h1 className="mt-4">
              Stand in solidarity
              <br />
              <span className="text-indigo-700">with Minnesota.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              {site.mission} We organize for housing, food, and legal
              protection — the everyday fabric of a community that refuses to
              let any of its people fall through.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/take-action" className="btn-primary">
                Take action <Arrow />
              </Link>
              <Link href="/get-help" className="btn-ghost">
                Need help? Start here
              </Link>
              <Link href="/donate" className="btn-link">
                Or give one-time
              </Link>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-ink/10 pt-6 text-sm">
              <Stat n="3" l="Active relief programs" />
              <Stat n="100%" l="Immigrant-led" />
              <Stat n="MN" l="Twin Cities & beyond" />
            </dl>
          </div>
          <div className="md:col-span-5">
            <HeroEmblem />
          </div>
        </div>
      </section>

      {/* Programs ------------------------------------------------------- */}
      <section className="container-wide py-20 md:py-28">
        <SectionHeader
          eyebrow="Our programs"
          title="Three doors. One answer: you are not alone."
          lede="The three relief lines we run are designed for the moments when ordinary life breaks down — when an eviction notice lands, when the fridge is empty, when a court date arrives without a lawyer."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {programs.map((p) => (
            <ProgramCard key={p.slug} p={p} />
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm text-ink-muted">
          All applications are read by a real person on our team. If you need
          urgent help, call us at{" "}
          <a className="btn-link" href={site.contact.phoneHref}>
            {site.contact.phone}
          </a>
          .
        </p>
      </section>

      {/* Upcoming event ------------------------------------------------- */}
      {nextEvent && (
        <section className="border-y border-ink/10 bg-ember-50">
          <div className="container-wide grid items-center gap-8 py-10 md:grid-cols-12 md:py-12">
            <div className="md:col-span-2">
              <p className="font-serif text-5xl leading-none text-indigo-900">
                {new Date(nextEvent.start).toLocaleDateString("en-US", {
                  day: "numeric",
                  timeZone: "America/Chicago"
                })}
              </p>
              <p className="mt-1 font-serif text-lg text-ember-700">
                {new Date(nextEvent.start).toLocaleDateString("en-US", {
                  month: "short",
                  timeZone: "America/Chicago"
                })}
              </p>
            </div>
            <div className="md:col-span-7">
              <p className="eyebrow">Next in the streets</p>
              <h3 className="mt-1 font-serif text-2xl">{nextEvent.title}</h3>
              <p className="mt-1 text-sm text-ink-soft">
                {formatDate(nextEvent)} · {formatTime(nextEvent)} ·{" "}
                {nextEvent.location.name}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:col-span-3 md:justify-end">
              <Link href="/events" className="btn-ghost">All events</Link>
              <a href={icsHref(nextEvent)} download={`${nextEvent.slug}.ics`} className="btn-primary">
                Add to calendar <Arrow />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Where to get help (map preview) -------------------------------- */}
      <section className="bg-indigo-900 py-20 text-bone-50 md:py-28">
        <div className="container-wide grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-ember-200">Where to get help</p>
            <h2 className="mt-3 text-bone-50">
              A living map of Twin Cities resources.
            </h2>
            <p className="mt-4 text-bone-100/85">
              Legal aid clinics, sanctuary congregations, food shelves, mental
              health, know-your-rights trainings, free clothing — curated and
              kept up to date by neighbors who use them.
            </p>
            <Link
              href="/get-help"
              className="btn-ember mt-8 text-ink"
            >
              Open the map <Arrow />
            </Link>
          </div>
          <div className="md:col-span-7">
            <div className="aspect-[5/4] overflow-hidden rounded-2xl bg-indigo-800 ring-1 ring-bone-50/10">
              <MapPreviewSVG />
            </div>
          </div>
        </div>
      </section>

      {/* News strip ----------------------------------------------------- */}
      <section className="container-wide py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader
            eyebrow="Watching together"
            title="ICE updates & local news"
            lede="A live feed from the outlets and community accounts we trust — so the truth doesn't depend on whose timeline you happen to be on."
          />
          <Link href="/news" className="btn-link">
            All updates <Arrow />
          </Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <NewsCardPlaceholder source="MPR News" tag="Local" />
          <NewsCardPlaceholder source="Sahan Journal" tag="Immigration" />
          <NewsCardPlaceholder source="ICE Watch MN" tag="Rapid response" />
        </div>
      </section>

      {/* Values strip --------------------------------------------------- */}
      <section className="border-y border-ink/10 bg-bone-100 py-20 md:py-28">
        <div className="container-wide grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">What we hold</p>
            <h2 className="mt-3">The principles under the work.</h2>
            <p className="mt-4 text-ink-soft">
              We aren't religious about much, except this: every person carries
              an unshakable dignity, and a community is judged by how it treats
              the ones with the least margin.
            </p>
            <Link href="/values" className="btn-link mt-6 inline-flex">
              Read our values <Arrow />
            </Link>
          </div>
          <div className="grid gap-6 md:col-span-8 md:grid-cols-2">
            <Value title="Dignity">
              Every person — citizen, immigrant, neighbor, stranger — carries a
              worth that no policy can grant or revoke.
            </Value>
            <Value title="Solidarity">
              We belong to one another. Nobody's safety is built by leaving
              somebody else exposed.
            </Value>
            <Value title="Subsidiarity">
              Decisions belong as close to the people they affect as possible.
              Local first. Always.
            </Value>
            <Value title="The common good">
              A community that works for the most fragile among us is a
              community that works at all.
            </Value>
          </div>
        </div>
      </section>

      {/* Support / GoFundMe carry-over ---------------------------------- */}
      <section className="container-wide py-20 md:py-28">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">How a dollar moves</p>
            <h2 className="mt-3">Funded by neighbors. Spent on neighbors.</h2>
            <p className="mt-4 text-ink-soft">
              Every contribution becomes rent paid, groceries delivered, or a
              consultation booked — usually within the same week. We&rsquo;re
              small on overhead and long on follow-through.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/donate" className="btn-primary">
                Give securely <Arrow />
              </Link>
              <Link href="/membership" className="btn-ghost">
                Become a member
              </Link>
            </div>
            <p className="mt-3 text-xs text-ink-muted">
              Prefer the GoFundMe?{" "}
              <a
                href={site.gofundmeUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-link"
              >
                Use our existing campaign
              </a>
              .
            </p>
          </div>
          <div className="card p-6 md:p-8">
            <p className="eyebrow">Where dollars went last quarter</p>
            <ul className="mt-4 space-y-3">
              <Bar label="Rental & utility relief" pct={42} />
              <Bar label="Food relief" pct={28} />
              <Bar label="Legal navigation" pct={22} />
              <Bar label="Operations & supplies" pct={8} />
            </ul>
            <p className="mt-4 text-xs text-ink-muted">
              Sample allocation. Replace with your live numbers in
              <code className="mx-1">src/app/page.tsx</code>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <dt className="font-serif text-3xl text-indigo-800">{n}</dt>
      <dd className="text-xs uppercase tracking-wider text-ink-muted">{l}</dd>
    </div>
  );
}

function Value({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xl">{title}</h3>
      <p className="mt-2 text-ink-soft">{children}</p>
    </div>
  );
}

function Bar({ label, pct }: { label: string; pct: number }) {
  return (
    <li>
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="text-ink-muted">{pct}%</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink/5">
        <div className="h-full rounded-full bg-indigo-700" style={{ width: `${pct}%` }} />
      </div>
    </li>
  );
}

function NewsCardPlaceholder({ source, tag }: { source: string; tag: string }) {
  return (
    <article className="card flex flex-col gap-3 p-5">
      <div className="flex items-center gap-2 text-xs">
        <span className="rounded-full bg-indigo-700/10 px-2 py-0.5 font-medium text-indigo-700">
          {tag}
        </span>
        <span className="text-ink-muted">{source}</span>
      </div>
      <h4 className="font-serif text-lg leading-snug">
        Live headlines load on the News page.
      </h4>
      <p className="text-sm text-ink-muted">
        Configure feeds in <code>src/lib/news.ts</code> to populate this strip.
      </p>
    </article>
  );
}

// A backdrop pattern that suggests Lake Superior ripples + a north-star grid
// without being literal. Subtle, behind-the-text.
function Backdrop() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
      aria-hidden
    >
      <defs>
        <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.2" r="1.2" fill="#22304d" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  );
}

// The hero emblem — large circular brand mark with a typographic radial.
function HeroEmblem() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div className="absolute inset-0 rounded-full bg-indigo-900" />
      <div className="absolute inset-3 rounded-full ring-1 ring-bone-50/20" />
      <div className="absolute inset-0 grid place-items-center">
        <BrandMark className="h-2/3 w-2/3" />
      </div>
      <RadialText
        text="JUSTICE · 4 · US · THE · PEOPLE · STAND · IN · SOLIDARITY · WITH · MINNESOTA · "
      />
    </div>
  );
}

function RadialText({ text }: { text: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <path id="circlePath" d="M200,200 m-170,0 a170,170 0 1,1 340,0 a170,170 0 1,1 -340,0" />
      </defs>
      <text
        fill="#f1cf8e"
        fontFamily="Inter, sans-serif"
        fontSize="13"
        fontWeight="600"
        letterSpacing="6"
      >
        <textPath href="#circlePath" startOffset="0">
          {text}
        </textPath>
      </text>
    </svg>
  );
}

// Editorial map illustration used until the live Mapbox tile loads on /get-help.
function MapPreviewSVG() {
  return (
    <svg viewBox="0 0 500 400" className="h-full w-full" aria-hidden>
      <defs>
        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="#bcc3d4" strokeOpacity="0.15" />
        </pattern>
      </defs>
      <rect width="500" height="400" fill="#22304d" />
      <rect width="500" height="400" fill="url(#grid)" />
      <path
        d="M0,260 C 80,220 160,300 240,250 S 420,180 500,210 L500,400 L0,400 Z"
        fill="#3a4d77"
        opacity="0.6"
      />
      <path
        d="M0,300 C 80,280 200,340 280,300 S 460,260 500,280 L500,400 L0,400 Z"
        fill="#1a2540"
      />
      {[
        [120, 180, "Legal aid"],
        [250, 150, "Food shelf"],
        [330, 220, "Sanctuary"],
        [180, 240, "Clinic"],
        [400, 170, "Know-your-rights"]
      ].map(([x, y, l], i) => (
        <g key={i}>
          <circle cx={x as number} cy={y as number} r="9" fill="#dc972f" />
          <circle cx={x as number} cy={y as number} r="14" fill="none" stroke="#dc972f" strokeOpacity="0.45" />
          <text x={(x as number) + 18} y={(y as number) + 4} fill="#fbf8f2" fontSize="11" fontFamily="Inter, sans-serif">
            {l}
          </text>
        </g>
      ))}
    </svg>
  );
}
