// app/[locale]/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import "./layout.css";
import ClientLayout from "../../components/ClientLayout";
import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
  title: "Thiệp cưới online hiện đại – uWedding | Thiết kế đẹp, dễ chia sẻ",
  description:
    "uWedding – Thiệp cưới online hiện đại, thiết kế cá nhân hóa dễ dàng. Giao diện đẹp, đầy đủ tính năng, chia sẻ tiện lợi qua link & QR.",
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { children } = props;
  const { locale } = await props.params;

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
