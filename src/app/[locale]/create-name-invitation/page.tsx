import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CreateNameInvitationClient from "./CreateNameInvitationClient";
import {
  absoluteUrl,
  pageMetadata,
  locales,
  seoFor,
  getRouteKeywords,
} from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const seo = seoFor(params.locale, "createNameInvitation");

  return pageMetadata({
    locale: params.locale,
    path: "/create-name-invitation",
    title: seo.title,
    description: seo.description,
    keywords: getRouteKeywords(params.locale, "createNameInvitation"),
  });
}

export default async function CreateNameInvitationPage(props: PageProps) {
  const params = await props.params;
  const isEnglish = params.locale === "en";
  const pageUrl = absoluteUrl(params.locale, "/create-name-invitation");

  // Breadcrumbs Schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isEnglish ? "Home" : "Trang chủ",
        item: absoluteUrl(params.locale, ""),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isEnglish
          ? "Personalized Guest Invitation Links"
          : "Gắn tên khách mời thiệp cưới",
        item: pageUrl,
      },
    ],
  };

  const featureList = isEnglish
    ? [
        "Automatically append customized guest names to wedding links",
        "Support single guest generation or bulk list export",
        "Pre-configured polite titles and prefixes (Family, Dear Friend, Colleague)",
        "100% compatible with WhatsApp, Zalo, Messenger, iMessage, and SMS",
      ]
    : [
        "Tự động gắn tên khách mời vào đường link thiệp cưới",
        "Hỗ trợ tạo từng khách hoặc xuất danh sách hàng loạt",
        "Gợi ý danh xưng trang trọng (Gia đình, Bạn thân, Đồng nghiệp...)",
        "Tương thích 100% với Zalo, Messenger, iMessage, SMS",
      ];

  // WebApplication Schema for Rich Snippets
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: isEnglish
      ? "uWedding Personalized Guest Link Generator"
      : "Công cụ tạo link thiệp cưới gắn tên khách mời uWedding",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    url: pageUrl,
    description: isEnglish
      ? "Free web utility to generate personalized wedding invitation links with custom guest names automatically."
      : "Công cụ trực tuyến miễn phí giúp tạo đường dẫn thiệp cưới online gắn tên riêng cho từng vị khách mời, tiện lợi gửi qua Zalo, Messenger, SMS.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "VND",
    },
    featureList,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <Navbar />
      <main className="flex-grow">
        <CreateNameInvitationClient locale={params.locale} />
      </main>
      <Footer />
    </div>
  );
}
