# Session Notes — Romira Store Build
## Last updated: 2026-05-20

---

## Shopify Connection (READ THIS FIRST EVERY SESSION)

**Store:** 3rnv2d-i3.myshopify.com | **Live domain:** romira.store
**Active theme:** romira-theme | **Theme ID:** `139682218059`

**Current token:** *(read from CLI config — see CONNECT_ROMIRA.md)*
Stored at: `C:\Users\Darin Game\AppData\Roaming\shopify-cli-store-nodejs\Config\config.json`
If expired → re-run: `shopify store auth --store 3rnv2d-i3.myshopify.com --scopes read_products`

**HOW TO UPLOAD FILES — only reliable method:**
```javascript
// Node.js ESM — run as: node --input-type=module << 'EOF' ... EOF
import { getToken } from './_token.mjs';  // reads token from CLI config automatically
import { readFileSync } from 'fs';
import { request } from 'https';
const TOKEN = getToken();
const content = readFileSync('file.liquid', 'utf8');
const body = JSON.stringify({ asset: { key: 'sections/file.liquid', value: content } });
// PUT to https://3rnv2d-i3.myshopify.com/admin/api/2024-01/themes/139682218059/assets.json
```
Upload script: `_theme_sections\upload_rest.mjs`

**HOW TO QUERY THE STORE:**
```
shopify store execute --store 3rnv2d-i3.myshopify.com --query '...'
shopify store execute ... --allow-mutations  (for writes)
```

**Key IDs:**
- Product ID: `gid://shopify/Product/7692877201483`
- Variant ID: `gid://shopify/ProductVariant/42401035419723`
- Inventory Item: `gid://shopify/InventoryItem/44655951937611`
- Location: `gid://shopify/Location/70758039627`
- Price: $39.99 | Inventory: 500 units

---

## Git Rule (CRITICAL)
Every change gets committed and pushed immediately — no exceptions.
Repo: https://github.com/QasimAlSnipery/Claude-Master-Agent

When user returns: read git log + this file → brief them on what was done + what to do next.

---

## All Local Files (`_theme_sections/`)

| File | Status | Description |
|---|---|---|
| `romira-timeline.liquid` | ✅ LIVE | Week-by-week timeline + guarantee bar. Has stagger scroll animations. |
| `romira-nerve-stages.liquid` | ✅ LIVE | 3-stage nerve breakdown. Has scroll animations (header + staggered stages). |
| `romira-comparison.liquid` | ✅ LIVE | Alevia 3-col comparison table. Has scroll animation. |
| `romira-guarantee-banner.liquid` | ✅ LIVE | Standalone guarantee banner with SVG shield. Has scroll animation. |
| `romira-problem-solution.liquid` | ✅ LIVE | Dark bg: problem (image+bullets) + solution card. Has scroll animations. |
| `romira-reviews.liquid` | ✅ LIVE | Reviews carousel. No animation (sits above fold). |
| `romira-text-reviews.liquid` | ✅ LIVE | Text review cards grid. Has scroll animations (header + staggered cards). |
| `ss-scrolling-media.liquid` | ✅ LIVE | "Why Everything Else Failed?" section. Has scroll animation. |
| `ss-video-with-text-3.liquid` | ✅ LIVE | Video + text section. Has scroll animation (media + content staggered). |
| `collapsible-content.liquid` | ✅ LIVE | FAQ section. Uses Dawn animate-item (already animated). |
| `results.liquid` | ✅ LOCAL | 71%/88%/92% stats section. Uses Dawn animate-section (already animated). |
| `main-product.liquid` | ✅ LIVE | Main product section — has trust_bar + guarantee_box block types added. |
| `buy-buttons.liquid` | ✅ LIVE | ATC button with custom label, sub-text, Material icon support. |
| `product.lipoic.json` | ✅ LIVE | Full product template — all sections wired in. |
| `_token.mjs` | ✅ READY | Reads Shopify token from CLI config automatically. |
| `upload_rest.mjs` | ✅ READY | Batch uploader for custom sections. |

---

## Full Section Order (product.lipoic.json — top to bottom)

1. `main` — main-product (title, stars, benefits checklist, variant picker, buy buttons, guarantee, trust bar, avatars, reviews, shipping, tabs)
2. `romira_reviews` — custom reviews carousel ← **ABOVE THIS = no animations needed**
3. `faq_section_pea` — FAQ collapsible-content (Dawn animate-item) ✅
4. `romira_problem_solution` — "The Real Reason" dark section ✅
5. `romira_timeline` — week-by-week timeline ✅
6. `romira_nerve_stages` — 3-stage nerve breakdown ✅
7. `ss_video_with_text_3_wwtDfY` — "Why Everything Else Failed?" ✅
8. `romira_comparison` — Romira vs. Others table ✅
9. `results_7448bX` — 71%, 88%, 92% stats (Dawn animate-section) ✅
10. `ss_scrolling_media_yXenpQ` — scrolling media section ✅
11. `romira_text_reviews` — text review cards grid ✅
12. `romira_guarantee_large` — full-width dark blue guarantee banner ✅
13. `apps_section` — apps

*(ss_testimonial_12_aKxHaF is DISABLED)*

---

## New Block Types Added to main-product (2026-05-20)

