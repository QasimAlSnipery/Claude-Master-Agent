# ADVERTORIAL AGENT — ONBOARDING GUIDE
## Everything you need to go from zero to your first advertorial in one session

---

## WHAT THIS SYSTEM IS

This is a complete advertorial production system. You give it a product brief, it produces:

1. **A finished HTML page** — ready to upload to Shopify
2. **A readable copy file** — so you can proofread before building
3. **A Gemini AI image prompt** — so you can generate all images in one paste

The system is built on proven direct-response frameworks (Russell Brunson, Gary Halbert, Dan Kennedy) and trained on real high-converting advertorials across pet health, men's supplements, skincare, and hearing devices.

---

## THE THREE FILES YOU NEED

| File | What it does | Where it goes |
|------|-------------|--------------|
| `AGENT-FRAMEWORK.md` | The agent's brain — paste this as your system prompt | Claude.ai Project instructions |
| `brand-profile-[brand].md` | Your brand's permanent data — paste at start of each session | Paste in chat when starting |
| `brand-profile-template.md` | Blank template to fill in for each new brand | Fill in once per brand |

---

## STEP 1: SET UP YOUR CLAUDE PROJECT (ONE TIME EVER)

1. Go to **claude.ai**
2. In the left sidebar, click **"New Project"**
3. Name it: `Advertorial Agent`
4. Click **"Set project instructions"**
5. Open `AGENT-FRAMEWORK.md`, select all (`Ctrl+A`), copy (`Ctrl+C`)
6. Paste into the project instructions field
7. Save

**Done forever.** Every conversation inside this project automatically has the full agent loaded.

---

## STEP 2: SET UP YOUR FIRST BRAND (ONE TIME PER BRAND)

### 2a. Fill out your Brand Profile

1. Open `brand-profile-template.md`
2. Save a copy named `brand-profile-[your-brand-name].md`
3. Fill in every section — takes about 10–15 minutes
4. The more detail you add now, the better every advertorial will be

**What to have ready before filling it out:**
- Your website URL
- Your top 3 competitors by name
- The name and credentials of any doctor/expert associated with your brand
- 2–3 sentences about why your brand exists
- The one thing your product does that competitors don't

### 2b. Save your Brand Profile

Keep `brand-profile-[brand].md` somewhere easy to find:
- Desktop folder
- Google Drive
- Notion or your notes app

You'll paste it at the start of every advertorial session.

---

## STEP 3: CREATE YOUR FIRST ADVERTORIAL

### Start a new chat inside your Advertorial Agent project.

**Type this:**
> "I want to create an advertorial for [Brand Name]. Here is my brand profile: [paste your brand profile file contents here]"

**What happens next:**
1. Agent reads your brand profile — skips all brand questions
2. Agent outputs the **Pre-Interview Prep List** — gather what's on it
3. Agent asks **Campaign Questions only** (the product, audience, proof)
4. Agent outputs **5 Headline Options** — you pick one
5. Agent outputs **Pre-Generation Summary** — you confirm or correct
6. Agent generates: **JSON file + Creative Brief** (copy + Gemini image prompt)

### Review the Creative Brief

Open `[product]-creative-brief.md`. Check:
- Section A: Read all the copy. Fix anything that's wrong (names, prices, facts).
- Section B: Copy the Gemini prompt block, paste it into Gemini AI, generate all images.

### Build the HTML

```
python build.py content-[product].json
```

*(Full Python path on Windows: `"C:\Users\Darin Game\AppData\Local\Python\bin\python.exe" build.py content-[product].json`)*

### Upload to Shopify

1. Shopify Admin → Online Store → Pages → Add Page
2. Give the page a title (the advertorial headline)
3. Click the `<>` HTML button in the content editor
4. Paste the entire contents of the built HTML file
5. Fill in SEO fields (see below)
6. Save

### Shopify SEO Fields

| Field | What to put |
|-------|------------|
| Page title | Shortened version of headline (max 60 characters) |
| Meta description | 1–2 sentences on the problem + solution (max 160 characters) |
| URL handle | Short, clean, product-focused slug (e.g., `felora-cat-fountain`) |

---

## STEP 4: EVERY FUTURE ADVERTORIAL (SAME BRAND)

1. Open a new chat in your Advertorial Agent project
2. Paste your `brand-profile-[brand].md` at the start
3. Say: "New advertorial for [Brand]. Brand profile above."
4. Agent skips straight to campaign questions
5. Answer 8 questions instead of 12 — takes half the time

---

## STEP 5: NEW BRAND = NEW BRAND PROFILE

For each new brand you work with:
1. Duplicate `brand-profile-template.md`
2. Rename it `brand-profile-[new-brand].md`
3. Fill it out (10 minutes)
4. Save it alongside your other brand profiles

You'll build a library of brand profiles over time. Each one makes every future advertorial for that brand faster and more accurate.

---

## THE 5 ADVERTORIAL FORMATS — QUICK GUIDE

| Format | Best for | Length | Key feature |
|--------|---------|--------|-------------|
| **A** | Physical devices, conspiracy angle, cold traffic | 4,000+ words | Third-party editorial voice, investigative |
| **B** | Supplements, pet products, emotional story | 1,500–2,500 words | Customer narrates their own journey |
| **C** | Multiple distinct benefits, SEO traffic | 1,500–2,500 words | Numbered list structure ("7 Changes You'll Notice") |
| **D** | Health products with a real specialist, cold traffic | 4,000+ words | Doctor IS the author — clinical, confessional |
| **E** | Same as D but for warmer traffic, shorter | 2,000–3,000 words | Doctor-as-author, punchy and direct |

