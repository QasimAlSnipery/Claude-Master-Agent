# Romira Theme Section Audit
**Date:** 2026-05-22  
**Store:** 3rnv2d-i3.myshopify.com  
**Theme ID:** 139682218059  
**Purpose:** Evaluate available sections for rebuilding the Romira homepage

---

## Current Homepage (templates/index.json)

Current sections active on the homepage:

| Section Key | Type | Notes |
|---|---|---|
| cfca4268... | `slideshow` | Single slide hero with dark navy bg, "Science-Backed Supplements..." headline |
| ss_video_with_text_3_gnP49F | `ss-video-with-text-3` | Image/text split — "Every Supplement Chosen Wisely" |
| d2d3417b... | `comparison-table` | 1-competitor table — "Why choose Romira?" |
| trustpilot_reviews_TJzz4e | `trustpilot-reviews` | 6-card review carousel |
| 0f1fc9e4... | `results` | 3 stat bars — **DISABLED** |
| featured_collection_XNEd8y | `featured-collection` | "Our Best Sellers" collection grid |

**Section order:** Slideshow hero → Video+Text → Comparison Table → Reviews → (disabled Results) → Featured Collection

---

## Section-by-Section Audit

---

### 1. `sections/hero-banner.liquid`
**Schema name:** Hero Banner Pro

**Visual:** Full-width hero banner with background image or video, optional split layout, overlay control, and a flexible content block system. Supports YouTube/Vimeo background video, mobile-specific image, and overlay tint. Content blocks (caption, heading, stars, text, features, button, disclaimer) are positioned independently.

**Key settings:**
- `layout_style` — full bleed or split layout
- `bg_image` / `bg_image_mobile` — desktop and mobile background images
- `video_bg_url` — YouTube or Vimeo background video URL
- `overlay_color` / `overlay_opacity` — color overlay on background
- `height` / `custom_height` — section height control
- `position` / `alignment` — content alignment (desktop + mobile)
- `feature_*` settings — icon/feature pill styling (bg, border, color, size, gap)
- `blocks_gap`, `margin_*`, `padding_*` — spacing
- `custom_css` — raw CSS override

**Block types:** Caption, Heading, Stars Rating, Text, Feature (pill/icon), Button, Disclaimer

**Quality for premium homepage:** HIGH  
This is a fully custom hero builder. Handles video backgrounds, split layouts, feature pills, star ratings, and multiple content blocks. Far more capable than the current Dawn slideshow being used. Ideal as the primary hero replacement.

---

### 2. `sections/product-showcase-hero.liquid`
**Schema name:** Product Showcase Hero

**Visual:** Shell section — originally built with GemPages. Has zero native settings (empty schema). Renders nothing useful without GemPages page builder content injected into it.

**Key settings:** None (empty schema)

**Quality for premium homepage:** LOW  
GemPages stub. No native controls. Skip it unless you want to go back into GemPages to edit it. Not suitable for a clean rebuild.

---

### 3. `sections/ss-video-with-text-3.liquid`
**Schema name:** SS - Video with Text #3 (Section Store)

**Visual:** Two-column layout with media (image or video) on one side and rich text content on the other. Highly configurable column widths, positions, and aspect ratios. Each content element (heading, subheading, text, button) has independent font, size, color, line-height, alignment, and position settings.

**Key settings:**
- `media` — image or video
- `media_width` / `media_width_mobile` — column width as percentage
- `media_position` / `media_position_mobile` — left or right
- `media_ratio` — aspect ratio (original, square, portrait, etc.)
- `heading`, `sub_heading`, `text`, `button` — rich text content
- Per-element: font, size, color, alignment, margin, position order
- `background_color` / `background_gradient`
- `full_width` / `content_width`
- `padding_*`, `margin_*`

**Quality for premium homepage:** HIGH  
Already in use on the current homepage and performing well. Best used for brand story sections, ingredient spotlights, or product feature callouts. Very granular typography control makes it premium-brand ready.

