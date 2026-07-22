import { products } from "@/data/products";
import { absoluteAssetUrl, absoluteUrl, pageMetadata, siteUrl } from "@/lib/seo";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";

type PageProps = {
  params: Promise<{ locale: string; id: string }>;
};

function productTypeLabel(target: string | undefined, isEnglish: boolean) {
  if (target === "mobile") {
    return isEnglish ? "mobile invitation template" : "mẫu thiệp cưới mobile";
  }

  if (target === "signature") {
    return isEnglish
      ? "digital signature invitation template"
      : "mẫu thiệp cưới chữ ký số";
  }

  if (target === "card") {
    return isEnglish ? "wedding card template" : "mẫu thiệp cưới dạng card";
  }

  return isEnglish ? "wedding website template" : "mẫu website thiệp cưới";
}

export default async function ProductPage(props: PageProps) {
  const params = await props.params;
  const productId = Number.parseInt(params.id, 10);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  const isEnglish = params.locale === "en";
  const productLabel = isEnglish
    ? `Wedding invitation template ${product.name}`
    : `Mẫu thiệp cưới online ${product.name}`;
  const productDescription = isEnglish
    ? `Preview the ${product.name} ${productTypeLabel(product.target, true)} by uWedding.`
    : `Xem trước ${productTypeLabel(product.target, false)} ${product.name} của uWedding.`;
  const productUrl = absoluteUrl(params.locale, `/products/${product.id}`);
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: productLabel,
    description: productDescription,
    url: productUrl,
    inLanguage: params.locale,
    primaryImageOfPage: absoluteAssetUrl(product.previewImage || product.image),
    isPartOf: {
      "@type": "WebSite",
      name: "uWedding",
      url: siteUrl,
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isEnglish ? "Home" : "Trang chủ",
        item: absoluteUrl(params.locale),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isEnglish ? "Templates" : "Mẫu thiệp cưới",
        item: absoluteUrl(params.locale, "/products"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: productUrl,
      },
    ],
  };
  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: productLabel,
    description: productDescription,
    image: absoluteAssetUrl(product.previewImage || product.image),
    url: productUrl,
    provider: {
      "@type": "Organization",
      name: "uWedding",
      url: siteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPageJsonLd,
            breadcrumbJsonLd,
            creativeWorkJsonLd,
          ]),
        }}
      />
      <ProductDetails product={product} />
    </>
  );
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const productId = Number.parseInt(params.id, 10);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return {
      title: "Product Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const isEnglish = params.locale === "en";
  const title = isEnglish
    ? `${product.name} - Online wedding invitation template | uWedding`
    : `${product.name} - Mẫu thiệp cưới online | uWedding`;
  const description = isEnglish
    ? `Preview the modern, personalized ${product.name} online wedding invitation template by uWedding. Easy to share by link or QR code.`
    : `Xem mẫu thiệp cưới online ${product.name} hiện đại, cá nhân hóa và dễ chia sẻ qua link hoặc QR trên uWedding.`;

  return pageMetadata({
    locale: params.locale,
    path: `/products/${product.id}`,
    title,
    description,
    image: product.previewImage || product.image,
  });
}

export async function generateStaticParams() {
  const ids = [...new Set(products.map((product) => product.id))];

  return ids.flatMap((id) =>
    ["vi", "en"].map((locale) => ({
      locale,
      id: id.toString(),
    }))
  );
}
