"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useEffect, useState, useRef, useCallback } from "react";
import Loading from "@/components/loading";
import { AnimatePresence, motion as m } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const LOAD_COUNT = 12;

const TABS = [
  { label: "Giao diện mobile", value: "mobile" },
  { label: "Giao diện web", value: "web" },
  { label: "Giao diện web đẹp", value: "web beautiful" },
];

export const metadata = {
  title: "Danh sách giao diện thiệp cưới đẹp | uWedding",
  description:
    "Khám phá bộ sưu tập giao diện thiệp cưới online hiện đại, cá nhân hóa, phù hợp cho mọi nhu cầu tại uWedding.",
  keywords:
    "thiệp cưới, giao diện thiệp cưới, thiệp cưới online, mẫu thiệp cưới đẹp, uWedding",
  openGraph: {
    title: "Danh sách giao diện thiệp cưới đẹp | uWedding",
    description:
      "Khám phá bộ sưu tập giao diện thiệp cưới online hiện đại, cá nhân hóa, phù hợp cho mọi nhu cầu tại uWedding.",
    url: "https://uwedding.vn/products",
    siteName: "uWedding",
    images: [
      {
        url: "/favicon.ico", // Đã đổi sang favicon
        width: 1200,
        height: 630,
        alt: "uWedding - Danh sách giao diện thiệp cưới đẹp",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Danh sách giao diện thiệp cưới đẹp | uWedding",
    description:
      "Khám phá bộ sưu tập giao diện thiệp cưới online hiện đại, cá nhân hóa, phù hợp cho mọi nhu cầu tại uWedding.",
    images: ["/favicon.ico"], // Đã đổi sang favicon
  },
};

export default function ProductsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(LOAD_COUNT);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("mobile");
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter products by target
  const filteredProducts = products.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (product: any) => product.target === activeTab
  );

  // Reset visibleCount when tab changes
  useEffect(() => {
    setVisibleCount(LOAD_COUNT);
  }, [activeTab]);

  // Infinite scroll logic
  const handleLoadMore = useCallback(() => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) =>
        Math.min(prev + LOAD_COUNT, filteredProducts.length)
      );
      setIsLoadingMore(false);
    }, 600);
  }, [isLoadingMore, filteredProducts.length]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!isLoaded) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          visibleCount < filteredProducts.length
        ) {
          handleLoadMore();
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [isLoaded, visibleCount, handleLoadMore, filteredProducts.length]);

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="container mx-auto py-12">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Danh sách giao diện
          </h1>
          <div className="flex justify-center mb-8 gap-8 relative">
            {TABS.map((tab) => (
              <m.button
                key={tab.value}
                layout
                whileHover={{ scale: 1.18 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative px-4 py-2 rounded-full border transition-colors duration-200 overflow-hidden
                  ${
                    activeTab === tab.value
                      ? "border-primary"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                onClick={() => setActiveTab(tab.value)}
                style={{ position: "relative" }}
              >
                <AnimatePresence>
                  {activeTab === tab.value && (
                    <m.div
                      layoutId="tab-underline"
                      className="absolute inset-0 rounded-full bg-primary"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                      style={{ zIndex: 0 }}
                    />
                  )}
                </AnimatePresence>
                <span
                  className={`relative z-10 transition-colors duration-200 ${
                    activeTab === tab.value ? "text-white" : "text-gray-700"
                  }`}
                >
                  {tab.label}
                </span>
              </m.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <m.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
            >
              {filteredProducts.slice(0, visibleCount).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </m.div>
          </AnimatePresence>
          <div
            ref={loaderRef}
            className="flex justify-center mt-8 min-h-[40px]"
          >
            {isLoadingMore && <Loading />}
            {!isLoadingMore && visibleCount < filteredProducts.length && (
              <span className="text-gray-500">Kéo xuống để tải thêm...</span>
            )}
            {visibleCount >= filteredProducts.length && (
              <span className="text-gray-400">
                Đã hiển thị tất cả giao diện
              </span>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
