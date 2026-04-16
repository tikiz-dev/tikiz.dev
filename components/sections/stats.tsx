import { Container } from "@/components/ui/container";
import { Counter } from "@/components/animations/counter";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

const STATS = [
  { label: "Projekte gebaut", value: 2, suffix: "" },
  { label: "Lighthouse-Score Ø", value: 98, suffix: "" },
  { label: "Next.js-Version", value: 16, suffix: "" },
  { label: "Response-Zeit", value: 24, suffix: "h" },
] as const;

export function StatsSection() {
  return (
    <section className="relative py-20 sm:py-24 border-y border-white/5">
      <div aria-hidden className="absolute inset-0 bg-dotgrid opacity-40" />
      <Container className="relative">
        <ScrollReveal className="mx-auto max-w-2xl text-center mb-14">
          <p className="eyebrow mb-3">Klein, aber ernst gemeint</p>
          <h2 className="display-3">
            Qualität statt Volumen.{" "}
            <span className="text-[color:var(--color-text-muted)]">
              Jede Seite handwerklich gebaut.
            </span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.08} className="text-center">
              <p className="display-2 tabular-nums text-gradient-brand">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-[color:var(--color-text-muted)]">
                {s.label}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
