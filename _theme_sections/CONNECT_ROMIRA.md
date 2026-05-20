# Connect to Romira Store

## Store Details
- **Live domain:** romira.store
- **Myshopify:** 3rnv2d-i3.myshopify.com
- **Theme ID:** 139682218059 (romira-theme — ACTIVE)

## Token
Stored at: `C:\Users\Darin Game\AppData\Roaming\shopify-cli-store-nodejs\Config\config.json`
(Token is read automatically by upload scripts — do not hardcode)

If token expired, run this to get a new one:
```
shopify store auth --store 3rnv2d-i3.myshopify.com --scopes read_products
```
Approve in browser — done.

---

## Run Queries
```
shopify store execute --store 3rnv2d-i3.myshopify.com --query '...'
```

## Run Mutations (writes)
```
shopify store execute --store 3rnv2d-i3.myshopify.com --query '...' --allow-mutations
```

---

## Upload Theme Files
Use Node.js — this is the ONLY method that works for large files:
```
node upload_rest.mjs
```
Or use PowerShell:
```powershell
$TOKEN = (Get-Content "$env:APPDATA\shopify-cli-store-nodejs\Config\config.json" | ConvertFrom-Json | Select-Object -ExpandProperty "7e9cb568cfd431c538f36d1ad3f2b4f6::3rnv2d-i3").myshopify.com.sessionsByUserId."82204360779".accessToken
$content = [System.IO.File]::ReadAllText("filename.liquid", [System.Text.Encoding]::UTF8)
$body = [System.Text.Encoding]::UTF8.GetBytes((ConvertTo-Json @{ asset = @{ key = "sections/filename.liquid"; value = $content } } -Depth 5 -Compress))
$req = [System.Net.HttpWebRequest]::Create("https://3rnv2d-i3.myshopify.com/admin/api/2024-01/themes/139682218059/assets.json")
$req.Method = 'PUT'; $req.ContentType = 'application/json'
$req.Headers.Add('X-Shopify-Access-Token', $TOKEN)
$req.ContentLength = $body.Length
$s = $req.GetRequestStream(); $s.Write($body, 0, $body.Length); $s.Close()
$r = $req.GetResponse(); Write-Host "HTTP $([int]$r.StatusCode)"; $r.Close()
```

---

## Key Product IDs
| Item | ID |
|---|---|
| Product | gid://shopify/Product/7692877201483 |
| Variant | gid://shopify/ProductVariant/42401035419723 |
| Inventory Item | gid://shopify/InventoryItem/44655951937611 |
| Location | gid://shopify/Location/70758039627 |
