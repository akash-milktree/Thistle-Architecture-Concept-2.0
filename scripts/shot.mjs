import { chromium } from "playwright";

const [,, path = "/", name = "page"] = process.argv;
const ORIGIN = "http://localhost:3000";
const OUT = process.env.OUT_DIR || "/private/tmp/claude-501/-Users-ak-mac-mini-Downloads-Projects-thistle-live/1d6c0b2b-4db9-4b02-b412-b04961e5f229/scratchpad";

const browser = await chromium.launch();
for (const vp of [
  { tag: "375", width: 375, height: 812, isMobile: true, deviceScaleFactor: 2 },
  { tag: "1440", width: 1440, height: 900, isMobile: false, deviceScaleFactor: 1 },
]) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.deviceScaleFactor,
    isMobile: vp.isMobile,
  });
  const page = await ctx.newPage();
  await page.goto(`${ORIGIN}${path}`, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(2500);
  // force lazy content in
  await page.evaluate(async () => {
    await new Promise((res) => {
      let y = 0;
      const step = () => {
        y += 600;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) setTimeout(step, 120);
        else { window.scrollTo(0, 0); setTimeout(res, 400); }
      };
      step();
    });
  });
  await page.waitForTimeout(600);
  const overflow = await page.evaluate(() => document.body.scrollWidth - document.body.clientWidth);
  console.log(`${vp.tag}: horizontal overflow = ${overflow}px`);
  await page.screenshot({ path: `${OUT}/${name}-${vp.tag}.png`, fullPage: true });
  await ctx.close();
}
await browser.close();
