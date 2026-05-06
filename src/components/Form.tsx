"use client";
import { ReactNode, useState, FormEvent } from "react";
import clsx from "clsx";

// A small set of form primitives that look hand-built and dignified —
// nothing about them should remind a visitor of a Google Form. They post to a
// Formspree (or Formspree-compatible) endpoint via plain fetch, which keeps
// us 100% static-export-friendly for GitHub Pages.

export type FormField =
  | {
      kind: "text" | "email" | "tel";
      name: string;
      label: string;
      required?: boolean;
      placeholder?: string;
      help?: string;
      autoComplete?: string;
    }
  | {
      kind: "textarea";
      name: string;
      label: string;
      required?: boolean;
      placeholder?: string;
      help?: string;
      rows?: number;
    }
  | {
      kind: "select";
      name: string;
      label: string;
      required?: boolean;
      help?: string;
      options: { value: string; label: string }[];
    }
  | {
      kind: "checkbox";
      name: string;
      label: string;
      required?: boolean;
      help?: string;
    };

export function EmbeddedForm({
  endpoint,
  subject,
  fields,
  submitLabel = "Send",
  successMessage = "Thank you. A neighbor on our team will be in touch.",
  hiddenFields = {},
  className
}: {
  endpoint: string;
  subject: string;
  fields: FormField[];
  submitLabel?: string;
  successMessage?: string;
  hiddenFields?: Record<string, string>;
  className?: string;
}) {
  const [state, setState] = useState<
    | { status: "idle" }
    | { status: "submitting" }
    | { status: "ok" }
    | { status: "error"; message: string }
  >({ status: "idle" });

  const configured =
    !!endpoint && !endpoint.includes("xxxxxxxx") && endpoint.startsWith("http");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!configured) {
      setState({
        status: "error",
        message:
          "This form isn't connected yet. Set the matching NEXT_PUBLIC_FORMSPREE_* env var and rebuild."
      });
      return;
    }
    setState({ status: "submitting" });
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error || `Submission failed (${res.status}).`);
      }
      setState({ status: "ok" });
      e.currentTarget.reset();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setState({ status: "error", message });
    }
  }

  if (state.status === "ok") {
    return (
      <div className={clsx("card p-8", className)}>
        <p className="eyebrow">Received</p>
        <h3 className="mt-2">{successMessage}</h3>
        <p className="mt-4 text-ink-muted">
          If you need urgent help, please call us at{" "}
          <a className="btn-link" href="tel:+16124241785">612-424-1785</a>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={clsx("card flex flex-col gap-5 p-6 md:p-8", className)}
      noValidate
    >
      <input type="hidden" name="_subject" value={subject} />
      {Object.entries(hiddenFields).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
      {/* Honeypot — bots fill this; humans never see it. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />
      {fields.map((f) => (
        <FieldControl key={f.name} field={f} />
      ))}
      {state.status === "error" && (
        <p className="field-error" role="alert">
          {state.message}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={state.status === "submitting"}
          className="btn-primary disabled:opacity-60"
        >
          {state.status === "submitting" ? "Sending…" : submitLabel}
        </button>
        <p className="text-xs text-ink-muted">
          We never share your information. Sent securely.
        </p>
      </div>
    </form>
  );
}

function FieldControl({ field }: { field: FormField }) {
  const id = `f-${field.name}`;
  if (field.kind === "textarea") {
    return (
      <FieldShell id={id} field={field}>
        <textarea
          id={id}
          name={field.name}
          required={field.required}
          placeholder={field.placeholder}
          rows={field.rows ?? 5}
          className="textarea"
        />
      </FieldShell>
    );
  }
  if (field.kind === "select") {
    return (
      <FieldShell id={id} field={field}>
        <select id={id} name={field.name} required={field.required} className="select" defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          {field.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </FieldShell>
    );
  }
  if (field.kind === "checkbox") {
    return (
      <label className="flex items-start gap-3" htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          name={field.name}
          required={field.required}
          className="mt-1 h-4 w-4 rounded border-ink/30 text-indigo-700 focus:ring-indigo-500"
        />
        <span>
          <span className="text-sm text-ink">
            {field.label}
            {field.required && <Required />}
          </span>
          {field.help && <span className="block text-xs text-ink-muted">{field.help}</span>}
        </span>
      </label>
    );
  }
  return (
    <FieldShell id={id} field={field}>
      <input
        id={id}
        name={field.name}
        type={field.kind}
        required={field.required}
        placeholder={field.placeholder}
        autoComplete={field.autoComplete}
        className="input"
      />
    </FieldShell>
  );
}

function FieldShell({
  id,
  field,
  children
}: {
  id: string;
  field: Exclude<FormField, { kind: "checkbox" }>;
  children: ReactNode;
}) {
  return (
    <div className="field">
      <label htmlFor={id} className="field-label">
        {field.label}
        {field.required && <Required />}
      </label>
      {children}
      {"help" in field && field.help && <p className="field-help">{field.help}</p>}
    </div>
  );
}

function Required() {
  return (
    <span className="ml-1 text-ember-700" aria-label="required">
      *
    </span>
  );
}

// A small inline note shown above forms when env keys aren't set yet.
export function FormConnectionNote({ endpoint, envVar }: { endpoint: string; envVar: string }) {
  const configured =
    !!endpoint && !endpoint.includes("xxxxxxxx") && endpoint.startsWith("http");
  if (configured) return null;
  return (
    <p className="mb-3 rounded-lg border border-ember-300/60 bg-ember-50 px-3 py-2 text-xs text-ember-700">
      <strong>Setup:</strong> set <code>{envVar}</code> to your Formspree
      endpoint URL and rebuild to activate this form.
    </p>
  );
}
