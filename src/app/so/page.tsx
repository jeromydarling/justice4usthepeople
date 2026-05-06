import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "@/components/Logo";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { site } from "@/lib/site";

// Bogga hore ee Soomaaliga. Tarjamadda waxa loo sameeyay turxaan-bixin —
// fadlan u soo gudbi DeepL ama qof ku hadla afka inay sii hagaajiyaan ka
// hor inta aan la fidinin si weyn. Bogagga gudaha (sida /get-help) wali
// waxay ku qoran yihiin Ingiriis.
//
// (Somali landing — translations are first-draft. Run through DeepL or a
// native speaker before wide distribution. Inner pages remain in English
// for now and are linked with hrefLang="en".)
export const metadata: Metadata = {
  title: "Justice 4 Us The People · Wadajir la-isku-tag Minnesota",
  description:
    "Hoggaan-soo-galooti. Bulsho-xididaysan. Deganayaal isu deggan. Khayraadka, dhacdooyinka, iyo hagid sharci ee Magaalooyinka Mataanaha.",
  alternates: {
    languages: {
      en: "/",
      es: "/es",
      so: "/so"
    }
  }
};

export default function HomeSO() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-bone-50 via-bone-100 to-bone-50">
        <div className="container-wide relative grid items-center gap-12 py-20 md:grid-cols-12 md:py-28 lg:py-32">
          <div className="md:col-span-7">
            <p className="eyebrow">Dhaqdhaqaaq deggan-hogaamiyo · {site.city}</p>
            <h1 className="mt-4">
              U istaag wadajir
              <br />
              <span className="text-indigo-700">la Minnesota.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Waxaan rumeysannahay in qof kasta uu sito sharaf aan la
              dhaqaajin karin. Caddaaladdu waa muuqaalka jacaylka ee dadweynaha
              — waxaan nahay deganayaal marka hore. Waxaan u abaabulnaa guriyeyn,
              cunto, iyo ilaalin sharci.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/get-help" className="btn-primary" hrefLang="en">
                Hel caawimaad <Arrow />
              </Link>
              <Link href="/know-your-rights" className="btn-ghost" hrefLang="en">
                Ogow xuquuqdaada
              </Link>
              <Link href="/donate" className="btn-link" hrefLang="en">
                Deeq
              </Link>
            </div>
            <p className="mt-3 text-xs text-ink-muted">
              Bogagga gudaha wali waxay ku qoran yihiin Ingiriis — laakiin
              khayraadka, ciwaannada, iyo telefoonadu way isku mid yihiin.
            </p>
          </div>
          <div className="hidden items-center justify-center md:col-span-5 md:flex">
            <BrandMark mark="loon" className="h-56 w-56" />
          </div>
        </div>
      </section>

      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Haddii aad caawimaad u baahan tahay maanta"
          title="Halka laga bilaabo."
          lede="Saddex khad oo toos ah oo taageero ah oo ay haynaan kooxdayadu. Codsi kasta waxaa akhriya qof dhab ah."
        />
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          <Card
            title="Caawimaad kirada iyo adeegyada"
            blurb="Haddii aad heshay ogeysiis kala saarid, biil dheer, ama aad u baahan tahay caawimaad si aad u haysato saqafka."
            href="/get-help/rental-utility"
          />
          <Card
            title="Caawimaad cunto"
            blurb="Bakhaarrada cuntada, cunno kulul, iyo gaarsiin. Warqado la'aan. Su'aalo la'aan."
            href="/get-help/food"
          />
          <Card
            title="Hagid sharci"
            blurb="Tilmaamo loo gudbiyo qareenno socdaal, hago maxkamadeed, iyo waawaynta dhageysiyada."
            href="/get-help/legal"
          />
        </ul>
      </section>

      <section className="bg-indigo-900 py-16 text-bone-50 md:py-20">
        <div className="container-wide grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow text-ember-200">Ma waxaa la xiray qof aad jeceshahay?</p>
            <h2 className="mt-3 text-bone-50">
              Saacadaha ugu horreeya ayaa muhiim ah. Waa kan waxa la sameeyo.
            </h2>
            <p className="mt-3 text-bone-100/85">
              Tilmaan tallaabo-tallaabo ah: sida loo helo qof xabsi ku jira,
              sida loo helo qareen, sida lacag loogu daro xisaabtooda, iyo
              sida lagu xiriiriyo taageerada bulshada.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/find-loved-one" className="btn-ember text-ink" hrefLang="en">
              Eeg tallaabooyinka <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-wide py-16 md:py-20">
        <div className="card grid items-center gap-6 p-8 md:grid-cols-12 ring-2 ring-ember-300">
          <div className="md:col-span-8">
            <p className="eyebrow text-ember-700">Khadka taleefanka 24 saac</p>
            <h3 className="font-serif text-2xl md:text-3xl">
              Haddii ay hadda dhaceyso, soo wac.
            </h3>
            <p className="mt-3 text-ink-soft">
              Mutadawiciin laba-luuqadeed ayaa ku hagaya 60 daqiiqo soo
              socota — waxayna soo dirayaan kormeerayaal haddii uu jiro
              dhaqdhaqaaq fulinta firfircoon.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <a className="btn-primary" href={site.contact.phoneHref}>
              612-424-1785
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Card({
  title,
  blurb,
  href
}: {
  title: string;
  blurb: string;
  href: string;
}) {
  return (
    <li>
      <Link
        href={href}
        hrefLang="en"
        className="card flex h-full flex-col gap-3 p-6 no-underline transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <h3 className="font-serif text-xl">{title}</h3>
        <p className="text-sm text-ink-soft">{blurb}</p>
        <span className="btn-link mt-auto inline-flex pt-2 text-sm">
          Codso <Arrow />
        </span>
      </Link>
    </li>
  );
}
