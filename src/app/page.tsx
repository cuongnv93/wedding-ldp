import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

// Import các component con
import Hero from "../components/hero";
import FeaturedProducts from "../components/featured-products";
import Benefits from "../components/benefits";
import Question from "../components/question";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedProducts />
        <Benefits />
        <Question />
      </main>
      <Footer />
    </div>
  );
}
