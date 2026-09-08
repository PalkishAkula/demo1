/**
 * Scaffolds a new client site: one config JSON, one image folder, one registry
 * entry. Nothing else in the codebase needs to change.
 *
 *   node scripts/new-site.mjs
 *   node scripts/new-site.mjs --name "Sai Dental" --type dental \
 *     --phone "+91 98765 43210" --address "1st Floor, Kanuru Main Road"
 *
 * Flags win; anything missing is prompted for when the terminal is interactive.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import path from "node:path";

const TYPES = ["dental", "diagnostics"];

function parseFlags(argv) {
  const flags = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const [key, inline] = arg.slice(2).split("=");
    flags[key] = inline ?? argv[++i] ?? "";
  }
  return flags;
}

async function collect(flags) {
  const questions = [
    ["name", "Business name: "],
    ["type", `Type (${TYPES.join("/")}): `],
    ["phone", "Phone number: "],
    ["address", "Address line 1: "],
  ];

  const answers = {};
  let prompts;

  for (const [key, question] of questions) {
    if (flags[key]) {
      answers[key] = flags[key];
      continue;
    }
    if (!input.isTTY) {
      throw new Error(`Missing --${key}. Pass every value as a flag when running non-interactively.`);
    }
    prompts ??= createInterface({ input, output });
    answers[key] = await prompts.question(question);
  }

  prompts?.close();
  return answers;
}

const flags = parseFlags(process.argv.slice(2));
const answers = await collect(flags);

const name = answers.name.trim();
const type = answers.type.trim().toLowerCase();
const phone = answers.phone.trim();
const address = answers.address.trim();

if (!name || !phone || !address || !TYPES.includes(type)) {
  console.error(`Name, phone, address and a type of ${TYPES.join(" or ")} are all required.`);
  process.exit(1);
}

const siteId = name
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

const root = process.cwd();
const source = path.join(root, "src", "config", type === "dental" ? "sridevi-dental.json" : "krishna-labs.json");
const target = path.join(root, "src", "config", `${siteId}.json`);

if (existsSync(target)) {
  console.error(`src/config/${siteId}.json already exists. Rename the business or remove that file first.`);
  process.exit(1);
}

const config = JSON.parse(await readFile(source, "utf8"));

config.siteId = siteId;
config.brand.name = name;
config.brand.shortName = name;
config.brand.logoText = name
  .split(/\s+/)
  .slice(0, 2)
  .map((part) => part[0])
  .join("")
  .toUpperCase();
config.contact.phonePrimary = phone;
config.contact.phoneAlt = phone;
config.contact.whatsapp = phone;
config.contact.addressLine1 = address;
config.siteUrl = `https://${siteId}.vercel.app`;
config.isDemo = true;
config.seo.title = `${name} | Vijayawada`;
config.seo.description = `Vijayawada ${
  type === "dental" ? "clinic" : "diagnostic centre"
}. Replace this draft with the approved locality, price and service detail.`;

await writeFile(target, `${JSON.stringify(config, null, 2)}\n`, "utf8");
await mkdir(path.join(root, "public", "images", siteId), { recursive: true });
await writeFile(path.join(root, "public", "images", siteId, ".gitkeep"), "");

// Register the config so getSite() can resolve NEXT_PUBLIC_SITE_ID=<siteId>.
const registryPath = path.join(root, "src", "lib", "site.ts");
const registry = await readFile(registryPath, "utf8");
const variable = `site${siteId
  .split("-")
  .map((part) => part[0].toUpperCase() + part.slice(1))
  .join("")}`;

if (registry.includes(`"${siteId}":`)) {
  console.log(`${siteId} was already registered in src/lib/site.ts.`);
} else {
  const nextRegistry = registry
    .replace(
      'import type { SiteConfig } from "@/types/site";',
      `import ${variable} from "@/config/${siteId}.json";\nimport type { SiteConfig } from "@/types/site";`,
    )
    .replace("};\n\nexport function getSite", `  "${siteId}": ${variable} as SiteConfig,\n};\n\nexport function getSite`);

  if (nextRegistry === registry) {
    console.error("Could not patch src/lib/site.ts automatically. Add the import and registry entry by hand.");
    process.exit(1);
  }
  await writeFile(registryPath, nextRegistry, "utf8");
}

console.log(`
Created:
  src/config/${siteId}.json
  public/images/${siteId}/
  registry entry in src/lib/site.ts

Next:
  1. Replace the copied content, prices, hours and image paths.
  2. Drop compressed photos into public/images/${siteId}/.
  3. Run: NEXT_PUBLIC_SITE_ID=${siteId} npm run dev
`);
