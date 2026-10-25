import type { Metadata } from "next";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://uwedding.online";

export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];

const localeLabels: Record<Locale, string> = {
  vi: "vi_VN",
  en: "en_US",
};

const defaultOgImage = "/image/og-cover.jpg";
const seoKeywords: Record<Locale, string[]> = {
  vi: [
    "thiệp cưới online",
    "thiệp cưới điện tử",
    "mẫu thiệp cưới online",
    "mẫu thiệp cưới online đẹp",
    "tạo thiệp cưới online",
    "làm thiệp cưới online",
    "thiệp cưới online miễn phí",
    "website đám cưới",
    "thiệp cưới QR",
    "thiệp cưới có nhạc và bản đồ",
    "thiệp cưới gắn tên khách mời",
    "thiệp cưới thông minh",
    "uWedding",
  ],
  en: [
    "online wedding invitations",
    "digital wedding invitations",
    "wedding invitation templates",
    "wedding website",
    "QR wedding invitation",
    "personalized wedding invitations",
    "free online wedding invitation",
    "uWedding",
  ],
};

export const defaultSeo = {
  title: "Thiệp Cưới Online Đẹp & Hiện Đại 2025 - 2026 | uWedding",
  description:
    "uWedding - Nền tảng tạo thiệp cưới online, thiệp cưới điện tử hiện đại. Hơn 50+ mẫu thiệp cưới đẹp, tích hợp nhạc nền, bản đồ, đếm ngược và mã QR chia sẻ dễ dàng.",
};

export const seoPages = {
  vi: {
    home: defaultSeo,
    products: {
      title: "Mẫu Thiệp Cưới Online Đẹp, Hiện Đại & Sang Trọng | uWedding",
      description:
        "Khám phá 50+ mẫu thiệp cưới online đẹp, sang trọng, hiển thị mượt mà trên điện thoại và máy tính. Đầy đủ tính năng: album ảnh, bản đồ, RSVP, nhạc nền.",
    },
    price: {
      title: "Bảng Giá Thiệp Cưới Online Tiết Kiệm & Chi Tiết | uWedding",
      description:
        "Bảng giá dịch vụ thiệp cưới online uWedding trọn gói chỉ từ 0đ. Tặng kèm mã QR, tên khách mời riêng, nhạc nền, bản đồ, album ảnh cưới không giới hạn.",
    },
    createInvitation: {
      title: "Hướng Dẫn Tạo & Đặt Thiệp Cưới Online Nhanh Chóng | uWedding",
      description:
        "5 bước đơn giản để tạo và gửi thiệp cưới online trên uWedding. Gửi thiệp cưới điện tử trang trọng qua Zalo, Facebook, mã QR chỉ trong vài phút.",
    },
    createNameInvitation: {
      title: "Tạo Link Thiệp Cưới Online Gắn Tên Khách Mời Tự Động | uWedding",
      description:
        "Công cụ tạo link thiệp cưới online gắn tên từng khách mời tự động, trang trọng và tinh tế. Chia sẻ dễ dàng qua Zalo, Messenger, SMS.",
    },
    privacy: {
      title: "Chính Sách Bảo Mật Thông Tin | uWedding",
      description:
        "Chính sách bảo mật của uWedding cho dịch vụ thiệp cưới online, cam kết bảo vệ an toàn thông tin khách hàng và dữ liệu thiết kế thiệp cưới.",
    },
    terms: {
      title: "Điều Khoản Sử Dụng Dịch Vụ | uWedding",
      description:
        "Điều khoản sử dụng dịch vụ thiệp cưới online uWedding, quy định quyền và trách nhiệm của khách hàng khi sử dụng nền tảng.",
    },
  },
  en: {
    home: {
      title: "Modern Online Wedding Invitations 2025 - 2026 | uWedding",
      description:
        "uWedding helps couples create modern, personalized online wedding invitations that are easy to share by link, QR code, Google Maps, and RSVP.",
    },
    products: {
      title: "Beautiful Online Wedding Invitation Templates | uWedding",
      description:
        "Explore 50+ modern, elegant online wedding invitation templates on uWedding. Mobile-friendly designs with music, photo gallery, and RSVP.",
    },
    price: {
      title: "Online Wedding Invitation Pricing & Packages | uWedding",
      description:
        "Compare uWedding online wedding invitation packages starting from 0đ. Full access to custom domains, music, countdown, and guest RSVP.",
    },
    createInvitation: {
      title: "How to Create an Online Wedding Invitation | uWedding",
      description:
        "Simple 5-step guide to order and design an online wedding invitation on uWedding, ready to share via Zalo, Facebook, or QR code.",
    },
    createNameInvitation: {
      title: "Create Personalized Guest Invitation Links | uWedding",
      description:
        "Generate personalized online wedding invitation links with guest names automatically for a warmer, more elegant wedding experience.",
    },
    privacy: {
      title: "Privacy Policy | uWedding",
      description:
        "uWedding privacy policy for online wedding invitation services, including customer information and design data protection standards.",
    },
    terms: {
      title: "Terms of Service | uWedding",
      description:
        "Terms of service for using uWedding online wedding invitation services, outlining user rights and service commitments.",
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

export function absoluteAssetUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
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
    authors: [{ name: "uWedding", url: siteUrl }],
    creator: "uWedding",
    publisher: "uWedding",
    keywords: seoKeywords[normalizedLocale],
    category: "wedding invitation service",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
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
