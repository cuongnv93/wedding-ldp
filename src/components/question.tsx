"use client";

import { useState, useEffect, lazy, Suspense, memo } from "react";
import { motion } from "framer-motion";
import FAQCollapse from "./FAQCollapse";

// Lazy load toàn bộ 3D section
const ThreeDSection = lazy(() => import("./ThreeDQuestionSection"));

// Memoized components
const FAQSection = memo(() => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col gap-6 pt-8 md:pt-0 h-full justify-between"
  >
    <motion.h1
      className="text-3xl font-bold tracking-tighter sm:text-4xl mb-3 text-center"
      initial={{ opacity: 0, y: -30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 28,
        delay: 0.15,
      }}
    >
      Câu hỏi thường gặp
    </motion.h1>
    <FAQCollapse />
  </motion.div>
));

FAQSection.displayName = "FAQSection";

const ThreeDPlaceholder = memo(() => (
  <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] bg-gray-100 rounded-xl flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-sm text-muted-foreground">Đang tải mô hình 3D...</p>
    </div>
  </div>
));

ThreeDPlaceholder.displayName = "ThreeDPlaceholder";

// Ultra-optimized version với complete lazy loading
export default function QuestionLazy() {
  const [shouldLoad3D, setShouldLoad3D] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setTimeout(() => setShouldLoad3D(true), 500);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );

    const element = document.getElementById("question-lazy-3d");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  // Preload 3D on hover
  const preload3D = () => {
    if (!shouldLoad3D) {
      setShouldLoad3D(true);
    }
  };

  return (
    <section
      id="faq"
      className="relative w-full min-h-[90vh] overflow-hidden bg-white"
    >
      <div className="container grid lg:grid-cols-2 gap-8 py-12 md:py-24 items-stretch">
        <FAQSection />

        <motion.div
          id="question-lazy-3d"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="relative h-[500px] w-full flex-shrink-0"
          onMouseEnter={preload3D} // Preload on hover
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
