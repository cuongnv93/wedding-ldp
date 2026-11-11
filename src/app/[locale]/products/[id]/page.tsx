import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductDetails from "./ProductDetails";
import {
  absoluteUrl,
  absoluteAssetUrl,
  pageMetadata,
  siteUrl,
} from "@/lib/seo";

type PageProps = {
  params: Promise<{ id: string; locale: string }>;
};

function productTypeLabel(target?: string, isEnglish?: boolean) {
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
    ? `Preview the ${product.name} ${productTypeLabel(product.target, true)} by uWedding. Features Google Maps, RSVP, music, and instant QR code sharing.`
    : `Xem trước ${productTypeLabel(product.target, false)} ${product.name} của uWedding. Tích hợp bản đồ chỉ đường, nhạc nền, album ảnh cưới, xác nhận tham dự và mã QR tiện lợi.`;
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
        item: absoluteUrl(params.locale, ""),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isEnglish ? "Wedding Invitation Templates" : "Mẫu thiệp cưới online",
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

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productLabel,
    image: [absoluteAssetUrl(product.previewImage || product.image)],
    description: productDescription,
    sku: `UWD-TEMPLATE-${product.id}`,
    mpn: `UWD${product.id}`,
    brand: {
      "@type": "Brand",
      name: "uWedding",
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "VND",
      price: "199000",
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "uWedding",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: (product.reviews || 88).toString(),
      bestRating: "5",
      worstRating: "1",
    },
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.target === product.target)
    .slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetails
        product={product}
        relatedProducts={relatedProducts}
      />
    </>
  );
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
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
    ? `${product.name} - Elegant Online Wedding Invitation | uWedding`
    : `${product.name} - Mẫu Thiệp Cưới Online Đẹp & Sang Trọng | uWedding`;
  const description = isEnglish
    ? `Preview modern ${product.name} online wedding invitation template on uWedding. Features interactive Google Maps, background music, RSVP, and instant QR sharing.`
    : `Xem mẫu thiệp cưới online ${product.name} đẹp sang trọng tại uWedding. Tích hợp bản đồ chỉ đường, nhạc nền, album ảnh, RSVP và mã QR gửi mừng cưới tiện lợi.`;

  const keywords = isEnglish
    ? [
        product.name,
        `${product.name} wedding invitation`,
        "online wedding invitation template",
        "digital wedding invitation designs",
        "wedding website template",
        "interactive wedding card",
      ]
    : [
        product.name,
        `mẫu thiệp cưới ${product.name}`,
        `thiệp cưới online ${product.name}`,
        `xem trước thiệp cưới ${product.name}`,
        "mẫu thiệp cưới online đẹp",
        "thiệp cưới điện tử hiện đại",
      ];

  return pageMetadata({
    locale: params.locale,
    path: `/products/${product.id}`,
    title,
    description,
    image: product.previewImage || product.image,
    keywords,
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
