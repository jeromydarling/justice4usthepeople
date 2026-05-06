import { events, eventEnd } from "@/lib/events";

// Statically exported .ics feed of all events. People subscribe to the URL
// in their calendar app (Google Calendar, Apple Calendar, Outlook) so new
// events flow in automatically.
export const dynamic = "force-static";

function escape(s: string): string {
  return s.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\r?\n/g, "\\n");
}

function fmt(d: Date): string {
  return d
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

export function GET() {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//justice4usthepeople//events//EN",
    "X-WR-CALNAME:Justice 4 Us The People · Events",
    "X-WR-TIMEZONE:America/Chicago",
    "X-WR-CALDESC:Press conferences, marches, vigils, and trainings."
  ];

  const stamp = fmt(new Date());

  for (const e of events) {
    const start = new Date(e.start);
    const end = eventEnd(e);
    const loc = [e.location.name, e.location.address, e.location.city]
      .filter(Boolean)
      .join(", ");
    lines.push(
      "BEGIN:VEVENT",
      `UID:${e.slug}@justice4usthepeople.org`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:${escape(e.title)}`,
      `DESCRIPTION:${escape(e.description)}`,
      `LOCATION:${escape(loc)}`,
      "END:VEVENT"
    );
  }
  lines.push("END:VCALENDAR");

  return new Response(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Cache-Control": "public, max-age=900"
    }
  });
}
