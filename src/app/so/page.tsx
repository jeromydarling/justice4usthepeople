import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "@/components/Logo";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { MapPreview } from "@/components/MapPreview";
import { PromoVideoButton } from "@/components/PromoVideo";
import { site } from "@/lib/site";
import { sortEvents, formatDate, formatTime, icsHref } from "@/lib/events";

export const metadata: Metadata = {
  title: "Justice 4 Us The People · Wadajir la Minnesota",
  description:
    "Hoggaan-soo-galooti. Bulsho-xididaysan. Deganayaal isu deggan. Khayraadka, dhacdooyinka, iyo hagid sharci ee Twin Cities.",
  alternates: {
    languages: { en: "/", es: "/es", so: "/so" }
  }
};

const programasSO = [
  {
    slug: "rental-utility",
    shortName: "Caawimaad kirada iyo adeegyada",
    name: "Joojin in qoyska guriga laga saaro",
    description:
      "Taageero toos ah qoysaska wajahaya kala saarid ama go'is adeegyo, ka dib khasaaraha lama filaanka ah ee dakhli ama isbeddel xaalad.",
    dignity:
      "Guri ma aha raaxo. Waa dhulka qoyska ay ku taagan yihiin inta ay xalliyaan waxa kale."
  },
  {
    slug: "food",
    shortName: "Caawimaad cunto degdeg ah",
    name: "Cunto miiska sare",
    description:
      "Raashin la geeyey iyo cuntada kulul oo lala wadaago deganayaasha u dhinta inta u dhaxaysa mushahaaro, saacado, iyo waraaqo.",
    dignity:
      "Qof bulshadayada ka mid ah ma doorto inta u dhaxaysa cunto iyo bixin kirada. Roodhida waa bilowga caddaaladda."
  },
  {
    slug: "legal",
    shortName: "Hagid sharci",
    name: "Khayraadka sharciga",
    description:
      "Tilmaamo loo gudbiyo qareenno socdaal, hago maxkamadeed, iyo waawaynta dhageysiyada. Qofna ma galin maxkamad la'aanta qof la jooga.",
    dignity:
      "Sharcigu waa qof kasta, ma aha kaliya kuwa awooda inay bixiyaan."
  }
];

