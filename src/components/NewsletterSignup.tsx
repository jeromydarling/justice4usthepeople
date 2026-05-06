"use client";
import { useState, FormEvent } from "react";
import { site } from "@/lib/site";

// Lightweight subscribe form — posts to the same Worker as every other form,
// with `_form: newsletter-subscribe` so submissions land as a labeled issue
// in the submissions repo. The org views/exports the list from GitHub.
export function NewsletterSignup({
  variant = "card"
}: {
  variant?: "card" | "inline";
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState<
    | { status: "idle" }
    | { status: "submitting" }
    | { status: "ok" }
    | { status: "error"; message: string }
  >({ status: "idle" });

  const endpoint = site.formEndpoint;
  const configured =
    !!endpoint && endpoint.startsWith("http") && !endpoint.includes("xxx");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!configured) {
      setState({
        status: "error",
        message: "Subscriptions aren't connected yet."
      });
      return;
    }
    setState({ status: "submitting" });
    const data = new FormData();
    data.set("_form", "newsletter-subscribe");
    data.set("_subject", `New subscriber · ${email}`);
    data.set("email", email);
    data.set("name", name);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || `Subscribe failed (${res.status}).`);
      }
      setState({ status: "ok" });
      setEmail("");
      setName("");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setState({ status: "error", message });
    }
  }

  if (state.status === "ok") {
    return (
      <div className={variant === "card" ? "card p-6" : "rounded-lg bg-bone-100 p-4"}>
        <p className="font-serif text-lg">Thank you.</p>
        <p className="mt-1 text-sm text-ink-soft">
          You&rsquo;ll get a short weekly note with what&rsquo;s happening — news that matters, events, and ways to show up.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={
        variant === "card"
          ? "card flex flex-col gap-3 p-6"
          : "flex flex-col gap-2"
      }
    >
      {variant === "card" && (
        <div>
          <p className="eyebrow">Weekly briefing</p>
          <h3 className="mt-2 font-serif text-xl">A short note, once a week.</h3>
          <p className="mt-1 text-sm text-ink-soft">
            What&rsquo;s happening, what to watch, and how to show up. Unsubscribe any time.
          </p>
        </div>
      )}
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          name="name"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          className="input flex-1"
        />
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="input flex-1"
        />
        <button
          type="submit"
          className="btn-primary"
          disabled={state.status === "submitting"}
        >
          {state.status === "submitting" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      {state.status === "error" && (
        <p className="field-error" role="alert">
          {state.message}
        </p>
      )}
      <p className="text-xs text-ink-muted">
        We never share your email. Sent from a real person, weekly.
      </p>
    </form>
  );
}
