"use client";

import { useEffect, useState, useRef, useCallback, useMemo, memo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion as m } from "framer-motion";
import { Search, X, Sparkles, CheckCircle } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import Loading from "@/components/loading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SESSION_STORAGE_KEY = "uwedding_products_tab";
const EXPIRATION_TIME = 24 * 60 * 60 * 1000;

export type TabValue = "all" | "favourite" | "romance" | "classic" | "signature";

interface TabItem {
  label: string;
  value: TabValue;
  desc: string;
}

const saveToSessionStorage = (value: TabValue) => {
  try {
    const data = {
      value,
      timestamp: Date.now(),
      expiration: Date.now() + EXPIRATION_TIME,
    };
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore session storage errors
  }
};

const loadFromSessionStorage = (): TabValue | null => {
  try {
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!stored) return null;
    const data = JSON.parse(stored);
    if (Date.now() > data.expiration) {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }
    return data.value;
  } catch {
    return null;
  }
};

const MemoizedProductCard = memo(ProductCard);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const LOAD_COUNT = 12;
const INTERSECTION_THRESHOLD = 0.3;

export default function ProductsClient() {
  const t = useTranslations("list_product");
  const locale = useLocale();
  const isEn = locale === "en";

  const [activeTab, setActiveTab] = useState<TabValue>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(LOAD_COUNT);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Sync tab from session storage
  useEffect(() => {
    const saved = loadFromSessionStorage();
    if (saved) {
      setActiveTab(saved);
    }
  }, []);

  const TABS: TabItem[] = useMemo(
    () => [
      {
        label: isEn ? "All Templates" : "Tất cả mẫu",
        value: "all",
        desc: isEn
          ? "Browse all 65+ modern digital wedding invitation designs across all styles and formats."
          : "Khám phá trọn bộ hơn 65+ mẫu thiệp cưới online đẹp mắt, sang trọng và mới nhất mùa cưới 2025 - 2026.",
      },
      {
        label: isEn ? "Featured / Hot" : "Nổi bật & Yêu thích",
        value: "favourite",
        desc: isEn
          ? "The most loved and chosen wedding invitation designs by newlywed couples."
          : "Những thiết kế thiệp cưới được nhiều cặp đôi tin chọn và đánh giá 5 sao nhiều nhất.",
      },
      {
        label: isEn ? "Romantic & Modern" : "Lãng mạn & Hiện đại",
        value: "romance",
        desc: isEn
          ? "Fresh pastel palettes, sweet romantic love story narratives, and elegant motion effects."
          : "Hiện đại, lãng mạn và ngập tràn cảm xúc – mang câu chuyện tình yêu của bạn trở nên sống động hơn.",
      },
      {
        label: isEn ? "Minimalist & Classic" : "Tối giản & Tinh tế",
        value: "classic",
        desc: isEn
          ? "Timeless minimalism with gentle elegance for couples who appreciate subtle, refined beauty."
          : "Tinh tế, đơn giản nhưng sang trọng – dành cho những cặp đôi yêu sự nhẹ nhàng, thuần khiết.",
      },
      {
        label: isEn ? "Digital Signature VIP" : "Chữ ký số cao cấp",
        value: "signature",
        desc: isEn
          ? "Unique interactive signature invitations with real-time handwritten congratulations."
          : "Đẳng cấp, sang trọng, cho phép khách mời ký tên chúc phúc trực tiếp lên thiệp cưới.",
      },
    ],
    [isEn]
  );

  // Compute tab counts
  const tabCounts = useMemo(() => {
    const counts: Record<TabValue, number> = {
      all: products.length,
      favourite: products.filter((p) => p.isFavourite).length,
      romance: products.filter((p) => p.type === "romance").length,
      classic: products.filter((p) => p.type === "classic").length,
      signature: products.filter((p) => p.type === "signature").length,
    };
    return counts;
  }, []);

  // Filtered products based on tab and search
  const filteredProducts = useMemo(() => {
    let result = products;

    if (activeTab === "favourite") {
      result = result.filter((p) => p.isFavourite);
    } else if (activeTab !== "all") {
      result = result.filter((p) => p.type === activeTab);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.target?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeTab, searchQuery]);

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const handleTabChange = useCallback((newTab: TabValue) => {
    setActiveTab(newTab);
    setVisibleCount(LOAD_COUNT);
    saveToSessionStorage(newTab);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (isLoadingMore || visibleCount >= filteredProducts.length) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + LOAD_COUNT, filteredProducts.length));
      setIsLoadingMore(false);
    }, 150);
  }, [isLoadingMore, visibleCount, filteredProducts.length]);

  // Infinite scroll observer
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && visibleCount < filteredProducts.length) {
          handleLoadMore();
        }
      },
      { threshold: INTERSECTION_THRESHOLD, rootMargin: "200px" }
    );

    if (loaderRef.current) {
      observerRef.current.observe(loaderRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [visibleCount, filteredProducts.length, handleLoadMore]);

  const hasMore = visibleCount < filteredProducts.length;

  return (
    <div className="w-full bg-slate-50/50 py-10 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <header className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-100/80 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary mb-4 shadow-sm border border-rose-200/60">
            <Sparkles className="h-4 w-4" />
            <span>{isEn ? "Curated 2025 - 2026 Collection" : "Bộ Sưu Tập Thiệp Cưới 2025 - 2026"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {t("list")}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed min-h-[48px]">
            {TABS.find((item) => item.value === activeTab)?.desc}
          </p>
        </header>

        {/* Search & Filter Toolbar */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              className="pl-10 pr-10 h-11 rounded-full bg-white border-slate-200 shadow-sm text-sm focus-visible:ring-primary"
              placeholder={isEn ? "Search by template code (e.g., WEB_001, MB_005)..." : "Tìm mẫu thiệp theo mã (VD: WEB_001, MB_005)..."}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(LOAD_COUNT);
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Results Count Badge */}
          <div className="text-xs sm:text-sm text-slate-500 font-medium self-end md:self-center">
            {isEn ? "Showing" : "Đang hiển thị"}{" "}
            <span className="font-bold text-slate-900">{filteredProducts.length}</span>{" "}
            {isEn ? "templates" : "mẫu thiệp cưới"}
          </div>
        </div>

        {/* Tab Filter Buttons */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.value;
            const count = tabCounts[tab.value];
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => handleTabChange(tab.value)}
                className={`inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-rose-200 scale-105"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="rounded-3xl bg-white p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto">
            <Search className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              {isEn ? "No templates match your search" : "Không tìm thấy mẫu thiệp phù hợp"}
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              {isEn
                ? "Try searching with a different keyword or browse all available designs."
                : "Vui lòng thử tìm với từ khóa khác hoặc bấm nút bên dưới để xem toàn bộ danh sách."}
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setActiveTab("all");
              }}
              className="rounded-full"
            >
              {isEn ? "Reset Search & Filters" : "Xóa bộ lọc & Xem tất cả"}
            </Button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 && (
          <m.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch"
          >
            {visibleProducts.map((product) => (
              <MemoizedProductCard
                key={product.id}
                product={product}
                activeTab={activeTab}
              />
            ))}
          </m.div>
        )}

        {/* Loading Indicator */}
        {hasMore && (
          <div ref={loaderRef} className="py-12 text-center">
            {isLoadingMore ? (
              <div className="flex justify-center items-center gap-2">
                <Loading />
                <span className="text-sm text-muted-foreground">{t("loading")}...</span>
              </div>
            ) : (
              <div className="h-8" />
            )}
          </div>
        )}

        {/* End of list message (FIXED BUG) */}
        {!hasMore && filteredProducts.length > 0 && (
          <div className="mt-16 pt-8 border-t border-slate-200 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs sm:text-sm font-semibold text-emerald-700 border border-emerald-200">
              <CheckCircle className="h-4 w-4" />
              <span>
                {isEn
                  ? `All ${filteredProducts.length} templates displayed`
                  : `Đã hiển thị toàn bộ ${filteredProducts.length} mẫu thiệp cưới`}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
