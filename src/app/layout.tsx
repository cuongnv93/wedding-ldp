import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./layout.css";
import { CartProvider } from "../contexts/cart-context";
import { Toaster } from "sonner";
import GlobalHeartEffect from "@/components/GlobalHeartEffect";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Uwedding - Thiệp cưới online hiện đại",
  description:
    "Uwedding - Thiệp cưới online hiện đại, sang trọng, thiết kế cá nhân hóa, đặt thiệp cưới trực tuyến dễ dàng, giao hàng toàn quốc.",
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
