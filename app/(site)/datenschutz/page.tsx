import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/legal-shell";
import { COMPANY, SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: `Datenschutzerklärung für ${SITE.url} gemäß DSGVO.`,
  alternates: { canonical: "/datenschutz" },
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <LegalShell
      eyebrow="Rechtliches"
      title="Datenschutzerklärung"
      lastUpdated="April 2026"
    >
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne
        der DSGVO ist:
      </p>
      <p>
        {COMPANY.legalName}
        <br />
        {COMPANY.owner}
        <br />
        {COMPANY.street}
        <br />
        {COMPANY.zip} {COMPANY.city}
        <br />
        E-Mail: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
      </p>

      <h2>2. Allgemeines zur Datenverarbeitung</h2>
      <p>
        Wir verarbeiten personenbezogene Daten der Nutzer unserer Website
        grundsätzlich nur, soweit dies zur Bereitstellung einer
        funktionsfähigen Website sowie unserer Inhalte und Leistungen
        erforderlich ist. Die Verarbeitung erfolgt regelmäßig nur nach
        Einwilligung der Nutzer (Art. 6 Abs. 1 lit. a DSGVO) oder wenn die
        Verarbeitung durch gesetzliche Vorschriften gestattet ist.
      </p>

      <h2>3. Hosting</h2>
      <p>
        Diese Website wird gehostet bei der Vercel Inc., 340 S Lemon Ave #4133,
        Walnut, CA 91789, USA. Vercel verarbeitet beim Aufruf der Seite
        technische Daten (insbesondere die IP-Adresse) zur Auslieferung der
        Inhalte. Mit Vercel besteht ein Auftragsverarbeitungsvertrag (AVV) auf
        Basis der EU-Standardvertragsklauseln. Weitere Informationen finden
        Sie in der{" "}
        <a
          href="https://vercel.com/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Datenschutzerklärung von Vercel
        </a>
        . Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
        Interesse an einer sicheren und performanten Bereitstellung).
      </p>

      <h2>4. Server-Logfiles</h2>
      <p>
        Bei jedem Aufruf der Website werden vom Hosting-Provider automatisch
        Informationen erfasst und in sogenannten Server-Logfiles gespeichert.
        Diese sind:
      </p>
      <ul>
        <li>Browsertyp und -version</li>
        <li>verwendetes Betriebssystem</li>
        <li>Referrer-URL</li>
        <li>Hostname des zugreifenden Rechners</li>
        <li>Uhrzeit der Serveranfrage</li>
        <li>IP-Adresse (gekürzt)</li>
      </ul>
      <p>
        Diese Daten werden nicht mit anderen Datenquellen zusammengeführt.
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Die Logs werden nach
        spätestens 30 Tagen gelöscht.
      </p>

      <h2>5. Kontaktaufnahme</h2>
      <p>
        Bei der Kontaktaufnahme per E-Mail oder über das Kontaktformular
        werden die Angaben des Nutzers zur Bearbeitung der Anfrage und für den
        Fall, dass Anschlussfragen entstehen, gespeichert. Die Übermittlung an
        unseren E-Mail-Provider erfolgt verschlüsselt.
      </p>
      <p>
        Für den Versand von E-Mails über das Kontaktformular nutzen wir den
        Dienst Resend (Resend, Inc., 2261 Market Street #5039, San Francisco,
        CA 94114, USA). Mit Resend besteht ein Auftragsverarbeitungsvertrag
        auf Basis der EU-Standardvertragsklauseln. Rechtsgrundlage für die
        Verarbeitung ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw.
        Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer
        zuverlässigen E-Mail-Zustellung). Die übermittelten Daten verbleiben
        bei uns, bis die Anfrage abgeschlossen ist und keine gesetzlichen
        Aufbewahrungspflichten entgegenstehen.
      </p>

      <h2>6. Cookies und Tracking</h2>
      <p>
        Diese Website setzt keine Tracking-Cookies und keine Drittanbieter-
        Analyse-Tools (z.B. Google Analytics, Facebook Pixel) ein. Es werden
        ausschließlich technisch notwendige Cookies verwendet — sofern
        überhaupt Cookies gesetzt werden. Eine Einwilligung des Nutzers ist
        hierfür nicht erforderlich.
      </p>

      <h2>7. Schriftarten (Fonts)</h2>
      <p>
        Diese Website verwendet selbst-gehostete Schriftarten. Es findet keine
        Verbindung zu externen Font-Servern (z.B. Google Fonts) statt. Ihre
        IP-Adresse wird beim Laden der Website nicht an Schriftarten-Anbieter
        übertragen.
      </p>

      <h2>8. Ihre Rechte als betroffene Person</h2>
      <p>
        Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie
        betreffenden personenbezogenen Daten:
      </p>
      <ul>
        <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
        <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
        <li>Recht auf Löschung (Art. 17 DSGVO)</li>
        <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
        <li>Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)</li>
      </ul>
      <p>
        Zur Geltendmachung dieser Rechte genügt eine formlose E-Mail an{" "}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
      </p>

      <h2>9. Beschwerderecht bei der Aufsichtsbehörde</h2>
      <p>
        Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über
        die Verarbeitung Ihrer personenbezogenen Daten zu beschweren. Zuständig
        ist die Landesbeauftragte für den Datenschutz Niedersachsen,
        Prinzenstraße 5, 30159 Hannover.
      </p>

      <h2>10. Aktualität dieser Datenschutzerklärung</h2>
      <p>
        Diese Datenschutzerklärung ist aktuell gültig und hat den Stand April
        2026. Durch die Weiterentwicklung der Website und der dort angebotenen
        Inhalte oder aufgrund geänderter gesetzlicher beziehungsweise
        behördlicher Vorgaben kann es notwendig werden, diese
        Datenschutzerklärung zu ändern.
      </p>
    </LegalShell>
  );
}
