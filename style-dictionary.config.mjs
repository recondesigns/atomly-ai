import StyleDictionary from 'style-dictionary';

const sd = new StyleDictionary({
  source: ['tokens/primitives.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'molecule',
      buildPath: 'packages/vue/src/tokens/',
      files: [
        {
          destination: 'primitives.css',
          format: 'css/variables',
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'packages/react/src/theme/',
      files: [
        {
          destination: 'tokens.generated.js',
          format: 'javascript/es6',
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();
