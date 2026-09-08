import { dotGrid, label, plant, rules, screen, taskLamp, windowPane } from "./art-primitives.mjs";

// Each scene declares the coordinate space it was drawn in. The generator scales
// that space to the requested output size and crops with preserveAspectRatio.
const scene = (base, body) => ({ base, body });

const WIDE = [1440, 1080];
const TALL = [1152, 1280];
const SQUARE = [1080, 1080];

/* ---------------------------------------------------------------- interiors */

export const dentalOperatory = scene(WIDE, (p, opts = {}) => `
  ${dotGrid(0, 0, 1440, 1080, p.ink, 34, 1.8, 0.13)}
  <rect x="0" y="760" width="1440" height="320" fill="${p.soft}"/>
  ${rules(0, 786, 1440, 4, 74, p.ink, 0.16)}
  ${windowPane(92, 150, 360, 300, p)}
  <rect x="980" y="250" width="380" height="200" fill="${p.light}" stroke="${p.ink}" stroke-width="5"/>
  ${rules(1000, 300, 340, 3, 50, p.ink, 0.35)}
  <rect x="980" y="470" width="380" height="290" fill="${p.mid}"/>
  <rect x="980" y="470" width="380" height="24" fill="${p.ink}"/>
  <line x1="1170" y1="494" x2="1170" y2="760" stroke="${p.ink}" stroke-width="5"/>
  <circle cx="1140" cy="600" r="9" fill="${p.light}"/>
  <circle cx="1200" cy="600" r="9" fill="${p.light}"/>
  ${taskLamp(560, 120, p)}
  <g>
    <path d="M300 760 L300 640 Q300 596 344 596 L560 596 Q604 596 604 640 L604 760 Z" fill="${p.ink}"/>
    <path d="M470 604 L836 470 Q878 456 892 496 L900 520 Q914 560 872 574 L500 706 Z" fill="${p.mid}"/>
    <path d="M486 640 L846 512 Q870 504 878 524 L882 536 Q890 556 866 564 L508 692 Z" fill="${p.tint}" opacity="0.55"/>
    <path d="M258 700 L318 700 L318 780 L258 780 Z" fill="${p.ink}"/>
    <rect x="222" y="770" width="132" height="18" rx="9" fill="${p.ink}"/>
    <circle cx="880" cy="470" r="34" fill="${p.accent}"/>
  </g>
  <rect x="640" y="700" width="230" height="60" fill="${p.light}" stroke="${p.ink}" stroke-width="5"/>
  <rect x="666" y="716" width="46" height="12" rx="6" fill="${p.mid}"/>
  <rect x="726" y="716" width="46" height="12" rx="6" fill="${p.mid}"/>
  <rect x="786" y="716" width="46" height="12" rx="6" fill="${p.accent}"/>
  ${plant(150, 762, 1.5, p)}
  ${label(92, 946, opts.caption ?? "Operatory 1", p)}
`);

export const clinicExterior = scene(WIDE, (p, opts = {}) => `
  ${dotGrid(0, 0, 1440, 620, p.ink, 40, 2, 0.1)}
  <rect x="0" y="820" width="1440" height="260" fill="${p.soft}"/>
  <rect x="0" y="820" width="1440" height="10" fill="${p.ink}" opacity="0.5"/>
  <rect x="120" y="180" width="1200" height="640" fill="${p.light}" stroke="${p.ink}" stroke-width="6"/>
  <rect x="120" y="180" width="1200" height="110" fill="${p.mid}"/>
  <text x="176" y="252" font-family="Inter, Arial, sans-serif" font-size="54" font-weight="800" fill="${p.light}" letter-spacing="1.5">${opts.sign ?? "CLINIC"}</text>
  <rect x="1180" y="206" width="90" height="58" fill="${p.accent}"/>
  ${windowPane(176, 350, 250, 200, p)}
  ${windowPane(474, 350, 250, 200, p)}
  ${windowPane(772, 350, 250, 200, p)}
  ${windowPane(1070, 350, 200, 200, p)}
  <rect x="176" y="614" width="1094" height="146" fill="${p.tint}" stroke="${p.ink}" stroke-width="5"/>
  <rect x="612" y="614" width="216" height="146" fill="${p.light}" stroke="${p.ink}" stroke-width="5"/>
  <line x1="720" y1="614" x2="720" y2="760" stroke="${p.ink}" stroke-width="5"/>
  <rect x="880" y="656" width="300" height="62" rx="6" fill="${p.ink}"/>
  <text x="906" y="697" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="700" fill="${p.light}">${opts.floor ?? "2nd Floor"}</text>
  <g stroke="${p.ink}" stroke-width="7" fill="none" stroke-linecap="round">
    <path d="M300 900 h140 l40 -54 h-96"/>
    <circle cx="286" cy="906" r="34"/>
    <circle cx="452" cy="906" r="34"/>
  </g>
  ${plant(1330, 818, 1.7, p)}
  ${label(120, 946, opts.caption ?? "Street view", p)}
`);

export const reception = scene(WIDE, (p, opts = {}) => `
  ${dotGrid(0, 0, 1440, 1080, p.ink, 34, 1.8, 0.12)}
  <rect x="0" y="800" width="1440" height="280" fill="${p.soft}"/>
  <rect x="140" y="150" width="620" height="330" fill="${p.light}" stroke="${p.ink}" stroke-width="6"/>
  <circle cx="290" cy="300" r="76" fill="${p.mid}"/>
  <text x="290" y="322" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="58" font-weight="800" fill="${p.light}">${opts.mark ?? "SD"}</text>
  ${rules(410, 262, 300, 3, 44, p.ink, 0.32)}
  ${windowPane(880, 170, 420, 290, p)}
  <rect x="200" y="560" width="760" height="250" fill="${p.mid}"/>
  <rect x="200" y="560" width="760" height="34" fill="${p.ink}"/>
  <rect x="200" y="640" width="760" height="6" fill="${p.accent}" opacity="0.9"/>
  <rect x="836" y="470" width="180" height="96" rx="8" fill="${p.ink}"/>
  <rect x="848" y="482" width="156" height="72" rx="4" fill="${p.tint}"/>
  <rect x="1080" y="600" width="270" height="18" rx="9" fill="${p.ink}"/>
  <g fill="${p.ink}">
    <rect x="1086" y="618" width="16" height="180"/>
    <rect x="1330" y="618" width="16" height="180"/>
    <rect x="1080" y="540" width="270" height="70" rx="10" fill="${p.accent}" opacity="0.9"/>
  </g>
  ${plant(1024, 802, 1.6, p)}
  ${label(140, 946, opts.caption ?? "Front desk", p)}
`);

export const sterilisation = scene(WIDE, (p, opts = {}) => `
  ${dotGrid(0, 0, 1440, 1080, p.ink, 30, 1.6, 0.12)}
  <rect x="0" y="780" width="1440" height="300" fill="${p.soft}"/>
  <rect x="120" y="200" width="520" height="420" rx="10" fill="${p.light}" stroke="${p.ink}" stroke-width="6"/>
  <rect x="120" y="200" width="520" height="70" fill="${p.ink}"/>
  <circle cx="380" cy="430" r="130" fill="${p.mid}"/>
  <circle cx="380" cy="430" r="96" fill="${p.tint}"/>
  <circle cx="380" cy="430" r="96" fill="none" stroke="${p.ink}" stroke-width="6"/>
  <rect x="470" y="360" width="130" height="18" rx="9" fill="${p.ink}" opacity="0.35"/>
  <rect x="470" y="400" width="130" height="18" rx="9" fill="${p.ink}" opacity="0.35"/>
  <rect x="470" y="440" width="90" height="18" rx="9" fill="${p.accent}"/>
  <rect x="740" y="330" width="560" height="290" fill="${p.light}" stroke="${p.ink}" stroke-width="6"/>
  <g fill="${p.tint}" stroke="${p.ink}" stroke-width="5">
    <rect x="786" y="380" width="200" height="86" rx="6"/>
    <rect x="1040" y="380" width="200" height="86" rx="6"/>
    <rect x="786" y="500" width="200" height="86" rx="6"/>
    <rect x="1040" y="500" width="200" height="86" rx="6"/>
  </g>
  <g fill="${p.accent}">
    <rect x="806" y="404" width="52" height="12" rx="6"/>
    <rect x="1060" y="404" width="52" height="12" rx="6"/>
    <rect x="806" y="524" width="52" height="12" rx="6"/>
    <rect x="1060" y="524" width="52" height="12" rx="6"/>
  </g>
  <rect x="120" y="680" width="1180" height="100" fill="${p.mid}"/>
  <rect x="120" y="680" width="1180" height="18" fill="${p.ink}"/>
  ${label(120, 946, opts.caption ?? "Autoclave bay", p)}
`);

