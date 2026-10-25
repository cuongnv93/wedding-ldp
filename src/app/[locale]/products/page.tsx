import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProductsClient from "./ProductsClient";
import { products } from "@/data/products";
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
  const seo = seoFor(params.locale, "products");

  return pageMetadata({
    locale: params.locale,
    path: "/products",
    title: seo.title,
    description: seo.description,
  });
}

export default async function ProductsPage(props: PageProps) {
  const params = await props.params;
  const isEnglish = params.locale === "en";
  const productsUrl = absoluteUrl(params.locale, "/products");

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
        name: isEnglish ? "Wedding Invitation Templates" : "Mẫu thiệp cưới online",
        item: productsUrl,
      },
    ],
  };

  // ItemList Schema for rich carousels/snippets on Google Search
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: isEnglish
      ? "Modern Online Wedding Invitation Templates"
      : "Danh sách mẫu thiệp cưới online đẹp & hiện đại",
    description: isEnglish
      ? "Explore 50+ beautiful, elegant online wedding invitation templates."
      : "Khám phá 50+ mẫu thiệp cưới online đẹp, sang trọng, đầy đủ tính năng.",
    url: productsUrl,
    numberOfItems: products.length,
    itemListElement: products.slice(0, 24).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: absoluteUrl(params.locale, `/products/${product.id}`),
      image: absoluteUrl(params.locale, product.previewImage || product.image),
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Navbar />
      <main className="flex-grow">
        <ProductsClient />
      </main>
      <Footer />
    </div>
  );
}
