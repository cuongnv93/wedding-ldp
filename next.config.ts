import type { NextConfig } from "next";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withSitemap = require("next-sitemap");
module.exports = withSitemap({});

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "supersports.com.vn",
      "images.unsplash.com",
      "vs-thumbnail.s3.ap-southeast-1.amazonaws.com",
      // thêm các domain khác nếu cần
    ],
    // ...các cấu hình khác...
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
