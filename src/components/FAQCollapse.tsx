"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

const getFaq = (t: (key: string) => string) => [
  {
    id: 1,
    question: t("question_1"),
    answer: t("answer_1"),
  },
  {
    id: 2,
    question: t("question_2"),
    answer: t("answer_2"),
  },
  {
    id: 3,
    question: t("question_3"),
    answer: t("answer_3"),
  },
  {
    id: 4,
    question: t("question_4"),
    answer: t("answer_4"),
  },
  {
    id: 5,
    question: t("question_5"),
    answer: t("answer_5"),
  },
];

export default function FAQCollapse() {
  const [selected, setSelected] = useState<number | null>(1);
  const t = useTranslations("faq");
  const faq = getFaq(t);

  const toggle = (id: number) => {
    setSelected(selected === id ? null : id);
  };

  return (
    <div className="w-full pt-4 max-w-2xl mx-auto">
      <ul className="space-y-3.5">
        {faq.map((item) => (
          <FAQItem
            key={item.id}
            item={item}
            isSelected={selected === item.id}
            onToggle={() => toggle(item.id)}
          />
        ))}
      </ul>
    </div>
  );
}

function FAQItem({
  item,
  isSelected,
  onToggle,
}: {
  item: { id: number; question: string; answer: string };
  isSelected: boolean;
  onToggle: () => void;
}) {
  return (
    <li
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        isSelected
          ? "border-rose-300 bg-rose-50/25 shadow-md shadow-rose-100/40"
          : "border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-xs"
      }`}
    >
      <button
        type="button"
        className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
        onClick={onToggle}
        aria-expanded={isSelected}
      >
        <span className={`text-sm sm:text-base font-bold transition-colors ${
          isSelected ? "text-rose-600" : "text-slate-900"
        }`}>
          {item.question}
        </span>
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
            isSelected
              ? "bg-rose-500 text-white rotate-180"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </div>
      </button>

      {isSelected && (
        <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-rose-100/60 mt-1">
          <p className="pt-3">{item.answer}</p>
        </div>
      )}
    </li>
  );
}
