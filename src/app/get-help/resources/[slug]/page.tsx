import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/SectionHeader";
import { Arrow } from "@/components/ProgramCard";
import { resources, categories, type Resource } from "@/lib/resources";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.id }));
}

export async function generateMetadata({
  params
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = resources.find((x) => x.id === slug);
  if (!r) return {};
  return {
    title: r.name,
    description: r.blurb
  };
}

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default async function ResourceDetailPage({
  params
}: {
  params: Params;
}) {
  const { slug } = await params;
  const r = resources.find((x) => x.id === slug);
  if (!r) notFound();

  const cat = categories[r.category];
  const [lng, lat] = r.coords;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  // Schema.org type — civic/community service places get LocalBusiness so
  // Google maps & search can surface hours / phone / directions correctly.
  const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: r.name,
    description: r.blurb,
    ...(r.address && { address: r.address }),
    ...(r.phone && { telephone: r.phone }),
    ...(r.url && { url: r.url }),
    ...(r.hours && { openingHours: r.hours }),
    geo: {
      "@type": "GeoCoordinates",
      latitude: lat,
      longitude: lng
    }
  };
  const mapboxStatic = TOKEN
    ? `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-s+${cat.color.replace(
        "#",
        ""
      )}(${lng},${lat})/${lng},${lat},14.2,0/800x500@2x?access_token=${TOKEN}`
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd) }}
      />
      <section className="container-wide pt-12 md:pt-16">
        <Link href="/get-help" className="btn-link text-sm">
          ← Back to the map
        </Link>
      </section>

      <section className="container-wide py-6 md:py-8">
        <div className="grid items-start gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p
              className="eyebrow"
              style={{ color: cat.color }}
            >
              {cat.label}
            </p>
            <h1 className="mt-2">{r.name}</h1>
            <p className="mt-4 text-lg text-ink-soft">{r.blurb}</p>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {r.address && <Detail k="Address" v={r.address} />}
              {r.phone && (
                <Detail
                  k="Call"
                  v={
                    <a
                      className="btn-link"
                      href={`tel:${r.phone.replace(/[^0-9+]/g, "")}`}
                    >
                      {r.phone}
                    </a>
                  }
                />
              )}
              {r.hours && <Detail k="Hours" v={r.hours} />}
              {r.languages && (
                <Detail k="Languages" v={r.languages.join(" · ")} />
              )}
              {r.url && (
                <Detail
                  k="Web"
                  v={
                    <a
                      className="btn-link"
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit site
                    </a>
                  }
                />
              )}
              <Detail
                k="Directions"
                v={
                  <a
                    className="btn-link"
                    href={directions}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open in Google Maps
                  </a>
                }
              />
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              {r.phone && (
                <a
                  className="btn-primary"
                  href={`tel:${r.phone.replace(/[^0-9+]/g, "")}`}
                >
                  Call now
                </a>
              )}
              <a
                className="btn-ghost"
                href={directions}
                target="_blank"
                rel="noreferrer"
              >
                Get directions <Arrow />
              </a>
            </div>
          </div>

          <div className="md:col-span-5">
            {mapboxStatic ? (
              <a
                href={directions}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open directions to ${r.name}`}
                className="block overflow-hidden rounded-2xl ring-1 ring-ink/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mapboxStatic}
                  alt={`Map showing ${r.name}`}
                  className="h-auto w-full"
                  loading="eager"
                />
              </a>
            ) : (
              <MapFallback r={r} />
            )}
          </div>
        </div>
      </section>

      <RelatedResources current={r} />

      <section className="container-wide pb-24 pt-4">
        <div className="card grid items-center gap-6 p-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Heads-up to us</p>
            <h3 className="font-serif text-2xl md:text-3xl">
              Information out of date?
            </h3>
            <p className="mt-2 text-ink-soft">
              Hours change. Programs sunset. Tell us if anything here is wrong
              — we&rsquo;ll fix it the same week.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link
              href={`/contact?topic=resource&resource=${r.id}`}
              className="btn-primary"
            >
              Send a correction <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Detail({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-ink-muted">{k}</dt>
      <dd className="mt-0.5 text-ink">{v}</dd>
    </div>
  );
}

function MapFallback({ r }: { r: Resource }) {
  return (
    <div className="flex aspect-[8/5] flex-col items-center justify-center rounded-2xl bg-bone-100 p-6 text-center ring-1 ring-ink/10">
      <p className="font-serif text-xl">{r.name}</p>
      <p className="mt-1 text-sm text-ink-muted">
        {r.address ?? "Twin Cities"}
      </p>
    </div>
  );
}

function RelatedResources({ current }: { current: Resource }) {
  const same = resources
    .filter((r) => r.category === current.category && r.id !== current.id)
    .slice(0, 3);
  if (same.length === 0) return null;
  const cat = categories[current.category];
  return (
    <section className="container-wide pb-12 pt-4">
      <SectionHeader
        eyebrow="Also in this category"
        title={`More ${cat.label.toLowerCase()} resources nearby.`}
      />
      <ul className="mt-8 grid gap-6 md:grid-cols-3">
        {same.map((r) => (
          <li key={r.id}>
            <Link
              href={`/get-help/resources/${r.id}`}
              className="card flex h-full flex-col gap-2 p-5 no-underline transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="eyebrow" style={{ color: cat.color }}>
                {cat.label}
              </p>
              <p className="font-serif text-lg leading-snug text-ink">
                {r.name}
              </p>
              <p className="text-sm text-ink-muted line-clamp-2">{r.blurb}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
