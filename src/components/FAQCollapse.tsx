"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFaq = (t: any) => [
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
  const [selected, setSelected] = useState<number | null>(null);
  const t = useTranslations("faq");
  const faq = getFaq(t);

  const toggle = (id: number) => {
    setSelected(selected === id ? null : id);
  };

  return (
    <div className="w-100 pt-10 min-h-[500px] flex flex-col">
      <div className="container px-4">
        <div className="gap-8">
          <div className="bg-white max-w-full mx-auto border-t border-gray-200 shadow-lg rounded-lg overflow-auto">
            <div className="flex-grow">
              <ul className="shadow-box">
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
          </div>
        </div>
      </div>
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
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <li
      className={`relative border-b border-gray-200 ${
        isSelected ? "shadow-md" : ""
      }`}
    >
      <button
        type="button"
        className={`w-full px-6 py-6 text-left transition-colors duration-300 ${
          isSelected ? "bg-[#f2f4f7]" : "bg-white"
        }`}
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <b>{item.question}</b>
          <svg
            className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
              isSelected ? "rotate-180" : ""
            }`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </button>
      <div
        ref={contentRef}
        className="relative overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isSelected
            ? `${contentRef.current?.scrollHeight}px`
            : "0px",
        }}
      >
        <div className="px-6 py-6">
          <p>{item.answer}</p>
        </div>
      </div>
    </li>
  );
}
