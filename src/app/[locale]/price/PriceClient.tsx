"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import {
  Check,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  HeartHandshake,
  Clock,
  PhoneCall,
  HelpCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PlanFeature {
  name: string;
  basic: boolean | string;
  pro: boolean | string;
  premium: boolean | string;
}

interface FeatureCategory {
  title: string;
  features: PlanFeature[];
}

export default function PriceClient() {
  const locale = useLocale();
  const isEn = locale === "en";

  const comparisonCategories: FeatureCategory[] = isEn
    ? [
        {
          title: "General & Display",
          features: [
            { name: "Unlimited QR Code & Shareable Link", basic: true, pro: true, premium: true },
            { name: "Event Details & Google Maps Location", basic: true, pro: true, premium: true },
            { name: "Countdown Timer & Save The Date", basic: false, pro: true, premium: true },
            { name: "Personalized Guest Invitation Link", basic: false, pro: "Up to 100", premium: "Unlimited" },
            { name: "Hosting Duration", basic: "1 Year", pro: "2 Years", premium: "Lifetime" },
          ],
        },
        {
          title: "Guest Interaction",
          features: [
            { name: "Guestbook & Congratulations Wall", basic: true, pro: true, premium: true },
            { name: "Real-time RSVP Confirmation", basic: false, pro: true, premium: true },
            { name: "Instant QR Gift Registry (Direct Bank Transfer)", basic: false, pro: true, premium: true },
            { name: "Export Guest List to Excel", basic: false, pro: false, premium: true },
          ],
        },
        {
          title: "Media & Customization",
          features: [
            { name: "Background Music (Custom Track)", basic: false, pro: true, premium: true },
            { name: "Online Photo Gallery", basic: false, pro: "Up to 15 Photos", premium: "Unlimited HD" },
            { name: "Embedded Pre-Wedding Video", basic: false, pro: false, premium: true },
            { name: "Romantic Effects (Falling Petals/Snow)", basic: false, pro: true, premium: true },
            { name: "1-on-1 Tailored Custom Design", basic: false, pro: "Standard", premium: "VIP Dedicated" },
          ],
        },
      ]
    : [
        {
          title: "Tính năng cơ bản & Hiển thị",
          features: [
            { name: "Mã QR & Link chia sẻ không giới hạn", basic: true, pro: true, premium: true },
            { name: "Thông tin hôn lễ & Bản đồ Google Maps 1 chạm", basic: true, pro: true, premium: true },
            { name: "Đếm ngược ngày cưới & Lưu lịch (Save The Date)", basic: false, pro: true, premium: true },
            { name: "Tạo link thiệp gắn tên riêng từng khách mời", basic: false, pro: "Tối đa 100 khách", premium: "Không giới hạn" },
            { name: "Thời gian lưu trữ thiệp online", basic: "1 Năm", pro: "2 Năm", premium: "Trọn đời vĩnh viễn" },
          ],
        },
        {
          title: "Tương tác khách mời",
          features: [
            { name: "Sổ lưu bút & Gửi lời chúc phúc", basic: true, pro: true, premium: true },
            { name: "Xác nhận tham dự (RSVP) trực tiếp theo thời gian thực", basic: false, pro: true, premium: true },
            { name: "Mã QR mừng cưới tích hợp chuyển khoản tiện lợi", basic: false, pro: true, premium: true },
            { name: "Xuất file Excel danh sách khách phản hồi", basic: false, pro: false, premium: true },
          ],
        },
        {
          title: "Hình ảnh, Âm thanh & Tùy biến",
          features: [
            { name: "Nhạc nền tình ca lãng mạn (chọn bài hát theo ý thích)", basic: false, pro: true, premium: true },
            { name: "Album ảnh cưới trực tuyến sắc nét", basic: false, pro: "Tối đa 15 ảnh", premium: "Không giới hạn HD" },
            { name: "Tích hợp Video cưới Pre-Wedding YouTube/Vimeo", basic: false, pro: false, premium: true },
            { name: "Hiệu ứng hoa hồng / tuyết rơi lãng mạn", basic: false, pro: true, premium: true },
            { name: "Chỉnh sửa & tùy biến thiết kế theo yêu cầu 1-1", basic: false, pro: "Tiêu chuẩn", premium: "VIP theo concept riêng" },
          ],
        },
      ];

  const faqs = isEn
    ? [
        {
          q: "When do I need to pay for the invitation?",
          a: "You only pay after you have thoroughly reviewed and approved your working web demo. You never have to pay upfront.",
        },
        {
          q: "How long does it take to create a digital invitation?",
          a: "Usually within 2 to 4 hours after you submit your wedding details and photos, you will receive a demo link to inspect.",
        },
        {
          q: "Can I upgrade my plan later?",
          a: "Yes! You can easily upgrade from Basic or Pro to Premium anytime by just paying the price difference.",
        },
        {
          q: "Are there any hidden fees or hosting renewal costs?",
          a: "Zero hidden fees. Our pricing is completely all-inclusive for the duration specified in each plan.",
        },
      ]
    : [
        {
          q: "Khi nào tôi cần thanh toán chi phí thiệp?",
          a: "Bạn CHỈ thanh toán sau khi uWedding gửi bản web demo và bạn đã hoàn toàn ưng ý với thiệp cưới của mình. Không cần đặt cọc trước.",
        },
        {
          q: "Mất bao lâu để nhận được thiệp cưới online?",
          a: "Thông thường chỉ từ 2 đến 4 giờ làm việc sau khi bạn gửi thông tin và ảnh cưới, chuyên viên uWedding sẽ gửi bản demo để bạn kiểm tra.",
        },
        {
          q: "Tôi có thể nâng cấp gói sau này không?",
          a: "Hoàn toàn được! Bạn có thể nâng cấp từ gói Basic hoặc Pro lên Premium bất kỳ lúc nào chỉ bằng cách bù phần chênh lệch.",
        },
        {
          q: "Có phát sinh chi phí duy trì hay máy chủ không?",
          a: "Cam kết 100% không phát sinh bất kỳ chi phí ẩn nào. Chi phí trọn gói đã bao gồm toàn bộ máy chủ, chứng chỉ bảo mật SSL và đường truyền ổn định.",
        },
      ];

  return (
    <div className="w-full bg-gradient-to-b from-rose-50/30 via-white to-slate-50/50 py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Page Header */}
        <header className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-100/80 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary mb-4 shadow-sm border border-rose-200/60">
            <Sparkles className="h-4 w-4" />
            <span>{isEn ? "Transparent & Affordable Pricing" : "Bảng Giá Minh Bạch & Tiết Kiệm"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {isEn ? "Digital Wedding Invitation Plans" : "Bảng Giá Dịch Vụ Thiệp Cưới Online"}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {isEn
              ? "Choose the ideal invitation plan for your big day. One-time payment, full interactive features, and no hidden fees."
              : "Lựa chọn gói thiệp cưới online phù hợp nhất cho ngày hạnh phúc. Chi phí trọn gói một lần, đầy đủ tiện ích thông minh và chỉ thanh toán khi bạn hoàn toàn hài lòng."}
          </p>
        </header>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {/* Plan 1: Basic */}
          <div className="flex flex-col rounded-3xl bg-white border border-slate-200/90 p-7 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-slate-300">
            <div className="mb-6">
              <Badge variant="outline" className="text-xs font-semibold px-3 py-1 bg-slate-50 text-slate-700 border-slate-200 mb-3">
                {isEn ? "Starter Experience" : "Trải nghiệm cơ bản"}
              </Badge>
              <h2 className="text-2xl font-bold text-slate-900">Basic</h2>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed min-h-[40px]">
                {isEn
                  ? "Perfect for couples who want a clean, simple digital card to share with close friends."
                  : "Dành cho cặp đôi muốn trải nghiệm gửi thiệp cưới online đơn giản và nhanh gọn."}
              </p>
            </div>

            <div className="mb-6 pb-6 border-b border-slate-100">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900">0₫</span>
                <span className="text-sm font-medium text-slate-500">/ {isEn ? "event" : "đám cưới"}</span>
              </div>
              <div className="mt-2 text-xs font-medium text-emerald-600 inline-flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                <Clock className="h-3.5 w-3.5" />
                <span>{isEn ? "Hosting: 1 Year" : "Thời gian lưu trữ: 1 Năm"}</span>
              </div>
            </div>

            <div className="flex-1 mb-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                {isEn ? "Included Features" : "Tính năng bao gồm:"}
              </div>
              <ul className="space-y-3.5 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </span>
                  <span>{isEn ? "Unlimited QR code & shareable link" : "Mã QR & Link chia sẻ không giới hạn"}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </span>
                  <span>{isEn ? "Event date, time & wedding location" : "Thông tin ngày giờ, địa điểm hôn lễ"}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </span>
                  <span>{isEn ? "Google Maps location integration" : "Bản đồ chỉ đường Google Maps"}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </span>
                  <span>{isEn ? "Guestbook & congratulations wall" : "Sổ lưu bút & nhận lời chúc mừng"}</span>
                </li>
                <li className="flex items-start gap-3 text-slate-400">
                  <span className="h-5 w-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="h-3.5 w-3.5" />
                  </span>
                  <span className="line-through">{isEn ? "Countdown timer & Save The Date" : "Đếm ngược ngày cưới & Lưu lịch"}</span>
                </li>
                <li className="flex items-start gap-3 text-slate-400">
                  <span className="h-5 w-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="h-3.5 w-3.5" />
                  </span>
                  <span className="line-through">{isEn ? "Background music & Photo gallery" : "Nhạc nền & Album ảnh cưới online"}</span>
                </li>
              </ul>
            </div>

            <Button asChild variant="outline" size="lg" className="w-full rounded-xl py-6 font-semibold border-slate-300 hover:bg-slate-50 hover:text-slate-900">
              <Link href={`/${locale}/create-invitation`} title={isEn ? "Create Free Card" : "Tạo thiệp miễn phí"}>
                <span>{isEn ? "Get Started Free" : "Tạo thiệp miễn phí"}</span>
              </Link>
            </Button>
          </div>

          {/* Plan 2: Pro (MOST POPULAR) */}
          <div className="relative flex flex-col rounded-3xl bg-white border-2 border-primary p-7 sm:p-8 shadow-xl shadow-rose-100/70 ring-4 ring-rose-50 transition-all duration-300 hover:shadow-2xl">
            {/* Top Ribbon */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-white shadow-md uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                {isEn ? "Most Popular" : "Được 85% Cặp Đôi Lựa Chọn"}
              </span>
            </div>

            <div className="mb-6 mt-2">
              <Badge className="text-xs font-semibold px-3 py-1 bg-rose-100 text-primary border-none mb-3">
                {isEn ? "Recommended Choice" : "Gói khuyên dùng"}
              </Badge>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center justify-between">
                <span>Pro</span>
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                  -33% SALE
                </span>
              </h2>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed min-h-[40px]">
                {isEn
                  ? "Full interactive features including RSVP, background music, countdown timer and guest names."
                  : "Đầy đủ mọi tính năng hiện đại nhất: RSVP xác nhận tiệc, nhạc nền, đếm ngược và mã mừng cưới."}
              </p>
            </div>

            <div className="mb-6 pb-6 border-b border-slate-100">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-primary">199.000₫</span>
                <span className="text-base text-slate-400 line-through">299.000₫</span>
              </div>
              <div className="mt-2 text-xs font-medium text-primary inline-flex items-center gap-1 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">
                <Clock className="h-3.5 w-3.5" />
                <span>{isEn ? "Hosting: 2 Years" : "Thời gian lưu trữ: 2 Năm"}</span>
              </div>
            </div>

            <div className="flex-1 mb-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">
                {isEn ? "All Basic Features Plus:" : "Toàn bộ gói Basic và thêm:"}
              </div>
              <ul className="space-y-3.5 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-rose-100 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </span>
                  <span>
                    <strong>{isEn ? "Romantic background music" : "Nhạc nền tình ca lãng mạn"}</strong>{" "}
                    {isEn ? "(choose any song)" : "(tùy chọn bài hát)"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-rose-100 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </span>
                  <span>
                    <strong>{isEn ? "Countdown timer & Save The Date" : "Đếm ngược ngày cưới & Lưu lịch"}</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-rose-100 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </span>
                  <span>
                    <strong>{isEn ? "Real-time RSVP confirmation" : "Xác nhận tham dự (RSVP)"}</strong>{" "}
                    {isEn ? "(know guest count instantly)" : "chính xác"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-rose-100 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </span>
                  <span>
                    <strong>{isEn ? "Direct QR gift registry" : "Mã QR mừng cưới tiện lợi"}</strong>{" "}
                    {isEn ? "(bank transfer ready)" : "(chuyển khoản tinh tế)"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-rose-100 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </span>
                  <span>
                    {isEn ? "Photo gallery (up to 15 HD photos)" : "Album ảnh cưới trực tuyến (tối đa 15 ảnh)"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-rose-100 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </span>
                  <span>
                    {isEn ? "Personalized links for up to 100 guests" : "Gắn tên riêng cho tối đa 100 khách mời"}
                  </span>
                </li>
              </ul>
            </div>

            <Button asChild size="lg" className="w-full rounded-xl py-6 font-bold shadow-lg shadow-rose-200 text-base bg-primary hover:bg-primary/90 text-white transition-all hover:scale-[1.02]">
              <Link href={`/${locale}/create-invitation`} title={isEn ? "Choose Pro Plan" : "Chọn gói Pro ngay"}>
                <span>{isEn ? "Choose Pro Plan" : "Đặt thiệp gói Pro ngay"}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Plan 3: Premium (VIP) */}
          <div className="flex flex-col rounded-3xl bg-white border border-slate-200/90 p-7 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-amber-300">
            <div className="mb-6">
              <Badge variant="outline" className="text-xs font-semibold px-3 py-1 bg-amber-50 text-amber-800 border-amber-200 mb-3">
                {isEn ? "All-Inclusive Luxury" : "Đẳng cấp trọn đời"}
              </Badge>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center justify-between">
                <span>Premium VIP</span>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  -35% SALE
                </span>
              </h2>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed min-h-[40px]">
                {isEn
                  ? "Unlimited HD wedding gallery, video integration, lifetime hosting, and personalized 1-on-1 designer support."
                  : "Trọn vẹn mọi tính năng cao cấp nhất, lưu trữ trọn đời và chuyên viên thiết kế hỗ trợ riêng 1-1."}
              </p>
            </div>

            <div className="mb-6 pb-6 border-b border-slate-100">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-slate-900">399.000₫</span>
                <span className="text-base text-slate-400 line-through">599.000₫</span>
              </div>
              <div className="mt-2 text-xs font-medium text-amber-800 inline-flex items-center gap-1 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                <Clock className="h-3.5 w-3.5" />
                <span>{isEn ? "Hosting: Lifetime" : "Thời gian lưu trữ: Vĩnh viễn trọn đời"}</span>
              </div>
            </div>

            <div className="flex-1 mb-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                {isEn ? "All Pro Features Plus:" : "Toàn bộ gói Pro và đặc quyền VIP:"}
              </div>
              <ul className="space-y-3.5 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </span>
                  <span>
                    <strong>{isEn ? "Unlimited HD photo album" : "Album ảnh cưới HD không giới hạn"}</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </span>
                  <span>
                    <strong>{isEn ? "Pre-wedding video embed" : "Tích hợp Video cưới Pre-Wedding"}</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </span>
                  <span>
                    <strong>{isEn ? "Unlimited personalized guest links" : "Gắn tên khách mời không giới hạn"}</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </span>
                  <span>
                    <strong>{isEn ? "Export RSVP guest list to Excel" : "Xuất file Excel danh sách khách mời"}</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </span>
                  <span>
                    {isEn ? "Tailored custom design per wedding concept" : "Thiết kế riêng 1-1 theo concept hôn lễ"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </span>
                  <span>
                    {isEn ? "Priority 24/7 VIP hotline & designer support" : "Hỗ trợ ưu tiên 24/7 từ chuyên viên uWedding"}
                  </span>
                </li>
              </ul>
            </div>

            <Button asChild size="lg" className="w-full rounded-xl py-6 font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-all">
              <Link href={`/${locale}/create-invitation`} title={isEn ? "Choose Premium Plan" : "Chọn gói Premium VIP"}>
                <span>{isEn ? "Choose Premium VIP" : "Chọn gói Premium VIP"}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* 4 Value Guarantees / Reassurance */}
        <section aria-label="Cam kết dịch vụ" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <div className="h-11 w-11 rounded-xl bg-rose-50 text-primary flex items-center justify-center shrink-0">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                {isEn ? "Fast 2-Hour Delivery" : "Bàn giao siêu tốc 2h"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                {isEn ? "Receive your interactive demo within hours." : "Có ngay web demo để kiểm tra sau khi gửi thông tin."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <div className="h-11 w-11 rounded-xl bg-rose-50 text-primary flex items-center justify-center shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                {isEn ? "Pay After Approval" : "Thanh toán sau hài lòng"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                {isEn ? "No upfront deposit required. Pay only when 100% satisfied." : "Chỉ thanh toán sau khi bạn duyệt thiệp cưới ưng ý."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <div className="h-11 w-11 rounded-xl bg-rose-50 text-primary flex items-center justify-center shrink-0">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                {isEn ? "Unlimited Revisions" : "Chỉnh sửa tận tâm"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                {isEn ? "We adjust wording and layout until it's flawless." : "Hỗ trợ chỉnh sửa thông tin, hình ảnh linh hoạt."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <div className="h-11 w-11 rounded-xl bg-rose-50 text-primary flex items-center justify-center shrink-0">
              <PhoneCall className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                {isEn ? "24/7 Dedicated Support" : "Hỗ trợ Zalo & Hotline"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                {isEn ? "Real human support whenever you need assistance." : "Đồng hành cùng cô dâu chú rể xuyên suốt tiệc cưới."}
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Side-by-Side Comparison Table */}
        <section aria-label="So sánh chi tiết tính năng" className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {isEn ? "Detailed Feature Comparison" : "So Sánh Chi Tiết Tính Năng Từng Gói"}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              {isEn
                ? "See exactly what features are included across every tier."
                : "Xem bảng đối chiếu chi tiết để chọn gói dịch vụ tối ưu nhất cho bạn."}
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[650px]">
                <thead>
                  <tr className="bg-slate-50/90 border-b border-slate-200">
                    <th scope="col" className="p-4 sm:p-5 text-sm font-bold text-slate-900 w-2/5">
                      {isEn ? "Features" : "Tính năng"}
                    </th>
                    <th scope="col" className="p-4 sm:p-5 text-center text-sm font-bold text-slate-700 w-1/5">
                      Basic
                    </th>
                    <th scope="col" className="p-4 sm:p-5 text-center text-sm font-bold text-primary w-1/5 bg-rose-50/40">
                      Pro (Hot)
                    </th>
                    <th scope="col" className="p-4 sm:p-5 text-center text-sm font-bold text-amber-800 w-1/5">
                      Premium VIP
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonCategories.map((cat, idx) => (
                    <tr key={idx} className="contents">
                      <td colSpan={4} className="bg-slate-100/60 px-4 sm:px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                        {cat.title}
                      </td>
                      {cat.features.map((feat, fIdx) => (
                        <tr key={fIdx} className="hover:bg-slate-50/70 transition-colors">
                          <td className="p-4 sm:p-5 text-sm font-medium text-slate-800">
                            {feat.name}
                          </td>
                          <td className="p-4 sm:p-5 text-center text-sm">
                            {typeof feat.basic === "boolean" ? (
                              feat.basic ? (
                                <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-slate-300 mx-auto" />
                              )
                            ) : (
                              <span className="font-semibold text-slate-700 text-xs sm:text-sm">{feat.basic}</span>
                            )}
                          </td>
                          <td className="p-4 sm:p-5 text-center text-sm bg-rose-50/20">
                            {typeof feat.pro === "boolean" ? (
                              feat.pro ? (
                                <Check className="h-5 w-5 text-primary mx-auto stroke-[2.5]" />
                              ) : (
                                <X className="h-5 w-5 text-slate-300 mx-auto" />
                              )
                            ) : (
                              <span className="font-bold text-primary text-xs sm:text-sm">{feat.pro}</span>
                            )}
                          </td>
                          <td className="p-4 sm:p-5 text-center text-sm">
                            {typeof feat.premium === "boolean" ? (
                              feat.premium ? (
                                <Check className="h-5 w-5 text-amber-700 mx-auto stroke-[2.5]" />
                              ) : (
                                <X className="h-5 w-5 text-slate-300 mx-auto" />
                              )
                            ) : (
                              <span className="font-bold text-amber-800 text-xs sm:text-sm">{feat.premium}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pricing FAQ Accordion */}
        <section aria-label="Câu hỏi thường gặp về giá" className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary mb-2">
              <HelpCircle className="h-4 w-4" />
              <span>FAQ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {isEn ? "Frequently Asked Questions" : "Câu Hỏi Thường Gặp Về Bảng Giá"}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 shadow-sm [&_summary::-webkit-details-marker]:hidden open:border-primary/40 open:shadow-md transition-all"
              >
                <summary className="flex cursor-pointer items-center justify-between text-base font-bold text-slate-900 group-hover:text-primary transition-colors">
                  <span>{faq.q}</span>
                  <span className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 group-open:bg-primary group-open:text-white transition-colors">
                    <svg
                      className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Bottom Call to Action Card */}
        <div className="rounded-3xl bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 p-8 sm:p-12 text-white shadow-xl text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              {isEn ? "Ready to Create Your Dream Wedding Invitation?" : "Sẵn Sàng Tạo Thiệp Cưới Độc Đáo Của Riêng Bạn?"}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-rose-100 leading-relaxed">
              {isEn
                ? "Contact us now for free design consultation or browse our 50+ beautiful templates."
                : "Liên hệ ngay để được tư vấn thiết kế thiệp cưới online miễn phí hoặc khám phá hơn 50+ mẫu thiệp được yêu thích nhất."}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-xl font-bold bg-white text-rose-600 hover:bg-rose-50 shadow-md py-6 px-8 text-base">
                <Link href={`/${locale}/create-invitation`} title={isEn ? "Create Invitation Now" : "Đặt thiệp cưới ngay"}>
                  {isEn ? "Create Invitation Now" : "Tạo thiệp cưới ngay"}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl font-semibold border-white/80 bg-white/10 text-white hover:bg-white/20 py-6 px-8 text-base">
                <Link href={`/${locale}/products`} title={isEn ? "Browse Templates" : "Xem mẫu thiệp"}>
                  {isEn ? "Browse 50+ Templates" : "Khám phá 50+ mẫu thiệp"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
