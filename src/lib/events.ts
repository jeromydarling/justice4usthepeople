// Events data. To add an event, copy a block, edit dates / location / partners.
// `start` is an ISO datetime in America/Chicago.
export type Partner = {
  name: string;
  short?: string;
  logo: string; // /public path
  url?: string;
};

export type EventItem = {
  slug: string;
  title: string;
  subtitle?: string;
  rallying?: string;
  start: string; // ISO 8601 (with -05:00 / -06:00 offset for Central time)
  durationMinutes?: number;
  location: {
    name: string;
    address?: string;
    city?: string;
    coords?: [number, number]; // [lng, lat]
    googleMapsQuery?: string;
  };
  description: string;
  partners?: Partner[];
  posterUrl?: string;
  rsvpUrl?: string; // optional external RSVP / social event link
};

const aeds: Partner = {
  name: "African Education Development Society",
  short: "AEDS",
  logo: "/partners/aeds.svg"
};
const syl: Partner = {
  name: "Somali Youth Link",
  short: "S.Y.L.",
  logo: "/partners/syl.svg"
};

export const events: EventItem[] = [
  {
    slug: "press-conference-tps-2026-03-16",
    title: "Press Conference: Extend Temporary Protective Status",
    subtitle: "Stand in Solidarity · Minnesota State Capitol",
    rallying: "Immigrant-Led · Minnesota-Strong · Stand in Solidarity",
    start: "2026-03-16T14:00:00-05:00",
    durationMinutes: 60,
    location: {
      name: "Minnesota State Capitol — Press Conference Room B971",
      address: "75 Rev Dr Martin Luther King Jr Blvd",
      city: "St. Paul, MN 55155",
      coords: [-93.10215, 44.95513],
      googleMapsQuery: "Minnesota State Capitol Press Conference Room B971"
    },
    description:
      "A press conference calling on Congress and the administration to extend Temporary Protective Status for affected Minnesotans. Coalition partners, faith communities, and TPS holders will speak.",
    partners: [aeds, syl]
  },
  {
    slug: "march-for-immigrants-2026-03-21",
    title: "March For Immigrants",
    subtitle: "Extend Temporary Protective Status",
    rallying: "Immigrant-Led · Minnesota-Strong · Stand in Solidarity",
    start: "2026-03-21T13:00:00-05:00",
    durationMinutes: 120,
    location: {
      name: "Hennepin Ave. & W. Lake St.",
      address: "Hennepin Avenue & West Lake Street",
      city: "Minneapolis, MN",
      coords: [-93.29555, 44.94855],
      googleMapsQuery: "Hennepin Ave and W Lake St Minneapolis"
    },
    description:
      "A community march from Uptown to demand the extension of Temporary Protective Status. Bring family, banners, and water — we walk together.",
    partners: [aeds, syl]
  }
];

// Sort soonest-upcoming first; past events fall to the end.
export function sortEvents(now = new Date()) {
  const upcoming: EventItem[] = [];
  const past: EventItem[] = [];
  for (const e of events) {
    if (new Date(e.start) >= now) upcoming.push(e);
    else past.push(e);
  }
  upcoming.sort((a, b) => +new Date(a.start) - +new Date(b.start));
  past.sort((a, b) => +new Date(b.start) - +new Date(a.start));
  return { upcoming, past };
}

export function eventEnd(e: EventItem): Date {
  return new Date(new Date(e.start).getTime() + (e.durationMinutes ?? 60) * 60_000);
}

export function formatDate(e: EventItem) {
  const d = new Date(e.start);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Chicago"
  });
}

export function formatTime(e: EventItem) {
  const d = new Date(e.start);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Chicago",
    timeZoneName: "short"
  });
}

// Generates an .ics file as a data URL — works without any backend.
export function icsHref(e: EventItem) {
  const fmt = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  const start = new Date(e.start);
  const end = eventEnd(e);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//justice4usthepeople//events//EN",
    "BEGIN:VEVENT",
    `UID:${e.slug}@justice4usthepeople.org`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${escapeIcs(e.title)}`,
    `DESCRIPTION:${escapeIcs(e.description)}`,
    `LOCATION:${escapeIcs([e.location.name, e.location.address, e.location.city].filter(Boolean).join(", "))}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

function escapeIcs(s: string) {
  return s.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\r?\n/g, "\\n");
}
