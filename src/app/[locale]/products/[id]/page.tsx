import { products } from "@/data/products";
import ProductDetails from "./ProductDetails";

type PageProps = {
  params: { id: string };
};

export default function ProductPage({ params }: PageProps) {
  const productId = Number.parseInt(params.id, 10);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetails product={product} />;
}

export function generateMetadata({ params }: PageProps) {
  const productId = Number.parseInt(params.id, 10);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} - Thiệp cưới online uWedding`,
    description: `Xem mẫu thiệp cưới "${product.name}" hiện đại, cá nhân hóa và dễ chia sẻ trên uWedding. Đặt thiệp online nhanh chóng, tiện lợi.`,
  };
}

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}
