"use client";

import Image from "next/image";
import Link from "next/link";
import { Shuffle } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";

interface Product {
  id: string | number;
  image: string;
  previewImage?: string;
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
  uniformPreview = false,
}: {
  product: Product;
  activeTab?: string;
  uniformPreview?: boolean;
}) {
  const t = useTranslations("list_product");
  const t_desc = useTranslations("item_desc");
  const currentLocale = useLocale();
  const previewImage =
    product.previewImage || product.image || "/placeholder.svg";
  const previewTransitionClass =
    product.target === "card" || activeTab === "card"
      ? "duration-[1000ms]"
      : "duration-[15000ms]";
  const previewRatioClass = uniformPreview
    ? "aspect-[3/4]"
    : product.target === "mobile"
      ? "aspect-[3/4]"
      : product.target === "card" || product.target === "signature"
      ? "aspect-[4/5]"
      : "aspect-[4/3]";

  const imageAlt =
    currentLocale === "vi"
      ? `Mẫu thiệp cưới online ${product.name} - uWedding`
      : `Online wedding invitation template ${product.name} - uWedding`;

  return (
    <Link
      href={`/${currentLocale}/products/${product.id}`}
      className="group flex h-full overflow-hidden text-inherit no-underline focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 rounded-3xl"
      prefetch={true}
      title={imageAlt}
    >
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
          y: -6,
          transition: { duration: 0.25, ease: "easeOut" },
        }}
        whileTap={{ scale: 0.98 }}
        className="flex h-full w-full"
      >
        <div className="flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(244,63,94,0.12)] transition-all duration-300 p-3 sm:p-3.5">
          {/* Framed Image Container with Soft Rounded Corners */}
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl bg-slate-100 shadow-inner",
              previewRatioClass
            )}
          >
            <Image
              className={cn(
                "object-cover object-top transition-[object-position] ease-linear group-hover:object-bottom",
                previewTransitionClass
              )}
              src={previewImage}
              alt={imageAlt}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 300px"
              quality={75}
            />

            {/* Badge overlay */}
            <div className="absolute right-2.5 top-2.5 z-10 flex flex-col gap-1.5">
              {product.isFavourite ? (
                <span className="rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-bold text-rose-600 shadow-sm border border-rose-100/70">
                  {t("favorite")}
                </span>
              ) : product.new ? (
                <span className="rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                  {t("new")}
                </span>
              ) : null}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 px-1.5 pt-3.5 pb-2">
            <h3 className="line-clamp-1 text-base font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
              {product.name}
            </h3>
            {product.description && (
              <p className="mt-1 line-clamp-2 text-xs text-slate-500 leading-relaxed">
                {t_desc(product.description)}
              </p>
            )}
          </div>

          {/* Action button */}
          <div className="pt-2">
            <div className="flex w-full items-center justify-center gap-2 rounded-full py-2.5 px-4 text-xs sm:text-sm font-semibold bg-rose-50 text-rose-600 border border-rose-100/80 group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-500 transition-all duration-200 shadow-xs">
              <Shuffle className="h-3.5 w-3.5" />
              <span>{t("details")}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
