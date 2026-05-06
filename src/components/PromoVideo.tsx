"use client";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { site } from "@/lib/site";

// "Watch our promo video" CTA + modal player. Plays /public/promo/promo.mp4
// when present (rendered by the render-promo GitHub Action). Until then, the
// modal shows the poster image with a friendly "we're rendering it" notice.
export function PromoVideoButton({
  variant = "ember"
}: {
  variant?: "ember" | "primary" | "ghost";
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`btn-${variant} inline-flex items-center gap-2`}
        aria-haspopup="dialog"
      >
        <PlayIcon />
        Watch our 60-second promo
      </button>
      {open && <PromoModal onClose={() => setOpen(false)} />}
    </>
  );
}

function PromoModal({ onClose }: { onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    // Lock body scroll while open.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 px-4 py-10 backdrop-blur"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Promo video"
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-indigo-900 shadow-2xl ring-1 ring-bone-50/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-bone-50/95 text-ink shadow hover:bg-bone-50"
        >
          ✕
        </button>

        <div className="aspect-video w-full bg-indigo-900">
          {errored ? (
            <RenderingNotice />
          ) : (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
              ref={videoRef}
              className="h-full w-full bg-black"
              src={asset(site.promoVideoUrl)}
              poster={asset(site.promoPosterUrl)}
              controls
              autoPlay
              playsInline
              onError={() => setErrored(true)}
            />
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-bone-100/90">
          <p className="text-sm">
            <span className="text-ember-200">Justice 4 Us The People</span> · 60-second promo
          </p>
          <a
            href="/donate"
            className="text-sm text-ember-200 underline-offset-4 hover:underline"
          >
            Support the work →
          </a>
        </div>
      </div>
    </div>
  );
}

function RenderingNotice() {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-3 bg-cover bg-center p-8 text-center"
      style={{ backgroundImage: `url(${asset(site.promoPosterUrl)})` }}
    >
      <div className="rounded-2xl bg-ink/70 p-6 text-bone-50 backdrop-blur">
        <p className="text-xs uppercase tracking-[0.18em] text-ember-200">
          Promo coming soon
        </p>
        <p className="mt-2 max-w-md text-base">
          We&rsquo;re rendering the 60-second promo. Check back in a moment, or
          read the script in <code className="rounded bg-bone-50/10 px-1.5 py-0.5 text-sm">/promo/script.md</code>.
        </p>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.14v13.72c0 .79.87 1.27 1.54.84l10.81-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14z" />
    </svg>
  );
}
