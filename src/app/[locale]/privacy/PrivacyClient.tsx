"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function PrivacyClient() {
  const t = useTranslations("privacy");

  const listItems = [
    { titleKey: "list.title_1", descKey: "list.desc_1" },
    { titleKey: "list.title_2", descKey: "list.desc_2" },
    { titleKey: "list.title_3", descKey: "list.desc_3" },
    { titleKey: "list.title_4", descKey: "list.desc_4" },
    { titleKey: "list.title_5", descKey: "list.desc_5" },
  ];

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-3xl bg-white p-6 sm:p-10 border border-slate-200 shadow-sm"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-center text-primary tracking-tight">
          {t("title")}
        </h1>
        <p className="mb-6 text-slate-700 leading-relaxed text-base sm:text-lg">
          {t("desc")}
        </p>
        <ol className="list-decimal ml-4 space-y-4 text-slate-700 text-base md:text-lg">
          {listItems.map((item, index) => (
            <li key={index} className="text-justify leading-relaxed">
              <span className="font-semibold text-primary">
                {t(item.titleKey)}
              </span>{" "}
              {t(item.descKey)}
            </li>
          ))}
        </ol>
        <p className="mt-8 pt-6 border-t border-slate-100 text-slate-700 text-center text-sm sm:text-base">
          {t("contact")}{" "}
          <a
            href="mailto:uwedding.online@gmail.com"
            className="text-primary underline font-semibold"
          >
            uwedding.online@gmail.com
          </a>
        </p>
      </motion.section>
    </div>
  );
}