**Not sure which format?** Tell the agent "recommend a format for me" and it will run a 5-question quiz to decide.

---

## OUTPUT FILES — WHAT EVERYTHING IS

| File | What it is | What to do with it |
|------|-----------|-------------------|
| `content-[product].json` | The content data file | Run `python build.py` on this |
| `[product].html` | The finished advertorial page | Upload to Shopify |
| `[product]-creative-brief.md` | Readable copy + Gemini image prompt | Proofread Section A, use Section B for images |
| `[product]-PREVIEW.md` | Full copy preview before building | Review and approve before generating JSON |

---

## IMAGE WORKFLOW

Every advertorial needs 5–9 images. The creative brief's Section B contains a **complete Gemini AI prompt** — one copy-paste generates all images at once.

**Steps:**
1. Open `[product]-creative-brief.md`
2. Scroll to the bottom — find "GEMINI PROMPT START"
3. Copy everything between the two divider lines
4. Paste into Gemini AI (gemini.google.com)
5. Download the generated images
6. Upload to Shopify: Admin → Content → Files
7. Copy the CDN URLs Shopify gives you
8. Open `content-[product].json`
9. Replace `PLACEHOLDER_AUTHOR_PHOTO`, `PLACEHOLDER_HERO_IMAGE`, etc. with the real URLs
10. Run `python build.py content-[product].json` again
11. Done

---

## STANDARD IMAGE PLACEHOLDER NAMES

When the agent generates JSON without real image URLs, it uses these exact names. Find and replace them with real URLs:

| Placeholder | Image it needs |
|-------------|---------------|
| `PLACEHOLDER_AUTHOR_PHOTO` | Doctor/expert headshot |
| `PLACEHOLDER_HERO_IMAGE` | Main problem/hook image |
| `PLACEHOLDER_PRODUCT_IMAGE` | Clean product photo |
| `PLACEHOLDER_BIOFILM_IMAGE` | Evidence/mechanism image |
| `PLACEHOLDER_CUSTOMER_COLLAGE` | Happy customers / social proof |
| `PLACEHOLDER_AVATAR_1` | Facebook comment profile photo 1 |
| `PLACEHOLDER_AVATAR_2` | Facebook comment profile photo 2 |
| `PLACEHOLDER_AVATAR_3` | Facebook comment profile photo 3 |
| `PLACEHOLDER_AVATAR_4` | Facebook comment profile photo 4 |

---

## BEFORE YOU GO LIVE — PRE-FLIGHT CHECKLIST

Run through these every time before uploading to Shopify:

- [ ] Product URL in JSON loads correctly when clicked
- [ ] Price in the advertorial matches your live product page exactly
- [ ] Guarantee terms match what your business actually honors
- [ ] Facebook Pixel ID added to JSON (if running paid traffic)
- [ ] All PLACEHOLDER_ image names replaced with real Shopify CDN URLs
- [ ] HTML built fresh after the last JSON edit (`python build.py`)
- [ ] Shopify SEO fields filled in (title, meta description, URL handle)
- [ ] Page saved and set to visible (not draft)

---

## TROUBLESHOOTING

**"The breadcrumbs are showing raw text like `{'label': 'Home'}`"**
→ Open the JSON. Find `breadcrumb`. Change any dict objects to plain strings:
`["Home", "Cat Health", "Hydration"]` not `[{"label": "Home"}, ...]`

**"The build fails with a Python error"**
→ Use the full Python path: `"C:\Users\Darin Game\AppData\Local\Python\bin\python.exe" build.py content-[file].json`

**"An image appears twice on the page"**
→ The testimonials component already shows its `review_image_src` image. Remove the separate `image` type component above it in the JSON.

**"The hero image appears after the first paragraph"**
→ Move the hero `image` component in the JSON to appear BEFORE the `lead` component.

**"Facebook comments appear before the final CTA button"**
→ Move the `facebook_comments` component in the JSON to the very end — after `final_cta`.

**"The red warning text wraps to 3 lines on mobile"**
→ Shorten `author_warning` in the JSON to max 14 words. Use `<br>` to split into 2 lines.

---

## FILE NAMING CONVENTION

```
Brand profile:     brand-profile-[brand-slug].md
Content file:      content-[product-slug]-v[version]-format[letter].json
Creative brief:    [product-slug]-v[version]-format[letter]-creative-brief.md
Preview file:      [product-slug]-PREVIEW.md
Built HTML:        [product-slug].html
```

Examples:
```
brand-profile-felora.md
content-felora-wireless-fountain-v1-formatE.json
felora-wireless-fountain-v1-formatE-creative-brief.md
felora-wireless-fountain.html
```

---

## QUICK REFERENCE — MOST COMMON COMMANDS

| What you want | What to say to the agent |
|--------------|------------------------|
| Start a new advertorial | "New advertorial for [Brand]. [paste brand profile]" |
| Set up a new brand | "I want to set up a new brand: [Brand Name]" |
| Pick a format | "Recommend a format for me" → runs 5-question quiz |
| Generate after interview | "Generate it — Format E" |
| Rewrite a weak section | "Rewrite the [section name]. It needs more emotional weight. Apply the Epiphany Bridge technique." |
| Get 5 headline variants | "Give me 5 headline variants for this advertorial" |
| Audit an existing advertorial | "Audit this advertorial against the framework" → paste the copy |

---

*This system is built on AGENT-FRAMEWORK.md. If you ever want to understand why a specific rule exists, open that file and search for the relevant section.*
