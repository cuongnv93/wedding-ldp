"use client";

import { memo, useCallback, useMemo, useState } from "react";
import { AlertCircle, Loader2, Monitor, Smartphone } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

const Logo = memo(() => {
  const currentLocale = useLocale();

  return (
    <Link
      href={`/${currentLocale}`}
      className="shrink-0 text-lg font-bold transition-opacity hover:opacity-80 sm:text-2xl"
    >
      <span className="text-primary">u</span>Wedding
    </Link>
  );
});

Logo.displayName = "Logo";

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
      className={cn(
        "rounded p-1.5 transition-colors hover:bg-gray-100 sm:p-2",
        view === currentView ? "bg-primary/10 text-primary" : "text-gray-600"
      )}
      onClick={onClick}
      title={title}
      aria-label={title}
      aria-pressed={view === currentView}
    >
      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
    </button>
  )
);

ViewToggleButton.displayName = "ViewToggleButton";

const IframeLoader = memo(() => (
  <div className="flex h-full items-center justify-center bg-gray-50">
    <div className="text-center">
      <Loader2 className="mx-auto mb-2 h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-gray-600">Loading...</p>
    </div>
  </div>
));

IframeLoader.displayName = "IframeLoader";

const IframeError = memo(({ onRetry }: { onRetry: () => void }) => {
  const t = useTranslations("list_product");

  return (
    <div className="flex h-full items-center justify-center bg-gray-50">
      <div className="px-4 text-center">
        <AlertCircle className="mx-auto mb-2 h-8 w-8 text-red-500" />
        <p className="mb-3 text-sm text-gray-600">{t("unable_load")}</p>
        <button
          onClick={onRetry}
          className="rounded bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90"
        >
          {t("try")}
        </button>
      </div>
    </div>
  );
});

IframeError.displayName = "IframeError";

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
    const t = useTranslations("list_product");

    const iframeStyles = useMemo(
      () => ({
        width: "100%",
        height: "100%",
        minWidth: 0,
        border: "none",
        display: "block" as const,
        background: "white",
        overflow: "hidden",
      }),
      []
    );

    const containerStyles = useMemo(
      () => ({
        width: "100%",
        height: "100%",
        maxWidth: view === "desktop" ? "100%" : "425px",
        maxHeight: view === "desktop" ? "100%" : "812px",
      }),
      [view]
    );

    return (
      <div
        className={cn(
          "overflow-hidden bg-white transition-[max-width,max-height,border-radius,box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[max-width,max-height,transform]",
          view === "desktop"
            ? "h-full w-full shadow-sm md:rounded-lg md:shadow-lg"
            : "mx-auto h-full w-full rounded-[28px] border border-gray-200 shadow-2xl"
        )}
        style={containerStyles}
      >
        <iframe
          src={src}
          title={t("preview")}
          style={iframeStyles}
          frameBorder={0}
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          scrolling="yes"
          loading="lazy"
          onLoad={onLoad}
          onError={onError}
        />
      </div>
    );
  }
);

OptimizedIframe.displayName = "OptimizedIframe";

export default function ProductDetails({ product }: { product: Product }) {
  const defaultView = product.target === "mobile" ? "mobile" : "desktop";
  const [view, setView] = useState<"desktop" | "mobile">(defaultView);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const t = useTranslations("list_product");

  const viewTitle = useMemo(() => {
    return view === "desktop" ? t("desktop_interface") : t("mobile_interface");
  }, [view, t]);

  const iframeSrc = useMemo(
    () => `/api/proxy?urlId=${product.id}`,
    [product.id]
  );

  const handleViewChange = useCallback(
    (newView: "desktop" | "mobile") => {
      if (newView !== view) {
        setView(newView);
        setIsLoading(false);
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
    <div className="flex h-[100dvh] min-h-screen flex-col overflow-hidden bg-background">
      <header className="sticky top-0 z-[1000] w-full shrink-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between gap-2 px-3 sm:px-6">
          <Logo />

          <div className="flex min-w-0 flex-1 justify-center px-1">
            <span className="truncate text-sm font-semibold sm:text-base md:text-lg">
              {viewTitle}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
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

      <main className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-gray-50 p-2 sm:p-4">
        {isLoading && (
          <div className="absolute inset-0 z-10">
            <IframeLoader />
          </div>
        )}

        {hasError && !isLoading && (
          <div className="absolute inset-0 z-10">
            <IframeError onRetry={handleRetry} />
          </div>
        )}

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
