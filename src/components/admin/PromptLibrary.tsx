"use client";
import { useState } from "react";

// A categorized library of prompts the team can paste straight into Claude.
// Each category captures a recurring kind of request. Examples are written in
// the voice the team would use — no jargon, real values.

type Prompt = { goal: string; prompt: string };
type Category = { id: string; label: string; intro: string; prompts: Prompt[] };

const categories: Category[] = [
  {
    id: "edit-text",
    label: "Edit text",
    intro:
      "Change words on a page — a headline, a paragraph, the mission statement, a phone number, an event description.",
    prompts: [
      {
        goal: "Change a headline",
        prompt:
          "On the homepage, change the headline from \"Stand in solidarity\" to \"Neighbors for one another\" — keep the orange '4' if there is one."
      },
      {
        goal: "Update the mission statement",
        prompt:
          "Update our mission statement everywhere it appears. New text: \"We believe every person carries an unshakable dignity, and a community is judged by how it cares for the most fragile among us.\""
      },
      {
        goal: "Fix a typo",
        prompt:
          "On /values, the word 'subsidiarty' is misspelled. It should be 'subsidiarity'. Fix it."
      },
      {
        goal: "Change phone number everywhere",
        prompt:
          "Change our hotline phone everywhere on the site from 612-424-1785 to 612-555-9876."
      },
      {
        goal: "Soften a section's tone",
        prompt:
          "On /donate, the 'Where dollars went' section feels too punchy. Rewrite it in a calmer, more dignity-first voice — same numbers, gentler tone."
      }
    ]
  },
  {
    id: "add-data",
    label: "Add a resource / event / story",
    intro:
      "Adding a new entry to a list — a resource on the map, an upcoming event, a coalition partner, a story.",
    prompts: [
      {
        goal: "Add a resource on the map",
        prompt:
          "Add a resource to /get-help. Casa de Esperanza, 1075 Atlantic St, St. Paul. Category: housing. Phone: 651-772-1611. Languages: English, Spanish. Blurb: bilingual domestic-violence support, shelter, and advocacy for Latina survivors."
      },
      {
        goal: "Add an event",
        prompt:
          "Add an event for May 31, 2026, 2:00 PM. Title: \"Vigil for TPS holders.\" Location: Cathedral of St. Paul, 239 Selby Ave, St. Paul. Coalition partners: AEDS, S.Y.L. Description: a 90-minute candlelight vigil with speakers, prayer, and song. Use the same pattern as the existing events."
      },
      {
        goal: "Add a story",
        prompt:
          "Add a story to /stories. Title: \"After the call.\" Tag: Court accompaniment. Lede: \"A first-time volunteer realized why a row of neighbors matters.\" Body: 4 sentences. The volunteer expected to be uncomfortable; instead, they understood why we do this. Names changed."
      },
      {
        goal: "Add a coalition partner",
        prompt:
          "Add a coalition partner to /partners. Name: Mid-Minnesota Legal Aid. Category: legal. URL: mylegalaid.org. Blurb: Free civil legal help for low-income Minnesotans on housing, family, public benefits, disability."
      }
    ]
  },
  {
    id: "edit-data",
    label: "Edit existing data",
    intro: "Updating an entry that already exists — hours, address, phone, blurb, category.",
    prompts: [
      {
        goal: "Update a phone number",
        prompt:
          "On the resource map, the phone for People's Center Health Services is wrong — change it to 612-332-4973."
      },
      {
        goal: "Mark a resource as verified",
        prompt:
          "I just confirmed Sabathani Community Center is still accurate. Set its verifiedAt to today's date."
      },
      {
        goal: "Update languages spoken",
        prompt:
          "Add Karen and Hmong to the list of languages for Neighborhood House on the resource map."
      },
      {
        goal: "Update an event location",
        prompt:
          "The press conference event got moved. Change its location to Room B-12 of the State Office Building, same date and time."
      },
      {
        goal: "Update donation impact",
        prompt:
          "Update the donation breakdown on the homepage: Rental & utility relief 48%, Food 24%, Legal navigation 22%, Operations 6%."
      }
    ]
  },
  {
    id: "remove",
    label: "Remove things",
    intro:
      "Removing or hiding something — a stale resource, an event that already happened (it'll move to past automatically), a page from the navigation.",
    prompts: [
      {
        goal: "Remove a resource",
        prompt:
          "The Aliveness Project relocated and is no longer accepting new clients in our area. Remove it from the resource map."
      },
      {
        goal: "Hide a page from the nav",
        prompt:
          "Hide /court-support from the main nav for now — leave the page accessible by direct URL but don't link to it from the header."
      },
      {
        goal: "Remove a story",
        prompt:
          "Remove the \"Rosa kept her apartment\" story from /stories. The family asked us to take it down."
      }
    ]
  },
  {
    id: "visual",
    label: "Visual & design",
    intro:
      "Adjusting how something looks — colors, spacing, sizes, mobile behavior. You don't have to know CSS — describe what you want.",
    prompts: [
      {
        goal: "Resize the hero",
        prompt:
          "On the homepage, the hero headline feels too big on phones. Make it about 20% smaller on mobile."
      },
      {
        goal: "Add breathing room",
        prompt:
          "Reduce the empty space between sections on /events by about a third on mobile."
      },
      {
        goal: "Change a button's color",
        prompt:
          "On /donate, change the primary 'Give' button color from indigo to ember (the orange we use for accents)."
      },
      {
        goal: "Show fewer items at first",
        prompt:
          "On the homepage map preview, only show legal aid and food resources. We can change which categories are visible later."
      }
    ]
  },
  {
    id: "translate",
    label: "Translate",
    intro:
      "Add a Spanish or Somali version of a page, or improve existing translations.",
    prompts: [
      {
        goal: "Translate a full page",
        prompt:
          "Translate /find-loved-one into Spanish at /es/find-loved-one. Use DeepL-quality phrasing — natural, dignified, not literal."
      },
      {
        goal: "Polish existing translations",
        prompt:
          "Look at /es and tighten the Spanish — there are some translations that feel machine-translated. Aim for the voice of a Twin Cities Spanish-speaking community organizer."
      },
      {
        goal: "Add a new language",
        prompt:
          "Add Hmong to the language switcher with a /hmn landing page. Mirror the structure of the Spanish landing — placeholder Hmong copy is fine; we'll polish later."
      }
    ]
  },
  {
    id: "pages",
    label: "Add a new page",
    intro: "Create a brand-new page — for press, history, programs, anything.",
    prompts: [
      {
        goal: "Add a press page",
        prompt:
          "Create a /press page for journalists. Include: our logo (downloadable), a one-paragraph fact sheet, founding date, our hotline, and a press contact email (justice4usthepeople@gmail.com). Layout should match the look of /partners."
      },
      {
        goal: "Add a history page",
        prompt:
          "Create a /history page describing how we started — a few paragraphs telling the story of the founding moment. Use a quiet, narrative tone like the rest of the site."
      },
      {
        goal: "Add a programs overview",
        prompt:
          "Add a /programs page that lists all three relief programs (rental, food, legal) with their descriptions and eligibility, in one printable page."
      }
    ]
  },
  {
    id: "features",
    label: "New features",
    intro:
      "Bigger asks. Claude will tell you whether it can ship the change alone or needs a developer to set up keys/services first.",
    prompts: [
      {
        goal: "Add a search feature",
        prompt:
          "On the homepage, add a small search bar that lets visitors search the resource map by name or category."
      },
      {
        goal: "Add a feature flag",
        prompt:
          "Add a way to hide or show /court-support without removing the code — like a setting in src/lib/site.ts that I can flip later."
      },
      {
        goal: "Add a thank-you screen",
        prompt:
          "After someone submits the contact form, show a warmer thank-you screen with our hotline number and a link to /stories — instead of the current short message."
      },
      {
        goal: "Auto-archive past events",
        prompt:
          "On /events, auto-hide events older than 60 days unless I explicitly mark them as 'keep visible'."
      }
    ]
  },
  {
    id: "ask",
    label: "Just ask (no change)",
    intro:
      "Use Claude as a guide. Ask before doing — get oriented, learn how something works, find a file.",
    prompts: [
      {
        goal: "Find where to edit something",
        prompt:
          "Where would I edit the donation impact percentages on the homepage? Don't make changes — just point me at the right file."
      },
      {
        goal: "Understand how something works",
        prompt:
          "Explain how the news feed gets its stories. What sources does it pull from? How often does it refresh?"
      },
      {
        goal: "Get a preview of a change",
        prompt:
          "Walk me through what you would change to add a 'Languages spoken' filter on the resource map. Don't make the change yet."
      },
      {
        goal: "Estimate scope",
        prompt:
          "I want to add SMS alerts for ICE activity. Can you do this without setting up anything new, or does it need a service account from someone with access to keys?"
      }
    ]
  }
];

