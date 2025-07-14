"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations("privacy");

  const listItems = [
    { titleKey: "list.title_1", descKey: "list.desc_1" },
    { titleKey: "list.title_2", descKey: "list.desc_2" },
    { titleKey: "list.title_3", descKey: "list.desc_3" },
    { titleKey: "list.title_4", descKey: "list.desc_4" },
    { titleKey: "list.title_5", descKey: "list.desc_5" },
  ];

  return (
    <>
      <Navbar />

      <main
        style={{ minHeight: "calc(100vh - 448px)" }}
        className="container mx-auto max-w-3xl py-12 px-4"
      >
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-2xl p-8 md:p-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-primary tracking-tight">
            {t("title")}
          </h1>
          <p className="mb-6 text-gray-700 leading-relaxed">{t("desc")}</p>
          <ol className="list-decimal ml-4 space-y-4 text-gray-700 text-base md:text-lg">
            {listItems.map((item, index) => (
              <li key={index} className="text-justify">
                {" "}
                {/* Sử dụng index làm key nếu thứ tự các mục không thay đổi và không có thêm/bớt */}
                <span className="font-semibold text-primary">
                  {t(item.titleKey)}
                </span>{" "}
                {t(item.descKey)}
              </li>
            ))}
          </ol>
          <p className="mt-8 text-gray-700">
            {t("contact")}{" "}
            <a
              href="mailto:uweeding.online@gmail.com"
              className="text-primary underline font-medium"
            >
              uweeding.online@gmail.com
            </a>
          </p>
        </motion.section>
      </main>

      <Footer />
    </>
  );
}
