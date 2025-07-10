"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <main
        style={{ minHeight: "calc(100vh - 448px)" }}
        className="container mx-auto max-w-3xl py-12 px-4"
      >
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-2xl p-8 md:p-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-primary tracking-tight">
            Điều khoản sử dụng
          </h1>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Chào mừng bạn đến với dịch vụ Thiệp cưới Online. Bằng cách sử dụng
            website này, bạn đồng ý tuân thủ các điều khoản dưới đây:
          </p>
          <ol className="list-decimal pl-6 space-y-4 text-gray-700 text-base md:text-lg">
            <li>
              <span className="font-semibold text-primary">
                Sử dụng hợp pháp:
              </span>{" "}
              Không chia sẻ nội dung vi phạm pháp luật.
            </li>
            <li>
              <span className="font-semibold text-primary">Quyền sở hữu:</span>{" "}
              Mọi nội dung thuộc quyền sở hữu của chúng tôi.
            </li>
            <li>
              <span className="font-semibold text-primary">
                Chỉnh sửa dịch vụ:
              </span>{" "}
              Có thể thay đổi bất cứ lúc nào.
            </li>
            <li>
              <span className="font-semibold text-primary">
                Miễn trừ trách nhiệm:
              </span>{" "}
              Không chịu trách nhiệm về thiệt hại phát sinh.
            </li>
            <li>
              <span className="font-semibold text-primary">
                Điều khoản bổ sung:
              </span>{" "}
              Có thể cập nhật mà không cần báo trước.
            </li>
          </ol>
          <p className="mt-8 text-gray-700">
            Liên hệ:{" "}
            <a
              href="mailto:uweeding.online@gmail.com"
              className="text-primary underline font-medium"
            >
              uweeding.online@gmail.com
            </a>
          </p>
        </motion.section>
      </main>

      <Footer />
    </>
  );
}
