// app/[locale]/layout.tsx
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const metadata: any = {
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

  const ogImage =
    metadata.openGraph?.images?.[0]?.url ??
    "https://raw.githubusercontent.com/uwedding/my-images/main/anh-bia.jpg";
  const ogWidth = metadata.openGraph?.images?.[0]?.width ?? 1200;
  const ogHeight = metadata.openGraph?.images?.[0]?.height ?? 630;
  const siteUrl = metadata.openGraph?.url ?? "https://uwedding.online";

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

        {/* favicons */}
        <link rel="icon" type="image/x-icon" href={ogImage} />
        <link rel="shortcut icon" href={ogImage} />
        <link rel="apple-touch-icon" href={ogImage} />
        <link rel="apple-touch-icon-precomposed" href={ogImage} />
        <meta name="msapplication-TileImage" content={ogImage} />

        {/* Description / OpenGraph / Twitter */}
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={(metadata.keywords as string) ?? ""} />
        <meta
          name="robots"
          content={(metadata.robots as string) ?? "index, follow"}
        />

        <meta
          property="og:title"
          content={metadata.openGraph?.title ?? (metadata.title as string)}
        />
        <meta
          property="og:description"
          content={metadata.openGraph?.description ?? metadata.description}
        />
        <meta
          property="og:type"
          content={metadata.openGraph?.type ?? "website"}
        />
        <meta
          property="og:locale"
          content={metadata.openGraph?.locale ?? "vi_VN"}
        />
        <meta property="og:url" content={siteUrl} />
        <meta
          property="og:site_name"
          content={metadata.openGraph?.siteName ?? "uWedding"}
        />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content={String(ogWidth)} />
        <meta property="og:image:height" content={String(ogHeight)} />

        <meta
          name="twitter:card"
          content={metadata.twitter?.card ?? "summary_large_image"}
        />
        <meta
          name="twitter:title"
          content={metadata.twitter?.title ?? (metadata.title as string)}
        />
        <meta
          name="twitter:description"
          content={metadata.twitter?.description ?? metadata.description}
        />
        <meta
          name="twitter:image"
          content={metadata.twitter?.images?.[0] ?? ogImage}
        />

        <link rel="image_src" href={ogImage} />
        <link rel="canonical" href={siteUrl} />
      </head>
      {/* <Script
        src={`https://www.27biggroup.com/librarywedding/functionWedding/library27biggroup.js`}
        strategy="afterInteractive"
      /> */}
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
        <NextIntlClientProvider locale={locale}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
