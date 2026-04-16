import { Hero } from "@/components/sections/hero";
import { StatsSection } from "@/components/sections/stats";
import { FeaturedWork } from "@/components/sections/featured-work";
import { ServicesSection } from "@/components/sections/services-section";
import { TechStackSection } from "@/components/sections/tech-stack";
import { AboutPreview } from "@/components/sections/about-preview";
import { FinalCTA } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <FeaturedWork />
      <ServicesSection />
      <TechStackSection />
      <AboutPreview />
      <FinalCTA />
    </>
  );
}
