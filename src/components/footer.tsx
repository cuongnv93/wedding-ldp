"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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

// Component con: SocialLinks
function SocialLinks() {
  const socials = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <div className="flex space-x-4">
      {socials.map((social, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.2, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link
            href={social.href}
            className="text-muted-foreground hover:text-primary"
          >
            <social.icon className="h-5 w-5" />
            <span className="sr-only">{social.label}</span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

// Component con: QuickLinks
function QuickLinks() {
  const router = useRouter();
  const [isHomePage, setIsHomePage] = useState(true);

  useEffect(() => {
    setIsHomePage(window.location.pathname === "/");
  }, []);
  const links = [
    {
      name: "Trang chủ",
      href: "/",
    },
    {
      name: "Giới thiệu",
      href: "#about",
    },
    {
      name: "Thiệp mời",
      href: "#product",
    },
    {
      name: "Câu hỏi thường gặp",
      href: "#faq",
    },
  ];

  const handleClick = (href: string) => {
    if (isHomePage) {
      // Scroll to element if on homepage
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          // block: "start",
        });
      }
    } else {
      // Navigate to homepage with hash, browser will handle scrolling
      router.push(`/#${href.substring(1)}`);
    }
  };

  return (
    <ul className="space-y-2">
      {links.map((link, index) => (
        <motion.li
          key={index}
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            href={link.href}
            className="text-muted-foreground hover:text-primary"
            onClick={(e) => {
              e.preventDefault();
              handleClick(link.href);
            }}
          >
            {link.name}
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}

// Component con: ContactInfo
function ContactInfo() {
  const contacts = [
    { icon: MapPin, text: "54A Nguyễn Chí Thanh - Hà Nội" },
    { icon: Phone, text: "0776 718 994" },
    { icon: Mail, text: "uwedding.online@gmail.com" },
  ];

  return (
    <ul className="space-y-2">
      {contacts.map((contact, index) => (
        <motion.li
          key={index}
          className="flex items-start gap-2"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <contact.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <span className="text-muted-foreground">{contact.text}</span>
        </motion.li>
      ))}
    </ul>
  );
}

// Component con: Newsletter
function Newsletter() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // Hàm kiểm tra số điện thoại chỉ chứa số và tối thiểu 8, tối đa 15 ký tự
  const isValidPhone = (value: string) => {
    return /^[0-9]{8,15}$/.test(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidPhone(phone)) {
      toast.error("Vui lòng nhập số điện thoại hợp lệ!");
      return;
    }
    setLoading(true);
    const result = await savePhoneToSheet(phone);
    setLoading(false);
    if (result.status === "success") {
      toast.success(
        "Đăng ký tư vấn thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.",
        {
          icon: (
            <CheckCircle
              color="#22c55e"
              size={22}
              style={{ minWidth: 22, marginRight: 16 }}
            />
          ),
        }
      );
      setPhone("");
    } else {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold">Đăng ký tư vấn miễn phí</h3>
      <p className="text-muted-foreground">
        Để lại số điện thoại, đội ngũ uWedding sẽ liên hệ tư vấn giúp bạn chọn
        mẫu thiệp phù hợp nhất cho ngày trọng đại.
      </p>
      <form onSubmit={handleSubmit}>
        <motion.div
          className="flex flex-col sm:flex-row gap-2"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Input
            type="tel"
            placeholder="Số điện thoại của bạn"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            disabled={loading}
            inputMode="numeric"
            pattern="[0-9]{8,15}"
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#22c55e"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="#22c55e"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Đang gửi...
                </span>
              ) : (
                "Đăng ký"
              )}
            </Button>
          </motion.div>
        </motion.div>
      </form>
    </div>
  );
}

async function savePhoneToSheet(phone: string) {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzQNxEe35_7uGvBCwiSd5YO-MAF0yK0CvIgHr-se2HmpW4LPar_PCD9ezFNX4cMiwXIPw/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({ phone }),
      }
    );
    return await response.json();
  } catch (error) {
    return { status: "error", error };
  }
}

// Footer Component
export default function Footer() {
  return (
    <footer id="footer" className="w-full bg-muted/50 border-t">
      <div className="container px-4 md:px-6 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="font-bold text-xl">
              <span className="text-primary">u</span>Wedding
            </h3>
            <p className="text-muted-foreground">
              Cùng uWedding tạo nên những chiếc thiệp cưới độc đáo và ấn tượng,
              ghi dấu ngày trọng đại của bạn.
            </p>
            <SocialLinks />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="font-bold">Liên kết nhanh</h3>
            <QuickLinks />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="font-bold">Liên hệ</h3>
            <ContactInfo />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Newsletter />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} uWedding. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex gap-4">
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Điều khoản sử dụng
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Chính sách bảo mật
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
