"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { resources, categories } from "@/lib/resources";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// A compact, view-only Mapbox map used on the homepage as a teaser for the
// full /get-help experience. Disables most controls and overlays a CTA.
// When the token isn't configured, we fall back to the editorial SVG so the
// section never looks broken.
export function MapPreview({ fallback }: { fallback: React.ReactNode }) {
  const el = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!TOKEN || !el.current || mapRef.current) return;
    mapboxgl.accessToken = TOKEN;
    const map = new mapboxgl.Map({
      container: el.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-93.2, 44.96],
      zoom: 9.6,
      attributionControl: false,
      interactive: true,
      cooperativeGestures: true
    });
    map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-right");
    map.scrollZoom.disable();

    map.on("load", () => {
      // Subtle indigo wash to match the section's bg-indigo-900 surround.
      try {
        if (map.getLayer("water")) {
          map.setPaintProperty("water", "fill-color", "#1f2a55");
        }
      } catch {
        /* style version differences — non-fatal */
      }
      for (const r of resources) {
        const dot = document.createElement("div");
        dot.style.cssText = `
          width: 16px; height: 16px; border-radius: 9999px;
          background: ${categories[r.category].color};
          border: 2px solid rgba(251,248,242,.92);
          box-shadow: 0 4px 10px -2px rgba(0,0,0,.55);
        `;
        new mapboxgl.Marker({ element: dot, anchor: "center" })
          .setLngLat(r.coords)
          .addTo(map);
      }
    });

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  if (!TOKEN) return <>{fallback}</>;

  return (
    <div className="relative h-full w-full">
      <div ref={el} className="absolute inset-0" />
      <Link
        href="/get-help"
        aria-label="Open the full resource map"
        className="absolute inset-0 z-10 flex items-end justify-end p-4 md:p-5"
      >
        <span className="rounded-full bg-bone-50/95 px-4 py-2 text-xs font-medium text-ink shadow-md ring-1 ring-ink/10 backdrop-blur transition group-hover:bg-bone-50">
          Open the map →
        </span>
      </Link>
    </div>
  );
}
