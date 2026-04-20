"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { FUNNEL_STEPS, type FunnelStep } from "@/content/funnel";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FunnelProgress } from "@/components/funnel/progress";
import {
  SingleSelect,
  MultiSelect,
  TextInput,
  Textarea,
} from "@/components/funnel/fields";
import { submitFunnel } from "@/app/(site)/anfrage/actions";

type AnswerMap = Record<string, string | string[]>;

type ContactData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  consent: boolean;
};

const EMPTY_CONTACT: ContactData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
  consent: false,
};

export function FunnelShell() {
  const router = useRouter();
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [contact, setContact] = useState<ContactData>(EMPTY_CONTACT);
  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [pending, startTransition] = useTransition();
  const [website, setWebsite] = useState(""); // honeypot

  const visible = useMemo<FunnelStep[]>(
    () => FUNNEL_STEPS.filter((s) => !s.showIf || s.showIf(answers)),
    [answers]
  );

  const clampedIdx = Math.min(idx, visible.length - 1);
  const step = visible[clampedIdx];
  const isLast = clampedIdx === visible.length - 1;

  const setAnswer = (id: string, v: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [id]: v }));
    setError(null);
  };

  const canAdvance = useMemo(() => {
    if (!step) return false;
    if (step.type === "contact") {
      return contact.name.trim().length >= 2 && /.+@.+\..+/.test(contact.email) && contact.consent;
    }
    if (step.optional) return true;
    const v = answers[step.id];
    if (step.type === "multi-select") return Array.isArray(v) && v.length > 0;
    return typeof v === "string" && v.length > 0;
  }, [step, answers, contact]);

  const goNext = () => {
    if (!canAdvance) return;
    if (isLast) {
      submit();
      return;
    }
    setDirection(1);
    setIdx((i) => Math.min(i + 1, visible.length - 1));
  };

  const goPrev = () => {
    if (clampedIdx === 0) return;
    setDirection(-1);
    setIdx((i) => Math.max(i - 1, 0));
  };

  const submit = () => {
    setError(null);
    setFieldErrors({});
    startTransition(async () => {
      const payload = {
        projectType: (answers.projectType as string) ?? "",
        currentSystem: (answers.currentSystem as string) ?? "",
        currentUrl: (answers.currentUrl as string) ?? "",
        goals: (answers.goals as string[]) ?? [],
        industry: (answers.industry as string) ?? "",
        scope: (answers.scope as string) ?? "",
        features: (answers.features as string[]) ?? [],
        designState: (answers.designState as string) ?? "",
        inspirations: (answers.inspirations as string) ?? "",
        timeline: (answers.timeline as string) ?? "",
        budget: (answers.budget as string) ?? "",
        maintenance: (answers.maintenance as string) ?? "",
        contact,
        website,
      };

      const result = await submitFunnel(payload);
      if (result.ok) {
        router.push("/anfrage/danke");
      } else {
        setError(result.error);
        if (result.fieldErrors) setFieldErrors(result.fieldErrors);
      }
    });
  };

  return (
    <section className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden bg-hero-radial pt-28 pb-20 sm:pt-32 sm:pb-28">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-30" />
      <div
        aria-hidden
        className="absolute inset-0 bg-noise opacity-60 mix-blend-overlay"
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl">
          <FunnelProgress current={clampedIdx} total={visible.length} />

          <div className="mt-10 sm:mt-14">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="eyebrow mb-4">{step.eyebrow}</p>
                <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--color-text)] sm:text-[2.5rem] sm:leading-[1.1]">
                  {step.question}
                </h2>
                {step.helper ? (
                  <p className="mt-4 text-[15px] text-[color:var(--color-text-muted)] leading-relaxed sm:text-base">
                    {step.helper}
                  </p>
                ) : null}

                <div className="mt-10">
                  <StepField
                    step={step}
                    answers={answers}
                    setAnswer={setAnswer}
                    contact={contact}
                    setContact={setContact}
                    website={website}
                    setWebsite={setWebsite}
                    fieldErrors={fieldErrors}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {error ? (
            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <div className="mt-10 flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              onClick={goPrev}
              disabled={clampedIdx === 0 || pending}
              className={cn(clampedIdx === 0 && "invisible")}
            >
              <ArrowLeft className="size-4" />
              Zurück
            </Button>

            <Button
              variant="primary"
              onClick={goNext}
              disabled={!canAdvance || pending}
              size="lg"
            >
              {pending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Wird gesendet …
                </>
              ) : isLast ? (
                <>
                  Anfrage senden
                  <ArrowRight className="size-4" />
                </>
              ) : (
                <>
                  Weiter
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </Button>
          </div>

          <p className="mt-8 text-center text-xs text-[color:var(--color-text-muted)]">
            Deine Antworten werden ausschließlich zur Bearbeitung deiner Anfrage
            verwendet — keine Weitergabe an Dritte.
          </p>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function StepField({
  step,
  answers,
  setAnswer,
  contact,
  setContact,
  website,
  setWebsite,
  fieldErrors,
}: {
  step: FunnelStep;
  answers: AnswerMap;
  setAnswer: (id: string, v: string | string[]) => void;
  contact: ContactData;
  setContact: React.Dispatch<React.SetStateAction<ContactData>>;
  website: string;
  setWebsite: (v: string) => void;
  fieldErrors: Record<string, string>;
}) {
  if (step.type === "single-select" && step.options) {
    return (
      <SingleSelect
        options={step.options}
        value={(answers[step.id] as string) ?? ""}
        onChange={(v) => setAnswer(step.id, v)}
      />
    );
  }

  if (step.type === "multi-select" && step.options) {
    return (
      <MultiSelect
        options={step.options}
        value={(answers[step.id] as string[]) ?? []}
        onChange={(v) => setAnswer(step.id, v)}
        maxSelect={step.maxSelect}
      />
    );
  }

  if (step.type === "text") {
    return (
      <TextInput
        value={(answers[step.id] as string) ?? ""}
        onChange={(v) => setAnswer(step.id, v)}
        placeholder={step.placeholder}
        autoFocus
      />
    );
  }

  if (step.type === "textarea") {
    return (
      <Textarea
        value={(answers[step.id] as string) ?? ""}
        onChange={(v) => setAnswer(step.id, v)}
        placeholder={step.placeholder}
      />
    );
  }

  if (step.type === "contact") {
    return (
      <div className="space-y-4">
        {/* Honeypot — hidden from users, bots fill it in */}
        <div aria-hidden className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
          <label>
            Website
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FieldLabel label="Name *" error={fieldErrors["contact.name"]}>
            <TextInput
              value={contact.name}
              onChange={(v) => setContact((c) => ({ ...c, name: v }))}
              placeholder="Max Mustermann"
              autoFocus
            />
          </FieldLabel>

          <FieldLabel label="E-Mail *" error={fieldErrors["contact.email"]}>
            <TextInput
              type="email"
              value={contact.email}
              onChange={(v) => setContact((c) => ({ ...c, email: v }))}
              placeholder="max@firma.de"
            />
          </FieldLabel>

          <FieldLabel label="Telefon (optional)">
            <TextInput
              type="tel"
              value={contact.phone}
              onChange={(v) => setContact((c) => ({ ...c, phone: v }))}
              placeholder="+49 …"
            />
          </FieldLabel>

          <FieldLabel label="Firma (optional)">
            <TextInput
              value={contact.company}
              onChange={(v) => setContact((c) => ({ ...c, company: v }))}
              placeholder="Mustermann GmbH"
            />
          </FieldLabel>
        </div>

        <FieldLabel label="Möchtest du noch etwas ergänzen? (optional)">
          <Textarea
            value={contact.message}
            onChange={(v) => setContact((c) => ({ ...c, message: v }))}
            placeholder="Kurzer Kontext, Wünsche, offene Fragen …"
            rows={4}
          />
        </FieldLabel>

        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <input
            type="checkbox"
            checked={contact.consent}
            onChange={(e) => setContact((c) => ({ ...c, consent: e.target.checked }))}
            className="mt-0.5 size-4 shrink-0 cursor-pointer accent-[color:var(--color-brand-500)]"
          />
          <span className="text-sm text-[color:var(--color-text-muted)] leading-relaxed">
            Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner
            Anfrage verarbeitet werden. Details in der{" "}
            <a
              href="/datenschutz"
              target="_blank"
              className="text-[color:var(--color-text)] underline underline-offset-4 hover:text-[color:var(--color-brand-400)]"
            >
              Datenschutzerklärung
            </a>
            .
          </span>
        </label>
      </div>
    );
  }

  return null;
}

function FieldLabel({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-[color:var(--color-text-muted)]">
        {label}
      </span>
      {children}
      {error ? (
        <span className="mt-1.5 block text-xs text-red-300">{error}</span>
      ) : null}
    </label>
  );
}
