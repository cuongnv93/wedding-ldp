"use client";

import { useState, useRef } from "react";

const faq = [
  {
    id: 1,
    question: "Làm thế nào để tạo thiệp cưới online?",
    answer:
      "Bạn có thể tạo thiệp cưới online bằng cách chọn mẫu thiệp và tùy chỉnh nội dung theo ý muốn. Không cần phải biết về thiết kế hay lập trình để tạo thiệp cưới online.",
  },
  {
    id: 2,
    question: "Làm thế nào để gửi thiệp cưới điện tử?",
    answer:
      "Sau khi tạo thiệp, bạn có thể gửi thiệp qua email hoặc chia sẻ online với bạn bè và người thân. Hoặc in mã QR thiệp lên thiệp giấy và chia sẻ cho mọi người.",
  },
  {
    id: 3,
    question: "Có những mẫu thiệp cưới nào để lựa chọn?",
    answer:
      "Có nhiều mẫu thiệp cưới đẹp và đa dạng để bạn lựa chọn, từ thiệp truyền thống đến thiệp hiện đại.",
  },
  {
    id: 4,
    question: "Tôi có thể tùy chỉnh nội dung và hình ảnh trên thiệp không?",
    answer:
      "Đúng vậy, bạn có thể tùy chỉnh nội dung và hình ảnh, thậm chí là thêm video cưới và địa điểm tổ chức trên thiệp theo ý muốn để tạo nên một thiệp cưới độc đáo.",
  },
  {
    id: 5,
    question: "Tôi có thể in thiệp cưới điện tử không?",
    answer:
      "Thiệp cưới điện tử thường được gửi qua email hoặc chia sẻ trực tuyến, nên không cần in thiệp.",
  },
];

export default function FAQCollapse() {
  const [selected, setSelected] = useState<number | null>(null);

  const toggle = (id: number) => {
    setSelected(selected === id ? null : id);
  };

  return (
    <div className="w-100 pt-10">
      <div className="container px-4">
        <div className="gap-8">
          <div className="bg-white max-w-full mx-auto border border-gray-200 shadow-lg rounded-lg overflow-auto">
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