export const digitalXray = scene(WIDE, (p, opts = {}) => `
  ${dotGrid(0, 0, 1440, 1080, p.ink, 34, 1.8, 0.12)}
  <rect x="0" y="800" width="1440" height="280" fill="${p.soft}"/>
  <rect x="150" y="140" width="26" height="660" fill="${p.ink}"/>
  <line x1="163" y1="300" x2="470" y2="300" stroke="${p.ink}" stroke-width="16" stroke-linecap="round"/>
  <line x1="470" y1="300" x2="560" y2="440" stroke="${p.ink}" stroke-width="16" stroke-linecap="round"/>
  <circle cx="470" cy="300" r="20" fill="${p.accent}"/>
  <rect x="500" y="430" width="150" height="120" rx="12" fill="${p.mid}"/>
  <circle cx="575" cy="490" r="34" fill="${p.tint}"/>
  <circle cx="575" cy="490" r="16" fill="${p.accent}"/>
  ${screen(800, 250, 480, 330, p, `
    <rect x="836" y="286" width="408" height="258" fill="${p.ink}"/>
    <g fill="${p.tint}" opacity="0.9">
      <path d="M880 400 q22 -60 46 0 l10 96 q4 34 -14 34 q-16 0 -18 -30 l-6 -50 l-6 50 q-2 30 -18 30 q-18 0 -14 -34 Z"/>
      <path d="M980 396 q24 -64 50 0 l10 100 q4 34 -14 34 q-18 0 -20 -32 l-6 -52 l-6 52 q-2 32 -20 32 q-18 0 -14 -34 Z"/>
      <path d="M1090 400 q22 -60 46 0 l10 96 q4 34 -14 34 q-16 0 -18 -30 l-6 -50 l-6 50 q-2 30 -18 30 q-18 0 -14 -34 Z"/>
    </g>
    <rect x="1074" y="392" width="70" height="52" fill="${p.accent}" opacity="0.75"/>
    <rect x="860" y="504" width="360" height="6" fill="${p.tint}" opacity="0.5"/>
  `)}
  <rect x="176" y="800" width="1100" height="14" fill="${p.ink}" opacity="0.4"/>
  ${label(150, 946, opts.caption ?? "Digital radiography", p)}
`);

export const kidsCorner = scene(WIDE, (p, opts = {}) => `
  ${dotGrid(0, 0, 1440, 1080, p.ink, 34, 1.8, 0.1)}
  <rect x="0" y="790" width="1440" height="290" fill="${p.soft}"/>
  <g opacity="0.9">
    <circle cx="300" cy="270" r="90" fill="${p.tint}"/>
    <rect x="470" y="190" width="160" height="160" rx="14" fill="${p.accent}" opacity="0.85"/>
    <path d="M760 350 L860 180 L960 350 Z" fill="${p.mid}"/>
    <circle cx="1130" cy="270" r="70" fill="${p.ink}" opacity="0.75"/>
  </g>
  <g fill="${p.mid}">
    <rect x="220" y="560" width="200" height="30" rx="8"/>
    <rect x="230" y="590" width="24" height="200"/>
    <rect x="386" y="590" width="24" height="200"/>
    <rect x="220" y="440" width="30" height="140" rx="10" fill="${p.ink}"/>
  </g>
  <g fill="${p.accent}">
    <rect x="520" y="560" width="200" height="30" rx="8"/>
    <rect x="530" y="590" width="24" height="200"/>
    <rect x="686" y="590" width="24" height="200"/>
  </g>
  <g fill="${p.ink}">
    <rect x="880" y="640" width="120" height="120" rx="10"/>
    <rect x="1020" y="700" width="120" height="60" rx="10" fill="${p.mid}"/>
    <circle cx="1220" cy="700" r="60" fill="${p.tint}"/>
  </g>
  <rect x="880" y="660" width="40" height="40" fill="${p.accent}"/>
  ${label(220, 946, opts.caption ?? "Kids corner", p)}
`);

export const consultRoom = scene(WIDE, (p, opts = {}) => `
  ${dotGrid(0, 0, 1440, 1080, p.ink, 34, 1.8, 0.12)}
  <rect x="0" y="800" width="1440" height="280" fill="${p.soft}"/>
  ${windowPane(950, 160, 380, 280, p)}
  <rect x="130" y="170" width="480" height="300" fill="${p.light}" stroke="${p.ink}" stroke-width="6"/>
  <g fill="${p.mid}" opacity="0.85">
    <rect x="170" y="210" width="180" height="16" rx="8"/>
    <rect x="170" y="250" width="400" height="10" rx="5" opacity="0.5"/>
    <rect x="170" y="278" width="360" height="10" rx="5" opacity="0.5"/>
    <rect x="170" y="330" width="120" height="100" fill="${p.tint}"/>
    <rect x="310" y="330" width="120" height="100" fill="${p.tint}"/>
    <rect x="450" y="330" width="120" height="100" fill="${p.accent}" opacity="0.8"/>
  </g>
  <rect x="220" y="600" width="880" height="34" rx="8" fill="${p.ink}"/>
  <rect x="250" y="634" width="26" height="176" fill="${p.ink}"/>
  <rect x="1044" y="634" width="26" height="176" fill="${p.ink}"/>
  <g>
    <ellipse cx="470" cy="580" rx="66" ry="22" fill="${p.tint}"/>
    <path d="M420 580 q50 -84 100 0 Z" fill="${p.light}" stroke="${p.ink}" stroke-width="5"/>
    <g fill="${p.light}" stroke="${p.ink}" stroke-width="4">
      <rect x="432" y="540" width="18" height="30" rx="8"/>
      <rect x="456" y="532" width="18" height="38" rx="8"/>
      <rect x="480" y="536" width="18" height="34" rx="8"/>
      <rect x="504" y="546" width="14" height="24" rx="7"/>
    </g>
  </g>
  <rect x="740" y="530" width="230" height="70" rx="8" fill="${p.mid}"/>
  <rect x="756" y="546" width="198" height="38" rx="4" fill="${p.tint}"/>
  <g fill="${p.ink}">
    <rect x="150" y="700" width="180" height="24" rx="12" opacity="0.4"/>
    <rect x="1150" y="700" width="180" height="24" rx="12" opacity="0.4"/>
  </g>
  ${plant(1360, 802, 1.5, p)}
  ${label(130, 946, opts.caption ?? "Consultation room", p)}
`);

