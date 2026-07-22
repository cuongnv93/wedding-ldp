import Navbar from "../../components/navbar";
import Hero from "../../components/hero";
import FeaturedProducts from "../../components/featured-products";
import Benefits from "../../components/benefits";
import Question from "../../components/question";
import Footer from "../../components/footer";
import { absoluteUrl } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export default async function Home(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
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

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main className="flex-grow">
        <Hero locale={locale} />
        <FeaturedProducts />
        <Benefits />
        <Question />
      </main>
      <Footer />
    </div>
  );
}
