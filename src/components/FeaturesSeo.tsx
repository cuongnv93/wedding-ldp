"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  MapPin,
  CalendarCheck2,
  Image as ImageIcon,
  Music2,
  QrCode,
  UserCheck,
  Sparkles,
} from "lucide-react";

const features = [
  {
    key: "feat_1",
    icon: MapPin,
    gradient: "from-rose-500/15 via-rose-500/5 to-transparent",
    iconBg: "bg-rose-50 text-rose-600 border-rose-200/60",
  },
  {
    key: "feat_2",
    icon: CalendarCheck2,
    gradient: "from-pink-500/15 via-pink-500/5 to-transparent",
    iconBg: "bg-pink-50 text-pink-600 border-pink-200/60",
  },
  {
    key: "feat_3",
    icon: ImageIcon,
    gradient: "from-amber-500/15 via-amber-500/5 to-transparent",
    iconBg: "bg-amber-50 text-amber-600 border-amber-200/60",
  },
  {
    key: "feat_4",
    icon: Music2,
    gradient: "from-violet-500/15 via-violet-500/5 to-transparent",
    iconBg: "bg-violet-50 text-violet-600 border-violet-200/60",
  },
  {
    key: "feat_5",
    icon: QrCode,
    gradient: "from-emerald-500/15 via-emerald-500/5 to-transparent",
    iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
  },
  {
    key: "feat_6",
    icon: UserCheck,
    gradient: "from-sky-500/15 via-sky-500/5 to-transparent",
    iconBg: "bg-sky-50 text-sky-600 border-sky-200/60",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export default function FeaturesSeo() {
  const t = useTranslations("features_seo");

  return (
    <section className="w-full py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-rose-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3.5 py-1 text-xs font-semibold text-rose-700 border border-rose-200/70 mb-4 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>uWedding Smart Features</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {t("title")}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
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
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            const title = t(`${feat.key}_title`);
            const desc = t(`${feat.key}_desc`);

            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(244,63,94,0.08)] hover:border-rose-200/90 transition-all duration-300 flex flex-col items-start"
              >
                <div
                  className={`p-3.5 rounded-2xl border ${feat.iconBg} mb-5 shadow-xs transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5 group-hover:text-primary transition-colors">
                  {title}
                </h3>

                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
