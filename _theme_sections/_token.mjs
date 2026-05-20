import { readFileSync } from 'fs';
import { join } from 'path';

export function getToken(storeFragment = '3rnv2d') {
  const configPath = join(process.env.APPDATA, 'shopify-cli-store-nodejs', 'Config', 'config.json');
  const config = JSON.parse(readFileSync(configPath, 'utf8'));
  const key = Object.keys(config).find(k => k.includes(storeFragment));
  if (!key) throw new Error(`No config entry found for store fragment: ${storeFragment}`);
  const sessions = config[key].myshopify.com.sessionsByUserId;
  const userId = Object.keys(sessions)[0];
  return sessions[userId].accessToken;
}
