import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://www.thistlearchitecture.co.uk/journal", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(4000);

// scroll to bottom repeatedly to trigger lazy loading
for (let i = 0; i < 12; i++) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1200);
}

const links = await page.evaluate(() => {
  const seen = new Set();
  const out = [];
  for (const a of document.querySelectorAll("a[href]")) {
    const href = a.href.split("?")[0].replace(/\/$/, "");
    const text = (a.textContent || "").trim().replace(/\s+/g, " ");
    if (!href.includes("thistlearchitecture.co.uk")) continue;
    if (/\/(journal|home|contact|about|privacy|terms|category|tag)/.test(href)) continue;
    if (href === "https://www.thistlearchitecture.co.uk") continue;
    if (seen.has(href)) continue;
    seen.add(href);
    out.push({ href, text: text.slice(0, 90) });
  }
  return out;
});
console.log(JSON.stringify(links, null, 1));
await browser.close();
