"use client";

import { memo, useCallback, useMemo, useState, useEffect } from "react";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  ExternalLink,
  Info,
  Loader2,
  Monitor,
  RotateCw,
  Smartphone,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Logo = memo(() => {
  const currentLocale = useLocale();

  return (
    <Link
      href={`/${currentLocale}`}
      className="shrink-0 text-lg font-bold transition-opacity hover:opacity-80 sm:text-xl"
    >
      <span className="text-primary">u</span>Wedding
    </Link>
  );
});

Logo.displayName = "Logo";

const IframeLoader = memo(() => (
  <div className="flex h-full w-full items-center justify-center bg-gray-50/90 backdrop-blur-sm">
    <div className="text-center p-6 rounded-2xl bg-white shadow-lg border border-gray-100">
      <Loader2 className="mx-auto mb-3 h-8 w-8 animate-spin text-primary" />
      <p className="text-sm font-medium text-gray-700">Đang tải bản xem trước...</p>
      <p className="text-xs text-muted-foreground mt-1">Đang đồng bộ giao diện thiệp cưới</p>
    </div>
  </div>
));

IframeLoader.displayName = "IframeLoader";

const IframeError = memo(({ onRetry }: { onRetry: () => void }) => {
  const t = useTranslations("list_product");

  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-50">
      <div className="max-w-sm px-6 py-8 text-center bg-white rounded-2xl shadow-lg border border-gray-100">
        <AlertCircle className="mx-auto mb-3 h-10 w-10 text-amber-500" />
        <h3 className="text-base font-semibold text-gray-900 mb-1">{t("unable_load")}</h3>
        <p className="mb-4 text-xs text-gray-500">
          Kết nối tới bản demo có thể bị chậm. Bạn hãy bấm thử lại hoặc mở trực tiếp trong tab mới.
        </p>
        <div className="flex gap-2 justify-center">
          <Button onClick={onRetry} size="sm" className="gap-1.5">
            <RotateCw className="h-4 w-4" />
            {t("try")}
          </Button>
        </div>
      </div>
    </div>
  );
});

IframeError.displayName = "IframeError";

