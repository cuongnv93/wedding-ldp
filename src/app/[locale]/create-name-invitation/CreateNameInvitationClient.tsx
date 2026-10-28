"use client";

import { useState, useMemo } from "react";
import {
  Copy,
  Sparkles,
  Link2,
  Users,
  User,
  Download,
  Check,
} from "lucide-react";
import { useLocale } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function CreateNameInvitationClient() {
  const locale = useLocale();
  const isEn = locale === "en";

  const [activeTab, setActiveTab] = useState<"single" | "batch">("single");
  const [baseLink, setBaseLink] = useState("");
  const [guestName, setGuestName] = useState("");
  const [resultLink, setResultLink] = useState("");
  const [copiedSingle, setCopiedSingle] = useState(false);

  // Batch mode state
  const [batchNamesText, setBatchNamesText] = useState("");
  const [copiedBatchAll, setCopiedBatchAll] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const sampleSuggestions = isEn
    ? ["Family of Mr. & Mrs. Davis", "Best Friend Sarah", "Alex & Partner", "Colleague Michael"]
    : ["Gia đình Bác Hùng", "Bạn thân Tuấn Anh", "Chị Mai & Anh Nam", "Bạn Linh & Người thương", "Anh/Chị đồng nghiệp"];

  const buildLink = (url: string, name: string) => {
    if (!url || !name) return "";
    const cleanUrl = url.trim();
    const encoded = encodeURIComponent(name.trim());
    const separator = cleanUrl.includes("?") ? "&" : "?";
    return `${cleanUrl}${separator}n=${encoded}`;
  };

  const handleCreateSingle = () => {
    if (!baseLink.trim() || !guestName.trim()) return;
    const link = buildLink(baseLink, guestName);
    setResultLink(link);
    setCopiedSingle(false);
  };

  const handleCopySingle = async () => {
    if (!resultLink) return;
    await navigator.clipboard.writeText(resultLink);
    setCopiedSingle(true);
    setTimeout(() => setCopiedSingle(false), 2000);
    toast.success(isEn ? "Link copied to clipboard!" : "Đã sao chép link mời thành công!", {
      position: "bottom-center",
    });
  };

  // Process batch names
  const batchList = useMemo(() => {
    if (!baseLink.trim() || !batchNamesText.trim()) return [];
    const lines = batchNamesText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    return lines.map((name, index) => ({
      index: index + 1,
      name,
      link: buildLink(baseLink, name),
    }));
  }, [baseLink, batchNamesText]);

  const handleCopyBatchItem = async (link: string, idx: number) => {
    await navigator.clipboard.writeText(link);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
    toast.success(isEn ? "Guest link copied!" : "Đã sao chép link của khách!", {
      position: "bottom-center",
    });
  };

  const handleCopyAllBatch = async () => {
    if (batchList.length === 0) return;
    const content = batchList.map((item) => `${item.name}: ${item.link}`).join("\n");
    await navigator.clipboard.writeText(content);
    setCopiedBatchAll(true);
    setTimeout(() => setCopiedBatchAll(false), 2000);
    toast.success(
      isEn ? `Copied all ${batchList.length} links!` : `Đã sao chép toàn bộ ${batchList.length} link khách mời!`,
      { position: "bottom-center" }
    );
  };

  const handleDownloadTxt = () => {
    if (batchList.length === 0) return;
    const content = batchList.map((item) => `${item.index}. ${item.name} -> ${item.link}`).join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "danh-sach-link-thiep-cuoi.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success(isEn ? "File downloaded!" : "Đã tải file danh sách thành công!", { position: "bottom-center" });
  };

  return (
    <div className="w-full bg-gradient-to-b from-rose-50/30 via-white to-slate-50/50 py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-100/80 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary mb-4 shadow-sm border border-rose-200/60">
            <Sparkles className="h-4 w-4" />
            <span>{isEn ? "Guest Personalization Tool" : "Tiện ích cá nhân hóa thiệp cưới"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {isEn ? "Create Personalized Guest Invitation Links" : "Tạo Link Thiệp Cưới Gắn Tên Riêng Từng Khách Mời"}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {isEn
              ? "Personalize each invitation with your guest's exact name or honorific title (e.g., Dear Uncle David, Bestie Sarah) for maximum elegance and respect."
              : "Tự động tạo link thiệp riêng gắn tên từng vị khách (VD: Kính mời Gia đình Bác Hùng, Bạn Tuấn Anh,...), tạo ấn tượng trân trọng và lịch thiệp tuyệt đối."}
          </p>
        </header>

        {/* Main Card */}
        <div className="rounded-3xl bg-white p-6 sm:p-10 border border-slate-200/90 shadow-sm">
          {/* Base URL Input (Shared) */}
          <div className="mb-8 pb-8 border-b border-slate-100">
            <label htmlFor="base-link" className="block text-sm font-bold text-slate-900 mb-2">
              {isEn ? "1. Your Wedding Invitation Link (URL)" : "1. Đường link thiệp cưới của bạn (URL)"}
            </label>
            <div className="relative">
              <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="base-link"
                type="url"
                className="pl-10 h-12 rounded-full text-sm bg-slate-50/60 focus-visible:ring-primary border-slate-200"
                placeholder={isEn ? "https://uwedding.online/products/demo or your private link..." : "https://uwedding.online/products/1 hoặc link thiệp riêng của bạn..."}
                value={baseLink}
                onChange={(e) => setBaseLink(e.target.value)}
                required
              />
            </div>
            <p className="mt-1.5 text-xs text-slate-500">
              {isEn ? "Paste your wedding invitation website address here." : "Nhập đường link website thiệp cưới bạn đã được uWedding bàn giao."}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center justify-center mb-8">
            <div className="inline-flex rounded-full bg-slate-100 p-1.5 border border-slate-200/80">
              <button
                type="button"
                onClick={() => setActiveTab("single")}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 ${
                  activeTab === "single"
                    ? "bg-white text-primary shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <User className="h-4 w-4" />
                <span>{isEn ? "Single Guest" : "Tạo từng khách"}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("batch")}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 ${
                  activeTab === "batch"
                    ? "bg-white text-primary shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Users className="h-4 w-4" />
                <span>{isEn ? "Batch List (Multiple)" : "Tạo danh sách hàng loạt"}</span>
              </button>
            </div>
          </div>

          {/* TAB 1: SINGLE GUEST */}
          {activeTab === "single" && (
            <div className="space-y-6">
              <div>
                <label htmlFor="guest-name" className="block text-sm font-bold text-slate-900 mb-2">
                  {isEn ? "2. Guest Name / Honorific Title" : "2. Tên / Cách xưng hô với khách mời"}
                </label>
                <Input
                  id="guest-name"
                  type="text"
                  className="h-12 rounded-full text-sm focus-visible:ring-primary border-slate-200 pl-5 pr-5"
                  placeholder={isEn ? "e.g., Uncle Robert & Aunt Lisa, Best Friend Sarah..." : "VD: Kính mời Gia đình Bác Hùng, Bạn Tuấn Anh, Em Phương Linh..."}
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleCreateSingle();
                    }
                  }}
                />

                {/* Quick suggestions */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-400">{isEn ? "Suggestions:" : "Gợi ý nhanh:"}</span>
                  {sampleSuggestions.map((sample, sIdx) => (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => setGuestName(sample)}
                      className="rounded-full bg-slate-100 hover:bg-rose-50 hover:text-primary hover:border-rose-200 border border-slate-200 px-3 py-1 text-xs text-slate-600 transition-colors"
                    >
                      + {sample}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                type="button"
                size="lg"
                onClick={handleCreateSingle}
                disabled={!baseLink.trim() || !guestName.trim()}
                className="w-full rounded-full py-6 font-bold shadow-md bg-primary hover:bg-primary/90 text-white"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                <span>{isEn ? "Generate Personalized Link" : "Tạo link thiệp riêng"}</span>
              </Button>

              {/* Single Result Box */}
              {resultLink && (
                <div className="mt-8 pt-6 border-t border-slate-100 animate-in fade-in-50 duration-300">
                  <div className="rounded-3xl bg-rose-50/50 p-5 sm:p-6 border border-rose-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">
                        {isEn ? "Ready-to-Send Invitation Link:" : "Link thiệp đã gắn tên khách (Sẵn sàng gửi):"}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 mt-2">
                      <Input
                        type="text"
                        readOnly
                        value={resultLink}
                        className="bg-white font-mono text-xs sm:text-sm h-12 rounded-full pl-5 pr-5 border-rose-200"
                      />
                      <Button
                        type="button"
                        onClick={handleCopySingle}
                        className="shrink-0 h-12 rounded-full font-bold px-6 gap-2 bg-primary hover:bg-primary/90"
                      >
                        {copiedSingle ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        <span>{copiedSingle ? (isEn ? "Copied!" : "Đã chép") : (isEn ? "Copy Link" : "Sao chép")}</span>
                      </Button>
                    </div>

                    {/* Mini Invitation Card Mockup Preview */}
                    <div className="mt-6 rounded-3xl bg-white p-7 border border-rose-100 shadow-sm text-center relative overflow-hidden">
                      <div className="text-xs text-slate-400 mb-1">{isEn ? "Guest Card Preview" : "Mô phỏng hiển thị trên thiệp:"}</div>
                      <div className="font-serif italic text-xl sm:text-2xl text-primary font-bold my-2">
                        {isEn ? "Cordially Invites" : "Trân Trọng Kính Mời"}
                      </div>
                      <div className="inline-block rounded-full bg-rose-50 px-5 py-1.5 text-base sm:text-lg font-bold text-slate-900 border border-rose-100">
                        {guestName || (isEn ? "Guest Name" : "Tên Khách Mời")}
                      </div>
                      <div className="text-xs text-slate-500 mt-2">
                        {isEn ? "To attend our wedding celebration" : "Đến tham dự hôn lễ & chia vui cùng gia đình chúng tôi"}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: BATCH LIST GENERATOR */}
          {activeTab === "batch" && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="batch-names" className="text-sm font-bold text-slate-900">
                    {isEn ? "2. Guest List (One name per line):" : "2. Danh sách tên khách mời (Mỗi dòng một tên):"}
                  </label>
                  <span className="text-xs text-slate-500">
                    {batchList.length > 0 ? `${batchList.length} ${isEn ? "guests" : "khách mời"}` : ""}
                  </span>
                </div>
                <Textarea
                  id="batch-names"
                  rows={6}
                  className="rounded-3xl p-5 text-sm focus-visible:ring-primary border-slate-200"
                  placeholder={
                    isEn
                      ? "Family of Uncle David\nBest Friend Sarah\nColleague Michael\nDr. Anderson & Partner"
                      : "Gia đình Bác Hùng\nBạn thân Tuấn Anh\nChị Mai & Anh Nam\nEm Phương Linh\nAnh Tuấn (Đồng nghiệp)"
                  }
                  value={batchNamesText}
                  onChange={(e) => setBatchNamesText(e.target.value)}
                />
                <p className="mt-1.5 text-xs text-slate-500">
                  {isEn
                    ? "Paste your guest list directly from Excel, Word, or Notes (each guest on a separate line)."
                    : "Bạn có thể sao chép nhanh cột danh sách khách mời từ file Excel hoặc ghi chú rồi dán vào đây."}
                </p>
              </div>

              {/* Batch Action Buttons */}
              {batchList.length > 0 && (
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button
                    type="button"
                    onClick={handleCopyAllBatch}
                    className="rounded-full font-bold gap-2 px-6 shadow-sm bg-primary hover:bg-primary/90"
                  >
                    {copiedBatchAll ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span>{copiedBatchAll ? (isEn ? "All Copied!" : "Đã sao chép tất cả!") : (isEn ? "Copy All Links" : "Sao chép toàn bộ danh sách")}</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleDownloadTxt}
                    className="rounded-full font-semibold gap-2 px-6 border-slate-300 hover:bg-slate-50"
                  >
                    <Download className="h-4 w-4" />
                    <span>{isEn ? "Download as TXT" : "Tải file danh sách (.txt)"}</span>
                  </Button>
                </div>
              )}

              {/* Batch Table Output */}
              {batchList.length > 0 && (
                <div className="mt-6 rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="max-h-96 overflow-y-auto">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      <thead className="sticky top-0 bg-slate-50 border-b border-slate-200 z-10">
                        <tr>
                          <th className="p-3 font-bold text-slate-700 w-12 text-center">#</th>
                          <th className="p-3 font-bold text-slate-700 w-1/3">{isEn ? "Guest Name" : "Tên khách mời"}</th>
                          <th className="p-3 font-bold text-slate-700">{isEn ? "Personalized Link" : "Link mời riêng"}</th>
                          <th className="p-3 font-bold text-slate-700 w-24 text-center">{isEn ? "Action" : "Thao tác"}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {batchList.map((item, idx) => (
                          <tr key={idx} className="hover:bg-rose-50/40 transition-colors">
                            <td className="p-3 text-center text-slate-400 font-mono">{item.index}</td>
                            <td className="p-3 font-semibold text-slate-800">{item.name}</td>
                            <td className="p-3 font-mono text-xs text-slate-600 truncate max-w-xs">{item.link}</td>
                            <td className="p-3 text-center">
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={() => handleCopyBatchItem(item.link, idx)}
                                className="h-8 px-3 rounded-full text-xs text-primary font-semibold hover:bg-rose-50"
                              >
                                {copiedIndex === idx ? (
                                  <span className="text-emerald-600 font-bold">{isEn ? "Copied" : "Đã chép"}</span>
                                ) : (
                                  isEn ? "Copy" : "Chép link"
                                )}
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
