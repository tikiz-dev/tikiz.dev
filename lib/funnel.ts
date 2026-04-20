import { z } from "zod";
import { FUNNEL_STEPS, type FunnelStep } from "@/content/funnel";

export const funnelSubmissionSchema = z.object({
  projectType: z.string().min(1),
  currentSystem: z.string().optional().default(""),
  currentUrl: z.string().optional().default(""),
  goals: z.array(z.string()).default([]),
  industry: z.string().optional().default(""),
  scope: z.string().optional().default(""),
  features: z.array(z.string()).default([]),
  designState: z.string().optional().default(""),
  inspirations: z.string().optional().default(""),
  timeline: z.string().optional().default(""),
  budget: z.string().optional().default(""),
  maintenance: z.string().optional().default(""),
  contact: z.object({
    name: z.string().min(2, "Bitte Namen angeben"),
    email: z.string().email("Bitte gültige E-Mail angeben"),
    phone: z.string().optional().default(""),
    company: z.string().optional().default(""),
    message: z.string().optional().default(""),
    consent: z.literal(true, { message: "Bitte Datenschutz bestätigen" }),
  }),
  /** Honeypot — must remain empty. */
  website: z.string().max(0).optional().default(""),
});

export type FunnelSubmission = z.infer<typeof funnelSubmissionSchema>;

export type FunnelAnswers = Record<string, string | string[]>;

/** Returns only the steps that are currently visible given the answers so far. */
export function visibleSteps(answers: FunnelAnswers): FunnelStep[] {
  return FUNNEL_STEPS.filter((s) => !s.showIf || s.showIf(answers));
}

/**
 * Turns an option `value` into its human-readable `label` for a step.
 * Falls back to the value itself if no match.
 */
export function labelFor(stepId: string, value: string): string {
  const step = FUNNEL_STEPS.find((s) => s.id === stepId);
  const opt = step?.options?.find((o) => o.value === value);
  return opt?.label ?? value;
}
