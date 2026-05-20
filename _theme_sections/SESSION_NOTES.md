# Session Notes — Romira Store Build
## Last updated: 2026-05-19 04:30

---

## Shopify Connection (READ THIS FIRST EVERY SESSION)

**Store:** 3rnv2d-i3.myshopify.com | **Live domain:** romira.store
**Active theme:** romira-theme | **Theme ID:** `139682218059`

**Current token:** *(read from CLI config — see CONNECT_ROMIRA.md)*
Stored at: `C:\Users\Darin Game\AppData\Roaming\shopify-cli-store-nodejs\Config\config.json`
If expired → re-run: `shopify store auth --store 3rnv2d-i3.myshopify.com --scopes read_products`

**HOW TO UPLOAD FILES — only reliable method:**
```javascript
// Node.js REST API — use upload_rest.mjs or copy this pattern:
const content = readFileSync('file.liquid', 'utf8');
const body = JSON.stringify({ asset: { key: 'sections/file.liquid', value: content } });
// PUT to https://3rnv2d-i3.myshopify.com/admin/api/2024-01/themes/139682218059/assets.json
// Header: X-Shopify-Access-Token: (read from _token.mjs — never hardcode)
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

## All Local Files (C:\Users\Darin Game\OneDrive\Desktop\Claude Master Agent\_theme_sections\)

| File | Status | Description |
|---|---|---|
| `romira-timeline.liquid` | ✅ LIVE | Week-by-week timeline + 60-day guarantee bar at bottom |
| `romira-nerve-stages.liquid` | ✅ LIVE | 3 stages — image LEFT, text RIGHT. Needs 3 images |
| `romira-comparison.liquid` | ✅ LIVE | Alevia-style 3-col comparison table |
| `romira-guarantee-banner.liquid` | ✅ LIVE | Standalone guarantee banner with SVG shield |
| `romira-problem-solution.liquid` | ✅ LIVE | Dark bg section: problem (image+bullets) + solution card |
| `product.lipoic.json` | ✅ LIVE | Full product template — all sections wired in |
| `LIVE_*.liquid / LIVE_*.json` | ✅ SAVED | Current live snapshots pulled 2026-05-19 04:27 |
| `upload_rest.mjs` | ✅ READY | Node.js upload script |

---

## Full Section Order (product page top to bottom)

1. `main` — product (title, stars, bullets, variant picker, buy button, guarantee, reviews, shipping, tabs)
2. `ss_testimonial_12` — customer testimonial carousel
3. `romira_timeline` — week-by-week timeline + guarantee bar
4. `romira_problem_solution` — "The Real Reason" dark section
5. `faq_section_pea` — FAQ (8 questions)
6. `romira_nerve_stages` — 3-stage nerve breakdown
7. `icon_bar` — How to use (4 icons)
8. `romira_comparison` — Romira vs. Others table
9. `results_7448bX` — 71%, 88%, 92% stats
10. `romira_guarantee_callout` — small guarantee banner
11. `romira_guarantee_large` — full-width dark blue guarantee banner
12. `apps + divider`

---

## APPROVED COPY — Ready to place on page

**"Why Everything Else Failed" section:**
> **THE ONLY SUPPLEMENT THAT GETS INSIDE THE NERVE CELL**
>
> B12 supports nerves. Magnesium relaxes muscles. Turmeric fights inflammation. CBD calms your system.
>
> Real supplements. Just not for this.
>
> R-Alpha Lipoic Acid is the only compound that actually enters the nerve cell, repairs the damage, and restores what broke down in the first place.
>
> That is why nothing worked. They never got inside.

*(This copy is NOT yet placed on the page — build it as a custom section tomorrow)*

---

## What Was Built This Session

### Custom sections created (all live):
1. `romira-timeline` — stagger-animated week cards + gold shield guarantee bar at bottom
2. `romira-nerve-stages` — image-left/text-right layout (Alevia style), scroll animations
3. `romira-comparison` — Alevia 3-column table (Romira | Feature | Others), full font control
4. `romira-guarantee-banner` — standalone banner with SVG shield, eyebrow controls
5. `romira-problem-solution` — 2-part section: dark problem area + green solution card with 4 icons

### Copy changes:
- Bullet points: outcome-focused (wake up without burning, stop bracing, sleep through night)
- Removed fake "Dr. Rachel Morgan" reviewer
- "Why Does This Work?" tab: full 4-mechanism R-ALA science
- FAQ: 8 Alevia-style balanced questions
- "Why Choose Romira?" section: DELETED (was redundant with comparison table)

### Fixes made:
- Comparison table feature column heading now independently controllable (font size, weight, color)
- Guarantee banner eyebrow text: full typography control added
- All sections: `overflow-x: hidden`, `word-wrap: break-word`, mobile-first padding
- Inventory set to 500 units

---

## TO-DO LIST FOR TOMORROW (priority order)

### 🔴 CRITICAL — Images needed (user adds these)
- [ ] **Problem/Solution section** — add burning feet/hands image (Part 1 left side)
- [ ] **Problem/Solution section** — add Romira product bottle image (Part 2 right side)
- [ ] **Nerve stages** — add 3 stage images (Stage 1, 2, 3)
- [ ] **Comparison table** — add Romira product image (column header)
- [ ] **Comparison table** — add generic "other supplements" bottle image

### 🟠 HIGH — Build tomorrow
- [ ] **"Why Everything Else Failed" section** — the approved copy above needs its own custom section built and placed between the problem/solution section and the FAQ. Dark background, big headline top, body copy below. Simple but punchy.
- [ ] **Fix the price display** — site shows "$39.99 Sale price $49.99" which is backwards/confusing. Regular should be $49.99, sale should be $39.99.
- [ ] **Fix section order** — nerve stages currently appears AFTER FAQ. Should be earlier (after problem/solution or after timeline).
- [ ] **Spring Sale announcement bar** — update copy, make it more compelling or tied to the R-ALA offer

### 🟡 MEDIUM — Polish
- [ ] **Reviews app** — install Judge.me (free) or Loox for real verified reviews with "Load More" button — currently reviews are manually written
- [ ] **Subscription toggle** — install Loop (same app Alevia uses) for "Save 25% with subscription" option
- [ ] **Stats section** — 71%, 88%, 92% — add a small disclaimer/source line below so it looks credible, not made up
- [ ] **Testimonials** — some names appear with variations (Helen P./Patricia M., Alan M./Diane C.) — standardise across all review blocks
- [ ] **FAQ** — review the visual hierarchy, might need bigger heading sizes on mobile

### 🟢 NICE TO HAVE
- [ ] **Real customer photos** — replace AI-generated profile photos with real customer photos if available
- [ ] **Video testimonial** — add one video testimonial if available (massive trust builder)
- [ ] **"As seen on" / press logos** — if there's any media coverage, add a trust bar
- [ ] **Sticky ATC bar** — review stars label currently says "(xxxx Reviews)" — update with real number

---

## Issues Spotted on Live Site (2026-05-19)
1. Pricing shows "$39.99 Sale price $49.99" — sale price is HIGHER than regular. Fix in Shopify product settings.
2. Multiple "Add image in theme editor" placeholders visible (nerve stages, problem/solution section)
3. Comparison table needs product images to look complete
4. Section order could be tightened — nerve stages is too far down the page

---

## R-ALA Science Content (reference)
1. Antioxidant: scavenges ROS, recycles Vit C/E/Glutathione (DHLA), chelates metals
2. Blood flow: nitric oxide → vasodilation → oxygen to peripheral nerves
3. Anti-inflammatory: NF-κB inhibition, suppresses TNF-α, IL-6, IL-1β
4. Nerve repair: upregulates NGF + BDNF, protects myelin sheath
5. Glucose: improves insulin sensitivity, prevents AGE-induced nerve damage
All 4 mechanisms are in the "Why Does This Work?" collapsible tab on the product page.
