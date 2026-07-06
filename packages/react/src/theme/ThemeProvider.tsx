import { ThemeProvider as EmotionThemProvider } from '@emotion/react';
import type { MoleculeUITheme } from './theme.types';
import { defaultTheme } from './defaultTheme';
import { darkTheme } from './darkTheme';

/**
 * Props for the MoleculeProvider.
 *
 * Consumers wrap their app (or a subtree) in this provider.
 * If no theme is passed, the default light theme is used.
 */
export type MoleculeProviderProps = {
  theme?: Partial<MoleculeUITheme>;
  /** Base theme to apply `theme` overrides on top of. Defaults to `'light'`. */
  colorScheme?: 'light' | 'dark';
  children: React.ReactNode;
};

/**
 * Deep merge utility — merges a partial override into the base theme.
 *
 * This lets consumers override just the parts they want:
 *   <MoleculeProvider theme={{ colors: { primary: 'red' } }}>
 *
 * Everything else falls back to defaultTheme.
 */
// TODO: This could proably go into a utils folder
function deepMerge<T extends Record<string, unknown>>(base: T, override: Partial<T>) {
  const result = { ...base };

  for (const key of Object.keys(override) as Array<keyof T>) {
    const baseValue = base[key];
    const overrideValue = override[key];

    if (
      baseValue &&
      overrideValue &&
      typeof baseValue === 'object' &&
      typeof overrideValue === 'object' &&
      !Array.isArray(baseValue)
    ) {
      result[key] = deepMerge(
        baseValue as Record<string, unknown>,
        overrideValue as Record<string, unknown>
      ) as T[keyof T];
    } else if (overrideValue !== undefined) {
      result[key] = overrideValue as T[keyof T];
    }
  }

  return result;
}

/**
 * MoleculeProvider — wraps your app to provide the design system theme.
 *
 * @example
 * ```tsx
 * // Use default theme
 * <MoleculeProvider>
 *   <App />
 * </MoleculeProvider>
 *
 * // Customize colors
 * <MoleculeProvider theme={{ colors: { primary: '#8B5CF6' } }}>
 *   <App />
 * </MoleculeProvider>
 *
 * // Dark mode
 * <MoleculeProvider colorScheme="dark">
 *   <App />
 * </MoleculeProvider>
 * ```
 */
export function MoleculeProvider({
  theme: themeOverrides,
  colorScheme = 'light',
  children,
}: MoleculeProviderProps) {
  const baseTheme = colorScheme === 'dark' ? darkTheme : defaultTheme;
  const mergedTheme = themeOverrides ? deepMerge(baseTheme, themeOverrides) : baseTheme;

  return (
    <EmotionThemProvider theme={mergedTheme}>
      {/*
        Establishes the default text color (and therefore `currentColor`) for this
        subtree. Without this, anything that doesn't set its own `color` explicitly —
        bare icons, plain text — falls back to the browser's initial black regardless
        of `colorScheme`, which is invisible against a dark theme's background.
        `display: contents` keeps this element out of the box/layout tree entirely.
      */}
      <span style={{ display: 'contents', color: mergedTheme.colors.textPrimary }}>{children}</span>
    </EmotionThemProvider>
  );
}