### trust_bar block
Horizontal trust icons + payment icons row.
- Up to 3 items: icon (Material Symbols name) + text
- Separator character between items
- Payment icons row: show/hide + **filter by name** (comma-separated, e.g. `visa,master,paypal,apple_pay,shop_pay`)
- Full color, padding, font size, margin controls
- Icon names from: fonts.google.com/icons

### guarantee_box block
Bordered box with filled icon + bold headline + body text.
- Icon (filled Material Symbol), headline, body text
- Border color, border width, border radius, background color
- Padding top/bottom/left-right independently
- Full color and font size controls per element

---

## APPROVED COPY — Ready to place on page

**"Why Everything Else Failed" section (NOT YET BUILT AS CUSTOM SECTION):**
> **THE ONLY SUPPLEMENT THAT GETS INSIDE THE NERVE CELL**
>
> B12 supports nerves. Magnesium relaxes muscles. Turmeric fights inflammation. CBD calms your system.
>
> Real supplements. Just not for this.
>
> R-Alpha Lipoic Acid is the only compound that actually enters the nerve cell, repairs the damage, and restores what broke down in the first place.
>
> That is why nothing worked. They never got inside.

---

## TOMORROW'S GAME PLAN

### What YOU need to do (theme editor / Shopify admin — no code needed)

1. **Fix the price** — Go to Shopify Admin → Products → Romira R-ALA → Edit the variant. Set:
   - Compare at price: $49.99
   - Price: $39.99
   This flips it so the sale price shows correctly (crossed out $49.99, sale $39.99).

2. **Add missing images in theme editor** — Open the R-ALA product page in Customize:
   - Problem/Solution section → Part 1: add a burning feet/hands image
   - Problem/Solution section → Part 2: add the Romira bottle image
   - Nerve Stages section → add Stage 1, Stage 2, Stage 3 images
   - Comparison table → add Romira bottle image + generic "others" bottle image

3. **Add the trust_bar and guarantee_box blocks** — In Customize, click the main product section → Add block → place them below the Buy Buttons block. Set the guarantee_box to your 60-day guarantee copy.

4. **Configure the trust_bar payment icons** — In the trust_bar block settings, type the ones you want in "Icons to show": e.g. `visa,master,paypal,apple_pay,shop_pay`

### What CLAUDE builds next session (just say "start" and I'll begin)

1. **"Why Everything Else Failed" section** — custom section with the approved copy. Dark bg, big headline, punchy body. Ready to upload.
2. **Fix section order** — move nerve stages up, above the FAQ.
3. **"Why Everything Else Failed" copy** — place the approved copy into the ss-video-with-text-3 section OR build a dedicated simpler section.

---

## TO-DO LIST (priority order)

### 🔴 CRITICAL — Images needed (user adds in theme editor)
- [ ] **Problem/Solution section** — burning feet/hands image (Part 1 left side)
- [ ] **Problem/Solution section** — Romira product bottle image (Part 2 right side)
- [ ] **Nerve stages** — 3 stage images (Stage 1, 2, 3)
- [ ] **Comparison table** — Romira product image (column header)
- [ ] **Comparison table** — generic "other supplements" bottle image

### 🟠 HIGH — Build next session
- [ ] **Fix the price display** — shows "$39.99 Sale price $49.99" (backwards). Fix in Shopify product settings: regular = $49.99, sale = $39.99.
- [ ] **"Why Everything Else Failed" custom section** — approved copy above. Dark background, big headline, body copy. Simple but punchy. Place between problem/solution and FAQ.
- [ ] **Fix section order** — nerve stages should be earlier (after problem/solution, before FAQ)
- [ ] **Spring Sale announcement bar** — update copy, tie it to R-ALA offer

### 🟡 MEDIUM — Polish
- [ ] **Reviews app** — install Judge.me (free) or Loox for real verified reviews
- [ ] **Subscription toggle** — install Loop app for "Save 25% with subscription" option
- [ ] **Stats section** — add disclaimer/source line under 71%, 88%, 92% stats
- [ ] **FAQ** — check heading size on mobile, may need to increase
- [ ] **Sticky ATC bar** — review stars label says "(xxxx Reviews)" — update with real count

### 🟢 NICE TO HAVE
- [ ] **Real customer photos** — replace AI profile photos if real ones available
- [ ] **Video testimonial** — massive trust builder if available
- [ ] **"As seen on" press logos** — if any media coverage exists

---

## Issues on Live Site
1. Pricing shows "$39.99 Sale price $49.99" — sale price is HIGHER than regular. Fix in Shopify product settings.
2. Some "Add image in theme editor" placeholders still visible (nerve stages, problem/solution)
3. Comparison table needs product images to look complete

---

## R-ALA Science Content (reference)
1. Antioxidant: scavenges ROS, recycles Vit C/E/Glutathione (DHLA), chelates metals
2. Blood flow: nitric oxide → vasodilation → oxygen to peripheral nerves
3. Anti-inflammatory: NF-κB inhibition, suppresses TNF-α, IL-6, IL-1β
4. Nerve repair: upregulates NGF + BDNF, protects myelin sheath
5. Glucose: improves insulin sensitivity, prevents AGE-induced nerve damage
All 4 mechanisms are in the "Why Does This Work?" collapsible tab on the product page.
