"use server";

import { Resend } from "resend";
import { funnelSubmissionSchema, labelFor, type FunnelSubmission } from "@/lib/funnel";
import { COMPANY, SITE } from "@/lib/utils";

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

const FROM_EMAIL = process.env.FUNNEL_FROM_EMAIL ?? "Tikiz <hallo@tikiz.dev>";
const OWNER_EMAIL = process.env.FUNNEL_OWNER_EMAIL ?? COMPANY.email;

export async function submitFunnel(raw: unknown): Promise<SubmitResult> {
  const parsed = funnelSubmissionSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path.join(".")] = issue.message;
    }
    return { ok: false, error: "Bitte prüfe die markierten Felder.", fieldErrors };
  }

  const data = parsed.data;

  // Honeypot — silently drop bots, return success.
  if (data.website && data.website.length > 0) {
    return { ok: true };
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("[funnel] RESEND_API_KEY not set");
    return {
      ok: false,
      error:
        "Der Versand ist gerade nicht möglich. Bitte schreib mir direkt an " +
        COMPANY.email +
        " — danke!",
    };
  }

  const resend = new Resend(apiKey);

  try {
    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: OWNER_EMAIL,
        replyTo: data.contact.email,
        subject: `Neue Projekt-Anfrage von ${data.contact.name}`,
        html: renderOwnerEmail(data),
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: data.contact.email,
        replyTo: OWNER_EMAIL,
        subject: "Deine Anfrage bei Tikiz ist angekommen",
        html: renderCustomerEmail(data),
      }),
    ]);
  } catch (err) {
    console.error("[funnel] Resend error", err);
    return {
      ok: false,
      error:
        "Der Versand ist fehlgeschlagen. Bitte versuch es später erneut oder schreib direkt an " +
        COMPANY.email +
        ".",
    };
  }

  return { ok: true };
}

/* ------------------------------------------------------------------ *
 * Email templates                                                     *
 * ------------------------------------------------------------------ */

function renderOwnerEmail(data: FunnelSubmission): string {
  const rows: [string, string][] = [
    ["Projekttyp", labelFor("projectType", data.projectType)],
  ];

  if (data.currentSystem) rows.push(["Aktuelles System", labelFor("currentSystem", data.currentSystem)]);
  if (data.currentUrl) rows.push(["Aktuelle URL", data.currentUrl]);
  if (data.goals.length) rows.push(["Ziele", data.goals.map((g) => labelFor("goals", g)).join(", ")]);
  if (data.industry) rows.push(["Branche", labelFor("industry", data.industry)]);
  if (data.scope) rows.push(["Umfang", labelFor("scope", data.scope)]);
  if (data.features.length) rows.push(["Funktionen", data.features.map((f) => labelFor("features", f)).join(", ")]);
  if (data.designState) rows.push(["Design & Content", labelFor("designState", data.designState)]);
  if (data.inspirations) rows.push(["Inspirationen", data.inspirations]);
  if (data.timeline) rows.push(["Zeitrahmen", labelFor("timeline", data.timeline)]);
  if (data.budget) rows.push(["Budget", labelFor("budget", data.budget)]);
  if (data.maintenance) rows.push(["Wartung", labelFor("maintenance", data.maintenance)]);

  rows.push(["", ""]);
  rows.push(["Name", data.contact.name]);
  rows.push(["E-Mail", data.contact.email]);
  if (data.contact.phone) rows.push(["Telefon", data.contact.phone]);
  if (data.contact.company) rows.push(["Firma", data.contact.company]);
  if (data.contact.message) rows.push(["Nachricht", data.contact.message]);

  const tableRows = rows
    .map(([label, value]) => {
      if (!label && !value) return `<tr><td colspan="2" style="padding:12px 0;"><hr style="border:none;border-top:1px solid #e5e7eb;margin:0" /></td></tr>`;
      return `<tr>
        <td style="padding:8px 16px 8px 0;color:#6b7280;font-size:14px;vertical-align:top;width:180px;">${escapeHtml(label)}</td>
        <td style="padding:8px 0;color:#111827;font-size:14px;white-space:pre-wrap;">${escapeHtml(value)}</td>
      </tr>`;
    })
    .join("");

  return wrap(`
    <h1 style="margin:0 0 8px;font-size:22px;color:#111827;">Neue Projekt-Anfrage</h1>
    <p style="margin:0 0 24px;color:#6b7280;font-size:14px;">
      von <strong style="color:#111827;">${escapeHtml(data.contact.name)}</strong>
      — direkte Antwort per Reply an <a style="color:#1fa7ff;" href="mailto:${escapeHtml(data.contact.email)}">${escapeHtml(data.contact.email)}</a>
    </p>
    <table style="width:100%;border-collapse:collapse;">${tableRows}</table>
  `);
}

function renderCustomerEmail(data: FunnelSubmission): string {
  return wrap(`
    <h1 style="margin:0 0 16px;font-size:22px;color:#111827;">
      Hallo ${escapeHtml(data.contact.name.split(" ")[0] || data.contact.name)},
    </h1>
    <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.6;">
      danke für deine Anfrage — sie ist bei mir angekommen. Ich schaue mir deine
      Antworten in Ruhe an und melde mich <strong>innerhalb von 24 Stunden</strong>
      persönlich bei dir mit einem ersten Konzept und einer Einschätzung zum Aufwand.
    </p>
    <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.6;">
      Falls du in der Zwischenzeit noch etwas ergänzen möchtest — einfach auf diese
      E-Mail antworten. Oder ruf mich gerne direkt an:
      <a style="color:#1fa7ff;" href="tel:${COMPANY.mobile.replace(/\s/g, "")}">${escapeHtml(COMPANY.mobile)}</a>.
    </p>
    <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">
      Bis bald,<br/>
      Özgür Tikiz<br/>
      <a style="color:#1fa7ff;" href="${SITE.url}">tikiz.dev</a>
    </p>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
    <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.6;">
      ${escapeHtml(COMPANY.legalName)} · Inhaber ${escapeHtml(COMPANY.owner)}<br/>
      ${escapeHtml(COMPANY.street)}, ${escapeHtml(COMPANY.zip)} ${escapeHtml(COMPANY.city)}<br/>
      USt-ID: ${escapeHtml(COMPANY.vatId)}
    </p>
  `);
}

function wrap(inner: string): string {
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:32px;">${inner}</div>
  </body></html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
