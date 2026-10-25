import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "uWedding - Nền tảng thiệp cưới online hiện đại",
    short_name: "uWedding",
    description: "Tạo và chia sẻ thiệp cưới online, thiệp cưới điện tử sang trọng với bản đồ, RSVP và mã QR",
    start_url: "/vi",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#e11d48",
    icons: [
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
