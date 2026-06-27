import { transform } from '@svgr/core';
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, '../../../icons');
const outDir = join(__dirname, '../src/atoms/icons');

await mkdir(outDir, { recursive: true });

const files = (await readdir(iconsDir)).filter((f) => f.endsWith('.svg'));

const componentNames = [];

for (const file of files) {
  const name = basename(file, '.svg');
  const componentName = `${name.charAt(0).toUpperCase()}${name.slice(1).replace(/-([a-z])/g, (_, c) => c.toUpperCase())}Icon`;
  const svg = await readFile(join(iconsDir, file), 'utf8');

  const code = await transform(
    svg,
    {
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
      typescript: true,
      titleProp: true,
      svgProps: { 'aria-hidden': '{!title}' },
      svgoConfig: {
        plugins: [{ name: 'preset-default', params: { overrides: { removeViewBox: false } } }],
      },
    },
    { componentName },
  );

  await writeFile(join(outDir, `${componentName}.tsx`), code);
  componentNames.push(componentName);
  console.log(`  ✓ ${componentName}.tsx`);
}

const index = componentNames
  .map((n) => `export { default as ${n} } from './${n}';`)
  .join('\n') + '\n';

await writeFile(join(outDir, 'index.ts'), index);
console.log(`  ✓ index.ts (${componentNames.length} icons)`);
