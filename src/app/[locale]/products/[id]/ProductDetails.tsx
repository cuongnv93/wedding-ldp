"use client";

import { useState, useCallback, useMemo, memo } from "react";
import { Monitor, Smartphone, Loader2, AlertCircle } from "lucide-react";
import type { Product } from "@/data/products";
import Link from "next/link";

// Memoized Logo component
const Logo = memo(() => (
  <Link
    href="/"
    className="font-bold text-xl hover:opacity-80 transition-opacity"
  >
    <span className="text-primary">u</span>Wedding
  </Link>
));

Logo.displayName = "Logo";

// Memoized View Toggle Button
const ViewToggleButton = memo(
  ({
    view,
    currentView,
    icon: Icon,
    title,
    onClick,
  }: {
    view: "desktop" | "mobile";
    currentView: "desktop" | "mobile";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    title: string;
    onClick: () => void;
  }) => (
    <button
      className={`p-2 rounded transition-colors hover:bg-gray-100 ${view === currentView ? "bg-primary/10 text-primary" : "text-gray-600"
        }`}
      onClick={onClick}
      title={title}
      aria-pressed={view === currentView}
    >
      <Icon className="w-6 h-6" />
    </button>
  )
);

ViewToggleButton.displayName = "ViewToggleButton";

// Loading component for iframe
const IframeLoader = memo(() => (
  <div className="flex items-center justify-center h-full bg-gray-50">
    <div className="text-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
      <p className="text-sm text-gray-600">Đang tải giao diện...</p>
    </div>
  </div>
));

IframeLoader.displayName = "IframeLoader";

// Error component for iframe
const IframeError = memo(({ onRetry }: { onRetry: () => void }) => (
  <div className="flex items-center justify-center h-full bg-gray-50">
    <div className="text-center">
      <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
      <p className="text-sm text-gray-600 mb-3">Không thể tải giao diện</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
      >
        Thử lại
      </button>
    </div>
  </div>
));

IframeError.displayName = "IframeError";

// Optimized Iframe component
const OptimizedIframe = memo(
  ({
    src,
    view,
    onLoad,
    onError,
  }: {
    src: string;
    view: "desktop" | "mobile";
    onLoad: () => void;
    onError: () => void;
  }) => {
    // Memoize iframe styles để tránh tạo lại object
    const iframeStyles = useMemo(() => {
      const baseStyles = {
        height: "calc(100vh - 65px)",
        border: "none",
        display: "block" as const,
      };

      if (view === "mobile") {
        return {
          ...baseStyles,
          width: "425px", // iPhone width
          background: "white",
          borderRadius: "1.25rem",
        };
      }

      return {
        ...baseStyles,
        width: "100%",
      };
    }, [view]);

    const containerClassName = useMemo(() => {
      if (view === "desktop") {
        return "w-full max-w-5xl rounded-lg shadow-lg overflow-hidden bg-white";
      }
      // Mobile view: center container với shadow giống device
      return "mx-auto shadow-2xl rounded-2xl overflow-hidden bg-white border border-gray-200";
    }, [view]);

    const containerStyles = useMemo(() => {
      if (view === "desktop") {
        return { height: "calc(100vh - 65px)" };
      }
      // Mobile: fixed width và height
      return {
        width: "425px",
        height: "calc(100vh - 65px)",
        maxHeight: "812px", // iPhone 13 height
      };
    }, [view]);

    const iframe = (
      <iframe
        src={src}
        title="Xem trước giao diện"
        style={iframeStyles}
        frameBorder={0}
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        loading="lazy"
        onLoad={onLoad}
        onError={onError}
      />
    );

    // Luôn dùng container cho cả desktop và mobile
    return (
      <div className={containerClassName} style={containerStyles}>
        {iframe}
      </div>
    );
  }
);

OptimizedIframe.displayName = "OptimizedIframe";

export default function ProductDetails({ product }: { product: Product }) {
  const [view, setView] = useState<"desktop" | "mobile">("desktop");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Memoize view title để tránh tính toán lại
  const viewTitle = useMemo(() => {
    return view === "desktop" ? "Giao diện máy tính" : "Giao diện mobile";
  }, [view]);

  // Memoize iframe src để tránh tạo lại string
  const iframeSrc = useMemo(
    // () => `/api/proxy?urlId=${product.id}`,
    () => product.linkRedirect,
    [product.id]
  );

  // Memoized handlers
  const handleViewChange = useCallback(
    (newView: "desktop" | "mobile") => {
      if (newView !== view) {
        setView(newView);
        setHasError(false);
      }
    },
    [view]
  );

  const handleDesktopView = useCallback(
    () => handleViewChange("desktop"),
    [handleViewChange]
  );
  const handleMobileView = useCallback(
    () => handleViewChange("mobile"),
    [handleViewChange]
  );

  const handleIframeLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleIframeError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  const handleRetry = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    // Force iframe reload by changing src slightly
    const iframe = document.querySelector("iframe");
    if (iframe) {
      const currentSrc = iframe.src;
      iframe.src = "";
      setTimeout(() => {
        iframe.src = currentSrc;
      }, 100);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-[1000] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Logo />

          {/* Center content */}
          <div className="flex-1 flex justify-center">
            <span className="font-semibold text-lg">{viewTitle}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <ViewToggleButton
              view="desktop"
              currentView={view}
              icon={Monitor}
              title="Xem giao diện desktop"
              onClick={handleDesktopView}
            />
            <ViewToggleButton
              view="mobile"
              currentView={view}
              icon={Smartphone}
              title="Xem giao diện mobile"
              onClick={handleMobileView}
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex justify-center items-center bg-gray-50 relative">
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-10">
            <IframeLoader />
          </div>
        )}

        {/* Error overlay */}
        {hasError && !isLoading && (
          <div className="absolute inset-0 z-10">
            <IframeError onRetry={handleRetry} />
          </div>
        )}

        {/* Iframe content */}
        <OptimizedIframe
          src={iframeSrc}
          view={view}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      </main>
    </div>
  );
}
