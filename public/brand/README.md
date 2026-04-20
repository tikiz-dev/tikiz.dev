# Tikiz Brand Assets

Quadratische Logo-Marke in zwei Varianten, für alle Einsatzbereiche außerhalb der Website.

## Verzeichnis

```
public/brand/
├── tikiz-mark.svg            ← Master (dunkel)
├── tikiz-mark-light.svg      ← Master (hell)
├── tikiz-mark-{size}.png     ← Exports dunkel (16 – 1024 px)
└── tikiz-mark-light-{size}.png ← Exports hell
```

Alle PNGs sind aus der SVG generiert — Qualität ist bei jeder Größe scharf.

## Welche Datei für was?

| Einsatz | Empfehlung |
|---|---|
| Favicon auf Website | wird automatisch aus `app/icon.svg` geliefert |
| GitHub / GitLab Avatar | `tikiz-mark-512.png` (GitHub empfiehlt 500+ px) |
| LinkedIn Profil | `tikiz-mark-1024.png` (LinkedIn skaliert auf 400×400) |
| Upwork / Malt / Contra | `tikiz-mark-512.png` oder `-1024.png` |
| Instagram / X / Bluesky | `tikiz-mark-1024.png` |
| Visitenkarte / Print | `tikiz-mark.svg` (vektorbasiert, unbegrenzt skalierbar) |
| Briefpapier / helle Hintergründe | `tikiz-mark-light-1024.png` |
| iOS Homescreen | wird aus `app/apple-icon.tsx` geliefert |
| E-Mail-Signatur | `tikiz-mark-64.png` oder `-128.png` |

**Faustregel:** SVG wenn möglich, PNG wenn SVG nicht unterstützt wird. PNG-Größe doppelt so hoch wie tatsächlich benötigt (Retina-Displays).

## Neue Größe generieren

Wenn eine spezifische Größe fehlt, in `scripts/export-brand-pngs.mjs` das `SIZES`-Array erweitern und ausführen:

```bash
node scripts/export-brand-pngs.mjs
```

Die PNGs werden aus den SVG-Master-Dateien regeneriert — nie die PNGs direkt bearbeiten.
