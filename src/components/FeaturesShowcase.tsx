"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  MapPin,
  UserCheck,
  Camera,
  Music,
  QrCode,
  Sparkles,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function FeaturesShowcase() {
  const t = useTranslations("features_seo");

  const features = [
    {
      icon: MapPin,
      title: t("feat_1_title"),
      desc: t("feat_1_desc"),
    },
    {
      icon: UserCheck,
      title: t("feat_2_title"),
      desc: t("feat_2_desc"),
    },
    {
      icon: Camera,
      title: t("feat_3_title"),
      desc: t("feat_3_desc"),
    },
    {
      icon: Music,
      title: t("feat_4_title"),
      desc: t("feat_4_desc"),
    },
    {
      icon: QrCode,
      title: t("feat_5_title"),
      desc: t("feat_5_desc"),
    },
    {
      icon: Sparkles,
      title: t("feat_6_title"),
      desc: t("feat_6_desc"),
    },
  ];

  return (
    <section id="features" className="w-full py-16 md:py-24 bg-white border-y border-gray-100">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            uWedding Interactive Features
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            {t("desc")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <motion.article
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative flex flex-col p-6 rounded-2xl bg-gray-50/70 border border-gray-100/80 transition-all duration-200 hover:bg-white hover:shadow-xl hover:border-primary/20"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {feat.desc}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
