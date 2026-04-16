import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";

/**
 * Project visual — real screenshot when the project has one, stylised
 * browser-window mockup otherwise. Keeps the same outer shell so both
 * variants sit side-by-side on the homepage and listing without any
 * layout surprises.
 */
export function ProjectVisual({
  project,
  large = false,
  priority = false,
}: {
  project: Project;
  large?: boolean;
  priority?: boolean;
}) {
  const accentFrom =
    project.accent === "brand"
      ? "var(--color-brand-500)"
      : "var(--color-glow-500)";

  const shell =
    "group relative w-full overflow-hidden rounded-3xl border border-white/10 bg-[color:var(--color-surface-raised)] shadow-[var(--shadow-xl)] ring-gradient " +
    (large ? "aspect-[16/10]" : "aspect-[4/3]");

  return (
    <div className={shell}>
      {/* Inner glow tinted by project accent */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 70% 20%, color-mix(in oklab, ${accentFrom} 28%, transparent), transparent 70%)`,
        }}
      />

      {/* Window chrome */}
      <div className="relative z-10 flex items-center gap-1.5 border-b border-white/5 px-5 py-3 bg-[color:var(--color-surface-raised)]/80 backdrop-blur-sm">
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="ml-4 rounded-full bg-white/5 px-3 py-0.5 text-[11px] font-mono text-white/60">
          {project.url ?? `${project.slug}.tikiz.dev`}
        </span>
      </div>

      {/* Content area */}
      {project.screenshot ? (
        <ProjectScreenshot project={project} large={large} priority={priority} />
      ) : (
        <ProjectMockup project={project} large={large} />
      )}

      {/* Hover sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]"
      />
    </div>
  );
}

function ProjectScreenshot({
  project,
  large,
  priority,
}: {
  project: Project;
  large: boolean;
  priority: boolean;
}) {
  const shot = project.screenshot!;
  return (
    <div className="relative h-[calc(100%-44px)] w-full overflow-hidden">
      <Image
        src={shot.desktop}
        alt={shot.alt}
        fill
        sizes={
          large
            ? "(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
            : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
        }
        priority={priority}
        className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
      />
      {/* Subtle bottom shade so the corners blend into the rounded shell */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent"
      />
    </div>
  );
}

function ProjectMockup({
  project,
  large,
}: {
  project: Project;
  large: boolean;
}) {
  const accentFrom =
    project.accent === "brand"
      ? "var(--color-brand-500)"
      : "var(--color-glow-500)";
  const accentTo =
    project.accent === "brand"
      ? "var(--color-brand-700)"
      : "var(--color-glow-600)";

  return (
    <div className="relative flex h-[calc(100%-44px)] flex-col justify-between gap-5 p-6">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-25" />
      <div className="relative space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-mono text-white/70">
          <span
            className="size-1.5 rounded-full"
            style={{ background: accentFrom }}
          />
          {project.status === "live" ? "live" : project.status}
        </div>
        <p
          className={
            "font-semibold leading-tight " +
            (large ? "text-4xl" : "text-2xl")
          }
          style={{
            backgroundImage: `linear-gradient(135deg, #fff, ${accentFrom})`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {project.title}
        </p>
        <p
          className={
            "text-white/55 max-w-[70%] " + (large ? "text-sm" : "text-xs")
          }
        >
          {project.tagline}
        </p>
      </div>

      <div className="relative grid grid-cols-3 gap-2">
        {[0, 1, 2].map((k) => (
          <div
            key={k}
            className="aspect-[4/3] rounded-xl border border-white/5 bg-white/[0.03]"
            style={{
              background: `linear-gradient(135deg, ${accentTo}22, transparent 70%)`,
            }}
          />
        ))}
      </div>

      <div className="relative flex items-center justify-between">
        <div className="flex gap-2">
          {project.stack.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-mono text-white/60"
            >
              {s}
            </span>
          ))}
        </div>
        <ArrowUpRight className="size-4 text-white/60 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
      </div>
    </div>
  );
}
