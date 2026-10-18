#!/usr/bin/env node
// Menyalin tipe Payload hasil generate dari CMS ke repo ini agar frontend punya tipe yang persis sama dengan skema konten.
//
//   pnpm sync:types              (repo hris-cms ada di sebelah repo ini)
//   CMS_REPO=/path/ke/cms pnpm sync:types
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CMS_REPO = resolve(process.env.CMS_REPO ?? join(ROOT, "..", "hris-cms"));
const SOURCE = join(CMS_REPO, "src", "payload-types.ts");
const TARGET = join(ROOT, "src", "types", "cms.ts");

if (!existsSync(SOURCE)) {
  console.error(`payload-types.ts tidak ditemukan di ${SOURCE}. Jalankan "npm run generate:types" di CMS dulu.`);
  process.exit(1);
}

copyFileSync(SOURCE, TARGET);
// File hasil generate menambah modul `payload`, yang tidak dipasang di frontend.
const source = readFileSync(TARGET, "utf8").replace(/\ndeclare module 'payload' \{[\s\S]*?\n\}\n?/, "\n");
writeFileSync(TARGET, `// AUTO-GENERATED from the CMS by scripts/sync-cms-types.mjs — do not edit.\n${source}`);
console.log(`Synced ${SOURCE} -> ${TARGET}`);
