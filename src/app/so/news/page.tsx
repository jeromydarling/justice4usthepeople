import type { Metadata } from "next";
import { NewsFeed } from "@/components/NewsFeed";
import { SectionHeader } from "@/components/SectionHeader";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Wararka iyo cusbooneysiinta",
  description:
    "Wararka tooska ah ee ICE iyo daboolnaanta socdaalka oo ka yimid wakaaladaha aan aaminno.",
  alternates: { languages: { en: "/news", es: "/es/news", so: "/so/news" } }
};

export default function NewsPageSO() {
  return (
    <>
      <TranslationBanner lang="so" englishHref="/news" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Wadajir aragga"
          title="Wararka ICE iyo wararka maxalliga ah."
          lede="Feed nool oo isha-badan — Minnesota Public Radio, Sahan Journal, Star Tribune, iyo qoraallada qaranka. Shaandhe mowduuca ama isha. Marna ma sax inno cinwaanada."
        />
        <p className="mt-3 text-xs text-ink-muted">
          Cinwaannada waxay si toos ah uga yimaadaan wakaaladaha Ingiriiska ku
          qora. Shaandhada hoose waxay ku qoran yihiin Ingiriis.
        </p>
      </section>

      <section className="container-wide pb-20">
        <NewsFeed />
      </section>

      <section className="container-wide pb-24">
        <div className="card grid items-center gap-6 p-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Ma haysataa tilmaan?</p>
            <h3 className="font-serif text-2xl md:text-3xl">
              Wadaag waxa aad arkayso.
            </h3>
            <p className="mt-2 text-ink-soft">
              Dhaqdhaqaaqa la xaqiijiyay ee ICE, taariikhada maxkamadda,
              weerarrada, ama dhaqdhaqaaqa siyaasadda maxalliga ah. Waxaan
              u dirineynaa shabakadayada jawaab celinta degdega ah.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <a className="btn-primary" href="tel:+16124241785">
              Khadka tooska ah · 612-424-1785
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
