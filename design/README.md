# HPV design tokens

Shareable **colour, type, and spacing** tokens for Hawaii's Plantation Village (creative brief 2026). Figma is the preferred design handoff; the HTML style guide is for anyone who does not use Figma.

## Files

| Path | Role |
|------|------|
| [`hpv.tokens.json`](hpv.tokens.json) | **Canonical** token document — edit this |
| [`exports/hpv.tokens-studio.json`](exports/hpv.tokens-studio.json) | Generated Tokens Studio for Figma import |
| [`../docs/HPV_Style_Guide.html`](../docs/HPV_Style_Guide.html) | Generated swatch page (open in a browser) |

Runtime CSS variables live in [`../src/index.css`](../src/index.css). They are the source of truth for the live site today. Token names map 1:1 via the `cssMap` block in `hpv.tokens.json`.

## Regenerate exports

```bash
npm run tokens:export
```

This rewrites `design/exports/hpv.tokens-studio.json` and `docs/HPV_Style_Guide.html` from `design/hpv.tokens.json`.

## Import into Figma (Tokens Studio)

1. Install **[Tokens Studio for Figma](https://tokens.studio/)** (Figma plugin).
2. Open your HPV design file → run Tokens Studio.
3. **Load** / import [`exports/hpv.tokens-studio.json`](exports/hpv.tokens-studio.json) (or paste its contents).
4. Sync colour and dimension tokens to **Figma Variables**.
5. Create **text styles** from the typography token sets (recommended mapping below).

### Recommended text styles

| Figma text style | Token path | Notes |
|------------------|------------|--------|
| Display / Hero | `typography/display/hero` | Fraunces 500; clamp size |
| Display / Section | `typography/display/section` | `.editorial-title` |
| Body / Default | `typography/body/default` | Inter 400 |
| Body / Lede | `typography/body/lede` | Supporting intro |
| Eyebrow | `typography/eyebrow` | Tracked uppercase label |
| UI / Button | `typography/ui/button` | Sentence case |
| UI / Nav | `typography/ui/nav` | |
| Caption / Stat | `typography/caption/stat` | Hero stats labels |

Fonts: load **Fraunces** and **Inter** in the Figma file (same families as the site Google Fonts URL in `meta.fontsUrl`).

### Semantic colour variables

Prefer these over raw brand hexes in components:

| Variable | Meaning |
|----------|---------|
| `color/semantic/surface/cream` | Default page background |
| `color/semantic/surface/sand` | Alternating section |
| `color/semantic/surface/ink` | Hero / inverted band |
| `color/semantic/text/primary` | Body + headings on light |
| `color/semantic/text/muted` | Supporting copy |
| `color/semantic/text/gold` | Gold **text** on cream/sand (`heritage-gold-ink`) |
| `color/semantic/text/clay` | Clay accent text / Give link |
| `color/semantic/cta/accent` | Gold **fill** — primary act CTA |
| `color/semantic/cta/give` | Clay **fill** — donate |
| `color/semantic/cta/primary` | Ink fill button |

## Semantic rules (brief)

- **Gold = act** — one `.btn-accent` / gold CTA per view (tickets, plan visit).
- **Clay = give** — donate / membership support moments.
- **Sentence case** — no ALL CAPS body copy; eyebrows may use tracked uppercase.
- **Radius** — 4px (`sm`) or 6px (`md` / `lg`); no large pills.
- **Borders** — hairlines, not heavy shadows.
- **Legacy names** (`cane-green`, `sugar-gold`, `kraft-tan`, …) exist only for older CSS compatibility. They are **not** in the Figma export. Use brand / semantic tokens for new work.

## Accessibility

Contrast pairs for text and CTAs are listed in `hpv.tokens.json` → `contrast.pairs` and on the HTML style guide. Re-check with:

```bash
node scripts/contrast-check.mjs
```

Rules of thumb:

- Body text: plantation ink on cream or sand.
- Gold as **text** on light surfaces: use `heritage-gold-ink` (`#8a5a02`), not `#d98e04`.
- Clay as **text** on light surfaces: use `terracotta-clay-deep` (`#97401f`).
- Gold CTA **labels**: plantation ink on heritage gold (not cream on gold).

## Maintenance

1. Edit [`hpv.tokens.json`](hpv.tokens.json).
2. Run `npm run tokens:export`.
3. If you change brand hexes, update matching `:root` variables in `src/index.css` and `PALETTE` in `scripts/contrast-check.mjs` until CSS is generated from tokens (optional follow-up).

Do not commit a binary `.fig` file as the source of truth — the JSON export stays current when tokens change.
