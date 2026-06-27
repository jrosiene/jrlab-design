/**
 * Generate assets/palette.svg from the color tokens.
 * Source of truth: tokens/colors.css + tokens/semantic.css.
 * Run: npm run palette
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const colorsCss = readFileSync(`${ROOT}/tokens/colors.css`, 'utf8');
const semCss = readFileSync(`${ROOT}/tokens/semantic.css`, 'utf8');

// Parse `--name: r g b;` (only 3-int channel tokens, skip var() aliases).
function parseTokens(css) {
  const out = {};
  const re = /--([a-z0-9-]+):\s*(\d+)\s+(\d+)\s+(\d+)\s*;/gi;
  let m;
  while ((m = re.exec(css))) out[m[1]] = [+m[2], +m[3], +m[4]];
  return out;
}
const tok = { ...parseTokens(colorsCss), ...parseTokens(semCss) };

const hex = ([r, g, b]) => '#' + [r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('').toUpperCase();
const lum = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
const textOn = (rgb) => (lum(rgb) > 140 ? '#0A0A0D' : '#F4F4F6');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const ramps = [
  { name: 'Slate', note: 'neutral anchor', prefix: 'color-slate' },
  { name: 'Teal', note: 'primary accent', prefix: 'color-accent' },
  { name: 'Magenta', note: 'highlight · use sparingly', prefix: 'color-magenta' },
];
const semantic = [
  { name: 'success', cols: ['color-success-soft', 'color-success', 'color-success-strong'] },
  { name: 'warning', cols: ['color-warning-soft', 'color-warning', 'color-warning-strong'] },
  { name: 'error', cols: ['color-error-soft', 'color-error', 'color-error-strong'] },
  { name: 'info', cols: ['color-info-soft', 'color-info', 'color-info-strong'] },
];

const PAD = 32;
const SW = 92, SH = 54, GAP = 8;
const ROW_LABEL = 22, HEX_H = 16, RAMP_GAP = 26;
const rowW = STEPS.length * SW + (STEPS.length - 1) * GAP;
const W = PAD * 2 + rowW;

const MONO = "ui-monospace, 'JetBrains Mono', 'SFMono-Regular', Menlo, monospace";
const SANS = "-apple-system, 'Inter', 'Segoe UI', Roboto, system-ui, sans-serif";
const BG = hex(tok['color-slate-900']);
const FG = hex(tok['color-slate-50']);
const MUTED = hex(tok['color-slate-400']);
const CARDLINE = hex(tok['color-slate-700']);

let y = PAD;
const parts = [];

parts.push(`<text x="${PAD}" y="${y + 22}" font-family="${SANS}" font-size="22" font-weight="700" fill="${FG}">jrlab-design · palette</text>`);
parts.push(`<text x="${PAD}" y="${y + 42}" font-family="${SANS}" font-size="13" fill="${MUTED}">muted clinical cyberpunk — generated from tokens/</text>`);
y += 64;

function rampRow(name, note, swatches) {
  parts.push(`<text x="${PAD}" y="${y + 14}" font-family="${SANS}" font-size="13" font-weight="600" fill="${FG}">${esc(name)}</text>`);
  parts.push(`<text x="${PAD + 90}" y="${y + 14}" font-family="${SANS}" font-size="11" fill="${MUTED}">${esc(note)}</text>`);
  let x = PAD;
  const top = y + ROW_LABEL;
  for (const s of swatches) {
    const fill = hex(s.rgb);
    parts.push(`<rect x="${x}" y="${top}" width="${SW}" height="${SH}" rx="6" fill="${fill}" stroke="${CARDLINE}" stroke-width="0.5"/>`);
    parts.push(`<text x="${x + 8}" y="${top + 17}" font-family="${MONO}" font-size="11" font-weight="600" fill="${textOn(s.rgb)}">${esc(s.label)}</text>`);
    parts.push(`<text x="${x + 8}" y="${top + SH + 12}" font-family="${MONO}" font-size="10" fill="${MUTED}">${fill}</text>`);
    x += SW + GAP;
  }
  y = top + SH + HEX_H + RAMP_GAP;
}

for (const r of ramps) {
  rampRow(r.name, r.note, STEPS.map((st) => ({ rgb: tok[`${r.prefix}-${st}`], label: String(st) })));
}

parts.push(`<text x="${PAD}" y="${y + 14}" font-family="${SANS}" font-size="13" font-weight="600" fill="${FG}">Semantic</text>`);
parts.push(`<text x="${PAD + 90}" y="${y + 14}" font-family="${SANS}" font-size="11" fill="${MUTED}">soft · base · strong</text>`);
const semTop = y + ROW_LABEL;
const groupGap = 20;
const groupW = 3 * SW + 2 * GAP;
let gx = PAD;
for (const grp of semantic) {
  grp.cols.forEach((key, i) => {
    const rgb = tok[key];
    const fill = hex(rgb);
    const x = gx + i * (SW + GAP);
    parts.push(`<rect x="${x}" y="${semTop}" width="${SW}" height="${SH}" rx="6" fill="${fill}" stroke="${CARDLINE}" stroke-width="0.5"/>`);
    parts.push(`<text x="${x + 8}" y="${semTop + SH - 8}" font-family="${MONO}" font-size="10" fill="${textOn(rgb)}">${fill}</text>`);
  });
  parts.push(`<text x="${gx}" y="${semTop + SH + 14}" font-family="${SANS}" font-size="11" font-weight="600" fill="${FG}">${esc(grp.name)}</text>`);
  gx += groupW + groupGap;
}
const semNeeded = PAD * 2 + 4 * groupW + 3 * groupGap;
y = semTop + SH + 14 + RAMP_GAP;

const finalW = Math.max(W, semNeeded);
const H = y + 8;

const svg =
`<svg xmlns="http://www.w3.org/2000/svg" width="${finalW}" height="${H}" viewBox="0 0 ${finalW} ${H}" role="img" aria-label="jrlab-design color palette">
<rect width="${finalW}" height="${H}" rx="14" fill="${BG}"/>
${parts.join('\n')}
</svg>
`;

mkdirSync(`${ROOT}/assets`, { recursive: true });
writeFileSync(`${ROOT}/assets/palette.svg`, svg);
console.log(`wrote assets/palette.svg  (${finalW}x${H}, ${Object.keys(tok).length} tokens parsed)`);
