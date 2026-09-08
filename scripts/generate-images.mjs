/**
 * Renders every photographic slot on the demo sites as flat duotone artwork.
 *
 *   node scripts/generate-images.mjs
 *
 * The demos ship without client photography, so each `next/image` source is
 * drawn here instead of left as a 404. Drop a real JPEG over any file to
 * replace it — the paths and aspect ratios are what the components expect.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { palettes } from "./lib/art-primitives.mjs";
import * as scenes from "./lib/art-scenes.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = (site) => path.join(root, "public", "images", site);

/** @type {{site: string, file: string, scene: keyof typeof scenes, size: [number, number], opts?: object}[]} */
const manifest = [
  // ---------------------------------------------------------------- dental
  { site: "sridevi-dental", file: "hero-clinic.jpg", scene: "dentalOperatory", size: [1800, 1520], opts: { caption: "Operatory 1 · Benz Circle" } },
  { site: "sridevi-dental", file: "clinic-exterior.jpg", scene: "clinicExterior", size: [1440, 1080], opts: { sign: "SRIDEVI DENTAL", floor: "2nd Floor, above HDFC Bank", caption: "Benz Circle entrance" } },
  { site: "sridevi-dental", file: "reception.jpg", scene: "reception", size: [1440, 1080], opts: { mark: "SD", caption: "Reception" } },
  { site: "sridevi-dental", file: "treatment-chair.jpg", scene: "dentalOperatory", size: [1440, 1080], opts: { caption: "Operatory 2" } },
  { site: "sridevi-dental", file: "consultation-room.jpg", scene: "consultRoom", size: [1440, 1080], opts: { caption: "Consultation room" } },
  { site: "sridevi-dental", file: "sterilisation.jpg", scene: "sterilisation", size: [1440, 1080], opts: { caption: "Autoclave bay" } },
  { site: "sridevi-dental", file: "digital-xray.jpg", scene: "digitalXray", size: [1440, 1080], opts: { caption: "RVG and OPG" } },
  { site: "sridevi-dental", file: "kids-corner.jpg", scene: "kidsCorner", size: [1440, 1080], opts: { caption: "Kids corner" } },
  { site: "sridevi-dental", file: "smile-consultation.jpg", scene: "smileConsult", size: [1440, 1080], opts: { caption: "Shade matching" } },

  { site: "sridevi-dental", file: "dr-sridevi-kolluri.jpg", scene: "portrait", size: [1152, 1280], opts: { variant: 2, caption: "Prosthodontics" } },
  { site: "sridevi-dental", file: "dr-harsha-vardhan-reddy.jpg", scene: "portrait", size: [1152, 1280], opts: { variant: 0, caption: "Orthodontics" } },
  { site: "sridevi-dental", file: "dr-anusha-peddi.jpg", scene: "portrait", size: [1152, 1280], opts: { variant: 1, caption: "Paediatric dentistry" } },

  { site: "sridevi-dental", file: "case-crowns-before.jpg", scene: "toothArch", size: [1440, 1080], opts: { state: "before", chip: 5, caption: "Before · worn front teeth" } },
  { site: "sridevi-dental", file: "case-crowns-after.jpg", scene: "toothArch", size: [1440, 1080], opts: { state: "after", caption: "After · full ceramic crowns" } },
  { site: "sridevi-dental", file: "case-aligners-before.jpg", scene: "toothArch", size: [1440, 1080], opts: { state: "before", caption: "Before · crowding" } },
  { site: "sridevi-dental", file: "case-aligners-after.jpg", scene: "toothArch", size: [1440, 1080], opts: { state: "after", caption: "After · clear aligners" } },
  { site: "sridevi-dental", file: "case-implant-before.jpg", scene: "toothArch", size: [1440, 1080], opts: { state: "before", missing: 9, caption: "Before · missing molar" } },
  { site: "sridevi-dental", file: "case-implant-after.jpg", scene: "toothArch", size: [1440, 1080], opts: { state: "after", caption: "After · single implant" } },
  { site: "sridevi-dental", file: "case-whitening-before.jpg", scene: "toothArch", size: [1440, 1080], opts: { state: "before", caption: "Before · tea staining" } },
  { site: "sridevi-dental", file: "case-whitening-after.jpg", scene: "toothArch", size: [1440, 1080], opts: { state: "after", caption: "After · in-clinic whitening" } },

  // ------------------------------------------------------------------ labs
  { site: "krishna-labs", file: "lab-exterior.jpg", scene: "labExterior", size: [1440, 1080], opts: { sign: "KRISHNA PATH LABS", floor: "Ground Floor, Sai Arcade", caption: "MG Road, Governorpet" } },
  { site: "krishna-labs", file: "collection-desk.jpg", scene: "collectionDesk", size: [1440, 1080], opts: { caption: "Collection room" } },
  { site: "krishna-labs", file: "xray-room.jpg", scene: "xrayRoom", size: [1440, 1080], opts: { caption: "Digital X-ray suite" } },
  { site: "krishna-labs", file: "analyser.jpg", scene: "labAnalyser", size: [1440, 1080], opts: { caption: "Biochemistry bench" } },
  { site: "krishna-labs", file: "home-visit.jpg", scene: "homeVisit", size: [1080, 1080], opts: { caption: "Collection at home" } },
  { site: "krishna-labs", file: "dr-naveen-varma.jpg", scene: "pathologistDesk", size: [1280, 1280], opts: { caption: "Every report is signed" } },

  { site: "krishna-labs", file: "facility-analyser.jpg", scene: "labAnalyser", size: [560, 560], opts: { caption: "Analyser" } },
  { site: "krishna-labs", file: "facility-collection.jpg", scene: "sampleTray", size: [560, 560], opts: { caption: "Vacutainers" } },
  { site: "krishna-labs", file: "facility-ecg.jpg", scene: "ecgUnit", size: [560, 560], opts: { caption: "ECG" } },
  { site: "krishna-labs", file: "facility-hematology.jpg", scene: "microscopeUnit", size: [560, 560], opts: { caption: "Microscopy" } },
  { site: "krishna-labs", file: "facility-ultrasound.jpg", scene: "ultrasoundCart", size: [560, 560], opts: { caption: "Ultrasound" } },
  { site: "krishna-labs", file: "facility-xray.jpg", scene: "xrayRoom", size: [560, 560], opts: { caption: "X-ray" } },
];