export default function HomeSO() {
  const { upcoming } = sortEvents();
  const nextEvent = upcoming[0];
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-bone-50 via-bone-100 to-bone-50">
        <Backdrop />
        <div className="container-wide relative grid items-center gap-12 py-20 md:grid-cols-12 md:py-28 lg:py-32">
          <div className="md:col-span-7">
            <p className="eyebrow">Dhaqdhaqaaq deggan-hogaamiyay · {site.city}</p>
            <h1 className="mt-4">
              U istaag wadajir
              <br />
              <span className="text-indigo-700">la Minnesota.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Waxaan rumeysannahay in qof kasta uu sito sharaf aan la
              dhaqaajin karin. Caddaaladdu waa muuqaalka jacaylka ee
              dadweynaha — waxaanan nahay deganayaal marka hore. Waxaan u
              abaabulnaa guriyeyn, cunto, iyo ilaalin sharci.
            </p>
            <div className="mt-6">
              <PromoVideoButton label="Daawo muuqaalkayaga 60-saaniyadeed" />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href="/so/take-action" className="btn-primary" hrefLang="so">
                Hawl gal <Arrow />
              </Link>
              <Link href="/so/get-help" className="btn-ghost" hrefLang="so">
                Caawimaad ma u baahan tahay? Halkan ka bilow
              </Link>
              <Link href="/so/donate" className="btn-link" hrefLang="so">
                Ama mar bixi
              </Link>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-ink/10 pt-6 text-sm">
              <Stat n="3" l="Barnaamijyo firfircoon" />
              <Stat n="100%" l="Soo-galooti hogaamiyo" />
              <Stat n="MN" l="Twin Cities iyo wixii ka dambeeya" />
            </dl>
          </div>
          <div className="md:col-span-5">
            <HeroEmblem />
          </div>
        </div>
      </section>

      <section className="container-wide py-20 md:py-28">
        <SectionHeader
          eyebrow="Barnaamijyadayada"
          title="Saddex albaab. Hal jawaab: keligaa ma tihid."
          lede="Saddexda khad ee taageerada aan haynno waxay loogu talagalay daqiiqooyinka nolosha caadiga ah ee jabta — markii ogeysiis kala saarid yimaado, markii qaboojiyaha uu madhan yahay, markii taariikhda maxkamadeed timaado qareen la'aan."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {programasSO.map((p) => (
            <ProgramCardSO key={p.slug} p={p} />
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm text-ink-muted">
          Codsi kasta waxaa akhriya qof dhab ah oo kooxdayada ka tirsan.
          Haddii aad u baahan tahay caawimaad degdeg ah, naga soo wac{" "}
          <a className="btn-link" href={site.contact.phoneHref}>
            {site.contact.phone}
          </a>
          .
        </p>
      </section>

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
              <p className="eyebrow">Wax soo socda waddooyinka</p>
              <h3 className="mt-1 font-serif text-2xl">{nextEvent.title}</h3>
              <p className="mt-1 text-sm text-ink-soft">
                {formatDate(nextEvent)} · {formatTime(nextEvent)} ·{" "}
                {nextEvent.location.name}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:col-span-3 md:justify-end">
              <Link href="/so/events" className="btn-ghost" hrefLang="so">Dhammaan dhacdooyinka</Link>
              <a href={icsHref(nextEvent)} download={`${nextEvent.slug}.ics`} className="btn-primary">
                Ku dar jadwalka <Arrow />
              </a>
            </div>
          </div>
        </section>
      )}

      <section className="bg-indigo-900 py-20 text-bone-50 md:py-28">
        <div className="container-wide grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-ember-200">Halka aad ka heli karto caawimaad</p>
            <h2 className="mt-3 text-bone-50">
              Khaariidad nool ee khayraadka Twin Cities.
            </h2>
            <p className="mt-4 text-bone-100/85">
              Kiliinikada caawimaada sharciga, jamaacadaha magangelyada,
              bakhaarrada raashinka, caafimaadka maskaxda, tababarrada
              Conozca Sus Derechos, dhar bilaash — waxaa la haystaa oo la cusboonaysiiyaa
              deganayaal isticmaala.
            </p>
            <Link
              href="/so/get-help"
              className="btn-ember mt-8 text-ink"
              hrefLang="so"
            >
              Fur khaariidadda <Arrow />
            </Link>
          </div>
          <div className="md:col-span-7">
            <div className="aspect-[5/4] overflow-hidden rounded-2xl bg-indigo-800 ring-1 ring-bone-50/10">
              <MapPreview fallback={<MapFallbackSO />} />
            </div>
          </div>
        </div>
      </section>

      <section className="container-wide py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader
            eyebrow="Wadajir aragga"
            title="Wararka ICE iyo wararka maxalliga ah"
            lede="Feed nool oo isha-badan — Minnesota Public Radio, Sahan Journal, Star Tribune, iyo wakaaladaha qaranka."
          />
          <Link href="/so/news" className="btn-link" hrefLang="so">
            Dhammaan wararka <Arrow />
          </Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <NewsCardPlaceholder source="MPR News" tag="Maxalli" />
          <NewsCardPlaceholder source="Sahan Journal" tag="Socdaal" />
          <NewsCardPlaceholder source="ICE Watch MN" tag="Jawaab celin degdeg ah" />
        </div>
      </section>

      <section className="border-y border-ink/10 bg-bone-100 py-20 md:py-28">
        <div className="container-wide grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">Waxaan haynno</p>
            <h2 className="mt-3">Mabaadi'da hoos-jirta shaqada.</h2>
            <p className="mt-4 text-ink-soft">
              Diin ahaan ma hayno wax badan, marka laga reebo arrintaan: qof
              kasta wuxuu sitaa sharaf aan la dhaqaajin karin, bulshadana
              waxaa lagu xukumaa sida ay ula dhaqanto kuwa ugu yar haystaan.
            </p>
            <Link href="/so/values" className="btn-link mt-6 inline-flex" hrefLang="so">
              Akhri qiyamkayaga <Arrow />
            </Link>
          </div>
          <div className="grid gap-6 md:col-span-8 md:grid-cols-2">
            <Value title="Sharaf">
              Qof kasta — muwaadin, soo-galooti, deggan, ama qariib — wuxuu
              sitaa qiimo aan siyaasad lana siin karin lana qaadi karin.
            </Value>
            <Value title="Wadajir">
              Waxaan isu nahay deganayaal. Aamin la'aanta cidna laguma
              dhisi karo iyada oo qof kale lagaga tagayo.
            </Value>
            <Value title="Hoos-bixin">
              Go'aamadu waa kuwa u dhowaanshaha dadka ay saamaynayaan.
              Maxalliga hore. Mar walba.
            </Value>
            <Value title="Dan-guud">
              Bulshada u shaqayso kuwa ugu jilicsan ee naga mid ah waa
              bulsho dhab ah u shaqayso.
            </Value>
          </div>
        </div>
      </section>

      <section className="container-wide py-20 md:py-28">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">Sida doolarku u dhaqaaqo</p>
            <h2 className="mt-3">Maalin kasta deganayaal ayaa maalgeliya. Maalin kasta deganayaal ayaa loo isticmaalaa.</h2>
            <p className="mt-4 text-ink-soft">
              Tabarruc kasta wuxuu noqdaa kiro la bixiyay, raashin la geeyay,
              ama tashi sharci — inta badan toddobaadka isku mid ah.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/so/donate" className="btn-primary" hrefLang="so">
                Si ammaan ah u deeq <Arrow />
              </Link>
              <Link href="/so/membership" className="btn-ghost" hrefLang="so">
                Noqo xubin
              </Link>
            </div>
            <p className="mt-3 text-xs text-ink-muted">
              Ma doortaa GoFundMe?{" "}
              <a href={site.gofundmeUrl} target="_blank" rel="noreferrer" className="btn-link">
                Isticmaal ololahayaga jira
              </a>
              .
            </p>
          </div>
          <div className="card p-6 md:p-8">
            <p className="eyebrow">Halka doolarku u tegay rubucii ugu dambeeyay</p>
            <ul className="mt-4 space-y-3">
              <Bar label="Caawimaad kirada iyo adeegyada" pct={42} />
              <Bar label="Caawimaad cunto" pct={28} />
              <Bar label="Hagid sharci" pct={22} />
              <Bar label="Hawlaha iyo alaabta" pct={8} />
            </ul>
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
        Cinwaannada tooska ah waxay ku soo dhacaan bogga Wararka.
      </h4>
    </article>
  );
}