---

### 4. `sections/social-proof-stats-bar.liquid`
**Schema name:** Social Proof Stats Bar

**Visual:** A horizontal bar of 2–6 stat items, each showing a large number (with optional animated count-up), an icon, and a label. Dividers between stats can be pipe, dot, horizontal line, or none. Clean, centred, minimal layout.

**Key settings:**
- `divider_style` — none / pipe / dot / line
- `animate_count` — toggle count-up animation on scroll
- `desktop_cols` / `mobile_cols` — column count
- `number_size` / `label_size` (desktop) + mobile variants
- `bg_color` / `text_color` / `number_color`
- `padding_*`, `margin_*` (desktop + mobile)

**Block type:** Stat (icon image, value, label)

**Quality for premium homepage:** HIGH  
Custom-built, clean, and purpose-made for supplement brands. Excellent for "10,000+ customers served / 4.9 stars / 60-day guarantee" trust bars. Easy to configure.

---

### 5. `sections/icon-bar.liquid`
**Schema name:** Icon Bar

**Visual:** Multi-column icon grid with optional section title. Each block shows an icon image and text. Supports carousel/slider mode on desktop and mobile. Based on the Dawn multicolumn pattern but with icon-specific layout options (icon position top/left) and custom color schemes per card.

**Key settings:**
- `title` / `title_highlight_color` / `heading_size` — section heading
- `icon_layout` — how icons and text are arranged per card
- `icon_size` / `icon_color`
- `color_scheme` / `cards_color_scheme` — section and card backgrounds
- `columns_desktop` / `columns_mobile`
- `slider_desktop` / `slider_mobile` — enables slider mode
- `custom_colors_*` — full color override for bg, text, cards

**Block type:** Icon (image, heading, text)

**Quality for premium homepage:** HIGH  
Well-built multi-purpose section. Great for "Why Romira" trust icons, ingredient icons, or benefit callouts. More flexible than the raw multicolumn section because of the icon positioning options.

---

### 6. `sections/horizontal-ticker.liquid`
**Schema name:** Horizontal Ticker

**Visual:** Infinitely scrolling marquee/ticker strip. Supports text items, images, review cards (star rating + text + name), text-with-icon items, and icon-with-content items. Configurable scroll speed, direction, stop-on-hover, spacing, and text styling.

**Key settings:**
- `speed` — scroll speed
- `direction` — left or right scroll direction
- `stop_on_hover` — pause on mouse hover
- `mobile_spacing` / `desktop_spacing` — gap between items
- `mobile_text_size` / `desktop_text_size` — font size
- `italic_text`, `uppercase_text`, `bold_text` — text style flags
- `mobile_image_height` / `desktop_image_height` — image item sizes
- `color_scheme` / `custom_colors_*`

**Block types:** Text, Image, Review (star + text + author), Text with Icon, Icon with Content

**Quality for premium homepage:** HIGH  
Review-ticker or benefit-ticker strips are extremely effective for supplement brand social proof. The review block type makes it especially useful — scrolling 5-star quotes above or below the hero creates immediate trust. Better for this purpose than static icon bars.

---

### 7. `sections/how-it-works.liquid`
**Schema name:** How It Works

**Visual:** Numbered step sequence with heading, icon, title, and description per step. Layout options: horizontal (steps in a row with optional connector arrows between them) or alternating (each step has image on alternating sides). Clean, editorial feel.

**Key settings:**
- `heading` / `subheading` — section header text
- `layout` — horizontal or alternating
- `show_connector` — show connector arrows between steps (horizontal layout only)
- `bg_color` / `text_color` / `accent_color`
- `padding_*`, `margin_*`

**Block type:** Step (icon image, title, description, optional image for alternating layout)

**Quality for premium homepage:** HIGH  
Custom-built, clean, and direct-response proven. Step-by-step "how it works" sections are conversion gold for supplement brands (e.g., "1. Take 2 capsules / 2. Targets nerve cells / 3. Feel results in 2 weeks"). The alternating layout with images gives it a premium editorial look.

