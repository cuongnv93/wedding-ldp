import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./layout.css";
import ClientLayout from "../components/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thiệp cưới online hiện đại – uWedding | Thiết kế đẹp, dễ chia sẻ",
  description:
    "uWedding – Thiệp cưới online hiện đại, thiết kế cá nhân hóa dễ dàng. Giao diện đẹp, đầy đủ tính năng, chia sẻ tiện lợi qua link & QR.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="thiệp cưới online hiện đại,thiệp cưới thiết kế riêng,thiệp cưới cá nhân hóa đẹp,thiệp cưới online dễ sử dụng,mẫu thiệp cưới online đẹp,thiệp cưới kỹ thuật số tiện lợi,gửi thiệp cưới online qua link,tạo thiệp cưới online nhanh,thiệp cưới online có đếm ngược"
        />
        <meta
          property="og:title"
          content="Thiệp cưới online hiện đại – uWedding | Thiết kế đẹp, dễ chia sẻ"
        />
        <meta
          property="og:description"
          content="uWedding – Thiệp cưới online hiện đại, thiết kế cá nhân hóa dễ dàng. Giao diện đẹp, đầy đủ tính năng, chia sẻ tiện lợi qua link & QR."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:url" content="https://uwedding.online" />
        <meta property="og:site_name" content="uWedding" />
        <meta property="og:image" content="/favicon.ico" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Thiệp cưới online hiện đại – uWedding | Thiết kế đẹp, dễ chia sẻ"
        />
        <meta
          name="twitter:description"
          content="uWedding – Thiệp cưới online hiện đại, thiết kế cá nhân hóa dễ dàng. Giao diện đẹp, đầy đủ tính năng, chia sẻ tiện lợi qua link & QR."
        />
        <meta name="twitter:image" content="/favicon.ico" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-0X4F90SB0Q"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-0X4F90SB0Q');
      `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
