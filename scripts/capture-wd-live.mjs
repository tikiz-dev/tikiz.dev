import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true });

// Desktop
const desktopCtx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const desktop = await desktopCtx.newPage();
console.log("→ desktop");
await desktop.goto("https://weserbergland-dienstleistungen.de/", { waitUntil: "networkidle", timeout: 30000 });
await desktop.waitForTimeout(1500);
await desktop.screenshot({ path: "/Users/otikiz/Developer/tikiz.dev/public/work/wd/desktop.png", type: "png" });
await desktopCtx.close();

// Mobile
const mobileCtx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
});
const mobile = await mobileCtx.newPage();
console.log("→ mobile");
await mobile.goto("https://weserbergland-dienstleistungen.de/", { waitUntil: "networkidle", timeout: 30000 });
await mobile.waitForTimeout(1500);
await mobile.screenshot({ path: "/Users/otikiz/Developer/tikiz.dev/public/work/wd/mobile.png", type: "png" });
await mobileCtx.close();

await browser.close();
console.log("✓ done");
