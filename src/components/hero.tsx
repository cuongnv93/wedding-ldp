"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedNumber from "./animatedNumber";

// Lazy load toàn bộ 3D section
const ThreeDSection = lazy(() => import("./ThreeDSection"));

// Component hiển thị thông tin
const StatisticBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center sm:items-start">
    <span className="text-2xl sm:text-3xl font-bold">
      <AnimatedNumber value={value} />+
    </span>
    <span className="text-muted-foreground text-sm sm:text-base">{label}</span>
  </div>
);

// Placeholder cho 3D section khi chưa load
const ThreeDPlaceholder = () => (
  <div className="relative w-full h-full rounded-xl overflow-hidden flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-sm text-muted-foreground">Đang tải mô hình 3D...</p>
    </div>
  </div>
);

export default function HeroSectionOptimized() {
  const [shouldLoad3D, setShouldLoad3D] = useState(false);

  // Intersection Observer để chỉ load 3D khi user scroll đến
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          // Delay 500ms để trang load xong trước
          setTimeout(() => setShouldLoad3D(true), 500);
          // Disconnect observer sau khi đã trigger
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    const heroElement = document.getElementById("hero-3d-section");
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => observer.disconnect();
  }, []);

  // Preload 3D assets khi user hover vào button
  const preload3D = () => {
    if (!shouldLoad3D) {
      setShouldLoad3D(true);
    }
  };

  return (
    <section
      className="relative w-full min-h-[40vh] overflow-hidden bg-white"
      style={{
        backgroundImage:
          "url('https://thiepxinh.net/public/upload//images/slide/anh-bia-thiep-xinh.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-white/70 pointer-events-none z-0"></div>

      <div className="container grid lg:grid-cols-2 gap-8 py-6 md:py-12 items-center relative z-10">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 pt-8 md:pt-0 text-center lg:text-left"
        >
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
            Bộ sưu tập thiệp cưới hot nhất 2025
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Lưu giữ khoảnh khắc <br />
            <span className="text-primary">Hạnh phúc trọn đời</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
            Khám phá bộ sưu tập thiệp cưới độc đáo, sang trọng và hiện đại, giúp
            bạn tạo nên ngày trọng đại hoàn hảo.
          </p>
          <div className="flex md:flex-col sm:flex-row gap-4 mt-4 justify-center lg:justify-start">
            <Link href="/products">
              <motion.div
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 4px 24px 0 rgba(255, 0, 128, 0.15)",
                }}
                whileTap={{ scale: 0.96 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.1,
                }}
                className="gap-2 inline-block"
                onMouseEnter={preload3D} // Preload khi hover
              >
                <Button size="lg" variant="outline" className="gap-2">
                  Xem bộ sưu tập <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
            <motion.div
              whileHover={{
                scale: 1.08,
                boxShadow: "0 4px 24px 0 rgba(255, 0, 128, 0.1)",
              }}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.2,
              }}
              className="inline-block"
              onMouseEnter={preload3D} // Preload khi hover
            >
              <Button size="lg">Tạo thiệp cưới ngay</Button>
            </motion.div>
          </div>
          <div className="flex md:flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mt-8">
            <StatisticBlock value={50} label="Mẫu thiệp cưới" />
            <div className="hidden sm:block h-12 w-px bg-border"></div>
            <StatisticBlock value={1000} label="Khách hàng hài lòng" />
            <div className="hidden sm:block h-12 w-px bg-border"></div>
            <StatisticBlock value={50} label="Đối tác uy tín" />
          </div>
        </motion.div>

        {/* Right Section - 3D Canvas */}
        <motion.div
          id="hero-3d-section"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full"
        >
          {shouldLoad3D ? (
            <Suspense fallback={<ThreeDPlaceholder />}>
              <ThreeDSection />
            </Suspense>
          ) : (
            <ThreeDPlaceholder />
          )}
        </motion.div>
      </div>
    </section>
  );
}
