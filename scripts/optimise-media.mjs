// Media optimisation pass. Run this whenever images are added to or replaced in
// public/images, before committing them.
//
// Written 2026-08-17 after an SEO audit flagged 28 files over 500kb and
// public/images had grown to 92MB. It encodes what that clean-up worked out, so
// the same reasoning does not have to be rediscovered:
//
//   1. Cap the long edge at 3840px. next/image never serves wider than that,
//      and the full-screen sketch viewer asks for 2400, so anything above 3840
//      is pixels nobody can ever see. Several sources were 8534px wide.
//   2. Optimise losslessly. Clop's aggressive mode (-a) saves a further ~16%
//      but measured 0.74% pixel difference against 0.06% for plain, twelve
//      times the error. Not worth it on architectural drawings that exist to be
//      read closely.
//   3. Convert anything still over 500kb to WebP. This matters for more than
//      file size: Next falls back to the SOURCE format for clients that do not
//      advertise WebP support, and Screaming Frog does not. With PNG sources a
//      crawler measured 1.6MB where a browser got 145KB, which is what put the
//      row on the audit in the first place. WebP sources make the fallback
//      small too.
//
// Usage:
//   npm run optimise-media           report only, changes nothing
//   npm run optimise-media -- --write  actually rewrite the files
//
// After --write, references to any converted file must be updated. The script
// finds them for you and refuses to leave you guessing.

import { execFileSync } from "node:child_process";
import { readdirSync, statSync, existsSync, readFileSync, unlinkSync } from "node:fs";
import { join, extname, basename, relative } from "node:path";

const CLOP = "/Applications/Clop.app/Contents/SharedSupport/ClopCLI";
const IMAGE_DIR = "public/images";
const MAX_EDGE = 3840;
const SIZE_LIMIT = 500 * 1024;
// Below this, optimising costs more time than it saves bytes.
const WORTH_TOUCHING = 200 * 1024;
const RASTER = new Set([".png", ".jpg", ".jpeg", ".webp"]);
// Where image paths are written, for the reference check after a conversion.
const CODE_DIRS = ["data", "sections", "views", "components", "src"];

const write = process.argv.includes("--write");

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (RASTER.has(extname(e.name).toLowerCase())) out.push(p);
  }
  return out;
}

const kb = (b) => `${Math.round(b / 1024)}K`;

function dimensions(file) {
  try {
    const out = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", file], {
      encoding: "utf8",
    });
    const w = +(out.match(/pixelWidth:\s*(\d+)/)?.[1] ?? 0);
    const h = +(out.match(/pixelHeight:\s*(\d+)/)?.[1] ?? 0);
    return { w, h };
  } catch {
    return { w: 0, h: 0 };
  }
}

function clop(args) {
  return execFileSync(CLOP, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
}

// Every place a given filename is referenced, so a conversion cannot silently
// break a page.
function referencesTo(name) {
  const hits = [];
  const scan = (dir) => {
    if (!existsSync(dir)) return;
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) scan(p);
      else if (/\.(ts|tsx)$/.test(e.name) && readFileSync(p, "utf8").includes(name)) hits.push(p);
    }
  };
  CODE_DIRS.forEach(scan);
  return hits;
}

// A plain <img> or motion.img skips next/image entirely and ships the source
// untouched. Two of these were shipping 19.6MB on one listing page, which was
// the real cause of the audit finding, so this runs on every invocation rather
// than only after a rewrite.
function warnRawImageTags() {
  const rawTags = [];
  const scanTags = (dir) => {
    if (!existsSync(dir)) return;
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) scanTags(p);
      else if (/\.tsx$/.test(e.name)) {
        // Blank out comments before scanning. The components that used to hold
        // these tags now carry comments explaining what was removed and why,
        // and matching those would report a problem that is already fixed.
        const src = readFileSync(p, "utf8")
          .replace(/\{\/\*[\s\S]*?\*\/\}/g, (m) => m.replace(/\S/g, " "))
          .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/\S/g, " "))
          .replace(/\/\/.*$/gm, "");
        src.split("\n").forEach((line, i) => {
          if (/<img[\s>]|motion\.img/.test(line)) rawTags.push(`${p}:${i + 1}`);
        });
      }
    }
  };
  CODE_DIRS.forEach(scanTags);
  if (rawTags.length) {
    console.log(`\nWARNING: raw image tags found. These bypass next/image and serve the source file:`);
    rawTags.forEach((t) => console.log(`  ${t}`));
  }
  return rawTags.length;
}

