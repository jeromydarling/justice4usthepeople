import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";

export const metadata: Metadata = {
  title: "Find a Detained Loved One",
  description:
    "What to do — quickly and step-by-step — if someone you love has been detained by ICE. Detention locator, lawyer referrals, money on books."
};

// Step-by-step guidance for the most stressful possible moment. Calm tone,
// concrete actions, no jargon. Information here should be reviewed annually
// against the current ICE detainee locator and Minnesota legal-aid landscape.
export default function FindLovedOnePage() {
  return (
    <>
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="If a loved one was detained"
          title="The first hours matter. Here's what to do."
          lede="Stay calm — there are clear next steps, and you don't have to take them alone. If you'd rather talk to a person right now, call us at 612-424-1785."
        />
      </section>

      <section className="container-wide pb-8">
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Step n={1} title="Find them in custody">
            <p>
              ICE keeps a public detainee locator. You'll need either an{" "}
              <strong>A-number</strong> (the nine-digit number on immigration
              paperwork) <em>or</em> first &amp; last name + country of birth
              and date of birth.
            </p>
            <p className="mt-3">
              <a
                href="https://locator.ice.gov/odls/"
                target="_blank"
                rel="noreferrer"
                className="btn-primary text-sm"
              >
                Open the ICE locator <Arrow />
              </a>
            </p>
            <p className="mt-3 text-xs text-ink-muted">
              The locator only shows adults (18+) currently in ICE custody.
              Records can take 6–8 hours to appear after intake.
            </p>
          </Step>

          <Step n={2} title="Write down what you know">
            <p>
              Before you call anyone, gather: full legal name, date of birth,
              country of citizenship, A-number if you know it, where they were
              taken from, and the time. A clear written record helps every
              attorney who comes after.
            </p>
          </Step>

          <Step n={3} title="Get a lawyer involved">
            <p>
              Call one of these immigration legal organizations <em>before</em>{" "}
              signing anything ICE puts in front of your loved one. Many will
              do an initial consult free of charge.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
              <li>
                <strong>Immigrant Law Center of MN:</strong> 651-641-1011
              </li>
              <li>
                <strong>The Advocates for Human Rights:</strong> 612-341-3302
              </li>
              <li>
                <strong>Mid-Minnesota Legal Aid:</strong> 612-334-5970
              </li>
            </ul>
          </Step>

          <Step n={4} title="Money &amp; commissary">
            <p>
              Most detention facilities allow funds to be deposited into a
              detainee's account for phone calls and commissary. Ask the
              facility (you'll have its name from step 1) what their deposit
              system is — most use{" "}
              <a
                href="https://www.accesscorrections.com"
                target="_blank"
                rel="noreferrer"
                className="btn-link"
              >
                Access Corrections
              </a>{" "}
              or{" "}
              <a
                href="https://www.jpay.com"
                target="_blank"
                rel="noreferrer"
                className="btn-link"
              >
                JPay
              </a>
              .
            </p>
          </Step>

          <Step n={5} title="Visiting & phone calls">
            <p>
              Each facility has its own visit and call rules — schedule by
              phone, photo ID required, bring nothing but yourself. Calls are
              recorded; do not discuss case strategy on the phone.
            </p>
          </Step>

          <Step n={6} title="Tell us what's happening">
            <p>
              We can connect you with a court-support volunteer, help with
              transportation to a detention facility, or organize community
              presence at a hearing. You will not be doing this alone.
            </p>
            <p className="mt-3">
              <Link href="/contact?topic=detained" className="btn-ghost text-sm">
                Send us a note <Arrow />
              </Link>
            </p>
          </Step>
        </ol>
      </section>

      <section className="container-wide pb-24">
        <div className="card grid items-center gap-6 p-8 md:grid-cols-12 ring-2 ring-ember-300">
          <div className="md:col-span-8">
            <p className="eyebrow text-ember-700">If it's happening right now</p>
            <h3 className="font-serif text-2xl md:text-3xl">
              Call our hotline.
            </h3>
            <p className="mt-3 text-ink-soft">
              Trained volunteers can talk you through the next 60 minutes — and
              dispatch observers if there's an active enforcement action.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <a className="btn-primary" href="tel:+16124241785">
              612-424-1785
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Step({
  n,
  title,
  children
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="card flex flex-col gap-3 p-6">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-700 font-serif text-bone-50">
          {n}
        </span>
        <h3 className="font-serif text-xl leading-snug">{title}</h3>
      </div>
      <div className="text-sm leading-relaxed text-ink-soft">{children}</div>
    </li>
  );
}
