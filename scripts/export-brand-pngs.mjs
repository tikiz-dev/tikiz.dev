#!/usr/bin/env node
/**
 * Renders the Tikiz square mark SVGs to PNG at multiple sizes.
 *
 * Usage: node scripts/export-brand-pngs.mjs
 *
 * Writes to:
 *   public/brand/tikiz-mark-{size}.png
 *   public/brand/tikiz-mark-light-{size}.png
 */

import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const BRAND_DIR = join(ROOT, "public", "brand");

const SIZES = [16, 32, 64, 128, 180, 256, 512, 1024];

const VARIANTS = [
  { name: "tikiz-mark", file: "tikiz-mark.svg" },
  { name: "tikiz-mark-light", file: "tikiz-mark-light.svg" },
];

async function main() {
  const browser = await chromium.launch();
  try {
    for (const variant of VARIANTS) {
      const svg = readFileSync(join(BRAND_DIR, variant.file), "utf8");

      for (const size of SIZES) {
        const html = `<!doctype html><html><head><style>
          html,body { margin:0; padding:0; background:transparent; }
          .wrap { width:${size}px; height:${size}px; }
          .wrap svg { width:100%; height:100%; display:block; }
        </style></head><body><div class="wrap">${svg}</div></body></html>`;

        const page = await browser.newPage({
          viewport: { width: size, height: size },
          deviceScaleFactor: 1,
        });
        await page.setContent(html);
        const buf = await page.locator(".wrap").screenshot({
          omitBackground: true,
          type: "png",
        });
        const out = join(BRAND_DIR, `${variant.name}-${size}.png`);
        writeFileSync(out, buf);
        console.log(`✓ ${variant.name}-${size}.png`);
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
