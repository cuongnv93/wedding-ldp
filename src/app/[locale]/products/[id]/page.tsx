import { products } from "@/data/products";
import ProductDetails from "./ProductDetails";

type PageProps = {
  params: { id: string };
};


export default async function ProductPage(props: PageProps) {
  const productId = Number(props.params.id);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <div>Product not found</div>;
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
    };
  }

  return {
    title: `${product.name} - Thiệp cưới online uWedding`,
    description: `Xem mẫu thiệp cưới "${product.name}" hiện đại, cá nhân hóa và dễ chia sẻ trên uWedding. Đặt thiệp online nhanh chóng, tiện lợi.`,
  };
}

// Generate static params (optional - for static generation)
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}
