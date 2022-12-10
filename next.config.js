/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "akamai",
    path: "",
  },
  basePath: "/threejspractice",
  assetPrefix: "/threejspractice",
};

module.exports = nextConfig;
