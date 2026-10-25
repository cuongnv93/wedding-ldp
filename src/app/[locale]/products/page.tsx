"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ProductCard from "@/components/ProductCard";
import { type Product, products } from "@/data/products";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import Loading from "@/components/loading";
import { AnimatePresence, motion as m } from "framer-motion";
import { memo } from "react";
import { useTranslations } from "next-intl";

// Session storage utilities
const SESSION_STORAGE_KEY = "activeTab";
const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 1 day in milliseconds

const saveToSessionStorage = (value: TabValue) => {
  try {
    const data = {
      value,
      timestamp: Date.now(),
      expiration: Date.now() + EXPIRATION_TIME,
    };
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to session storage:", error);
  }
};

const loadFromSessionStorage = (): TabValue | null => {
  try {
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!stored) return null;

    const data = JSON.parse(stored);

    // Check if data has expired
    if (Date.now() > data.expiration) {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }

    return data.value;
  } catch (error) {
    console.error("Error loading from session storage:", error);
    return null;
  }
};

// Memoize ProductCard để tránh re-render không cần thiết
const MemoizedProductCard = memo(ProductCard);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const LOAD_COUNT = 8;
const INTERSECTION_THRESHOLD = 0.5;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTabs = (t: any) =>
  [
    {
      label: t("classic"),
      value: "classic",
      desc: t("classic_desc"),
    },
    {
      label: t("romance"),
      value: "romance",
      desc: t("romance_desc"),
    },
    {
      label: t("signature"),
      value: "signature",
      desc: t("signature_desc"),
    },
  ] as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TabValue = any;

export default function ProductsPage() {
  const t = useTranslations("list_product");
  const TABS = getTabs(t);
  const [visibleCount, setVisibleCount] = useState(LOAD_COUNT);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [activeTab, setActiveTab] = useState<TabValue>("classic");
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Sync sessionStorage tab on client mount without breaking SSR HTML
  useEffect(() => {
    const saved = loadFromSessionStorage();
    if (saved && saved !== "classic") {
      setActiveTab(saved);
    }
  }, []);

  // Memoize filtered products
  const filteredProducts = useMemo(() => {
    if (activeTab === "favourite") {
      return products.filter(
        (product: Product) => product.isFavourite === true
      );
    }
    return products.filter((product: Product) => product.type === activeTab);
  }, [activeTab]);

  // Memoize visible products
  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  // Reset visibleCount when tab changes
  const handleTabChange = useCallback((newTab: TabValue) => {
    setActiveTab(newTab);
    setVisibleCount(LOAD_COUNT);
    saveToSessionStorage(newTab);
  }, []);

  // Load more handler
  const handleLoadMore = useCallback(() => {
    if (isLoadingMore || visibleCount >= filteredProducts.length) return;

    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) =>
        Math.min(prev + LOAD_COUNT, filteredProducts.length)
      );
      setIsLoadingMore(false);
    }, 200);
  }, [isLoadingMore, visibleCount, filteredProducts.length]);

  // Intersection Observer for infinite scrolling
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && visibleCount < filteredProducts.length) {
          handleLoadMore();
        }
      },
      {
        threshold: INTERSECTION_THRESHOLD,
        rootMargin: "150px",
      }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader && observerRef.current) {
      observerRef.current.observe(currentLoader);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [visibleCount, filteredProducts.length, handleLoadMore]);

  const hasMoreProducts = visibleCount < filteredProducts.length;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-8 sm:px-6 sm:py-12">
          <header className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              {t("list")}
            </h1>
            <p className="max-w-[800px] mx-auto text-muted-foreground text-sm sm:text-base">
              {TABS.find((item) => item.value === activeTab)?.desc}
            </p>
          </header>

          {/* Tab buttons */}
          <div className="relative mb-8 flex flex-wrap justify-center gap-3 sm:gap-4">
            {TABS.map((tab) => (
              <TabButton
                key={tab.value}
                tab={tab}
                isActive={activeTab === tab.value}
                onClick={() => handleTabChange(tab.value)}
              />
            ))}
          </div>

          {/* Products grid */}
          <AnimatePresence mode="wait">
            <m.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={`grid grid-cols-1 items-stretch sm:grid-cols-2 ${
                activeTab === "card" ? "lg:grid-cols-2" : "lg:grid-cols-4"
              } mt-8 gap-4 sm:mt-12 sm:gap-6`}
            >
              {visibleProducts.map((product) => (
                <MemoizedProductCard
                  key={product.id}
                  product={product}
                  activeTab={activeTab}
                  uniformPreview
                />
              ))}
            </m.div>
          </AnimatePresence>

          {/* Loading indicator */}
          <div
            ref={loaderRef}
            className="flex justify-center mt-8 min-h-[40px] items-center"
          >
            {isLoadingMore && <Loading />}
            {!isLoadingMore && hasMoreProducts && (
              <span className="text-gray-500 text-sm">{t("load_more")}...</span>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// TabButton component
const TabButton = memo(
  ({
    tab,
    isActive,
    onClick,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tab: any;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <m.button
      layout
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`relative px-4 py-2 rounded-full border transition-colors duration-150 overflow-hidden text-sm font-medium
      ${
        isActive
          ? "border-primary"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
      }`}
      onClick={onClick}
      type="button"
    >
      <AnimatePresence>
        {isActive && (
          <m.div
            layoutId="tab-underline"
            className="absolute inset-0 rounded-full bg-primary"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          />
        )}
      </AnimatePresence>
      <span
        className={`relative z-10 transition-colors duration-150 ${
          isActive ? "text-white" : "text-gray-700"
        }`}
      >
        {tab.label}
      </span>
    </m.button>
  )
);

TabButton.displayName = "TabButton";
