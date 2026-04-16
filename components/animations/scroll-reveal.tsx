"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: boolean;
  once?: boolean;
  as?: React.ElementType;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 32,
  blur = true,
  once = true,
  as = "div",
}: Props) {
  const MotionTag = motion.create(as);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y,
      filter: blur ? "blur(8px)" : "blur(0px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Stagger wrapper — children with ScrollRevealItem appear in sequence.
 */
export function ScrollRevealStagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealItem({
  children,
  className,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
