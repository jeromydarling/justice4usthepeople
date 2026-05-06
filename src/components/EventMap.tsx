import type { EventItem } from "@/lib/events";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// Renders a real Mapbox map for an event location using the Static Images API.
// No client-side Mapbox bundle — just a single retina <img>. Falls back to a
// hand-drawn pin SVG when the token isn't configured or the event has no
// coordinates. Tapping the map opens Google Maps directions.
export function EventMap({ event }: { event: EventItem }) {
  const coords = event.location.coords;

  if (!TOKEN || !coords) return <EventMapFallback event={event} />;

  const [lng, lat] = coords;
  // Custom-colored ember marker to match brand palette.
  const marker = `pin-s+a8512a(${lng},${lat})`;
  const center = `${lng},${lat},13.4,0`;
  const size = "600x500@2x";
  const style = "mapbox/light-v11";
  const url = `https://api.mapbox.com/styles/v1/${style}/static/${marker}/${center}/${size}?access_token=${TOKEN}`;

  const directions = event.location.googleMapsQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location.googleMapsQuery)}`
    : `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <a
      href={directions}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open directions to ${event.location.name}`}
      className="relative block h-full min-h-[180px] overflow-hidden"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={`Map showing ${event.location.name}`}
        className="absolute inset-0 h-full w-full object-cover transition duration-300 hover:scale-[1.02]"
        loading="lazy"
      />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/0 p-4">
        <span className="block text-sm font-medium text-bone-50">
          {event.location.name}
        </span>
        {event.location.city && (
          <span className="block text-xs text-bone-200">
            {event.location.city}
          </span>
        )}
        <span className="mt-1 inline-block text-[10px] uppercase tracking-[0.18em] text-ember-200">
          Tap for directions →
        </span>
      </span>
    </a>
  );
}

function EventMapFallback({ event }: { event: EventItem }) {
  return (
    <div className="flex h-full min-h-[180px] flex-col items-center justify-center p-6 text-center">
      <svg viewBox="0 0 120 120" className="h-20 w-20 text-indigo-700" aria-hidden>
        <circle cx="60" cy="55" r="22" fill="currentColor" opacity="0.15" />
        <path
          d="M60 18c-12 0-22 9-22 22 0 16 22 42 22 42s22-26 22-42c0-13-10-22-22-22zm0 32a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"
          fill="currentColor"
        />
      </svg>
      <p className="mt-3 text-sm font-medium text-ink">{event.location.name}</p>
      {event.location.city && (
        <p className="text-xs text-ink-muted">{event.location.city}</p>
      )}
    </div>
  );
}