function buildSvg(entry) {
  const scene = scenes[entry.scene];
  if (!scene) throw new Error(`Unknown scene "${entry.scene}" for ${entry.file}`);
  const palette = entry.site === "krishna-labs" ? palettes.labs : palettes.dental;
  const [baseW, baseH] = scene.base;
  const [width, height] = entry.size;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${baseW} ${baseH}" preserveAspectRatio="xMidYMid slice">
    <rect x="${-baseW}" y="${-baseH}" width="${baseW * 3}" height="${baseH * 3}" fill="${palette.bg}"/>
    ${scene.body(palette, entry.opts ?? {})}
  </svg>`;
}

async function run() {
  for (const site of new Set(manifest.map((entry) => entry.site))) {
    await mkdir(outDir(site), { recursive: true });
  }

  let written = 0;
  for (const entry of manifest) {
    const svg = buildSvg(entry);
    const target = path.join(outDir(entry.site), entry.file);
    const buffer = await sharp(Buffer.from(svg), { density: 200 })
      .resize(entry.size[0], entry.size[1], { fit: "cover" })
      .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toBuffer();
    await writeFile(target, buffer);
    written += 1;
    process.stdout.write(`  ${entry.site}/${entry.file}  ${entry.size[0]}x${entry.size[1]}  ${(buffer.length / 1024).toFixed(0)} kB\n`);
  }
  process.stdout.write(`\n${written} images written.\n`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
