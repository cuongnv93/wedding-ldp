import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PriceClient from "./PriceClient";
import { absoluteUrl, pageMetadata, locales, seoFor, siteUrl } from "@/lib/seo";

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
  const seo = seoFor(params.locale, "price");

  return pageMetadata({
    locale: params.locale,
    path: "/price",
    title: seo.title,
    description: seo.description,
  });
}

export default async function PricePage(props: PageProps) {
  const params = await props.params;
  const isEnglish = params.locale === "en";
  const priceUrl = absoluteUrl(params.locale, "/price");

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
        name: isEnglish ? "Pricing" : "Bảng giá",
        item: priceUrl,
      },
    ],
  };

  // Pricing / Service Schema
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isEnglish ? "uWedding Online Wedding Invitation Service" : "Dịch vụ thiệp cưới online uWedding",
    description: isEnglish
      ? "Modern digital wedding invitations with RSVP, background music, Google Maps, and photo gallery."
      : "Dịch vụ thiệp cưới online hiện đại, tích hợp xác nhận tham dự, nhạc nền, bản đồ và album cưới sắc nét.",
    provider: {
      "@type": "Organization",
      name: "uWedding",
      url: siteUrl,
    },
    offers: [
      {
        "@type": "Offer",
        name: "Basic",
        price: "0",
        priceCurrency: "VND",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Pro",
        price: "199000",
        priceCurrency: "VND",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Premium",
        price: "399000",
        priceCurrency: "VND",
        availability: "https://schema.org/InStock",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Navbar />
      <main className="flex-grow">
        <PriceClient />
      </main>
      <Footer />
    </div>
  );
}