export const smileConsult = scene(WIDE, (p, opts = {}) => `
  ${dotGrid(0, 0, 1440, 1080, p.ink, 34, 1.8, 0.12)}
  <rect x="0" y="820" width="1440" height="260" fill="${p.soft}"/>
  <circle cx="470" cy="470" r="290" fill="${p.tint}" opacity="0.55"/>
  <path d="M336 300 q160 -110 280 20 q64 78 30 200 q-30 108 -132 150 q-104 42 -170 -34 q-56 -66 -46 -186 q8 -104 38 -150 Z" fill="${p.light}" stroke="${p.ink}" stroke-width="7"/>
  <path d="M330 320 q170 -140 300 10 q22 26 -8 24 q-140 -12 -272 30 q-30 10 -20 -64 Z" fill="${p.ink}"/>
  <circle cx="410" cy="454" r="13" fill="${p.ink}"/>
  <circle cx="556" cy="450" r="13" fill="${p.ink}"/>
  <path d="M398 592 q92 74 184 -8 q-14 96 -96 98 q-80 2 -88 -90 Z" fill="${p.accent}" opacity="0.9"/>
  <path d="M398 592 q92 42 184 -8" fill="none" stroke="${p.light}" stroke-width="14" stroke-linecap="round"/>
  <rect x="850" y="270" width="450" height="540" fill="${p.light}" stroke="${p.ink}" stroke-width="6"/>
  <text x="890" y="346" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="800" fill="${p.ink}">SHADE GUIDE</text>
  <g>
    ${[0, 1, 2, 3, 4, 5].map((i) => {
      const shades = ["#FFFFFF", "#F7F1E4", "#EFE6D2", "#E6D9BE", "#DACAA8", "#CBB88E"];
      const x = 890 + (i % 3) * 140;
      const y = 390 + Math.floor(i / 3) * 200;
      return `<rect x="${x}" y="${y}" width="110" height="170" rx="8" fill="${shades[i]}" stroke="${p.ink}" stroke-width="4"/>`;
    }).join("")}
  </g>
  <rect x="890" y="770" width="150" height="10" fill="${p.accent}"/>
  ${label(120, 946, opts.caption ?? "Smile assessment", p)}
`);

/* ---------------------------------------------------------------- portraits */

export const portrait = scene(TALL, (p, opts = {}) => {
  const variant = opts.variant ?? 0;
  const skins = ["#E3B694", "#CE9A6E", "#DCAE86"];
  const skin = skins[variant % skins.length];

  // Hair is built in two passes so it always reads as attached to the skull:
  // a mass behind the head, then a fringe that overlaps the forehead.
  const hairBack = [
    // cropped bob
    `<path d="M356 700 q0 -250 220 -250 q220 0 220 250 q0 150 -40 210 l-72 -18 q34 -108 34 -196 q0 -166 -142 -166 q-142 0 -142 166 q0 88 34 196 l-72 18 q-40 -60 -40 -210 Z" fill="${p.ink}"/>`,
    // short back-and-sides
    `<path d="M370 690 q0 -240 206 -240 q206 0 206 240 q0 60 -18 96 l-58 -30 q16 -50 16 -92 q0 -148 -146 -148 q-146 0 -146 148 q0 42 16 92 l-58 30 q-18 -36 -18 -96 Z" fill="${p.ink}"/>`,
    // long hair falling past the shoulder line
    `<path d="M348 720 q0 -270 228 -270 q228 0 228 270 q0 210 -54 336 l-92 -22 q46 -160 46 -300 q0 -178 -128 -178 q-128 0 -128 178 q0 140 46 300 l-92 22 q-54 -126 -54 -336 Z" fill="${p.ink}"/>`,
  ];
  const fringe = [
    `<path d="M386 636 q22 -166 190 -166 q168 0 190 166 q-42 -76 -190 -76 q-148 0 -190 76 Z" fill="${p.ink}"/>`,
    `<path d="M396 630 q26 -160 180 -160 q154 0 180 160 q-60 -66 -180 -66 q-120 0 -180 66 Z" fill="${p.ink}"/>`,
    `<path d="M382 646 q16 -176 194 -176 q178 0 194 176 q-56 -60 -128 -78 q-46 44 -134 40 q-74 -4 -126 38 Z" fill="${p.ink}"/>`,
  ];

  return `
  ${dotGrid(0, 0, 1152, 1280, p.ink, 34, 1.8, 0.14)}
  <circle cx="576" cy="640" r="416" fill="${p.tint}" opacity="0.6"/>
  <rect x="0" y="1056" width="1152" height="224" fill="${p.soft}" opacity="0.7"/>

  <!-- shoulders: dark scrubs under an open white coat -->
  <path d="M150 1280 q0 -262 426 -262 q426 0 426 262 Z" fill="${p.mid}"/>
  <path d="M150 1280 q6 -196 232 -244 l194 244 Z" fill="${p.light}"/>
  <path d="M1002 1280 q-6 -196 -232 -244 l-194 244 Z" fill="${p.light}"/>
  <path d="M382 1036 l194 244 l-92 0 l-146 -222 Z" fill="${p.ink}" opacity="0.1"/>
  <path d="M770 1036 l-194 244 l92 0 l146 -222 Z" fill="${p.ink}" opacity="0.1"/>

  <!-- neck -->
  <path d="M484 928 h184 v122 q0 56 -92 56 q-92 0 -92 -56 Z" fill="${skin}"/>
  <path d="M484 928 h184 v50 q-92 54 -184 0 Z" fill="${p.ink}" opacity="0.14"/>

  ${hairBack[variant % hairBack.length]}

  <!-- head -->
  <ellipse cx="576" cy="700" rx="188" ry="216" fill="${skin}"/>
  <path d="M388 690 q-30 -6 -30 34 q0 40 34 40 Z" fill="${skin}"/>
  <path d="M764 690 q30 -6 30 34 q0 40 -34 40 Z" fill="${skin}"/>
  ${fringe[variant % fringe.length]}

  <!-- features -->
  <path d="M492 634 q42 -26 84 -4" fill="none" stroke="${p.ink}" stroke-width="13" stroke-linecap="round"/>
  <path d="M576 630 q42 -22 84 4" fill="none" stroke="${p.ink}" stroke-width="13" stroke-linecap="round"/>
  <circle cx="508" cy="706" r="15" fill="${p.ink}"/>
  <circle cx="644" cy="706" r="15" fill="${p.ink}"/>
  <path d="M576 716 v50 q-18 14 -36 6" fill="none" stroke="${p.ink}" stroke-width="10" stroke-linecap="round" opacity="0.45"/>
  <path d="M518 820 q58 46 116 0" fill="none" stroke="${p.ink}" stroke-width="13" stroke-linecap="round"/>

  <!-- lanyard and clip-on ID card -->
  <path d="M496 1046 q26 96 80 116" fill="none" stroke="${p.accent}" stroke-width="12" stroke-linecap="round"/>
  <path d="M656 1046 q-26 96 -80 116" fill="none" stroke="${p.accent}" stroke-width="12" stroke-linecap="round"/>
  <rect x="524" y="1158" width="104" height="76" rx="8" fill="${p.light}" stroke="${p.ink}" stroke-width="6"/>
  <rect x="544" y="1178" width="30" height="30" rx="15" fill="${p.mid}"/>
  <rect x="586" y="1180" width="26" height="8" rx="4" fill="${p.ink}" opacity="0.45"/>
  <rect x="586" y="1198" width="26" height="8" rx="4" fill="${p.ink}" opacity="0.25"/>

  ${label(70, 1052, opts.caption ?? "Clinical team", p)}
`;
});

