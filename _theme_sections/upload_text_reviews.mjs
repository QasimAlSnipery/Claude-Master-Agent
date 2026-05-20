import { readFileSync } from 'fs';
import { request } from 'https';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getToken } from './_token.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STORE = '3rnv2d-i3.myshopify.com';
const THEME_ID = '139682218059';
const TOKEN = getToken();

async function upload(key, content) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ asset: { key, value: content } });
    const opts = {
      hostname: STORE,
      path: `/admin/api/2024-01/themes/${THEME_ID}/assets.json`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': TOKEN,
        'Content-Length': Buffer.byteLength(body)
      }
    };
    const req = request(opts, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, body: d }));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

const liquid = readFileSync(join(__dirname, 'romira-text-reviews.liquid'), 'utf8');
console.log(`Uploading sections/romira-text-reviews.liquid (${liquid.length} chars)...`);
const r = await upload('sections/romira-text-reviews.liquid', liquid);
const p = JSON.parse(r.body);
if (r.status === 200 || r.status === 201) {
  console.log('✓ Section uploaded:', p.asset?.key);
} else {
  console.error(`✗ HTTP ${r.status}:`, r.body.substring(0, 500));
}
