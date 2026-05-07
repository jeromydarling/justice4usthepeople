import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Nala soo xiriir",
  description: "Soo wac, fariin noo soo dir, ama isticmaal mid ka mid ah foomamayadayada. Qof dhab ah ayaa kuu jawaabi doona.",
  alternates: { languages: { en: "/contact", es: "/es/contact", so: "/so/contact" } }
};

export default function ContactPageSO() {
  return (
    <>
      <TranslationBanner lang="so" englishHref="/contact" />
      <section className="container-page py-16 md:py-20">
        <p className="eyebrow">Nala soo xiriir</p>
        <h1 className="mt-2">Fariin kasta waan ka jawaabnaa.</h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-soft">
          Habka ugu dhakhsaha badan ee aad noo soo gaadhsiisid waa
          telefoon — laakiin haddii email ama foomkaan ay kuu fiicantahay,
          waan helnaa. Dad dhab ah ayaa akhriya fariin walba.
        </p>
      </section>

      <section className="container-wide pb-24">
        <div className="grid gap-10 md:grid-cols-12">
          <aside className="md:col-span-5">
            <div className="card p-6 md:p-8">
              <h3 className="text-2xl">Khadadka tooska ah</h3>
              <ul className="mt-4 space-y-3 text-base">
                <li>
                  <span className="block text-xs uppercase tracking-wider text-ink-muted">Telefoon</span>
                  <a className="btn-link text-lg" href={site.contact.phoneHref}>
                    {site.contact.phone}
                  </a>
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-wider text-ink-muted">Email</span>
                  <a className="btn-link" href={`mailto:${site.contact.email}`}>
                    {site.contact.email}
                  </a>
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-wider text-ink-muted">Halka</span>
                  {site.contact.address}
                </li>
              </ul>
              <hr className="my-6 border-ink/10" />
              <p className="text-sm text-ink-muted">
                Warbaahin, iskaashi, ama ma rabtaa inaan meel ka hadalno?
                Ku dar mowduuca fariintaada — waxaan u dirineynaa qofka saxda ah.
              </p>
            </div>
          </aside>

          <div className="md:col-span-7">
            <div className="card p-6 md:p-8">
              <p className="eyebrow">Foomka shabakada</p>
              <h3 className="mt-2 font-serif text-2xl">Fariin noo soo dir.</h3>
              <p className="mt-3 text-sm text-ink-soft">
                Foomka shabakada oo buuxa (oo leh goobo magaca, email,
                mowduuca, iyo fariinta) wali wuxuu ku qoran yahay Ingiriis.
                Waa gaaban oo waxaan ka jawaabnaa wax ka yar 48 saac gudahooda.
              </p>
              <p className="mt-3 text-sm text-ink-soft">
                Ma doortaa inaad Soomaali ku qorto? Toos email u dir{" "}
                <a className="btn-link" href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
                {" "}— waan akhrineynaa oo aan ka jawaabineynaa.
              </p>
              <Link href="/contact" hrefLang="en" className="btn-primary mt-5">
                Fur foomka Ingiriisiga <Arrow />
              </Link>
            </div>

            <div className="card mt-6 p-6 md:p-8 ring-2 ring-ember-300">
              <p className="eyebrow text-ember-700">Ma degdeg baa?</p>
              <h3 className="mt-2 font-serif text-2xl">Hadda soo wac.</h3>
              <p className="mt-3 text-sm text-ink-soft">
                Haddii xaaladdu aanay sugin karin, soo wac khadkayaga 24-saac.
                Mutadawiciin laba-luqadood ayaa kaa jawaabaya.
              </p>
              <a className="btn-primary mt-5" href={site.contact.phoneHref}>
                {site.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
