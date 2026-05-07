import type { Metadata } from "next";
import Link from "next/link";
import { ResourceMap } from "@/components/ResourceMap";
import { SectionHeader } from "@/components/SectionHeader";
import { programs } from "@/lib/programs";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Hel caawimaad",
  description:
    "Khaariidad nool oo ah khayraadka Twin Cities — caawimaad sharci, cunto, guriyeyn, caafimaad, magangelyo, iyo jawaab celin degdeg ah.",
  alternates: { languages: { en: "/get-help", es: "/es/get-help", so: "/so/get-help" } }
};

const programasSO: Record<string, { shortName: string; name: string; description: string }> = {
  "rental-utility": {
    shortName: "Caawimaad kirada iyo adeegyada",
    name: "Joojin in qoyska guriga laga saaro",
    description:
      "Taageero toos ah qoysaska wajahaya kala saarid ama go'is adeegyo, ka dib khasaaraha lama filaanka ah ee dakhli ama isbeddel xaalad."
  },
  food: {
    shortName: "Caawimaad cunto degdeg ah",
    name: "Cunto miiska sare",
    description:
      "Raashin la geeyey iyo cuntada kulul oo lala wadaago deganayaasha u dhinta inta u dhaxaysa mushahaaro, saacado, iyo waraaqo."
  },
  legal: {
    shortName: "Hagid sharci",
    name: "Khayraadka sharciga",
    description:
      "Tilmaamo loo gudbiyo qareenno socdaal, hago maxkamadeed, iyo waawaynta dhageysiyada."
  }
};

export default function GetHelpPageSO() {
  return (
    <>
      <TranslationBanner lang="so" englishHref="/get-help" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Hel caawimaad"
          title="Khaariidad nool oo aad u tagto."
          lede="Waxay ku haysaan deganayaal isticmaala khayraadkaan. Taabasho qaybta si aad u shaandhayso; taabo calaamadda si aad u aragto saacadaha, luqadaha, iyo telefoon toos ah."
        />
        <Link
          href="/so/find-loved-one"
          hrefLang="so"
          className="mt-6 inline-block rounded-2xl border-2 border-ember-300 bg-ember-50 px-4 py-2.5 text-sm font-medium leading-snug text-ember-700 no-underline transition hover:bg-ember-100"
        >
          Haddii la xiray qof aad jeceshahay → eeg tallaabooyinka soo socda
        </Link>
        <p className="mt-3 text-xs text-ink-muted">
          Calaamadaha iyo magacyada khayraadku waxay ku qoran yihiin Ingiriis —
          waa magacyada rasmiga ah ee ururadda.
        </p>
        <div id="map" className="mt-10">
          <ResourceMap />
        </div>
      </section>

      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Codso barnaamijyadayada"
          title="Saddex khad oo toos ah oo taageero ah, oo aan haynno."
          lede="Codsi kasta waxaa akhriya qof dhab ah oo kooxdayada ka tirsan. Haddii aad u baahan tahay caawimaad degdeg ah, soo wac 612-424-1785."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {programs.map((p) => {
            const t = programasSO[p.slug] ?? {
              shortName: p.shortName,
              name: p.name,
              description: p.description
            };
            return (
              <Link
                key={p.slug}
                href={`/get-help/${p.slug}`}
                hrefLang="en"
                className="card group flex flex-col gap-3 p-6 no-underline transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="eyebrow">{t.shortName}</p>
                <h3 className="text-2xl">{t.name}</h3>
                <p className="text-ink-soft">{t.description}</p>
                <span className="btn-link mt-2 inline-flex">
                  Codso <Arrow />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container-wide pb-24">
        <div className="card grid items-center gap-6 p-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Khayraad la dhaaffay?</p>
            <h3 className="font-serif text-2xl md:text-3xl">
              Noo sheeg waxa ay tahay inay ku jiraan khaariidaddan.
            </h3>
            <p className="mt-2 text-ink-soft">
              Waxaan ku darnaa khayraad cusub toddobaad walba. Soo dir
              magaca, goobta, iyo jumlad ku saabsan waxa ay sameeyaan —
              waxaan xaqiijin doonnaa oo aan daabacin doonnaa.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/so/contact?topic=resource" className="btn-primary" hrefLang="so">
              Soo jeedi khayraad <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
