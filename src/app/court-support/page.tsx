import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { EmbeddedForm, type FormField } from "@/components/Form";
import { FormConnectionNote } from "@/components/Form";
import { Arrow } from "@/components/ProgramCard";

export const metadata: Metadata = {
  title: "Court Support",
  description:
    "Volunteer to accompany a neighbor to immigration court. A row of community in the gallery is, for many people, the difference between dread and dignity."
};

const fields: FormField[] = [
  {
    kind: "text",
    name: "name",
    label: "Your name",
    required: true,
    autoComplete: "name"
  },
  {
    kind: "email",
    name: "email",
    label: "Email",
    required: true,
    autoComplete: "email"
  },
  {
    kind: "tel",
    name: "phone",
    label: "Phone (for same-day coordination)",
    autoComplete: "tel"
  },
  {
    kind: "text",
    name: "languages",
    label: "Languages you speak",
    placeholder: "English, Spanish, Somali…"
  },
  {
    kind: "select",
    name: "availability",
    label: "Typical availability for hearings",
    required: true,
    options: [
      { value: "weekday-am", label: "Weekday mornings" },
      { value: "weekday-pm", label: "Weekday afternoons" },
      { value: "flexible", label: "Flexible — call when you need me" },
      { value: "weekend", label: "Weekends only" }
    ]
  },
  {
    kind: "checkbox",
    name: "transport",
    label: "I can drive to / from a courthouse if needed."
  },
  {
    kind: "checkbox",
    name: "trained",
    label:
      "I've completed court-support training before, OR I'm willing to do a 30-minute orientation."
  },
  {
    kind: "textarea",
    name: "notes",
    label: "Anything we should know",
    placeholder:
      "Lived experience, court-watch experience, scheduling notes, etc.",
    rows: 5
  }
];

export default function CourtSupportPage() {
  return (
    <>
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Court support"
          title="Sit in the gallery. Be the row of neighbors."
          lede="A row of community in the gallery is, for many people, the difference between dread and dignity. We coordinate court accompaniment across the Twin Cities — sometimes with two days notice — and we'll never send you in alone."
        />
      </section>

      <section className="container-wide pb-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <FormConnectionNote />
            <EmbeddedForm
              formId="court-support"
              subject="New court-support volunteer"
              fields={fields}
              submitLabel="Sign me up"
              successMessage="Thank you. A coordinator will reach out within a week — and within a day if there's an active hearing on the calendar."
            />
          </div>
          <aside className="md:col-span-5">
            <div className="card p-6 md:p-8">
              <p className="eyebrow">What it looks like</p>
              <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm text-ink-soft">
                <li>
                  We text you 24–72 hours before a hearing with the date,
                  courthouse, and what to wear (business casual; matching
                  shirts optional and provided).
                </li>
                <li>
                  You arrive 20 minutes early, meet the family in the lobby,
                  and sit together in the gallery.
                </li>
                <li>
                  You don&rsquo;t speak in court. You&rsquo;re not a witness.
                  You&rsquo;re a neighbor.
                </li>
                <li>
                  After the hearing, you debrief briefly, walk out together,
                  and the family knows they&rsquo;re not alone.
                </li>
              </ol>
              <p className="mt-5 text-sm text-ink-muted">
                We&rsquo;ll never share your contact information. You can
                pause or step away at any time.
              </p>
            </div>
            <div className="card mt-6 p-6 md:p-8">
              <p className="eyebrow">Other ways to help</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/take-action" className="btn-link">
                    See all volunteer roles <Arrow />
                  </Link>
                </li>
                <li>
                  <Link href="/find-loved-one" className="btn-link">
                    If a loved one was detained <Arrow />
                  </Link>
                </li>
                <li>
                  <Link href="/donate" className="btn-link">
                    Donate to the legal fund <Arrow />
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
