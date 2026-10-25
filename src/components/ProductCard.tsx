"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      className="group flex h-full overflow-hidden text-inherit no-underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
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
          y: -5,
          transition: { duration: 0.2, ease: "easeOut" },
        }}
        whileTap={{ scale: 0.98 }}
        className="flex h-full w-full"
      >
        <Card className="flex h-full w-full flex-col overflow-hidden transition-shadow duration-200 hover:shadow-lg">
          <div className={cn("relative overflow-hidden", previewRatioClass)}>
            <div className="relative z-0 h-full w-full overflow-hidden rounded-lg rounded-b-none shadow-lg">
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
                quality={70}
              />

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

          <CardContent className="min-h-[80px] flex-1 p-4">
            <h3 className="line-clamp-2 text-base font-semibold sm:text-lg group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            {product.description && (
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {t_desc(product.description)}
              </p>
            )}
          </CardContent>

          <CardFooter className="mt-auto p-4 pt-0">
            <div className="flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium bg-primary text-primary-foreground group-hover:bg-primary/90 transition-all duration-200 shadow-sm">
              <Shuffle className="h-4 w-4" />
              {t("details")}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
}
