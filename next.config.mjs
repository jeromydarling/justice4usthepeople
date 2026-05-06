/** @type {import('next').NextConfig} */
// Static export so the site can be served from GitHub Pages.
// If you deploy to a project page (e.g. github.com/user/repo), set
// NEXT_PUBLIC_BASE_PATH=/repo at build time. For an apex / custom-domain
// deploy (recommended via the included CNAME), leave it empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  experimental: { typedRoutes: false }
};

export default nextConfig;
