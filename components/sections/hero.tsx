"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TextReveal } from "@/components/animations/text-reveal";
import { Magnetic } from "@/components/animations/magnetic";
import { SpotlightCursor } from "@/components/animations/spotlight-cursor";

/* 3D scene is client-only + lazy — fiber pulls in three.js (~130kb gz) */
const HeroScene = dynamic(
  () => import("@/components/3d/hero-scene").then((m) => m.HeroScene),
  { ssr: false }
);

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32 bg-hero-radial">
      {/* Background layers */}
      <div aria-hidden className="absolute inset-0 bg-grid opacity-[0.35]" />
      <div aria-hidden className="absolute inset-0 bg-noise opacity-70 mix-blend-overlay" />
      <SpotlightCursor size={640} />

      {/* Right-side 3D orb (absolutely positioned, responsive) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[14%] top-[10%] hidden h-[55vh] w-[55vh] max-h-[600px] max-w-[600px] opacity-80 lg:right-[-8%] lg:block xl:opacity-95"
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 flex items-center gap-3"
        >
          <Badge dot tone="brand">
            Freelance · Verfügbar für Projekte Q2/Q3 2026
          </Badge>
        </motion.div>

        <h1 className="display-1 max-w-5xl">
          <span className="block text-[color:var(--color-text)]">
            <TextReveal text="Websites," by="word" delay={0.15} />
          </span>
          <span className="block">
            <TextReveal
              text="die mehr können."
              by="word"
              delay={0.4}
              innerClassName="text-gradient-warm"
            />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-xl text-lg text-[color:var(--color-text-muted)] leading-relaxed"
        >
          Ich baue Marken-Websites und Web-Apps, die performant sind, gut aussehen
          und messbar Kunden gewinnen — mit Next.js&nbsp;16, TypeScript und
          viel Liebe zum Detail.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic strength={0.25}>
            <ButtonLink href="/#work" size="lg" withArrow>
              Projekte ansehen
            </ButtonLink>
          </Magnetic>
          <Magnetic strength={0.25}>
            <ButtonLink href="/#contact" size="lg" variant="secondary">
              Kennenlern-Gespräch
            </ButtonLink>
          </Magnetic>
        </motion.div>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-20 grid max-w-3xl grid-cols-2 gap-8 border-t border-white/5 pt-8 sm:grid-cols-4"
        >
          <HeroMeta label="Based in" value="Weserbergland · Remote" />
          <HeroMeta label="Stack" value="Next.js 16 · TypeScript" />
          <HeroMeta label="Stil" value="Performant · Animiert" />
          <HeroMeta label="Sprachen" value="DE · EN" />
        </motion.div>
      </Container>

      {/* Bottom fade to next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[color:var(--color-surface)]"
      />
    </section>
  );
}

function HeroMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="eyebrow mb-1.5">{label}</p>
      <p className="truncate text-sm font-medium text-[color:var(--color-text)]">
        {value}
      </p>
    </div>
  );
}
