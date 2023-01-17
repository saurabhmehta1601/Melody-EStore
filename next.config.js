// using sanity images with NextJs : https://www.sanity.io/plugins/next-sanity-image
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io"],
    loader: "custom",
  },
};

module.exports = nextConfig;
