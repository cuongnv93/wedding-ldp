"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
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
    duration: "Vĩnh viễn",
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

function FeatureCell({ value }: { value?: boolean | string }) {
  if (typeof value === "string") {
    return (
      <span className="inline-block text-sm text-gray-600 font-medium">
        {value}
      </span>
    );
  }

  return value ? (
    <CheckCircle
      className="w-5 h-5 text-primary"
      aria-hidden="true"
    />
  ) : (
    <X
      className="w-5 h-5 text-gray-300"
      aria-hidden="true"
    />
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: delay,
    },
  }),
};

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.08 },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const headVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const thVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function PricePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto py-12 px-4 flex-grow">
        <motion.header
          className="max-w-3xl mx-auto text-center mb-10"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          <motion.h1
            variants={titleVariants}
            className="text-3xl sm:text-4xl font-bold text-primary"
          >
            Bảng giá thiệp cưới online uWedding
          </motion.h1>
          <motion.p variants={titleVariants} className="mt-3 text-gray-600">
            Chọn gói dịch vụ thiệp cưới online phù hợp với phong cách và ngân sách của bạn — so sánh tính năng chi tiết giữa các gói.
          </motion.p>
        </motion.header>

        {/* Desktop matrix with animated rows */}
        <section className="hidden md:block overflow-x-auto">
          <table className="w-full table-fixed border-collapse bg-white rounded-lg shadow">
            <motion.thead
              initial="hidden"
              animate="visible"
              variants={headVariants}
            >
              <motion.tr className="bg-gray-50" variants={headVariants}>
                <motion.th
                  className="w-1/3 text-left p-4"
                  variants={thVariants}
                />
                {PLANS.map((p) => (
                  <motion.th
                    key={p.id}
                    variants={thVariants}
                    className={`text-center p-4 align-top ${
                      p.highlight
                        ? "bg-gradient-to-b from-primary/10 to-transparent"
                        : ""
                    }`}
                  >
                    <motion.div
                      variants={thVariants}
                      className="text-lg font-semibold text-primary"
                    >
                      {p.name}
                    </motion.div>
                    <motion.div
                      variants={thVariants}
                      className="mt-2 text-2xl font-bold text-gray-900"
                    >
                      {p.price}
                    </motion.div>
                    <motion.div
                      variants={thVariants}
                      className="mt-1 text-sm text-gray-600"
                    >
                      {p.duration ?? ""}
                    </motion.div>
                  </motion.th>
                ))}
              </motion.tr>
            </motion.thead>

            <motion.tbody
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              custom={0.12}
            >
              {FEATURES.map((f) => (
                <motion.tr
                  key={f.key}
                  className="border-t"
                  variants={rowVariants}
                >
                  <td className="p-4 text-sm text-gray-700 font-medium">
                    {f.label}
                  </td>
                  {PLANS.map((p) => {
                    const val = p.features[f.key];
                    return (
                      <td key={p.id + f.key} className="p-4 text-center">
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

        {/* Mobile stacked cards with staggered animation */}
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
              className="bg-white rounded-lg shadow p-4"
              variants={rowVariants}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-primary">
                    {p.name}
                  </h3>
                  <div className="text-xl font-bold mt-1">{p.price}</div>
                  <div className="text-sm text-gray-600 mt-1">{p.duration}</div>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {FEATURES.map((f) => (
                  <li
                    key={f.key}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <FeatureCell value={p.features[f.key]} />
                    <span>{f.label}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
