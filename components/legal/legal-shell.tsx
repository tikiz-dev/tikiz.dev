import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";

export function LegalShell({
  eyebrow,
  title,
  lastUpdated,
  children,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={`Stand: ${lastUpdated}`}
      />
      <section className="relative py-16 sm:py-20">
        <Container>
          <article className="prose-tx mx-auto">{children}</article>
        </Container>
      </section>
    </>
  );
}
