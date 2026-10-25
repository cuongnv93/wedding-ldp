import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { blogs } from "@/data/blogs";
import { absoluteUrl, locales } from "@/lib/seo";

const staticPaths = [
  "",
  "/products",
  "/price",
  "/create-invitation",
  "/create-name-invitation",
  "/blog",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const uniqueProductIds = [...new Set(products.map((product) => product.id))];
  const productPaths = uniqueProductIds.map((id) => `/products/${id}`);
  const blogPaths = blogs.map((post) => `/blog/${post.slug}`);

  return locales.flatMap((locale) => {
    const paths = [...staticPaths, ...productPaths, ...blogPaths];

    return paths.map((path) => {
      const languageAlternates = Object.fromEntries(
        locales.map((item) => [item, absoluteUrl(item, path)])
      );

      const isProduct = path.startsWith("/products");
      const isBlogDetail = path.startsWith("/blog/") && path !== "/blog";
      const isBlogIndex = path === "/blog";

      const slug = isBlogDetail ? path.replace("/blog/", "") : null;
      const blogPost = slug ? blogs.find((b) => b.slug === slug) : null;
      const lastModified = blogPost
        ? new Date(blogPost.updatedAt || blogPost.publishedAt)
        : new Date("2026-10-25T00:00:00.000Z");

      return {
        url: absoluteUrl(locale, path),
        lastModified,
        changeFrequency: isProduct || isBlogDetail ? "weekly" : "monthly",
        priority:
          path === ""
            ? 1
            : path === "/products"
            ? 0.9
            : isBlogIndex || isBlogDetail
            ? 0.85
            : 0.7,
        alternates: {
          languages: {
            ...languageAlternates,
            "x-default": absoluteUrl("vi", path),
          },
        },
      };
    });
  });
}
