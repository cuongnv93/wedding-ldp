"use client";
import { Shield, Truck, RotateCcw, Clock } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: <Truck className="h-10 w-10 text-primary" />,
    title: "Đầy đủ tính năng hiện đại",
    description:
      "Đếm ngược ngày cưới, bản đồ chỉ đường, xác nhận tham dự, album ảnh, nhạc nền… tất cả đều tích hợp sẵn trong thiệp.",
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "Tạo thiệp nhanh, không cần chờ lâu",
    description:
      "Không cần mất nhiều thời gian, uWedding giúp bạn nhanh chóng có thiệp chỉn chu, sẵn sàng gửi đến khách mời.",
  },
  {
    icon: <RotateCcw className="h-10 w-10 text-primary" />,
    title: "Thiết kế theo ý, không cần tự làm",
    description:
      "Thiệp được cá nhân hóa theo phong cách riêng của bạn – đẹp, chỉn chu và đúng ý.",
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "Hỗ trợ tận tâm, phản hồi nhanh",
    description:
      "Bạn chỉ cần gửi ý tưởng, uWedding lo từ A–Z và luôn sẵn sàng điều chỉnh theo yêu cầu.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Benefits() {
  return (
    <section id="about" className="w-full py-12 md:py-24 bg-muted">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Vì sao nên chọn uWedding?
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Với uWedding, bạn sẽ có thiệp cưới online đẹp, đầy đủ tiện ích mà
              không mất thời gian tự thiết kế – để dành tâm trí cho những khoảnh
              khắc ý nghĩa hơn trong hành trình cưới.
            </p>
          </div>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-3 rounded-full bg-primary/10 mb-4"
              >
                {benefit.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
