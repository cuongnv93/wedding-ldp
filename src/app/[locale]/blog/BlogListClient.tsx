"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  Sparkles,
  Tag,
  X,
  User,
} from "lucide-react";
import { type BlogPost, blogCategories } from "@/data/blogs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatBlogDate } from "@/lib/date";

interface BlogListClientProps {
  locale: string;
  posts: BlogPost[];
}

export default function BlogListClient({ locale, posts }: BlogListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const isEnglish = locale === "en";

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCategory =
        selectedCategory === "all" || post.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchCategory && matchSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const gridPosts = filteredPosts.length > 0 ? filteredPosts.slice(1) : [];

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-6 sm:pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-slate-500"
        >
          <Link
            href={`/${locale}`}
            className="hover:text-rose-600 transition-colors"
          >
            {isEnglish ? "Home" : "Trang chủ"}
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">
            {isEnglish ? "Wedding Guide & Blog" : "Cẩm nang thiệp cưới"}
          </span>
        </nav>

        {/* Hero Header */}
        <header className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-b from-rose-50/80 via-white to-pink-50/30 p-6 sm:p-10 lg:p-12 border border-rose-100/80 shadow-sm">
          {/* Decorative ambient background blur circles */}
          <div
            className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-rose-200/40 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-100/90 px-4 py-1.5 text-xs font-semibold text-rose-700 mb-4 border border-rose-200/60 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-rose-600" />
              <span>
                {isEnglish
                  ? "Wedding Guide & Inspiration 2025 - 2026"
                  : "Cẩm Nang & Xu Hướng Cưới 2025 - 2026"}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
              {isEnglish
                ? "Online Wedding Invitation Guide & Modern Wedding Tips"
                : "Cẩm Nang Thiệp Cưới Online & Kinh Nghiệm Cưới uWedding"}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base lg:text-lg">
              {isEnglish
                ? "Explore top online wedding invitation designs, budget-saving wedding planning tips, proper guest invitation wording, and interactive digital invitation guides."
                : "Khám phá các mẫu thiệp cưới online đẹp nhất, mẹo lập kế hoạch cưới tiết kiệm, cách viết thiệp mời trang trọng và kinh nghiệm tạo thiệp cưới điện tử hiện đại."}
            </p>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="relative z-10 mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                type="text"
                placeholder={
                  isEnglish
                    ? "Search articles, keywords, trends..."
                    : "Tìm kiếm bài viết, từ khóa, xu hướng..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-11 bg-white/95 border-slate-200 focus-visible:ring-rose-500 rounded-full h-12 text-sm shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Total count badge */}
            <div className="text-xs font-semibold text-slate-500 sm:text-sm">
              {isEnglish
                ? `Showing ${filteredPosts.length} ${filteredPosts.length === 1 ? "article" : "articles"}`
                : `Hiển thị ${filteredPosts.length} bài viết`}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="relative z-10 mt-6 flex flex-wrap gap-2 pt-4 border-t border-rose-100/60">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/20"
                  : "bg-white text-slate-700 hover:bg-rose-50 hover:text-rose-600 border border-slate-200/80 shadow-xs"
              }`}
            >
              {isEnglish ? "All Articles" : "Tất cả"} ({posts.length})
            </button>
            {blogCategories.map((cat) => {
              const count = posts.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/20"
                      : "bg-white text-slate-700 hover:bg-rose-50 hover:text-rose-600 border border-slate-200/80 shadow-xs"
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </header>

        {/* Empty Search Result */}
        {filteredPosts.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center my-12 shadow-sm">
            <BookOpen className="mx-auto h-12 w-12 text-slate-300 mb-3" />
            <h3 className="text-lg font-bold text-slate-800">
              {isEnglish
                ? "No matching articles found"
                : "Không tìm thấy bài viết phù hợp"}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {isEnglish
                ? "Try searching with different keywords or clear current filters."
                : "Vui lòng thử từ khóa khác hoặc xóa bộ lọc để xem toàn bộ danh sách."}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-5 rounded-full px-5"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            >
              {isEnglish ? "Reset Filters" : "Xóa bộ lọc"}
            </Button>
          </div>
        )}

        {/* Featured Post (Highlighted Hero Magazine Card) */}
        {featuredPost && (
          <section className="mb-14" aria-labelledby="featured-post-title">
            <div className="group relative overflow-hidden rounded-3xl bg-white border border-rose-100/90 shadow-[0_10px_35px_-10px_rgba(244,63,94,0.08)] hover:shadow-[0_20px_50px_-15px_rgba(244,63,94,0.16)] transition-all duration-500 p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                {/* Image */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] w-full lg:col-span-7 overflow-hidden rounded-2xl bg-slate-100 shadow-inner">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    priority
                  />
                  <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                    <Badge className="bg-rose-500 text-white hover:bg-rose-600 shadow-sm font-semibold rounded-full px-3.5 py-1 text-xs">
                      {isEnglish ? "Featured" : "Bài viết nổi bật"}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-white/95 text-slate-800 backdrop-blur-md font-semibold rounded-full px-3.5 py-1 text-xs shadow-sm border border-white/60"
                    >
                      {featuredPost.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between py-2 lg:col-span-5">
                  <div>
                    <div className="flex items-center gap-3 text-xs font-medium text-slate-500 mb-3">
                      <span className="inline-flex items-center gap-1.5 text-rose-600 font-semibold">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatBlogDate(featuredPost.publishedAt, locale)}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <h2
                      id="featured-post-title"
                      className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 group-hover:text-rose-600 transition-colors leading-snug tracking-tight"
                    >
                      <Link href={`/${locale}/blog/${featuredPost.slug}`}>
                        {featuredPost.title}
                      </Link>
                    </h2>

                    <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed line-clamp-3">
                      {featuredPost.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {featuredPost.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 rounded-full bg-rose-50/80 border border-rose-100 px-3 py-1 text-xs font-medium text-rose-700"
                        >
                          <Tag className="h-3 w-3 text-rose-400" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs">
                        <User className="h-4 w-4" />
                      </div>
                      <div className="text-xs">
                        <div className="font-bold text-slate-800">
                          {featuredPost.author.name}
                        </div>
                        <div className="text-slate-400">
                          {featuredPost.author.role}
                        </div>
                      </div>
                    </div>

                    <Button
                      asChild
                      className="rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 shadow-md shadow-rose-500/20 gap-2 shrink-0"
                    >
                      <Link href={`/${locale}/blog/${featuredPost.slug}`}>
                        <span>{isEnglish ? "Read Article" : "Đọc bài viết"}</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Regular Posts Grid */}
        {gridPosts.length > 0 && (
          <section aria-labelledby="all-posts-heading" className="mb-16">
            <h2 id="all-posts-heading" className="sr-only">
              {isEnglish
                ? "Blog Articles List"
                : "Danh sách bài viết cẩm nang cưới"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {gridPosts.map((post) => (
                <article
                  key={post.id}
                  className="group flex flex-col overflow-hidden rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(244,63,94,0.1)] transition-all duration-300 hover:-translate-y-1.5 p-4"
                >
                  {/* Thumbnail with rounded corners and smooth zoom */}
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-100 block shadow-inner"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-block rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-bold text-slate-800 shadow-sm border border-white/60">
                        {post.category}
                      </span>
                    </div>
                  </Link>

                  {/* Body with generous breathing room */}
                  <div className="flex flex-1 flex-col justify-between pt-4 pb-1 px-1.5">
                    <div>
                      {/* Meta info */}
                      <div className="flex items-center gap-2.5 text-xs text-slate-500 mb-2">
                        <span className="inline-flex items-center gap-1 font-medium text-rose-600">
                          <Calendar className="h-3 w-3" />
                          {formatBlogDate(post.publishedAt, locale)}
                        </span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-2 leading-snug">
                        <Link
                          href={`/${locale}/blog/${post.slug}`}
                          className="focus:outline-none"
                        >
                          {post.title}
                        </Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="mt-2 text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-slate-100/90 px-2.5 py-0.5 text-xs text-slate-600 font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/${locale}/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-rose-600 group-hover:text-rose-700 transition-colors shrink-0"
                        aria-label={`Đọc bài viết: ${post.title}`}
                      >
                        <span>{isEnglish ? "Read" : "Đọc tiếp"}</span>
                        <div className="w-6 h-6 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-all shadow-xs">
                          <ArrowRight className="h-3.5 w-3.5" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Bottom High-Converting CTA Banner */}
        <section
          aria-labelledby="cta-heading"
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 p-8 sm:p-12 text-white shadow-xl shadow-rose-500/15"
        >
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block rounded-full bg-white/20 px-3.5 py-1 text-xs font-semibold backdrop-blur-md mb-3 border border-white/30">
              uWedding • Nền tảng thiệp cưới online số 1
            </span>
            <h2
              id="cta-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight"
            >
              {isEnglish
                ? "Ready to Create Your Stunning Online Wedding Invitation?"
                : "Tự tay thiết kế thiệp cưới online sang trọng chỉ trong 3 phút"}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-rose-100 leading-relaxed">
              {isEnglish
                ? "Full features included: Google Maps directions, background music, RSVP confirmation, photo album, and QR code gift registry."
                : "Đầy đủ tính năng: Bản đồ chỉ đường, nhạc nền lãng mạn, album ảnh cưới HD, xác nhận tham dự và mã QR mừng cưới tiện lợi."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white text-rose-600 hover:bg-rose-50 font-bold shadow-md px-6"
              >
                <Link href={`/${locale}/products`}>
                  {isEnglish ? "Explore 50+ Templates" : "Khám phá 50+ mẫu thiệp"}
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/80 text-white hover:bg-white/10 font-semibold px-6"
              >
                <Link href={`/${locale}/create-invitation`}>
                  {isEnglish ? "Order Invitation Now" : "Hướng dẫn tạo thiệp"}
                </Link>
              </Button>
            </div>
          </div>

          {/* Decorative background circle */}
          <div
            className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-white/10 blur-2xl pointer-events-none"
            aria-hidden="true"
          />
        </section>
      </div>
    </div>
  );
}
