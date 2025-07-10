"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shuffle } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface Product {
  id: string | number;
  image: string;
  name: string;
  new: boolean;
  reviews: number;
  linkRedirect: string;
  isFavourite?: boolean;
  description?: string;
}

export default function ProductCard({
  product,
  activeTab,
}: {
  product: Product;
  activeTab?: string;
}) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  // Navigation với loading state và prevent double clicks
  const handleCardClick = useCallback(async () => {
    if (isNavigating) return; // Prevent double clicks

    setIsNavigating(true);

    // Smooth transition với requestAnimationFrame
    requestAnimationFrame(() => {
      router.push(`/products/${product.id}`);
    });

    // Reset loading state sau 2s (fallback)
    setTimeout(() => setIsNavigating(false), 2000);
  }, [router, product.id, isNavigating]);

  // Prefetch khi hover để tăng tốc
  const prefetchRoute = useCallback(() => {
    router.prefetch(`/products/${product.id}`);
  }, [router, product.id]);

  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.3, ease: "easeOut" },
        },
      }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }} // Feedback khi click
      className="overflow-hidden group cursor-pointer"
      onClick={handleCardClick}
      onMouseEnter={prefetchRoute}
    >
      <Card
        className={`h-full min-h-[520px] transition-shadow duration-200 hover:shadow-lg ${
          isNavigating ? "opacity-75 pointer-events-none" : ""
        }`}
      >
        <div
          className="relative aspect-square overflow-hidden"
          style={
            activeTab === "card"
              ? { height: "455px", width: "100%" }
              : undefined
          }
        >
          {/* Giữ nguyên tính năng preview ảnh dài 15000ms */}
          <div
            className={`relative shadow-lg min-h-[450px] z-0 rounded-lg rounded-b-none bg-cover bg-top transition-[background-position] ${
              activeTab === "card" ? "duration-[1000ms]" : "duration-[15000ms]"
            } ease-linear hover:bg-bottom`}
            style={{
              backgroundImage: `url('${product.image}')`,
            }}
          >
            {/* Image component ẩn để SEO và accessibility */}
            <Image
              className="w-full h-full object-cover opacity-0"
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              quality={80}
            />

            {/* Loading overlay khi đang navigate */}
            {isNavigating && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-20 rounded-lg rounded-b-none">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}

            {/* Badge overlay */}
            <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
              {product.isFavourite ? (
                <Badge className="text-xs bg-primary">Yêu thích</Badge>
              ) : product.new ? (
                <Badge className="text-xs bg-primary">Mới</Badge>
              ) : null}
            </div>
          </div>
        </div>

        <CardContent className="p-4 min-h-[80px]">
          <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
          {product.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {product.description}
            </p>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0 h-[60px]">
          <div
            className={`w-full rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              isNavigating
                ? "bg-primary/70 text-primary-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md"
            }`}
          >
            {isNavigating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                Đang tải...
              </>
            ) : (
              <>
                <Shuffle className="h-4 w-4" />
                Xem chi tiết
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
