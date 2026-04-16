import { Container } from "@/components/ui/container";
import {
  ScrollReveal,
  ScrollRevealStagger,
  ScrollRevealItem,
} from "@/components/animations/scroll-reveal";
import { SERVICES } from "@/content/services";

export function ServicesSection() {
  return (
    <section id="services" className="relative py-28 sm:py-36 scroll-mt-24">
      <Container>
        <ScrollReveal className="mb-16 max-w-2xl">
          <p className="eyebrow mb-3">Was ich mache</p>
          <h2 className="display-2">
            Vier Schwerpunkte —{" "}
            <span className="text-gradient-brand">alle aus einer Hand</span>.
          </h2>
          <p className="mt-5 text-lg text-[color:var(--color-text-muted)]">
            Kein Agentur-Chaos mit drei Ansprechpartnern und sechs Sub-Unternehmen.
            Du schreibst mir, ich liefere.
          </p>
        </ScrollReveal>

        <ScrollRevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <ScrollRevealItem key={s.title}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04]">
                  {/* subtle hover glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 60% at 50% 0%, rgb(31 167 255 / 0.08), transparent 70%)",
                    }}
                  />

                  <div className="relative">
                    <div className="mb-6 inline-flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[color:var(--color-brand-300)] transition-transform duration-500 group-hover:scale-105 group-hover:border-[color:var(--color-brand-500)]/40">
                      <Icon className="size-5" strokeWidth={1.6} />
                    </div>

                    <h3 className="mb-2 text-lg font-semibold text-[color:var(--color-text)]">
                      {s.title}
                    </h3>
                    <p className="mb-5 text-sm text-[color:var(--color-text-muted)] leading-relaxed">
                      {s.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-mono text-[color:var(--color-brand-300)]">
                      <span className="size-1.5 rounded-full bg-[color:var(--color-brand-400)]" />
                      {s.highlight}
                    </div>
                  </div>
                </article>
              </ScrollRevealItem>
            );
          })}
        </ScrollRevealStagger>
      </Container>
    </section>
  );
}
