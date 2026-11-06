import { readdirSync, readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, relative, dirname } from 'node:path';

// GitHub Pages is configured to serve main:/ in this repository.
// Keep the editable Astro source and mirror only its built output into that root.
const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const manifest = join(root, '.pages-artifacts.json');
const checking = process.argv.includes('--check');
function list(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? list(path) : [relative(dist, path).replaceAll('\\', '/')];
  });
}
const files = list(dist).sort();
if (!files.includes('index.html')) throw new Error('Build the static site before preparing Pages.');
const old = existsSync(manifest) ? JSON.parse(readFileSync(manifest, 'utf8')).files : [];
if (checking) {
  for (const name of files) {
    if (!existsSync(join(root, name)) || !readFileSync(join(dist, name)).equals(readFileSync(join(root, name)))) {
      throw new Error(`Published output differs from dist: ${name}`);
    }
  }
  if (!existsSync(join(root, '.nojekyll'))) throw new Error('Missing .nojekyll marker.');
  if (JSON.stringify(files) !== JSON.stringify(old)) throw new Error('Generated file manifest differs from dist.');
  console.log(`PASS: ${files.length} published files match dist; .nojekyll is present.`);
} else {
  for (const name of old) if (!files.includes(name)) rmSync(join(root, name), { force: true });
  for (const name of files) {
    mkdirSync(dirname(join(root, name)), { recursive: true });
    copyFileSync(join(dist, name), join(root, name));
  }
  writeFileSync(join(root, '.nojekyll'), '');
  writeFileSync(manifest, JSON.stringify({ files }, null, 2) + '\n');
  console.log(`Prepared ${files.length} static files in the repository root for main:/ publishing.`);
}
