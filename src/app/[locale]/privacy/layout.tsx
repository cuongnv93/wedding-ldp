import type { Metadata } from "next";
import { pageMetadata, seoFor } from "@/lib/seo";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const metadata = seoFor(locale, "privacy");

  return pageMetadata({
    locale,
    path: "/privacy",
    title: metadata.title,
    description: metadata.description,
  });
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
