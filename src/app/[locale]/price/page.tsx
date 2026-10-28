import { redirect } from "next/navigation";
import { locales } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

export default async function PricePage(props: PageProps) {
  const params = await props.params;
  redirect(`/${params.locale}`);
}