export const pathologistDesk = scene(SQUARE, (p, opts = {}) => `
  ${dotGrid(0, 0, 1080, 1080, p.ink, 32, 1.8, 0.13)}
  <circle cx="540" cy="470" r="330" fill="${p.tint}" opacity="0.6"/>
  <rect x="0" y="820" width="1080" height="260" fill="${p.soft}"/>
  <rect x="60" y="806" width="960" height="20" fill="${p.ink}"/>
  <path d="M180 806 q0 -260 320 -260 q320 0 320 260 Z" fill="${p.mid}"/>
  <path d="M500 546 q-120 0 -196 62 l84 198 h224 l84 -198 q-76 -62 -196 -62 Z" fill="${p.light}"/>
  <ellipse cx="500" cy="380" rx="140" ry="164" fill="#D8A97F"/>
  <path d="M348 384 q-8 -196 152 -196 q160 0 152 196 q-6 34 -26 16 q6 -122 -126 -122 q-132 0 -126 122 q-20 18 -26 -16 Z" fill="${p.ink}"/>
  <circle cx="452" cy="376" r="12" fill="${p.ink}"/>
  <circle cx="552" cy="376" r="12" fill="${p.ink}"/>
  <path d="M466 452 q34 26 68 0" fill="none" stroke="${p.ink}" stroke-width="10" stroke-linecap="round"/>
  <g stroke="${p.accent}" stroke-width="12" fill="none" stroke-linecap="round">
    <path d="M428 560 q-16 130 72 150 q88 -20 72 -150"/>
  </g>
  <circle cx="500" cy="722" r="22" fill="${p.accent}"/>
  <g>
    <rect x="760" y="560" width="34" height="246" fill="${p.ink}"/>
    <rect x="690" y="786" width="240" height="24" rx="8" fill="${p.ink}"/>
    <path d="M794 590 l112 -46 l30 60 l-112 48 Z" fill="${p.ink}"/>
    <rect x="884" y="602" width="46" height="120" rx="10" fill="${p.mid}"/>
    <rect x="856" y="726" width="106" height="20" fill="${p.ink}"/>
    <rect x="892" y="746" width="34" height="40" fill="${p.tint}"/>
  </g>
  ${label(60, 946, opts.caption ?? "Report review", p)}
`);

/* ------------------------------------------------------------ dental arches */

function toothPath(cx, cy, w, h, rotate, fill, stroke) {
  return `<g transform="translate(${cx.toFixed(1)} ${cy.toFixed(1)}) rotate(${rotate.toFixed(1)})">
    <path d="M${(-w / 2).toFixed(1)} ${(-h / 2).toFixed(1)}
      q${(w / 2).toFixed(1)} ${(-h * 0.22).toFixed(1)} ${w.toFixed(1)} 0
      l${(-w * 0.08).toFixed(1)} ${h.toFixed(1)}
      q${(-w * 0.42).toFixed(1)} ${(h * 0.22).toFixed(1)} ${(-w * 0.84).toFixed(1)} 0 Z"
      fill="${fill}" stroke="${stroke}" stroke-width="5" stroke-linejoin="round"/>
  </g>`;
}

// Upper arch of twelve teeth seen from below, as in an intraoral photo.
// `state` drives alignment and shade; `missing` and `chip` mark a single tooth.
export const toothArch = scene(WIDE, (p, opts = {}) => {
  const after = opts.state === "after";
  const count = 12;
  const teeth = [];
  const jitter = [-6, 7, -4, 10, -13, 7, -5, 9, -7, 5, -8, 6];
  const drift = [8, -6, 3, 12, -9, 5, -4, 10, -7, 4, 9, -5];
  const shadeBefore = ["#E4D3AE", "#DCC79C", "#E8DCC0", "#D6BE8E", "#E2D2AC", "#DBC8A2", "#E6D8BA", "#D3BA88", "#E0CFA6", "#DCC79C", "#E5D5B2", "#D9C393"];

  for (let i = 0; i < count; i += 1) {
    if (!after && opts.missing === i) continue;
    const t = (i + 0.5) / count;
    const angle = Math.PI * (1 - t);
    const cx = 720 + Math.cos(angle) * 452;
    const cy = 632 - Math.sin(angle) * 258;
    const isFront = i >= 4 && i <= 7;
    const isCanine = i === 3 || i === 8;
    const w = isFront ? 100 : isCanine ? 92 : 96;
    const h = isFront ? 156 : isCanine ? 146 : 118;
    const baseRotate = (t - 0.5) * 122;
    const rotate = after ? baseRotate : baseRotate + jitter[i];
    const offsetY = after ? 0 : drift[i];
    const fill = after ? "#FFFFFF" : shadeBefore[i];
    teeth.push(toothPath(cx, cy + offsetY, w, h, rotate, fill, p.ink));
    if (!after && opts.chip === i) {
      teeth.push(`<path d="M${cx - 26} ${cy - 74} l52 0 l-52 44 Z" fill="${p.soft}" stroke="${p.ink}" stroke-width="5" stroke-linejoin="round"/>`);
    }
  }

  const gapMark = !after && typeof opts.missing === "number"
    ? `<g><circle cx="${720 + Math.cos(Math.PI * (1 - (opts.missing + 0.5) / count)) * 452}" cy="${632 - Math.sin(Math.PI * (1 - (opts.missing + 0.5) / count)) * 258}" r="46" fill="none" stroke="${p.accent}" stroke-width="7" stroke-dasharray="16 12"/></g>`
    : "";

  return `
  ${dotGrid(0, 0, 1440, 1080, p.ink, 36, 1.8, 0.12)}
  <rect x="0" y="0" width="1440" height="1080" fill="${after ? p.tint : p.soft}" opacity="0.38"/>
  <ellipse cx="720" cy="592" rx="592" ry="352" fill="#E9A9A0" opacity="0.55"/>
  <ellipse cx="720" cy="592" rx="592" ry="352" fill="none" stroke="${p.ink}" stroke-width="6"/>
  <path d="M180 604 q540 300 1080 0 q-40 372 -540 372 q-500 0 -540 -372 Z" fill="${p.ink}" opacity="0.9"/>
  <path d="M300 700 q420 190 840 0 q-40 232 -420 232 q-380 0 -420 -232 Z" fill="#B44C4C" opacity="0.55"/>
  ${teeth.join("")}
  ${gapMark}
  <rect x="0" y="0" width="16" height="1080" fill="${after ? p.mid : p.accent}"/>
  ${label(70, 940, opts.caption ?? (after ? "After" : "Before"), p)}
`;
});

/* -------------------------------------------------------------- lab scenes */

export const labAnalyser = scene(WIDE, (p, opts = {}) => `
  ${dotGrid(0, 0, 1440, 1080, p.ink, 34, 1.8, 0.12)}
  <rect x="0" y="800" width="1440" height="280" fill="${p.soft}"/>
  <rect x="150" y="240" width="700" height="560" rx="12" fill="${p.light}" stroke="${p.ink}" stroke-width="6"/>
  <rect x="150" y="240" width="700" height="90" fill="${p.ink}"/>
  <circle cx="812" cy="285" r="18" fill="${p.accent}"/>
  <rect x="196" y="386" width="300" height="220" rx="8" fill="${p.mid}"/>
  <g stroke="${p.tint}" stroke-width="6" fill="none">
    <polyline points="220,540 268,470 314,510 360,420 410,486 466,432"/>
  </g>
  <rect x="196" y="646" width="300" height="16" rx="8" fill="${p.ink}" opacity="0.3"/>
  <g>
    ${[0, 1, 2, 3, 4, 5].map((i) => {
      const x = 552 + (i % 3) * 84;
      const y = 400 + Math.floor(i / 3) * 150;
      const fills = [p.accent, p.mid, p.tint];
      return `<g><rect x="${x}" y="${y}" width="46" height="118" rx="20" fill="${p.light}" stroke="${p.ink}" stroke-width="5"/>
        <rect x="${x + 6}" y="${y + 56}" width="34" height="56" rx="16" fill="${fills[i % 3]}"/>
        <rect x="${x - 4}" y="${y - 14}" width="54" height="20" rx="6" fill="${p.ink}"/></g>`;
    }).join("")}
  </g>
  <rect x="150" y="800" width="700" height="20" fill="${p.ink}" opacity="0.4"/>
  ${screen(950, 320, 400, 280, p, `
    <rect x="982" y="352" width="336" height="216" fill="${p.ink}"/>
    <g fill="${p.tint}" opacity="0.85">
      <rect x="1010" y="392" width="280" height="14" rx="7"/>
      <rect x="1010" y="428" width="230" height="14" rx="7"/>
      <rect x="1010" y="464" width="256" height="14" rx="7"/>
      <rect x="1010" y="500" width="180" height="14" rx="7"/>
    </g>
    <rect x="1010" y="392" width="70" height="14" rx="7" fill="${p.accent}"/>
  `)}
  ${label(150, 946, opts.caption ?? "Biochemistry analyser", p)}
`);