---

### 8. `sections/icons-with-content.liquid`
**Schema name:** Icons with content

**Visual:** A split-layout section combining a column of clickable icons (left/right/top) with a main content area. Clicking an icon switches the displayed content. Think tabbed feature explainer with visual icons on one side. Supports rich content blocks (heading, text, image, video, button, ATC button) in the content pane.

**Key settings:**
- `icon_size` / `icon_position` / `icon_color`
- `icon_heading_size` / `icon_text_alignment`
- `icons_desktop_layout` / `icons_mobile_layout` — layout style of the icon list
- `layout` — overall desktop layout
- `color_scheme` / `custom_colors_*`
- `padding_*`

**Block types:** Icon with text, Heading, Caption, Text, Button, Add to Cart button, Image, Autoplay video

**Quality for premium homepage:** MEDIUM  
Powerful for an interactive ingredient or benefit explainer. However, the interaction complexity (icon switching content) may be overkill for a homepage where you want fast visual scanning. Better suited for a product page. Include only if using it for a visually interactive "what's inside" section.

---

### 9. `sections/before-after-results.liquid`
**Schema name:** Before & After Results

**Visual:** Side-by-side or stacked before/after image pairs, each with a heading, subheading/label, and optional description. Layout options: grid (all pairs visible) or slider (swipeable carousel). Clean cards with accent-colored labels.

**Key settings:**
- `heading` / `subheading` — section header
- `layout` — grid or slider
- `bg_color` / `text_color` / `accent_color`
- `padding_*`, `margin_*`

**Block type:** Before & After Pair (before image, after image, label/heading, description)

**Quality for premium homepage:** HIGH  
Before/after social proof is extremely high-converting for supplement brands. This section is custom-built for exactly that purpose. A "Results" section showing visual transformations directly addresses skepticism and moves buyers. Essential for a premium homepage.

---

### 10. `sections/press-mentions-bar.liquid`
**Schema name:** Press Mentions Bar

**Visual:** Auto-scrolling marquee of press/media logos (e.g., Forbes, Healthline, etc.). Optional "As seen in" heading above. Two tracks run simultaneously for seamless infinite scroll. Configurable logo height, optional grayscale-to-color hover effect, and scroll speed.

**Key settings:**
- `show_heading` / `heading` / `heading_color` — optional "As Seen In" label
- `logo_height` — image height in pixels
- `grayscale` — render logos in greyscale (professional restraint)
- `color_on_hover` — restore color on mouse hover
- `scroll_speed` — slow / medium / fast
- `bg_color`, `padding_*`, `margin_*`

**Block type:** Press Logo (image, optional link)

**Quality for premium homepage:** HIGH  
Essential trust signal for a premium supplement brand. Even with placeholder logos it dramatically increases perceived credibility. The grayscale treatment looks clean and editorial. Custom-built, not a generic slider.

---

### 11. `sections/blue-highlight-banner.liquid`
**Schema name:** Section 1 (GemPages)

**Visual:** A GemPages-built section. The actual content is embedded as minified GemPages markup — it is a highlight/callout banner (likely a colored background banner with headline text). Not editable through the Shopify theme editor in any useful way.

**Key settings:** Only GemPages internal: `section_preload`, `checksum`, and one generated field. No real native controls.

**Quality for premium homepage:** LOW  
GemPages dependency. Cannot be edited or reconfigured without going back into GemPages. Avoid using in a clean rebuild — replace with a native section if a highlight banner is needed (rich-text, icon-bar, or a simple custom section).

---

### 12. `sections/bordered-content-section.liquid`
**Schema name:** Bordered Content Section (GemPages)

**Visual:** Another GemPages stub. Empty schema, zero settings. Renders nothing unless GemPages app is active and has content stored server-side.

**Key settings:** None

**Quality for premium homepage:** LOW  
GemPages shell. Same issue as blue-highlight-banner. Skip entirely.

