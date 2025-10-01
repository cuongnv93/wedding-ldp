"use client";
import { useEffect } from "react";

export default function AntiDebug() {
  useEffect(() => {
    // Chặn F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    document.addEventListener("keydown", onKeyDown);

    // Chặn mở context menu (chuột phải)
    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", onContextMenu);

    // Xoá giao diện và treo trình duyệt nếu phát hiện roleRefresh
    if (
      localStorage.getItem("roleRefresh") &&
      localStorage.getItem("roleRefresh") === "true"
    ) {
      document.body.innerHTML = "";
      while (true) {
        while (true) {
          console.log("1");
        }
      }
    }

    // setInterval phát hiện debug
    const interval = setInterval(() => {
      const t1 = new Date().getTime();

      debugger;
      const t2 = new Date().getTime();
      if (t2 - t1 > 200) {
        document.body.innerHTML = "";
        while (true) {
          while (true) {
            console.log("1");
          }
        }
        localStorage.setItem("roleRefresh", "true");
      }
    }, 10);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("contextmenu", onContextMenu);
      clearInterval(interval);
    };
  }, []);

  return null;
}
