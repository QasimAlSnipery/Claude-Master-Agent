# Session Notes — Romira Store Build
## Last updated: 2026-05-22 (session 2 — extended)

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
| `countdown-urgency-timer.liquid` | ✅ LIVE | Urgency countdown bar. Full desktop+mobile layout control, DAYS unit, midnight reset. |
| `rmr-split-content.liquid` | ✅ LIVE | Custom split content section. Image left/right/above/below per breakpoint, full mobile+desktop separate controls. |
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
| `results.liquid` | ✅ LIVE | 71%/88%/92% stats section. Uses Dawn animate-section (already animated). |
| `main-product.liquid` | ✅ LIVE | Main product section — has trust_bar + guarantee_box block types added. |
| `buy-buttons.liquid` | ✅ LIVE | ATC button with custom label, sub-text, Material icon support. |
| `product.lipoic.json` | ✅ LIVE | Full product template — all sections wired in. |
| `_token.mjs` | ✅ READY | Reads Shopify token from CLI config automatically. |
| `upload_rest.mjs` | ✅ READY | Batch uploader for custom sections. |

---

## Full Section Order (product.lipoic.json — top to bottom)

1. `main` — main-product with these blocks (in order):
   - `title` — product title
   - `rating_stars` — 4.9 stars, 2,300+ customers
   - `benefits_checklist` — 4 nerve health benefits
   - `variant_picker` — variant selector
   - `bundle_picker_FXYfbm` — **Bundle Picker** (Buy 1/2/3 with free bottles, subscription)
   - `buy_buttons` — ATC button with selling plan 1864597579 hardcoded for lipoic-acid
   - `sub_bar_main` — **Subscription Info Bar** ← "Refills Ship Every Month | Stop or Cancel Anytime"
   - `payment_badges_JzACb7` — payment icons
   - `trust_bar_zTG3BC` — trust bar
   - `guarantee_box_UwrBGT` — 60-day guarantee box
   - `review_avatars` — avatar row
   - `reviews` — reviews
   - `shipping_checkpoints` — shipping info
   - `sticky_atc` — sticky ATC bar
   - `tab_why_it_works`, `tab_safety`, `tab_ingredients`, `tab_guarantee` — collapsible tabs
   - `collapsible_tab_mtE9t9` — extra tab
2. `countdown_urgency` — **countdown-urgency-timer** ← Romira navy #264165 bg, white numbers, midnight reset, desktop inline/mobile timer-right ✅ ADDED 2026-05-22
3. `romira_reviews` — custom reviews carousel ← **ABOVE THIS = no animations needed**
4. `faq_section_pea` — FAQ collapsible-content (Dawn animate-item) ✅
5. `romira_problem_solution` — "The Real Reason" dark section ✅
6. `romira_timeline` — week-by-week timeline ✅
7. `romira_nerve_stages` — 3-stage nerve breakdown ✅
8. `ss_video_with_text_3_wwtDfY` — "Why Everything Else Failed?" ✅
9. `romira_comparison` — Romira vs. Others table ✅
10. `results_7448bX` — 71%, 88%, 92% stats (Dawn animate-section) ✅
11. `ss_scrolling_media_yXenpQ` — scrolling media section ✅
12. `romira_text_reviews` — text review cards grid ✅
13. `romira_guarantee_large` — full-width dark blue guarantee banner ✅
14. `apps_section` — apps

*(ss_testimonial_12_aKxHaF is DISABLED)*

---

## Countdown Urgency Timer — Full Feature List (2026-05-22)

**File:** `sections/countdown-urgency-timer.liquid`
**Placed on:** product.lipoic.json as `countdown_urgency` (position 2, after main)
**Current style:** Romira navy `#264165` bg · white numbers · `#1a2e47` boxes · `#a8bdd4` labels · white pill button

