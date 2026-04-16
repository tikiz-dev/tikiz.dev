import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind utility classes safely. Use everywhere className is composed
 * from multiple sources (props, variants, conditionals).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE = {
  name: "Tikiz",
  tagline: "Websites, die mehr können.",
  taglineEn: "Websites that do more.",
  description:
    "Freelance-Webentwicklung mit Next.js, TypeScript und modernem UI. Spezialisiert auf performante, animierte Marken-Websites und maßgeschneiderte Web-Apps.",
  descriptionEn:
    "Freelance web development with Next.js, TypeScript and modern UI. Specialized in performant, animated brand websites and custom web apps.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tikiz.dev",
  email: "hallo@tikiz.dev",
  emailEn: "hello@tikiz.dev",
  social: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
  },
} as const;

/**
 * Legal entity behind tikiz.dev. Webentwicklung läuft unter dem
 * bestehenden Einzelunternehmen "Weserbergland Dienstleistungen"
 * (Inhaber: Özgür Tikiz) als zusätzlicher Geschäftsbereich.
 */
export const COMPANY = {
  legalName: "Weserbergland Dienstleistungen",
  owner: "Özgür Tikiz",
  street: "Chamissostraße 23",
  zip: "31785",
  city: "Hameln",
  country: "Deutschland",
  phone: "+49 5151 7103786",
  mobile: "+49 176 84423764",
  /* Geschäfts-E-Mail für die Webdev-Marke. Eingehende Mails an die
     bestehende info@-Adresse werden weitergeleitet bis tikiz.dev/MX live
     ist. */
  email: SITE.email,
  vatId: "DE322581796",
  taxId: "22/144/16255",
} as const;

