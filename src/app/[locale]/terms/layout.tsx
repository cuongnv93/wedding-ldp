import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  return pageMetadata({
    locale,
    path: "/terms",
    title: "Dieu khoan su dung - uWedding",
    description:
      "Dieu khoan su dung dich vu thiep cuoi online uWedding, quy dinh quyen va trach nhiem khi su dung website.",
  });
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
