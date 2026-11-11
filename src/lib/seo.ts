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

export const seoKeywords: Record<Locale, string[]> = {
  vi: [
    // Từ khóa hạt nhân (Core Keywords)
    "thiệp cưới online",
    "thiệp cưới điện tử",
    "mẫu thiệp cưới online",
    "mẫu thiệp cưới điện tử",
    "tạo thiệp cưới online",
    "làm thiệp cưới online",
    "thiệp cưới trực tuyến",
    "website đám cưới",
    "website thiệp cưới",
    "thiệp báo hỷ online",
    // Từ khóa tính năng (Features & Tech)
    "thiệp cưới mã QR",
    "thiệp cưới QR code",
    "thiệp cưới có nhạc nền",
    "thiệp cưới có bản đồ chỉ đường",
    "thiệp cưới xác nhận tham dự",
    "thiệp cưới rsvp",
    "thiệp cưới đếm ngược ngày cưới",
    "thiệp cưới gắn tên khách mời",
    "tạo thiệp cưới gắn tên riêng",
    "thiệp cưới thông minh",
    "thiệp cưới công nghệ",
    // Kênh phân phối & hành vi (Channels & User Behavior)
    "gửi thiệp cưới qua zalo",
    "cách gửi thiệp cưới qua zalo",
    "gửi thiệp cưới online",
    // Từ khóa xu hướng & phong cách (Trends & Styles)
    "mẫu thiệp cưới online đẹp 2025",
    "mẫu thiệp cưới online đẹp 2026",
    "thiệp cưới online hiện đại",
    "thiệp cưới online sang trọng",
    "thiệp cưới chữ ký số",
    "thiệp cưới online chibi",
    "thiệp cưới online giá rẻ",
    "thiệp cưới online miễn phí",
    "giá thiệp cưới online",
    // Thương hiệu (Brand)
    "uWedding",
    "uwedding online",
    "uwedding thiệp cưới",
  ],
  en: [
    // Core Keywords
    "online wedding invitations",
    "digital wedding invitations",
    "electronic wedding invitations",
    "virtual wedding invitations",
    "paperless wedding invitations",
    "wedding website builder",
    "free wedding website",
    "wedding invitation templates",
    "save the date online",
    // Features & Tech
    "wedding invitations with RSVP",
    "wedding rsvp",
    "wedding guest rsvp tracker",
    "QR code wedding invitation",
    "digital gift box qr code",
    "wedding invitation with background music",
    "wedding invitation with google maps",
    "personalized wedding invitation link",
    "whatsapp wedding invitation",
    // Trends & Styles
    "modern wedding invitation website",
    "elegant online wedding invitation",
    "interactive wedding card",
    "mobile friendly wedding invitation",
    "best online wedding invitation 2025",
    // Brand
    "uWedding",
    "uWedding online",
    "uWedding digital invitations",
  ],
};

export const defaultSeo = {
  title: "Thiệp Cưới Online Đẹp & Hiện Đại 2025 - 2026 | uWedding",
  description:
    "Nền tảng tạo thiệp cưới online, thiệp cưới điện tử hiện đại số 1. Hơn 50+ mẫu thiệp cưới đẹp, tích hợp nhạc nền, bản đồ, album ảnh và mã QR chia sẻ dễ dàng.",
};

