// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./layout.css";
import ClientLayout from "../../components/ClientLayout";
import { NextIntlClientProvider } from "next-intl";
import Script from "next/script";
import AntiDebug from "../../components/AntiDebug";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: "Thiệp cưới online hiện đại – uWedding | Thiết kế đẹp, dễ chia sẻ",
  description:
    "uWedding – Thiệp cưới online hiện đại, thiết kế cá nhân hóa dễ dàng. Giao diện đẹp, đầy đủ tính năng, chia sẻ tiện lợi qua link & QR.",
  keywords:
    "thiệp cưới online hiện đại, thiệp cưới thiết kế riêng, thiệp cưới cá nhân hóa đẹp, thiệp cưới online dễ sử dụng, mẫu thiệp cưới online đẹp, thiệp cưới kỹ thuật số tiện lợi, gửi thiệp cưới online qua link, tạo thiệp cưới online nhanh, thiệp cưới online có đếm ngược",
  robots: "index, follow",
  openGraph: {
    title: "Thiệp cưới online hiện đại – uWedding | Thiết kế đẹp, dễ chia sẻ",
    description:
      "uWedding – Thiệp cưới online hiện đại, thiết kế cá nhân hóa dễ dàng. Giao diện đẹp, đầy đủ tính năng, chia sẻ tiện lợi qua link & QR.",
    type: "website",
    locale: "vi_VN",
    url: "https://uwedding.online",
    siteName: "uWedding",
    images: [
      {
        url: "https://raw.githubusercontent.com/uwedding/my-images/main/anh-bia.jpg",
        width: 500,
        height: 500,
        alt: "uWedding - Thiệp cưới online hiện đại",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thiệp cưới online hiện đại – uWedding | Thiết kế đẹp, dễ chia sẻ",
    description:
      "uWedding – Thiệp cưới online hiện đại, thiết kế cá nhân hóa dễ dàng. Giao diện đẹp, đầy đủ tính năng, chia sẻ tiện lợi qua link & QR.",
    images: [
      "https://raw.githubusercontent.com/uwedding/my-images/main/anh-bia.jpg",
    ],
  },
  icons: {
    icon: "https://raw.githubusercontent.com/uwedding/my-images/main/anh-bia.jpg",
    shortcut:
      "https://raw.githubusercontent.com/uwedding/my-images/main/anh-bia.jpg",
  },
  other: {
    "zalo:title":
      "Thiệp cưới online hiện đại – uWedding | Thiết kế đẹp, dễ chia sẻ",
    "zalo:description":
      "uWedding – Thiệp cưới online hiện đại, thiết kế cá nhân hóa dễ dàng. Giao diện đẹp, đầy đủ tính năng, chia sẻ tiện lợi qua link & QR.",
  },
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { children } = props;
  const { locale } = await props.params;
  const isProd = process.env.NODE_ENV === "production";

  return (
    <html lang={locale}>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Prevent font loading layout shift */
              body { font-family: system-ui, arial, sans-serif; }
              
              /* Reserve space for images */
              .aspect-square { aspect-ratio: 1 / 1; }
              
              /* Prevent animation layout shift */
              * { transform-origin: center; }
              
              /* Smooth transitions */
              img { transition: opacity 0.2s ease; }
            `,
          }}
        />
      </head>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXX');
        `}
      </Script>
      <body className={inter.className}>
        {isProd && <AntiDebug />}
        {/* {isProd && <AntiDebug />} */}
        <NextIntlClientProvider locale={locale}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