---

### 13. `sections/product-features.liquid`
**Schema name:** Product features

**Visual:** A rich product-feature section combining a main image (with optional interactive hotspots) and a content pane with headline, text, button, and bullet points. Very similar to Dawn's Image with Text but adds hotspot pins on the image and a bullet point list system. Supports desktop content positioning (left/right/center overlay) and a section background distinct from the card background.

**Key settings:**
- `title` / `title_highlight_color` / `heading_size`
- `image` / `mobile_image` / `desktop_image_width` / `full_page_width`
- `desktop_content_position` — left / right / center
- `hotspot_*` settings — hotspot pin color scheme, modal size, animation
- `bullet_points_color` — color of bullet point icons
- `color_scheme` / `section_color_scheme` — dual color scheme support
- `custom_colors_*` — full color override

**Block types:** Hotspot (pin on image with popup content), Bullet point

**Quality for premium homepage:** HIGH  
One of the most versatile sections on the theme. The hotspot feature is unique — you can pin labels directly to a product bottle image (e.g., "600mg R-ALA here", "Coconut Oil absorption booster"). The bullet point system makes ingredient or benefit callouts clean and scannable. Premium look.

---

### 14. `sections/gp-section-587633170451530586.liquid` (and other gp-section-* files)
**Schema name:** GemPages section (minified CSS/JS blob)

**Visual:** All `gp-section-*` files are GemPages-generated sections. The content is a massive blob of minified inline CSS custom properties mapped to inline style attributes. The actual layout and content is stored in GemPages's database, not in the liquid file. There are ~20 gp-section files total on this theme.

**Key settings:** Only GemPages internals (`section_preload`, `checksum`). No editable settings.

**Quality for premium homepage:** LOW  
All GemPages sections are black boxes without the GemPages editor. Cannot be inspected, edited, or reused in a clean rebuild. Treat them as legacy content and replace with native sections.

---

### 15. `sections/parallax-hero.liquid`
**Schema name:** 3D Parallax hero

**Visual:** Full-width hero with a multi-layer parallax scroll effect — background image/video moves at a different speed than foreground content layers as the user scrolls. Supports transparent header (header becomes transparent when hero is at top). Content and image layers are added as blocks, each with independent z-order and parallax speed. Highly cinematic feel.

**Key settings:**
- `animation_start` — when parallax animation triggers
- `min_desktop_height_type` / `desktop_pixels_height` — height control
- `transparent_header` — makes header transparent over the hero
- `transparent_header_text_color` etc. — header color overrides for transparent mode
- `desktop_bg_image` / `desktop_bg_video` / `mobile_bg_image` / `mobile_bg_video`
- `overlay_color` / `overlay_opacity`
- `padding_*`

**Block types:** Content (text/CTA layer), Image layer (additional parallax depth layer)

**Quality for premium homepage:** HIGH  
The most visually impactful hero option in the theme. The parallax effect creates immediate "premium brand" perception. Transparent header integration is a pro feature. Best for a dramatic, cinematic above-the-fold experience — excellent for a Romira homepage rebrand. Higher visual sophistication than the hero-banner.

---

### 16. `sections/slideshow-hero.liquid`
**Schema name:** Slideshow hero

**Visual:** Multi-slide hero carousel with per-slide background image/video, content, and CTA. Supports transparent header, autoplay with configurable speed, drag-to-slide, dot navigation, and configurable height. Each slide is a fully independent content block.

**Key settings:**
- `min_desktop_height_type` / `desktop_pixels_height` — height
- `transparent_header` — transparent header support
- `slider_type` — fade or slide transition
- `drag` — enable drag-to-slide
- `autoplay` / `autoplay_speed`
- `enable_dots` / `dots_color_scheme`
- `padding_*`

**Block type:** Slide (bg image, bg video, overlay, heading, text, button, content alignment)

