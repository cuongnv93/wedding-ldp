"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shuffle } from "lucide-react";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";

interface Product {
  id: string | number;
  image: string;
  name: string;
  new: boolean;
  reviews: number;
  linkRedirect: string;
  isFavourite?: boolean;
  description?: string;
  target?: "web" | "mobile" | "web beautiful" | "card" | "signature";
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
  const t = useTranslations("list_product");
  const t_desc = useTranslations("item_desc");
  const currentLocale = useLocale();
  const previewRatioClass =
    product.target === "mobile"
      ? "aspect-[3/4]"
      : product.target === "card" || product.target === "signature"
      ? "aspect-[4/5]"
      : "aspect-[4/3]";

  // Navigation với loading state và prevent double clicks
  const handleCardClick = useCallback(async () => {
    if (isNavigating) return; // Prevent double clicks

    setIsNavigating(true);

    // Smooth transition với requestAnimationFrame
    requestAnimationFrame(() => {
      router.push(`/${currentLocale}/products/${product.id}`);
    });

    // Reset loading state sau 2s (fallback)
    setTimeout(() => setIsNavigating(false), 2000);
  }, [router, product.id, isNavigating, currentLocale]);

  // Prefetch khi hover để tăng tốc
  const prefetchRoute = useCallback(() => {
    router.prefetch(`/${currentLocale}/products/${product.id}`);
  }, [router, product.id, currentLocale]);

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
      className="group cursor-pointer overflow-hidden"
      onClick={handleCardClick}
      onMouseEnter={prefetchRoute}
    >
      <Card
        className={`h-full overflow-hidden transition-shadow duration-200 hover:shadow-lg ${
          isNavigating ? "opacity-75 pointer-events-none" : ""
        }`}
      >
        <div className={cn("relative overflow-hidden", previewRatioClass)}>
          {/* Giữ nguyên tính năng preview ảnh dài 15000ms */}
          <div
            className={`relative z-0 h-full w-full rounded-lg rounded-b-none bg-cover bg-top shadow-lg transition-[background-position] ${
              product.target === "card" || activeTab === "card"
                ? "duration-[1000ms]"
                : "duration-[15000ms]"
            } ease-linear hover:bg-bottom`}
            style={{
              backgroundImage: `url('${product.image}')`,
            }}
          >
            {/* Image component ẩn để SEO và accessibility */}
            <Image
              className="h-full w-full object-cover opacity-0"
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              quality={80}
            />

            {/* Loading overlay khi đang navigate */}
            {isNavigating && (
              <div className="absolute inset-0 z-20 flex items-center justify-center rounded-lg rounded-b-none bg-black/20">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-white"></div>
              </div>
            )}

            {/* Badge overlay */}
            <div className="absolute right-2 top-2 z-10 flex flex-col gap-2">
              {product.isFavourite ? (
                <Badge className="text-xs bg-primary">{t("favorite")}</Badge>
              ) : product.new ? (
                <Badge className="text-xs bg-primary">{t("new")}</Badge>
              ) : null}
            </div>
          </div>
        </div>

        <CardContent className="min-h-[80px] p-4">
          <h3 className="line-clamp-2 text-base font-semibold sm:text-lg">
            {product.name}
          </h3>
          {product.description && (
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {t_desc(product.description)}
            </p>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div
            className={`flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
              isNavigating
                ? "bg-primary/70 text-primary-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md"
            }`}
          >
            {isNavigating ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-current"></div>
                {t("loading")}...
              </>
            ) : (
              <>
                <Shuffle className="h-4 w-4" />
                {t("details")}
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
