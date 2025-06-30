"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion } from "framer-motion";

export default function PrivacyPage() {
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
            Chính sách bảo mật
          </h1>
          <p className="mb-6 text-gray-700 leading-relaxed">
            Chúng tôi cam kết bảo mật thông tin cá nhân của bạn khi sử dụng dịch
            vụ Thiệp cưới Online. Dưới đây là các nguyên tắc bảo mật mà chúng
            tôi áp dụng:
          </p>
          <ol className="list-decimal pl-6 space-y-4 text-gray-700 text-base md:text-lg">
            <li>
              <span className="font-semibold text-primary">
                Thu thập thông tin:
              </span>{" "}
              Chỉ thu thập những dữ liệu cần thiết để phục vụ cho việc tư vấn và
              cung cấp dịch vụ.
            </li>
            <li>
              <span className="font-semibold text-primary">
                Sử dụng thông tin:
              </span>{" "}
              Thông tin của bạn chỉ được dùng để cải thiện dịch vụ và hỗ trợ
              khách hàng tốt hơn.
            </li>
            <li>
              <span className="font-semibold text-primary">Bảo mật:</span> Chúng
              tôi không chia sẻ thông tin cá nhân cho bên thứ ba khi chưa có sự
              đồng ý của bạn.
            </li>
            <li>
              <span className="font-semibold text-primary">
                Quyền truy cập:
              </span>{" "}
              Bạn có quyền yêu cầu xem, chỉnh sửa hoặc xoá thông tin cá nhân bất
              cứ lúc nào.
            </li>
          </ol>
          <p className="mt-8 text-gray-700">
            Nếu có thắc mắc về chính sách bảo mật, vui lòng liên hệ:{" "}
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
