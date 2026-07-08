"use client";
import { useState } from "react";
import { Copy, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Input } from "../../../components/ui/input";
import { toast } from "sonner";

export default function CreateNameInvitationPage() {
  const t = useTranslations("create_name_invitation");

  const [baseLink, setBaseLink] = useState("");
  const [guestName, setGuestName] = useState("");
  const [resultLink, setResultLink] = useState("");
  const [, setCopied] = useState(false);

  const handleCreateLink = () => {
    if (!baseLink || !guestName) return;
    // Encode tên khách mời để an toàn trên URL
    const encodedName = encodeURIComponent(guestName.trim());
    // Nếu baseLink đã có query, thêm &n=..., nếu chưa thì ?n=...
    const hasQuery = baseLink.includes("?");
    const link = baseLink + (hasQuery ? "&" : "?") + "n=" + encodedName;
    setResultLink(link);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (resultLink) {
      await navigator.clipboard.writeText(resultLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      toast.success(t("copied_toast")!, {
        icon: (
          <CheckCircle
            color="#22c55e"
            size={22}
            style={{ minWidth: 22, marginRight: 16 }}
          />
        ),
        position: "bottom-center",
      });
    }
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <h1 className="mb-6 text-center text-2xl font-bold tracking-tight text-primary md:text-4xl">
          {t("title")}
        </h1>
        <div className="mx-auto w-full max-w-md space-y-6 rounded-xl bg-white p-4 shadow sm:p-6">
          <div>
            <label className="block font-medium mb-2">Link thiệp cưới</label>
            <Input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Nhập link thiệp cưới..."
              value={baseLink}
              onChange={(e) => setBaseLink(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Tên khách mời</label>
            <Input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Nhập tên khách mời..."
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
          </div>
          <button
            className="w-full rounded bg-primary px-4 py-2 font-semibold text-white sm:w-auto"
            onClick={handleCreateLink}
            disabled={!baseLink || !guestName}
          >
            Tạo link thiệp
          </button>
          {resultLink && (
            <div className="mt-6">
              <label className="block font-medium mb-2">
                Link thiệp đã gắn tên khách mời
              </label>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={resultLink}
                  readOnly
                />
                <button
                  className="flex shrink-0 items-center justify-center rounded bg-gray-200 px-3 py-2"
                  onClick={handleCopy}
                  title="Copy link"
                  aria-label="Copy link"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
