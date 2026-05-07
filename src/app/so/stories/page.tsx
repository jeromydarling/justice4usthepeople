import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Sheekooyin",
  description: "Daqiiqado dhab ah — waxa dhacaya marka bulshadu wadajirto.",
  alternates: { languages: { en: "/stories", es: "/es/stories", so: "/so/stories" } }
};

export default function StoriesPageSO() {
  return (
    <>
      <TranslationBanner lang="so" englishHref="/stories" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Sheekooyin"
          title="Shaqada, in qaab bani-aadminimo ah."
          lede="Magacyada iyo faahfaahinta waa la beddelay halka la weydiiyay. Dadku waa dhab ah, wicitaannada waa dhab ahaayeen, natiijooyinkuna waa dhab ah."
        />
      </section>

      <section className="container-wide pb-24">
        <div className="card p-8">
          <p className="eyebrow">Sheekooyinka buuxa</p>
          <h3 className="mt-2 font-serif text-2xl">
            Sheekooyin badan oo Ingiriis ah.
          </h3>
          <p className="mt-3 text-ink-soft">
            Bogga sheekooyinka oo Ingiriis ah wuxuu leeyahay sheekooyin
            badan iyo foom kuugu ogolaanaya inaad wadaagto sheekadaada.
          </p>
          <Link href="/stories" className="btn-primary mt-5" hrefLang="en">
            Eeg Ingiriisi <Arrow />
          </Link>
        </div>
      </section>
    </>
  );
}