export const seoPages = {
  vi: {
    home: defaultSeo,
    products: {
      title: "50+ Mẫu Thiệp Cưới Online Đẹp, Sang Trọng 2025 | uWedding",
      description:
        "Khám phá hơn 50+ mẫu thiệp cưới online, thiệp cưới điện tử đẹp mắt, hiển thị hoàn hảo trên điện thoại. Tích hợp bản đồ chỉ đường, nhạc nền, album ảnh và RSVP.",
    },
    price: {
      title: "Bảng Giá Thiệp Cưới Online Tiết Kiệm & Chi Tiết | uWedding",
      description:
        "Bảng giá dịch vụ thiệp cưới online uWedding trọn gói chỉ từ 0đ. Tặng kèm mã QR, tên khách mời riêng, nhạc nền, bản đồ, album ảnh cưới không giới hạn.",
    },
    createInvitation: {
      title: "Hướng Dẫn Đặt Làm Thiệp Cưới Online 5 Bước | uWedding",
      description:
        "Quy trình 5 bước đặt làm thiệp cưới online nhanh chóng, trọn gói tại uWedding. Nhận ngay link website thiệp cưới riêng và mã QR code sẵn sàng gửi bạn bè.",
    },
    createNameInvitation: {
      title: "Tạo Link Thiệp Cưới Gắn Tên Khách Mời Miễn Phí | uWedding",
      description:
        "Công cụ tạo link thiệp cưới online gắn tên riêng từng khách mời tự động, trang trọng và tinh tế. Chia sẻ một chạm qua Zalo, Messenger, SMS hoàn toàn miễn phí.",
    },
    privacy: {
      title: "Chính Sách Bảo Mật Thông Tin Khách Hàng | uWedding",
      description:
        "Chính sách bảo mật thông tin khách hàng tại uWedding. Cam kết bảo vệ tuyệt đối dữ liệu thiết kế thiệp cưới, ảnh cưới và thông tin liên hệ của các cặp đôi.",
    },
    terms: {
      title: "Điều Khoản Sử Dụng Dịch Vụ Thiệp Cưới Online | uWedding",
      description:
        "Điều khoản sử dụng dịch vụ thiệp cưới online uWedding, quy định quyền lợi và trách nhiệm của khách hàng khi tạo thiệp cưới điện tử trên nền tảng của chúng tôi.",
    },
  },
  en: {
    home: {
      title: "Modern Online Wedding Invitations 2025 - 2026 | uWedding",
      description:
        "uWedding helps modern couples create personalized digital wedding invitations. Features interactive Google Maps, instant RSVP, music, and QR code gift boxes.",
    },
    products: {
      title: "50+ Beautiful Online Wedding Invitation Templates | uWedding",
      description:
        "Explore 50+ modern, elegant online wedding invitation templates on uWedding. Mobile-friendly designs with music, photo gallery, Google Maps, and RSVP.",
    },
    price: {
      title: "Online Wedding Invitation Pricing & Packages | uWedding",
      description:
        "Compare uWedding online wedding invitation packages starting from 0đ. Full access to custom domains, music, countdown, and guest RSVP.",
    },
    createInvitation: {
      title: "Create an Online Wedding Invitation in 5 Steps | uWedding",
      description:
        "Step-by-step guide to order and customize your digital wedding invitation on uWedding. Receive your custom link and printable QR code ready to share instantly.",
    },
    createNameInvitation: {
      title: "Create Personalized Guest Wedding Links for Free | uWedding",
      description:
        "Free utility to generate personalized online wedding invitation links with custom guest names. Warm, elegant, and ready to share via Zalo, WhatsApp, and SMS.",
    },
    privacy: {
      title: "Online Wedding Invitation Privacy Policy | uWedding",
      description:
        "uWedding privacy policy for online wedding invitation services. We are strictly committed to safeguarding personal information, wedding photos, and design data.",
    },
    terms: {
      title: "Digital Wedding Invitation Terms of Service | uWedding",
      description:
        "Terms of service for using uWedding online wedding invitation platform, outlining user rights, privacy guarantees, and service commitments for digital weddings.",
    },
  },
} satisfies Record<Locale, Record<string, { title: string; description: string }>>;

export const routeKeywords: Record<
  Locale,
  Record<string, string[]>
