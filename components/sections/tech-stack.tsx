import { Marquee } from "@/components/animations/marquee";
import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { STACK_ROW_A, STACK_ROW_B } from "@/content/stack";

export function TechStackSection() {
  return (
    <section className="relative py-20 overflow-hidden border-y border-white/5">
      <div aria-hidden className="absolute inset-0 bg-dotgrid opacity-30" />

      <Container className="relative">
        <ScrollReveal className="mb-10 text-center">
          <p className="eyebrow mb-2">Stack · Tools · Know-how</p>
          <h2 className="display-3 max-w-2xl mx-auto">
            Moderner Stack,{" "}
            <span className="text-gradient-brand">zero legacy</span>.
          </h2>
        </ScrollReveal>
      </Container>

      <div className="space-y-5 relative">
        <Marquee>
          {STACK_ROW_A.map((label) => (
            <StackChip key={label} label={label} />
          ))}
        </Marquee>
        <Marquee reverse>
          {STACK_ROW_B.map((label) => (
            <StackChip key={label} label={label} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function StackChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-6 py-3 font-display text-2xl font-semibold text-[color:var(--color-text)] tracking-tight sm:text-3xl">
      <span className="size-1.5 rounded-full bg-[color:var(--color-brand-400)]" />
      {label}
    </span>
  );
}
