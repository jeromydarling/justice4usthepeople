import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Noqo xubin",
  description: "Taageer dhaqdhaqaaqaan adoo bixiya tabarruc bilaha ah ama sannadle ah.",
  alternates: { languages: { en: "/membership", es: "/es/membership", so: "/so/membership" } }
};

export default function MembershipPageSO() {
  return (
    <>
      <TranslationBanner lang="so" englishHref="/membership" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Noqo xubin"
          title="Noqo qayb joogto ah dhaqdhaqaaqa."
          lede="Tabarruc bilaha ama sannadle ah ayaa na siiya xasilooni si aan u qorshayn karno wax ka badan toddobaadka soo socda."
        />
      </section>

      <section className="container-wide pb-24">
        <div className="card p-8">
          <p className="eyebrow">Heerka xubinnimada</p>
          <h3 className="mt-2 font-serif text-2xl">Waxa xubin kastaa heli doonto:</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-ink-soft">
            <li>Soo koobid bilaha ah oo ku saabsan waxa aan aragno iyo waxa aan qabanno</li>
            <li>Ogeysiis hore oo ku saabsan dhacdooyinka iyo tababar</li>
            <li>Casuumad gelitaanka booska iskaashiga mutadawiciinta</li>
            <li>Aqoonsi (haddii aad rabto) warbixintayada sannadlaha ah</li>
          </ul>
          <Link href="/membership" hrefLang="en" className="btn-primary mt-5">
            Eeg heerarka iyo qiimaha <Arrow />
          </Link>
        </div>
      </section>
    </>
  );
}
