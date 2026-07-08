import type { Metadata } from "next";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.uwedding.online";

export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];

const localeLabels: Record<Locale, string> = {
  vi: "vi_VN",
  en: "en_US",
};

const defaultOgImage = "/image-preview/wedding1.cuongvalan.click.webp";

export const defaultSeo = {
  title: "Thiep cuoi online hien dai - uWedding",
  description:
    "uWedding giup ban tao thiep cuoi online hien dai, ca nhan hoa, de chia se qua link va QR voi nhieu mau dep cho ngay trong dai.",
};

export function localizedPath(locale: string, path = "") {
  const normalizedPath =
    path === "" || path === "/" ? "" : `/${path.replace(/^\/+/, "")}`;

  return `/${locale}${normalizedPath}`;
}

export function absoluteUrl(locale: string, path = "") {
  return `${siteUrl}${localizedPath(locale, path)}`;
}

export function pageMetadata({
  locale,
  path = "",
  title,
  description,
  image = defaultOgImage,
}: {
  locale: string;
  path?: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const normalizedLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "vi";
  const canonical = absoluteUrl(normalizedLocale, path);
  const languageAlternates = Object.fromEntries(
    locales.map((item) => [item, absoluteUrl(item, path)])
  );

  return {
    metadataBase: new URL(siteUrl),
    applicationName: "uWedding",
    icons: {
      icon: "/favicon.png",
      apple: "/favicon.png",
    },
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ...languageAlternates,
        "x-default": absoluteUrl("vi", path),
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "uWedding",
      type: "website",
      locale: localeLabels[normalizedLocale],
      alternateLocale: locales
        .filter((item) => item !== normalizedLocale)
        .map((item) => localeLabels[item]),
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
