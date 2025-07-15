"use client";
import { BadgeCheck, Map, Palette, Headset } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getBenefits = (t: any) => [
  {
    icon: <BadgeCheck className="h-10 w-10 text-primary" />,
    title: t("benefits_title_1"),
    description: t("benefits_desc_1"),
  },
  {
    icon: <Map className="h-10 w-10 text-primary" />,
    title: t("benefits_title_2"),
    description: t("benefits_desc_2"),
  },
  {
    icon: <Palette className="h-10 w-10 text-primary" />,
    title: t("benefits_title_3"),
    description: t("benefits_desc_3"),
  },
  {
    icon: <Headset className="h-10 w-10 text-primary" />,
    title: t("benefits_title_4"),
    description: t("benefits_desc_4"),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Benefits() {
  const t = useTranslations("benefits");
  const benefits = getBenefits(t);

  return (
    <section id="about" className="w-full py-12 md:py-24 bg-muted">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              {t("why_choose")}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("why_choose_desc")}
            </p>
          </div>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-3 rounded-full bg-primary/10 mb-4"
              >
                {benefit.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
