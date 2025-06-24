"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { CartProvider } from "../contexts/cart-context";

const LazySplashCursor = dynamic(() => import("@/components/SplashCursor"), {
  ssr: false,
});
// const LazyGlobalHeartEffect = dynamic(
//   () => import("@/components/GlobalHeartEffect"),
//   { ssr: false }
// );
const LazySpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((m) => m.SpeedInsights),
  { ssr: false }
);
const LazyAnalytics = dynamic(() => import("@/components/Analytics"), {
  ssr: false,
});
const LazyToaster = dynamic(() => import("sonner").then((m) => m.Toaster), {
  ssr: false,
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showEffects, setShowEffects] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setShowEffects(false); // reset khi sang màn mới
    const timer = setTimeout(() => setShowEffects(true), 10000); // 10s
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <LazyAnalytics />
      {showEffects && (
        <>
          <div className="splash-cursor-wrapper">
            {/* <LazySplashCursor /> */}
          </div>
          {/* <LazyGlobalHeartEffect /> */}
        </>
      )}
      <LazySpeedInsights />
      <CartProvider>
        {children}
        <LazyToaster />
      </CartProvider>
    </>
  );
}
