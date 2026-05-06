"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { resources, categories, type ResourceCategory, type Resource } from "@/lib/resources";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function ResourceMap() {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [active, setActive] = useState<Set<ResourceCategory>>(
    new Set(Object.keys(categories) as ResourceCategory[])
  );
  const [selected, setSelected] = useState<Resource | null>(null);

  const visible = useMemo(
    () => resources.filter((r) => active.has(r.category)),
    [active]
  );

  // Initialize map
  useEffect(() => {
    if (!TOKEN || !mapEl.current || mapRef.current) return;
    mapboxgl.accessToken = TOKEN;
    const map = new mapboxgl.Map({
      container: mapEl.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-93.2, 44.96], // Twin Cities midpoint
      zoom: 10.6
    });
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Render markers when filter changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const markers: mapboxgl.Marker[] = [];
    for (const r of visible) {
      const el = document.createElement("button");
      el.type = "button";
      el.setAttribute("aria-label", r.name);
      el.style.cssText = `
        width: 22px; height: 22px; border-radius: 9999px;
        background: ${categories[r.category].color}; border: 2px solid #fbf8f2;
        box-shadow: 0 2px 8px rgba(20,23,28,.25); cursor: pointer;
      `;
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        setSelected(r);
      });
      const marker = new mapboxgl.Marker({ element: el }).setLngLat(r.coords).addTo(map);
      markers.push(marker);
    }
    return () => markers.forEach((m) => m.remove());
  }, [visible]);

  if (!TOKEN) {
    return (
      <div className="card p-6">
        <p className="eyebrow">Map setup</p>
        <h3 className="mt-2 text-xl">Add a Mapbox token to load the live map.</h3>
        <p className="mt-3 text-sm text-ink-muted">
          Set <code>NEXT_PUBLIC_MAPBOX_TOKEN</code> in your build environment.
          Until then, the resources below are fully usable.
        </p>
        <ResourceList resources={visible} active={active} setActive={setActive} />
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-12">
      <aside className="md:col-span-4">
        <Filters active={active} setActive={setActive} />
        <ResourceList
          resources={visible}
          active={active}
          setActive={setActive}
          onPick={(r) => {
            setSelected(r);
            mapRef.current?.flyTo({ center: r.coords, zoom: 13.4 });
          }}
        />
      </aside>
      <div className="relative md:col-span-8">
        <div ref={mapEl} className="h-[480px] w-full overflow-hidden rounded-2xl ring-1 ring-ink/10 md:h-[640px]" />
        {selected && (
          <div className="absolute bottom-4 left-4 right-4 card p-5 md:max-w-md">
            <button
              className="absolute right-3 top-3 text-ink-muted hover:text-ink"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              ×
            </button>
            <p className="eyebrow" style={{ color: categories[selected.category].color }}>
              {categories[selected.category].label}
            </p>
            <h4 className="mt-1 text-lg">{selected.name}</h4>
            <p className="mt-2 text-sm text-ink-soft">{selected.blurb}</p>
            <ResourceMeta r={selected} />
          </div>
        )}
      </div>
    </div>
  );
}

function Filters({
  active,
  setActive
}: {
  active: Set<ResourceCategory>;
  setActive: (s: Set<ResourceCategory>) => void;
}) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {(Object.keys(categories) as ResourceCategory[]).map((k) => {
        const on = active.has(k);
        return (
          <button
            key={k}
            type="button"
            onClick={() => {
              const next = new Set(active);
              if (on) next.delete(k);
              else next.add(k);
              setActive(next);
            }}
            className={
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition " +
              (on
                ? "border-ink/15 bg-ink text-bone-50"
                : "border-ink/15 bg-bone-50 text-ink hover:bg-ink/5")
            }
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ background: categories[k].color }}
            />
            {categories[k].label}
          </button>
        );
      })}
    </div>
  );
}

function ResourceList({
  resources,
  onPick
}: {
  resources: Resource[];
  active: Set<ResourceCategory>;
  setActive: (s: Set<ResourceCategory>) => void;
  onPick?: (r: Resource) => void;
}) {
  return (
    <ul className="max-h-[560px] divide-y divide-ink/10 overflow-y-auto rounded-2xl ring-1 ring-ink/10">
      {resources.map((r) => (
        <li key={r.id}>
          <button
            type="button"
            onClick={() => onPick?.(r)}
            className="block w-full px-4 py-3 text-left hover:bg-ink/5"
          >
            <div className="flex items-center gap-2 text-xs">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: categories[r.category].color }}
              />
              <span className="text-ink-muted">{categories[r.category].label}</span>
            </div>
            <p className="mt-1 font-medium text-ink">{r.name}</p>
            <p className="mt-0.5 line-clamp-2 text-sm text-ink-muted">{r.blurb}</p>
          </button>
        </li>
      ))}
      {resources.length === 0 && (
        <li className="px-4 py-6 text-sm text-ink-muted">No resources match the current filter.</li>
      )}
    </ul>
  );
}

function ResourceMeta({ r }: { r: Resource }) {
  return (
    <dl className="mt-3 space-y-1 text-sm">
      {r.address && (
        <Row k="Address">
          <span>{r.address}</span>
        </Row>
      )}
      {r.phone && (
        <Row k="Call">
          <a className="btn-link" href={`tel:${r.phone.replace(/[^0-9+]/g, "")}`}>
            {r.phone}
          </a>
        </Row>
      )}
      {r.hours && <Row k="Hours">{r.hours}</Row>}
      {r.languages && <Row k="Languages">{r.languages.join(" · ")}</Row>}
      {r.url && (
        <Row k="Web">
          <a className="btn-link" href={r.url} target="_blank" rel="noreferrer">
            Visit site
          </a>
        </Row>
      )}
    </dl>
  );
}

function Row({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <dt className="w-20 shrink-0 text-xs uppercase tracking-wider text-ink-muted">{k}</dt>
      <dd className="flex-1">{children}</dd>
    </div>
  );
}
