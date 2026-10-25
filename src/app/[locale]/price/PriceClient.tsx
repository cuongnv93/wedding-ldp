"use client";

import { motion } from "framer-motion";
import { CheckCircle, X } from "lucide-react";

type Plan = {
  id: string;
  name: string;
  price: string;
  features: Record<string, boolean | string>;
  duration?: string;
  highlight?: boolean;
};

const FEATURES = [
  { key: "custom_design", label: "Thiết kế tùy chỉnh theo yêu cầu" },
  { key: "qr_link", label: "Link & Mã QR chia sẻ không giới hạn" },
  { key: "countdown", label: "Đếm ngược ngày cưới & Lưu lịch (Save The Date)" },
  { key: "guestbook", label: "Sổ lưu bút & Xác nhận tham dự (RSVP)" },
  { key: "music", label: "Nhạc nền đám cưới tùy chọn" },
  { key: "photos", label: "Album ảnh cưới trực tuyến sắc nét" },
  { key: "analytics", label: "Thống kê lượt xem & phản hồi khách mời" },
];

const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: "Miễn phí",
    duration: "1 năm",
    features: {
      custom_design: false,
      qr_link: true,
      countdown: false,
      guestbook: true,
      music: false,
      photos: false,
      analytics: false,
    },
  },
  {
    id: "pro",
    name: "Pro",
    price: "199.000₫",
    duration: "2 năm",
    highlight: true,
    features: {
      custom_design: true,
      qr_link: true,
      countdown: true,
      guestbook: true,
      music: true,
      photos: false,
      analytics: false,
    },
  },
  {
    id: "premium",
    name: "Premium",
    price: "399.000₫",
    duration: "Trọn đời",
    features: {
      custom_design: true,
      qr_link: true,
      countdown: true,
      guestbook: true,
      music: true,
      photos: true,
      analytics: true,
    },
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (stagger = 0.08) => ({
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.1,
    },
  }),
};

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const thVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

function FeatureCell({ value }: { value: boolean | string | undefined }) {
  if (value === true) {
    return <CheckCircle className="text-green-500 h-5 w-5" />;
  }
  if (value === false || value === undefined) {
    return <X className="text-gray-300 h-5 w-5" />;
  }
  return <span className="text-sm font-medium">{value}</span>;
}

export default function PriceClient() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12">
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Bảng Giá Dịch Vụ Thiệp Cưới Online
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground text-sm sm:text-base">
          Lựa chọn gói thiệp cưới trực tuyến phù hợp nhất cho ngày trọng đại của
          bạn với chi phí tiết kiệm và đầy đủ tính năng thông minh.
        </p>
      </header>

      {/* Desktop table */}
      <section className="hidden md:block overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-200">
        <table className="w-full text-left border-collapse">
          <motion.thead
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            custom={0.06}
          >
            <motion.tr className="bg-slate-50/80">
              <th className="p-4 w-1/4 text-sm font-semibold text-slate-700">
                Tính năng
              </th>
              {PLANS.map((p) => (
                <motion.th
                  key={p.id}
                  className={`p-4 text-center ${
                    p.highlight ? "bg-rose-50/50" : ""
                  }`}
                  variants={thVariants}
                >
                  <div className="text-lg font-semibold text-primary">
                    {p.name}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-gray-900">
                    {p.price}
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    {p.duration ?? ""}
                  </div>
                </motion.th>
              ))}
            </motion.tr>
          </motion.thead>

          <motion.tbody
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            custom={0.08}
          >
            {FEATURES.map((f) => (
              <motion.tr key={f.key} className="border-t" variants={rowVariants}>
                <td className="p-4 text-sm text-gray-700 font-medium">
                  {f.label}
                </td>
                {PLANS.map((p) => {
                  const val = p.features[f.key];
                  return (
                    <td
                      key={p.id + f.key}
                      className={`p-4 text-center ${
                        p.highlight ? "bg-rose-50/30" : ""
                      }`}
                    >
                      <span className="inline-flex items-center justify-center">
                        <FeatureCell value={val} />
                      </span>
                    </td>
                  );
                })}
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </section>

      {/* Mobile stacked cards */}
      <motion.section
        className="md:hidden flex flex-col gap-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        custom={0.06}
      >
        {PLANS.map((p) => (
          <motion.article
            key={p.id}
            className={`rounded-2xl shadow-sm p-5 border ${
              p.highlight
                ? "bg-rose-50/40 border-rose-200"
                : "bg-white border-slate-200"
            }`}
            variants={rowVariants}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-primary">{p.name}</h2>
                <div className="text-2xl font-extrabold mt-1 text-slate-900">
                  {p.price}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{p.duration}</div>
              </div>
            </div>
            <ul className="mt-4 space-y-2.5">
              {FEATURES.map((f) => (
                <li
                  key={f.key}
                  className="flex items-center gap-2.5 text-sm text-slate-700"
                >
                  <FeatureCell value={p.features[f.key]} />
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.section>
    </div>
  );
}
