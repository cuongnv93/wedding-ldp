import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  return pageMetadata({
    locale,
    path: "/privacy",
    title: "Chinh sach bao mat - uWedding",
    description:
      "Chinh sach bao mat cua uWedding cho dich vu thiep cuoi online, cach chung toi bao ve thong tin khach hang va du lieu thiet ke.",
  });
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