**Quality for premium homepage:** HIGH  
More flexible than the standard Dawn slideshow currently in use. Better controls for transparent header, height, and slide transitions. Good for multi-product or multi-message hero if Romira expands the product line. For a single product focus, parallax-hero or hero-banner would be more impactful.

---

### 17. `sections/awards-certifications-bar.liquid`
**Schema name:** Awards & Certifications

**Visual:** A horizontal bar of badge items, each showing an image or emoji, a title, and an optional subtitle. Two layout modes: `logo_row` (standard horizontal flex with image + text per badge) and `pill_row` (each badge is a styled pill/capsule). Grayscale option available. Subtle heading ("Certifications") supported.

**Key settings:**
- `heading` — optional section heading text
- `layout` — logo_row or pill_row
- `badge_height` — image height in pixels
- `grayscale` — apply greyscale filter
- `bg_color` / `card_bg` / `text_color`
- `padding_*`, `margin_*`

**Block type:** Badge (badge image OR emoji, title, subtitle)

**Quality for premium homepage:** HIGH  
Clean, purpose-built for supplement brand credibility. Great for "GMP Certified / Third-Party Tested / Non-GMO / Gluten Free" badge rows. The pill layout is especially premium-looking — clean capsule shapes with text, no images needed. Grayscale treatment adds editorial restraint.

---

### 18. `sections/expert-endorsement.liquid`
**Schema name:** Expert Endorsement

**Visual:** A grid or slider of expert/doctor cards, each with a photo, optional star rating, blockquote, expert name, credential (e.g., "MD, Cardiologist"), and an optional learn-more link. Section-level heading and subheading, optional CTA button below all cards.

**Key settings:**
- `heading` / `subheading` — section header
- `layout` — grid or slider
- `cta_label` / `cta_link` — bottom CTA
- `bg_color` / `card_bg` / `text_color` / `accent_color`
- `padding_*`, `margin_*`

**Block type:** Expert (photo, star rating 1–5, quote, name, credential, link+label)

**Quality for premium homepage:** HIGH  
Expert social proof is the highest-credibility trust signal for supplement brands. A section purpose-built for this is rare. Having doctor/researcher cards with photos, credentials, and direct quotes is exactly the kind of authority signal that converts health-conscious buyers. Essential for Romira's positioning.

---

### 19. `sections/bundle-deals.liquid`
**Schema name:** Bundle deals

**Visual:** A product bundle builder section — shows 2–4 product images horizontally with "+" connectors between them, a combined total price, savings callout, and an Add to Cart button that adds all bundle products at once. Supports percentage or fixed-amount discount display, skip-unavailable-products logic, and optional cart-skip (direct checkout).

**Key settings:**
- `title` / `title_highlight_color` / `heading_size`
- `layout` — horizontal arrangement style
- `enable_price_changes` — live price calculation
- `skip_unavailable` — hide bundle if any product is OOS
- `skip_cart` — go straight to checkout
- `total_price_label` / `btn_label`
- `percentage_discount` / `fixed_amount_discount` — display discount amount
- `color_scheme` / `custom_colors_*`

**Block type:** Product (product picker, label override, image override)

**Quality for premium homepage:** HIGH  
High-converting conversion section. Bundle deals ("Buy 2 Get 20% Off") are proven AOV boosters for supplement brands. This section is fully built to handle it natively without an app. The price calculation and connectors create a visual "value stack" that works well above or near the product grid.

---

### 20. `sections/quantity-discount-table.liquid`
**Schema name:** Quantity Discount Table

**Visual:** A tiered pricing card grid — typically 3 cards showing "Buy 1", "Buy 2 Save 15%", "Buy 3 Save 25%" style options, each with qty label, price per bottle, savings text, and a CTA button. The highlighted card gets a badge label (e.g., "Best Value") and stands out visually.

**Key settings:**
- `heading` / `subheading`
- `bg_color` / `card_bg` / `text_color`
- `highlight_color` — accent color for the highlighted "best value" card
- `btn_bg` / `btn_text` — button colors
- `padding_*`, `margin_*`

