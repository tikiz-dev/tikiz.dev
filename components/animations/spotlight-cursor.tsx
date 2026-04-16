"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Mouse-following radial spotlight. Absolute-positioned; place inside a
 * `relative` parent. Respects prefers-reduced-motion and touch devices.
 */
export function SpotlightCursor({
  className,
  size = 520,
  color = "rgb(31 167 255 / 0.22)",
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (reduced || isTouch) return;

    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e: MouseEvent) => {
      const rect = el.parentElement?.getBoundingClientRect();
      if (!rect) return;
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      el.style.transform = `translate3d(${currentX - size / 2}px, ${currentY - size / 2}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, [size]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute top-0 left-0 -z-[1] rounded-full blur-3xl",
        "opacity-70 mix-blend-screen [@media(hover:none)]:hidden",
        className
      )}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
      }}
    />
  );
}
