import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Danke für deine Anfrage",
  description: "Deine Projekt-Anfrage ist angekommen.",
  robots: { index: false, follow: false },
};

export default function DankePage() {
  return (
    <section className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden bg-hero-radial pt-32 pb-24 sm:pt-40">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-30" />
      <div
        aria-hidden
        className="absolute inset-0 bg-noise opacity-60 mix-blend-overlay"
      />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[color:var(--color-brand-500)]/15 text-[color:var(--color-brand-400)] ring-1 ring-[color:var(--color-brand-500)]/30">
            <CheckCircle2 className="size-8" />
          </div>

          <h1 className="display-1 mt-8">
            Danke — <span className="text-gradient-brand">deine Anfrage ist da.</span>
          </h1>

          <p className="mt-6 text-lg text-[color:var(--color-text-muted)] leading-relaxed">
            Ich schaue mir deine Antworten in Ruhe an und melde mich innerhalb
            von 24 Stunden persönlich bei dir mit einem ersten Konzept.
          </p>

          <p className="mt-4 text-[15px] text-[color:var(--color-text-muted)] leading-relaxed">
            Eine Bestätigung liegt bereits in deinem Postfach. Falls du mich
            schneller erreichen möchtest, schreib oder ruf einfach direkt an —
            Kontakt unten im Footer.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/" variant="secondary">
              Zurück zur Startseite
            </ButtonLink>
            <ButtonLink href="/work" variant="ghost" withArrow>
              Projekte ansehen
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
