// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./layout.css";
import ClientLayout from "../../components/ClientLayout";
import { NextIntlClientProvider } from "next-intl";
import Script from "next/script";

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
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { children } = props;
  const { locale } = await props.params;

  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="thiệp cưới online hiện đại,thiệp cưới thiết kế riêng,thiệp cưới cá nhân hóa đẹp,thiệp cưới online dễ sử dụng,mẫu thiệp cưới online đẹp,thiệp cưới kỹ thuật số tiện lợi,gửi thiệp cưới online qua link,tạo thiệp cưới online nhanh,thiệp cưới online có đếm ngược"
        />
        <meta
          property="og:title"
          content="Thiệp cưới online hiện đại – uWedding | Thiết kế đẹp, dễ chia sẻ"
        />
        <meta
          property="og:description"
          content="uWedding – Thiệp cưới online hiện đại, thiết kế cá nhân hóa dễ dàng. Giao diện đẹp, đầy đủ tính năng, chia sẻ tiện lợi qua link & QR."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:url" content="https://uwedding.online" />
        <meta property="og:site_name" content="uWedding" />
        <meta
          property="og:image"
          content="https://trinhtham.com/wp-content/uploads/2025/07/icon.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Thiệp cưới online hiện đại – uWedding | Thiết kế đẹp, dễ chia sẻ"
        />
        <meta
          name="twitter:description"
          content="uWedding – Thiệp cưới online hiện đại, thiết kế cá nhân hóa dễ dàng. Giao diện đẹp, đầy đủ tính năng, chia sẻ tiện lợi qua link & QR."
        />

        <meta property="og:site_name" content="uWeeding" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />

        {/* Zalo */}
        <meta
          property="zalo:image"
          content="https://trinhtham.com/wp-content/uploads/2025/07/icon.png"
        />
        <meta
          property="zalo:title"
          content="Thiệp cưới online hiện đại – uWedding | Thiết kế đẹp, dễ chia sẻ"
        />
        <meta
          property="zalo:description"
          content="uWedding – Thiệp cưới online hiện đại, thiết kế cá nhân hóa dễ dàng. Giao diện đẹp, đầy đủ tính năng, chia sẻ tiện lợi qua link & QR."
        />

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
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
