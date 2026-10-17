import { build } from 'esbuild';
import { copyFile, rm } from 'node:fs/promises';

// Flatten partial Angular declarations and resolve the SVG adapter's internal imports.
await build({
  entryPoints: ['dist/compiled/index.js'],
  outfile: 'dist/index.js',
  bundle: true,
  format: 'esm',
  platform: 'neutral',
  target: 'es2022',
  sourcemap: true,
  conditions: ['import'],
  external: ['@angular/*', '@usenavii/core', 'rxjs', 'rxjs/*'],
});
for (const name of ['index.d.ts', 'components.d.ts']) {
  await copyFile(`dist/compiled/${name}`, `dist/${name}`);
}
await rm('dist/compiled', { recursive: true });
