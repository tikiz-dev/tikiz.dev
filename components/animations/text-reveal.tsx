"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Splits the input into words (and the first-level words into characters)
 * and reveals them with a staggered slide-up. Pass `delay` to chain with
 * another reveal.
 */
export function TextReveal({
  text,
  className,
  innerClassName,
  delay = 0,
  speed = 1,
  as: Tag = "span",
  by = "word",
}: {
  text: string;
  className?: string;
  /**
   * Applied to each animating span — use this for text-gradient classes
   * (background-clip:text doesn't inherit through wrapping spans).
   */
  innerClassName?: string;
  delay?: number;
  speed?: number;
  as?: React.ElementType;
  by?: "word" | "char";
}) {
  const segments =
    by === "char" ? Array.from(text) : text.split(/(\s+)/);

  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      className={cn("inline-block", className)}
      initial="hidden"
      animate="visible"
      aria-label={text}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: (by === "char" ? 0.018 : 0.04) / speed,
          },
        },
      }}
    >
      {segments.map((seg, i) =>
        /\s/.test(seg) ? (
          <span key={i} aria-hidden>
            {seg}
          </span>
        ) : (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom"
            aria-hidden
          >
            <motion.span
              className={cn("inline-block will-change-transform", innerClassName)}
              variants={{
                hidden: { y: "110%", opacity: 0, rotate: 3 },
                visible: {
                  y: 0,
                  opacity: 1,
                  rotate: 0,
                  transition: {
                    duration: 0.85 / speed,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
            >
              {seg}
            </motion.span>
          </span>
        )
      )}
    </MotionTag>
  );
}
