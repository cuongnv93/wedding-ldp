"use client";

import { useEffect } from "react";

export default function AntiDebug() {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      const ctrlOrCmd = e.ctrlKey || e.metaKey;
      const shift = e.shiftKey;
      // Block F12
      if (key === "F12") {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      // Block Ctrl/Cmd + U (view source)
      if (ctrlOrCmd && !shift && (key === "u" || key === "U")) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      // Block common DevTools shortcuts:
      // Ctrl/Cmd + Shift + I / J / C (Elements / Console / Inspect)
      if (ctrlOrCmd && shift && ["I", "i", "J", "j", "C", "c"].includes(key)) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    };

    const onContextMenu = (e: MouseEvent) => {
      // Prevent right-click context menu (inspect from menu)
      e.preventDefault();
      e.stopPropagation();
    };

    // use capture to catch before other handlers
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("contextmenu", onContextMenu, true);

    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("contextmenu", onContextMenu, true);
    };
  }, []);

  return null;
}
