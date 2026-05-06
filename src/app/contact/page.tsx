"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { EmbeddedForm, FormConnectionNote } from "@/components/Form";
import { contactForm } from "@/lib/program-forms";
import { site } from "@/lib/site";

export default function ContactPage() {
  return (
    <Suspense>
      <ContactPageInner />
    </Suspense>
  );
}

function ContactPageInner() {
  const params = useSearchParams();
  const topic = params.get("topic");
  const subject =
    topic === "resource"
      ? "[Resource suggestion]"
      : topic === "press"
      ? "[Press inquiry]"
      : "[Contact form]";
  return (
    <>
      <section className="container-page py-16 md:py-20">
        <p className="eyebrow">Reach us</p>
        <h1 className="mt-2">We answer every message.</h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-soft">
          The fastest way to reach us is by phone — but if email or this form
          works better, we get those too. Real people read every note.
        </p>
      </section>

      <section className="container-wide pb-24">
        <div className="grid gap-10 md:grid-cols-12">
          <aside className="md:col-span-5">
            <div className="card p-6 md:p-8">
              <h3 className="text-2xl">Direct lines</h3>
              <ul className="mt-4 space-y-3 text-base">
                <li>
                  <span className="block text-xs uppercase tracking-wider text-ink-muted">Phone</span>
                  <a className="btn-link text-lg" href={site.contact.phoneHref}>
                    {site.contact.phone}
                  </a>
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-wider text-ink-muted">Email</span>
                  <a className="btn-link" href={`mailto:${site.contact.email}`}>
                    {site.contact.email}
                  </a>
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-wider text-ink-muted">Where</span>
                  {site.contact.address}
                </li>
              </ul>
              <hr className="my-6 border-ink/10" />
              <p className="text-sm text-ink-muted">
                Press, partnerships, or want us to speak somewhere? Add the
                topic to your message — we'll route it.
              </p>
            </div>
          </aside>
          <div className="md:col-span-7">
            <FormConnectionNote />
            <EmbeddedForm
              formId="contact"
              subject={`${subject} new message`}
              fields={contactForm}
              submitLabel="Send message"
              successMessage="Message received. We'll be in touch."
            />
          </div>
        </div>
      </section>
    </>
  );
}