export const collectionDesk = scene(WIDE, (p, opts = {}) => `
  ${dotGrid(0, 0, 1440, 1080, p.ink, 34, 1.8, 0.12)}
  <rect x="0" y="810" width="1440" height="270" fill="${p.soft}"/>
  ${windowPane(120, 160, 340, 250, p)}
  <rect x="560" y="180" width="760" height="240" fill="${p.light}" stroke="${p.ink}" stroke-width="6"/>
  <text x="600" y="266" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="800" fill="${p.ink}">SAMPLE COLLECTION</text>
  ${rules(600, 310, 620, 3, 40, p.ink, 0.3)}
  <g>
    <rect x="180" y="600" width="420" height="46" rx="10" fill="${p.mid}"/>
    <rect x="180" y="646" width="60" height="170" fill="${p.ink}"/>
    <rect x="540" y="646" width="60" height="170" fill="${p.ink}"/>
    <rect x="150" y="470" width="60" height="150" rx="14" fill="${p.mid}"/>
    <rect x="560" y="520" width="180" height="34" rx="17" fill="${p.accent}"/>
  </g>
  <g>
    <rect x="820" y="620" width="440" height="40" rx="8" fill="${p.ink}"/>
    <rect x="850" y="660" width="24" height="156" fill="${p.ink}"/>
    <rect x="1206" y="660" width="24" height="156" fill="${p.ink}"/>
    ${[0, 1, 2, 3, 4].map((i) => {
      const x = 860 + i * 78;
      const caps = [p.accent, "#B23A3A", p.mid, "#3D7A4E", p.accent];
      return `<g><rect x="${x}" y="${500}" width="42" height="120" rx="18" fill="${p.light}" stroke="${p.ink}" stroke-width="5"/>
        <rect x="${x + 5}" y="${560}" width="32" height="58" rx="14" fill="${caps[i]}" opacity="0.8"/>
        <rect x="${x - 4}" y="${486}" width="50" height="20" rx="6" fill="${caps[i]}"/></g>`;
    }).join("")}
  </g>
  ${plant(1370, 812, 1.5, p)}
  ${label(120, 946, opts.caption ?? "Collection room", p)}
`);

export const xrayRoom = scene(WIDE, (p, opts = {}) => `
  ${dotGrid(0, 0, 1440, 1080, p.ink, 34, 1.8, 0.12)}
  <rect x="0" y="800" width="1440" height="280" fill="${p.soft}"/>
  <rect x="120" y="180" width="440" height="620" fill="${p.light}" stroke="${p.ink}" stroke-width="6"/>
  <rect x="150" y="220" width="380" height="480" fill="${p.ink}"/>
  <g fill="${p.tint}" opacity="0.8">
    <path d="M340 300 q120 40 120 190 q0 150 -120 190 q-120 -40 -120 -190 q0 -150 120 -190 Z" opacity="0.35"/>
    ${[0, 1, 2, 3, 4].map((i) => `<path d="M240 ${360 + i * 62} q100 -34 200 0" fill="none" stroke="${p.tint}" stroke-width="8" opacity="0.75"/>`).join("")}
  </g>
  <rect x="700" y="150" width="30" height="650" fill="${p.ink}"/>
  <rect x="620" y="786" width="190" height="24" rx="10" fill="${p.ink}"/>
  <line x1="715" y1="290" x2="1000" y2="290" stroke="${p.ink}" stroke-width="18" stroke-linecap="round"/>
  <rect x="960" y="250" width="130" height="110" rx="14" fill="${p.mid}"/>
  <circle cx="1025" cy="305" r="30" fill="${p.tint}"/>
  <circle cx="1025" cy="305" r="13" fill="${p.accent}"/>
  <rect x="1150" y="420" width="200" height="380" rx="12" fill="${p.mid}"/>
  <rect x="1170" y="450" width="160" height="200" rx="6" fill="${p.tint}"/>
  <rect x="1170" y="680" width="160" height="16" rx="8" fill="${p.ink}" opacity="0.4"/>
  <rect x="1170" y="712" width="110" height="16" rx="8" fill="${p.accent}"/>
  ${label(120, 946, opts.caption ?? "Digital X-ray suite", p)}
`);

export const labExterior = scene(WIDE, (p, opts = {}) => clinicExterior.body(p, {
  sign: opts.sign ?? "KRISHNA PATH LABS",
  floor: opts.floor ?? "Ground Floor",
  caption: opts.caption ?? "Governorpet centre",
}));

/* ------------------------------------------------ square equipment vignettes */

export const ecgUnit = scene(SQUARE, (p, opts = {}) => `
  ${dotGrid(0, 0, 1080, 1080, p.ink, 32, 1.8, 0.13)}
  <rect x="0" y="820" width="1080" height="260" fill="${p.soft}"/>
  <rect x="200" y="240" width="680" height="500" rx="14" fill="${p.light}" stroke="${p.ink}" stroke-width="7"/>
  <rect x="200" y="240" width="680" height="80" fill="${p.ink}"/>
  <circle cx="838" cy="280" r="16" fill="${p.accent}"/>
  <rect x="250" y="366" width="580" height="240" rx="8" fill="${p.ink}"/>
  <polyline points="278,486 358,486 388,404 424,566 462,486 560,486 592,432 624,540 656,486 800,486"
    fill="none" stroke="${p.accent}" stroke-width="10" stroke-linejoin="round" stroke-linecap="round"/>
  <g fill="${p.mid}">
    <rect x="250" y="644" width="120" height="46" rx="8"/>
    <rect x="390" y="644" width="120" height="46" rx="8"/>
    <rect x="530" y="644" width="120" height="46" rx="8"/>
  </g>
  <rect x="670" y="644" width="160" height="46" rx="8" fill="${p.accent}"/>
  <g stroke="${p.ink}" stroke-width="10" fill="none" stroke-linecap="round">
    <path d="M240 740 q-120 90 -160 200"/>
    <path d="M300 740 q-90 110 -100 200"/>
  </g>
  <rect x="200" y="740" width="680" height="18" fill="${p.ink}" opacity="0.35"/>
  ${label(80, 940, opts.caption ?? "12-lead ECG", p)}
`);

export const ultrasoundCart = scene(SQUARE, (p, opts = {}) => `
  ${dotGrid(0, 0, 1080, 1080, p.ink, 32, 1.8, 0.13)}
  <rect x="0" y="840" width="1080" height="240" fill="${p.soft}"/>
  <rect x="300" y="180" width="500" height="360" rx="12" fill="${p.ink}"/>
  <rect x="326" y="206" width="448" height="308" rx="6" fill="${p.mid}"/>
  <path d="M550 500 L400 250 q150 -70 300 0 Z" fill="${p.tint}" opacity="0.65"/>
  <path d="M550 470 q-46 -110 0 -170 q46 60 0 170 Z" fill="${p.accent}" opacity="0.8"/>
  <rect x="300" y="560" width="500" height="40" rx="8" fill="${p.ink}"/>
  <rect x="360" y="600" width="380" height="220" rx="10" fill="${p.light}" stroke="${p.ink}" stroke-width="6"/>
  <g fill="${p.mid}">
    <rect x="392" y="636" width="150" height="18" rx="9"/>
    <rect x="392" y="670" width="220" height="18" rx="9" opacity="0.5"/>
    <rect x="392" y="704" width="180" height="18" rx="9" opacity="0.5"/>
  </g>
  <rect x="392" y="746" width="120" height="34" rx="8" fill="${p.accent}"/>
  <rect x="330" y="820" width="440" height="20" rx="10" fill="${p.ink}"/>
  <circle cx="390" cy="880" r="34" fill="${p.ink}"/>
  <circle cx="710" cy="880" r="34" fill="${p.ink}"/>
  <g stroke="${p.ink}" stroke-width="12" fill="none" stroke-linecap="round">
    <path d="M800 640 q140 40 120 190"/>
  </g>
  <rect x="880" y="828" width="70" height="130" rx="20" fill="${p.mid}" stroke="${p.ink}" stroke-width="6"/>
  ${label(80, 960, opts.caption ?? "Ultrasound", p)}
`);

