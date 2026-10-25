import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CreateInvitationClient from "./CreateInvitationClient";
import { absoluteUrl, pageMetadata, locales, seoFor } from "@/lib/seo";

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
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: isEnglish
      ? "How to Create and Order an Online Wedding Invitation"
      : "Hướng dẫn tạo và đặt thiệp cưới online trên uWedding",
    description: isEnglish
      ? "Simple steps to create, preview, and share your personalized online wedding invitation."
      : "Quy trình 5 bước đơn giản để chọn mẫu, cung cấp thông tin và nhận link thiệp cưới điện tử hoàn chỉnh.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Chọn mẫu thiệp cưới",
        text: "Truy cập danh mục sản phẩm và lựa chọn mẫu thiệp cưới trực tuyến ưng ý.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Liên hệ tư vấn và gửi thông tin",
        text: "Gửi thông tin ngày cưới, địa điểm, ảnh cưới qua Hotline, Zalo hoặc Fanpage.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Duyệt bản demo thiệp cưới",
        text: "Xem trước giao diện thiệp cưới trên điện thoại và máy tính, yêu cầu chỉnh sửa nếu cần.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Nhận link và mã QR chính thức",
        text: "Nhận đường link website thiệp cưới riêng và mã QR code chất lượng cao.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Chia sẻ lời mời đến bạn bè và người thân",
        text: "Gửi link thiệp mời qua Zalo, Messenger, SMS và theo dõi phản hồi tham dự (RSVP).",
      },
    ],
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
      <main className="flex-grow bg-slate-50/50">
        <CreateInvitationClient />
      </main>
      <Footer />
    </div>
  );
}
