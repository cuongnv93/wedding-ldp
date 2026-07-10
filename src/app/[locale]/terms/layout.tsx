import type { Metadata } from "next";
import { pageMetadata, seoFor } from "@/lib/seo";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const metadata = seoFor(locale, "terms");

  return pageMetadata({
    locale,
    path: "/terms",
    title: metadata.title,
    description: metadata.description,
  });
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
