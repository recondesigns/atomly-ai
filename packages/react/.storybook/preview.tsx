import type { Preview } from '@storybook/react-vite';
import { MoleculeProvider, defaultTheme, darkTheme } from '../src/theme';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'error',
    },
  },
  globalTypes: {
    colorScheme: {
      description: 'Light/dark color scheme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    colorScheme: 'light',
  },
  decorators: [
    (Story, context) => {
      const colorScheme = context.globals.colorScheme === 'dark' ? 'dark' : 'light';
      const background =
        colorScheme === 'dark' ? darkTheme.colors.background : defaultTheme.colors.background;

      return (
        <MoleculeProvider colorScheme={colorScheme}>
          <div style={{ background, minHeight: '100vh', padding: '1rem' }}>
            <Story />
          </div>
        </MoleculeProvider>
      );
    },
  ],
};

export default preview;
