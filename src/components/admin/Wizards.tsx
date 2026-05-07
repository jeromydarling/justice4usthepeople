"use client";
import { useMemo, useState } from "react";

// "I want to add X" → fill a tiny form → get a polished Claude prompt to
// paste. The wizard never actually changes the site itself. Its job is to
// produce a request the team can send to Claude with confidence.

type WizardId = "resource" | "event" | "story" | "partner";

const wizards: { id: WizardId; label: string; intro: string }[] = [
  {
    id: "resource",
    label: "Add a resource",
    intro: "Fill what you know — Claude fills the rest in /get-help."
  },
  {
    id: "event",
    label: "Add an event",
    intro: "Title, date/time, place. We compose the prompt."
  },
  {
    id: "story",
    label: "Add a story",
    intro: "Privacy-safe vignette for /stories. Names changed by default."
  },
  {
    id: "partner",
    label: "Add a coalition partner",
    intro: "New entry on /partners with logo, blurb, and category."
  }
];

export function Wizards() {
  const [active, setActive] = useState<WizardId>("resource");
  return (
    <section id="wizards" className="container-wide pb-12">
      <div className="card p-8">
        <p className="eyebrow">Quick-action wizards</p>
        <h2 className="mt-2 font-serif text-2xl">
          Forms that write your prompt for you.
        </h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Fill the fields you know, leave the rest blank. The bottom of each
          wizard generates a polished prompt — copy it and paste into Claude.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {wizards.map((w) => (
            <button
              key={w.id}
              type="button"
              onClick={() => setActive(w.id)}
              className={
                "rounded-full border px-3 py-1.5 text-xs font-medium transition " +
                (active === w.id
                  ? "border-indigo-700 bg-indigo-700 text-bone-50"
                  : "border-ink/15 bg-bone-50 text-ink hover:bg-ink/5")
              }
            >
              {w.label}
            </button>
          ))}
        </div>

        <p className="mt-5 text-sm text-ink-soft">
          {wizards.find((w) => w.id === active)?.intro}
        </p>

        <div className="mt-5">
          {active === "resource" && <ResourceWizard />}
          {active === "event" && <EventWizard />}
          {active === "story" && <StoryWizard />}
          {active === "partner" && <PartnerWizard />}
        </div>
      </div>
    </section>
  );
}

