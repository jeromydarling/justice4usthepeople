"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { LangSwitcher } from "./LangSwitcher";
import { SiteSearch } from "./SiteSearch";
import { primaryNav, type NavGroup } from "@/lib/site";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!navRef.current?.contains(e.target as Node)) setOpenDropdown(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenDropdown(null);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-bone-50/85 backdrop-blur print:hidden">
      <div className="container-wide flex items-center justify-between gap-3 py-3 md:gap-4">
        <Logo />
        <div ref={navRef} className="hidden items-center gap-0.5 md:flex">
          {primaryNav.map((g, i) => (
            <NavDropdown
              key={g.label}
              group={g}
              isOpen={openDropdown === i}
              onOpen={() => setOpenDropdown(i)}
              onClose={() => setOpenDropdown((cur) => (cur === i ? null : cur))}
              alignRight={i === primaryNav.length - 1}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <SiteSearch />
          <LangSwitcher />
          {/* Donate visible on tablet+, full membership CTA on desktop+. */}
          <Link href="/donate" className="hidden btn-ember md:inline-flex">
            Donate
          </Link>
          <Link
            href="/membership"
            className="hidden btn-primary lg:inline-flex"
          >
            Become a member
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu — same groups, rendered as <details> accordions. */}
      {mobileOpen && (
        <div className="border-t border-ink/10 bg-bone-50 md:hidden">
          <nav className="container-wide flex flex-col gap-1 py-3">
            {primaryNav.map((g) => (
              <details key={g.label} className="group border-b border-ink/10 py-2 [&_summary]:list-none">
                <summary className="flex cursor-pointer items-center justify-between rounded-md px-2 py-2 text-base font-medium text-ink">
                  {g.label}
                  <Chevron className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <ul className="mt-1 flex flex-col gap-0.5 pl-2">
                  {g.href && (
                    <li>
                      <Link
                        href={g.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-md px-3 py-2 text-sm text-ink/80 no-underline hover:bg-ink/5"
                      >
                        All {g.label.toLowerCase()} →
                      </Link>
                    </li>
                  )}
                  {g.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-md px-3 py-2 text-sm text-ink no-underline hover:bg-ink/5"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
            <div className="mt-2 flex gap-2">
              <Link href="/donate" className="btn-ember flex-1" onClick={() => setMobileOpen(false)}>
                Donate
              </Link>
              <Link
                href="/membership"
                className="btn-primary flex-1"
                onClick={() => setMobileOpen(false)}
              >
                Membership
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavDropdown({
  group,
  isOpen,
  onOpen,
  onClose,
  alignRight = false
}: {
  group: NavGroup;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  alignRight?: boolean;
}) {
  const closeTimer = useRef<number | null>(null);
  function clearClose() {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }
  function scheduleClose() {
    clearClose();
    closeTimer.current = window.setTimeout(() => onClose(), 120);
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        clearClose();
        onOpen();
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => (isOpen ? onClose() : onOpen())}
        onFocus={onOpen}
        className={
          "inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium no-underline transition lg:px-3 " +
          (isOpen
            ? "bg-ink/5 text-indigo-700"
            : "text-ink/80 hover:bg-ink/5 hover:text-indigo-700")
        }
      >
        {group.label}
        <Chevron
          className={
            "h-3.5 w-3.5 transition-transform " + (isOpen ? "rotate-180" : "")
          }
        />
      </button>
      {isOpen && (
        <div
          role="menu"
          className={
            "absolute top-full z-50 mt-1 min-w-[16rem] overflow-hidden rounded-xl border border-ink/10 bg-bone-50 py-2 shadow-lg " +
            (alignRight ? "right-0" : "left-0")
          }
          onMouseEnter={clearClose}
          onMouseLeave={scheduleClose}
        >
          {group.href && (
            <Link
              href={group.href}
              role="menuitem"
              onClick={onClose}
              className="block border-b border-ink/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink-muted no-underline hover:bg-ink/5 hover:text-indigo-700"
            >
              All {group.label.toLowerCase()} →
            </Link>
          )}
          <ul className="flex flex-col py-1">
            {group.items.map((item) => (
              <li key={item.href} role="none">
                <Link
                  href={item.href}
                  role="menuitem"
                  onClick={onClose}
                  className="block px-4 py-2 text-sm text-ink no-underline hover:bg-ink/5 hover:text-indigo-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
