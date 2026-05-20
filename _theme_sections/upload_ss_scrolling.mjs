import { readFileSync } from 'fs';
import { request } from 'https';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getToken } from './_token.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const STORE = '3rnv2d-i3.myshopify.com';
const THEME_ID = '139682218059';
const TOKEN = getToken();

async function uploadFile(key, content) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ asset: { key, value: content } });
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
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

const content = readFileSync(join(__dirname, 'ss-scrolling-media.liquid'), 'utf8');
console.log(`Uploading sections/ss-scrolling-media.liquid (${content.length} chars)...`);
const result = await uploadFile('sections/ss-scrolling-media.liquid', content);
const parsed = JSON.parse(result.body);
if (result.status === 200 || result.status === 201) {
  console.log('✓ Success:', parsed.asset?.key, '| updated:', parsed.asset?.updated_at);
} else {
  console.error(`✗ HTTP ${result.status}:`, result.body.substring(0, 500));
}
