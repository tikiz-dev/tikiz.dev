"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Wraps children in a container whose contents follow the mouse with a
 * subtle spring. Disabled on touch devices automatically (hover:none media).
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHover, setHover] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * strength);
    y.set(relY * strength);
  }

  function handleLeave() {
    setHover(false);
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={cn(
        "inline-block will-change-transform [@media(hover:none)]:pointer-events-auto",
        className
      )}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      data-magnetic-active={isHover}
    >
      {children}
    </motion.div>
  );
}
