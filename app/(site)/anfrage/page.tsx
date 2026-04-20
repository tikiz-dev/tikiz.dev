import type { Metadata } from "next";
import { FunnelShell } from "@/components/funnel/funnel-shell";

export const metadata: Metadata = {
  title: "Projekt starten",
  description:
    "In wenigen Minuten zur passenden Website: beantworte ein paar kurze Fragen " +
    "zu deinem Projekt und erhalte innerhalb von 24 Stunden ein persönliches Konzept.",
  alternates: { canonical: "/anfrage" },
};

export default function AnfragePage() {
  return <FunnelShell />;
}