function ProgramCardSO({ p }: { p: typeof programasSO[number] }) {
  return (
    <Link
      href={`/get-help/${p.slug}`}
      hrefLang="en"
      className="card group flex flex-col gap-3 p-6 no-underline transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <p className="eyebrow">{p.shortName}</p>
      <h3 className="text-2xl">{p.name}</h3>
      <p className="text-ink-soft">{p.description}</p>
      <p className="mt-2 border-l-2 border-ember-300 pl-3 text-sm italic text-ink-soft">
        {p.dignity}
      </p>
      <span className="btn-link mt-2 inline-flex pt-2">
        Codso <Arrow />
      </span>
    </Link>
  );
}

function MapFallbackSO() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8 text-center text-bone-100/85">
      <p>Khaariidad firfircoon. U baahan token Mapbox.</p>
    </div>
  );
}

function Backdrop() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]" aria-hidden>
      <defs>
        <pattern id="dots-so" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.2" r="1.2" fill="#22304d" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots-so)" />
    </svg>
  );
}

function HeroEmblem() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div className="absolute inset-[10%] rounded-full bg-gradient-to-b from-bone-50 to-ember-100/40 blur-2xl" />
      <div className="absolute inset-[8%] grid place-items-center">
        <BrandMark className="h-full w-full" />
      </div>
      <RadialText text="JUSTICE · 4 · US · THE · PEOPLE · STAND · IN · SOLIDARITY · WITH · MINNESOTA · " />
    </div>
  );
}

function RadialText({ text }: { text: string }) {
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <path id="circlePathSO" d="M200,200 m-186,0 a186,186 0 1,1 372,0 a186,186 0 1,1 -372,0" />
      </defs>
      <text fill="#22304d" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" letterSpacing="6">
        <textPath href="#circlePathSO" startOffset="0">{text}</textPath>
      </text>
    </svg>
  );
}
