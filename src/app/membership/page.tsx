import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { EmbeddedForm, FormConnectionNote } from "@/components/Form";
import { membershipForm } from "@/lib/program-forms";
import { formspree, stripeLinks } from "@/lib/site";
import { Arrow } from "@/components/ProgramCard";

export const metadata: Metadata = {
  title: "Membership",
  description: "Become a sustaining member — the steady, predictable backbone of this work."
};

export default function MembershipPage() {
  return (
    <>
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Membership"
          title="Be the steady part of the answer."
          lede="A small recurring gift — $5, $10, $25 a month — is the most useful gift we receive. It's predictable money that lets us say yes when an emergency lands on a Tuesday."
        />
      </section>

      <section className="container-wide pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          <Tier
            tier="Neighbor"
            price="Give what you can"
            href="#tell-us"
            blurb="Some months are tighter than others. Show up however you can — $5, $50, or just your time. Membership starts at hello."
            tone="neutral"
          />
          <Tier
            tier="Sustainer"
            price="$10 / month"
            href={stripeLinks.membership.monthly}
            envVar="NEXT_PUBLIC_STRIPE_MEMBERSHIP_MONTHLY"
            blurb="The default tier — a small recurring gift that adds up to a lot of groceries, court fees, and rent. Cancel any time."
            tone="primary"
          />
          <Tier
            tier="Anchor"
            price="$250 / year"
            href={stripeLinks.membership.annual}
            envVar="NEXT_PUBLIC_STRIPE_MEMBERSHIP_ANNUAL"
            blurb="One annual gift that funds a family's emergency rent and back-utilities — all at once. We'll send a year-end report."
            tone="ember"
          />
        </div>
      </section>

      <section id="tell-us" className="container-wide pb-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Membership form</p>
            <h2 className="mt-3">Tell us a little about yourself.</h2>
            <p className="mt-4 text-ink-soft">
              We'll add you to the monthly briefing and send the membership
              welcome packet. If you picked a recurring tier, the secure
              payment opens in a new tab after you submit.
            </p>
            <p className="mt-6 text-sm text-ink-muted">
              Prefer a one-time gift?{" "}
              <Link href="/donate" className="btn-link inline-flex">
                Visit our donation page <Arrow />
              </Link>
            </p>
          </div>
          <div className="md:col-span-7">
            <FormConnectionNote endpoint={formspree.membership} envVar="NEXT_PUBLIC_FORMSPREE_MEMBERSHIP" />
            <EmbeddedForm
              endpoint={formspree.membership}
              subject="[Membership] new member"
              fields={membershipForm}
              submitLabel="Become a member"
              successMessage="Welcome aboard, neighbor."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Tier({
  tier,
  price,
  href,
  envVar,
  blurb,
  tone
}: {
  tier: string;
  price: string;
  href: string;
  envVar?: string;
  blurb: string;
  tone: "neutral" | "primary" | "ember";
}) {
  const wired = href && !href.includes("xxx") && (href.startsWith("http") || href.startsWith("#"));
  const cls =
    tone === "primary"
      ? "ring-2 ring-indigo-700"
      : tone === "ember"
      ? "ring-2 ring-ember-400"
      : "ring-1 ring-ink/10";
  return (
    <article className={`card flex h-full flex-col gap-4 p-6 ${cls}`}>
      <p className="eyebrow">{tier}</p>
      <p className="font-serif text-3xl text-indigo-800">{price}</p>
      <p className="flex-1 text-ink-soft">{blurb}</p>
      {wired ? (
        <a href={href} target={href.startsWith("#") ? undefined : "_blank"} rel="noreferrer" className="btn-primary self-start">
          {tier === "Neighbor" ? "Join below" : "Choose this tier"} <Arrow />
        </a>
      ) : (
        <span className="text-xs text-ember-700">
          Setup: paste your Stripe Payment Link into <code>{envVar}</code>.
        </span>
      )}
    </article>
  );
}
