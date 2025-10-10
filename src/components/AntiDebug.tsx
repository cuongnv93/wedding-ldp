"use client";

import { useEffect } from "react";

function AntiDebug() {
  useEffect(() => {
    // Hàm kiểm tra debugger
    const detectDebugger = () => {
      const start = Date.now();
      debugger;
      const end = Date.now();

      // Nếu nghi ngờ có DevTools
      if (end - start > 200) {
        document.body.innerHTML = "<h1>Access Blocked</h1>";
        localStorage.setItem("roleRefresh", "true");

        // Treo vòng lặp (tùy chọn — KHÔNG nên giữ)
        while (true) {
          console.log("1");
        }
      }
    };

    // Nếu đã bị chặn trước đó
    if (localStorage.getItem("roleRefresh") === "true") {
      document.body.innerHTML = "<h1>Access Blocked</h1>";
      while (true) {
        console.log("1");
      }
    }

    // Lặp kiểm tra liên tục
    const interval = setInterval(detectDebugger, 10);

    return () => clearInterval(interval);
  }, []);

  return null; // component không hiển thị gì
}

export default AntiDebug;
