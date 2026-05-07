import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { stripeLinks } from "@/lib/site";
import { Arrow } from "@/components/ProgramCard";
import { TranslationBanner } from "@/components/TranslationBanner";

export const metadata: Metadata = {
  title: "Xubinnimo",
  description: "Noqo xubin joogto ah — laafta sahalka, la-saadaalin-karan ee shaqadaan.",
  alternates: { languages: { en: "/membership", es: "/es/membership", so: "/so/membership" } }
};

export default function MembershipPageSO() {
  return (
    <>
      <TranslationBanner lang="so" englishHref="/membership" />
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Xubinnimo"
          title="Noqo qaybta degganaanta jawaabta."
          lede="Tabarruc yar oo soo noqnoqda — $5, $10, $25 bishii — waa hibada ugu faa'iidada badan ee aan helno. Waa lacag la saadaalin karo oo nagu ogolaaneysa inaan nidhaahno haa marka xaalad degdeg ah Talaadada timaado."
        />
      </section>

      <section className="container-wide pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          <Tier
            tier="Deggan"
            price="Bixi waxa aad bixin karto"
            href="#tell-us"
            blurb="Bilaha qaarkood way ka adag yihiin kuwa kale. Soo bax sida aad u kartid — $5, $50, ama waqtigaaga oo keliya."
            tone="neutral"
            ctaLabel="Ku biir hoos"
          />
          <Tier
            tier="Joogto"
            price="$10 / bil"
            href={stripeLinks.membership.monthly}
            envVar="NEXT_PUBLIC_STRIPE_MEMBERSHIP_MONTHLY"
            blurb="Heerka caadiga ah — tabarruc yar oo soo noqnoqda kaasoo isu kaaya raashin badan, kharash maxkamadeed, iyo kiro. Goorma joojin kartaa."
            tone="primary"
            ctaLabel="Door heerkaan"
          />
          <Tier
            tier="Barroor"
            price="$250 / sannad"
            href={stripeLinks.membership.annual}
            envVar="NEXT_PUBLIC_STRIPE_MEMBERSHIP_ANNUAL"
            blurb="Hal hibo sannadle ah oo maalgelisa kirada degdega ah ee qoys iyo adeegyada dib u dhacday — wada. Waxaan kuu soo dirin doonnaa warbixin sannadeedka dhammaadkeeda."
            tone="ember"
            ctaLabel="Door heerkaan"
          />
        </div>
      </section>

      <section id="tell-us" className="container-wide pb-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Foomka xubinnimada</p>
            <h2 className="mt-3">Wax yar nooga sheeg naftaada.</h2>
            <p className="mt-4 text-ink-soft">
              Waxaan kugu darnaa warbixinta bilaha ah oo aan kuu soo dirnaa
              xirmada soo dhowaynta. Haddii aad doortay heer soo noqnoqda,
              lacag-bixinta ammaanka ah waxay furmaysaa tab cusub ka dib
              markii aad gudbiso.
            </p>
            <p className="mt-6 text-sm text-ink-muted">
              Ma doortaa hibo hal mar ah?{" "}
              <Link href="/so/donate" hrefLang="so" className="btn-link inline-flex">
                Booqo bogga deeqaha <Arrow />
              </Link>
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="card p-6 md:p-8">
              <p className="eyebrow">Foomka buuxa</p>
              <h3 className="mt-2 font-serif text-xl">Diyaar ma u tahay inaad iska-diiwaan geliso?</h3>
              <p className="mt-3 text-sm text-ink-soft">
                Foomka xubinnimadu wuxuu hadda Ingiriis ku qoran yahay —
                wuxuu weydiiyaa magac, email, heer, iyo qoraallo.
              </p>
              <Link href="/membership#tell-us" hrefLang="en" className="btn-primary mt-5">
                Fur foomka <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Tier({
  tier, price, href, envVar, blurb, tone, ctaLabel
}: {
  tier: string; price: string; href: string; envVar?: string;
  blurb: string; tone: "neutral" | "primary" | "ember"; ctaLabel: string;
}) {
  const wired = href && !href.includes("xxx") && (href.startsWith("http") || href.startsWith("#"));
  const cls = tone === "primary" ? "ring-2 ring-indigo-700" : tone === "ember" ? "ring-2 ring-ember-400" : "ring-1 ring-ink/10";
  return (
    <article className={`card flex h-full flex-col gap-4 p-6 ${cls}`}>
      <p className="eyebrow">{tier}</p>
      <p className="font-serif text-3xl text-indigo-800">{price}</p>
      <p className="flex-1 text-ink-soft">{blurb}</p>
      {wired ? (
        <a href={href} target={href.startsWith("#") ? undefined : "_blank"} rel="noreferrer" className="btn-primary self-start">
          {ctaLabel} <Arrow />
        </a>
      ) : (
        <span className="text-xs text-ember-700">
          Habayn: ku dheji Stripe Payment Link <code>{envVar}</code>.
        </span>
      )}
    </article>
  );
}
