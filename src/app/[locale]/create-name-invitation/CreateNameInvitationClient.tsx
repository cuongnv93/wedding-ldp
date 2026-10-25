"use client";

import { useState } from "react";
import { Copy, CheckCircle, Sparkles, Link2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function CreateNameInvitationClient() {
  const t = useTranslations("create_name_invitation");

  const [baseLink, setBaseLink] = useState("");
  const [guestName, setGuestName] = useState("");
  const [resultLink, setResultLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCreateLink = () => {
    if (!baseLink || !guestName) return;
    const encodedName = encodeURIComponent(guestName.trim());
    const hasQuery = baseLink.includes("?");
    const link = baseLink.trim() + (hasQuery ? "&" : "?") + "n=" + encodedName;
    setResultLink(link);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (resultLink) {
      await navigator.clipboard.writeText(resultLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success(t("copied_toast") || "Đã sao chép link thành công!", {
        icon: (
          <CheckCircle
            color="#22c55e"
            size={20}
            style={{ minWidth: 20, marginRight: 8 }}
          />
        ),
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 sm:py-16">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700 mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Tiện ích cá nhân hóa</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          {t("title")}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Tạo đường link riêng gắn tên từng khách mời (ví dụ: Bạn Cường, Chị Lan,...) để gửi lời mời trang trọng, lịch sự nhất.
        </p>
      </div>

      <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateLink();
          }}
          className="space-y-5"
        >
          <div>
            <label htmlFor="base-link" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Đường link thiệp cưới của bạn
            </label>
            <div className="relative">
              <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="base-link"
                type="url"
                className="pl-10 h-11"
                placeholder="https://uwedding.online/products/demo hoặc link thiệp riêng..."
                value={baseLink}
                onChange={(e) => setBaseLink(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="guest-name" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Tên / Cách xưng hô với khách mời
            </label>
            <Input
              id="guest-name"
              type="text"
              className="h-11"
              placeholder="VD: Gia đình Bác Hùng, Bạn Tuấn Anh, Em Hương..."
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full font-bold shadow-sm"
            disabled={!baseLink.trim() || !guestName.trim()}
          >
            Tạo link mời riêng
          </Button>

          {resultLink && (
            <div className="mt-8 pt-6 border-t border-slate-100">
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Link thiệp đã gắn tên khách mời (sẵn sàng gửi):
              </label>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Input
                  type="text"
                  className="w-full bg-slate-50 font-mono text-xs sm:text-sm h-11"
                  value={resultLink}
                  readOnly
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCopy}
                  className="shrink-0 gap-1.5 h-11 font-semibold"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span>{copied ? "Đã chép" : "Copy link"}</span>
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
