import { ThemeProvider as EmotionThemProvider } from '@emotion/react';
import type { MoleculeUITheme } from './theme.types';
import { defaultTheme } from './defaultTheme';

/**
 * Props for the MoleculeProvider.
 *
 * Consumers wrap their app (or a subtree) in this provider.
 * If no theme is passed, the default light theme is used.
 */
export type MoleculeProviderProps = {
  theme?: Partial<MoleculeUITheme>;
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
 * ```
 */
export function MoleculeProvider({ theme: themeOverrides, children }: MoleculeProviderProps) {
  const mergedTheme = themeOverrides ? deepMerge(defaultTheme, themeOverrides) : defaultTheme;

  return <EmotionThemProvider theme={mergedTheme}>{children}</EmotionThemProvider>;
}
