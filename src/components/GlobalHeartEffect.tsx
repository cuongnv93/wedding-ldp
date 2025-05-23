"use client";

import { useEffect } from "react";

export default function GlobalHeartEffect() {
  const handleMouseClick = (e: MouseEvent) => {
    // Tạo một trái tim tại vị trí chuột
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.position = "absolute";
    heart.style.left = `${e.clientX + window.scrollX - 10}px`; // Căn giữa trái tim theo chiều ngang
    heart.style.top = `${e.clientY + window.scrollY - 10}px`; // Căn giữa trái tim theo chiều dọc
    heart.style.width = "20px";
    heart.style.height = "20px";
    heart.style.pointerEvents = "none";
    document.body.appendChild(heart);

    // Xóa trái tim sau 1 giây
    setTimeout(() => {
      heart.remove();
    }, 2000); // Thời gian khớp với animation (1s)
  };

  useEffect(() => {
    window.addEventListener("click", handleMouseClick);
    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  }, []);

  return null;
}
