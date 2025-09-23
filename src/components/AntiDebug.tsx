"use client";
import { useEffect, useRef } from "react";

export default function AntiDebug() {
  const detectionRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey &&
          e.shiftKey &&
          (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.ctrlKey && e.key === "U") ||
        (e.ctrlKey && e.key === "S") || // Prevent save
        (e.key === "F5" && (e.ctrlKey || e.shiftKey)) // Prevent hard refresh
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    document.addEventListener("keydown", onKeyDown);

    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };
    document.addEventListener("contextmenu", onContextMenu);

    const onSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };
    document.addEventListener("selectstart", onSelectStart);

    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold =
        window.outerHeight - window.innerHeight > threshold;

      // Console detection
      let consoleDetected = false;
      const devtools = /./;
      devtools.toString = () => {
        consoleDetected = true;
        return "devtools detected";
      };
      console.log("%c", devtools);

      // Timing detection
      const start = performance.now();
      debugger;
      const end = performance.now();
      const timingDetected = end - start > 100;

      if (
        widthThreshold ||
        heightThreshold ||
        consoleDetected ||
        timingDetected
      ) {
        if (!detectionRef.current) {
          detectionRef.current = true;
          handleDevToolsDetected();
        }
      } else {
        if (detectionRef.current) {
          detectionRef.current = false;
          handleDevToolsClosed();
        }
      }
    };

    const handleDevToolsDetected = () => {
      // Hide all iframes
      const iframes = document.querySelectorAll("iframe");
      iframes.forEach((iframe) => {
        iframe.style.display = "none";
        iframe.style.visibility = "hidden";
      });

      // Hide sensitive content
      const sensitiveElements = document.querySelectorAll(
        '[data-sensitive="true"]'
      );
      sensitiveElements.forEach((element) => {
        (element as HTMLElement).style.display = "none";
      });

      // Show warning message instead of crashing
      const warningDiv = document.createElement("div");
      warningDiv.id = "dev-tools-warning";
      warningDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        z-index: 999999;
        font-family: Arial, sans-serif;
      `;
      warningDiv.textContent =
        "Developer tools detected. Please close to continue.";

      if (!document.getElementById("dev-tools-warning")) {
        document.body.appendChild(warningDiv);
      }

      localStorage.setItem("devToolsDetected", "true");
    };

    const handleDevToolsClosed = () => {
      // Show iframes again
      const iframes = document.querySelectorAll("iframe");
      iframes.forEach((iframe) => {
        iframe.style.display = "";
        iframe.style.visibility = "";
      });

      // Show sensitive content
      const sensitiveElements = document.querySelectorAll(
        '[data-sensitive="true"]'
      );
      sensitiveElements.forEach((element) => {
        (element as HTMLElement).style.display = "";
      });

      // Remove warning
      const warningDiv = document.getElementById("dev-tools-warning");
      if (warningDiv) {
        warningDiv.remove();
      }

      localStorage.removeItem("devToolsDetected");
    };

    if (localStorage.getItem("devToolsDetected") === "true") {
      handleDevToolsDetected();
    }

    intervalRef.current = setInterval(detectDevTools, 1000);

    const protectIframes = () => {
      const iframes = document.querySelectorAll("iframe");
      iframes.forEach((iframe) => {
        // Prevent right click on iframe
        iframe.addEventListener("contextmenu", (e) => {
          e.preventDefault();
          return false;
        });

        // Add overlay protection
        const overlay = document.createElement("div");
        overlay.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          z-index: 1;
          pointer-events: none;
        `;

        if (
          iframe.parentElement &&
          iframe.parentElement.style.position !== "relative"
        ) {
          iframe.parentElement.style.position = "relative";
        }

        iframe.parentElement?.appendChild(overlay);
      });
    };

    // Run iframe protection
    protectIframes();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            if (element.tagName === "IFRAME") {
              protectIframes();
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("selectstart", onSelectStart);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      observer.disconnect();
    };
  }, []);

  return null;
}
