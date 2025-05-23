// app/products/[id]/page.tsx

import { products } from "@/data/products";
import ProductDetails from "./ProductDetails"; // tùy vị trí bạn đặt file

type PageProps = {
  params: { id: string };
};

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ params }: PageProps) {
  const productId = parseInt(params.id, 10);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetails product={product} />;
}
