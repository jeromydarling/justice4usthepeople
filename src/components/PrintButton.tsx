"use client";

// Tiny client component so /know-your-rights can stay a server component.
// The page has `print:` Tailwind utilities tuned to produce a clean print
// layout — the user can also "Save as PDF" from the print dialog.
export function PrintButton({
  className = "btn-ghost",
  label = "Print or save as PDF"
}: {
  className?: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        if (typeof window !== "undefined") window.print();
      }}
    >
      {label}
    </button>
  );
}
