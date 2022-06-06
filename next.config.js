/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // basePath: "/nextjs-pages",
  // assetPrefix: "/nextjs-pages",
};

module.exports = {
  nextConfig,
  images: {
    loader: "akamai" ,
    path: "",
    domains: ["media.graphassets.com"],
  },
  basePath: "/RKC-Blog",
  assetPrefix: "/RKC-Blog",
};
