"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import {
  Palette,
  Phone,
  MessageCircle,
  Facebook,
  Camera,
  Monitor,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Clock,
  ShieldCheck,
  HeartHandshake,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CreateInvitationClient() {
  const locale = useLocale();
  const isEn = locale === "en";

  const steps = [
    {
      num: "01",
      icon: Palette,
      title: isEn ? "Step 1: Choose Your Favorite Template" : "Bước 1: Chọn mẫu thiệp cưới ưng ý",
      desc: isEn
        ? "Explore 50+ modern, elegant invitation designs (Website, Mobile-first, Digital Signature) to find the design that matches your wedding concept."
        : "Khám phá hơn 50+ mẫu thiệp cưới online đẹp mắt (giao diện website, tối ưu điện thoại di động, chữ ký số) phù hợp với phong cách đám cưới của bạn.",
      action: {
        label: isEn ? "Browse 50+ Templates" : "Xem 50+ mẫu thiệp",
        href: `/${locale}/products`,
      },
      tag: isEn ? "Template Selection" : "Kho 50+ mẫu",
    },
    {
      num: "02",
      icon: MessageCircle,
      title: isEn ? "Step 2: Contact uWedding Team" : "Bước 2: Liên hệ đặt thiệp nhanh chóng",
      desc: isEn
        ? "Connect directly with our design consultants via Hotline, Zalo, or Facebook Messenger for instant guidance."
        : "Liên hệ trực tiếp với đội ngũ thiết kế uWedding qua Hotline, Zalo hoặc Facebook để được hỗ trợ và tư vấn nhanh nhất.",
      contactLinks: [
        {
          label: "0355 565 741",
          href: "tel:0355565741",
          icon: Phone,
          color: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
        },
        {
          label: "Chat Zalo",
          href: "https://zalo.me/0355565741",
          icon: MessageCircle,
          color: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
        },
        {
          label: "Facebook",
          href: "https://facebook.com",
          icon: Facebook,
          color: "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100",
        },
      ],
      tag: isEn ? "Direct Contact" : "Hỗ trợ 24/7",
    },
    {
      num: "03",
      icon: Camera,
      title: isEn ? "Step 3: Send Wedding Info & Photos" : "Bước 3: Gửi thông tin & ảnh cưới",
      desc: isEn
        ? "Provide your wedding essentials: bride and groom names, event date & time, venue addresses, and your favorite pre-wedding photos."
        : "Gửi thông tin cơ bản của hôn lễ để chuyên viên thiết kế đưa vào thiệp cưới:",
      checklist: isEn
        ? [
            "Bride & Groom names",
            "Ceremony & Reception dates and times",
            "Venue addresses (for Google Maps integration)",
            "Wedding photos & background music preferences",
          ]
        : [
            "Tên cô dâu, chú rể & thông tin hai bên gia đình",
            "Ngày giờ hôn lễ & tiệc cưới",
            "Địa chỉ chính xác (để tích hợp bản đồ chỉ đường Google Maps)",
            "Bộ ảnh cưới & bài hát tình ca bạn yêu thích",
          ],
      tag: isEn ? "Preparation" : "Chuẩn bị đơn giản",
    },
    {
      num: "04",
      icon: Monitor,
      title: isEn ? "Step 4: Receive Web Demo & Unlimited Edits" : "Bước 4: Nhận bản web demo & duyệt chỉnh sửa",
      desc: isEn
        ? "Within 2 to 4 hours, receive your live private demo link. Request any revisions to text, imagery, or music until you are 100% happy."
        : "Chỉ sau 2 đến 4 giờ, uWedding gửi bản web demo hoàn chỉnh. Bạn kiểm tra trên điện thoại, yêu cầu chỉnh sửa hình ảnh, câu từ cho đến khi hoàn toàn ưng ý.",
      perk: isEn ? "✓ Unlimited free edits before finalization" : "✓ Chỉnh sửa linh hoạt 1-1 không giới hạn trước khi chốt",
      tag: isEn ? "Review & Polish" : "Duyệt demo 2h",
    },
    {
      num: "05",
      icon: CheckCircle,
      title: isEn ? "Step 5: Handover Deliverables & Payment" : "Bước 5: Bàn giao trọn gói & thanh toán",
      desc: isEn
        ? "Receive your finalized wedding invitation website, print-ready QR codes, and guest RSVP management dashboard, then proceed with payment."
        : "Sau khi bạn ưng ý 100%, uWedding bàn giao đầy đủ sản phẩm và tiến hành thanh toán:",
      deliverables: isEn
        ? [
            "Private wedding website link ready to send",
            "High-resolution QR code for printing on paper cards",
            "Guest RSVP tracking and congratulations guestbook",
          ]
        : [
            "Đường link website thiệp cưới chính thức sẵn sàng gửi khách",
            "Mã QR sắc nét để in lên thiệp giấy hoặc để bàn tiệc",
            "Trang quản lý danh sách khách RSVP và sổ lưu bút lời chúc",
          ],
      tag: isEn ? "Final Delivery" : "Thanh toán an tâm",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-rose-50/30 via-white to-slate-50/50 py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-100/80 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary mb-4 shadow-sm border border-rose-200/60">
            <Sparkles className="h-4 w-4" />
            <span>{isEn ? "Easy 5-Step Ordering Process" : "Quy trình đặt thiệp nhanh chóng"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {isEn ? "How to Order Your Online Wedding Invitation" : "Hướng Dẫn Tạo & Đặt Thiệp Cưới Online"}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {isEn
              ? "In just 5 simple steps, you will own a modern, interactive digital invitation ready to share with loved ones."
              : "Chỉ với 5 bước đơn giản, bạn sẽ sở hữu ngay thiệp cưới online hiện đại, đầy đủ tiện ích và sẵn sàng gửi tới người thân, bạn bè."}
          </p>
        </header>

        {/* 5-Step Connected Timeline */}
        <div className="relative space-y-8 before:absolute before:inset-0 before:left-7 sm:before:left-9 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/40 before:via-primary/20 before:to-transparent">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative flex items-start gap-4 sm:gap-6 group">
                {/* Step Badge */}
                <div className="relative z-10 flex h-14 w-14 sm:h-18 sm:w-18 shrink-0 items-center justify-center rounded-2xl bg-white border-2 border-primary/30 shadow-md group-hover:border-primary group-hover:scale-105 transition-all duration-300">
                  <div className="flex flex-col items-center justify-center">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    <span className="text-[11px] sm:text-xs font-bold text-slate-500 mt-0.5">{step.num}</span>
                  </div>
                </div>

                {/* Step Card Content */}
                <div className="flex-1 rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/90 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-slate-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <Badge variant="outline" className="bg-rose-50/60 text-primary border-rose-200 text-xs font-semibold">
                      {step.tag}
                    </Badge>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                    {step.title}
                  </h2>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
                    {step.desc}
                  </p>

                  {/* Checklist if present */}
                  {step.checklist && (
                    <ul className="mb-4 space-y-2 rounded-2xl bg-slate-50 p-4 border border-slate-100 text-xs sm:text-sm text-slate-700">
                      {step.checklist.map((item, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Deliverables if present */}
                  {step.deliverables && (
                    <div className="mb-4 space-y-2 rounded-2xl bg-emerald-50/50 p-4 border border-emerald-100 text-xs sm:text-sm text-slate-700">
                      <div className="font-semibold text-emerald-800 mb-1">
                        {isEn ? "What you receive:" : "Sản phẩm bàn giao bao gồm:"}
                      </div>
                      {step.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Perk highlight */}
                  {step.perk && (
                    <div className="mb-4 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                      <span>{step.perk}</span>
                    </div>
                  )}

                  {/* Quick Action Button */}
                  {step.action && (
                    <div className="mt-2">
                      <Button asChild size="sm" className="rounded-xl gap-1.5 shadow-sm font-semibold">
                        <Link href={step.action.href}>
                          <span>{step.action.label}</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  )}

                  {/* Contact Links */}
                  {step.contactLinks && (
                    <div className="mt-3 flex flex-wrap gap-2.5">
                      {step.contactLinks.map((btn, bIdx) => {
                        const BtnIcon = btn.icon;
                        return (
                          <a
                            key={bIdx}
                            href={btn.href}
                            target={btn.href.startsWith("http") ? "_blank" : undefined}
                            rel={btn.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${btn.color}`}
                          >
                            <BtnIcon className="h-4 w-4" />
                            <span>{btn.label}</span>
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 3 Reassurance Value Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <div className="h-12 w-12 rounded-2xl bg-rose-50 text-primary flex items-center justify-center mb-3">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              {isEn ? "No Deposit Required" : "Không cần đặt cọc"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              {isEn ? "Pay only when you are 100% satisfied with your demo." : "Chỉ thanh toán sau khi bạn đã kiểm tra và duyệt bản demo ưng ý."}
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <div className="h-12 w-12 rounded-2xl bg-rose-50 text-primary flex items-center justify-center mb-3">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              {isEn ? "Fast 2-Hour Delivery" : "Bàn giao siêu tốc 2h"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              {isEn ? "Quick turnaround time so you never miss your timeline." : "Gửi thông tin là có web demo ngay trong ngày để gửi khách."}
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <div className="h-12 w-12 rounded-2xl bg-rose-50 text-primary flex items-center justify-center mb-3">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              {isEn ? "Dedicated Support" : "Đồng hành tận tâm"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              {isEn ? "1-on-1 designer assistance whenever you need updates." : "Hỗ trợ chỉnh sửa thông tin, ngày giờ, ảnh cưới tận tình."}
            </p>
          </div>
        </div>

        {/* Bottom Help Contact Box */}
        <div className="mt-12 rounded-3xl bg-slate-900 p-8 text-white shadow-xl text-center">
          <h2 className="text-xl sm:text-2xl font-bold">
            {isEn ? "Need assistance or have questions?" : "Bạn cần hỗ trợ thêm thông tin hoặc tư vấn mẫu thiệp?"}
          </h2>
          <p className="mt-2 text-sm text-slate-300 max-w-xl mx-auto">
            {isEn
              ? "Reach out directly via Hotline or Zalo. Our team is always ready to assist you!"
              : "Liên hệ trực tiếp với uWedding qua Zalo hoặc Hotline để nhận tư vấn và hướng dẫn chi tiết nhất!"}
          </p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center items-center">
            <a
              href="tel:0355565741"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary/90 transition-all shadow-md"
            >
              <Phone className="h-4 w-4" />
              <span>Hotline: 0355 565 741</span>
            </a>
            <a
              href="https://zalo.me/0355565741"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Zalo: 0355 565 741</span>
            </a>
            <a
              href="mailto:uwedding.online@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-all"
            >
              <Mail className="h-4 w-4" />
              <span>uwedding.online@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
