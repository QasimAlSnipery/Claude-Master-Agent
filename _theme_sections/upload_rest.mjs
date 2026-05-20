import { readFileSync } from 'fs';
import { request } from 'https';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getToken } from './_token.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const STORE = '3rnv2d-i3.myshopify.com';
const THEME_ID = '139682218059';
const TOKEN = getToken();

const files = [
  'romira-timeline',
  'romira-nerve-stages',
  'romira-comparison',
  'romira-guarantee-banner',
  'romira-problem-solution'
];

async function uploadFile(filename, content) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      asset: {
        key: `sections/${filename}.liquid`,
        value: content
      }
    });

    const options = {
      hostname: STORE,
      path: `/admin/api/2024-01/themes/${THEME_ID}/assets.json`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': TOKEN,
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, body: data });
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

for (const f of files) {
  const content = readFileSync(join(__dirname, `${f}.liquid`), 'utf8');
  console.log(`\nUploading sections/${f}.liquid (${content.length} chars)...`);

  try {
    const result = await uploadFile(f, content);
    const parsed = JSON.parse(result.body);
    if (result.status === 200 || result.status === 201) {
      console.log(`  ✓ Success: ${parsed.asset?.key}`);
    } else {
      console.error(`  ✗ HTTP ${result.status}:`, result.body.substring(0, 200));
    }
  } catch(e) {
    console.error(`  ✗ Error:`, e.message);
  }
}

console.log('\nDone.');
