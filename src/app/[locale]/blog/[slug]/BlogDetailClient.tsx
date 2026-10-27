"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Copy,
  Check,
  Facebook,
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ListFilter,
  Share2,
} from "lucide-react";
import { type BlogPost } from "@/data/blogs";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatBlogDate } from "@/lib/date";

interface BlogDetailClientProps {
  locale: string;
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogDetailClient({
  locale,
  post,
  relatedPosts,
}: BlogDetailClientProps) {
  const [copied, setCopied] = useState(false);
  const isEnglish = locale === "en";

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success(
        isEnglish
          ? "Article link copied to clipboard!"
          : "Đã sao chép liên kết bài viết!"
      );
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareFacebook = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <article className="min-h-screen bg-slate-50/60 pb-20 pt-6 sm:pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500"
        >
          <Link
            href={`/${locale}`}
            className="hover:text-rose-600 transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{isEnglish ? "Home" : "Trang chủ"}</span>
          </Link>
          <span>/</span>
          <Link
            href={`/${locale}/blog`}
            className="hover:text-rose-600 transition-colors"
          >
            {isEnglish ? "Wedding Guide" : "Cẩm nang thiệp cưới"}
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-800 line-clamp-1 max-w-xs sm:max-w-md">
            {post.title}
          </span>
        </nav>

        {/* Article Header Container */}
        <header className="mb-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <Badge className="bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200/80 font-bold text-xs px-3.5 py-1 rounded-full shadow-xs">
              {post.category}
            </Badge>
            <span className="text-xs text-slate-300">•</span>
            <div className="flex items-center gap-1.5 text-xs text-rose-600 font-semibold">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatBlogDate(post.publishedAt, locale)}</span>
            </div>
            <span className="text-xs text-slate-300">•</span>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {post.description}
          </p>

