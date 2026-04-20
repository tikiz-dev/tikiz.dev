/**
 * Configuration for the Anfrage-Funnel. Each step is a question.
 * Steps can depend on previous answers (via `showIf`) — e.g. the
 * "aktueller Stand" step only appears for Relaunches / Umbauten.
 */

export type FunnelOption = {
  value: string;
  label: string;
  description?: string;
  icon?: string;
};

export type FunnelFieldType =
  | "single-select"
  | "multi-select"
  | "text"
  | "textarea"
  | "contact";

export type FunnelStep = {
  id: string;
  type: FunnelFieldType;
  eyebrow: string;
  question: string;
  helper?: string;
  options?: FunnelOption[];
  optional?: boolean;
  showIf?: (answers: Record<string, string | string[]>) => boolean;
  maxSelect?: number;
  placeholder?: string;
};

export const FUNNEL_STEPS: FunnelStep[] = [
  {
    id: "projectType",
    type: "single-select",
    eyebrow: "Schritt 1",
    question: "Was für ein Projekt hast du im Kopf?",
    helper: "Wähle aus, was am besten passt — du kannst später noch Details ergänzen.",
    options: [
      {
        value: "new",
        label: "Komplett neue Website",
        description: "Frisch aufsetzen, kein bestehender Auftritt oder gar nichts Verwertbares",
      },
      {
        value: "relaunch",
        label: "Relaunch / Modernisierung",
        description: "Bestehende Seite soll optisch und technisch auf neuesten Stand",
      },
      {
        value: "landingpage",
        label: "Landingpage",
        description: "Einzelne Seite für eine Kampagne, Produkt oder Aktion",
      },
      {
        value: "expand",
        label: "Onepager → mehrseitig ausbauen",
        description: "Aus einer Scroll-Seite eine richtige Website mit mehreren Bereichen machen",
      },
      {
        value: "add-features",
        label: "Bestehende Seite erweitern",
        description: "Neue Funktionen, neue Bereiche oder Inhalte hinzufügen",
      },
      {
        value: "unsure",
        label: "Weiß ich noch nicht genau",
        description: "Lass uns gemeinsam rausfinden, was passt",
      },
    ],
  },

  {
    id: "currentSystem",
    type: "single-select",
    eyebrow: "Schritt 2",
    question: "Womit ist deine aktuelle Seite gebaut?",
    helper: "Hilft mir abzuschätzen, wie aufwändig ein Umzug wird.",
    showIf: (a) => ["relaunch", "expand", "add-features"].includes(a.projectType as string),
    options: [
      { value: "wordpress", label: "WordPress", description: "Mit oder ohne Page-Builder (Elementor, Divi, …)" },
      { value: "wix", label: "Wix" },
      { value: "jimdo", label: "Jimdo" },
      { value: "squarespace", label: "Squarespace" },
      { value: "shopify", label: "Shopify" },
      { value: "webflow", label: "Webflow" },
      { value: "static", label: "HTML / statische Seite" },
      { value: "custom", label: "Individuell programmiert" },
      { value: "unknown", label: "Weiß ich nicht" },
      { value: "other", label: "Etwas anderes" },
    ],
  },

  {
    id: "currentUrl",
    type: "text",
    eyebrow: "Schritt 2b",
    question: "Hast du eine Beispiel-URL?",
    helper: "Deine aktuelle Website oder eine relevante Referenz.",
    placeholder: "https://…",
    optional: true,
    showIf: (a) => ["relaunch", "expand", "add-features"].includes(a.projectType as string),
  },

  {
    id: "goals",
    type: "multi-select",
    eyebrow: "Schritt 3",
    question: "Was soll die Website für dich erreichen?",
    helper: "Mehrfachauswahl möglich — bis zu 4.",
    maxSelect: 4,
    options: [
      { value: "leads", label: "Mehr Anfragen & Leads" },
      { value: "bookings", label: "Termine / Buchungen generieren" },
      { value: "trust", label: "Vertrauen & Professionalität ausstrahlen" },
      { value: "sales", label: "Produkte oder Services verkaufen" },
      { value: "info", label: "Info-Präsenz für Kunden" },
      { value: "modern-look", label: "Optisch moderner wirken" },
      { value: "mobile", label: "Besser auf dem Smartphone funktionieren" },
      { value: "seo", label: "Bei Google besser gefunden werden" },
      { value: "speed", label: "Schnellere Ladezeiten" },
      { value: "self-edit", label: "Inhalte selbst pflegen können" },
    ],
  },

  {
    id: "industry",
    type: "single-select",
    eyebrow: "Schritt 4",
    question: "In welcher Branche bist du unterwegs?",
    helper: "Hilft mir, passende Beispiele und Funktionen vorzuschlagen.",
    options: [
      { value: "handwerk", label: "Handwerk & Bau" },
      { value: "health", label: "Gesundheit, Pflege & Therapie" },
      { value: "gastro", label: "Gastronomie & Hotel" },
      { value: "retail", label: "Einzelhandel & E-Commerce" },
      { value: "service", label: "Dienstleistung" },
      { value: "consulting", label: "Beratung & Coaching" },
      { value: "real-estate", label: "Immobilien" },
      { value: "education", label: "Bildung & Kurse" },
      { value: "it", label: "IT & Software" },
      { value: "creative", label: "Kreativ & Agentur" },
      { value: "other", label: "Anderes" },
    ],
  },

  {
    id: "scope",
    type: "single-select",
    eyebrow: "Schritt 5",
    question: "Wie umfangreich soll die Seite werden?",
    helper: "Kein exakter Wert nötig — eine grobe Schätzung reicht.",
    options: [
      { value: "landingpage", label: "Einzelne Landingpage", description: "Ein starker Auftritt für ein Thema" },
      { value: "onepager", label: "Onepager", description: "Eine Seite, mehrere Sektionen zum Scrollen" },
      { value: "3-5", label: "3–5 Seiten", description: "Klassische Unternehmens-Website" },
      { value: "5-10", label: "5–10 Seiten", description: "Mit mehreren Leistungen, Referenzen, Blog" },
      { value: "10+", label: "10+ Seiten", description: "Umfangreicher Auftritt mit vielen Bereichen" },
      { value: "unsure", label: "Weiß ich noch nicht", description: "Gemeinsam rausfinden" },
    ],
  },

  {
    id: "features",
    type: "multi-select",
    eyebrow: "Schritt 6",
    question: "Welche Funktionen soll deine Seite haben?",
    helper: "Mehrfachauswahl. Wenn du unsicher bist — lieber alles anklicken, was interessant klingt.",
    options: [
      { value: "contact-form", label: "Kontaktformular" },
      { value: "booking", label: "Online-Terminbuchung" },
      { value: "newsletter", label: "Newsletter-Anmeldung" },
      { value: "multilang", label: "Mehrsprachig (DE / EN / …)" },
      { value: "blog", label: "Blog oder News-Bereich" },
      { value: "portfolio", label: "Referenzen / Portfolio" },
      { value: "reviews", label: "Google-Bewertungen einbinden" },
      { value: "social", label: "Social-Media-Integration" },
      { value: "whatsapp", label: "WhatsApp-Button" },
      { value: "maps", label: "Google-Maps-Anfahrt" },
      { value: "faq", label: "FAQ-Bereich" },
      { value: "downloads", label: "Downloads (PDFs, Flyer, …)" },
      { value: "member-area", label: "Login / Mitgliederbereich" },
      { value: "none-yet", label: "Noch keine konkrete Idee" },
    ],
  },

  {
    id: "designState",
    type: "single-select",
    eyebrow: "Schritt 7",
    question: "Wie ist der Stand bei Design & Inhalten?",
    helper: "Ehrlich antworten — alles ist okay. Ich kann in jedem Fall unterstützen.",
    options: [
      {
        value: "complete",
        label: "Alles da",
        description: "Logo, Corporate Design, Texte und Bilder liegen vor",
      },
      {
        value: "brand-only",
        label: "Logo & CI vorhanden, Texte fehlen",
        description: "Ich sollte beim Texten unterstützen",
      },
      {
        value: "logo-only",
        label: "Logo da, Design und Texte offen",
        description: "Design und Texte werden im Projekt entwickelt",
      },
      {
        value: "nothing",
        label: "Muss alles neu entstehen",
        description: "Logo, Design, Texte — wir machen das Gesamtpaket",
      },
    ],
  },

  {
    id: "inspirations",
    type: "textarea",
    eyebrow: "Schritt 8",
    question: "Welche Websites gefallen dir?",
    helper: "1–3 Beispiele reichen. Was dich daran anspricht, kannst du gerne dazuschreiben. (optional)",
    placeholder: "z. B. apple.com — klares, minimalistisches Design\nlinear.app — die Animationen fand ich cool",
    optional: true,
  },

  {
    id: "timeline",
    type: "single-select",
    eyebrow: "Schritt 9",
    question: "Wann soll die Seite live sein?",
    options: [
      { value: "asap", label: "So schnell wie möglich", description: "Innerhalb von 2–4 Wochen" },
      { value: "1m", label: "Innerhalb 1 Monats" },
      { value: "1-3m", label: "1–3 Monate", description: "Gut für sauber durchdachte Projekte" },
      { value: "3m+", label: "3+ Monate / flexibel" },
      { value: "fixed-date", label: "Ich habe einen festen Termin", description: "Messe, Eröffnung, Kampagnenstart" },
    ],
  },

  {
    id: "budget",
    type: "single-select",
    eyebrow: "Schritt 10",
    question: "In welchem Budget-Rahmen bewegen wir uns?",
    helper: "Bleibt natürlich vertraulich. Hilft mir, dir das passende Konzept vorzuschlagen.",
    options: [
      { value: "<1500", label: "Unter 1.500 €" },
      { value: "1500-3000", label: "1.500 – 3.000 €" },
      { value: "3000-6000", label: "3.000 – 6.000 €" },
      { value: "6000-10000", label: "6.000 – 10.000 €" },
      { value: "10000+", label: "10.000 € +" },
      { value: "unsure", label: "Noch kein Rahmen festgelegt" },
    ],
  },

  {
    id: "maintenance",
    type: "single-select",
    eyebrow: "Schritt 11",
    question: "Laufende Betreuung nach dem Launch?",
    helper: "Updates, Backups, Sicherheits-Monitoring, kleine Änderungen. Du kannst dich später immer noch entscheiden.",
    options: [
      { value: "yes", label: "Ja, klingt gut", description: "Monatliche Betreuung ins Angebot aufnehmen" },
      { value: "maybe", label: "Zeig mir beide Varianten", description: "Angebot mit und ohne Wartung, dann entscheide ich" },
      { value: "no", label: "Nein, pflege ich selbst", description: "Nur der Launch" },
    ],
  },

  {
    id: "contact",
    type: "contact",
    eyebrow: "Fast geschafft",
    question: "Wohin darf ich dir das Konzept schicken?",
    helper: "Du erhältst innerhalb von 24 Stunden eine persönliche Antwort.",
  },
];
