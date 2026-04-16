import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 rounded-full " +
    "font-medium transition-all duration-200 ease-[var(--ease-emphasized)] " +
    "disabled:pointer-events-none disabled:opacity-60 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "focus-visible:ring-offset-[color:var(--color-surface)] focus-visible:ring-[color:var(--color-brand-400)]",
  {
    variants: {
      variant: {
        primary:
          "bg-[color:var(--color-brand-500)] text-[color:var(--color-canvas-950)] " +
          "hover:bg-[color:var(--color-brand-400)] " +
          "shadow-[var(--shadow-glow-brand)] hover:shadow-[0_0_0_1px_rgb(31_167_255_/_0.4),0_24px_80px_-10px_rgb(31_167_255_/_0.5)]",
        secondary:
          "bg-white/5 text-[color:var(--color-text)] border border-white/10 backdrop-blur-sm " +
          "hover:bg-white/8 hover:border-white/20",
        ghost:
          "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)] " +
          "hover:bg-white/5",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-[15px]",
        lg: "h-14 px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

type CommonProps = ButtonVariants & {
  className?: string;
  children: React.ReactNode;
  withArrow?: boolean;
};

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({
  className,
  variant,
  size,
  withArrow,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...rest}
    >
      {children}
      {withArrow ? (
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      ) : null}
    </button>
  );
}

type ButtonLinkProps = CommonProps &
  Omit<React.ComponentProps<typeof Link>, "className" | "children">;

export function ButtonLink({
  className,
  variant,
  size,
  withArrow,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size }), className)}
      {...rest}
    >
      {children}
      {withArrow ? (
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      ) : null}
    </Link>
  );
}
