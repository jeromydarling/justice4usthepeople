"use client";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { site } from "@/lib/site";

// "Watch our promo video" CTA + modal player. Plays /public/promo/promo.mp4
// rendered by the render-promo GitHub Action.
export function PromoVideoButton({
  variant = "ember",
  label = "Watch our 60-second promo"
}: {
  variant?: "ember" | "primary" | "ghost";
  label?: string;
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
        {label}
      </button>
      {open && <PromoModal onClose={() => setOpen(false)} />}
    </>
  );
}

function PromoModal({ onClose }: { onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
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

        <div className="aspect-video w-full bg-black">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            ref={videoRef}
            className="h-full w-full"
            src={asset(site.promoVideoUrl)}
            poster={asset(site.promoPosterUrl)}
            controls
            autoPlay
            playsInline
          />
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

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.14v13.72c0 .79.87 1.27 1.54.84l10.81-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14z" />
    </svg>
  );
}
