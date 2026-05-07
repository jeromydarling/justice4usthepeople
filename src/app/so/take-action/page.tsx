import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Hawl gal",
  description: "Saddex siyaabood oo aad u taageero karto deganayaashaada.",
  alternates: { languages: { en: "/take-action", es: "/es/take-action", so: "/so/take-action" } }
};

export default function TakeActionPageSO() {
  return (
    <>
      <TranslationBanner lang="so" englishHref="/take-action" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Hawl gal"
          title="Saddex siyaabood oo aad u jiri karto."
          lede="Bixi lacag. Bixi waqti. Marti gali. Mid kasta oo ka mid ah saddexdaas waxay sii wadaa shaqada — saddexdaba waa la rabaa."
        />
      </section>

      <section className="container-wide pb-12">
        <div className="grid gap-6 md:grid-cols-3">
          <Link href="/donate" className="card flex flex-col gap-3 p-6 no-underline hover:-translate-y-0.5 hover:shadow-md" hrefLang="en">
            <p className="eyebrow">Bixi</p>
            <h3 className="font-serif text-xl">Deeqaha</h3>
            <p className="text-sm text-ink-soft">
              Deeq mar ama soo noqnoqota. Doolar kasta wuxuu noqdaa kiro la
              bixiyay, raashin la geeyay, ama tashi sharci.
            </p>
            <span className="btn-link mt-auto inline-flex pt-2 text-sm">
              Deeq <Arrow />
            </span>
          </Link>

          <Link href="/court-support" className="card flex flex-col gap-3 p-6 no-underline hover:-translate-y-0.5 hover:shadow-md" hrefLang="en">
            <p className="eyebrow">Bixi waqti</p>
            <h3 className="font-serif text-xl">Taageero maxkamadeed</h3>
            <p className="text-sm text-ink-soft">
              Raac deggan dhageysasho socdaal. Saf bulsho ee maxkamadda
              waa wax beddel ku yeelan kara.
            </p>
            <span className="btn-link mt-auto inline-flex pt-2 text-sm">
              Is-diiwaan geli <Arrow />
            </span>
          </Link>

          <Link href="/contact?topic=kyr-host" className="card flex flex-col gap-3 p-6 no-underline hover:-translate-y-0.5 hover:shadow-md" hrefLang="en">
            <p className="eyebrow">Marti gali</p>
            <h3 className="font-serif text-xl">Habeen Conozca Sus Derechos</h3>
            <p className="text-sm text-ink-soft">
              Waxaan keenaynaa tababare laba-luqadood, kaararka, iyo
              cuntada. Laba-iyo-toban deggan ayaa qaybsan kara.
            </p>
            <span className="btn-link mt-auto inline-flex pt-2 text-sm">
              Iskaashi <Arrow />
            </span>
          </Link>
        </div>
      </section>

      <section className="container-wide pb-24">
        <div className="card grid items-center gap-6 p-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Nooca buuxa</p>
            <h3 className="font-serif text-2xl md:text-3xl">
              Eeg dhammaan siyaabaha lagu lugleeyo.
            </h3>
            <p className="mt-3 text-ink-soft">
              Bogga buuxa ee Ingiriisiga wuxuu leeyahay faahfaahin badan oo
              ku saabsan doorarka mutadawac ah, tababar, iyo shabakadda.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/take-action" className="btn-primary" hrefLang="en">
              Eeg Ingiriisi <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
