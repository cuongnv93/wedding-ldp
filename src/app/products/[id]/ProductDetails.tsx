"use client";
import { useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import { Product } from "@/data/products";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="font-bold text-xl">
      <span className="text-primary">u</span>Wedding
    </Link>
  );
}

export default function ProductDetails({ product }: { product: Product }) {
  const [view, setView] = useState<"desktop" | "mobile">("desktop");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-[1000] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Logo />
          {/* Center content */}
          <div className="flex-1 flex justify-center">
            <span className="font-semibold text-lg">
              {view === "desktop" ? "Giao diện máy tính" : "Giao diện mobile"}
            </span>
          </div>
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              className={`p-2 rounded ${
                view === "desktop" ? "bg-primary/10 text-primary" : ""
              }`}
              onClick={() => setView("desktop")}
              title="Xem giao diện desktop"
            >
              <Monitor className="w-6 h-6" />
            </button>
            <button
              className={`p-2 rounded ${
                view === "mobile" ? "bg-primary/10 text-primary" : ""
              }`}
              onClick={() => setView("mobile")}
              title="Xem giao diện mobile"
            >
              <Smartphone className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex justify-center items-center bg-gray-50">
        {view === "desktop" ? (
          <div
            style={{ height: "calc(100vh - 65px)" }}
            className="w-full max-w-5xl rounded-lg shadow-lg overflow-hidden bg-white"
          >
            <iframe
              src={`/api/proxy?urlId=${product.id}`}
              title="Xem trước giao diện"
              className="w-full h-full"
              frameBorder={0}
              allowFullScreen
            />
          </div>
        ) : (
          <iframe
            src={`/api/proxy?urlId=${product.id}`}
            title="Xem trước giao diện"
            width="100%"
            height="calc(100vh - 65px)"
            style={{
              background: "white",
              width: "100%",
              height: "calc(100vh - 65px)",
              border: "none",
              display: "block",
              borderRadius: "1.25rem",
            }}
            frameBorder={0}
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        )}
      </main>
    </div>
  );
}
