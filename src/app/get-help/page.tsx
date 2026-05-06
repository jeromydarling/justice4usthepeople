import type { Metadata } from "next";
import Link from "next/link";
import { ResourceMap } from "@/components/ResourceMap";
import { SectionHeader } from "@/components/SectionHeader";
import { programs } from "@/lib/programs";
import { Arrow } from "@/components/ProgramCard";

export const metadata: Metadata = {
  title: "Get Help",
  description:
    "A curated, living map of where to get help in the Twin Cities — legal aid, food, housing, health, sanctuary, and rapid response."
};

export default function GetHelpPage() {
  return (
    <>
      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Get help"
          title="A living map of where to turn."
          lede="Curated by neighbors who use these resources. Tap a category to filter; tap a marker to see hours, languages, and a direct phone number."
        />
        <Link
          href="/find-loved-one"
          className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-ember-300 bg-ember-50 px-4 py-2 text-sm font-medium text-ember-700 no-underline transition hover:bg-ember-100"
        >
          If a loved one was just detained → here are the next steps
        </Link>
        <div id="map" className="mt-10">
          <ResourceMap />
        </div>
      </section>

      <section className="container-wide py-16 md:py-20">
        <SectionHeader
          eyebrow="Apply for our programs"
          title="Three direct lines of support, run by us."
          lede="Each application is read by a real person on our team. If you need urgent help, call 612-424-1785."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {programs.map((p) => (
            <Link
              key={p.slug}
              href={`/get-help/${p.slug}`}
              className="card group flex flex-col gap-3 p-6 no-underline transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="eyebrow">{p.shortName}</p>
              <h3 className="text-2xl">{p.name}</h3>
              <p className="text-ink-soft">{p.description}</p>
              <span className="btn-link mt-2 inline-flex">
                Apply <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-wide pb-24">
        <div className="card grid items-center gap-6 p-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Missing a resource?</p>
            <h3 className="font-serif text-2xl md:text-3xl">
              Tell us what should be on this map.
            </h3>
            <p className="mt-2 text-ink-soft">
              We add new resources weekly. Send the name, location, and a
              sentence on what they do — we'll verify and post.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/contact?topic=resource" className="btn-primary">
              Suggest a resource <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
