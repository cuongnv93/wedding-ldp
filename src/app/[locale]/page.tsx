import type { Metadata } from "next";
import Navbar from "../../components/navbar";
import Hero from "../../components/hero";
import FeaturedProducts from "../../components/featured-products";
import FeaturesSeo from "../../components/FeaturesSeo";
import Benefits from "../../components/benefits";
import Question from "../../components/question";
import Footer from "../../components/footer";
import {
  absoluteUrl,
  absoluteAssetUrl,
  pageMetadata,
  seoFor,
  siteUrl,
  getRouteKeywords,
} from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const metadata = seoFor(locale, "home");

  return pageMetadata({
    locale,
    path: "",
    title: metadata.title,
    description: metadata.description,
    keywords: getRouteKeywords(locale, "home"),
  });
}

export default async function Home(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const isEnglish = locale === "en";
  const t = await getTranslations({ locale, namespace: "faq" });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [1, 2, 3, 4, 5].map((item) => ({
      "@type": "Question",
      name: t(`question_${item}`),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(`answer_${item}`),
      },
    })),
    url: absoluteUrl(locale),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isEnglish
      ? "Online Wedding Invitation Service uWedding"
      : "Dịch vụ tạo thiệp cưới online uWedding",
    serviceType: isEnglish
      ? "Digital Wedding Invitations & Wedding Website"
      : "Thiệp cưới online, thiệp cưới điện tử & website đám cưới",
    description: isEnglish
      ? "Modern, interactive digital wedding invitations with Google Maps, RSVP, music, and instant QR codes."
      : "Nền tảng tạo thiệp cưới online, thiệp cưới điện tử hiện đại tích hợp nhạc nền, bản đồ, đếm ngược và mã QR chia sẻ dễ dàng.",
    provider: {
      "@type": "Organization",
      name: "uWedding",
      url: siteUrl,
      logo: absoluteAssetUrl("/favicon.png"),
    },
    areaServed: {
      "@type": "Country",
      name: isEnglish ? "Worldwide" : "Vietnam",
    },
    offers: {
      "@type": "Offer",
      price: "199000",
      priceCurrency: "VND",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(locale),
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqJsonLd, serviceJsonLd]),
        }}
      />
      <Navbar />
      <main className="flex-grow">
        <Hero locale={locale} />
        <FeaturedProducts />
        <FeaturesSeo />
        <Benefits />
        <Question />
      </main>
      <Footer />
    </div>
  );
}