export const microscopeUnit = scene(SQUARE, (p, opts = {}) => `
  ${dotGrid(0, 0, 1080, 1080, p.ink, 32, 1.8, 0.13)}
  <rect x="0" y="840" width="1080" height="240" fill="${p.soft}"/>
  <circle cx="540" cy="480" r="330" fill="${p.tint}" opacity="0.5"/>
  <rect x="300" y="826" width="480" height="34" rx="14" fill="${p.ink}"/>
  <path d="M420 826 q-20 -190 100 -240 l0 -60 l60 0 l0 60 q120 50 100 240 Z" fill="${p.mid}"/>
  <rect x="470" y="290" width="70" height="230" rx="12" fill="${p.ink}"/>
  <path d="M470 290 l-140 -90 l40 -60 l150 96 Z" fill="${p.ink}"/>
  <rect x="446" y="520" width="118" height="70" rx="10" fill="${p.ink}"/>
  <rect x="380" y="600" width="260" height="26" rx="8" fill="${p.ink}"/>
  <rect x="452" y="626" width="106" height="60" rx="8" fill="${p.accent}"/>
  <circle cx="505" cy="716" r="34" fill="${p.ink}"/>
  <g>
    <circle cx="820" cy="330" r="130" fill="${p.light}" stroke="${p.ink}" stroke-width="7"/>
    <g fill="${p.accent}" opacity="0.85">
      <circle cx="782" cy="300" r="24"/><circle cx="858" cy="322" r="20"/>
      <circle cx="806" cy="378" r="26"/><circle cx="866" cy="382" r="15"/>
      <circle cx="748" cy="356" r="14"/>
    </g>
    <circle cx="820" cy="330" r="88" fill="none" stroke="${p.ink}" stroke-width="4" opacity="0.4"/>
  </g>
  ${label(80, 960, opts.caption ?? "Haematology", p)}
`);

export const sampleTray = scene(SQUARE, (p, opts = {}) => `
  ${dotGrid(0, 0, 1080, 1080, p.ink, 32, 1.8, 0.13)}
  <rect x="0" y="840" width="1080" height="240" fill="${p.soft}"/>
  <rect x="140" y="620" width="800" height="230" rx="14" fill="${p.mid}"/>
  <rect x="140" y="620" width="800" height="40" fill="${p.ink}"/>
  ${[0, 1, 2, 3, 4, 5].map((i) => {
    const x = 196 + i * 122;
    const caps = [p.accent, "#B23A3A", "#3D7A4E", p.tint, p.accent, "#B23A3A"];
    return `<g><rect x="${x}" y="${330}" width="66" height="300" rx="30" fill="${p.light}" stroke="${p.ink}" stroke-width="6"/>
      <rect x="${x + 8}" y="${470}" width="50" height="152" rx="24" fill="${caps[i]}" opacity="0.85"/>
      <rect x="${x - 6}" y="${306}" width="78" height="32" rx="8" fill="${caps[i]}"/>
      <rect x="${x + 10}" y="${390}" width="30" height="6" rx="3" fill="${p.ink}" opacity="0.35"/></g>`;
  }).join("")}
  <rect x="140" y="850" width="800" height="20" fill="${p.ink}" opacity="0.35"/>
  ${label(80, 960, opts.caption ?? "Sample handling", p)}
`);

export const homeVisit = scene(SQUARE, (p, opts = {}) => `
  ${dotGrid(0, 0, 1080, 1080, p.ink, 32, 1.8, 0.13)}
  <rect x="0" y="840" width="1080" height="240" fill="${p.soft}"/>
  <path d="M180 520 L540 240 L900 520 L900 840 L180 840 Z" fill="${p.light}" stroke="${p.ink}" stroke-width="8"/>
  <path d="M140 540 L540 226 L940 540" fill="none" stroke="${p.ink}" stroke-width="14" stroke-linecap="round"/>
  ${windowPane(280, 590, 160, 140, p)}
  ${windowPane(640, 590, 160, 140, p)}
  <rect x="470" y="640" width="140" height="200" fill="${p.mid}"/>
  <circle cx="588" cy="746" r="10" fill="${p.accent}"/>
  <rect x="440" y="380" width="200" height="120" rx="10" fill="${p.accent}"/>
  <path d="M470 440 h140 M540 400 v80" stroke="${p.light}" stroke-width="18" stroke-linecap="round"/>
  ${label(80, 960, opts.caption ?? "Home collection", p)}
`);

/* --------------------------------------------------------------------- gym */

// A loaded barbell drawn from the side. Used on the rack and on the platform.
function barbell(x, y, halfLength, p) {
  return `<g>
    <line x1="${x - halfLength}" y1="${y}" x2="${x + halfLength}" y2="${y}" stroke="${p.ink}" stroke-width="12" stroke-linecap="round"/>
    ${[0, 1].map((side) => {
      const dir = side === 0 ? -1 : 1;
      const outer = x + dir * (halfLength - 26);
      const inner = x + dir * (halfLength - 74);
      return `<rect x="${Math.min(outer, inner) - 4}" y="${y - 74}" width="26" height="148" rx="6" fill="${p.accent}"/>
        <rect x="${Math.min(outer, inner) + 30}" y="${y - 54}" width="22" height="108" rx="6" fill="${p.mid}"/>`;
    }).join("")}
  </g>`;
}

function kettlebell(x, y, scale, p, fill) {
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <path d="M-26 -34 q0 -34 26 -34 q26 0 26 34" fill="none" stroke="${p.ink}" stroke-width="14" stroke-linecap="round"/>
    <path d="M-42 -20 q42 -16 84 0 q16 40 0 74 q-42 14 -84 0 q-16 -34 0 -74 Z" fill="${fill}"/>
  </g>`;
}

export const gymFloor = scene(WIDE, (p, opts = {}) => `
  ${dotGrid(0, 0, 1440, 1080, p.ink, 34, 1.8, 0.12)}
  <rect x="0" y="790" width="1440" height="290" fill="${p.soft}"/>
  ${rules(0, 820, 1440, 4, 66, p.ink, 0.14)}

  <!-- mirror wall -->
  <rect x="60" y="130" width="420" height="380" fill="${p.tint}" stroke="${p.ink}" stroke-width="6"/>
  <g stroke="${p.light}" stroke-width="16" opacity="0.55" stroke-linecap="round">
    <line x1="110" y1="470" x2="300" y2="180"/>
    <line x1="200" y1="480" x2="360" y2="236"/>
  </g>

  <!-- dumbbell rack -->
  <rect x="60" y="600" width="420" height="20" rx="6" fill="${p.ink}"/>
  <rect x="60" y="712" width="420" height="20" rx="6" fill="${p.ink}"/>
  <rect x="64" y="600" width="18" height="196" fill="${p.ink}"/>
  <rect x="458" y="600" width="18" height="196" fill="${p.ink}"/>
  ${[0, 1].map((row) =>
    [0, 1, 2, 3, 4].map((i) => {
      const x = 108 + i * 74;
      const y = 570 + row * 112;
      const fill = i % 2 === 0 ? p.mid : p.accent;
      return `<g><line x1="${x}" y1="${y}" x2="${x + 44}" y2="${y}" stroke="${p.ink}" stroke-width="9"/>
        <rect x="${x - 10}" y="${y - 20}" width="18" height="40" rx="5" fill="${fill}"/>
        <rect x="${x + 36}" y="${y - 20}" width="18" height="40" rx="5" fill="${fill}"/></g>`;
    }).join(""),
  ).join("")}

  <!-- power rack -->
  <rect x="620" y="160" width="26" height="640" fill="${p.ink}"/>
  <rect x="1000" y="160" width="26" height="640" fill="${p.ink}"/>
  <rect x="620" y="160" width="406" height="26" fill="${p.ink}"/>
  <rect x="588" y="778" width="90" height="24" rx="6" fill="${p.ink}"/>
  <rect x="968" y="778" width="90" height="24" rx="6" fill="${p.ink}"/>
  <g fill="${p.bg}">
    ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<circle cx="633" cy="${262 + i * 66}" r="6"/><circle cx="1013" cy="${262 + i * 66}" r="6"/>`).join("")}
  </g>
  ${barbell(823, 358, 320, p)}

  <!-- flat bench inside the rack -->
  <rect x="700" y="640" width="250" height="26" rx="8" fill="${p.mid}"/>
  <rect x="712" y="666" width="22" height="134" fill="${p.ink}"/>
  <rect x="916" y="666" width="22" height="134" fill="${p.ink}"/>

  <!-- plate tree -->
  <rect x="1216" y="420" width="24" height="380" fill="${p.ink}"/>
  <rect x="1160" y="782" width="136" height="20" rx="6" fill="${p.ink}"/>
  ${[0, 1, 2].map((i) => {
    const y = 470 + i * 110;
    const r = 56 - i * 8;
    return `<line x1="1240" y1="${y}" x2="1310" y2="${y}" stroke="${p.ink}" stroke-width="10"/>
      <circle cx="1288" cy="${y}" r="${r}" fill="${i === 0 ? p.accent : p.mid}"/>
      <circle cx="1288" cy="${y}" r="${r / 3}" fill="${p.bg}"/>`;
  }).join("")}

  ${label(60, 946, opts.caption ?? "Strength floor", p)}
`);

