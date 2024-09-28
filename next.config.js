/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;

//he "images.domains" configuration is deprecated. Please use "images.remotePatterns" configuration instead.
