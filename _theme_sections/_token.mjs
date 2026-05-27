// Token loaded from .shopify_token (gitignored) — never hardcode here
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tokenFile = join(__dirname, '.shopify_token');

export function getToken() {
  if (!existsSync(tokenFile)) {
    throw new Error('Missing _theme_sections/.shopify_token — create it with your Shopify Admin API token');
  }
  return readFileSync(tokenFile, 'utf8').trim();
}
