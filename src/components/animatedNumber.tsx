"use client";

import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
}

export default function AnimatedNumber({
  value,
  duration = 1600,
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let animId: number;
    let startTime: number | null = null;
    const startValue = 0;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Smooth cubic ease-out curve for natural, weighted deceleration (Senior Motion Engine)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + easeProgress * (value - startValue));

      setDisplay(current);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setDisplay(value);
      }
    };

    animId = requestAnimationFrame(step);

    // Zero memory leak guarantee: cleanup animation frame on unmount
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [value, duration]);

  return <span>{display}</span>;
}
