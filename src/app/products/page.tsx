"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function ProductsPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Giả lập tải dữ liệu
    const timer = setTimeout(() => setIsLoaded(true), 500); // Thay bằng logic tải thực tế
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="container mx-auto py-12">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Danh sách sản phẩm
          </h1>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={{ ...product, id: product.id.toString() }}
              />
            ))}
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
