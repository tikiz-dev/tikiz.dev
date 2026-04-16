import { cn } from "@/lib/utils";

/**
 * TIKIZ wordmark. Variable-stroke gradient "T" crossbar, custom kerning.
 * Pure SVG — scales losslessly in any size.
 */
export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("text-[color:var(--color-text)]", className)}
        aria-label="Tikiz"
      >
        <defs>
          <linearGradient id="tx-dot" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-brand-400)" />
            <stop offset="100%" stopColor="var(--color-glow-500)" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="30" height="30" rx="8" fill="none" stroke="currentColor" strokeOpacity="0.14" />
        <path d="M8 10h16M16 10v14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="24" cy="22" r="2.6" fill="url(#tx-dot)" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 148 32"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-[color:var(--color-text)]", className)}
      aria-label="Tikiz"
    >
      <defs>
        <linearGradient id="tx-dot-full" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-400)" />
          <stop offset="100%" stopColor="var(--color-glow-500)" />
        </linearGradient>
      </defs>
      {/* T */}
      <path
        d="M4 6h24M16 6v22"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* I */}
      <path
        d="M36 12v16"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="36" cy="8" r="2" fill="currentColor" />
      {/* K */}
      <path
        d="M50 6v22M50 17l10 11M50 17l9-9"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* I */}
      <path
        d="M74 12v16"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="74" cy="8" r="2" fill="currentColor" />
      {/* Z */}
      <path
        d="M86 12h20M106 12l-20 16M86 28h20"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Accent dot */}
      <circle cx="116" cy="24" r="4" fill="url(#tx-dot-full)" />
    </svg>
  );
}
