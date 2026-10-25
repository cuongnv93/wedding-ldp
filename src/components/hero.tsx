import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Hero3DLoader from "./Hero3DLoader";

const StatisticBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center sm:items-start">
    <span className="text-2xl sm:text-3xl font-bold">{value}+</span>
    <span className="text-muted-foreground text-sm sm:text-base">{label}</span>
  </div>
);

export default async function HeroSectionOptimized({
  locale,
}: {
  locale: string;
}) {
  const t = await getTranslations({ locale });
  const isEnglish = locale === "en";
  const heroImageAlt = isEnglish
    ? "Modern and elegant online wedding invitations uWedding"
    : "Mẫu thiệp cưới online đẹp và sang trọng uWedding";

  return (
    <section className="relative w-full min-h-[40vh] overflow-hidden bg-white">
      <Image
        src="/image/anh-bia-thiep-xinh.jpg"
        alt={heroImageAlt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={75}
        className="object-cover object-center"
        style={{ zIndex: 0 }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.45)", zIndex: 1 }}
      />

      <div className="container">
        <div
          className="md:text-center responsive-grid lg:grid-cols-2 gap-8 py-6 md:py-12 items-center relative"
          style={{ zIndex: 2 }}
        >
          <div className="flex flex-col gap-6 pt-8 md:pt-0 text-center lg:text-left">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary font-medium w-fit mx-auto lg:mx-0">
              {t("banner_hottest")}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-sm">
              {t("banner_Preserve")} <br />
              <span className="text-primary-foreground underline decoration-primary decoration-4 underline-offset-8">
                {t("banner_lifelong")}
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-200 max-w-md mx-auto lg:mx-0 drop-shadow-sm">
              {t("banner_desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center lg:justify-start">
              <Button asChild size="lg" variant="outline" className="gap-2 bg-white/90 hover:bg-white text-gray-900 border-none">
                <Link href={`/${locale}/products`} title={t("banner_view")}>
                  {t("banner_view")} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" className="shadow-lg">
                <Link href={`/${locale}/create-invitation`} title={t("banner_create")}>
                  {t("banner_create")}
                </Link>
              </Button>
            </div>
            <div className="flex flex-row items-center justify-center lg:justify-start gap-6 mt-8 text-white">
              <StatisticBlock value={50} label={t("banner_template")} />
              <div className="h-12 w-px bg-white/20" />
              <StatisticBlock value={200} label={t("banner_customers")} />
              <div className="h-12 w-px bg-white/20" />
              <StatisticBlock value={50} label={t("banner_partners")} />
            </div>
          </div>

          <Hero3DLoader label={t("loading_3d")} />
        </div>
      </div>
    </section>
  );
}