export default function ProductDetails({
  product,
  relatedProducts = [],
}: {
  product: Product;
  relatedProducts?: Product[];
}) {
  const defaultView = product.target === "mobile" ? "mobile" : "desktop";
  const [view, setView] = useState<"desktop" | "mobile">(defaultView);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [screenWidth, setScreenWidth] = useState(1200);

  const t_desc = useTranslations("item_desc");
  const currentLocale = useLocale();

  useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const isRealMobileScreen = screenWidth < 768;

  const iframeSrc = useMemo(
    () => `/api/proxy?urlId=${product.id}`,
    [product.id]
  );

  const handleViewChange = useCallback((newView: "desktop" | "mobile") => {
    setView(newView);
    setIsLoading(false);
    setHasError(false);
  }, []);

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
    const iframe = document.getElementById("uwedding-preview-iframe") as HTMLIFrameElement | null;
    if (iframe) {
      const currentSrc = iframe.src;
      iframe.src = "";
      setTimeout(() => {
        iframe.src = currentSrc;
      }, 100);
    }
  }, []);

  // Scale factor for rendering desktop layout on a small mobile device
  const mobileDesktopScale = useMemo(() => {
    if (!isRealMobileScreen || view !== "desktop") return 1;
    const availableWidth = screenWidth - 16;
    return Math.min(1, Math.max(0.3, availableWidth / 1200));
  }, [isRealMobileScreen, screenWidth, view]);

  return (
    <div className="flex h-[100dvh] min-h-screen flex-col overflow-hidden bg-slate-100">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-[1000] w-full shrink-0 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-xs">
        <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between gap-2 px-3 sm:px-6">
          {/* Back & Logo & H1 */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
            <Button asChild variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 shrink-0" title="Quay lại danh sách mẫu">
              <Link href={`/${currentLocale}/products`}>
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </Button>
            <Logo />
            <div className="hidden xl:block h-4 w-px bg-slate-200 shrink-0" />
            <h1 className="sr-only xl:not-sr-only xl:block text-xs font-semibold text-slate-700 truncate max-w-[180px]">
              {currentLocale === "vi"
                ? `Mẫu thiệp cưới online ${product.name}`
                : `Online wedding invitation ${product.name}`}
            </h1>
          </div>

          {/* Segmented Control Switcher: PC vs Mobile */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 shadow-inner">
            <button
              type="button"
              onClick={() => handleViewChange("desktop")}
              className={cn(
                "flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200",
                view === "desktop"
                  ? "bg-white text-primary shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              )}
              title="Xem giao diện máy tính (PC)"
              aria-label="Xem giao diện máy tính"
              aria-pressed={view === "desktop"}
            >
              <Monitor className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Máy tính</span>
              <span className="sm:hidden text-xs font-semibold">PC</span>
            </button>
            <button
              type="button"
              onClick={() => handleViewChange("mobile")}
              className={cn(
                "flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200",
                view === "mobile"
                  ? "bg-white text-primary shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              )}
              title="Xem giao diện điện thoại (Mobile)"
              aria-label="Xem giao diện điện thoại"
              aria-pressed={view === "mobile"}
            >
              <Smartphone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Điện thoại</span>
              <span className="sm:hidden text-xs font-semibold">Mobile</span>
            </button>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              className={cn("h-8 sm:h-9 px-2 sm:px-3 text-xs gap-1", showInfoPanel ? "bg-primary/10 text-primary border-primary" : "")}
              onClick={() => setShowInfoPanel(!showInfoPanel)}
              title="Chi tiết mẫu thiệp"
            >
              <Info className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Chi tiết</span>
            </Button>

            <a
              href={product.linkRedirect}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex"
              title="Mở toàn màn hình trong tab mới"
            >
              <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-600">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>

            <Button asChild size="sm" className="h-8 sm:h-9 text-xs sm:text-sm font-semibold shadow-sm">
              <Link href={`/${currentLocale}/create-invitation`}>
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                <span>Dùng mẫu này</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Preview Area */}
      <main className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden p-2 sm:p-4">
        {isLoading && (
          <div className="absolute inset-0 z-20">
            <IframeLoader />
          </div>
        )}

        {hasError && !isLoading && (
          <div className="absolute inset-0 z-20">
            <IframeError onRetry={handleRetry} />
          </div>
        )}

        {/* Viewport Frame */}
        {view === "mobile" ? (
          // MOBILE VIEW
          isRealMobileScreen ? (
            // On a real mobile phone: fill screen seamlessly
            <div className="h-full w-full bg-white rounded-lg overflow-hidden shadow-md">
              <iframe
                id="uwedding-preview-iframe"
                src={iframeSrc}
                title={`${product.name} Mobile Preview`}
                className="w-full h-full border-0 block"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                loading="eager"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
              />
            </div>
          ) : (
            // On Desktop: Realistic smartphone mockup frame
            <div className="relative mx-auto flex h-full max-h-[820px] w-[390px] flex-col rounded-[44px] border-[10px] border-slate-900 bg-slate-900 shadow-2xl transition-all duration-300">
              {/* Dynamic Island Speaker Pill */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 h-4 w-28 rounded-full bg-black flex items-center justify-end pr-2 pointer-events-none">
                <div className="h-2 w-2 rounded-full bg-blue-950/80" />
              </div>
              <div className="h-full w-full overflow-hidden rounded-[34px] bg-white">
                <iframe
                  id="uwedding-preview-iframe"
                  src={iframeSrc}
                  title={`${product.name} Mobile Preview`}
                  className="w-full h-full border-0 block"
                  allowFullScreen
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  loading="eager"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                />
              </div>
            </div>
          )
        ) : (
          // DESKTOP VIEW
          isRealMobileScreen ? (
            // On a real phone viewing Desktop: Scale a 1200px desktop canvas to fit cleanly
            <div
              className="overflow-hidden rounded-lg bg-white shadow-lg border border-slate-200"
              style={{
                width: `${screenWidth - 16}px`,
                height: `${(screenWidth - 16) * 1.5}px`,
              }}
            >
              <div
                style={{
                  width: "1200px",
                  height: `${(screenWidth - 16) * 1.5 / mobileDesktopScale}px`,
                  transform: `scale(${mobileDesktopScale})`,
                  transformOrigin: "top left",
                }}
              >
                <iframe
                  id="uwedding-preview-iframe"
                  src={iframeSrc}
                  title={`${product.name} Desktop Preview`}
                  className="w-full h-full border-0 block"
                  allowFullScreen
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  loading="eager"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                />
              </div>
            </div>
          ) : (
            // On PC/Tablet: Full responsive desktop canvas
            <div className="h-full w-full rounded-xl bg-white shadow-md border border-slate-200/80 overflow-hidden transition-all duration-300">
              <iframe
                id="uwedding-preview-iframe"
                src={iframeSrc}
                title={`${product.name} Desktop Preview`}
                className="w-full h-full border-0 block"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                loading="eager"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
              />
            </div>
          )
        )}
      </main>

      {/* Slide-over Information Drawer */}
      {showInfoPanel && (
        <aside className="fixed inset-y-0 right-0 z-[1100] w-full sm:w-96 bg-white shadow-2xl border-l border-slate-200 flex flex-col p-6 animate-in slide-in-from-right duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">{product.name}</h2>
              <div className="flex items-center gap-1.5 text-xs text-amber-500 mt-0.5">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-slate-800">5.0</span>
                <span className="text-slate-400">({product.reviews || 88} đánh giá)</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowInfoPanel(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Đóng bảng thông tin"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-5 text-sm">
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Mô tả thiết kế</h3>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                {product.description ? t_desc(product.description) : "Mẫu thiệp cưới online cao cấp, kết hợp hài hòa phong cách hiện đại và lãng mạn cho ngày trọng đại."}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Tính năng đi kèm</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                  Bản đồ chỉ đường Google Maps chính xác
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                  Đếm ngược ngày cưới & Lưu lịch (Save The Date)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                  Nhạc nền đám cưới du dương tự động phát
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                  Hộp mừng cưới & Mã QR tiện lợi
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                  Xác nhận tham dự (RSVP) & Sổ lưu bút online
                </li>
              </ul>
            </div>

            {relatedProducts.length > 0 && (
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Mẫu cùng phong cách</h3>
                <div className="grid grid-cols-2 gap-2">
                  {relatedProducts.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/${currentLocale}/products/${rel.id}`}
                      className="group p-2 rounded-lg border border-slate-100 hover:border-primary/40 bg-slate-50/50 hover:bg-white transition-all text-xs"
                      onClick={() => setShowInfoPanel(false)}
                    >
                      <span className="font-medium text-slate-800 group-hover:text-primary block truncate">
                        {rel.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground capitalize">
                        {rel.type || rel.target}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            <Button asChild className="w-full font-semibold shadow-md">
              <Link href={`/${currentLocale}/create-invitation`}>
                Đặt làm thiệp mẫu này
              </Link>
            </Button>
            <a
              href="https://zalo.me/0355565741"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button variant="outline" className="w-full text-xs">
                Tư vấn nhanh qua Zalo
              </Button>
            </a>
          </div>
        </aside>
      )}
    </div>
  );
}
