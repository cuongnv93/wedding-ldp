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
      <main className="container mx-auto max-w-3xl py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-primary tracking-tight">
          {t("title")}
        </h1>
        <div className="bg-white rounded-xl shadow p-6 space-y-6 w-1/2 mx-auto min-w-[400px]">
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
            className="bg-primary text-white px-4 py-2 rounded font-semibold"
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
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={resultLink}
                  readOnly
                />
                <button
                  className="bg-gray-200 px-2 py-2 rounded"
                  onClick={handleCopy}
                  title="Copy link"
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
