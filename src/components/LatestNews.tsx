import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, Sparkles } from "lucide-react";
import { blogs } from "@/data/blogs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function LatestNews({ locale }: { locale: string }) {
  const isEnglish = locale === "en";
  const recentPosts = blogs.slice(0, 3);

  return (
    <section id="news" className="w-full py-12 md:py-24 bg-slate-50/60 border-t border-slate-100">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs sm:text-sm font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{isEnglish ? "uWedding Blog & News" : "Tin tức & Cẩm nang cưới"}</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-foreground">
            {isEnglish ? "Latest Wedding News & Guides" : "Tin tức & Xu hướng cưới mới nhất"}
          </h2>
          <p className="max-w-[750px] text-muted-foreground text-sm sm:text-base leading-relaxed">
            {isEnglish
              ? "Stay up-to-date with modern digital wedding invitation trends, practical budget-saving advice, and elegant wedding etiquette."
              : "Cập nhật các mẫu thiệp cưới online xu hướng, kinh nghiệm chuẩn bị hôn lễ tiết kiệm, cách viết thiệp mời trang trọng và bí quyết ngày cưới trọn vẹn."}
          </p>
        </div>

        {/* 3-Column Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {recentPosts.map((post) => {
            const formattedDate = new Date(post.publishedAt).toLocaleDateString(
              isEnglish ? "en-US" : "vi-VN",
              { year: "numeric", month: "long", day: "numeric" }
            );

            return (
              <article
                key={post.id}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Cover Image */}
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100"
                  title={post.title}
                >
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={75}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3 z-10">
                    <Badge className="bg-white/95 text-slate-900 backdrop-blur text-xs font-semibold shadow-sm hover:bg-white">
                      {post.category}
                    </Badge>
                  </div>
                </Link>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  {/* Meta: Date & Read Time */}
                  <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      {formattedDate}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-lg sm:text-xl font-bold tracking-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    <Link href={`/${locale}/blog/${post.slug}`} title={post.title}>
                      {post.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>

                  {/* Footer Link */}
                  <div className="mt-auto pt-3 border-t border-slate-100">
                    <Link
                      href={`/${locale}/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2"
                      title={post.title}
                    >
                      <span>{isEnglish ? "Read article" : "Đọc bài viết"}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="mt-12 flex justify-center">
          <Button asChild size="lg" variant="outline" className="rounded-full gap-2 px-8 shadow-sm hover:border-primary hover:text-primary">
            <Link href={`/${locale}/blog`} title={isEnglish ? "View all articles" : "Xem tất cả bài viết tin tức"}>
              <span>{isEnglish ? "Explore All Articles & Guides" : "Xem tất cả bài viết tin tức & cẩm nang"}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