> = {
  vi: {
    home: [
      "thiệp cưới online",
      "thiệp cưới điện tử",
      "mẫu thiệp cưới online đẹp 2025",
      "tạo thiệp cưới online",
      "làm thiệp cưới online",
      "website đám cưới",
      "thiệp cưới mã QR",
      "thiệp cưới có nhạc nền",
      "thiệp cưới gắn tên khách mời",
      "gửi thiệp cưới qua zalo",
    ],
    products: [
      "mẫu thiệp cưới online",
      "mẫu thiệp cưới điện tử",
      "mẫu thiệp cưới đẹp 2025 2026",
      "mẫu website đám cưới",
      "mẫu thiệp cưới chữ ký số",
      "mẫu thiệp cưới điện thoại mobile",
      "mẫu thiệp cưới chibi lãng mạn",
      "thiết kế thiệp cưới online",
      "thiệp cưới online sang trọng",
    ],
    createInvitation: [
      "hướng dẫn làm thiệp cưới online",
      "cách tạo thiệp cưới online",
      "đặt thiệp cưới online",
      "quy trình tạo thiệp cưới điện tử",
      "tạo thiệp cưới điện tử nhanh",
      "làm thiệp cưới có nhạc và bản đồ",
      "đặt thiệp cưới trực tuyến",
    ],
    createNameInvitation: [
      "tạo link thiệp cưới gắn tên khách mời",
      "gắn tên khách mời thiệp cưới",
      "cá nhân hóa thiệp cưới",
      "thiệp cưới gửi bạn bè",
      "công cụ gửi thiệp cưới online",
      "gửi thiệp cưới qua zalo tự động",
    ],
    blog: [
      "cẩm nang thiệp cưới online",
      "kinh nghiệm cưới hỏi",
      "mẫu thiệp cưới online đẹp",
      "lời mời cưới hay nhất",
      "cách gửi thiệp cưới qua zalo",
      "rsvp thiệp cưới là gì",
      "so sánh giá thiệp cưới",
    ],
  },
  en: {
    home: [
      "online wedding invitations",
      "digital wedding invitations",
      "modern wedding website builder",
      "create wedding invitation online",
      "paperless wedding invitations",
      "wedding rsvp online",
      "qr code wedding invitation",
      "wedding invitation with music",
      "personalized guest invitation links",
      "virtual wedding cards",
    ],
    products: [
      "wedding invitation templates",
      "digital wedding templates",
      "online wedding invitations 2025",
      "mobile wedding website designs",
      "modern electronic wedding cards",
      "elegant wedding invitation styles",
      "interactive wedding templates",
    ],
    createInvitation: [
      "how to create online wedding invitation",
      "order digital wedding invitation",
      "online wedding invitation guide",
      "custom wedding invitation website",
      "make wedding invitation online",
    ],
    createNameInvitation: [
      "personalized guest wedding links",
      "custom guest invitation link generator",
      "whatsapp wedding invitation generator",
      "send wedding invitation with guest name",
      "wedding guest personalization tool",
    ],
    blog: [
      "online wedding invitation guide",
      "digital wedding tips",
      "wedding wording etiquette",
      "wedding rsvp guide",
      "virtual wedding trends 2025",
    ],
  },
};

export function seoFor(locale: string, page: keyof (typeof seoPages)["vi"]) {
  const normalizedLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "vi";

  return seoPages[normalizedLocale][page];
}

export function getRouteKeywords(locale: string, route: keyof (typeof routeKeywords)["vi"]) {
  const normalizedLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "vi";

  return routeKeywords[normalizedLocale][route] || [];
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
  keywords,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
}: {
  locale: string;
  path?: string;
  title: string;
  description: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}): Metadata {
  const normalizedLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "vi";
  const canonical = absoluteUrl(normalizedLocale, path);
  const languageAlternates = Object.fromEntries(
    locales.map((item) => [item, absoluteUrl(item, path)])
  );

  const combinedKeywords = keywords
    ? [...new Set([...keywords, ...seoKeywords[normalizedLocale]])]
    : seoKeywords[normalizedLocale];

  const ogImages = [
    {
      url: absoluteAssetUrl(image),
      width: 1200,
      height: 630,
      alt: title,
    },
  ];

  const openGraphData: Metadata["openGraph"] =
    type === "article"
      ? {
          title,
          description,
          url: canonical,
          siteName: "uWedding",
          type: "article",
          publishedTime,
          modifiedTime,
          authors,
          section,
          tags,
          locale: localeLabels[normalizedLocale],
          alternateLocale: locales
            .filter((item) => item !== normalizedLocale)
            .map((item) => localeLabels[item]),
          images: ogImages,
        }
      : {
          title,
          description,
          url: canonical,
          siteName: "uWedding",
          type: "website",
          locale: localeLabels[normalizedLocale],
          alternateLocale: locales
            .filter((item) => item !== normalizedLocale)
            .map((item) => localeLabels[item]),
          images: ogImages,
        };

  return {
    metadataBase: new URL(siteUrl),
    applicationName: "uWedding",
    authors: [{ name: "uWedding", url: siteUrl }],
    creator: "uWedding",
    publisher: "uWedding",
    keywords: combinedKeywords,
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
    openGraph: openGraphData,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteAssetUrl(image)],
      creator: "@uwedding",
      site: "@uwedding",
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
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
