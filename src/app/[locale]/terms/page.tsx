import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TermsClient from "./TermsClient";
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
  const seo = seoFor(params.locale, "terms");

  return pageMetadata({
    locale: params.locale,
    path: "/terms",
    title: seo.title,
    description: seo.description,
  });
}

export default async function TermsPage(props: PageProps) {
  const params = await props.params;
  const isEnglish = params.locale === "en";
  const pageUrl = absoluteUrl(params.locale, "/terms");

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
        name: isEnglish ? "Terms of Service" : "Điều khoản dịch vụ",
        item: pageUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <main className="flex-grow bg-slate-50/50">
        <TermsClient />
      </main>
      <Footer />
    </div>
  );
}
