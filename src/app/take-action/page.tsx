import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { EmbeddedForm, FormConnectionNote } from "@/components/Form";
import { volunteerForm } from "@/lib/program-forms";
import { formspree, site } from "@/lib/site";
import { Arrow } from "@/components/ProgramCard";

export const metadata: Metadata = {
  title: "Take Action",
  description:
    "Volunteer, train as a rapid-response observer, attend a Know-Your-Rights workshop, or sign up for movement updates."
};

export default function TakeActionPage() {
  return (
    <>
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Take action"
          title="A movement is something you do, not something you watch."
          lede="Five ways to step in this week. Pick whichever fits the time you have — fifteen minutes is a real contribution."
        />
      </section>

      <section className="container-wide pb-16">
        <ul className="grid gap-6 md:grid-cols-2">
          <Action
            num="01"
            title="Become a rapid-response observer"
            body="When ICE shows up, trained observers protect dignity and document what happens. We host the next training Saturday — join the list and we'll get you the location."
            cta={{ href: "#volunteer", label: "Volunteer" }}
          />
          <Action
            num="02"
            title="Host a Know-Your-Rights night"
            body="Have a community room, garage, or back porch? We'll bring the cards, the snacks, and a bilingual trainer. Twelve neighbors is a quorum."
            cta={{ href: "/know-your-rights", label: "Know your rights" }}
          />
          <Action
            num="03"
            title="Drive a delivery route"
            body="One Saturday morning, one mini-van, ten boxes of groceries. Routes run 9 AM – noon across Minneapolis and St. Paul."
            cta={{ href: "#volunteer", label: "Sign up to drive" }}
          />
          <Action
            num="04"
            title="Set up a $20/month sustainer"
            body="A small recurring gift is the most useful gift we receive. Predictable money lets us say yes when an emergency lands."
            cta={{ href: "/membership", label: "Become a member" }}
          />
          <Action
            num="05"
            title="Put a sign in your yard"
            body="The yard sign is small, the signal is large. Buy one, put it up, and tell your neighbors why."
            cta={{ href: "/store", label: "Get a yard sign" }}
          />
          <Action
            num="06"
            title="Pass a tip to the hotline"
            body="See ICE activity? Hear a court date? Witness something? Call us — we'll route it to the right responder."
            cta={{ href: site.contact.phoneHref, label: `Call ${site.contact.phone}` }}
          />
        </ul>
      </section>

      <section id="volunteer" className="container-wide pb-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Volunteer signup</p>
            <h2 className="mt-3">Tell us where you want to plug in.</h2>
            <p className="mt-4 text-ink-soft">
              We match volunteers based on what you can offer and what's
              urgent in the network this week. Expect a real human reply
              within a few days.
            </p>
            <p className="mt-6 text-sm text-ink-muted">
              Every role has training, support, and a teammate. You will not
              be sent into a hard situation alone.
            </p>
          </div>
          <div className="md:col-span-7">
            <FormConnectionNote endpoint={formspree.volunteer} envVar="NEXT_PUBLIC_FORMSPREE_VOLUNTEER" />
            <EmbeddedForm
              endpoint={formspree.volunteer}
              subject="[Volunteer] new signup"
              fields={volunteerForm}
              submitLabel="Count me in"
              successMessage="Welcome. A teammate will reach out within a few days."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Action({
  num,
  title,
  body,
  cta
}: {
  num: string;
  title: string;
  body: string;
  cta: { href: string; label: string };
}) {
  return (
    <li className="card flex flex-col gap-3 p-6 md:p-7">
      <div className="flex items-baseline gap-3">
        <span className="font-serif text-3xl text-ember-500/80">{num}</span>
        <h3 className="text-xl">{title}</h3>
      </div>
      <p className="text-ink-soft">{body}</p>
      <Link href={cta.href} className="btn-link mt-1 inline-flex">
        {cta.label} <Arrow />
      </Link>
    </li>
  );
}
