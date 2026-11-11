"use client";

import { motion } from "framer-motion";
import AnimatedNumber from "./animatedNumber";

interface HeroStatisticsProps {
  templateLabel: string;
  customersLabel: string;
  partnersLabel: string;
}

export default function HeroStatistics({
  templateLabel,
  customersLabel,
  partnersLabel,
}: HeroStatisticsProps) {
  const stats = [
    { value: 50, suffix: "+", label: templateLabel },
    { value: 200, suffix: "+", label: customersLabel },
    { value: 50, suffix: "+", label: partnersLabel },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-row items-center justify-between sm:justify-start w-full sm:w-auto sm:gap-6 lg:gap-8 mt-6 pt-2"
    >
      {stats.map((stat, idx) => (
        <div key={idx} className="flex items-center sm:gap-6 lg:gap-8 flex-1 sm:flex-initial justify-center sm:justify-start">
          <motion.div
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex flex-col items-center sm:items-start text-center sm:text-left cursor-default select-none group px-1 sm:px-0"
          >
            <div className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 group-hover:text-primary transition-colors leading-none flex items-baseline">
              <AnimatedNumber value={stat.value} duration={1600} />
              <span className="text-primary ml-0.5">{stat.suffix}</span>
            </div>
            <span className="text-[10px] sm:text-xs lg:text-sm font-medium text-slate-500 mt-1.5 whitespace-nowrap">
              {stat.label}
            </span>
          </motion.div>

          {idx < stats.length - 1 && (
            <div
              className="h-8 sm:h-10 w-px bg-slate-300/80 mx-2 sm:mx-0 shrink-0 self-center"
              aria-hidden="true"
            />
          )}
        </div>
      ))}
    </motion.div>
  );
}
