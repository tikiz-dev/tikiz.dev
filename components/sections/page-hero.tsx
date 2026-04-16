import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

export function PageHero({
  eyebrow,
  title,
  description,
  meta,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  meta?: { label: string; value: string }[];
}) {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24 bg-hero-radial scroll-mt-24">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-30" />
      <div
        aria-hidden
        className="absolute inset-0 bg-noise opacity-60 mix-blend-overlay"
      />

      <Container className="relative">
        <ScrollReveal>
          <Badge dot tone="brand">
            {eyebrow}
          </Badge>

          <h1 className="display-1 mt-6 max-w-4xl">{title}</h1>
          {description ? (
            <p className="mt-8 max-w-2xl text-lg text-[color:var(--color-text-muted)] leading-relaxed">
              {description}
            </p>
          ) : null}
        </ScrollReveal>

        {meta?.length ? (
          <ScrollReveal delay={0.15}>
            <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-8 border-t border-white/5 pt-8 sm:grid-cols-4">
              {meta.map((m) => (
                <div key={m.label} className="min-w-0">
                  <dt className="eyebrow mb-1.5">{m.label}</dt>
                  <dd className="truncate text-sm font-medium text-[color:var(--color-text)]">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        ) : null}
      </Container>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[color:var(--color-surface)]"
      />
    </section>
  );
}
