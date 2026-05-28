import json
import os
import urllib.request
import urllib.error

with open("main-product.liquid", "r", encoding="utf-8-sig") as f:
    section_value = f.read()

payload = json.dumps({
    "asset": {
        "key": "sections/main-product.liquid",
        "value": section_value
    }
}).encode("utf-8")

req = urllib.request.Request(
    "https://iu06pd-00.myshopify.com/admin/api/2024-01/themes/187228815653/assets.json",
    data=payload,
    method="PUT",
    headers={
        "X-Shopify-Access-Token": os.environ["SHOPIFY_ACCESS_TOKEN"],
        "Content-Type": "application/json"
    }
)

try:
    with urllib.request.urlopen(req, timeout=120) as resp:
        result = json.loads(resp.read())
        asset = result.get("asset", {})
        print(f"Uploaded: {asset.get('key')}")
        print(f"Updated: {asset.get('updated_at')}")
        print(f"Size: {asset.get('size')}")
except urllib.error.HTTPError as e:
    body = e.read().decode()
    print(f"HTTP Error {e.code}: {body[:500]}")
except Exception as e:
    print(f"Error: {e}")
