"use client";
import React from "react";
import Navbar from "../components/navbar";
import dynamic from "next/dynamic";

// Lazy load các component
const Hero = dynamic(() => import("../components/hero"), { ssr: false });
const FeaturedProducts = dynamic(
  () => import("../components/featured-products"),
  { ssr: false }
);
const Benefits = dynamic(() => import("../components/benefits"), {
  ssr: false,
});
const Question = dynamic(() => import("../components/question"), {
  ssr: false,
});
const Footer = dynamic(() => import("../components/footer"), { ssr: false });

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
