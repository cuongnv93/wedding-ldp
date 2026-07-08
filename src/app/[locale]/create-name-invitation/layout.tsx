import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  return pageMetadata({
    locale,
    path: "/create-name-invitation",
    title: "Tao link thiep cuoi gan ten khach moi - uWedding",
    description:
      "Tao link thiep cuoi online gan ten khach moi nhanh chong, giup loi moi trang trong va ca nhan hoa hon khi chia se.",
  });
}

export default function CreateNameInvitationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
