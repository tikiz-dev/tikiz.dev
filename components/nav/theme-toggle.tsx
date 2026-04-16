"use client";

import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "@/components/providers/theme-provider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      aria-label={theme === "dark" ? "Zu Light-Mode wechseln" : "Zu Dark-Mode wechseln"}
      onClick={toggle}
      className="relative flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[color:var(--color-text-muted)] transition-colors hover:text-[color:var(--color-text)] hover:border-white/20"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="absolute"
        >
          {theme === "dark" ? (
            <Moon className="size-4" />
          ) : (
            <Sun className="size-4" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
