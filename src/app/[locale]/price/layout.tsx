import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  return pageMetadata({
    locale,
    path: "/price",
    title: "Bang gia thiep cuoi online - uWedding",
    description:
      "So sanh cac goi thiep cuoi online uWedding de chon dich vu thiet ke thiep cuoi phu hop voi nhu cau va ngan sach cua ban.",
  });
}

export default function PriceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
