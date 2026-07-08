import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  return pageMetadata({
    locale,
    path: "/create-invitation",
    title: "Tao thiep cuoi online - uWedding",
    description:
      "Huong dan dat va tao thiep cuoi online tren uWedding de gui thiep cuoi nhanh qua link, QR, Zalo hoac Facebook.",
  });
}

export default function CreateInvitationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
