"use client";

import { motion } from "framer-motion";
import { Phone, Facebook, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";

interface StepItem {
  title: string;
  content: React.ReactNode;
}

const getSteps = (
  t: (key: string) => string,
  currentLocale: string
): StepItem[] => [
  {
    title: t("step_title_1"),
    content: (
      <>
        <Link
          href={`/${currentLocale}/products`}
          className="text-primary underline font-medium"
        >
          {t("step_content_1_1")}
        </Link>{" "}
        {t("step_content_1_2")}
      </>
    ),
  },
  {
    title: t("step_title_2"),
    content: (
      <>
        {t("step_content_2_1")}{" "}
        <Phone className="inline-block mx-1" size={18} />{" "}
        <a href="tel:0355565741" className="underline text-primary font-medium">
          0355 565 741
        </a>
        , {t("step_content_2_2")}{" "}
        <a
          href="https://zalo.me/0355565741"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-primary font-medium"
        >
          <MessageCircle className="inline-block mx-1" size={18} /> Zalo
        </a>{" "}
        {t("step_content_2_3")}{" "}
        <a
          href="https://facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-primary font-medium"
        >
          <Facebook className="inline-block mx-1" size={18} /> Facebook
        </a>
        .
      </>
    ),
  },
  {
    title: t("step_title_3"),
    content: t("step_content_3"),
  },
  {
    title: t("step_title_4"),
    content: t("step_content_4"),
  },
  {
    title: t("step_title_5"),
    content: t("step_content_5"),
  },
];

export default function CreateInvitationClient() {
  const t = useTranslations("create_invitation");
  const currentLocale = useLocale();
  const steps = getSteps(t, currentLocale);

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
        <div className="space-y-6 text-slate-700 text-base md:text-lg">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.1 + idx * 0.1,
                ease: "easeOut",
              }}
              className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100"
            >
              <h2 className="font-bold text-primary text-base sm:text-lg mb-1">
                {step.title}
              </h2>
              <div className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {step.content}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 pt-6 border-t border-slate-100 text-slate-700 text-sm sm:text-base text-center">
          <span>{t("contact")} </span>
          <a
            href="mailto:uwedding.online@gmail.com"
            className="text-primary underline font-semibold"
          >
            uwedding.online@gmail.com
          </a>
        </div>
      </motion.section>
    </div>
  );
}
