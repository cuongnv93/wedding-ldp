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

const defaultOgImage = "/image/og-cover.jpg";

export const defaultSeo = {
  title: "Thiệp cưới online hiện đại - uWedding",
  description:
    "uWedding giúp bạn tạo thiệp cưới online hiện đại, cá nhân hóa và dễ chia sẻ qua link, QR với nhiều mẫu đẹp cho ngày trọng đại.",
};

export const seoPages = {
  vi: {
    home: defaultSeo,
    products: {
      title: "Mẫu thiệp cưới online đẹp - uWedding",
      description:
        "Khám phá bộ sưu tập mẫu thiệp cưới online đẹp, hiện đại và sang trọng trên uWedding. Chọn mẫu thiệp phù hợp với phong cách ngày cưới của bạn.",
    },
    price: {
      title: "Bảng giá thiệp cưới online - uWedding",
      description:
        "So sánh các gói thiệp cưới online uWedding để chọn dịch vụ thiết kế thiệp cưới phù hợp với nhu cầu và ngân sách của bạn.",
    },
    createInvitation: {
      title: "Tạo thiệp cưới online - uWedding",
      description:
        "Hướng dẫn đặt và tạo thiệp cưới online trên uWedding để gửi thiệp cưới nhanh qua link, QR, Zalo hoặc Facebook.",
    },
    createNameInvitation: {
      title: "Tạo link thiệp cưới gắn tên khách mời - uWedding",
      description:
        "Tạo link thiệp cưới online gắn tên khách mời nhanh chóng, giúp lời mời trang trọng và cá nhân hóa hơn khi chia sẻ.",
    },
    privacy: {
      title: "Chính sách bảo mật - uWedding",
      description:
        "Chính sách bảo mật của uWedding cho dịch vụ thiệp cưới online, cách chúng tôi bảo vệ thông tin khách hàng và dữ liệu thiết kế.",
    },
    terms: {
      title: "Điều khoản sử dụng - uWedding",
      description:
        "Điều khoản sử dụng dịch vụ thiệp cưới online uWedding, quy định quyền và trách nhiệm khi sử dụng website.",
    },
  },
  en: {
    home: {
      title: "Modern online wedding invitations - uWedding",
      description:
        "uWedding helps couples create modern, personalized online wedding invitations that are easy to share by link or QR code.",
    },
    products: {
      title: "Beautiful online wedding invitation templates - uWedding",
      description:
        "Explore modern, elegant online wedding invitation templates on uWedding and choose a design that fits your wedding style.",
    },
    price: {
      title: "Online wedding invitation pricing - uWedding",
      description:
        "Compare uWedding online wedding invitation packages and choose the design service that fits your needs and budget.",
    },
    createInvitation: {
      title: "Create an online wedding invitation - uWedding",
      description:
        "Learn how to order and create an online wedding invitation on uWedding, ready to share by link, QR code, Zalo or Facebook.",
    },
    createNameInvitation: {
      title: "Create personalized guest invitation links - uWedding",
      description:
        "Create personalized online wedding invitation links with guest names for a warmer and more elegant invitation experience.",
    },
    privacy: {
      title: "Privacy policy - uWedding",
      description:
        "uWedding privacy policy for online wedding invitation services, including how customer information and design data are protected.",
    },
    terms: {
      title: "Terms of service - uWedding",
      description:
        "Terms of service for using uWedding online wedding invitation services, including user rights and responsibilities.",
    },
  },
} satisfies Record<Locale, Record<string, { title: string; description: string }>>;

export function seoFor(locale: string, page: keyof (typeof seoPages)["vi"]) {
  const normalizedLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "vi";

  return seoPages[normalizedLocale][page];
}

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
