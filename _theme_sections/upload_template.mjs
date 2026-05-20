import { readFileSync } from 'fs';
import { request } from 'https';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getToken } from './_token.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STORE = '3rnv2d-i3.myshopify.com';
const THEME_ID = '139682218059';
const TOKEN = getToken();

const content = readFileSync(join(__dirname, 'product.lipoic.json'), 'utf8');

const body = JSON.stringify({
  asset: {
    key: 'templates/product.lipoic.json',
    value: content
  }
});

const req = request({
  hostname: STORE,
  path: `/admin/api/2024-01/themes/${THEME_ID}/assets.json`,
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': TOKEN,
    'Content-Length': Buffer.byteLength(body)
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    if (res.statusCode === 200 || res.statusCode === 201) {
      console.log('SUCCESS — template uploaded');
    } else {
      console.error('FAILED:', data.substring(0, 500));
    }
  });
});

req.on('error', e => console.error('Error:', e.message));
req.write(body);
req.end();
