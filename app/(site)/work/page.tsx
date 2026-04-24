import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
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
                <article className="group relative space-y-5">
                  <Link
                    href={`/work/${p.slug}`}
                    className="block focus:outline-none"
                    aria-label={`Case Study: ${p.title}`}
                  >
                    <ProjectVisual project={p} />
                  </Link>

                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <Badge dot tone={p.accent}>
                        {p.year}
                      </Badge>
                      <Badge>{p.industry}</Badge>
                    </div>
                    <Link
                      href={`/work/${p.slug}`}
                      className="focus:outline-none"
                    >
                      <h2 className="text-2xl font-semibold mb-2 transition-colors group-hover:text-[color:var(--color-brand-300)]">
                        {p.title}
                      </h2>
                    </Link>
                    <p className="text-[color:var(--color-text-muted)] leading-relaxed mb-4">
                      {p.tagline}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                      <Link
                        href={`/work/${p.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-brand-300)] hover:text-[color:var(--color-brand-200)] transition-colors"
                      >
                        Case Study
                        <ArrowUpRight className="size-4 transition-transform hover:translate-x-0.5 hover:-translate-y-0.5" />
                      </Link>

                      {p.status === "live" && p.url && (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-[color:var(--color-text-muted)] transition-colors hover:text-[color:var(--color-text)]"
                        >
                          Live-Website
                          <ExternalLink className="size-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </ScrollRevealItem>
            ))}
          </ScrollRevealStagger>
        </Container>
      </section>
    </>
  );
}
