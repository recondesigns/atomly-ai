#!/usr/bin/env node
/**
 * Reads a Token Studio JSON export from tokens/figma-export.json and writes
 * tokens/primitives.json in DTCG format. Run via: pnpm sync:tokens
 *
 * Workflow:
 *   1. In Figma, open Token Studio → export → save as tokens/figma-export.json
 *   2. Run pnpm sync:tokens
 *   3. Commit tokens/figma-export.json and the regenerated token outputs
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const exportPath = join(root, 'tokens/figma-export.json');

let raw;
try {
  raw = JSON.parse(readFileSync(exportPath, 'utf8'));
} catch {
  console.error('Error: could not read tokens/figma-export.json');
  console.error('Export your tokens from Token Studio in Figma and save the file there.');
  process.exit(1);
}

// Build a flat lookup: "family/scale" → hex value string
// Handles both nested tokens (indigo/600) and flat tokens (white, black)
function buildLookup(collection) {
  const lookup = {};

  function walk(obj, path) {
    if (obj.$value !== undefined) {
      lookup[path] = obj.$value;
    } else {
      for (const [key, value] of Object.entries(obj)) {
        if (key.startsWith('$') || typeof value !== 'object' || value === null) continue;
        walk(value, path ? `${path}/${key}` : key);
      }
    }
  }

  walk(collection, '');
  return lookup;
}

// Token Studio exports the Primitive collection under "Primitive/Value"
const collection = raw['Primitive/Value'] ?? raw;
const lookup = buildLookup(collection);

// Resolve a Token Studio alias like {neutral.100} to a concrete value.
// Checks the primitive lookup first, then an optional secondary lookup.
function resolveAlias(value, primLookup, secondaryLookup = {}) {
  if (typeof value !== 'string') return value;
  const match = value.match(/^\{(.+)\}$/);
  if (!match) return value;
  const key = match[1].replace(/\./g, '/');
  return primLookup[key] ?? secondaryLookup[key] ?? value;
}

// Build a resolved lookup for Color/Light (semantic tokens → concrete hex values)
const rawSemanticLookup = buildLookup(raw['Color/Light'] ?? {});
const semanticLookup = {};
for (const [key, val] of Object.entries(rawSemanticLookup)) {
  semanticLookup[key] = resolveAlias(val, lookup);
}

// Build a resolved lookup for Component/Value (component tokens → concrete values)
// Resolves aliases through semantics → primitives chain
const rawComponentLookup = buildLookup(raw['Component/Value'] ?? {});
const componentLookup = {};
for (const [key, val] of Object.entries(rawComponentLookup)) {
  componentLookup[key] = resolveAlias(val, lookup, semanticLookup);
}

// Helper: get a component token value by its path within Component/Value
const compGet = (path, fallback) => componentLookup[`component/${path}`] ?? fallback;

// Lookups for the remaining new collections
const spaceLookup = buildLookup(raw['Space/Value'] ?? {});
const shapeLookup = buildLookup(raw['Shape/Value'] ?? {});
const typographyLookup = buildLookup(raw['Typography/Value'] ?? {});

// Helper: get a value from the lookup, falling back to a hardcoded default
const get = (name, fallback) => lookup[name] ?? fallback;

// Helper: number → "Xpx" — checks a lookup then falls back
function toPx(lookupObj, name, fallback) {
  const v = lookupObj[name];
  return v !== undefined ? (typeof v === 'number' ? `${v}px` : v) : fallback;
}

// Helper: number → rem — checks a lookup then falls back
function toRem(lookupObj, name, fallback) {
  const v = lookupObj[name];
  if (v === undefined) return fallback;
  if (typeof v === 'number') return `${+(v / 16).toFixed(4).replace(/\.?0+$/, '')}rem`;
  return v;
}

// Helper: number value — checks a lookup then falls back
function toNum(lookupObj, name, fallback) {
  const v = lookupObj[name];
  return v !== undefined ? Number(v) : fallback;
}

// Legacy helpers that read from the Primitive/Value collection (for colour tokens and
// any token not yet covered by a dedicated collection)
const px = (name, fallback) => toPx(lookup, name, fallback);
const rem = (name, fallback) => toRem(lookup, name, fallback);
const num = (name, fallback) => toNum(lookup, name, fallback);

// Derive an rgba(...) at 40% opacity from a hex color
function alpha40(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, 0.4)`;
}

const focusRing = alpha40(get('indigo/600', '#4F46E5'));
const focusRingDark = alpha40(get('indigo/500', '#6366F1'));

// Map Token Studio primitives → tokens/primitives.json (DTCG format)
const primitives = {
  color: {
    // Primary (indigo scale — was blue)
    primary: { $value: get('indigo/600', '#4F46E5'), $type: 'color' },
    'primary-hover': { $value: get('indigo/700', '#4338CA'), $type: 'color' },
    'primary-active': { $value: get('indigo/800', '#3730A3'), $type: 'color' },
    'primary-light': { $value: get('indigo/50', '#EEF2FF'), $type: 'color' },

    // Brand (coral scale — was amber)
    brand: { $value: get('coral/500', '#F97316'), $type: 'color' },
    'brand-hover': { $value: get('coral/600', '#EA580C'), $type: 'color' },
    'brand-active': { $value: get('coral/700', '#C2410C'), $type: 'color' },
    'brand-light': { $value: get('coral/50', '#FFF7ED'), $type: 'color' },

    // Success (emerald scale — was green)
    success: { $value: get('emerald/600', '#059669'), $type: 'color' },
    'success-hover': { $value: get('emerald/700', '#047857'), $type: 'color' },
    'success-active': { $value: get('emerald/800', '#065F46'), $type: 'color' },
    'success-light': { $value: get('emerald/50', '#ECFDF5'), $type: 'color' },

    // Danger (red scale — unchanged)
    danger: { $value: get('red/600', '#DC2626'), $type: 'color' },
    'danger-hover': { $value: get('red/700', '#B91C1C'), $type: 'color' },
    'danger-active': { $value: get('red/800', '#991B1B'), $type: 'color' },
    'danger-light': { $value: get('red/50', '#FEF2F2'), $type: 'color' },

    // Warning (amber scale — newly freed up now that brand moved to coral)
    warning: { $value: get('amber/500', '#F59E0B'), $type: 'color' },
    'warning-hover': { $value: get('amber/600', '#D97706'), $type: 'color' },
    'warning-active': { $value: get('amber/700', '#B45309'), $type: 'color' },
    'warning-light': { $value: get('amber/50', '#FFFBEB'), $type: 'color' },

    // Surfaces
    background: { $value: get('neutral/0', '#FFFFFF'), $type: 'color' },
    surface: { $value: get('neutral/50', '#F8FAFC'), $type: 'color' },
    'surface-hover': { $value: get('neutral/100', '#F1F5F9'), $type: 'color' },

    // Text
    'text-primary': { $value: get('neutral/900', '#0F172A'), $type: 'color' },
    'text-success': { $value: get('white', '#FFFFFF'), $type: 'color' },
    'text-on-primary': { $value: get('white', '#FFFFFF'), $type: 'color' },
    'text-on-secondary': { $value: get('neutral/900', '#0F172A'), $type: 'color' },
    'text-on-danger': { $value: get('white', '#FFFFFF'), $type: 'color' },
    // Dark, not white — white-on-amber-500 is 2.15:1 (fails WCAG AA); neutral/900 is 8.31:1.
    'text-on-warning': { $value: get('neutral/900', '#0F172A'), $type: 'color' },
    'text-disabled': { $value: get('neutral/400', '#94A3B8'), $type: 'color' },

    // Borders
    border: { $value: get('neutral/200', '#E2E8F0'), $type: 'color' },
    'border-focus': { $value: get('indigo/600', '#4F46E5'), $type: 'color' },

    // States
    disabled: { $value: get('neutral/100', '#F1F5F9'), $type: 'color' },
    'focus-ring': { $value: focusRing },

    // Text-safe step per intent, for use as text/icon color on outline/ghost
    // variants. The base fill color isn't always dark enough to hit 4.5:1 —
    // this fixed real WCAG failures in Button (brand/success outline text)
    // and Badge (brand text) that were using the base -500/-600 color directly.
    'primary-text': { $value: get('indigo/600', '#4F46E5'), $type: 'color' },
    'brand-text': { $value: get('coral/700', '#C2410C'), $type: 'color' },
    'success-text': { $value: get('emerald/700', '#047857'), $type: 'color' },
    'danger-text': { $value: get('red/700', '#B91C1C'), $type: 'color' },
    'warning-text': { $value: get('amber/700', '#B45309'), $type: 'color' },
  },

  // Dark-mode counterpart of `color` above. Values follow Figma's Color/Dark
  // collection: primary/brand/success/danger/warning shift to lighter, less
  // saturated steps so they read against dark surfaces (or stay the same
  // base step where the Figma dark collection kept it unchanged, e.g. brand/
  // success/danger/warning solid fills). `<intent>-text` values are
  // independently WCAG-verified against both the intent's own dark subtle
  // background and the neutral-900 page background.
  colorDark: {
    primary: { $value: get('indigo/500', '#6366F1'), $type: 'color' },
    'primary-hover': { $value: get('indigo/400', '#818CF8'), $type: 'color' },
    'primary-active': { $value: get('indigo/300', '#A5B4FC'), $type: 'color' },
    'primary-light': { $value: get('indigo/950', '#1E1B4B'), $type: 'color' },

    brand: { $value: get('coral/500', '#F97316'), $type: 'color' },
    'brand-hover': { $value: get('coral/400', '#FB923C'), $type: 'color' },
    'brand-active': { $value: get('coral/300', '#FDBA74'), $type: 'color' },
    'brand-light': { $value: get('coral/950', '#431407'), $type: 'color' },

    success: { $value: get('emerald/600', '#059669'), $type: 'color' },
    'success-hover': { $value: get('emerald/400', '#34D399'), $type: 'color' },
    'success-active': { $value: get('emerald/300', '#6EE7B7'), $type: 'color' },
    'success-light': { $value: get('emerald/950', '#022C22'), $type: 'color' },

    danger: { $value: get('red/600', '#DC2626'), $type: 'color' },
    'danger-hover': { $value: get('red/400', '#F87171'), $type: 'color' },
    'danger-active': { $value: get('red/300', '#FCA5A5'), $type: 'color' },
    'danger-light': { $value: get('red/950', '#450A0A'), $type: 'color' },

    warning: { $value: get('amber/500', '#F59E0B'), $type: 'color' },
    'warning-hover': { $value: get('amber/400', '#FBBF24'), $type: 'color' },
    'warning-active': { $value: get('amber/300', '#FCD34D'), $type: 'color' },
    'warning-light': { $value: get('amber/950', '#451A03'), $type: 'color' },

    background: { $value: get('neutral/900', '#0F172A'), $type: 'color' },
    surface: { $value: get('neutral/800', '#1E293B'), $type: 'color' },
    'surface-hover': { $value: get('neutral/700', '#334155'), $type: 'color' },

    'text-primary': { $value: get('neutral/0', '#FFFFFF'), $type: 'color' },
    'text-success': { $value: get('white', '#FFFFFF'), $type: 'color' },
    'text-on-primary': { $value: get('white', '#FFFFFF'), $type: 'color' },
    'text-on-secondary': { $value: get('neutral/0', '#FFFFFF'), $type: 'color' },
    'text-on-danger': { $value: get('white', '#FFFFFF'), $type: 'color' },
    // Same reasoning as light mode: background/warning stays amber-500 in dark
    // too, so white-on-amber-500 still fails — neutral/900 still passes.
    'text-on-warning': { $value: get('neutral/900', '#0F172A'), $type: 'color' },
    'text-disabled': { $value: get('neutral/600', '#475569'), $type: 'color' },

    border: { $value: get('neutral/700', '#334155'), $type: 'color' },
    'border-focus': { $value: get('indigo/500', '#6366F1'), $type: 'color' },

    disabled: { $value: get('neutral/700', '#334155'), $type: 'color' },
    'focus-ring': { $value: focusRingDark },

    'primary-text': { $value: get('indigo/400', '#818CF8'), $type: 'color' },
    'brand-text': { $value: get('coral/400', '#FB923C'), $type: 'color' },
    'success-text': { $value: get('emerald/500', '#10B981'), $type: 'color' },
    'danger-text': { $value: get('red/400', '#F87171'), $type: 'color' },
    'warning-text': { $value: get('amber/400', '#FBBF24'), $type: 'color' },
  },

  spacing: {
    xs: { $value: toPx(spaceLookup, 'space/050', px('spacing/xs', '4px')), $type: 'dimension' },
    sm: { $value: toPx(spaceLookup, 'space/100', px('spacing/sm', '8px')), $type: 'dimension' },
    md: { $value: toPx(spaceLookup, 'space/150', px('spacing/md', '12px')), $type: 'dimension' },
    lg: { $value: toPx(spaceLookup, 'space/200', px('spacing/lg', '16px')), $type: 'dimension' },
    xl: { $value: toPx(spaceLookup, 'space/300', px('spacing/xl', '24px')), $type: 'dimension' },
    xxl: { $value: toPx(spaceLookup, 'space/400', px('spacing/xxl', '32px')), $type: 'dimension' },
  },

  'font-family': {
    base: {
      $value:
        typographyLookup['typography/font-family/sans'] ??
        get(
          'font-family/base',
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        ),
      $type: 'fontFamily',
    },
  },

  'font-size': {
    xs: {
      $value: toRem(typographyLookup, 'typography/font-size/xs', rem('font-size/xs', '0.75rem')),
      $type: 'dimension',
    },
    sm: {
      $value: toRem(typographyLookup, 'typography/font-size/sm', rem('font-size/sm', '0.875rem')),
      $type: 'dimension',
    },
    md: {
      $value: toRem(typographyLookup, 'typography/font-size/md', rem('font-size/md', '1rem')),
      $type: 'dimension',
    },
    lg: {
      $value: toRem(typographyLookup, 'typography/font-size/lg', rem('font-size/lg', '1.125rem')),
      $type: 'dimension',
    },
  },

  'font-weight': {
    normal: {
      $value: toNum(
        typographyLookup,
        'typography/font-weight/normal',
        num('font-weight/normal', 400)
      ),
      $type: 'number',
    },
    medium: {
      $value: toNum(
        typographyLookup,
        'typography/font-weight/medium',
        num('font-weight/medium', 500)
      ),
      $type: 'number',
    },
    semibold: {
      $value: toNum(
        typographyLookup,
        'typography/font-weight/semibold',
        num('font-weight/semibold', 600)
      ),
      $type: 'number',
    },
    bold: {
      $value: toNum(typographyLookup, 'typography/font-weight/bold', num('font-weight/bold', 700)),
      $type: 'number',
    },
  },

  'line-height': {
    tight: {
      $value: toNum(
        typographyLookup,
        'typography/line-height/tight',
        num('line-height/tight', 1.25)
      ),
      $type: 'number',
    },
    normal: {
      $value: toNum(
        typographyLookup,
        'typography/line-height/normal',
        num('line-height/normal', 1.5)
      ),
      $type: 'number',
    },
    relaxed: {
      $value: toNum(
        typographyLookup,
        'typography/line-height/relaxed',
        num('line-height/relaxed', 1.75)
      ),
      $type: 'number',
    },
  },

  'border-radius': {
    sm: {
      $value: toPx(shapeLookup, 'radius/sm', px('border-radius/sm', '4px')),
      $type: 'borderRadius',
    },
    md: {
      $value: toPx(shapeLookup, 'radius/md', px('border-radius/md', '6px')),
      $type: 'borderRadius',
    },
    lg: {
      $value: toPx(shapeLookup, 'radius/lg', px('border-radius/lg', '8px')),
      $type: 'borderRadius',
    },
    full: {
      $value: toPx(shapeLookup, 'radius/full', px('border-radius/full', '9999px')),
      $type: 'borderRadius',
    },
  },

  transition: {
    fast: { $value: get('transition/fast', '120ms ease'), $type: 'duration' },
    normal: { $value: get('transition/normal', '200ms ease'), $type: 'duration' },
  },

  chip: {
    bg: {
      default: { $value: compGet('chip/background/neutral', '#F1F5F9'), $type: 'color' },
      hover: { $value: get('neutral/200', '#E2E8F0'), $type: 'color' },
      primary: { $value: compGet('chip/background/primary', '#EFF6FF'), $type: 'color' },
      'primary-hover': { $value: get('indigo/200', '#C7D2FE'), $type: 'color' },
      success: { $value: compGet('chip/background/success', '#F0FDF4'), $type: 'color' },
      'success-hover': { $value: get('emerald/100', '#D1FAE5'), $type: 'color' },
      danger: { $value: compGet('chip/background/danger', '#FEF2F2'), $type: 'color' },
      'danger-hover': { $value: get('red/100', '#FEE2E2'), $type: 'color' },
      disabled: { $value: compGet('chip/background/disabled', '#F1F5F9'), $type: 'color' },
    },
    text: {
      default: { $value: compGet('chip/text/neutral', '#475569'), $type: 'color' },
      primary: { $value: compGet('chip/text/primary', '#2563EB'), $type: 'color' },
      success: { $value: compGet('chip/text/success', '#00A63E'), $type: 'color' },
      danger: { $value: compGet('chip/text/danger', '#DC2626'), $type: 'color' },
      disabled: { $value: compGet('chip/text/disabled', '#94A3B8'), $type: 'color' },
    },
    border: {
      default: { $value: compGet('chip/border/default', '#E2E8F0'), $type: 'color' },
      primary: { $value: get('indigo/300', '#A5B4FC'), $type: 'color' },
      success: { $value: get('emerald/100', '#D1FAE5'), $type: 'color' },
      danger: { $value: get('red/100', '#FEE2E2'), $type: 'color' },
      focus: { $value: compGet('chip/border/focused', '#2563EB'), $type: 'color' },
      disabled: { $value: compGet('chip/border/disabled', '#E2E8F0'), $type: 'color' },
    },
  },
};

writeFileSync(join(root, 'tokens/primitives.json'), JSON.stringify(primitives, null, 2) + '\n');

const chipTokenCount =
  Object.keys(primitives.chip.bg).length +
  Object.keys(primitives.chip.text).length +
  Object.keys(primitives.chip.border).length;

console.log('✔ tokens/primitives.json written');
console.log(`  ${Object.keys(primitives.color).length} color tokens`);
console.log(`  ${Object.keys(primitives.spacing).length} spacing tokens`);
console.log(`  ${Object.keys(primitives['font-size']).length} font-size tokens`);
console.log(`  ${chipTokenCount} chip tokens`);
console.log('\nRun `pnpm build:tokens` to regenerate CSS and JS outputs.');
