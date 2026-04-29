---
name: Romira Theme Work — Sections Transfer & Fixes
description: Records all Shopify theme work done — sections/blocks transfer from Prestige to Romira, block fixes, and how to push updates
type: project
---

## Active Theme
- **Name:** romira-theme
- **Theme ID:** 139682218059
- **Role:** main (live)
- **Store:** 3rnv2d-i3.myshopify.com

## Other Themes on Store
- Horizon (ID: 133523898443) — unpublished
- Atlas Theme (ID: 133525471307) — unpublished
- Section Store Demo (ID: 133543755851) — demo
- shrine-pro-1-3-0-nulled (ID: 134946685003) — unpublished
- shrine-pro-1-3-0-nulled with Installments (ID: 135163510859) — unpublished
- theme-export-prestigetiming-com-prestige-fixed (ID: 139658002507) — unpublished

## Prestige → Romira Sections Transfer (2026-04-27)
27 sections transferred from Prestige theme that were missing from Romira:
- awards-certifications-bar.liquid
- before-after-results.liquid
- blue-highlight-banner.liquid
- bordered-content-section.liquid
- countdown-urgency-timer.liquid
- expert-endorsement.liquid
- fixed-header-navbar.liquid
- guarantee-badge-section.liquid
- hero-banner.liquid
- how-it-works.liquid
- orcai-block-badge.liquid
- orcai-block-blink.liquid
- orcai-block-product-tabs-vertical.liquid
- orcai-block-trust-badge-emoji.liquid
- orcai-comparison-table.liquid
- orcai-faq.liquid
- orcai-feature-list-image.liquid
- press-mentions-bar.liquid
- product-showcase-hero.liquid
- quantity-discount-table.liquid
- social-proof-stats-bar.liquid
- ss-scrolling-media.liquid
- sticky-mobile-cta.liquid
- text-content-section.liquid
- ugc-photo-gallery.liquid
- video-testimonials-grid.liquid
- _blocks.liquid

10 blocks transferred from Prestige blocks/ folder:
- accordion-collapsible-rows.liquid
- announcement-bar-horizontal.liquid
- announcement-bar-with-dividers.liquid
- custom-header-with-media.liquid
- custom-header-with-styling.liquid
- media-text-split-layout.liquid
- product-hero-info-block.liquid
- split-media-accordion-faq.liquid
- trust-banner-with-testimonial.liquid
- trust-conversion-banner.liquid

**Output file:** C:\Users\Darin Game\Downloads\theme_romira_updated_with_prestige_sections.zip
**Final counts:** 132 sections, 13 blocks
**Why:** Not yet uploaded to Shopify — user needs to upload manually via Online Store → Themes → Add theme → Upload zip

## Block Fix: ai_gen_block_a50d687.liquid (2026-04-27)
**File:** C:\Users\Darin Game\Downloads\ai_gen_block_a50d687.liquid
**Problem:** Block didn't fill left/right of screen on desktop but was fine on mobile
**Root cause:** `max-width: 800px` and `margin: 0 auto` were applied to the outer wrapper `.ai-text-block-{{ ai_gen_id }}`, constraining the whole block including background
**Fix:** Moved `max-width` and `margin: 0 auto` to the inner `.ai-text-block-content-{{ ai_gen_id }}` div; set outer wrapper to `width: 100%`
**Result:** Background fills full screen width on desktop; text content stays centered and readable

## How to Push Theme Asset Changes to Shopify
Use curl.exe (available on Windows 11 natively):

```powershell
$filePath = "C:\path\to\file.json"
$jsonContent = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
$payload = [ordered]@{ asset = [ordered]@{ key = "templates/product.pea.json"; value = $jsonContent } }
$body = $payload | ConvertTo-Json -Depth 10 -Compress
$bodyFile = "$env:TEMP\payload.json"
[System.IO.File]::WriteAllText($bodyFile, $body, [System.Text.Encoding]::UTF8)

$result = curl.exe -s -X PUT "https://3rnv2d-i3.myshopify.com/admin/api/2024-01/themes/139682218059/assets.json" -H "X-Shopify-Access-Token: [ROMIRA_TOKEN]" -H "Content-Type: application/json" --data-binary "@$bodyFile"
```

**Why curl.exe:** Invoke-RestMethod and Invoke-WebRequest both fail in NonInteractive PowerShell mode for this API. curl.exe works reliably.
**Why:** Only use this pattern, not Invoke-RestMethod or Invoke-WebRequest.
