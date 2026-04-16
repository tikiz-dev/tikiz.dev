import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/content/projects";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/sections/page-hero";
import { ProjectVisual } from "@/components/work/project-visual";
import {
  ScrollRevealStagger,
  ScrollRevealItem,
} from "@/components/animations/scroll-reveal";

export const metadata: Metadata = {
  title: "Projekte",
  description:
    "Ausgewählte Webentwicklungs-Projekte: Marken-Websites, SaaS-Produkte und " +
    "WordPress-Modernisierungen mit Next.js, TypeScript und Tailwind v4.",
  alternates: { canonical: "/work" },
};

export default function WorkIndex() {
  return (
    <>
      <PageHero
        eyebrow="Projekte"
        title={
          <>
            Was ich bisher{" "}
            <span className="text-gradient-brand">gebaut habe</span>.
          </>
        }
        description="Zwei Projekte, beide mit echtem Business-Kontext. Mehr kommt — ich nehme bewusst nur Projekte an, die ich auch zeigen darf."
        meta={[
          { label: "Aktive Projekte", value: String(PROJECTS.length) },
          { label: "Stack", value: "Next.js 16 · TypeScript" },
          { label: "Hosting", value: "Vercel · Supabase" },
          { label: "Fokus", value: "DACH · Remote" },
        ]}
      />

      <section className="relative py-20">
        <Container>
          <ScrollRevealStagger className="grid gap-8 md:grid-cols-2">
            {PROJECTS.map((p) => (
              <ScrollRevealItem key={p.slug}>
                <Link
                  href={`/work/${p.slug}`}
                  className="group block focus:outline-none"
                >
                  <div className="space-y-5">
                    <ProjectVisual project={p} />

                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <Badge dot tone={p.accent}>
                          {p.year}
                        </Badge>
                        <Badge>{p.industry}</Badge>
                      </div>
                      <h2 className="text-2xl font-semibold mb-2 transition-colors group-hover:text-[color:var(--color-brand-300)]">
                        {p.title}
                      </h2>
                      <p className="text-[color:var(--color-text-muted)] leading-relaxed mb-4">
                        {p.tagline}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-brand-300)]">
                        Case Study
                        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollRevealItem>
            ))}
          </ScrollRevealStagger>
        </Container>
      </section>
    </>
  );
}
