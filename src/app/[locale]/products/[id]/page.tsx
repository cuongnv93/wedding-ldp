import { products } from "@/data/products";
import { absoluteUrl, pageMetadata, siteUrl } from "@/lib/seo";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";

type PageProps = {
  params: Promise<{ locale: string; id: string }>;
};

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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: productLabel,
    description: isEnglish
      ? `Preview the ${product.name} online wedding invitation template by uWedding.`
      : `Xem trước mẫu thiệp cưới online ${product.name} của uWedding.`,
    image: `${siteUrl}${product.previewImage || product.image}`,
    url: absoluteUrl(params.locale, `/products/${product.id}`),
    inLanguage: params.locale,
    provider: {
      "@type": "Organization",
      name: "uWedding",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
