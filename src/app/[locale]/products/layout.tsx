import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  return pageMetadata({
    locale,
    path: "/products",
    title: "Mau thiep cuoi online dep - uWedding",
    description:
      "Kham pha bo suu tap mau thiep cuoi online dep, hien dai va sang trong tren uWedding. Chon mau thiep phu hop voi phong cach ngay cuoi cua ban.",
  });
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