if (!existsSync(CLOP)) {
  console.error(`Clop not found at ${CLOP}\nInstall Clop, or adapt this script to another optimiser.`);
  process.exit(1);
}

const files = walk(IMAGE_DIR);
const before = files.reduce((n, f) => n + statSync(f).size, 0);

const oversized = [];
const heavy = [];
for (const f of files) {
  const { w, h } = dimensions(f);
  const size = statSync(f).size;
  if (Math.max(w, h) > MAX_EDGE) oversized.push({ f, w, h, size });
  else if (size > WORTH_TOUCHING) heavy.push({ f, size });
}

console.log(`${files.length} images, ${(before / 1048576).toFixed(1)}MB total`);
console.log(`  ${oversized.length} above ${MAX_EDGE}px`);
console.log(`  ${files.filter((f) => statSync(f).size > SIZE_LIMIT).length} above ${kb(SIZE_LIMIT)}`);

if (!write) {
  for (const { f, w, h, size } of oversized) {
    console.log(`  resize  ${relative(IMAGE_DIR, f)}  ${w}x${h}  ${kb(size)}`);
  }
  for (const f of files.filter((x) => statSync(x).size > SIZE_LIMIT)) {
    console.log(`  convert ${relative(IMAGE_DIR, f)}  ${kb(statSync(f).size)}`);
  }
  warnRawImageTags();
  console.log(`\nReport only. Re-run with --write to apply.`);
  process.exit(0);
}

// 1. Cap the long edge.
for (const { f, w, h } of oversized) {
  const factor = (MAX_EDGE / Math.max(w, h)).toFixed(4);
  clop(["downscale", "--factor", factor, "--no-progress", f]);
  console.log(`resized  ${relative(IMAGE_DIR, f)}`);
}

// 2. Lossless-grade optimise on everything worth the time.
const toOptimise = [...oversized.map((o) => o.f), ...heavy.map((h) => h.f)];
if (toOptimise.length) {
  clop(["optimise", "--no-progress", "--skip-errors", ...toOptimise]);
  console.log(`optimised ${toOptimise.length} files`);
}

// 3. Anything still over the limit becomes WebP. JPEGs are checked rather than
//    assumed: WebP came out 14% LARGER than the JPEG for the footer CTA photo,
//    so a blind conversion would have made that one worse.
const converted = [];
for (const f of walk(IMAGE_DIR)) {
  if (statSync(f).size <= SIZE_LIMIT || extname(f) === ".webp") continue;
  const originalSize = statSync(f).size;
  clop(["convert", "--format", "webp", "--quality", "90", f]);
  const webp = f.replace(/\.(png|jpe?g)$/i, ".webp");
  if (!existsSync(webp)) {
    console.log(`FAILED to convert ${relative(IMAGE_DIR, f)}, left as is`);
    continue;
  }
  if (statSync(webp).size >= originalSize) {
    unlinkSync(webp);
    console.log(`kept     ${relative(IMAGE_DIR, f)} as ${extname(f)} (WebP was larger)`);
    continue;
  }
  console.log(`converted ${relative(IMAGE_DIR, f)}  ${kb(originalSize)} -> ${kb(statSync(webp).size)}`);
  converted.push({ from: f, to: webp });
}

const after = walk(IMAGE_DIR).reduce((n, f) => n + statSync(f).size, 0);
console.log(`\n${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(1)}MB`);

if (converted.length) {
  console.log(`\n${converted.length} file(s) changed extension. Update these references, then delete the originals:`);
  for (const { from, to } of converted) {
    const refs = referencesTo(basename(from));
    console.log(`  ${basename(from)} -> ${basename(to)}`);
    for (const r of refs) console.log(`     ${r}`);
    if (!refs.length) console.log(`     (not referenced anywhere: check whether it should be)`);
  }
  console.log(`\nNothing was deleted. Re-point the references first, then remove the old files.`);
}

warnRawImageTags();
