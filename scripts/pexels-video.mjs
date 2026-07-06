import { chromium } from "playwright";

const query = process.argv[2] || "aerial houses england";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`https://www.pexels.com/search/videos/${encodeURIComponent(query)}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(4000);

const links = await page.evaluate(() =>
  Array.from(document.querySelectorAll('a[href*="/video/"]'))
    .map((a) => ({ href: a.href, title: a.getAttribute("title") || a.textContent.trim().slice(0, 80) }))
    .filter((l, i, arr) => arr.findIndex((x) => x.href === l.href) === i)
    .slice(0, 10)
);
console.log(JSON.stringify(links, null, 1));
await browser.close();
