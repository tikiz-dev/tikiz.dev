import type { Metadata } from "next";
import { Check, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { PageHero } from "@/components/sections/page-hero";
import {
  ScrollReveal,
  ScrollRevealStagger,
  ScrollRevealItem,
} from "@/components/animations/scroll-reveal";
import {
  PACKAGES,
  PUBLIC_MODULES,
  WARTUNG,
  CATEGORY_LABELS,
  getPackageModules,
  type ModuleCategory,
} from "@/content/pricing";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pakete & Leistungen",
  description:
    "Drei Einstiegs-Pakete für Websites — vom Onepage bis zur Full-Stack-Firmenseite. Modular kombinierbar, jedes Angebot wird individuell kalkuliert.",
  alternates: { canonical: "/pakete" },
};

const eurFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
const eur = (n: number) => eurFormatter.format(n);

const CATEGORY_ORDER: ModuleCategory[] = [
  "foundation",
  "pages",
  "features",
  "seo",
  "design",
  "compliance",
  "post-launch",
];

export default function PaketePage() {
  return (
    <>
      <PageHero
        eyebrow="Pakete & Leistungen"
        title={
          <>
            Drei Einstiege,{" "}
            <span className="text-gradient-warm">
              individuell kombinierbar
            </span>
            .
          </>
        }
        description="Vom Onepage bis zur Full-Stack-Firmenseite. Jedes Paket enthält eine feste Auswahl an Leistungen — Module lassen sich einzeln dazu- oder abbestellen. Der konkrete Preis steht im individuellen Angebot nach einem kurzen Kennenlerngespräch."
        meta={[
          { label: "Pakete", value: "3 Stufen" },
          { label: "Module", value: `${PUBLIC_MODULES.length} buchbar` },
          { label: "Stack", value: "Next.js 16" },
          { label: "Standort", value: "Hameln · Remote" },
        ]}
      />

      {/* Packages */}
      <section className="relative py-20 scroll-mt-24" id="pakete">
        <Container>
          <ScrollReveal>
            <div className="mb-12 max-w-2xl">
              <Badge dot tone="brand">Pakete</Badge>
              <h2 className="display-2 mt-5">
                Drei Einstiegs-Pakete, auf typische Projekte zugeschnitten.
              </h2>
              <p className="mt-4 text-[color:var(--color-text-muted)]">
                Jedes Paket ist eine geprüfte Kombination aus Modulen, die
                zusammen eine fertige Website ergeben. Die Richtpreise unten
                sind Startpunkte — der finale Umfang und damit der Preis wird
                im Gespräch festgelegt.
              </p>
            </div>
          </ScrollReveal>

          <ScrollRevealStagger className="grid gap-6 lg:grid-cols-3">
            {PACKAGES.map((pkg) => {
              const items = getPackageModules(pkg);
              const accentBorder =
                pkg.accent === "warm"
                  ? "border-[color:var(--color-glow-500)]/30"
                  : "border-[color:var(--color-brand-500)]/30";
              const accentGlow =
                pkg.accent === "warm"
                  ? "shadow-[0_0_0_1px_rgb(255_154_70_/_0.1),0_32px_80px_-20px_rgb(255_154_70_/_0.25)]"
                  : "shadow-[0_0_0_1px_rgb(31_167_255_/_0.1),0_32px_80px_-20px_rgb(31_167_255_/_0.25)]";
              return (
                <ScrollRevealItem key={pkg.slug}>
                  <article
                    className={cn(
                      "relative flex h-full flex-col overflow-hidden rounded-3xl border bg-[color:var(--color-surface-raised)] p-8 transition-shadow",
                      pkg.featured
                        ? `${accentBorder} ${accentGlow}`
                        : "border-white/10 hover:border-white/20"
                    )}
                  >
                    {pkg.featured && (
                      <div className="absolute right-4 top-4">
                        <Badge dot tone="warm">
                          <Sparkles className="size-3" /> Empfohlen
                        </Badge>
                      </div>
                    )}

                    <div className="text-3xl">{pkg.emoji}</div>
                    <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                      {pkg.name}
                    </h3>
                    <p className="mt-1 text-sm text-[color:var(--color-text-muted)]">
                      {pkg.tagline}
                    </p>
                    <p className="mt-4 text-sm text-[color:var(--color-text-muted)] leading-relaxed">
                      {pkg.audience}
                    </p>

                    <div className="mt-8">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm text-[color:var(--color-text-muted)]">
                          ab
                        </span>
                        <span className="text-4xl font-bold tracking-tight">
                          {eur(pkg.price)}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-[color:var(--color-text-subtle)]">
                        netto, individuell kalkuliert · Dauer {pkg.duration}
                      </p>
                    </div>

                    <p className="eyebrow mt-8 mb-3">Enthaltene Leistungen</p>
                    <ul className="space-y-2.5 text-sm">
                      {items.map(({ module, count }) => (
                        <li
                          key={module.id}
                          className="flex items-start gap-2.5"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-[color:var(--color-brand-400)]" />
                          <span className="text-[color:var(--color-text)]">
                            {module.name}
                            {count > 1 && (
                              <span className="text-[color:var(--color-text-muted)]">
                                {" "}
                                × {count}
                              </span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-8">
                      <ButtonLink
                        href="/anfrage"
                        variant={pkg.featured ? "primary" : "secondary"}
                        size="md"
                        withArrow
                        className="w-full"
                      >
                        Unverbindlich anfragen
                      </ButtonLink>
                    </div>
                  </article>
                </ScrollRevealItem>
              );
            })}
          </ScrollRevealStagger>

          <ScrollReveal delay={0.2}>
            <p className="mt-8 text-center text-sm text-[color:var(--color-text-muted)]">
              Laufende Drittkosten (Hosting, Domain, E-Mail-Versand) trägt der
              Kunde direkt bei den jeweiligen Anbietern — getrennt vom
              Projekt-Honorar.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Module catalog */}
      <section
        className="relative py-20 border-t border-white/5 scroll-mt-24"
        id="module"
      >
        <Container>
          <ScrollReveal>
            <div className="mb-12 max-w-2xl">
              <Badge dot tone="warm">Einzel-Module</Badge>
              <h2 className="display-2 mt-5">
                Alle Leistungen auf einen Blick.
              </h2>
              <p className="mt-4 text-[color:var(--color-text-muted)]">
                Jede Leistung ist ein abgegrenztes Modul mit klarem Umfang. Im
                Angebot werden die gewählten Module einzeln aufgeschlüsselt —
                so lässt sich jede spätere Änderung sauber nachvollziehen und
                neu berechnen.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-10">
            {CATEGORY_ORDER.map((cat) => {
              const mods = PUBLIC_MODULES.filter((m) => m.category === cat);
              if (mods.length === 0) return null;
              return (
                <ScrollReveal key={cat}>
                  <div>
                    <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-text-muted)]">
                      {CATEGORY_LABELS[cat]}
                    </h3>
                    <div className="grid gap-3 md:grid-cols-2">
                      {mods.map((m) => (
                        <div
                          key={m.id}
                          className="group relative rounded-xl border border-white/5 bg-[color:var(--color-surface-raised)]/60 p-5 transition-colors hover:border-white/15"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] tracking-wider text-[color:var(--color-text-subtle)]">
                              {m.id}
                            </span>
                            <h4 className="text-[15px] font-semibold">
                              {m.name}
                              {m.unit && (
                                <span className="ml-1.5 text-xs font-normal text-[color:var(--color-text-subtle)]">
                                  ({m.unit})
                                </span>
                              )}
                            </h4>
                          </div>
                          <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-text-muted)]">
                            {m.description}
                          </p>
                          {m.note && (
                            <p className="mt-2 text-xs text-[color:var(--color-text-subtle)]">
                              Hinweis: {m.note}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Wartung */}
      <section
        className="relative py-20 border-t border-white/5 scroll-mt-24"
        id="wartung"
      >
        <Container>
          <ScrollReveal>
            <div className="mb-12 max-w-2xl">
              <Badge dot tone="brand">Wartung</Badge>
              <h2 className="display-2 mt-5">
                Nach dem Launch — drei Wartungsstufen.
              </h2>
              <p className="mt-4 text-[color:var(--color-text-muted)]">
                Eine Website ohne Pflege verliert in 12 Monaten an Performance,
                Sicherheit und SEO-Ranking. Wer das nicht selbst managen will,
                bucht Care dazu. Kündbar nach 6 Monaten.
              </p>
            </div>
          </ScrollReveal>

          <ScrollRevealStagger className="grid gap-6 md:grid-cols-3">
            {WARTUNG.map((tier) => (
              <ScrollRevealItem key={tier.slug}>
                <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-[color:var(--color-surface-raised)] p-7">
                  <div className="text-2xl">{tier.icon}</div>
                  <h3 className="mt-3 text-xl font-semibold">{tier.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="text-sm text-[color:var(--color-text-muted)]">
                      ab
                    </span>
                    <span className="text-3xl font-bold tabular-nums">
                      {eur(tier.pricePerMonth)}
                    </span>
                    <span className="text-sm text-[color:var(--color-text-muted)]">
                      / Monat
                    </span>
                  </div>
                  <ul className="mt-6 space-y-2 text-sm">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-[color:var(--color-brand-400)]" />
                        <span className="text-[color:var(--color-text-muted)]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              </ScrollRevealItem>
            ))}
          </ScrollRevealStagger>

          <ScrollReveal delay={0.2}>
            <p className="mt-8 text-center text-sm text-[color:var(--color-text-muted)]">
              Ohne Wartungsvertrag werden Änderungen nach Aufwand abgerechnet —
              Stundensatz im individuellen Angebot.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* FAQ / Notes */}
      <section
        className="relative py-20 border-t border-white/5"
        id="hinweise"
      >
        <Container>
          <ScrollReveal>
            <div className="mb-10 max-w-2xl">
              <Badge>Hinweise</Badge>
              <h2 className="display-2 mt-5">Wichtiges zum Ablauf.</h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2">
            {NOTES.map((n) => (
              <ScrollReveal key={n.title}>
                <div className="rounded-2xl border border-white/5 bg-[color:var(--color-surface-raised)]/60 p-6">
                  <h3 className="text-base font-semibold">{n.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-text-muted)]">
                    {n.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 sm:py-32">
        <Container>
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 p-10 sm:p-16 text-center">
              <div
                aria-hidden
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 60% at 30% 20%, rgb(31 167 255 / 0.18), transparent 60%), radial-gradient(ellipse 50% 50% at 80% 100%, rgb(255 154 70 / 0.14), transparent 70%), var(--color-canvas-900)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-grid opacity-30"
              />
              <h2 className="display-2 mx-auto max-w-2xl">
                Unverbindliches Kennenlerngespräch?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[color:var(--color-text-muted)]">
                Fülle das kurze Briefing-Formular aus oder ruf direkt an.
                Danach bekommst du ein maßgeschneidertes Angebot mit konkreten
                Zahlen — transparent aufgeschlüsselt, 14 Tage gültig, ohne
                versteckte Positionen.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <ButtonLink href="/anfrage" size="lg" withArrow>
                  Projekt besprechen
                </ButtonLink>
                <ButtonLink href="/work" variant="secondary" size="lg">
                  Referenzen ansehen
                </ButtonLink>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}

const NOTES = [
  {
    title: "Angebot nach Kennenlerngespräch",
    body: "Der konkrete Preis deines Projekts hängt vom Umfang ab — welche Module gebraucht werden, wie viele Seiten, welche Integrationen. Nach einem kurzen Gespräch (30 Min, kostenlos) bekommst du ein individuelles Festpreis-Angebot.",
  },
  {
    title: "Alle Beträge netto",
    body: "Die angegebenen Beträge verstehen sich ohne Umsatzsteuer. Auf Rechnung kommt 19 % USt dazu.",
  },
  {
    title: "Tikiz-Honorar ≠ Drittkosten",
    body: "Hosting (Vercel), Domain, E-Mail-Versand und ähnliche laufende Kosten laufen direkt auf Accounts des Kunden und werden nicht über Tikiz abgerechnet — im Angebot transparent ausgewiesen.",
  },
  {
    title: "Angebot 14 Tage gültig",
    body: "Nach Eingang aller Projekt-Infos erstelle ich ein Festpreis-Angebot. Das bleibt 14 Tage gültig — genug Zeit zum Überlegen, kein Druck.",
  },
  {
    title: "Zahlungsmodalitäten",
    body: "Kleine Projekte: 50 % bei Auftrag, 50 % bei Launch. Größere Projekte: 30 % bei Auftrag, 40 % bei Design-Freigabe, 30 % bei Launch. Auf Wunsch Ratenzahlung.",
  },
  {
    title: "Änderungen nach Launch",
    body: "Mit Wartungsvertrag: aus dem monatlichen Kontingent. Ohne Vertrag: nach Aufwand zum individuellen Stundensatz. Neue Module jederzeit zubuchbar.",
  },
];
