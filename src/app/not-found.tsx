import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3">This page took a wrong turn.</h1>
      <p className="mt-4 text-ink-soft">
        But the work goes on. Try the home page, the resource map, or just
        give us a call.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">Home</Link>
        <Link href="/get-help" className="btn-ghost">Get help</Link>
        <a href="tel:+16124241785" className="btn-ghost">Call 612-424-1785</a>
      </div>
    </section>
  );
}
