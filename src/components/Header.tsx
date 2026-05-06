"use client";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { LangSwitcher } from "./LangSwitcher";
import { primaryNav } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-bone-50/85 backdrop-blur">
      <div className="container-wide flex items-center justify-between gap-6 py-4">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink/80 no-underline hover:text-indigo-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LangSwitcher />
          <Link href="/donate" className="hidden md:inline-flex btn-ember">
            Donate
          </Link>
          <Link
            href="/membership"
            className="hidden md:inline-flex btn-primary"
          >
            Become a member
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
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
      {open && (
        <div className="border-t border-ink/10 bg-bone-50 md:hidden">
          <nav className="container-wide flex flex-col gap-1 py-3">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-base text-ink no-underline hover:bg-ink/5"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              <Link href="/donate" className="btn-ember flex-1">
                Donate
              </Link>
              <Link href="/membership" className="btn-primary flex-1">
                Membership
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
