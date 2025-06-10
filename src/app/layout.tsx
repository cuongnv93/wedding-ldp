import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./layout.css";
import { CartProvider } from "../contexts/cart-context";
import { Toaster } from "sonner";
import GlobalHeartEffect from "@/components/GlobalHeartEffect";
import Script from "next/script";
import Analytics from "@/components/Analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "uWedding - Thiệp cưới online hiện đại",
  description:
    "uWedding - Thiệp cưới online hiện đại, sang trọng, thiết kế cá nhân hóa, đặt thiệp cưới trực tuyến dễ dàng, giao hàng toàn quốc.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="thiệp cưới, thiệp cưới online, thiệp cưới hiện đại, thiệp cưới cá nhân hóa, đặt thiệp cưới, uWedding"
        />
        <meta
          property="og:title"
          content="uWedding - Thiệp cưới online hiện đại"
        />
        <meta
          property="og:description"
          content="uWedding - Thiệp cưới online hiện đại, sang trọng, thiết kế cá nhân hóa, đặt thiệp cưới trực tuyến dễ dàng, giao hàng toàn quốc."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:url" content="https://uwedding.vn" />
        <meta property="og:site_name" content="uWedding" />
        <meta property="og:image" content="/favicon.ico" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="uWedding - Thiệp cưới online hiện đại"
        />
        <meta
          name="twitter:description"
          content="uWedding - Thiệp cưới online hiện đại, sang trọng, thiết kế cá nhân hóa, đặt thiệp cưới trực tuyến dễ dàng, giao hàng toàn quốc."
        />
        <meta name="twitter:image" content="/favicon.ico" />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-G-0X4F90SB0Q`}
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-0X4F90SB0Q', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Analytics />
        <GlobalHeartEffect />
        <SpeedInsights />
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
