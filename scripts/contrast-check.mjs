/**
 * WCAG AA contrast check for the brief palette pairs used across the site.
 * Run: node scripts/contrast-check.mjs
 */

const PALETTE = {
  plantationInk: '#1c2b22',
  plantationInkSoft: '#2a3d31',
  heritageGold: '#d98e04',
  heritageGoldDeep: '#c98304',
  heritageGoldInk: '#8a5a02',
  terracottaClay: '#b5502e',
  terracottaClayDeep: '#97401f',
  sugarcaneCream: '#faf6ec',
  sand: '#f0e9d8',
  mutedSage: '#61685e',
};

// Foreground over background pairs actually shipped in the UI.
const PAIRS = [
  ['body text', PALETTE.plantationInk, PALETTE.sugarcaneCream, 'normal'],
  ['body text on sand', PALETTE.plantationInk, PALETTE.sand, 'normal'],
  ['supporting copy', PALETTE.mutedSage, PALETTE.sugarcaneCream, 'normal'],
  ['supporting copy on sand', PALETTE.mutedSage, PALETTE.sand, 'normal'],
  ['gold CTA label', PALETTE.plantationInk, PALETTE.heritageGold, 'normal'],
  ['gold CTA hover label', PALETTE.plantationInk, PALETTE.heritageGoldDeep, 'normal'],
  ['gold eyebrow on cream', PALETTE.heritageGoldInk, PALETTE.sugarcaneCream, 'normal'],
  ['gold eyebrow on sand', PALETTE.heritageGoldInk, PALETTE.sand, 'normal'],
  ['clay CTA label', PALETTE.sugarcaneCream, PALETTE.terracottaClay, 'normal'],
  ['clay CTA hover label', PALETTE.sugarcaneCream, PALETTE.terracottaClayDeep, 'normal'],
  ['ink CTA label', PALETTE.sugarcaneCream, PALETTE.plantationInk, 'normal'],
  ['clay accent text', PALETTE.terracottaClayDeep, PALETTE.sand, 'normal'],
  ['clay nav link', PALETTE.terracottaClayDeep, PALETTE.sugarcaneCream, 'normal'],
  ['gold eyebrow on ink', PALETTE.heritageGold, PALETTE.plantationInk, 'normal'],
  ['cream heading on ink', PALETTE.sugarcaneCream, PALETTE.plantationInk, 'large'],
  ['cream body on ink (78%)', mix(PALETTE.sugarcaneCream, PALETTE.plantationInk, 0.78), PALETTE.plantationInk, 'normal'],
  ['muted meta on ink (60%)', mix(PALETTE.sugarcaneCream, PALETTE.plantationInk, 0.6), PALETTE.plantationInk, 'normal'],
  ['footer link (72%)', mix(PALETTE.sugarcaneCream, PALETTE.plantationInk, 0.72), PALETTE.plantationInk, 'normal'],
];

function toRgb(hex) {
  const value = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16));
}

function mix(fgHex, bgHex, alpha) {
  const fg = toRgb(fgHex);
  const bg = toRgb(bgHex);
  const out = fg.map((channel, i) => Math.round(channel * alpha + bg[i] * (1 - alpha)));
  return `#${out.map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}

function relativeLuminance(hex) {
  const [r, g, b] = toRgb(hex).map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(fg, bg) {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const [light, dark] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (light + 0.05) / (dark + 0.05);
}

let failures = 0;
for (const [name, fg, bg, size] of PAIRS) {
  const threshold = size === 'large' ? 3 : 4.5;
  const value = ratio(fg, bg);
  const pass = value >= threshold;
  if (!pass) failures += 1;
  console.log(
    `${pass ? 'PASS' : 'FAIL'}  ${value.toFixed(2)}:1  (min ${threshold})  ${name}  ${fg} on ${bg}`,
  );
}

console.log(`\n${PAIRS.length - failures}/${PAIRS.length} pairs meet WCAG AA.`);
process.exit(failures > 0 ? 1 : 0);
