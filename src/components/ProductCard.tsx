"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Shuffle } from "lucide-react";
import { motion } from "framer-motion";

interface Product {
  id: string | number;
  image: string;
  name: string;
  discount: number;
  new: boolean;
  rating: number;
  reviews: number;
  price: string;
  originalPrice?: string;
  linkRedirect: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.5 },
        },
      }}
      whileHover={{ y: -10 }}
      className="overflow-hidden group"
    >
      <Link href={product.linkRedirect}>
        <Card className="h-full">
          <div className="relative aspect-square overflow-hidden">
            <div
              className="relative shadow-lg min-h-[450px] z-[999] rounded-lg rounded-b-none bg-cover bg-top transition-[background-position] duration-[15000ms] ease-linear hover:bg-bottom"
              style={{
                backgroundImage: `url('${product.image}')`,
              }}
            >
              <Image
                className="w-full h-full object-cover"
                src={product.image}
                alt="card"
                fill
                style={{ display: "none" }}
                sizes="100vw"
              />
            </div>
            {/* <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            /> */}
          </div>
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            {product.discount > 0 && (
              <Badge variant="destructive" className="text-xs">
                Giảm {product.discount}%
              </Badge>
            )}
            {product.new && <Badge className="text-xs bg-primary">Mới</Badge>}
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm font-medium ml-1">
                  {product.rating}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviews} đánh giá)
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-bold">{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <Button className="w-full gap-2">
                <Shuffle className="h-4 w-4" />
                Xem chi tiết
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
