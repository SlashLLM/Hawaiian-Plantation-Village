/**
 * Reads design/hpv.tokens.json and writes:
 *   - design/exports/hpv.tokens-studio.json  (Tokens Studio for Figma)
 *   - docs/HPV_Style_Guide.html              (shareable swatch page)
 *
 * Run: npm run tokens:export
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CANONICAL = join(ROOT, 'design', 'hpv.tokens.json');
const EXPORT_DIR = join(ROOT, 'design', 'exports');
const TOKENS_STUDIO_OUT = join(EXPORT_DIR, 'hpv.tokens-studio.json');
const HTML_OUT = join(ROOT, 'docs', 'HPV_Style_Guide.html');

const tokens = JSON.parse(readFileSync(CANONICAL, 'utf8'));
const generatedAt = new Date().toISOString().slice(0, 10);

function resolveRef(value, root = tokens) {
  if (typeof value !== 'string' || !value.startsWith('{') || !value.endsWith('}')) {
    return value;
  }
  const path = value.slice(1, -1).split('.');
  let node = root;
  for (const key of path) {
    node = node?.[key];
    if (node == null) return value;
  }
  if (node && typeof node === 'object' && '$value' in node) {
    return resolveRef(node.$value, root);
  }
  return node;
}

function leafValue(token) {
  if (!token || typeof token !== 'object') return token;
  if ('$value' in token) return resolveRef(token.$value);
  return token;
}

function flattenColors(obj, prefix = [], out = {}) {
  for (const [key, node] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    const path = [...prefix, key];
    if (node && typeof node === 'object' && '$type' in node && node.$type === 'color') {
      const name = path.join('/');
      out[name] = {
        value: String(leafValue(node)),
        type: 'color',
        description: node.$description ?? '',
      };
    } else if (node && typeof node === 'object') {
      flattenColors(node, path, out);
    }
  }
  return out;
}

function fontStack(value) {
  const resolved = resolveRef(value);
  if (Array.isArray(resolved)) return resolved.join(', ');
  return String(resolved);
}

function fontSizeCss(size) {
  if (size && typeof size === 'object' && size.css) return size.css;
  return String(size);
}

function toTokensStudio() {
  const studio = {};

  // Brand + supporting + border + semantic (skip legacy)
  const colorGroups = {
    ...flattenColors(tokens.color.brand, ['color', 'brand']),
    ...flattenColors(tokens.color.supporting, ['color', 'supporting']),
    ...flattenColors(tokens.color.border, ['color', 'border']),
    ...flattenColors(tokens.color.semantic, ['color', 'semantic']),
  };
  for (const [name, entry] of Object.entries(colorGroups)) {
    studio[name] = entry;
  }

  for (const [key, node] of Object.entries(tokens.fontFamily)) {
    studio[`fontFamily/${key}`] = {
      value: fontStack(node.$value),
      type: 'fontFamilies',
      description: node.$description ?? '',
    };
  }

  function walkTypography(obj, prefix) {
    for (const [key, node] of Object.entries(obj)) {
      if (key.startsWith('$')) continue;
      const path = [...prefix, key];
      if (node && node.$type === 'typography') {
        const v = node.$value;
        const name = path.join('/');
        studio[name] = {
          value: {
            fontFamily: fontStack(v.fontFamily),
            fontWeight: String(v.fontWeight),
            fontSize: fontSizeCss(v.fontSize),
            lineHeight: String(v.lineHeight),
            letterSpacing: String(v.letterSpacing ?? '0'),
            textCase: v.textTransform === 'uppercase' ? 'uppercase' : 'none',
          },
          type: 'typography',
          description: node.$description ?? '',
        };
      } else if (node && typeof node === 'object' && !('$type' in node)) {
        walkTypography(node, path);
      }
    }
  }
  walkTypography(tokens.typography, ['typography']);

  for (const [key, node] of Object.entries(tokens.spacing.scale)) {
    studio[`spacing/${key}`] = {
      value: node.$value,
      type: 'spacing',
    };
  }
  for (const [key, node] of Object.entries(tokens.spacing.named)) {
    studio[`spacing/named/${key}`] = {
      value: node.$value,
      type: 'spacing',
      description: node.$description ?? '',
    };
  }

  studio['layout/shell/inline'] = {
    value: tokens.layout.shell.inline.$value.css,
    type: 'spacing',
    description: tokens.layout.shell.inline.$description,
  };
  studio['layout/shell/max-width'] = {
    value: tokens.layout.shell['max-width'].$value,
    type: 'sizing',
  };
  studio['layout/section/block'] = {
    value: tokens.layout.section.block.$value.css,
    type: 'spacing',
    description: tokens.layout.section.block.$description,
  };
  studio['layout/measure/prose'] = {
    value: tokens.layout.measure.prose.$value,
    type: 'sizing',
  };

  for (const [key, node] of Object.entries(tokens.radius)) {
    studio[`radius/${key}`] = {
      value: node.$value,
      type: 'borderRadius',
      description: node.$description ?? '',
    };
  }

  studio['shadow/sm'] = { value: 'none', type: 'boxShadow' };
  studio['shadow/md'] = {
    value: {
      x: tokens.shadow.md.$value.offsetX,
      y: tokens.shadow.md.$value.offsetY,
      blur: tokens.shadow.md.$value.blur,
      spread: tokens.shadow.md.$value.spread,
      color: tokens.shadow.md.$value.color,
      type: 'dropShadow',
    },
    type: 'boxShadow',
  };
  studio['shadow/lg'] = {
    value: {
      x: tokens.shadow.lg.$value.offsetX,
      y: tokens.shadow.lg.$value.offsetY,
      blur: tokens.shadow.lg.$value.blur,
      spread: tokens.shadow.lg.$value.spread,
      color: tokens.shadow.lg.$value.color,
      type: 'dropShadow',
    },
    type: 'boxShadow',
  };

  return studio;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function swatchStyle(hex) {
  return `background:${escapeHtml(hex)}`;
}

function buildHtml() {
  const brand = tokens.color.brand;
  const supporting = tokens.color.supporting;
  const border = tokens.color.border;
  const semantic = tokens.color.semantic;
  const fontsUrl = tokens.meta.fontsUrl;

  const brandSwatches = Object.entries(brand)
    .map(([name, node]) => {
      const hex = node.$value;
      const light = ['sugarcane-cream', 'sand'].includes(name);
      return `
      <button type="button" class="swatch" data-copy="${escapeHtml(hex)}" title="Copy ${escapeHtml(hex)}">
        <span class="swatch-chip" style="${swatchStyle(hex)}"></span>
        <span class="swatch-meta" style="color:${light ? '#1c2b22' : 'inherit'}">
          <strong>${escapeHtml(name)}</strong>
          <code>${escapeHtml(hex)}</code>
          <em>${escapeHtml(node.$description ?? '')}</em>
        </span>
      </button>`;
    })
    .join('\n');

  const supportingSwatches = Object.entries(supporting)
    .map(([name, node]) => `
      <button type="button" class="swatch" data-copy="${escapeHtml(node.$value)}">
        <span class="swatch-chip" style="${swatchStyle(node.$value)}"></span>
        <span class="swatch-meta">
          <strong>${escapeHtml(name)}</strong>
          <code>${escapeHtml(node.$value)}</code>
          <em>${escapeHtml(node.$description ?? '')}</em>
        </span>
      </button>`)
    .join('\n');

  const borderSwatches = Object.entries(border)
    .map(([name, node]) => `
      <button type="button" class="swatch" data-copy="${escapeHtml(node.$value)}">
        <span class="swatch-chip border-chip" style="background:#faf6ec;box-shadow:inset 0 0 0 3px ${escapeHtml(node.$value)}"></span>
        <span class="swatch-meta">
          <strong>${escapeHtml(name)}</strong>
          <code>${escapeHtml(node.$value)}</code>
        </span>
      </button>`)
    .join('\n');

  const semanticRows = [];
  function walkSemantic(obj, prefix = []) {
    for (const [key, node] of Object.entries(obj)) {
      if (key.startsWith('$')) continue;
      if (node.$type === 'color') {
        const resolved = String(leafValue(node));
        semanticRows.push(`
          <tr>
            <td><code>color/semantic/${[...prefix, key].join('/')}</code></td>
            <td><span class="mini-chip" style="${swatchStyle(resolved)}"></span> <code>${escapeHtml(resolved)}</code></td>
            <td>${escapeHtml(node.$description ?? '')}</td>
          </tr>`);
      } else if (typeof node === 'object') {
        walkSemantic(node, [...prefix, key]);
      }
    }
  }
  walkSemantic(semantic);

  const typeRoles = [
    ['display/hero', tokens.typography.display.hero, 'History didn\'t happen here. It still does.'],
    ['display/section', tokens.typography.display.section, 'Where Hawaiʻi\'s roots run deep'],
    ['body/default', tokens.typography.body.default, 'A non-profit cultural heritage destination dedicated to preserving the history of Hawaiʻi\'s plantation workers.'],
    ['body/lede', tokens.typography.body.lede, 'Read them the way historians do: observe first, then ask what the image can and cannot tell you.'],
    ['eyebrow', tokens.typography.eyebrow, 'Hawaiʻi\'s living museum · Waipahu, Oʻahu'],
    ['ui/button', tokens.typography.ui.button, 'Plan your visit'],
    ['ui/nav', tokens.typography.ui.nav, 'Archives'],
    ['caption/stat', tokens.typography.caption.stat, 'Students each year'],
  ];

  const typeBlocks = typeRoles
    .map(([name, node, sample]) => {
      const v = node.$value;
      const size = fontSizeCss(v.fontSize);
      const family = fontStack(v.fontFamily);
      const transform = v.textTransform ?? 'none';
      return `
      <div class="type-card">
        <p class="type-label"><code>${escapeHtml(name)}</code> · ${escapeHtml(size)} / ${escapeHtml(String(v.fontWeight))} / lh ${escapeHtml(String(v.lineHeight))}</p>
        <p class="type-sample" style="font-family:${escapeHtml(family)};font-weight:${escapeHtml(String(v.fontWeight))};font-size:${escapeHtml(size)};line-height:${escapeHtml(String(v.lineHeight))};letter-spacing:${escapeHtml(String(v.letterSpacing ?? '0'))};text-transform:${escapeHtml(transform)};">${escapeHtml(sample)}</p>
      </div>`;
    })
    .join('\n');

  const spacingBars = Object.entries(tokens.spacing.scale)
    .map(([key, node]) => `
      <div class="space-row">
        <code>spacing/${escapeHtml(key)}</code>
        <div class="space-bar" style="width:${escapeHtml(node.$value)}"></div>
        <span>${escapeHtml(node.$value)}</span>
      </div>`)
    .join('\n');

  const contrastRows = tokens.contrast.pairs
    .map((pair) => `
      <tr>
        <td>${escapeHtml(pair.name)}</td>
        <td><span class="contrast-demo" style="background:${escapeHtml(pair.bg)};color:${escapeHtml(pair.fg)}">Aa</span></td>
        <td><code>${escapeHtml(pair.fg)}</code> on <code>${escapeHtml(pair.bg)}</code></td>
        <td>${escapeHtml(pair.size)}</td>
      </tr>`)
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>HPV Style Guide — Colour, type &amp; spacing</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="${escapeHtml(fontsUrl)}" rel="stylesheet" />
  <style>
    :root {
      --ink: #1c2b22;
      --ink-soft: #2a3d31;
      --gold: #d98e04;
      --gold-deep: #c98304;
      --gold-ink: #8a5a02;
      --clay: #b5502e;
      --clay-deep: #97401f;
      --cream: #faf6ec;
      --sand: #f0e9d8;
      --sage: #61685e;
      --hairline: rgba(28, 43, 34, 0.14);
      --radius: 6px;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: Inter, system-ui, sans-serif;
      background: var(--cream);
      color: var(--ink);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    header.hero {
      background: var(--ink);
      color: var(--cream);
      padding: clamp(3rem, 8vw, 5rem) clamp(1.25rem, 4vw, 2.5rem);
    }
    header.hero .eyebrow {
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 1rem;
    }
    header.hero h1 {
      font-family: Fraunces, Georgia, serif;
      font-weight: 500;
      font-size: clamp(2rem, 5vw, 3.25rem);
      line-height: 1.08;
      letter-spacing: -0.02em;
      max-width: 16ch;
    }
    header.hero p {
      margin-top: 1.25rem;
      max-width: 58ch;
      color: rgba(250, 246, 236, 0.78);
      font-size: 1.05rem;
      line-height: 1.7;
    }
    main {
      max-width: 1180px;
      margin: 0 auto;
      padding: clamp(2.5rem, 6vw, 4rem) clamp(1.25rem, 4vw, 2.5rem);
    }
    section { margin-bottom: clamp(3rem, 7vw, 5rem); }
    h2 {
      font-family: Fraunces, Georgia, serif;
      font-weight: 500;
      font-size: clamp(1.6rem, 3vw, 2.2rem);
      margin-bottom: 0.5rem;
    }
    .lede { color: var(--sage); max-width: 58ch; margin-bottom: 1.75rem; }
    .swatch-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }
    .swatch {
      display: flex;
      flex-direction: column;
      text-align: left;
      border: 1px solid var(--hairline);
      border-radius: var(--radius);
      overflow: hidden;
      background: white;
      cursor: pointer;
      padding: 0;
      font: inherit;
      color: inherit;
      transition: border-color 0.2s;
    }
    .swatch:hover { border-color: var(--ink); }
    .swatch-chip { display: block; height: 88px; width: 100%; }
    .swatch-meta {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      padding: 0.85rem 1rem 1rem;
    }
    .swatch-meta strong { font-size: 0.9rem; }
    .swatch-meta code { font-size: 0.8rem; color: var(--sage); }
    .swatch-meta em { font-style: normal; font-size: 0.78rem; color: var(--sage); line-height: 1.4; }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
    }
    th, td {
      text-align: left;
      padding: 0.7rem 0.5rem;
      border-bottom: 1px solid var(--hairline);
      vertical-align: middle;
    }
    th { font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--sage); font-weight: 600; }
    .mini-chip {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      border-radius: 3px;
      border: 1px solid var(--hairline);
      vertical-align: middle;
    }
    .type-card {
      padding: 1.25rem 0;
      border-top: 1px solid var(--hairline);
    }
    .type-label { font-size: 0.78rem; color: var(--sage); margin-bottom: 0.5rem; }
    .type-sample { margin: 0; color: var(--ink); }
    .space-row {
      display: grid;
      grid-template-columns: 110px 1fr 60px;
      gap: 1rem;
      align-items: center;
      margin-bottom: 0.6rem;
      font-size: 0.85rem;
    }
    .space-bar {
      height: 12px;
      background: var(--ink);
      border-radius: 2px;
      min-width: 4px;
    }
    .btn-row { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 0.5rem; }
    .btn {
      font-family: Inter, system-ui, sans-serif;
      font-weight: 600;
      font-size: 0.95rem;
      padding: 0.8rem 1.4rem;
      border-radius: 6px;
      border: 1px solid transparent;
      cursor: default;
      display: inline-flex;
      align-items: center;
    }
    .btn-accent { background: var(--gold); color: var(--ink); border-color: var(--gold); }
    .btn-clay { background: var(--clay); color: var(--cream); border-color: var(--clay); }
    .btn-primary { background: var(--ink); color: var(--cream); border-color: var(--ink); }
    .btn-secondary { background: transparent; color: var(--ink); border-color: rgba(28,43,34,0.24); }
    .btn-ghost-invert { background: transparent; color: var(--cream); border-color: rgba(250,246,236,0.22); }
    .ink-band {
      background: var(--ink);
      padding: 1.5rem;
      border-radius: var(--radius);
      margin-top: 1rem;
    }
    .radius-demo {
      display: flex;
      gap: 1.5rem;
      flex-wrap: wrap;
    }
    .radius-box {
      width: 96px;
      height: 72px;
      background: var(--sand);
      border: 1px solid var(--hairline);
      display: flex;
      align-items: flex-end;
      padding: 0.5rem;
      font-size: 0.75rem;
      color: var(--sage);
    }
    .contrast-demo {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2rem;
      border-radius: 4px;
      font-family: Fraunces, Georgia, serif;
      font-weight: 500;
      border: 1px solid var(--hairline);
    }
    footer {
      border-top: 1px solid var(--hairline);
      padding: 2rem clamp(1.25rem, 4vw, 2.5rem) 3rem;
      color: var(--sage);
      font-size: 0.85rem;
      max-width: 1180px;
      margin: 0 auto;
    }
    .toast {
      position: fixed;
      bottom: 1.25rem;
      right: 1.25rem;
      background: var(--ink);
      color: var(--cream);
      padding: 0.6rem 1rem;
      border-radius: 6px;
      font-size: 0.85rem;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
      z-index: 10;
    }
    .toast.show { opacity: 1; }
    @media print {
      header.hero { break-inside: avoid; }
      .swatch { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <header class="hero">
    <p class="eyebrow">Hawaii's Plantation Village · Design tokens</p>
    <h1>Colour, type &amp; spacing</h1>
    <p>${escapeHtml(tokens.meta.voice)} Shareable style guide aligned to the live site tokens in <code>src/index.css</code>.</p>
  </header>

  <main>
    <section id="colour">
      <h2>Brand colour</h2>
      <p class="lede">Core palette from the creative brief. Click a swatch to copy its hex (or rgba).</p>
      <div class="swatch-grid">${brandSwatches}</div>
    </section>

    <section id="supporting">
      <h2>Supporting colour</h2>
      <p class="lede">Links and deep accents used alongside the brand set.</p>
      <div class="swatch-grid">${supportingSwatches}</div>
    </section>

    <section id="borders">
      <h2>Hairline borders</h2>
      <p class="lede">Prefer hairlines over heavy shadows. Radius stays 4–6px.</p>
      <div class="swatch-grid">${borderSwatches}</div>
      <div class="radius-demo" style="margin-top:1.5rem">
        <div class="radius-box" style="border-radius:4px">sm 4px</div>
        <div class="radius-box" style="border-radius:6px">md / lg 6px</div>
      </div>
    </section>

    <section id="semantic">
      <h2>Semantic aliases</h2>
      <p class="lede">Use these names in Figma variables for surfaces, text, and CTAs. Gold = act; clay = give.</p>
      <table>
        <thead><tr><th>Token</th><th>Resolved</th><th>Use</th></tr></thead>
        <tbody>${semanticRows.join('\n')}</tbody>
      </table>
    </section>

    <section id="typography">
      <h2>Typography</h2>
      <p class="lede">Display <strong>Fraunces</strong>, body and UI <strong>Inter</strong>. Sentence case everywhere; no ALL CAPS body copy. Eyebrows may use tracked uppercase.</p>
      ${typeBlocks}
    </section>

    <section id="spacing">
      <h2>Spacing scale</h2>
      <p class="lede">4px grid. Shell inline padding is <code>${escapeHtml(tokens.layout.shell.inline.$value.css)}</code>; section block is <code>${escapeHtml(tokens.layout.section.block.$value.css)}</code>; prose measure <code>${escapeHtml(tokens.layout.measure.prose.$value)}</code>.</p>
      ${spacingBars}
    </section>

    <section id="buttons">
      <h2>Buttons</h2>
      <p class="lede">One gold CTA per view. Clay is reserved for give / donate. Ghost invert sits on ink bands.</p>
      <div class="btn-row">
        <span class="btn btn-accent">Get tickets</span>
        <span class="btn btn-clay">Give</span>
        <span class="btn btn-primary">Primary</span>
        <span class="btn btn-secondary">Secondary</span>
      </div>
      <div class="ink-band">
        <div class="btn-row">
          <span class="btn btn-accent">Plan your visit</span>
          <span class="btn btn-ghost-invert">Watch the story</span>
        </div>
      </div>
    </section>

    <section id="accessibility">
      <h2>Accessibility pairs</h2>
      <p class="lede">Pairs verified for WCAG AA by <code>scripts/contrast-check.mjs</code>. Prefer <code>heritage-gold-ink</code> and <code>terracotta-clay-deep</code> when colour is used as text on cream or sand.</p>
      <table>
        <thead><tr><th>Pair</th><th>Sample</th><th>Colours</th><th>Size</th></tr></thead>
        <tbody>${contrastRows}</tbody>
      </table>
    </section>
  </main>

  <footer>
    Source: <code>design/hpv.tokens.json</code> · Generated ${escapeHtml(generatedAt)} ·
    Figma import: <code>design/exports/hpv.tokens-studio.json</code> ·
    Regenerate with <code>npm run tokens:export</code>
  </footer>

  <div class="toast" id="toast" role="status">Copied</div>
  <script>
    const toast = document.getElementById('toast');
    let timer;
    document.querySelectorAll('[data-copy]').forEach((el) => {
      el.addEventListener('click', async () => {
        const value = el.getAttribute('data-copy');
        try {
          await navigator.clipboard.writeText(value);
          toast.textContent = 'Copied ' + value;
          toast.classList.add('show');
          clearTimeout(timer);
          timer = setTimeout(() => toast.classList.remove('show'), 1600);
        } catch {
          toast.textContent = value;
          toast.classList.add('show');
        }
      });
    });
  </script>
</body>
</html>
`;
}

mkdirSync(EXPORT_DIR, { recursive: true });
const studio = toTokensStudio();
writeFileSync(TOKENS_STUDIO_OUT, `${JSON.stringify(studio, null, 2)}\n`, 'utf8');
writeFileSync(HTML_OUT, buildHtml(), 'utf8');

console.log(`Wrote ${Object.keys(studio).length} Tokens Studio entries → design/exports/hpv.tokens-studio.json`);
console.log(`Wrote style guide → docs/HPV_Style_Guide.html`);
console.log(`Generated ${generatedAt}`);