function PromptOutput({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard?.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  }
  return (
    <div className="mt-6 rounded-2xl bg-indigo-700/5 p-5 ring-1 ring-indigo-200">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
          Prompt to paste into Claude
        </p>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-full border border-indigo-700 bg-indigo-700 px-3 py-1.5 text-xs font-medium text-bone-50 hover:bg-indigo-800"
        >
          {copied ? "Copied!" : "Copy prompt"}
        </button>
      </div>
      <pre className="mt-3 whitespace-pre-wrap font-mono text-xs leading-relaxed text-ink">
        {prompt}
      </pre>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Resource wizard
// ---------------------------------------------------------------------------
function ResourceWizard() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("legal");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [url, setUrl] = useState("");
  const [hours, setHours] = useState("");
  const [languages, setLanguages] = useState("");
  const [blurb, setBlurb] = useState("");

  const prompt = useMemo(() => {
    const lines: string[] = [
      `Add a new resource to /get-help in src/lib/resources.ts.`,
      ``,
      `Name: ${name || "[FILL IN]"}`,
      `Category: ${category}`
    ];
    if (address) lines.push(`Address: ${address}`);
    if (phone) lines.push(`Phone: ${phone}`);
    if (url) lines.push(`URL: ${url}`);
    if (hours) lines.push(`Hours: ${hours}`);
    if (languages) lines.push(`Languages: ${languages}`);
    if (blurb) lines.push(``, `Blurb: ${blurb}`);
    lines.push(
      ``,
      `Use the existing entries in resources.ts as the pattern. Approximate the coordinates from the address.`
    );
    return lines.join("\n");
  }, [name, category, address, phone, url, hours, languages, blurb]);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" value={name} onChange={setName} placeholder="Volunteer Lawyers Network" />
        <SelectField
          label="Category"
          value={category}
          onChange={setCategory}
          options={[
            { value: "legal", label: "Legal aid" },
            { value: "food", label: "Food" },
            { value: "housing", label: "Housing" },
            { value: "health", label: "Health" },
            { value: "sanctuary", label: "Sanctuary" },
            { value: "kyr", label: "Know your rights" },
            { value: "rapid", label: "Rapid response" }
          ]}
        />
        <Field label="Address (optional)" value={address} onChange={setAddress} placeholder="600 Nicollet Mall, Minneapolis, MN" />
        <Field label="Phone (optional)" value={phone} onChange={setPhone} placeholder="612-555-0000" />
        <Field label="URL (optional)" value={url} onChange={setUrl} placeholder="https://example.org" />
        <Field label="Hours (optional)" value={hours} onChange={setHours} placeholder="Tue & Thu 1–4 PM" />
        <Field label="Languages (optional)" value={languages} onChange={setLanguages} placeholder="English, Spanish, Somali" />
      </div>
      <TextareaField
        label="Blurb"
        value={blurb}
        onChange={setBlurb}
        placeholder="One or two sentences describing what they do."
      />
      <PromptOutput prompt={prompt} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Event wizard
// ---------------------------------------------------------------------------
function EventWizard() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("60");
  const [locName, setLocName] = useState("");
  const [locAddr, setLocAddr] = useState("");
  const [partners, setPartners] = useState("");
  const [description, setDescription] = useState("");

  const prompt = useMemo(() => {
    const lines: string[] = [
      `Add a new event to src/lib/events.ts.`,
      ``,
      `Title: ${title || "[FILL IN]"}`,
      `Start: ${date || "[YYYY-MM-DD]"}T${time || "[HH:MM]"}:00 America/Chicago`,
      `Duration: ${duration} minutes`
    ];
    if (locName) lines.push(`Location name: ${locName}`);
    if (locAddr) lines.push(`Location address: ${locAddr}`);
    if (partners) lines.push(`Coalition partners: ${partners}`);
    if (description) lines.push(``, `Description: ${description}`);
    lines.push(
      ``,
      `Use the existing event entries as the pattern. Approximate coords from the address.`
    );
    return lines.join("\n");
  }, [title, date, time, duration, locName, locAddr, partners, description]);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title" value={title} onChange={setTitle} placeholder="March For Immigrants" />
        <Field label="Date" type="date" value={date} onChange={setDate} />
        <Field label="Time" type="time" value={time} onChange={setTime} />
        <Field label="Duration (min)" value={duration} onChange={setDuration} placeholder="60" />
        <Field label="Location name" value={locName} onChange={setLocName} placeholder="Minnesota State Capitol" />
        <Field label="Location address" value={locAddr} onChange={setLocAddr} placeholder="75 Rev Dr Martin Luther King Jr Blvd, St. Paul" />
        <Field label="Coalition partners (comma-separated)" value={partners} onChange={setPartners} placeholder="AEDS, S.Y.L." />
      </div>
      <TextareaField
        label="Description"
        value={description}
        onChange={setDescription}
        placeholder="A 1–2 sentence summary of what's happening and who should come."
      />
      <PromptOutput prompt={prompt} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Story wizard
// ---------------------------------------------------------------------------
function StoryWizard() {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [lede, setLede] = useState("");
  const [body, setBody] = useState("");
  const [namesChanged, setNamesChanged] = useState(true);

  const prompt = useMemo(() => {
    const lines: string[] = [
      `Add a new story to /stories.`,
      ``,
      `Title: ${title || "[FILL IN]"}`,
      `Tag: ${tag || "[FILL IN]"}`,
      `Lede: ${lede || "[FILL IN]"}`,
      ``,
      `Body:`,
      body || "[FILL IN]"
    ];
    if (namesChanged) {
      lines.push(``, `Names and identifying details have been changed for privacy.`);
    }
    return lines.join("\n");
  }, [title, tag, lede, body, namesChanged]);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title" value={title} onChange={setTitle} placeholder="After the call" />
        <Field label="Tag" value={tag} onChange={setTag} placeholder="Court accompaniment" />
      </div>
      <TextareaField
        label="Lede (one-sentence summary)"
        value={lede}
        onChange={setLede}
        placeholder="A first-time volunteer realized why a row of neighbors matters."
      />
      <TextareaField
        label="Body (3–5 sentences)"
        value={body}
        onChange={setBody}
        placeholder="The volunteer expected to be uncomfortable. Instead they understood..."
        rows={6}
      />
      <label className="mt-3 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={namesChanged}
          onChange={(e) => setNamesChanged(e.target.checked)}
          className="h-4 w-4"
        />
        Names &amp; identifying details have been changed for privacy
      </label>
      <PromptOutput prompt={prompt} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Partner wizard
// ---------------------------------------------------------------------------
function PartnerWizard() {
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [category, setCategory] = useState("advocacy");
  const [url, setUrl] = useState("");
  const [blurb, setBlurb] = useState("");

  const prompt = useMemo(() => {
    const lines: string[] = [
      `Add a new coalition partner to /partners.`,
      ``,
      `Name: ${name || "[FILL IN]"}`,
      ...(shortName ? [`Short name: ${shortName}`] : []),
      `Category: ${category}`,
      ...(url ? [`URL: ${url}`] : []),
      ``,
      `Blurb: ${blurb || "[FILL IN — one sentence on what they do.]"}`
    ];
    return lines.join("\n");
  }, [name, shortName, category, url, blurb]);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Full name" value={name} onChange={setName} placeholder="Mid-Minnesota Legal Aid" />
        <Field label="Short name (optional)" value={shortName} onChange={setShortName} placeholder="MMLA" />
        <SelectField
          label="Category"
          value={category}
          onChange={setCategory}
          options={[
            { value: "advocacy", label: "Advocacy" },
            { value: "faith", label: "Faith" },
            { value: "service", label: "Direct service" },
            { value: "legal", label: "Legal" },
            { value: "labor", label: "Labor" }
          ]}
        />
        <Field label="URL" value={url} onChange={setUrl} placeholder="https://mylegalaid.org" />
      </div>
      <TextareaField
        label="Blurb"
        value={blurb}
        onChange={setBlurb}
        placeholder="One sentence on what they do."
      />
      <PromptOutput prompt={prompt} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Field primitives
// ---------------------------------------------------------------------------
function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text"
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-ink-muted">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-ink-muted">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="select"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 3
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="mt-4 flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-ink-muted">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="textarea"
      />
    </label>
  );
}
