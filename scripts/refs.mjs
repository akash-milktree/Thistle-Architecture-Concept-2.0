import { chromium } from "playwright";

const OUT = "/private/tmp/claude-501/-Users-ak-mac-mini-Downloads-Projects-thistle-live/1d6c0b2b-4db9-4b02-b412-b04961e5f229/scratchpad";
const SITES = [
  { name: "resi", url: "https://resi.co.uk/" },
  { name: "searchland", url: "https://searchland.co.uk/" },
  { name: "urbanist", url: "https://urbanistarchitecture.co.uk/" },
  { name: "hmodesigners", url: "https://hmodesigners.co.uk/" },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
for (const site of SITES) {
  try {
    await page.goto(site.url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(3500);
    // dismiss common cookie banners
    for (const label of ["Accept all", "Accept All", "Accept", "I agree", "Allow all"]) {
      const btn = page.getByRole("button", { name: label }).first();
      if (await btn.count() && await btn.isVisible().catch(() => false)) {
        await btn.click().catch(() => {});
        break;
      }
    }
    await page.waitForTimeout(800);
    // capture hero + next two sections (2.2 viewports tall)
    await page.screenshot({ path: `${OUT}/ref-${site.name}.png`, clip: { x: 0, y: 0, width: 1440, height: 1980 } });
    console.log(`OK ${site.name}`);
  } catch (e) {
    console.log(`FAIL ${site.name}: ${e.message.split("\n")[0]}`);
  }
}
await browser.close();
