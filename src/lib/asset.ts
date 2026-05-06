// Asset URL helper — prefixes basePath so static assets resolve correctly on
// GitHub Pages project deployments (e.g. /justice4usthepeople/...).
//
// Usage:
//   <img src={asset("/brand/logo.svg")} ... />
//
// next/image auto-prefixes basePath in many setups, but with `output: "export"`
// + GH Pages it's not always reliable. This helper is deterministic.
export function asset(path: string): string {
  const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
