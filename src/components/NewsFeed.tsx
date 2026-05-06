"use client";
import { useEffect, useMemo, useState } from "react";
import { feeds, type Feed } from "@/lib/news";

type Item = {
  title: string;
  link: string;
  pubDate: string;
  description?: string;
  source: string;
  tag: Feed["tag"];
};

type Status = "loading" | "ready" | "error";

const API_KEY = process.env.NEXT_PUBLIC_RSS2JSON_API_KEY;

function rssUrl(url: string) {
  const u = new URL("https://api.rss2json.com/v1/api.json");
  u.searchParams.set("rss_url", url);
  if (API_KEY) u.searchParams.set("api_key", API_KEY);
  u.searchParams.set("count", "10");
  return u.toString();
}

export function NewsFeed() {
  const [items, setItems] = useState<Item[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [tagFilter, setTagFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");

  useEffect(() => {
    let alive = true;
    setStatus("loading");
    Promise.allSettled(
      feeds.map(async (f) => {
        const r = await fetch(rssUrl(f.url));
        if (!r.ok) throw new Error(`Feed ${f.id} failed`);
        const j = await r.json();
        return (j.items ?? []).map((it: { title: string; link: string; pubDate: string; description?: string }) => ({
          title: it.title,
          link: it.link,
          pubDate: it.pubDate,
          description: stripHtml(it.description ?? ""),
          source: f.source,
          tag: f.tag
        })) as Item[];
      })
    ).then((settled) => {
      if (!alive) return;
      const all = settled
        .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
        .sort((a, b) => +new Date(b.pubDate) - +new Date(a.pubDate));
      setItems(all);
      setStatus(all.length ? "ready" : "error");
    });
    return () => {
      alive = false;
    };
  }, []);

  const tags = useMemo(() => Array.from(new Set(feeds.map((f) => f.tag))), []);
  const sources = useMemo(() => feeds.map((f) => f.source), []);

  const visible = items.filter(
    (i) =>
      (tagFilter === "all" || i.tag === tagFilter) &&
      (sourceFilter === "all" || i.source === sourceFilter)
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Filter
          label="Topic"
          value={tagFilter}
          onChange={setTagFilter}
          options={[{ value: "all", label: "All topics" }, ...tags.map((t) => ({ value: t, label: t }))]}
        />
        <Filter
          label="Source"
          value={sourceFilter}
          onChange={setSourceFilter}
          options={[{ value: "all", label: "All sources" }, ...sources.map((s) => ({ value: s, label: s }))]}
        />
      </div>

      {status === "loading" && <SkeletonGrid />}
      {status === "error" && (
        <p className="rounded-xl border border-ember-300 bg-ember-50 p-4 text-sm text-ember-700">
          We couldn't reach some news sources right now. Try again in a moment,
          or check our list of trusted feeds in <code>src/lib/news.ts</code>.
        </p>
      )}
      {status === "ready" && (
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.slice(0, 36).map((it, i) => (
            <li key={`${it.link}-${i}`}>
              <a
                href={it.link}
                target="_blank"
                rel="noreferrer"
                className="card flex h-full flex-col gap-3 p-5 no-underline transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="rounded-full bg-indigo-700/10 px-2 py-0.5 font-medium text-indigo-700">
                    {it.tag}
                  </span>
                  <time dateTime={it.pubDate} className="text-ink-muted">
                    {formatDate(it.pubDate)}
                  </time>
                </div>
                <h3 className="font-serif text-lg leading-snug text-ink">{it.title}</h3>
                {it.description && (
                  <p className="line-clamp-3 text-sm text-ink-muted">{it.description}</p>
                )}
                <span className="mt-auto text-xs text-ink-muted">{it.source}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Filter({
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
    <label className="flex items-center gap-2 text-sm">
      <span className="text-ink-muted">{label}</span>
      <select
        className="rounded-full border border-ink/15 bg-bone-50 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
        value={value}
        onChange={(e) => onChange(e.target.value)}
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

function SkeletonGrid() {
  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i} className="card animate-pulse p-5">
          <div className="h-3 w-24 rounded bg-ink/10" />
          <div className="mt-3 h-5 w-full rounded bg-ink/10" />
          <div className="mt-1.5 h-5 w-3/4 rounded bg-ink/10" />
          <div className="mt-4 h-3 w-full rounded bg-ink/5" />
          <div className="mt-1.5 h-3 w-5/6 rounded bg-ink/5" />
        </li>
      ))}
    </ul>
  );
}

function stripHtml(s: string) {
  return s.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (isNaN(+d)) return "";
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
