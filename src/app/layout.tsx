import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./layout.css";
import { CartProvider } from "../contexts/cart-context";
import { Toaster } from "sonner";
import GlobalHeartEffect from "@/components/GlobalHeartEffect";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SPRINTX - Giày thể thao chính hãng",
  description:
    "Cửa hàng giày thể thao chính hãng với đa dạng mẫu mã và kích cỡ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <GlobalHeartEffect />
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