export const cardioDeck = scene(WIDE, (p, opts = {}) => `
  ${dotGrid(0, 0, 1440, 1080, p.ink, 34, 1.8, 0.12)}
  <rect x="0" y="800" width="1440" height="280" fill="${p.soft}"/>
  ${windowPane(90, 130, 330, 250, p)}
  ${windowPane(555, 130, 330, 250, p)}
  ${windowPane(1020, 130, 330, 250, p)}
  ${[0, 1, 2].map((i) => {
    const x = 110 + i * 430;
    return `<g>
      <rect x="${x}" y="560" width="300" height="42" rx="10" fill="${p.mid}"/>
      <rect x="${x + 16}" y="602" width="24" height="200" fill="${p.ink}"/>
      <rect x="${x + 256}" y="602" width="24" height="200" fill="${p.ink}"/>
      <rect x="${x + 22}" y="574" width="256" height="14" rx="7" fill="${p.ink}" opacity="0.5"/>
      <rect x="${x + 44}" y="360" width="18" height="212" fill="${p.ink}"/>
      <rect x="${x + 228}" y="360" width="18" height="212" fill="${p.ink}"/>
      <rect x="${x + 30}" y="300" width="230" height="76" rx="8" fill="${p.ink}"/>
      <rect x="${x + 46}" y="316" width="198" height="44" rx="4" fill="${p.tint}"/>
      <rect x="${x + 58}" y="330" width="${i === 1 ? 130 : 84}" height="16" rx="8" fill="${p.accent}"/>
      <line x1="${x + 30}" y1="430" x2="${x + 260}" y2="430" stroke="${p.ink}" stroke-width="12" stroke-linecap="round"/>
    </g>`;
  }).join("")}
  <rect x="0" y="800" width="1440" height="14" fill="${p.ink}" opacity="0.35"/>
  ${label(90, 946, opts.caption ?? "Cardio deck", p)}
`);

export const functionalZone = scene(WIDE, (p, opts = {}) => `
  ${dotGrid(0, 0, 1440, 1080, p.ink, 34, 1.8, 0.12)}
  <rect x="0" y="800" width="1440" height="280" fill="${p.soft}"/>

  <!-- rig frame on the back wall -->
  <rect x="120" y="130" width="26" height="620" fill="${p.ink}"/>
  <rect x="700" y="130" width="26" height="620" fill="${p.ink}"/>
  <rect x="120" y="130" width="606" height="26" fill="${p.ink}"/>
  <g stroke="${p.ink}" stroke-width="14" stroke-linecap="round">
    ${[0, 1, 2, 3, 4, 5].map((i) => `<line x1="180" y1="${240 + i * 74}" x2="666" y2="${240 + i * 74}"/>`).join("")}
  </g>
  <line x1="420" y1="156" x2="420" y2="470" stroke="${p.ink}" stroke-width="10"/>
  <rect x="360" y="470" width="120" height="20" rx="10" fill="${p.accent}"/>

  <!-- turf lane and sled -->
  <rect x="60" y="700" width="1320" height="120" rx="8" fill="${p.mid}"/>
  <g stroke="${p.accent}" stroke-width="7" stroke-dasharray="46 34" opacity="0.85">
    <line x1="90" y1="760" x2="1350" y2="760"/>
  </g>
  <g>
    <path d="M900 700 L1010 700 L1040 796 L870 796 Z" fill="${p.ink}"/>
    <rect x="936" y="580" width="20" height="128" fill="${p.ink}"/>
    <circle cx="946" cy="566" r="42" fill="${p.accent}"/>
    <circle cx="946" cy="566" r="14" fill="${p.mid}"/>
  </g>

  <!-- kettlebells and ropes -->
  ${kettlebell(1140, 640, 1.5, p, p.mid)}
  ${kettlebell(1250, 648, 1.2, p, p.accent)}
  ${kettlebell(1340, 654, 1.0, p, p.mid)}
  <g fill="none" stroke="${p.ink}" stroke-width="16" stroke-linecap="round" opacity="0.9">
    <path d="M726 300 q90 60 30 120 q-60 60 30 120 q60 40 150 30"/>
    <path d="M726 340 q90 60 30 120 q-60 60 30 120 q60 40 150 26"/>
  </g>
  ${label(60, 946, opts.caption ?? "Functional zone", p)}
`);

export const cableStation = scene(WIDE, (p, opts = {}) => `
  ${dotGrid(0, 0, 1440, 1080, p.ink, 34, 1.8, 0.12)}
  <rect x="0" y="790" width="1440" height="290" fill="${p.soft}"/>
  ${windowPane(1090, 150, 270, 230, p)}
  <rect x="240" y="140" width="30" height="660" fill="${p.ink}"/>
  <rect x="900" y="140" width="30" height="660" fill="${p.ink}"/>
  <rect x="240" y="140" width="690" height="30" fill="${p.ink}"/>
  <rect x="196" y="778" width="118" height="24" rx="6" fill="${p.ink}"/>
  <rect x="856" y="778" width="118" height="24" rx="6" fill="${p.ink}"/>

  <!-- weight stacks -->
  ${[0, 1].map((side) => {
    const x = side === 0 ? 268 : 792;
    return `<g>
      <rect x="${x}" y="300" width="140" height="480" fill="${p.mid}"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<rect x="${x + 10}" y="${318 + i * 56}" width="120" height="42" rx="6" fill="${i < 3 ? p.accent : p.ink}" opacity="${i < 3 ? 0.9 : 0.75}"/>`).join("")}
      <rect x="${x + 62}" y="180" width="16" height="150" fill="${p.ink}"/>
    </g>`;
  }).join("")}

  <!-- pulleys, cables and handles -->
  <circle cx="330" cy="210" r="24" fill="${p.bg}" stroke="${p.ink}" stroke-width="10"/>
  <circle cx="850" cy="210" r="24" fill="${p.bg}" stroke="${p.ink}" stroke-width="10"/>
  <g stroke="${p.ink}" stroke-width="7" fill="none">
    <path d="M330 234 L330 430 L520 470"/>
    <path d="M850 234 L850 430 L660 470"/>
  </g>
  <g fill="${p.accent}">
    <rect x="486" y="454" width="52" height="20" rx="10"/>
    <rect x="642" y="454" width="52" height="20" rx="10"/>
  </g>
  <rect x="470" y="640" width="240" height="26" rx="8" fill="${p.mid}"/>
  <rect x="484" y="666" width="22" height="134" fill="${p.ink}"/>
  <rect x="674" y="666" width="22" height="134" fill="${p.ink}"/>
  ${label(240, 946, opts.caption ?? "Cable station", p)}
