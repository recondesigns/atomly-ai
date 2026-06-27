import { optimize } from 'svgo';
import { format, resolveConfig } from 'prettier';
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, '../../../icons');
const outDir = join(__dirname, '../src/atoms/icons');
const prettierConfig = (await resolveConfig(outDir)) ?? {};

await mkdir(outDir, { recursive: true });

const files = (await readdir(iconsDir)).filter((f) => f.endsWith('.svg'));

const componentNames = [];

for (const file of files) {
  const name = basename(file, '.svg');
  const componentName =
    name.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('') + 'Icon';

  const raw = await readFile(join(iconsDir, file), 'utf8');
  const { data: svg } = optimize(raw, {
    plugins: ['preset-default'],
  });

  // Strip the outer <svg> tag to get just the inner content
  const innerSvg = svg
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>/, '')
    .trim();

  // Extract attributes from the <svg> tag
  const viewBoxMatch = svg.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

  const sfc = `<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="${viewBox}"
    fill="currentColor"
    v-bind="$attrs"
  >${innerSvg}</svg>
</template>

<script lang="ts" setup>
defineOptions({ inheritAttrs: false });
</script>
`;

  const formatted = await format(sfc, { ...prettierConfig, parser: 'vue' });
  await writeFile(join(outDir, `${componentName}.vue`), formatted);
  componentNames.push(componentName);
  console.log(`  ✓ ${componentName}.vue`);
}

const index = await format(
  componentNames.map((n) => `export { default as ${n} } from './${n}.vue';`).join('\n'),
  { ...prettierConfig, parser: 'typescript' },
);

await writeFile(join(outDir, 'index.ts'), index);
console.log(`  ✓ index.ts (${componentNames.length} icons)`);