          {/* Author info and social share bar */}
          <div className="mt-6 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 overflow-hidden rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold shadow-xs">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {post.author.name}
                </p>
                <p className="text-xs text-slate-500">{post.author.role}</p>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 hidden sm:inline-flex">
                <Share2 className="h-3.5 w-3.5" />
                {isEnglish ? "Share:" : "Chia sẻ:"}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShareFacebook}
                className="h-9 gap-1.5 rounded-full text-xs font-semibold text-blue-600 border-blue-200 hover:bg-blue-50 px-4 shadow-xs"
                aria-label="Chia sẻ lên Facebook"
              >
                <Facebook className="h-3.5 w-3.5 fill-current" />
                <span>Facebook</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="h-9 gap-1.5 rounded-full text-xs font-semibold text-slate-700 hover:bg-slate-100 px-4 shadow-xs"
                aria-label="Sao chép liên kết"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                <span>
                  {copied
                    ? isEnglish
                      ? "Copied!"
                      : "Đã chép!"
                    : isEnglish
                      ? "Copy Link"
                      : "Sao chép link"}
                </span>
              </Button>
            </div>
          </div>
        </header>

        {/* Featured Cover Image */}
        <div className="relative mb-12 aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-3xl bg-slate-100 shadow-xl shadow-slate-200/50 border border-slate-100">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
            priority
          />
        </div>

        {/* Main Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Article Body (8 cols) */}
          <div className="lg:col-span-8">
            {/* Table of Contents for Mobile View */}
            {post.toc.length > 0 && (
              <div className="lg:hidden mb-8 rounded-3xl border border-rose-100 bg-rose-50/40 p-6 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-3">
                  <ListFilter className="h-4 w-4 text-rose-600" />
                  <span>
                    {isEnglish ? "Table of Contents" : "Mục lục bài viết"}
                  </span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm">
                  {post.toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-slate-600 hover:text-rose-600 transition-colors block py-0.5"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Render HTML Content */}
            <div
              className="blog-content-body max-w-none text-slate-800 leading-relaxed font-normal
                [&_p]:mb-5 [&_p]:text-base sm:[&_p]:text-[17px] [&_p]:leading-relaxed [&_p]:text-slate-700
                [&_p.lead]:text-lg sm:[&_p.lead]:text-xl [&_p.lead]:font-medium [&_p.lead]:text-slate-800 [&_p.lead]:leading-relaxed [&_p.lead]:mb-8 [&_p.lead]:border-l-4 [&_p.lead]:border-rose-500 [&_p.lead]:pl-4
                [&_h2]:text-xl sm:[&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-extrabold [&_h2]:text-slate-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:tracking-tight [&_h2]:scroll-mt-24
                [&_h3]:text-lg sm:[&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:scroll-mt-24
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2.5 [&_ul]:text-slate-700
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2.5 [&_ol]:text-slate-700
                [&_li]:text-base sm:[&_li]:text-[17px] [&_li]:leading-relaxed
                [&_strong]:font-bold [&_strong]:text-slate-900
                [&_blockquote]:border-l-4 [&_blockquote]:border-rose-400 [&_blockquote]:bg-rose-50/50 [&_blockquote]:p-4 [&_blockquote]:rounded-r-2xl [&_blockquote]:italic [&_blockquote]:my-6
                [&_a]:text-rose-600 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-rose-700
              "
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            {/* Tags & Keyword Badges */}
            <div className="mt-12 pt-6 border-t border-slate-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-600">
                  {isEnglish ? "Keywords & Tags:" : "Từ khóa & Chủ đề:"}
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block rounded-full bg-rose-50 border border-rose-100/80 px-3 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* In-Article Conversion Banner */}
            <div className="mt-10 rounded-3xl bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 p-6 sm:p-8 text-white shadow-xl shadow-rose-500/15 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-rose-100 text-xs font-semibold mb-2">
                  <Sparkles className="h-4 w-4" />
                  <span>uWedding Platform</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  {isEnglish
                    ? "Create Your Beautiful Wedding Invitation Today"
                    : "Tạo thiệp cưới online ấn tượng cho ngày trọng đại của bạn"}
                </h3>
                <p className="mt-2 text-sm text-rose-100 leading-relaxed max-w-xl">
                  {isEnglish
                    ? "Easily design and share with guests via link or QR code. Full interactive features included."
                    : "Dễ dàng tùy chỉnh, gửi bạn bè qua link Zalo/Facebook và mã QR. Hỗ trợ đầy đủ nhạc nền, bản đồ, RSVP và album cưới."}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="rounded-full bg-white text-rose-600 hover:bg-rose-50 font-bold shadow-md px-5"
                  >
                    <Link href={`/${locale}/products`}>
                      {isEnglish
                        ? "Browse Invitation Templates"
                        : "Xem tất cả mẫu thiệp"}
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border-white/80 text-white hover:bg-white/10 font-semibold px-5"
                  >
                    <Link href={`/${locale}/create-invitation`}>
                      {isEnglish ? "How to Order" : "Hướng dẫn đặt thiệp"}
                    </Link>
                  </Button>
                </div>
              </div>
              <div
                className="absolute -right-16 -bottom-16 h-60 w-60 rounded-full bg-white/10 blur-xl pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Sticky Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Desktop Table of Contents */}
            {post.toc.length > 0 && (
              <div className="sticky top-24 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-base mb-4 pb-3 border-b border-slate-100">
                  <ListFilter className="h-4 w-4 text-rose-600" />
                  <span>
                    {isEnglish ? "Table of Contents" : "Mục lục bài viết"}
                  </span>
                </div>
                <nav aria-label="Table of Contents">
                  <ul className="space-y-2.5 text-xs sm:text-sm">
                    {post.toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="text-slate-600 hover:text-rose-600 transition-colors block py-0.5 line-clamp-2 leading-snug"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Direct Mini-CTA in Sidebar */}
                <div className="mt-6 pt-5 border-t border-slate-100 bg-rose-50/70 border border-rose-100/60 rounded-2xl p-4">
                  <p className="text-xs font-bold text-rose-900">
                    {isEnglish
                      ? "Want a wedding invitation like this?"
                      : "Bạn muốn có thiệp cưới đẹp như ý?"}
                  </p>
                  <p className="text-xs text-rose-700 mt-1">
                    {isEnglish
                      ? "Choose from 50+ modern designs on uWedding."
                      : "Khám phá 50+ mẫu thiệp cưới điện tử hiện đại ngay hôm nay."}
                  </p>
                  <Button
                    asChild
                    size="sm"
                    className="w-full mt-3 rounded-full bg-rose-500 hover:bg-rose-600 font-semibold text-xs text-white shadow-xs"
                  >
                    <Link href={`/${locale}/products`}>
                      {isEnglish ? "Explore Templates" : "Xem mẫu thiệp"}
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <section
            className="mt-20 pt-12 border-t border-slate-200"
            aria-labelledby="related-heading"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2
                  id="related-heading"
                  className="text-2xl font-extrabold text-slate-900 tracking-tight"
                >
                  {isEnglish ? "Related Articles" : "Bài viết cùng chủ đề"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {isEnglish
                    ? "Explore more tips and guidelines for online wedding invitations"
                    : "Khám phá thêm cẩm nang chuẩn bị cưới và mẹo làm thiệp cưới online"}
                </p>
              </div>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-full font-semibold text-xs"
              >
                <Link href={`/${locale}/blog`}>
                  <span>{isEnglish ? "View all articles" : "Xem tất cả"}</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedPosts.map((item) => (
                <article
                  key={item.id}
                  className="group flex flex-col overflow-hidden rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(244,63,94,0.1)] transition-all duration-300 hover:-translate-y-1.5 p-4"
                >
                  <Link
                    href={`/${locale}/blog/${item.slug}`}
                    className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-100 block shadow-inner"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-block rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-bold text-slate-800 shadow-sm border border-white/60">
                        {item.category}
                      </span>
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col justify-between pt-4 pb-1 px-1.5">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                        <span className="inline-flex items-center gap-1 font-medium text-rose-600">
                          <Calendar className="h-3 w-3" />
                          {formatBlogDate(item.publishedAt, locale)}
                        </span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {item.readTime}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-2 leading-snug">
                        <Link href={`/${locale}/blog/${item.slug}`}>
                          {item.title}
                        </Link>
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">
                        {item.excerpt}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-medium">
                        uWedding Guide
                      </span>
                      <Link
                        href={`/${locale}/blog/${item.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 group-hover:text-rose-700 transition-colors"
                      >
                        <span>{isEnglish ? "Read" : "Đọc tiếp"}</span>
                        <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-all shadow-xs">
                          <ArrowRight className="h-3 w-3" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
