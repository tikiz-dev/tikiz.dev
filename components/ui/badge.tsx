import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  dot = false,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
  tone?: "default" | "brand" | "warm";
}) {
  const toneClasses = {
    default: "border-white/10 bg-white/5 text-[color:var(--color-text-muted)]",
    brand:
      "border-[color:var(--color-brand-500)]/30 bg-[color:var(--color-brand-500)]/10 text-[color:var(--color-brand-300)]",
    warm:
      "border-[color:var(--color-glow-500)]/30 bg-[color:var(--color-glow-500)]/10 text-[color:var(--color-glow-400)]",
  } as const;

  const dotColor = {
    default: "bg-[color:var(--color-text-muted)]",
    brand: "bg-[color:var(--color-brand-400)]",
    warm: "bg-[color:var(--color-glow-500)]",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm",
        toneClasses[tone],
        className
      )}
    >
      {dot ? (
        <span className="relative flex size-1.5">
          <span
            className={cn(
              "absolute inset-0 animate-pulse-ring rounded-full",
              dotColor[tone]
            )}
          />
          <span className={cn("size-1.5 rounded-full", dotColor[tone])} />
        </span>
      ) : null}
      {children}
    </span>
  );
}
