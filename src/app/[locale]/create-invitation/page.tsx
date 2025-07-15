"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Phone, Facebook, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSteps = (t: any) => [
  {
    title: t("step_title_1"),
    content: (
      <>
        <Link href="/products" className="text-primary underline">
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
        <a href="tel:0355565741" className="underline text-primary">
          0355 565 741
        </a>
        , {t("step_content_2_2")}{" "}
        <a
          href="https://zalo.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-primary"
        >
          <MessageCircle className="inline-block mx-1" size={18} /> Zalo
        </a>{" "}
        {t("step_content_2_3")}{" "}
        <a
          href="https://facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-primary"
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

export default function CreateInvitationPage() {
  const t = useTranslations("create_invitation");
  const steps = getSteps(t);

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
          <div className="space-y-6 text-gray-700 text-base md:text-lg">
            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + idx * 0.25,
                  ease: "easeOut",
                }}
              >
                <span className="font-semibold text-primary">{step.title}</span>
                <br />
                {step.content}
              </motion.div>
            ))}
          </div>
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