export function PromptLibrary() {
  const [activeId, setActiveId] = useState(categories[0].id);
  const [copied, setCopied] = useState<string | null>(null);
  const active = categories.find((c) => c.id === activeId) ?? categories[0];

  function copy(p: string) {
    navigator.clipboard?.writeText(p).then(() => {
      setCopied(p);
      setTimeout(() => setCopied(null), 1400);
    });
  }

  return (
    <section id="prompts" className="container-wide pb-12">
      <div className="card p-8">
        <p className="eyebrow">Prompt library</p>
        <h2 className="mt-2 font-serif text-2xl">
          Pick the kind of change. Copy a prompt. Paste into Claude.
        </h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Every prompt below is paraphraseable — change the values, swap
          words. Claude will fill in the file paths and the technical bits
          for you.
        </p>

        {/* Category chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => {
            const on = c.id === activeId;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveId(c.id)}
                className={
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition " +
                  (on
                    ? "border-indigo-700 bg-indigo-700 text-bone-50"
                    : "border-ink/15 bg-bone-50 text-ink hover:bg-ink/5")
                }
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Active category */}
        <p className="mt-5 text-sm text-ink-soft">{active.intro}</p>
        <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {active.prompts.map((p) => {
            const isCopied = copied === p.prompt;
            return (
              <li
                key={p.goal}
                className="rounded-2xl bg-bone-100 p-4 ring-1 ring-ink/5"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    {p.goal}
                  </p>
                  <button
                    type="button"
                    onClick={() => copy(p.prompt)}
                    className={
                      "shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium transition " +
                      (isCopied
                        ? "border-indigo-700 bg-indigo-700 text-bone-50"
                        : "border-ink/15 bg-bone-50 text-ink hover:bg-ink/5")
                    }
                    aria-label="Copy prompt"
                  >
                    {isCopied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink">
                  &ldquo;{p.prompt}&rdquo;
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
