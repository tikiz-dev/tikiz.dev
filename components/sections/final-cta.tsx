import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Magnetic } from "@/components/animations/magnetic";
import { Mail } from "lucide-react";
import { SITE } from "@/lib/utils";

export function FinalCTA() {
  return (
    <section id="contact" className="relative py-28 sm:py-36 scroll-mt-24">
      <Container>
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 p-10 sm:p-16 md:p-20 ring-gradient">
            {/* Background layers */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(ellipse 60% 60% at 20% 10%, rgb(31 167 255 / 0.22), transparent 60%), radial-gradient(ellipse 50% 50% at 90% 100%, rgb(255 154 70 / 0.18), transparent 70%), var(--color-canvas-900)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-grid opacity-30"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-noise opacity-60 mix-blend-overlay"
            />

            <div className="max-w-3xl">
              <p className="eyebrow mb-4">Bereit loszulegen?</p>
              <h2 className="display-1">
                Dein nächstes{" "}
                <span className="text-gradient-warm">Web-Projekt</span>.
              </h2>
              <p className="mt-6 text-lg text-[color:var(--color-text-muted)] leading-relaxed max-w-xl">
                Ob Firmenseite, Web-App oder Modernisierung einer bestehenden
                WordPress-Installation — schreib mir kurz, was du brauchst.
                Antwort innerhalb von 24&nbsp;Stunden.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Magnetic strength={0.3}>
                  <ButtonLink href="/anfrage" size="lg" withArrow>
                    Projekt starten
                  </ButtonLink>
                </Magnetic>
                <ButtonLink
                  href={`mailto:${SITE.email}?subject=Projektanfrage`}
                  size="lg"
                  variant="secondary"
                >
                  <Mail className="size-4 mr-1" />
                  Direkt per E-Mail
                </ButtonLink>
              </div>

              <p className="mt-8 text-xs font-mono text-[color:var(--color-text-subtle)]">
                Oder schreib mir direkt auf LinkedIn / GitHub — Antwort innerhalb 24&nbsp;h
              </p>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
