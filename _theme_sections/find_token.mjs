// Find the stored Shopify CLI OAuth token
import { execSync } from 'child_process';
import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

const home = process.env.USERPROFILE || process.env.HOME;
const appdata = process.env.APPDATA;
const localappdata = process.env.LOCALAPPDATA;

// Try to find CLI config/db files
const searchPaths = [
  join(home, '.shopify'),
  join(appdata, 'Shopify CLI'),
  join(localappdata, 'Shopify CLI'),
  join(appdata, 'shoify'),
  join(localappdata, 'shoify'),
];

for (const p of searchPaths) {
  if (existsSync(p)) {
    console.log('Found dir:', p);
    try {
      const list = readdirSync(p, { recursive: true });
      list.forEach(f => console.log(' ', f));
    } catch(e) {}
  }
}

// Try to read from Windows Credential Manager via PowerShell
try {
  const creds = execSync(
    `powershell -Command "(Get-StoredCredential | Where-Object { $_.UserName -like '*shopify*' }) | ConvertTo-Json"`,
    { encoding: 'utf8', shell: true }
  );
  console.log('Credential Manager:', creds);
} catch(e) {
  console.log('No PowerShell creds found:', e.message.substring(0, 100));
}

// Try npm keytar approach
try {
  const keytar = await import('keytar');
  const pass = await keytar.default.getPassword('Shopify CLI', '3rnv2d-i3.myshopify.com');
  console.log('Keytar result:', pass ? pass.substring(0, 20) + '...' : 'null');
} catch(e) {
  console.log('Keytar not available:', e.message.substring(0, 100));
}

// Check shopify CLI node_modules for db
const shopifyCliPath = join(home, 'AppData', 'Roaming', 'npm', 'node_modules', '@shopify');
if (existsSync(shopifyCliPath)) {
  console.log('Shopify CLI modules found at:', shopifyCliPath);
  try {
    const mods = readdirSync(shopifyCliPath);
    console.log('Modules:', mods);
  } catch(e) {}
}
