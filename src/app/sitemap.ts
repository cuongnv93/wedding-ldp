import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { absoluteUrl, locales } from "@/lib/seo";

const staticPaths = [
  "",
  "/products",
  "/price",
  "/create-invitation",
  "/create-name-invitation",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const uniqueProductIds = [...new Set(products.map((product) => product.id))];
  const productPaths = uniqueProductIds.map((id) => `/products/${id}`);

  return locales.flatMap((locale) => {
    const paths = [...staticPaths, ...productPaths];

    return paths.map((path) => {
      const languageAlternates = Object.fromEntries(
        locales.map((item) => [item, absoluteUrl(item, path)])
      );

      return {
        url: absoluteUrl(locale, path),
        lastModified: now,
        changeFrequency: path.startsWith("/products") ? "weekly" : "monthly",
        priority: path === "" ? 1 : path === "/products" ? 0.9 : 0.7,
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