`);

export const groupStudio = scene(WIDE, (p, opts = {}) => `
  ${dotGrid(0, 0, 1440, 1080, p.ink, 34, 1.8, 0.12)}
  <rect x="0" y="620" width="1440" height="460" fill="${p.soft}"/>

  <!-- mirrored wall -->
  <rect x="60" y="110" width="1320" height="440" fill="${p.tint}" stroke="${p.ink}" stroke-width="6"/>
  <g stroke="${p.ink}" stroke-width="6">
    <line x1="500" y1="110" x2="500" y2="550"/>
    <line x1="940" y1="110" x2="940" y2="550"/>
  </g>
  <g stroke="${p.light}" stroke-width="18" opacity="0.5" stroke-linecap="round">
    <line x1="140" y1="500" x2="380" y2="180"/>
    <line x1="580" y1="500" x2="820" y2="180"/>
    <line x1="1020" y1="500" x2="1260" y2="180"/>
  </g>

  <!-- mats laid out in two staggered rows -->
  ${[0, 1].map((row) =>
    [0, 1, 2, 3].map((i) => {
      const x = 110 + i * 320 + row * 90;
      const y = 660 + row * 170;
      const fill = (i + row) % 2 === 0 ? p.mid : p.accent;
      return `<rect x="${x}" y="${y}" width="250" height="120" rx="10" fill="${fill}" opacity="${row === 0 ? 0.9 : 0.75}"/>
        <rect x="${x + 16}" y="${y + 16}" width="218" height="88" rx="6" fill="none" stroke="${p.bg}" stroke-width="5" opacity="0.55"/>`;
    }).join(""),
  ).join("")}

  <!-- speaker on a stand and a wall clock -->
  <rect x="1250" y="360" width="110" height="190" rx="8" fill="${p.ink}"/>
  <circle cx="1305" cy="420" r="30" fill="${p.bg}"/>
  <circle cx="1305" cy="500" r="16" fill="${p.accent}"/>
  <rect x="1296" y="550" width="18" height="110" fill="${p.ink}"/>
  <circle cx="180" cy="230" r="54" fill="${p.bg}" stroke="${p.ink}" stroke-width="10"/>
  <path d="M180 196 V232 L208 246" fill="none" stroke="${p.accent}" stroke-width="10" stroke-linecap="round"/>
  ${label(60, 966, opts.caption ?? "Group studio", p)}
`);

export const lockerRoom = scene(WIDE, (p, opts = {}) => `
  ${dotGrid(0, 0, 1440, 1080, p.ink, 34, 1.8, 0.12)}
  <rect x="0" y="800" width="1440" height="280" fill="${p.soft}"/>

  <!-- locker bank -->
  <rect x="90" y="150" width="900" height="650" fill="${p.mid}" stroke="${p.ink}" stroke-width="6"/>
  ${[0, 1, 2].map((row) =>
    [0, 1, 2, 3, 4].map((col) => {
      const x = 110 + col * 176;
      const y = 172 + row * 210;
      return `<g>
        <rect x="${x}" y="${y}" width="156" height="188" rx="4" fill="${p.light}" stroke="${p.ink}" stroke-width="5"/>
        <g stroke="${p.ink}" stroke-width="4" opacity="0.35">
          <line x1="${x + 22}" y1="${y + 26}" x2="${x + 134}" y2="${y + 26}"/>
          <line x1="${x + 22}" y1="${y + 44}" x2="${x + 134}" y2="${y + 44}"/>
        </g>
        <rect x="${x + 122}" y="${y + 92}" width="14" height="46" rx="7" fill="${(row + col) % 4 === 0 ? p.accent : p.ink}"/>
      </g>`;
    }).join(""),
  ).join("")}
  <rect x="90" y="800" width="900" height="18" fill="${p.ink}" opacity="0.4"/>

  <!-- changing bench and towel shelf -->
  <rect x="1060" y="640" width="320" height="28" rx="8" fill="${p.ink}"/>
  <rect x="1084" y="668" width="26" height="140" fill="${p.ink}"/>
  <rect x="1330" y="668" width="26" height="140" fill="${p.ink}"/>
  <rect x="1060" y="240" width="320" height="20" rx="6" fill="${p.ink}"/>
  ${[0, 1, 2].map((i) => `<rect x="${1082 + i * 100}" y="176" width="80" height="64" rx="8" fill="${i === 1 ? p.accent : p.tint}" stroke="${p.ink}" stroke-width="5"/>`).join("")}
  ${label(90, 946, opts.caption ?? "Locker room", p)}
`);

// Progress card used for the member before/after sliders. `state` sets whether
// the series is flat (before) or moving, and `trend` sets which way it moves.
export const progressChart = scene(WIDE, (p, opts = {}) => {
  const isAfter = opts.state === "after";
  const trend = opts.trend === "down" ? -1 : 1;
  const flat = [0.46, 0.44, 0.47, 0.45, 0.48, 0.46];
  const moving = flat.map((value, i) => value + trend * i * 0.082);
  const series = isAfter ? moving : flat;

  const plotX = 170;
  const plotY = 300;
  const plotW = 1100;
  const plotH = 420;
  const step = plotW / series.length;

  return `
  ${dotGrid(0, 0, 1440, 1080, p.ink, 34, 1.8, 0.1)}
  <rect x="90" y="120" width="1260" height="840" rx="10" fill="${p.light}" stroke="${p.ink}" stroke-width="6"/>
  <rect x="90" y="120" width="1260" height="96" fill="${p.ink}"/>
  <text x="132" y="182" font-family="Inter, Arial, sans-serif" font-size="40" font-weight="800" fill="${p.light}" letter-spacing="0.6">${(opts.title ?? "PROGRESS CARD").toUpperCase()}</text>
  <rect x="1230" y="146" width="80" height="44" rx="6" fill="${p.accent}"/>

  ${rules(plotX, plotY, plotW, 5, plotH / 4, p.ink, 0.16)}
  <line x1="${plotX}" y1="${plotY + plotH}" x2="${plotX + plotW}" y2="${plotY + plotH}" stroke="${p.ink}" stroke-width="6"/>
  <line x1="${plotX}" y1="${plotY}" x2="${plotX}" y2="${plotY + plotH}" stroke="${p.ink}" stroke-width="6"/>

  ${series.map((value, i) => {
    const clamped = Math.max(0.12, Math.min(0.96, value));
    const height = clamped * plotH;
    const x = plotX + i * step + step * 0.24;
    const width = step * 0.52;
    const y = plotY + plotH - height;
    const isLast = i === series.length - 1;
    return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${width.toFixed(1)}" height="${height.toFixed(1)}" rx="6" fill="${isAfter && isLast ? p.accent : isAfter ? p.mid : p.tint}"/>`;
  }).join("")}

  <polyline points="${series.map((value, i) => {
    const clamped = Math.max(0.12, Math.min(0.96, value));
    return `${(plotX + i * step + step * 0.5).toFixed(1)},${(plotY + plotH - clamped * plotH).toFixed(1)}`;
  }).join(" ")}" fill="none" stroke="${p.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>

  <rect x="${plotX}" y="780" width="440" height="18" rx="9" fill="${p.ink}" opacity="0.25"/>
  <rect x="${plotX}" y="820" width="300" height="18" rx="9" fill="${p.ink}" opacity="0.18"/>
  ${label(plotX, 872, opts.caption ?? (isAfter ? "After" : "Before"), p)}
`;
});
