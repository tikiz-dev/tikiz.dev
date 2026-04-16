import type { LucideIcon } from "lucide-react";
import { Globe, LayoutGrid, Rocket, Zap } from "lucide-react";

export type Service = {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: LucideIcon;
  highlight: string;
  highlightEn: string;
};

export const SERVICES: Service[] = [
  {
    title: "Moderne Marken-Websites",
    titleEn: "Modern brand websites",
    description:
      "Firmen- und Produktseiten, die laden bevor der Kunde blinzelt. Next.js, " +
      "Tailwind, durchdachte Typografie. Kein Template-Einheitsbrei.",
    descriptionEn:
      "Corporate and product sites that load before the visitor blinks. Next.js, " +
      "Tailwind, thoughtful typography. No template sameness.",
    icon: Globe,
    highlight: "Lighthouse ≥ 95",
    highlightEn: "Lighthouse ≥ 95",
  },
  {
    title: "Web-Apps & SaaS",
    titleEn: "Web apps & SaaS",
    description:
      "Vom Prototyp zum bezahlbaren Produkt: Auth, Datenbank, Billing, Dashboard. " +
      "Supabase + Next.js + Stripe als bewährtes Rückgrat.",
    descriptionEn:
      "From prototype to paying product: auth, database, billing, dashboard. " +
      "Supabase + Next.js + Stripe as a proven backbone.",
    icon: LayoutGrid,
    highlight: "Feature-Ready in Wochen",
    highlightEn: "Feature-ready in weeks",
  },
  {
    title: "WordPress-Modernisierung",
    titleEn: "WordPress modernization",
    description:
      "Alte WordPress-Installationen auf einen performanten Stack migrieren — mit " +
      "Redirects, SEO-Erhalt und keinem Verlust von Google-Rankings.",
    descriptionEn:
      "Migrating legacy WordPress installs to a performant stack — with redirects, " +
      "SEO preservation and no loss of Google rankings.",
    icon: Rocket,
    highlight: "SEO-erhaltend",
    highlightEn: "SEO-preserving",
  },
  {
    title: "Performance & SEO",
    titleEn: "Performance & SEO",
    description:
      "Bestehende Seiten in Core-Web-Vitals-Grün bringen: Bundle-Analyse, " +
      "Bilder-Pipeline, Schema.org, automatische Sitemaps.",
    descriptionEn:
      "Bringing existing sites into Core-Web-Vitals green: bundle analysis, image " +
      "pipeline, Schema.org, automatic sitemaps.",
    icon: Zap,
    highlight: "Messbar besser",
    highlightEn: "Measurably better",
  },
];
