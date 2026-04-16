import { cn } from "@/lib/utils";

/**
 * Infinite horizontal marquee. Duplicates children so the CSS animation
 * translates -50% for a seamless loop.
 */
export function Marquee({
  children,
  className,
  reverse = false,
  slow = false,
  fade = true,
}: {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  slow?: boolean;
  fade?: boolean;
}) {
  const animClass = reverse
    ? "animate-marquee-reverse"
    : slow
      ? "animate-marquee-slow"
      : "animate-marquee";

  return (
    <div
      className={cn(
        "relative overflow-hidden pause-on-hover",
        fade &&
          "[mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]",
        className
      )}
    >
      <div className={cn("flex w-max gap-12 whitespace-nowrap", animClass)}>
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div className="flex shrink-0 items-center gap-12" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
