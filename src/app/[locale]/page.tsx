import Navbar from "../../components/navbar";
import Hero from "../../components/hero";
import FeaturedProducts from "../../components/featured-products";
import Benefits from "../../components/benefits";
import Question from "../../components/question";
import Footer from "../../components/footer";

export default async function Home(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  return (
    <div className="min-h-screen flex flex-col">
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
