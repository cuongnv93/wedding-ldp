import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Hero3DLoader from "./Hero3DLoader";
import HeroStatistics from "./HeroStatistics";

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
        sizes="(max-width: 768px) 100vw, 1920px"
        quality={75}
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-white/80 pointer-events-none z-0 backdrop-blur-[1px]" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8 md:py-14 items-center relative z-10">
          <div className="flex flex-col gap-5 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-100/90 px-3.5 py-1 text-xs font-semibold text-rose-700 w-fit mx-auto lg:mx-0 shadow-xs border border-rose-200/70">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>{t("banner_hottest")}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              {t("banner_Preserve")} <br />
              <span className="text-primary">{t("banner_lifelong")}</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
              {t("banner_desc")}
            </p>

            {/* Modern CTA buttons with responsive flex-row & rounded-full design */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 justify-center lg:justify-start items-center">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto rounded-full px-7 py-3 font-bold border-2 border-slate-200 bg-white/90 hover:bg-rose-50 hover:border-rose-300 text-slate-800 hover:text-rose-600 transition-all duration-200 shadow-sm gap-2"
              >
                <Link href={`/${locale}/products`} title={t("banner_view")}>
                  <span>{t("banner_view")}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto rounded-full px-7 py-3 font-bold bg-primary hover:bg-rose-600 text-white transition-all duration-200 shadow-md shadow-rose-500/25"
              >
                <Link
                  href={`/${locale}/create-invitation`}
                  title={t("banner_create")}
                >
                  {t("banner_create")}
                </Link>
              </Button>
            </div>

            {/* Interactive Animated Counter Statistics (Senior Motion Engine) */}
            <HeroStatistics
              templateLabel={t("banner_template")}
              customersLabel={t("banner_customers")}
              partnersLabel={t("banner_partners")}
            />
          </div>

          <Hero3DLoader label={t("loading_3d")} />
        </div>
      </div>
    </section>
  );
}
