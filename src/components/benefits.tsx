"use client";
import { BadgeCheck, Map, Palette, Headset } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const getBenefits = (t: (key: string) => string) => [
  {
    icon: <BadgeCheck className="h-8 w-8 text-primary" />,
    title: t("benefits_title_1"),
    description: t("benefits_desc_1"),
  },
  {
    icon: <Map className="h-8 w-8 text-primary" />,
    title: t("benefits_title_2"),
    description: t("benefits_desc_2"),
  },
  {
    icon: <Palette className="h-8 w-8 text-primary" />,
    title: t("benefits_title_3"),
    description: t("benefits_desc_3"),
  },
  {
    icon: <Headset className="h-8 w-8 text-primary" />,
    title: t("benefits_title_4"),
    description: t("benefits_desc_4"),
  },
];

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

export default function Benefits() {
  const t = useTranslations("benefits");
  const benefits = getBenefits(t);

  return (
    <section id="about" className="w-full py-12 md:py-24 bg-slate-50/60 border-t border-slate-100">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto"
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900">
              {t("why_choose")}
            </h2>
            <p className="max-w-[750px] text-muted-foreground text-sm sm:text-base leading-relaxed">
              {t("why_choose_desc")}
            </p>
          </div>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center p-6 sm:p-7 bg-white rounded-3xl border border-slate-200/80 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300"
            >
              <div className="p-3.5 rounded-2xl bg-rose-50 text-primary mb-4 transition-transform duration-300 group-hover:scale-110">
                {benefit.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-slate-900">{benefit.title}</h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
