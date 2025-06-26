"use client"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ProductCard from "@/components/ProductCard"
import { type Product, products } from "@/data/products"
import { useEffect, useState, useRef, useCallback, useMemo } from "react"
import Loading from "@/components/loading"
import { AnimatePresence, motion as m } from "framer-motion"
import { memo } from "react"

// Session storage utilities
const SESSION_STORAGE_KEY = "activeTab"
const EXPIRATION_TIME = 24 * 60 * 60 * 1000 // 1 day in milliseconds

const saveToSessionStorage = (value: TabValue) => {
  try {
    const data = {
      value,
      timestamp: Date.now(),
      expiration: Date.now() + EXPIRATION_TIME,
    }
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error("Error saving to session storage:", error)
  }
}

const loadFromSessionStorage = (): TabValue | null => {
  try {
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY)
    if (!stored) return null

    const data = JSON.parse(stored)

    // Check if data has expired
    if (Date.now() > data.expiration) {
      sessionStorage.removeItem(SESSION_STORAGE_KEY)
      return null
    }

    return data.value
  } catch (error) {
    console.error("Error loading from session storage:", error)
    return null
  }
}

// Memoize ProductCard để tránh re-render không cần thiết
const MemoizedProductCard = memo(ProductCard)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Giảm stagger time
    },
  },
}

const LOAD_COUNT = 8 // Tăng số lượng load để giảm số lần fetch
const INTERSECTION_THRESHOLD = 0.8 // Tối ưu threshold

const TABS = [
  { label: "Giao diện được yêu thích", value: "favourite" },
  { label: "Giao diện mobile", value: "mobile" },
  { label: "Giao diện web", value: "web" },
] as const

type TabValue = (typeof TABS)[number]["value"]

export default function ProductsPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [visibleCount, setVisibleCount] = useState(LOAD_COUNT)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [activeTab, setActiveTab] = useState<TabValue>(() => {
    // Only access sessionStorage on client side
    if (typeof window !== "undefined") {
      return loadFromSessionStorage() || "favourite"
    }
    return "favourite"
  })
  const loaderRef = useRef<HTMLDivElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Tối ưu initial loading - loại bỏ setTimeout không cần thiết
  useEffect(() => {
    // Sử dụng requestAnimationFrame thay vì setTimeout
    const frame = requestAnimationFrame(() => setIsLoaded(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  // Memoize filtered products với dependency chính xác
  const filteredProducts = useMemo(() => {
    if (activeTab === "favourite") {
      return products.filter((product: Product) => product.isFavourite === true)
    }
    return products.filter((product: Product) => product.target === activeTab)
  }, [activeTab])

  // Memoize visible products để tránh slice lại không cần thiết
  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount)
  }, [filteredProducts, visibleCount])

  // Reset visibleCount when tab changes - tối ưu với useCallback
  const handleTabChange = useCallback((newTab: TabValue) => {
    setActiveTab(newTab)
    setVisibleCount(LOAD_COUNT)
    saveToSessionStorage(newTab)
  }, [])

  // Tối ưu load more với debounce
  const handleLoadMore = useCallback(() => {
    if (isLoadingMore || visibleCount >= filteredProducts.length) return

    setIsLoadingMore(true)
    // Sử dụng requestAnimationFrame thay vì setTimeout
    requestAnimationFrame(() => {
      setTimeout(() => {
        setVisibleCount((prev) => Math.min(prev + LOAD_COUNT, filteredProducts.length))
        setIsLoadingMore(false)
      }, 300) // Giảm delay time
    })
  }, [isLoadingMore, visibleCount, filteredProducts.length])

  // Tối ưu Intersection Observer - tạo một lần và reuse
  useEffect(() => {
    if (!isLoaded) return

    // Cleanup observer cũ
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting && visibleCount < filteredProducts.length) {
          handleLoadMore()
        }
      },
      {
        threshold: INTERSECTION_THRESHOLD,
        rootMargin: "100px", // Preload trước khi user scroll đến
      },
    )

    const currentLoader = loaderRef.current
    if (currentLoader && observerRef.current) {
      observerRef.current.observe(currentLoader)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [isLoaded, visibleCount, filteredProducts.length, handleLoadMore])

  // Early return cho loading state
  if (!isLoaded) {
    return <Loading />
  }

  const hasMoreProducts = visibleCount < filteredProducts.length

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="container mx-auto py-12">
          <h1 className="text-3xl font-bold mb-6 text-center">Danh sách Thiệp cưới</h1>

          {/* Tối ưu tab buttons */}
          <div className="flex flex-wrap justify-center mb-8 gap-8 sm:gap-4 relative">
            {TABS.map((tab) => (
              <TabButton
                key={tab.value}
                tab={tab}
                isActive={activeTab === tab.value}
                onClick={() => handleTabChange(tab.value)}
              />
            ))}
          </div>

          {/* Products grid với tối ưu animation */}
          <AnimatePresence mode="wait">
            <m.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
            >
              {visibleProducts.map((product) => (
                <MemoizedProductCard key={product.id} product={product} />
              ))}
            </m.div>
          </AnimatePresence>

          {/* Loading indicator */}
          <div ref={loaderRef} className="flex justify-center mt-8 min-h-[40px]">
            {isLoadingMore && <Loading />}
            {!isLoadingMore && hasMoreProducts && <span className="text-gray-500">Kéo xuống để tải thêm...</span>}
            {!hasMoreProducts && filteredProducts.length > 0 && (
              <span className="text-gray-400">Đã hiển thị tất cả giao diện</span>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

// Tách TabButton thành component riêng và memoize
const TabButton = memo(
  ({
    tab,
    isActive,
    onClick,
  }: {
    tab: (typeof TABS)[number]
    isActive: boolean
    onClick: () => void
  }) => (
    <m.button
      layout
      whileHover={{ scale: 1.05 }} // Giảm scale để mượt hơn
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`relative px-4 py-2 rounded-full border transition-colors duration-150 overflow-hidden
      ${isActive ? "border-primary" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
      onClick={onClick}
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
      <span className={`relative z-10 transition-colors duration-150 ${isActive ? "text-white" : "text-gray-700"}`}>
        {tab.label}
      </span>
    </m.button>
  ),
)

TabButton.displayName = "TabButton"
