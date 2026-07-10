import type { Metadata } from "next";
import { pageMetadata, seoFor } from "@/lib/seo";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const metadata = seoFor(locale, "createNameInvitation");

  return pageMetadata({
    locale,
    path: "/create-name-invitation",
    title: metadata.title,
    description: metadata.description,
  });
}

export default function CreateNameInvitationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
