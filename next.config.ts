import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "supersports.com.vn",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "vs-thumbnail.s3.ap-southeast-1.amazonaws.com",
      },
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
  // async redirects() {
  //   return [
  //     {
  //       source: "/:path*",
  //       has: [
  //         {
  //           type: "host",
  //           value: "www.uwedding.online", // Thay bằng domain thật của bạn
  //         },
  //       ],
  //       destination: "https://uwedding.online/:path*", // Thay bằng domain không www
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
