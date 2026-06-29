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
// Handles both nested tokens (blue/600) and flat tokens (white, black)
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

// Helper: get a value from the lookup, falling back to a hardcoded default
const get = (name, fallback) => lookup[name] ?? fallback;

// Helper: float pixel value → "Xpx" string (for spacing/radii exported as numbers)
const px = (name, fallback) => {
  const v = lookup[name];
  return v !== undefined ? (typeof v === 'number' ? `${v}px` : v) : fallback;
};

// Helper: float pixel value → rem string (font sizes stored as px in Figma)
const rem = (name, fallback) => {
  const v = lookup[name];
  if (v === undefined) return fallback;
  if (typeof v === 'number') return `${+(v / 16).toFixed(4).replace(/\.?0+$/, '')}rem`;
  return v;
};

// Helper: numeric value (font weights, line heights)
const num = (name, fallback) => {
  const v = lookup[name];
  return v !== undefined ? Number(v) : fallback;
};

// Derive focus-ring from blue/600 at 40% opacity
const blue600 = get('blue/600', '#2563EB');
const r = parseInt(blue600.slice(1, 3), 16);
const g = parseInt(blue600.slice(3, 5), 16);
const b = parseInt(blue600.slice(5, 7), 16);
const focusRing = `rgba(${r}, ${g}, ${b}, 0.4)`;

// Map Token Studio primitives → tokens/primitives.json (DTCG format)
const primitives = {
  color: {
    // Primary (blue scale)
    primary: { $value: get('blue/600', '#2563EB'), $type: 'color' },
    'primary-hover': { $value: get('blue/700', '#1D4ED8'), $type: 'color' },
    'primary-active': { $value: get('blue/800', '#1E40AF'), $type: 'color' },
    'primary-light': { $value: get('blue/100', '#EFF6FF'), $type: 'color' },

    // Brand (amber scale)
    brand: { $value: get('amber/500', '#FE9A00'), $type: 'color' },
    'brand-hover': { $value: get('amber/600', '#E17100'), $type: 'color' },
    'brand-active': { $value: get('amber/600', '#E17100'), $type: 'color' },
    'brand-light': { $value: get('amber/100', '#FFFBEB'), $type: 'color' },

    // Success (green scale)
    success: { $value: get('green/600', '#00A63E'), $type: 'color' },
    'success-hover': { $value: get('green/700', '#008236'), $type: 'color' },
    'success-active': { $value: get('green/800', '#016630'), $type: 'color' },
    'success-light': { $value: get('green/50', '#F0FDF4'), $type: 'color' },

    // Danger (red scale)
    danger: { $value: get('red/600', '#DC2626'), $type: 'color' },
    'danger-hover': { $value: get('red/700', '#B91C1C'), $type: 'color' },
    'danger-active': { $value: get('red/800', '#991B1B'), $type: 'color' },
    'danger-light': { $value: get('red/50', '#FEF2F2'), $type: 'color' },

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
    'text-disabled': { $value: get('neutral/400', '#94A3B8'), $type: 'color' },

    // Borders
    border: { $value: get('neutral/200', '#E2E8F0'), $type: 'color' },
    'border-focus': { $value: get('blue/600', '#2563EB'), $type: 'color' },

    // States
    disabled: { $value: get('neutral/100', '#F1F5F9'), $type: 'color' },
    'focus-ring': { $value: focusRing },
  },

  spacing: {
    xs: { $value: px('spacing/xs', '4px'), $type: 'dimension' },
    sm: { $value: px('spacing/sm', '8px'), $type: 'dimension' },
    md: { $value: px('spacing/md', '12px'), $type: 'dimension' },
    lg: { $value: px('spacing/lg', '16px'), $type: 'dimension' },
    xl: { $value: px('spacing/xl', '24px'), $type: 'dimension' },
    xxl: { $value: px('spacing/xxl', '32px'), $type: 'dimension' },
  },

  'font-family': {
    base: {
      $value: get(
        'font-family/base',
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      ),
      $type: 'fontFamily',
    },
  },

  'font-size': {
    xs: { $value: rem('font-size/xs', '0.75rem'), $type: 'dimension' },
    sm: { $value: rem('font-size/sm', '0.875rem'), $type: 'dimension' },
    md: { $value: rem('font-size/md', '1rem'), $type: 'dimension' },
    lg: { $value: rem('font-size/lg', '1.125rem'), $type: 'dimension' },
  },

  'font-weight': {
    normal: { $value: num('font-weight/normal', 400), $type: 'number' },
    medium: { $value: num('font-weight/medium', 500), $type: 'number' },
    semibold: { $value: num('font-weight/semibold', 600), $type: 'number' },
    bold: { $value: num('font-weight/bold', 700), $type: 'number' },
  },

  'line-height': {
    tight: { $value: num('line-height/tight', 1.25), $type: 'number' },
    normal: { $value: num('line-height/normal', 1.5), $type: 'number' },
    relaxed: { $value: num('line-height/relaxed', 1.75), $type: 'number' },
  },

  'border-radius': {
    sm: { $value: px('border-radius/sm', '4px'), $type: 'borderRadius' },
    md: { $value: px('border-radius/md', '6px'), $type: 'borderRadius' },
    lg: { $value: px('border-radius/lg', '8px'), $type: 'borderRadius' },
    full: { $value: px('border-radius/full', '9999px'), $type: 'borderRadius' },
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
      'primary-hover': { $value: get('blue/200', '#DBEAFE'), $type: 'color' },
      success: { $value: compGet('chip/background/success', '#F0FDF4'), $type: 'color' },
      'success-hover': { $value: get('green/100', '#DCFCE7'), $type: 'color' },
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
      primary: { $value: get('blue/300', '#BFDBFE'), $type: 'color' },
      success: { $value: get('green/100', '#DCFCE7'), $type: 'color' },
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
