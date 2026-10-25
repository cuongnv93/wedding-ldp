import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BlogListClient from "./BlogListClient";
import { blogs } from "@/data/blogs";
import { absoluteUrl, pageMetadata, locales, siteUrl } from "@/lib/seo";

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
  const isEnglish = params.locale === "en";

  const title = isEnglish
    ? "Wedding Guide & Online Wedding Invitation Tips | uWedding"
    : "Cẩm Nang Thiệp Cưới Online & Kinh Nghiệm Cưới | uWedding";
  const description = isEnglish
    ? "Comprehensive guide to online wedding invitations, modern wedding trends, invitation wording etiquette, and digital invitation design tips."
    : "Cẩm nang toàn diện về thiệp cưới online, mẫu thiệp cưới điện tử đẹp nhất 2025 - 2026, cách viết thiệp cưới và kinh nghiệm tổ chức đám cưới tiết kiệm, hiện đại.";

  return pageMetadata({
    locale: params.locale,
    path: "/blog",
    title,
    description,
    image: "/image/og-cover.jpg",
  });
}

export default async function BlogIndexPage(props: PageProps) {
  const params = await props.params;
  const isEnglish = params.locale === "en";
  const blogUrl = absoluteUrl(params.locale, "/blog");

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
        name: isEnglish ? "Wedding Guide" : "Cẩm nang thiệp cưới",
        item: blogUrl,
      },
    ],
  };

  // CollectionPage Schema
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isEnglish
      ? "Wedding Guide & Online Wedding Invitation Tips"
      : "Cẩm Nang Thiệp Cưới Online & Kinh Nghiệm Cưới",
    description: isEnglish
      ? "Comprehensive guide to online wedding invitations, modern wedding trends, invitation wording etiquette, and digital invitation design tips."
      : "Cẩm nang toàn diện về thiệp cưới online, mẫu thiệp cưới điện tử đẹp nhất 2025 - 2026, cách viết thiệp cưới và kinh nghiệm tổ chức đám cưới tiết kiệm, hiện đại.",
    url: blogUrl,
    inLanguage: params.locale === "en" ? "en-US" : "vi-VN",
    publisher: {
      "@type": "Organization",
      name: "uWedding",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(params.locale, "/favicon.png"),
      },
    },
    hasPart: blogs.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: absoluteUrl(params.locale, `/blog/${post.slug}`),
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      image: absoluteUrl(params.locale, post.coverImage),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <Navbar />
      <main>
        <BlogListClient locale={params.locale} posts={blogs} />
      </main>
      <Footer />
    </>
  );
}
