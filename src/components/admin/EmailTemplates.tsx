"use client";
import { useState } from "react";

// Copy-paste templates for the most common emails the org sends. Edit
// inline before copying — the template is just a starting voice.

type Template = {
  id: string;
  label: string;
  subject: string;
  body: string;
};

const templates: Template[] = [
  {
    id: "volunteer-welcome",
    label: "Volunteer welcome",
    subject: "Welcome — and thank you for showing up",
    body: `[First name],

Thank you for signing up to volunteer with Justice 4 Us The People. We received your form and someone from our team will be in touch within the week with next steps — usually that means a 20-minute orientation call so we can match your time and skills with what's needed most right now.

A few things you can do today:

  • Save our hotline: 612-424-1785
  • Read through Know Your Rights: justice4usthepeople.org/know-your-rights
  • Tell one neighbor about us

What we believe is simple: every person carries an unshakable dignity, and a community is judged by how it cares for the most fragile among us. We're glad you're here.

In solidarity,
[Your name]
Justice 4 Us The People`
  },
  {
    id: "donor-thank-you",
    label: "Donor thank-you",
    subject: "Your gift moved someone forward this week",
    body: `[Donor first name],

Your gift to Justice 4 Us The People landed at exactly the right moment. Last week alone, contributions like yours covered:

  • Back rent for a family of four facing a 14-day eviction notice
  • Two weeks of groceries for households whose hours were cut
  • A consultation with an immigration attorney for a TPS holder

You made all of that possible. We don't take it for granted, and we want you to know it.

If you'd like to deepen your support — recurring giving, planned giving, hosting a fundraiser — just reply. Otherwise, thank you. Quietly. Fully.

In solidarity,
[Your name]
Justice 4 Us The People`
  },
  {
    id: "form-receipt",
    label: '"We got your form" auto-reply',
    subject: "We received your message",
    body: `Thank you for reaching out to Justice 4 Us The People.

A real neighbor on our team has received what you sent and will follow up. We aim to reply within 48 hours; sooner if you indicated it was urgent.

If your situation can't wait, please call our 24-hour hotline at 612-424-1785.

In solidarity,
Justice 4 Us The People
justice4usthepeople.org`
  },
  {
    id: "partner-intro",
    label: "Partner introduction",
    subject: "An introduction — Justice 4 Us The People",
    body: `[Recipient name],

I wanted to introduce you to our work at Justice 4 Us The People. We're an immigrant-led, community-rooted organization in the Twin Cities running three direct relief lines — rental and utility relief, food, and legal navigation — alongside Know-Your-Rights training and a rapid-response network.

Our work overlaps with yours in a few places, and I think there's room for us to amplify each other. A few possibilities:

  • Co-hosting a Know-Your-Rights event in [neighborhood/parish/union]
  • Cross-referrals between [your org] and our intake
  • A joint statement when the next moment requires one

If any of that resonates, I'd love to set up a 30-minute call. We can come to you.

In solidarity,
[Your name]
Justice 4 Us The People
612-424-1785 · justice4usthepeople.org`
  },
  {
    id: "court-dispatch",
    label: "Court support volunteer dispatch",
    subject: "Court support — [date], [courthouse]",
    body: `[Volunteer first name],

A neighbor has a hearing on [DATE] at [TIME] at [COURTHOUSE], and we're putting together a row for them. Are you available to sit in the gallery?

  • Arrive: [TIME — 30 minutes early]
  • Where: [COURTHOUSE name and address]
  • Wear: business casual; matching shirts will be provided
  • What you'll do: nothing. Sit with the family. That's the whole job.
  • What you won't do: speak in court, take notes, or be a witness

Reply by [DATE] if you can be there. If you can't, no worries — we'll catch you next time.

In solidarity,
[Your name]
Justice 4 Us The People
Court support coordinator`
  },
  {
    id: "kyr-followup",
    label: "Hosting a KYR night — follow-up",
    subject: "Thank you for hosting — and what's next",
    body: `[Host name],

Thank you for hosting last [NIGHT/DATE]. [N] neighbors showed up, [N] cards went out, and at least one person told us afterward they'd been carrying anxiety about an interaction with police for months and now had a script. That's exactly what these nights are for.

A few next steps:

  • If anyone wants 1:1 follow-up, send them to our hotline (612-424-1785) or to /get-help on our site
  • The bilingual cards we passed out are downloadable at justice4usthepeople.org/know-your-rights — share the link
  • If your community wants a follow-up training (deeper KYR, court accompaniment, food shelf orientation), say the word

We're available whenever you want us back.

In solidarity,
[Your name]
Justice 4 Us The People`
  }
];

export function EmailTemplates() {
  const [activeId, setActiveId] = useState(templates[0].id);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [bodyOverride, setBodyOverride] = useState<Record<string, string>>({});
  const [subjectOverride, setSubjectOverride] = useState<Record<string, string>>({});

  const t = templates.find((x) => x.id === activeId) ?? templates[0];
  const subject = subjectOverride[t.id] ?? t.subject;
  const body = bodyOverride[t.id] ?? t.body;

  function copy(field: "subject" | "body" | "mailto") {
    let text = "";
    if (field === "subject") text = subject;
    else if (field === "body") text = body;
    else text = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1400);
    });
  }

  const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <section id="emails" className="container-wide pb-12">
      <div className="card p-8">
        <p className="eyebrow">Email templates</p>
        <h2 className="mt-2 font-serif text-2xl">
          Common emails, ready to send.
        </h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Edit inline before copying or opening in your mail app. Square
          brackets like <code>[First name]</code> are placeholders — fill
          them in.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {templates.map((tpl) => {
            const on = tpl.id === activeId;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => setActiveId(tpl.id)}
                className={
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition " +
                  (on
                    ? "border-indigo-700 bg-indigo-700 text-bone-50"
                    : "border-ink/15 bg-bone-50 text-ink hover:bg-ink/5")
                }
              >
                {tpl.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-3">
          <label className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Subject
              </span>
              <button
                type="button"
                onClick={() => copy("subject")}
                className="text-xs text-indigo-700 underline-offset-4 hover:underline"
              >
                {copiedField === "subject" ? "Copied!" : "Copy subject"}
              </button>
            </div>
            <input
              value={subject}
              onChange={(e) =>
                setSubjectOverride((s) => ({ ...s, [t.id]: e.target.value }))
              }
              className="input"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Body
              </span>
              <button
                type="button"
                onClick={() => copy("body")}
                className="text-xs text-indigo-700 underline-offset-4 hover:underline"
              >
                {copiedField === "body" ? "Copied!" : "Copy body"}
              </button>
            </div>
            <textarea
              value={body}
              onChange={(e) =>
                setBodyOverride((s) => ({ ...s, [t.id]: e.target.value }))
              }
              className="textarea min-h-[300px] font-mono text-xs leading-relaxed"
            />
          </label>

          <div className="mt-2 flex flex-wrap gap-3">
            <a href={mailto} className="btn-primary">
              Open in mail app →
            </a>
            <button
              type="button"
              onClick={() => copy("mailto")}
              className="btn-ghost"
            >
              {copiedField === "mailto" ? "Link copied!" : "Copy mailto link"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
