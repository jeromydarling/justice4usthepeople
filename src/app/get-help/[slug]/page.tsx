import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { programs } from "@/lib/programs";
import { rentalForm, foodForm, legalForm } from "@/lib/program-forms";
import { EmbeddedForm, FormConnectionNote } from "@/components/Form";
import { Arrow } from "@/components/ProgramCard";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const p = programs.find((x) => x.slug === slug);
  return {
    title: p?.name ?? "Apply",
    description: p?.description
  };
}

export default async function ProgramPage({ params }: { params: Params }) {
  const { slug } = await params;
  const p = programs.find((x) => x.slug === slug);
  if (!p) return notFound();

  const { fields } = pickFormFor(p.slug);

  return (
    <>
      <section className="container-page py-16 md:py-20">
        <Link href="/get-help" className="btn-link">
          ← All programs
        </Link>
        <p className="eyebrow mt-6">{p.shortName}</p>
        <h1 className="mt-2">{p.name}</h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-soft">{p.description}</p>
        <p className="mt-4 max-w-2xl border-l-2 border-ember-400 pl-4 font-serif italic text-ink/80">
          {p.dignityNote}
        </p>
      </section>

      <section className="container-wide pb-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="text-2xl">Application</h2>
            <p className="mt-2 text-ink-soft">
              Share only what you're comfortable sharing. Everything you send
              is read by one of us — not a queue.
            </p>
            <FormConnectionNote />
            <div className="mt-6">
              <EmbeddedForm
                formId={p.slug}
                subject={`[${p.shortName}] new application`}
                hiddenFields={{ program: p.shortName }}
                fields={fields}
                submitLabel="Submit application"
                successMessage="We've received your application."
              />
            </div>
          </div>
          <aside className="md:col-span-5">
            <div className="card p-6 md:p-8">
              <p className="eyebrow">Need help right now?</p>
              <h3 className="mt-2 text-2xl">Call us.</h3>
              <p className="mt-3 text-ink-soft">
                If your situation is urgent — eviction this week, ICE
                encounter, no food in the house — we'd rather hear your voice
                than read a form.
              </p>
              <a href="tel:+16124241785" className="btn-ember mt-5">
                612-424-1785
              </a>
              <hr className="my-6 border-ink/10" />
              <h4 className="text-lg">What happens next</h4>
              <ol className="mt-3 space-y-3 text-sm text-ink-soft">
                <li><strong>1.</strong> A teammate reads your form within 1–2 business days.</li>
                <li><strong>2.</strong> We call or text to confirm details and what we can do.</li>
                <li><strong>3.</strong> Help arrives — usually within the same week.</li>
              </ol>
              <hr className="my-6 border-ink/10" />
              <p className="text-sm text-ink-muted">
                Your information is never sold or shared. We only contact other
                organizations on your behalf with your explicit okay.
              </p>
            </div>
            <Link href="/get-help#map" className="btn-link mt-6 inline-flex">
              See other Twin Cities resources <Arrow />
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}

function pickFormFor(slug: string) {
  switch (slug) {
    case "rental-utility":
      return { fields: rentalForm };
    case "food":
      return { fields: foodForm };
    case "legal":
      return { fields: legalForm };
    default:
      return { fields: rentalForm };
  }
}
