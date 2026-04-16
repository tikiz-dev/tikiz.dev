"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { getFeaturedProjects, type Project } from "@/content/projects";
import { ProjectVisual } from "@/components/work/project-visual";
import { cn } from "@/lib/utils";

const STATUS_LABEL: Record<Project["status"], string> = {
  live: "Live",
  development: "In Entwicklung",
  soon: "Demnächst live",
};

export function FeaturedWork() {
  const projects = getFeaturedProjects();

  return (
    <section id="work" className="relative py-28 sm:py-36 scroll-mt-24">
      <Container>
        <ScrollReveal className="mb-16 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">Ausgewählte Arbeiten</p>
            <h2 className="display-2">
              Zwei Projekte,{" "}
              <span className="text-gradient-brand">beide mit Substanz</span>.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-[color:var(--color-text-muted)]">
            Kein Demo-Portfolio. Beide Projekte haben echten Kontext —
            eine eigene Firma, ein echtes Produkt mit Pricing-Modell.
          </p>
        </ScrollReveal>

        <div className="space-y-24">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  const reversed = index % 2 === 1;

  return (
    <ScrollReveal
      as="article"
      className={cn(
        "grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16",
        reversed && "md:[&>*:first-child]:order-2"
      )}
    >
      <div ref={ref} className="relative">
        <motion.div style={{ y }}>
          <ProjectVisual project={project} />
        </motion.div>
      </div>

      <div>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <Badge dot tone={project.accent}>
            {STATUS_LABEL[project.status]}
          </Badge>
          <Badge>{project.year}</Badge>
          <Badge>{project.role}</Badge>
        </div>

        <h3 className="display-3 mb-4">{project.title}</h3>
        <p className="mb-6 text-lg text-[color:var(--color-text-muted)] leading-relaxed">
          {project.tagline}
        </p>
        <p className="mb-8 text-[color:var(--color-text-muted)] leading-relaxed">
          {project.description}
        </p>

        <ul className="mb-8 space-y-2.5 text-sm text-[color:var(--color-text-muted)]">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-3">
              <span className="mt-[8px] block size-1.5 shrink-0 rounded-full bg-[color:var(--color-brand-400)]" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mb-8 flex flex-wrap gap-2">
          {project.stack.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[color:var(--color-text-muted)] font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/work/${project.slug}`}
          className="group inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-brand-300)] transition-colors hover:text-[color:var(--color-brand-200)]"
        >
          Case Study lesen
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </ScrollReveal>
  );
}

