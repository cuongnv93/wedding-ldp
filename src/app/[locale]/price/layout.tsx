import type { Metadata } from "next";
import { absoluteUrl, pageMetadata, seoFor } from "@/lib/seo";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const metadata = seoFor(locale, "price");

  return pageMetadata({
    locale,
    path: "/price",
    title: metadata.title,
    description: metadata.description,
  });
}

export default async function PriceLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { children } = props;
  const { locale } = await props.params;
  const isEnglish = locale === "en";

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isEnglish ? "Home" : "Trang chủ",
        item: absoluteUrl(locale),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isEnglish ? "Pricing" : "Bảng giá thiệp cưới online",
        item: absoluteUrl(locale, "/price"),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
