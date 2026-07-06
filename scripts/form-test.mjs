import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3000/feasibility-package", { waitUntil: "networkidle" });

await page.getByRole("button", { name: /Start Feasibility/ }).first().click();
await page.waitForTimeout(600);

// Step 1: continue disabled until address entered
const cont = page.getByRole("button", { name: "Continue" });
console.log("continue disabled before address:", await cont.isDisabled());
await page.getByPlaceholder(/High Street/).fill("4 St John's Street, Aylesbury HP20 1BS");
console.log("continue disabled after address:", await cont.isDisabled());
await cont.click();
await page.waitForTimeout(400);

// Step 2: project info, no required fields
await cont.click();
await page.waitForTimeout(400);

// Step 3: contact
console.log("continue disabled before contact:", await cont.isDisabled());
await page.getByPlaceholder("e.g. James Whitfield").fill("Test Person");
const emailInput = page.getByPlaceholder("e.g. james@northgate.co.uk");
await emailInput.fill("test@example.com");
console.log("continue disabled after contact:", await cont.isDisabled());
await cont.click();
await page.waitForTimeout(400);

// Step 4: review + submit
await page.getByRole("button", { name: "Submit" }).click();
await page.waitForTimeout(1500);
const success = await page.getByText("Thanks, we have your details.").count();
console.log("success message shown:", success === 1);

await page.screenshot({ path: "/private/tmp/claude-501/-Users-ak-mac-mini-Downloads-Projects-thistle-live/1d6c0b2b-4db9-4b02-b412-b04961e5f229/scratchpad/form-success.png" });
await browser.close();
