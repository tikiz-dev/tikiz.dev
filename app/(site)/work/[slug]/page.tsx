import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, ExternalLink } from "lucide-react";
import { PROJECTS, getProjectBySlug } from "@/content/projects";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { PageHero } from "@/components/sections/page-hero";
import { ProjectVisual } from "@/components/work/project-visual";
import {
  ScrollReveal,
  ScrollRevealStagger,
  ScrollRevealItem,
} from "@/components/animations/scroll-reveal";

const STATUS_LABEL = {
  live: "Live",
  development: "In Entwicklung",
  soon: "Demnächst live",
} as const;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: project.title,
      description: project.tagline,
      type: "article",
    },
  };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  /* Other projects (for the "Weiteres Projekt" footer block) */
  const others = PROJECTS.filter((p) => p.slug !== slug);

  return (
    <>
      <PageHero
        eyebrow={`Case Study · ${STATUS_LABEL[project.status]}`}
        title={
          <>
            {project.title}
            <span className="block display-3 font-medium text-gradient-warm mt-6">
              {project.tagline}
            </span>
          </>
        }
        description={project.description}
        meta={[
          { label: "Branche", value: project.industry },
          { label: "Rolle", value: project.role },
          { label: "Zeitraum", value: project.duration },
          { label: "Jahr", value: String(project.year) },
        ]}
      />

      {/* Live link */}
      {project.status === "live" && project.url && (
        <section className="relative">
          <Container>
            <ScrollReveal>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--color-brand-500)]/30 bg-[color:var(--color-brand-500)]/10 px-5 py-2.5 text-sm font-medium text-[color:var(--color-brand-300)] transition-colors hover:bg-[color:var(--color-brand-500)]/15 hover:text-[color:var(--color-brand-200)]"
              >
                Live-Website besuchen ·{" "}
                <span className="font-mono text-xs opacity-75">
                  {project.url.replace(/^https?:\/\//, "")}
                </span>
                <ExternalLink className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </ScrollReveal>
          </Container>
        </section>
      )}

      {/* Hero visual */}
      <section className="relative mt-8 sm:mt-10">
        <Container>
          <ScrollReveal>
            <ProjectVisual project={project} large />
          </ScrollReveal>
        </Container>
      </section>

      {/* Challenge */}
      <section className="relative py-24 sm:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
            <ScrollReveal>
              <p className="eyebrow mb-3">Ausgangslage</p>
              <h2 className="display-3">Die Challenge</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-lg text-[color:var(--color-text-muted)] leading-relaxed">
                {project.challenge}
              </p>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Tech-Stack quick view */}
      <section className="relative py-12 border-y border-white/5 bg-[color:var(--color-surface-muted)]/40">
        <Container>
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <p className="eyebrow">Tech-Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-[color:var(--color-text-muted)] font-mono"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Approach */}
      <section className="relative py-24 sm:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
            <ScrollReveal className="md:sticky md:top-28 md:self-start">
              <p className="eyebrow mb-3">Vorgehen</p>
              <h2 className="display-3 mb-5">
                Wie ich das{" "}
                <span className="text-gradient-brand">angegangen bin</span>.
              </h2>
              <p className="text-[color:var(--color-text-muted)] leading-relaxed">
                Drei Entscheidungen haben das Projekt geprägt — keine davon
                war unausweichlich, jede war begründet.
              </p>
            </ScrollReveal>

            <div className="space-y-14">
              {project.approach.map((section, i) => (
                <ScrollReveal key={section.heading} delay={i * 0.05}>
                  <div className="flex items-start gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-brand-500)]/30 bg-[color:var(--color-brand-500)]/10 text-sm font-mono font-medium text-[color:var(--color-brand-300)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 pt-1">
                      <h3 className="text-2xl font-semibold mb-4 text-[color:var(--color-text)]">
                        {section.heading}
                      </h3>
                      <div className="space-y-4 text-[color:var(--color-text-muted)] leading-relaxed">
                        {section.body.map((p, k) => (
                          <p key={k}>{p}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Outcome */}
      <section className="relative py-24 sm:py-28 border-t border-white/5">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
            <ScrollReveal>
              <p className="eyebrow mb-3">Ergebnis</p>
              <h2 className="display-3">
                Was{" "}
                <span className="text-gradient-warm">dabei rausgekommen</span>{" "}
                ist.
              </h2>
            </ScrollReveal>

            <ScrollRevealStagger className="space-y-4">
              {project.outcome.map((o) => (
                <ScrollRevealItem
                  key={o}
                  className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-5"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-brand-500)]/15 text-[color:var(--color-brand-300)]">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <p className="text-[color:var(--color-text-muted)] leading-relaxed pt-px">
                    {o}
                  </p>
                </ScrollRevealItem>
              ))}
            </ScrollRevealStagger>
          </div>
        </Container>
      </section>

      {/* Metrics */}
      <section className="relative py-24 border-t border-white/5">
        <Container>
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className="eyebrow mb-3">Zahlen</p>
            <h2 className="display-3">Messbar, nicht nur gefühlt.</h2>
          </ScrollReveal>

          <ScrollRevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {project.metrics.map((m) => (
              <ScrollRevealItem
                key={m.label}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              >
                <p className="display-3 tabular-nums text-gradient-brand">
                  {m.value}
                </p>
                <p className="mt-2 text-sm text-[color:var(--color-text)]">
                  {m.label}
                </p>
                {m.hint ? (
                  <p className="mt-1 text-xs text-[color:var(--color-text-subtle)] font-mono">
                    {m.hint}
                  </p>
                ) : null}
              </ScrollRevealItem>
            ))}
          </ScrollRevealStagger>
        </Container>
      </section>

      {/* Other projects + back link */}
      <section className="relative py-24 sm:py-28 border-t border-white/5">
        <Container>
          <ScrollReveal className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-3">Weitere Projekte</p>
              <h2 className="display-3">Mehr ansehen</h2>
            </div>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)] transition-colors"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
              Alle Projekte
            </Link>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-2">
            {others.map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="group block space-y-4"
              >
                <ProjectVisual project={p} />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold transition-colors group-hover:text-[color:var(--color-brand-300)]">
                      {p.title}
                    </p>
                    <p className="text-sm text-[color:var(--color-text-muted)] mt-1">
                      {p.tagline}
                    </p>
                  </div>
                  <ArrowUpRight className="size-5 text-[color:var(--color-text-muted)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[color:var(--color-text)]" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative py-24 sm:py-28">
        <Container>
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 p-12 sm:p-16 text-center ring-gradient">
              <div
                aria-hidden
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 60% at 50% 0%, rgb(31 167 255 / 0.18), transparent 70%), var(--color-canvas-900)",
                }}
              />
              <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-25" />

              <p className="eyebrow mb-4">Klingt nach deinem Projekt?</p>
              <h2 className="display-2 mb-6 max-w-2xl mx-auto">
                Lass uns reden — kostenlos und unverbindlich.
              </h2>
              <ButtonLink href="/#contact" size="lg" withArrow>
                Kennenlern-Gespräch
              </ButtonLink>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
