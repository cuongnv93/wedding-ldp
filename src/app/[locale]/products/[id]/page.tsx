import { products } from "@/data/products";
import { pageMetadata } from "@/lib/seo";
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

  return <ProductDetails product={product} />;
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

  return pageMetadata({
    locale: params.locale,
    path: `/products/${product.id}`,
    title: `${product.name} - Thiep cuoi online uWedding`,
    description: `Xem mau thiep cuoi online ${product.name} hien dai, ca nhan hoa va de chia se tren uWedding. Dat thiep online nhanh chong, tien loi.`,
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
