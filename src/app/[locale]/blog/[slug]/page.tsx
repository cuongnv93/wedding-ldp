import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BlogDetailClient from "./BlogDetailClient";
import { blogs, getBlogPostBySlug, getRelatedPosts } from "@/data/blogs";
import {
  absoluteUrl,
  absoluteAssetUrl,
  pageMetadata,
  siteUrl,
} from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateStaticParams() {
  return blogs.flatMap((post) =>
    ["vi", "en"].map((locale) => ({
      locale,
      slug: post.slug,
    }))
  );
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Bài viết không tồn tại | uWedding",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${post.title} | uWedding`;
  const description = post.description;

  return pageMetadata({
    locale: params.locale,
    path: `/blog/${post.slug}`,
    title,
    description,
    image: post.coverImage,
    keywords: post.tags,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    authors: [post.author.name],
    section: post.category,
    tags: post.tags,
  });
}

export default async function BlogPostPage(props: PageProps) {
  const params = await props.params;
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const isEnglish = params.locale === "en";
  const postUrl = absoluteUrl(params.locale, `/blog/${post.slug}`);
  const blogUrl = absoluteUrl(params.locale, "/blog");
  const relatedPosts = getRelatedPosts(post.slug, 3);

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
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  // BlogPosting Schema
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: [absoluteAssetUrl(post.coverImage)],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "uWedding",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: absoluteAssetUrl("/favicon.png"),
      },
    },
    inLanguage: params.locale === "en" ? "en-US" : "vi-VN",
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navbar />
      <main>
        <BlogDetailClient
          locale={params.locale}
          post={post}
          relatedPosts={relatedPosts}
        />
      </main>
      <Footer />
    </>
  );
}
