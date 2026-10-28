"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { products } from "../data/products";
import ProductCard from "./ProductCard";
import { useMemo, memo } from "react";
import { useTranslations, useLocale } from "next-intl";

const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const HEADER_ANIMATION = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.3 },
};

const BUTTON_ANIMATION = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.3, delay: 0.2 },
};

const MemoizedProductCard = memo(ProductCard);

export default function FeaturedProducts() {
  const t = useTranslations("list_product");
  const currentLocale = useLocale();

  const featuredProducts = useMemo(() => {
    return products
      .filter((product) => product.isFavourite)
      .slice(0, 12)
      .map((product) => ({
        ...product,
        id: product.id.toString(),
      }));
  }, []);

  return (
    <section id="product" className="w-full py-16 md:py-24 bg-white">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <motion.div
          {...HEADER_ANIMATION}
          className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-100/80 px-4 py-1.5 text-xs font-semibold text-rose-700 shadow-xs border border-rose-200/60">
            <Sparkles className="h-3.5 w-3.5 text-rose-600" />
            <span>Mẫu Thiệp Cưới Xu Hướng 2025 - 2026</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-slate-900">
            {t("featured")}
          </h2>
          <p className="max-w-[750px] text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            {t("list_product_desc")}
          </p>
        </motion.div>

        <motion.div
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 items-stretch gap-6 sm:gap-7 mt-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featuredProducts.map((product) => (
            <MemoizedProductCard
              key={product.id}
              product={product}
              uniformPreview
            />
          ))}
        </motion.div>

        <motion.div {...BUTTON_ANIMATION} className="flex justify-center mt-12">
          <Link
            href={`/${currentLocale}/products`}
            className="inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 bg-white text-slate-800 border-2 border-slate-200 hover:border-rose-400 hover:bg-rose-50 hover:text-rose-600 shadow-sm font-bold text-sm sm:text-base transition-all duration-200 hover:shadow-md hover:scale-105"
          >
            <span>{t("view_all")}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
