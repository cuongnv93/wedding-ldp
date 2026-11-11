import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CreateInvitationClient from "./CreateInvitationClient";
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
  const seo = seoFor(params.locale, "createInvitation");

  return pageMetadata({
    locale: params.locale,
    path: "/create-invitation",
    title: seo.title,
    description: seo.description,
    keywords: getRouteKeywords(params.locale, "createInvitation"),
  });
}

export default async function CreateInvitationPage(props: PageProps) {
  const params = await props.params;
  const isEnglish = params.locale === "en";
  const pageUrl = absoluteUrl(params.locale, "/create-invitation");

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
        name: isEnglish ? "How to Order Invitation" : "Hướng dẫn đặt thiệp",
        item: pageUrl,
      },
    ],
  };

  // HowTo Schema
  const steps = isEnglish
    ? [
        {
          position: 1,
          name: "Choose a wedding template",
          text: "Browse our template collection and select your preferred online wedding design.",
        },
        {
          position: 2,
          name: "Contact and submit wedding info",
          text: "Send wedding date, venue details, and photos via Hotline, Zalo, WhatsApp, or Facebook.",
        },
        {
          position: 3,
          name: "Review live interactive demo",
          text: "Preview your invitation website on mobile and desktop, request adjustments if needed.",
        },
        {
          position: 4,
          name: "Confirm and receive final link",
          text: "Confirm your order, receive your private wedding link and high-resolution QR code.",
        },
        {
          position: 5,
          name: "Personalize and share with guests",
          text: "Use the guest name generator tool to create customized links and share with family and friends.",
        },
      ]
    : [
        {
          position: 1,
          name: "Chọn mẫu thiệp cưới",
          text: "Truy cập danh mục sản phẩm và lựa chọn mẫu thiệp cưới trực tuyến ưng ý.",
        },
        {
          position: 2,
          name: "Liên hệ tư vấn và gửi thông tin",
          text: "Gửi thông tin ngày cưới, địa điểm, ảnh cưới qua Hotline, Zalo hoặc Fanpage.",
        },
        {
          position: 3,
          name: "Duyệt bản demo thiệp cưới",
          text: "Xem trước giao diện thiệp cưới trên điện thoại và máy tính, yêu cầu chỉnh sửa nếu cần.",
        },
        {
          position: 4,
          name: "Thanh toán và nhận link chính thức",
          text: "Xác nhận mẫu hoàn chỉnh, thanh toán chi phí và nhận link website cùng mã QR chất lượng cao.",
        },
        {
          position: 5,
          name: "Tạo tên khách mời và gửi thiệp",
          text: "Sử dụng tính năng tạo link gắn tên riêng từng khách mời để gửi thiệp cưới trang trọng qua mạng xã hội.",
        },
      ];

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: isEnglish
      ? "How to Create and Order an Online Wedding Invitation"
      : "Hướng dẫn tạo và đặt thiệp cưới online trên uWedding",
    description: isEnglish
      ? "Simple 5-step process to select, customize, preview, and share your modern digital wedding invitation."
      : "Quy trình 5 bước đơn giản để chọn mẫu, cung cấp thông tin và nhận link thiệp cưới điện tử hoàn chỉnh.",
    step: steps.map((s) => ({
      "@type": "HowToStep",
      position: s.position,
      name: s.name,
      text: s.text,
    })),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <Navbar />
      <main className="flex-grow">
        <CreateInvitationClient locale={params.locale} />
      </main>
      <Footer />
    </div>
  );
}
