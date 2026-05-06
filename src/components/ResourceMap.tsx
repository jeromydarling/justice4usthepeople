"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { resources, categories, type ResourceCategory, type Resource } from "@/lib/resources";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function ResourceMap() {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
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
      center: [-93.2, 44.96],
      zoom: 10.4,
      cooperativeGestures: true
    });
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: false,
        showUserHeading: true,
        showAccuracyCircle: true
      }),
      "top-right"
    );
    map.addControl(new mapboxgl.FullscreenControl(), "top-right");
    map.addControl(new mapboxgl.ScaleControl({ unit: "imperial" }), "bottom-left");

    // Subtle brand tinting once style is loaded.
    map.on("load", () => {
      try {
        if (map.getLayer("water")) {
          map.setPaintProperty("water", "fill-color", "#dbe4ee");
        }
        if (map.getLayer("land")) {
          map.setPaintProperty("land", "background-color", "#fbf8f2");
        }
      } catch {
        /* style version differences — non-fatal */
      }
    });

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Render markers + fit bounds when filter changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    // Clear previous markers
    for (const m of markersRef.current) m.remove();
    markersRef.current = [];

    if (visible.length === 0) return;

    const bounds = new mapboxgl.LngLatBounds();
    for (const r of visible) {
      // Outer wrapper — Mapbox sets `transform: translate3d(...)` on this
      // element to position the marker. Touching its transform clobbers
      // positioning and the dot "bounces" to (0,0). Keep this clean.
      const wrap = document.createElement("div");
      wrap.style.cssText = "width: 26px; height: 26px;";

      // Inner dot owns its own transform for the hover scale.
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", r.name);
      dot.className = "j4-marker";
      dot.style.cssText = `
        width: 26px; height: 26px; border-radius: 9999px;
        background: ${categories[r.category].color};
        border: 3px solid #fbf8f2;
        box-shadow: 0 6px 18px -4px rgba(20,23,28,.45);
        cursor: pointer; padding: 0;
        transition: transform .15s ease;
        display: block;
      `;
      dot.addEventListener("mouseenter", () => (dot.style.transform = "scale(1.18)"));
      dot.addEventListener("mouseleave", () => (dot.style.transform = "scale(1)"));
      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        setSelected(r);
        map.flyTo({ center: r.coords, zoom: Math.max(map.getZoom(), 12.2), speed: 0.8 });
      });
      wrap.appendChild(dot);

      const marker = new mapboxgl.Marker({ element: wrap, anchor: "center" })
        .setLngLat(r.coords)
        .addTo(map);
      markersRef.current.push(marker);
      bounds.extend(r.coords);
    }

    // Fit bounds when filters change (but not on every selection).
    if (visible.length === 1) {
      map.flyTo({ center: visible[0].coords, zoom: 13, speed: 0.7 });
    } else {
      map.fitBounds(bounds, { padding: 60, maxZoom: 12.4, duration: 700 });
    }
  }, [visible]);

  if (!TOKEN) {
    return (
      <div className="card overflow-hidden">
        <div className="bg-ember-100 border-b border-ember-300 p-5 text-sm">
          <p className="eyebrow text-ember-700">Map not configured</p>
          <p className="mt-2 text-ink">
            The live Mapbox map needs a token to load. Add a{" "}
            <strong>repository secret named <code>MAPBOX_TOKEN</code></strong>{" "}
            in <em>Settings → Secrets and variables → Actions</em>, then re-run
            the latest deploy workflow.
          </p>
          <p className="mt-2 text-xs text-ink-muted">
            The deploy workflow logs include a "Build env summary" line that
            shows which envs were picked up — useful for spotting a typo'd
            secret name.
          </p>
        </div>
        <div className="p-5">
          <ResourceList resources={visible} active={active} setActive={setActive} />
        </div>
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
          selectedId={selected?.id}
          onPick={(r) => {
            setSelected(r);
            mapRef.current?.flyTo({ center: r.coords, zoom: 13.2, speed: 0.8 });
          }}
        />
      </aside>
      <div className="relative md:col-span-8">
        <div
          ref={mapEl}
          className="h-[360px] w-full overflow-hidden rounded-2xl ring-1 ring-ink/10 sm:h-[480px] md:h-[640px]"
        />
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
            <Link
              href={`/get-help/resources/${selected.id}`}
              className="btn-link mt-3 inline-flex text-sm"
            >
              Full details →
            </Link>
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
  selectedId,
  onPick
}: {
  resources: Resource[];
  active: Set<ResourceCategory>;
  setActive: (s: Set<ResourceCategory>) => void;
  selectedId?: string;
  onPick?: (r: Resource) => void;
}) {
  return (
    <ul className="max-h-[560px] divide-y divide-ink/10 overflow-y-auto rounded-2xl ring-1 ring-ink/10">
      {resources.map((r) => (
        <li key={r.id}>
          <button
            type="button"
            onClick={() => onPick?.(r)}
            className={
              "block w-full px-4 py-3 text-left transition " +
              (selectedId === r.id ? "bg-ember-100/60" : "hover:bg-ink/5")
            }
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
        <li className="px-4 py-6 text-sm text-ink-muted">
          No resources match the current filter.
        </li>
      )}
    </ul>
  );
}

function ResourceMeta({ r }: { r: Resource }) {
  const [lng, lat] = r.coords;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
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
      <Row k="Go">
        <a className="btn-link" href={directions} target="_blank" rel="noreferrer">
          Directions
        </a>
      </Row>
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
