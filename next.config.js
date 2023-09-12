/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverActions: true },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yts.mx",
        port: "",
        pathname: "/assets/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