### What every setting controls
- **Timer units:** Show/hide DAYS, HRS, SECS independently. Custom label text for each.
- **Reset mode:** Loop 24h (rolling) | Midnight (customer's local midnight, resets daily) | Show message | Hide
- **Layout — 5 positions, independent per breakpoint:**
  - `Inline` — all in one row
  - `Text left · Timer right` — side by side, text column left
  - `Timer left · Text right` — side by side, timer column left
  - `Text above · Timer below` — stacked
  - `Timer above · Text below` — stacked reversed
- **Text alignment** — Left / Center / Right, per breakpoint
- **Colors (shared):** bg, headline, highlight, sub-message, box bg, box border, numbers, colon, labels, button bg, button text
- **Font sizes:** Headline, Sub-message, Numbers, Labels, Button — all independent per breakpoint
- **Number box:** min-width, padding T/B, padding L/R, border radius, border width, colon opacity — per breakpoint
- **Button:** padding T/B, L/R, border radius — per breakpoint
- **Spacing:** padding top/bottom/L-R, margins, max-width, unit gap, label gap, element gaps — per breakpoint

### Current live settings
- Desktop: inline centered, 40px numbers, 56px box width, Romira navy palette
- Mobile: timer-right (text left, clock right), 26px numbers, 36px box width

---

## Session 2 Work — 2026-05-22 (Extended)

### Countdown Urgency Timer — rebuilt
- Full desktop/mobile split controls added
- 5 layout positions per breakpoint (inline, timer-right, timer-left, above, below)
- DAYS unit added
- Midnight reset mode (resets to customer's local midnight)
- Page visibility controls (show/hide per page type)
- All font sizes, paddings, colors, margins — fully independent per breakpoint

### Home Page — Complete Rebuild
11-section professional homepage now live. Sections in order:
1. Hero Banner Pro (bg image, stars, feature pills, Romira navy)
2. Scrolling Review Ticker (5 verified customer reviews)
3. Stats Bar (2,300+ customers / 4.9 stars / 60-day / free shipping)
4. Brand Story (split content — "Built on Science. Delivered with Integrity.")
5. How It Works (3-step horizontal with connectors)
6. Certifications Bar (GMP / 3rd-Party Tested / Non-GMO etc — navy bg pills)
7. Expert Endorsements (Dr. Michael Chen + Dr. Sarah Hoffman)
8. Customer Reviews Carousel (existing Trustpilot blocks preserved)
9. Before & After Results (91% Less Discomfort / 88% Better Sleep)
10. Quantity Discount Table (1/2/3 bottle tiers, BEST VALUE on 3-bottle)
11. Featured Collection (Best Sellers — LAST)

### Split Content Section — new custom section
File: `rmr-split-content.liquid`
- Image position: left / right / above / below — SEPARATE for desktop and mobile
- Full separate desktop + mobile controls for all font sizes, padding, button, image radius, gaps
- Heading with highlight word, eyebrow, subheading, richtext body, CTA
- Separate desktop/mobile image pickers

### Bundle Picker Block — added to main-product
Type: `bundle_picker` in main-product.liquid
- 3 cards: Buy 1 / Buy 2 Get 1 FREE / Buy 3 Get 2 FREE
- Full controls: header badge (Most Popular/Best Results), label text, free_qty, save badge, prices, images
- Cart integration: fetch interceptor adds selling_plan=1864597579 and reads correct quantity from selected card
- data-cart-qty: opt1=1, opt2=3, opt3=5 (from opt_cart_qty settings)
- Automatic discounts created in Shopify: "Buy 2 Get 1 Free" + "Buy 3 Get 2 Free" (apply at checkout)
- Equal height cards (align-items:stretch on grid)
- Full text style controls: alignment, bold, italic per element
- Label block padding — desktop + mobile independently
- Image width + height — desktop + mobile in px
- Always horizontal (3 cols) on mobile, never stacks

### Subscription Info Bar Block — added to main-product
Type: `subscription_bar` in main-product.liquid
Placed: directly after buy_buttons in product.lipoic.json
- 2 items (optional 3rd): icon (Material Symbol) + text each
- Default: "⟳ Refills Ship Every Month | ⏱ Stop or Cancel Anytime"
- Separator: character, color, size
- Full separate desktop + mobile controls: font size, icon size, icon gap, item gap, padding, margins, alignment
- Always same line (flex-wrap: nowrap) on both breakpoints

### Shopify Subscriptions — Bug Fixes
- Selling plan ID: `1864597579` (Deliver every month, 25% off)
- Variant ID: `42401035419723`
- buy-buttons.liquid: hardcoded selling_plan hidden input for lipoic-acid handle
- main-product.liquid: fetch interceptor adds selling_plan AND quantity to every /cart/add request
- Subscription widget hidden from customers via CSS + JS (visible in theme editor via Shopify.designMode check)
- KaChing subscriptions app NOT touched

### Subscription Widget Hidden
CSS in base.css + JS in main-product.liquid:
- `.subscriptions_app_embed_block` and related classes → `display:none`
- JS walks DOM to hide "Auto-renews" text
- `Shopify.designMode` check: widget stays visible in Shopify theme editor
- KaChing untouched

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

## KEY IDs TO REMEMBER

| Thing | ID/Value |
|---|---|
| Variant ID (R-ALA) | `42401035419723` |
| Selling Plan ID | `1864597579` |
| Selling Plan Group | `gid://shopify/SellingPlanGroup/1039106123` |
| Product GID | `gid://shopify/Product/7692877201483` |
| Product handle | `lipoic-acid` |
| Discount B2G1 | `gid://shopify/DiscountAutomaticNode/1479111311435` |
| Discount B3G2 | `gid://shopify/DiscountAutomaticNode/1479111344203` |

---

## NEXT SESSION GAME PLAN

### What YOU still need to do

1. **Fix the price display** — Shopify Admin → Products → R-ALA → Edit variant:
   - Compare at price: $49.99 | Sale price: $39.99
   
2. **Add images in Customize:**
   - Bundle Picker — upload 1-bottle, 2-bottle stacked, 5-bottle stacked images per option
   - Problem/Solution → Part 1: burning feet/hands image; Part 2: Romira bottle
   - Nerve Stages → Stage 1, 2, 3 images
   - Comparison table → Romira bottle + "others" bottle

3. **Manual Buy X Get Y discounts** — User will set up manually (automatic discounts created in Shopify but may need Shopify Plus to stack with subscription plan). When setting up, go to Shopify Admin → Discounts → Create automatic discount → Buy X Get Y.

4. **Bundle picker cart quantity** — test that option 2 adds 3 and option 3 adds 5. The fetch interceptor sets quantity from `data-cart-qty` attribute. If still wrong, confirm `opt2_cart_qty=3` and `opt3_cart_qty=5` in Customize settings.

### What CLAUDE builds next session

1. **"Why Everything Else Failed" section** — approved copy ready.
2. **Fix section order on product page** — nerve stages should move earlier (before FAQ).
3. **Home page press logos section** — user needs to provide logo images.
4. **Announcement bar** — update to tie into R-ALA subscription offer.

---

## TO-DO LIST (priority order)

### 🔴 CRITICAL — Images needed (user adds in theme editor)
- [ ] **Problem/Solution section** — burning feet/hands image (Part 1 left side)
- [ ] **Problem/Solution section** — Romira product bottle image (Part 2 right side)
- [ ] **Nerve stages** — 3 stage images (Stage 1, 2, 3)
- [ ] **Comparison table** — Romira product image (column header)
- [ ] **Comparison table** — generic "other supplements" bottle image

### 🟠 HIGH — Build next session
- [ ] **Fix the price display** — shows "$39.99 Sale price $49.99" (backwards). Fix in Shopify product settings.
- [ ] **"Why Everything Else Failed" custom section** — approved copy ready. Dark bg, big headline, punchy. Place between problem/solution and FAQ.
- [ ] **Fix section order** — nerve stages should move earlier (after problem/solution, before FAQ)
- [ ] **Spring Sale announcement bar** — update copy, tie it to R-ALA offer

### 🟡 MEDIUM — Polish
- [ ] **Reviews app** — install Judge.me (free) or Loox for real verified reviews
- [ ] **Subscription toggle** — install Loop app for "Save 25% with subscription" option
- [ ] **Stats section** — add disclaimer/source line under 71%, 88%, 92% stats
- [ ] **FAQ** — check heading size on mobile, may need to increase
- [ ] **Sticky ATC bar** — "(xxxx Reviews)" label — update with real count

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
