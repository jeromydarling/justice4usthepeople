import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Deeq",
  description: "Tabarruc kasta wuxuu noqdaa kiro la bixiyay, raashin, ama tashi sharci.",
  alternates: { languages: { en: "/donate", es: "/es/donate", so: "/so/donate" } }
};

export default function DonatePageSO() {
  return (
    <>
      <TranslationBanner lang="so" englishHref="/donate" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Deeq"
          title="Maalin kasta deganayaal ayaa maalgeliya. Maalin kasta deganayaal ayaa loo isticmaalaa."
          lede="Tabarruc kasta wuxuu noqdaa kiro la bixiyay, raashin la geeyay, ama tashi sharci — inta badan toddobaadka isku mid ah."
        />
      </section>

      <section className="container-wide pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-8">
            <p className="eyebrow">Si ammaan ah u deeq</p>
            <h3 className="mt-2 font-serif text-2xl">Adigoo isticmaalaya Stripe</h3>
            <p className="mt-3 text-ink-soft">
              Tabarruc hal mar oo ah $25, $50, $100, $250 — ama qaddar gaar ah.
              Sidoo kale waxaad noqon kartaa xubin bilaha ama sannadlaha.
            </p>
            <Link href="/donate" hrefLang="en" className="btn-primary mt-5">
              Eeg fursadaha deeqda <Arrow />
            </Link>
          </div>

          <div className="card p-8">
            <p className="eyebrow">Ma doortaa GoFundMe?</p>
            <h3 className="mt-2 font-serif text-2xl">Olole jiraa</h3>
            <p className="mt-3 text-ink-soft">
              Haddii aad horey nooga garatay GoFundMe, ololahaasi wali wuu socda.
            </p>
            <a href={site.gofundmeUrl} target="_blank" rel="noreferrer" className="btn-ghost mt-5">
              Aad GoFundMe <Arrow />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
