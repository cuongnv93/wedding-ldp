"use client";

import { lazy, Suspense, useEffect, useState } from "react";

const ThreeDSection = lazy(() => import("./ThreeDSection"));

function ThreeDPlaceholder({ label }: { label: string }) {
  return (
    <div className="relative flex h-[300px] w-full items-center justify-center rounded-xl bg-white/75 shadow-sm ring-1 ring-black/5 sm:h-[400px] md:h-[500px]">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary motion-safe:animate-spin" />
        <p className="text-sm text-muted-foreground">{label}...</p>
      </div>
    </div>
  );
}

export default function Hero3DLoader({ label }: { label: string }) {
  const [shouldLoad3D, setShouldLoad3D] = useState(false);

  useEffect(() => {
    const element = document.getElementById("hero-3d-section");
    if (!element) return;

    const loadWhenIdle = () => {
      if (window.requestIdleCallback) {
        window.requestIdleCallback(() => setShouldLoad3D(true), {
          timeout: 1800,
        });
      } else {
        window.setTimeout(() => setShouldLoad3D(true), 1200);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadWhenIdle();
          observer.disconnect();
        }
      },
      { rootMargin: "200px", threshold: 0.01 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="hero-3d-section"
      className="hidden md:block relative h-[300px] w-full sm:h-[400px] md:h-[500px]"
    >
      {shouldLoad3D ? (
        <Suspense fallback={<ThreeDPlaceholder label={label} />}>
          <ThreeDSection />
        </Suspense>
      ) : (
        <ThreeDPlaceholder label={label} />
      )}
    </div>
  );
}