**Block type:** Discount Tier (qty_label, price_per, savings_text, btn_label, btn_link, highlight toggle, badge_label)

**Quality for premium homepage:** HIGH  
Quantity discount tables are extremely effective for supplement brands — they anchor the per-bottle price and make the multi-bottle option feel obvious. This is a clean, custom implementation. Works beautifully near the top of the page or above/below the product grid.

---

## Summary Table

| Section | Quality | Best Use on Homepage |
|---|---|---|
| `hero-banner.liquid` | HIGH | Primary hero — video background, feature pills, full block system |
| `product-showcase-hero.liquid` | LOW | Skip — GemPages stub, no native controls |
| `ss-video-with-text-3.liquid` | HIGH | Brand story / ingredient spotlight split sections |
| `social-proof-stats-bar.liquid` | HIGH | Animated trust stats bar (customers served, stars, guarantee) |
| `icon-bar.liquid` | HIGH | "Why Romira" benefit icons, ingredient icons |
| `horizontal-ticker.liquid` | HIGH | Scrolling review ticker or benefit marquee |
| `how-it-works.liquid` | HIGH | Step-by-step "how it works" sequence |
| `icons-with-content.liquid` | MEDIUM | Interactive ingredient/benefit explainer (better for product page) |
| `before-after-results.liquid` | HIGH | Visual transformation proof section |
| `press-mentions-bar.liquid` | HIGH | "As Seen In" press logo scrolling bar |
| `blue-highlight-banner.liquid` | LOW | Skip — GemPages stub |
| `bordered-content-section.liquid` | LOW | Skip — GemPages empty stub |
| `product-features.liquid` | HIGH | Hotspot product image with ingredient callouts |
| `gp-section-*.liquid` (all ~20) | LOW | Skip all — GemPages generated, no native editing |
| `parallax-hero.liquid` | HIGH | Most premium hero option — cinematic parallax effect |
| `slideshow-hero.liquid` | HIGH | Multi-slide hero if showing multiple products/messages |
| `awards-certifications-bar.liquid` | HIGH | GMP / Non-GMO / 3rd-party tested certifications bar |
| `expert-endorsement.liquid` | HIGH | Doctor/expert quote cards — top credibility signal |
| `bundle-deals.liquid` | HIGH | Bundle offer section — AOV booster |
| `quantity-discount-table.liquid` | HIGH | Buy 1/2/3 tiered discount cards |

---

## Recommended Homepage Stack (suggested order)

1. **`parallax-hero.liquid`** — Cinematic above-the-fold hero (transparent header, video/image bg, CTA)
2. **`horizontal-ticker.liquid`** — Scrolling 5-star review strip directly below hero
3. **`social-proof-stats-bar.liquid`** — "10,000+ customers / 4.9 stars / 60-day guarantee" bar
4. **`press-mentions-bar.liquid`** — "As Seen In" logo bar
5. **`ss-video-with-text-3.liquid`** — Brand story: "Science-backed, zero compromise"
6. **`how-it-works.liquid`** — 3-step "how it works" sequence
7. **`product-features.liquid`** — Hotspot product bottle with ingredient callouts
8. **`awards-certifications-bar.liquid`** — Certifications: GMP / Non-GMO / 3rd-party tested
9. **`before-after-results.liquid`** — Customer transformation proof
10. **`expert-endorsement.liquid`** — Doctor/expert endorsement cards
11. **`bundle-deals.liquid`** OR **`quantity-discount-table.liquid`** — Volume discount conversion
12. **`featured-collection`** (existing) — Product grid
13. **`icon-bar.liquid`** — Final benefit recap or ingredient icons

**Sections to remove from homepage:**
- Current Dawn `slideshow` (replace with `parallax-hero`)
- `comparison-table` (move to product page where it belongs)
- GemPages stubs (`blue-highlight-banner`, `bordered-content-section`, all `gp-section-*`)

---

*Audit complete. All sections fetched read-only via Shopify REST API. No theme files were modified.*
