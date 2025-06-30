"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Phone, Facebook, MessageCircle } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    title: "Bước 1: Chọn mẫu thiệp mời ưng ý",
    content: (
      <>
        <Link href="/products" className="text-primary underline">
          Danh sách Thiệp cưới
        </Link>{" "}
        và lựa chọn mẫu thiệp phù hợp với phong cách của bạn.
      </>
    ),
  },
  {
    title: "Bước 2: Liên hệ đặt thiệp",
    content: (
      <>
        Gọi điện thoại <Phone className="inline-block mx-1" size={18} />{" "}
        <a href="tel:0355565741" className="underline text-primary">
          0355 565 741
        </a>
        , hoặc đặt qua{" "}
        <a
          href="https://zalo.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-primary"
        >
          <MessageCircle className="inline-block mx-1" size={18} /> Zalo
        </a>{" "}
        hoặc{" "}
        <a
          href="https://facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-primary"
        >
          <Facebook className="inline-block mx-1" size={18} /> Facebook
        </a>
        .
      </>
    ),
  },
  {
    title: "Bước 3: Gửi thông tin & ảnh cưới",
    content: (
      <>
        Gửi đầy đủ thông tin cần thiết (tên cô dâu, chú rể, ngày giờ, địa điểm,
        lời mời...) và ảnh cưới để thiết kế thiệp.
      </>
    ),
  },
  {
    title: "Bước 4: Nhận bản web demo & chỉnh sửa",
    content: (
      <>
        Bạn sẽ nhận được bản web thiệp mời để kiểm tra, có thể yêu cầu chỉnh sửa
        lại thông tin hoặc hình ảnh cho đến khi hài lòng.
      </>
    ),
  },
  {
    title: "Bước 5: Bàn giao & thanh toán",
    content: (
      <>
        Sau khi chốt nội dung, bạn sẽ nhận được website thiệp mời, mã QR, file
        lời chúc, danh sách tham dự và tiến hành thanh toán.
      </>
    ),
  },
];

export default function CreateInvitationPage() {
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
            Hướng dẫn đặt thiệp mời online
          </h1>
          <div className="space-y-6 text-gray-700 text-base md:text-lg">
            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + idx * 0.25,
                  ease: "easeOut",
                }}
              >
                <span className="font-semibold text-primary">{step.title}</span>
                <br />
                {step.content}
              </motion.div>
            ))}
          </div>
          <p className="mt-8 text-gray-700">
            Nếu cần hỗ trợ thêm, vui lòng liên hệ:{" "}
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
