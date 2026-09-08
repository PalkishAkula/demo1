// Shared drawing primitives for the generated site artwork.
// Everything is flat and duotone — no gradients, no glow, no stock-photo pastiche.

export const palettes = {
  dental: {
    bg: "#FBF7F0",
    soft: "#EDE3D4",
    ink: "#0A3B3F",
    mid: "#0F5257",
    tint: "#CFE0DE",
    accent: "#E85D4A",
    light: "#FFFFFF",
  },
  labs: {
    bg: "#F7F9FC",
    soft: "#DFE7F2",
    ink: "#0A1830",
    mid: "#12294B",
    tint: "#C7D5E8",
    accent: "#F2A50C",
    light: "#FFFFFF",
  },
};

export function dotGrid(x, y, w, h, color, step = 26, r = 1.6, opacity = 0.35) {
  const dots = [];
  for (let cx = x + step / 2; cx < x + w; cx += step) {
    for (let cy = y + step / 2; cy < y + h; cy += step) {
      dots.push(`<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r}"/>`);
    }
  }
  return `<g fill="${color}" opacity="${opacity}">${dots.join("")}</g>`;
}

// A stack of horizontal rules that reads as a floor line or a shelf run.
export function rules(x, y, w, count, gap, color, opacity = 0.28) {
  const lines = Array.from(
    { length: count },
    (_, i) => `<line x1="${x}" y1="${y + i * gap}" x2="${x + w}" y2="${y + i * gap}"/>`,
  );
  return `<g stroke="${color}" stroke-width="2" opacity="${opacity}">${lines.join("")}</g>`;
}

export function plant(x, y, scale, p) {
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <path d="M-9 0 L9 0 L6 46 L-6 46 Z" fill="${p.accent}" opacity="0.9"/>
    <path d="M0 0 C0 -28 -14 -34 -20 -48 C-2 -46 8 -32 0 -6 Z" fill="${p.mid}"/>
    <path d="M0 0 C0 -22 14 -30 22 -42 C10 -44 -4 -30 0 -8 Z" fill="${p.ink}" opacity="0.75"/>
    <path d="M0 0 C-2 -16 4 -26 3 -40 C12 -28 8 -14 2 -2 Z" fill="${p.mid}" opacity="0.6"/>
  </g>`;
}

export function label(x, y, text, p, align = "start") {
  const width = text.length * 9.2 + 44;
  const boxX = align === "end" ? x - width : x;
  return `<g>
    <rect x="${boxX}" y="${y}" width="${width}" height="40" rx="6" fill="${p.ink}"/>
    <rect x="${boxX + 16}" y="${y + 16}" width="8" height="8" fill="${p.accent}"/>
    <text x="${boxX + 32}" y="${y + 26}" font-family="Inter, 'Segoe UI', Arial, sans-serif" font-size="15" font-weight="700" fill="${p.light}" letter-spacing="0.4">${escapeText(text)}</text>
  </g>`;
}

export function escapeText(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Window with mullions — recurs across every interior scene.
export function windowPane(x, y, w, h, p, opacity = 1) {
  return `<g opacity="${opacity}">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${p.tint}"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${p.ink}" stroke-width="5"/>
    <line x1="${x + w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y + h}" stroke="${p.ink}" stroke-width="5"/>
    <line x1="${x}" y1="${y + h / 2}" x2="${x + w}" y2="${y + h / 2}" stroke="${p.ink}" stroke-width="5"/>
  </g>`;
}

// Ceiling-mounted task lamp on an articulated arm. Used in the treatment rooms.
// `x, y` is the ceiling mounting point, so the arm always reads as attached.
export function taskLamp(x, y, p, flip = false) {
  return `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">
    <rect x="-70" y="-14" width="140" height="20" rx="6" fill="${p.ink}"/>
    <line x1="0" y1="0" x2="0" y2="150" stroke="${p.ink}" stroke-width="12" stroke-linecap="round"/>
    <line x1="0" y1="150" x2="150" y2="228" stroke="${p.ink}" stroke-width="12" stroke-linecap="round"/>
    <circle cx="0" cy="150" r="16" fill="${p.ink}"/>
    <circle cx="0" cy="150" r="7" fill="${p.bg}"/>
    <circle cx="150" cy="228" r="14" fill="${p.ink}"/>
    <path d="M118 232 L246 282 L214 366 L92 300 Z" fill="${p.ink}"/>
    <path d="M132 250 L226 288 L206 340 L114 292 Z" fill="${p.accent}"/>
    <g stroke="${p.accent}" stroke-width="8" stroke-linecap="round" opacity="0.55">
      <line x1="150" y1="378" x2="120" y2="452"/>
      <line x1="196" y1="374" x2="196" y2="450"/>
      <line x1="240" y1="360" x2="272" y2="430"/>
    </g>
  </g>`;
}

export function screen(x, y, w, h, p, contents = "") {
  return `<g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${p.ink}"/>
    <rect x="${x + 8}" y="${y + 8}" width="${w - 16}" height="${h - 16}" rx="3" fill="${p.mid}"/>
    ${contents}
    <rect x="${x + w / 2 - 6}" y="${y + h}" width="12" height="20" fill="${p.ink}"/>
    <rect x="${x + w / 2 - 34}" y="${y + h + 20}" width="68" height="8" rx="4" fill="${p.ink}"/>
  </g>`;
}

export function svg(w, h, p, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect width="${w}" height="${h}" fill="${p.bg}"/>
    ${body}
  </svg>`;
}
