"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { products } from "../data/products";
import ProductCard from "./ProductCard";
import { useMemo, memo } from "react";
import { useTranslations, useLocale } from "next-intl";

// Constants để tránh tạo lại object
const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Giảm từ 0.2 xuống 0.1
    },
  },
};

const HEADER_ANIMATION = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.3 }, // Giảm từ 0.5 xuống 0.3
};

const BUTTON_ANIMATION = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.3, delay: 0.2 }, // Giảm delay
};

// Memoize ProductCard để tránh re-render
const MemoizedProductCard = memo(ProductCard);

export default function FeaturedProducts() {
  const t = useTranslations("list_product");
  const currentLocale = useLocale();
  // Memoize filtered products để tránh filter lại mỗi render
  const featuredProducts = useMemo(() => {
    return products
      .filter((product) => product.isFavourite)
      .slice(0, 12)
      .map((product) => ({
        ...product,
        id: product.id.toString(),
      }));
  }, []); // Empty dependency vì products là static

  return (
    <section id="product" className="w-full py-12 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <motion.div
          {...HEADER_ANIMATION}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              {t("featured")}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("list_product_desc")}
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        >
          {featuredProducts.map((product) => (
            <MemoizedProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        <motion.div {...BUTTON_ANIMATION} className="flex justify-center mt-12">
          <Link href={`/${currentLocale}/products`}>
            <Button variant="outline" size="lg">
              {t("view_all")}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
