#!/usr/bin/env node
/**
 * Capture project screenshots with Playwright.
 *
 * Usage:
 *   node scripts/capture-screenshots.mjs
 *
 * Assumes the target dev servers are already running:
 *   - WD Website on http://localhost:3001
 *   - immoakte on http://localhost:3002 (if screenshotted)
 *
 * Writes PNGs to public/work/{wd,immoakte}/ next to this script.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_ROOT = join(__dirname, "..", "public", "work");

/** Deterministic wait: navigate, dismiss cookie banner, settle animations. */
async function prepareDocument(page, { dismissCookies = true } = {}) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.evaluate(() => document.fonts?.ready?.catch?.(() => {}));

  if (dismissCookies) {
    await page
      .getByRole("button", { name: /alle akzeptieren|accept all/i })
      .first()
      .click({ timeout: 1500 })
      .catch(() => {});
  }

  /* Disable intersection-observer-based reveal animations: force every
     motion element into its "visible" state by firing a big scroll, then
     returning to top. This avoids half-animated screenshots. */
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(250);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
}

async function capture({
  browser,
  url,
  outDir,
  slug,
  viewports = [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 390, height: 844 },
  ],
  fullPage = false,
  waitBeforeShot = 600,
}) {
  await mkdir(outDir, { recursive: true });

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2, /* retina */
    });
    const page = await context.newPage();

    console.log(`  → ${slug}/${vp.name}  (${vp.width}×${vp.height})`);
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await prepareDocument(page);
    await page.waitForTimeout(waitBeforeShot);

    const path = join(outDir, `${vp.name}.png`);
    await page.screenshot({ path, fullPage, type: "png" });

    await context.close();
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  console.log("▶ WD Website (http://localhost:3001)");
  await capture({
    browser,
    url: "http://localhost:3001",
    outDir: join(OUT_ROOT, "wd"),
    slug: "wd",
  });

  console.log("▶ immoakte (http://localhost:3002)");
  try {
    await capture({
      browser,
      url: "http://localhost:3002",
      outDir: join(OUT_ROOT, "immoakte"),
      slug: "immoakte",
    });
  } catch (err) {
    console.warn("  ✗ immoakte server not reachable — skipped");
    console.warn(`     ${err.message}`);
  }

  await browser.close();
  console.log("\n✓ done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
