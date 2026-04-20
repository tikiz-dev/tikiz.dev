"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FunnelOption } from "@/content/funnel";

/* ---------- SingleSelect ---------- */

export function SingleSelect({
  options,
  value,
  onChange,
}: {
  options: FunnelOption[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "group relative flex items-start gap-3 rounded-2xl border p-5 text-left",
              "transition-all duration-200 ease-[var(--ease-emphasized)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-400)]",
              selected
                ? "border-[color:var(--color-brand-500)] bg-[color:var(--color-brand-500)]/10 shadow-[0_0_0_1px_var(--color-brand-500),0_12px_40px_-8px_rgb(31_167_255_/_0.35)]"
                : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]"
            )}
          >
            <span
              className={cn(
                "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                selected
                  ? "border-[color:var(--color-brand-500)] bg-[color:var(--color-brand-500)] text-[color:var(--color-canvas-950)]"
                  : "border-white/20 bg-transparent"
              )}
            >
              {selected ? <Check className="size-3.5" strokeWidth={3} /> : null}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-medium text-[color:var(--color-text)]">
                {opt.label}
              </span>
              {opt.description ? (
                <span className="mt-1 block text-sm text-[color:var(--color-text-muted)] leading-relaxed">
                  {opt.description}
                </span>
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------- MultiSelect ---------- */

export function MultiSelect({
  options,
  value,
  onChange,
  maxSelect,
}: {
  options: FunnelOption[];
  value: string[];
  onChange: (v: string[]) => void;
  maxSelect?: number;
}) {
  const toggle = (v: string) => {
    if (value.includes(v)) {
      onChange(value.filter((x) => x !== v));
    } else {
      if (maxSelect && value.length >= maxSelect) return;
      onChange([...value, v]);
    }
  };

  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {options.map((opt) => {
        const selected = value.includes(opt.value);
        const disabled = !selected && maxSelect ? value.length >= maxSelect : false;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => toggle(opt.value)}
            disabled={disabled}
            className={cn(
              "group relative flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left",
              "transition-all duration-200 ease-[var(--ease-emphasized)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-400)]",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              selected
                ? "border-[color:var(--color-brand-500)] bg-[color:var(--color-brand-500)]/10"
                : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]"
            )}
          >
            <span
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                selected
                  ? "border-[color:var(--color-brand-500)] bg-[color:var(--color-brand-500)] text-[color:var(--color-canvas-950)]"
                  : "border-white/20 bg-transparent"
              )}
            >
              {selected ? <Check className="size-3.5" strokeWidth={3} /> : null}
            </span>
            <span className="text-[15px] font-medium text-[color:var(--color-text)]">
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------- TextInput ---------- */

export function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  autoFocus,
  ...rest
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoFocus?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      autoFocus={autoFocus}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "w-full rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4",
        "text-[15px] text-[color:var(--color-text)] placeholder:text-[color:var(--color-text-muted)]",
        "transition-colors focus:border-[color:var(--color-brand-400)] focus:bg-white/[0.04]",
        "focus:outline-none"
      )}
      {...rest}
    />
  );
}

/* ---------- Textarea ---------- */

export function Textarea({
  value,
  onChange,
  placeholder,
  rows = 5,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      rows={rows}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "w-full rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4",
        "text-[15px] text-[color:var(--color-text)] placeholder:text-[color:var(--color-text-muted)]",
        "transition-colors focus:border-[color:var(--color-brand-400)] focus:bg-white/[0.04]",
        "focus:outline-none resize-none leading-relaxed"
      )}
    />
  );
}
