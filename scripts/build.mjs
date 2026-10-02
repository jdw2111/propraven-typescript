#!/usr/bin/env node
// Dual build: ESM (dist/esm) + CommonJS (dist/cjs), each with .d.ts files.
// Each output directory gets a package.json "type" marker so Node and TypeScript
// interpret the .js/.d.ts files in it with the right module format.
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const tsc = require.resolve('typescript/bin/tsc');

function run(args) {
  execFileSync(process.execPath, [tsc, ...args], { cwd: root, stdio: 'inherit' });
}

rmSync(join(root, 'dist'), { recursive: true, force: true });

run(['-p', 'tsconfig.build.json', '--outDir', 'dist/esm']);
run(['-p', 'tsconfig.build.json', '--outDir', 'dist/cjs', '--module', 'CommonJS', '--moduleResolution', 'Node10']);

for (const [dir, type] of [
  ['dist/esm', 'module'],
  ['dist/cjs', 'commonjs'],
]) {
  mkdirSync(join(root, dir), { recursive: true });
  writeFileSync(join(root, dir, 'package.json'), JSON.stringify({ type }, null, 2) + '\n');
}

console.log('built dist/esm and dist/cjs');
