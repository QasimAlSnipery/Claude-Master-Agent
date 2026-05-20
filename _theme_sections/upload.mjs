import { readFileSync, writeFileSync } from 'fs';
import { spawnSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STORE = '3rnv2d-i3.myshopify.com';
const THEME_ID = 'gid://shopify/OnlineStoreTheme/139682218059';

const MUTATION = `mutation ThemeFilesUpsert($themeId: ID!, $files: [OnlineStoreThemeFilesUpsertFileInput!]!) {
  themeFilesUpsert(themeId: $themeId, files: $files) {
    upsertedThemeFiles { filename }
    userErrors { field message }
  }
}`;

const mutFile = join(__dirname, '_mut.graphql');
writeFileSync(mutFile, MUTATION, 'utf8');

const files = ['romira-timeline','romira-nerve-stages','romira-comparison','romira-guarantee-banner'];

for (const f of files) {
  const content = readFileSync(join(__dirname, `${f}.liquid`), 'utf8');
  const vars = JSON.stringify({
    themeId: THEME_ID,
    files: [{ filename: `sections/${f}.liquid`, body: { type: 'TEXT', value: content } }]
  });

  console.log(`\nUploading sections/${f}.liquid...`);

  const varFile = join(__dirname, `_v_${f}.json`);
  writeFileSync(varFile, vars, 'utf8');

  const psCmd = `shopify store execute --store ${STORE} --query-file "${mutFile}" --variables (Get-Content -Raw "${varFile}") --allow-mutations`;
  const result = spawnSync('powershell.exe', ['-NonInteractive', '-Command', psCmd], {
    encoding: 'utf8',
    maxBuffer: 50 * 1024 * 1024
  });

  if (result.stdout) console.log(result.stdout);
  if (result.stderr) console.error(result.stderr);
  if (result.error) console.error('Spawn error:', result.error.message);
}

console.log('\nDone.');
