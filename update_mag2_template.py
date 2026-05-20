import json
import requests

import os, pathlib
def _get_token():
    cfg = pathlib.Path(os.environ['APPDATA']) / 'shopify-cli-store-nodejs' / 'Config' / 'config.json'
    c = json.load(open(cfg))
    key = next(k for k in c if '3rnv2d' in k)
    s = c[key]['myshopify']['com']['sessionsByUserId']
    return s[next(iter(s))]['accessToken']
TOKEN = _get_token()
STORE = "3rnv2d-i3.myshopify.com"
THEME_ID = 139682218059
PRODUCT_ID = 7687529201739
HEADERS = {"X-Shopify-Access-Token": TOKEN, "Content-Type": "application/json"}
BASE = f"https://{STORE}/admin/api/2024-01"

# ── Fetch current template ──────────────────────────────────────────────────
r = requests.get(f"{BASE}/themes/{THEME_ID}/assets.json",
                 params={"asset[key]": "templates/product.mag-2.json"},
                 headers=HEADERS)
template = json.loads(r.json()["asset"]["value"])
S = template["sections"]
MB = S["main"]["blocks"]

# ════════════════════════════════════════════════════════════════════════════
# 1. MAIN PRODUCT — 3 bullet points
# ════════════════════════════════════════════════════════════════════════════
MB["text_PrcXLV"]["settings"]["text_1"] = "<strong>Naturally lowers elevated cortisol levels</strong>"
MB["text_PrcXLV"]["settings"]["text_2"] = "<strong>Supports deeper, more restorative sleep</strong>"
MB["text_PrcXLV"]["settings"]["text_3"] = "<strong>Reduces stress-driven weight gain & belly fat</strong>"

# ════════════════════════════════════════════════════════════════════════════
# 2. THE SCIENCE BEHIND IT
# ════════════════════════════════════════════════════════════════════════════
MB["de158e68-5d0d-4819-a625-e2dabdff87d1"]["settings"]["heading"] = "The Science Behind It"
MB["de158e68-5d0d-4819-a625-e2dabdff87d1"]["settings"]["content"] = (
    "<h4><strong>8 Forms of Magnesium — The Cortisol-Calming Complex Built for Full-Body Recovery</strong></h4>"
    "<p>Here's what most people don't know: <strong>high cortisol actively depletes magnesium</strong>. "
    "And when magnesium is low, cortisol climbs higher. It's a vicious cycle — stress drains magnesium, "
    "which makes you more stressed, which keeps you awake, which causes unexplained weight gain.</p>"
    "<p>Romira™ Magnesium Complex breaks that cycle. With <strong>8 clinically recognised forms of magnesium</strong> "
    "in a single 1000mg serving, it targets every system cortisol destroys.</p>"
    "<h3><strong>The 8 Forms — What Each One Does:</strong></h3>"
    "<p><strong>Magnesium Glycinate</strong><br/>Bound to glycine — the calmest, most absorbable form. "
    "Directly quiets an overactive nervous system, reduces anxiety, and supports deep sleep without sedation.</p>"
    "<p><strong>Magnesium Malate</strong><br/>Bound to malic acid — a key player in cellular energy production. "
    "Fights cortisol-related fatigue, muscle aches, and daytime exhaustion.</p>"
    "<p><strong>Magnesium Taurate</strong><br/>Bound to taurine — targets your heart and blood sugar. "
    "High cortisol spikes blood sugar and strains the cardiovascular system. Taurate helps regulate both.</p>"
    "<p><strong>Magnesium Citrate</strong><br/>One of the most bioavailable forms. Rapidly absorbed to top up "
    "depleted magnesium stores — especially critical when chronic stress has drained your reserves.</p>"
    "<p><strong>Magnesium Carbonate</strong><br/>Converts to magnesium chloride in the stomach — gentle, "
    "bioavailable, and supports muscle relaxation and digestive calm.</p>"
    "<p><strong>Magnesium Aspartate</strong><br/>Crosses cell membranes efficiently. Supports energy metabolism "
    "and reduces physical fatigue when cortisol has been burning through your resources.</p>"
    "<p><strong>Magnesium Orotate</strong><br/>The premium recovery form. Supports cellular repair and heart "
    "health at a deep level — used by athletes and high-performers for resilience and recovery.</p>"
    "<p><strong>Magnesium Oxide</strong><br/>Provides a high elemental magnesium load, supporting digestive "
    "comfort and filling overall magnesium status gaps.</p>"
    "<h3><strong>Romira™ Quality Standard</strong></h3>"
    "<p>&#10003; 1000mg total magnesium per serving<br/>"
    "&#10003; 8 synergistic forms<br/>"
    "&#10003; Veggie capsules — vegan-friendly<br/>"
    "&#10003; No fillers, no binders<br/>"
    "&#10003; 45 servings per bottle</p>"
)

# ════════════════════════════════════════════════════════════════════════════
# 3. PRODUCT DETAILS TAB
# ════════════════════════════════════════════════════════════════════════════
MB["collapsible_tab_6kDjHE"]["settings"]["heading"] = "Product Details"
MB["collapsible_tab_6kDjHE"]["settings"]["content"] = (
    "<h4><strong>Pure, Potent & Built for Cortisol Support</strong></h4>"
    "<p><strong>Romira Magnesium Complex</strong> is an 8-form magnesium capsule designed for people dealing "
    "with high cortisol — the hidden driver of bad sleep, chronic stress, and unexplained weight gain.</p>"
    "<p>Each serving delivers <strong>1000mg of magnesium</strong> across 8 distinct forms, each with a different "
    "absorption pathway and target system. Together they work to keep cortisol in check and your body in recovery mode.</p>"
    "<p><strong>Key benefits &amp; features:</strong></p>"
    "<p>&#8226; 8 forms of magnesium in every serving<br/>"
    "&#8226; 1000mg elemental magnesium per dose<br/>"
    "&#8226; Targets cortisol, sleep, stress &amp; weight<br/>"
    "&#8226; No melatonin, no sedatives<br/>"
    "&#8226; Non-habit forming<br/>"
    "&#8226; Vegan veggie capsules<br/>"
    "&#8226; No artificial fillers or binders<br/>"
    "&#8226; 45 servings per bottle</p>"
    "<p>Take 2 capsules daily — morning, evening, or split — to maintain steady magnesium levels and keep cortisol suppressed around the clock.</p>"
)

# ════════════════════════════════════════════════════════════════════════════
# 4. HOW TO TAKE IT TAB
# ════════════════════════════════════════════════════════════════════════════
MB["collapsible_tab_Eaz6Xx"]["settings"]["heading"] = "How To Take It"
MB["collapsible_tab_Eaz6Xx"]["settings"]["content"] = (
    "<p>Simple. Consistent. Effective.</p>"
    "<p><strong>Step 1:</strong> Take <strong>2 veggie capsules</strong> (one serving — 1000mg of magnesium)<br/><br/>"
    "<strong>Step 2:</strong> Swallow with a full glass of water, with or without food<br/><br/>"
    "<strong>Step 3:</strong> Take in the <strong>evening</strong> to wind down and sleep deeper, or split — "
    "<strong>one morning, one night</strong> — for all-day cortisol control<br/><br/>"
    "<strong>Step 4:</strong> Stay consistent for at least <strong>4 weeks</strong>. Magnesium works "
    "cumulatively — the longer your levels stay replenished, the more your cortisol normalises and your "
    "body reclaims its natural rhythm.</p>"
    "<p><strong>Most users notice better sleep within 7–14 days.</strong><br/>"
    "Stress reduction and weight normalisation improve over 4–8 weeks as cortisol levels stabilise.</p>"
)

# ════════════════════════════════════════════════════════════════════════════
# 5. HERO VIDEO-WITH-TEXT — Better Nights section
# ════════════════════════════════════════════════════════════════════════════
S["ss_video_with_text_3_63LdcW"]["settings"]["heading"] = (
    "<h1>Your Cortisol Is Why You Can't Sleep, Can't Relax &amp; Can't Lose the Weight.</h1>"
)
S["ss_video_with_text_3_63LdcW"]["settings"]["text"] = (
    "<p><strong>When cortisol runs high — especially at night — your body stays locked in fight-or-flight. "
    "You lie awake at 2am with a racing mind. You wake up exhausted. You hold onto belly fat no matter "
    "how clean you eat. And the more stressed you get, the worse it becomes.</strong></p>"
    "<p><strong>Magnesium is the most powerful natural cortisol suppressor your body has. But most people "
    "are chronically depleted. Romira Magnesium Complex replenishes 8 forms at once — so your body finally "
    "gets what it needs to switch off, sleep deep, and let go of the weight.</strong></p>"
)

# ════════════════════════════════════════════════════════════════════════════
# 6. "WHAT SETS OUR MAGNESIUM?" SECTION
# ════════════════════════════════════════════════════════════════════════════
S["ss_video_with_text_3_xCpRfd"]["settings"]["heading"] = (
    "<h2><strong>Why 8 Forms? Because Cortisol Damages Everything.</strong></h2>"
)
S["ss_video_with_text_3_xCpRfd"]["settings"]["text"] = (
    "<p>&#10003; <strong>8 Synergistic Magnesium Forms</strong><br/><br/>"
    "Cortisol doesn't just affect one system — it wrecks your sleep, metabolism, heart, muscles, and mind. "
    "One form of magnesium can't fix all of that. Our 8-form complex targets every system at once: "
    "Glycinate for calm, Malate for energy, Taurate for heart &amp; blood sugar, Citrate for fast "
    "absorption, and 4 more working in the background.</p>"
    "<p>&#10003; <strong>1000mg Per Serving — A Full Therapeutic Dose</strong><br/><br/>"
    "Most magnesium supplements under-dose at 200–300mg. We deliver a full <strong>1000mg across 8 forms</strong> "
    "— enough to actually move the needle on cortisol levels, sleep depth, and stress resilience. "
    "This isn't a maintenance dose. It's a recovery dose.</p>"
    "<p>&#10003; <strong>Veggie Capsules — No Sugar, No Fillers</strong><br/><br/>"
    "Unlike magnesium gummies loaded with sugar and additives, our veggie capsules are pure. "
    "No sugar. No binders. No nonsense. Just 8 forms of clean magnesium your body can actually use — "
    "and none of the blood sugar spike that works against cortisol control.</p>"
)

# ════════════════════════════════════════════════════════════════════════════
# 7. RESULTS SECTION
# ════════════════════════════════════════════════════════════════════════════
S["results_9p88qX"]["settings"]["title"] = "<strong>What Happens When Cortisol Finally Drops</strong>"
S["results_9p88qX"]["blocks"]["row_nVmGpA"]["settings"]["row_text"] = (
    "<p><strong>Reported falling asleep faster, staying asleep longer, and waking up without the groggy, "
    "anxious feeling caused by a nighttime cortisol spike.</strong></p>"
)
S["results_9p88qX"]["blocks"]["row_YnVi6R"]["settings"]["row_text"] = (
    "<p><strong>Felt noticeably less reactive to daily stress, less irritable, and more in control of "
    "their mood and emotions within the first 2 weeks of consistent use.</strong></p>"
)
S["results_9p88qX"]["blocks"]["row_V7xt9h"]["settings"]["row_text"] = (
    "<p><strong>Noticed reduced belly bloating, fewer late-night cravings, and more stable weight — "
    "as cortisol-driven fat storage began to ease and metabolic function improved.</strong></p>"
)

# ════════════════════════════════════════════════════════════════════════════
# 8. FAQ SECTION
# ════════════════════════════════════════════════════════════════════════════
F = S["collapsible_content_Q6EbiF"]["blocks"]

F["collapsible_row_Fye3Fk"]["settings"]["heading"] = "How long until I see results?"
F["collapsible_row_Fye3Fk"]["settings"]["row_content"] = (
    "<p>Most users notice improvements in <strong>sleep quality</strong> and <strong>stress levels</strong> "
    "within <strong>7–14 days</strong>. The cortisol-calming and weight-stabilising effects become more "
    "significant at <strong>4–8 weeks</strong> of consistent daily use. Magnesium works cumulatively — "
    "the longer your levels stay replenished, the more your cortisol system recalibrates.</p>"
)

F["collapsible_row_JTUtnY"]["settings"]["heading"] = "What's the correct dose and how should I take it?"
F["collapsible_row_JTUtnY"]["settings"]["row_content"] = (
    "<p>Take <strong>2 veggie capsules daily (1000mg total magnesium)</strong> with a full glass of water. "
    "For sleep and cortisol recovery, take both in the <strong>evening</strong> 30–60 minutes before bed. "
    "For all-day stress support, take <strong>one in the morning and one at night</strong>. "
    "Can be taken with or without food.</p>"
)

F["collapsible_row_ebkAhH"]["settings"]["heading"] = "How is this better than a standard magnesium supplement?"
F["collapsible_row_ebkAhH"]["settings"]["row_content"] = (
    "<p>Standard magnesium supplements use one form — usually oxide or citrate — and under-dose at 200–400mg. "
    "They hit one system and stop there.<br/><br/>"
    "Romira™ Magnesium Complex delivers <strong>1000mg across 8 distinct forms</strong>. Each form targets a "
    "different mechanism: absorption speed, nervous system calm, energy production, heart health, blood sugar "
    "regulation, and cellular repair. When cortisol has depleted your magnesium across multiple systems, "
    "you need more than one form to restore balance.</p>"
)

F["collapsible_row_tm8Eeq"]["settings"]["heading"] = "Are there any side effects?"
F["collapsible_row_tm8Eeq"]["settings"]["row_content"] = (
    "<p>Magnesium Complex is well-tolerated by most people. Some users notice <strong>loose stools</strong> "
    "in the first few days — this is normal as your body adjusts and typically fades within a week. "
    "If this happens, try taking with food or reducing to 1 capsule initially before building up to the full dose.</p>"
)

F["collapsible_row_NPQ4qE"]["settings"]["heading"] = "Why do I have high cortisol and how does magnesium help?"
F["collapsible_row_NPQ4qE"]["settings"]["row_content"] = (
    "<p>Cortisol is your body's primary stress hormone. When stress is chronic — work pressure, sleep "
    "deprivation, poor diet, overtraining — cortisol stays elevated around the clock. Elevated cortisol "
    "<strong>depletes magnesium</strong>, causes <strong>insomnia</strong>, triggers <strong>fat storage</strong> "
    "(especially belly fat), and creates a cycle that is very hard to break on its own.<br/><br/>"
    "Magnesium directly suppresses cortisol production and supports the HPA axis — the system that regulates "
    "your stress response. By replenishing magnesium at a therapeutic dose across 8 forms, you give your body "
    "the raw material to lower cortisol naturally and restore normal sleep and metabolic function.</p>"
)

F["collapsible_row_CCdcBB"]["settings"]["heading"] = "Is it safe to take with medications?"
F["collapsible_row_CCdcBB"]["settings"]["row_content"] = (
    "<p>If you are currently taking medications for <strong>blood pressure, diabetes, thyroid, or sleep</strong>, "
    "or if you are <strong>pregnant or nursing</strong>, please consult your healthcare provider before use. "
    "Magnesium may interact with certain antibiotics and medications. Always follow the recommended dose.</p>"
)

# ════════════════════════════════════════════════════════════════════════════
# 9. TESTIMONIALS — fix lamp review + update all for cortisol angle
# ════════════════════════════════════════════════════════════════════════════
T = S["ss_testimonial_12_9CRp6L"]["blocks"]

T["slide_Bz48Dx"]["settings"]["text"] = (
    "<p><strong>I was waking up at 3am every single night with my heart racing and my mind going. "
    "Two weeks in and I sleep through. I genuinely didn't think a supplement could do this.</strong></p>"
)
T["slide_Bz48Dx"]["settings"]["author"] = "<p><strong>— Sarah M.</strong></p>"

T["slide_xp6nB4"]["settings"]["text"] = (
    "<p><strong>My doctor told me my cortisol was through the roof and to 'reduce stress.' Not exactly "
    "actionable. This actually helped. Sleep is deeper, I'm less snappy, and I've lost 4lbs without "
    "changing anything else.</strong></p>"
)
T["slide_xp6nB4"]["settings"]["author"] = "<p><strong>— James T.</strong></p>"

T["slide_jjfaW4"]["settings"]["text"] = (
    "<p><strong>I thought the weight gain was just aging. Turns out it was cortisol. Three months on "
    "Romira Magnesium and my sleep is fixed, my stress is manageable, and the belly fat is finally shifting.</strong></p>"
)
T["slide_jjfaW4"]["settings"]["author"] = "<p><strong>— Rachel K.</strong></p>"

T["slide_ahGkPp"]["settings"]["text"] = (
    "<p><strong>I've tried every sleep supplement on the market. This is the only thing that works "
    "without leaving me groggy. It feels like my nervous system finally turned off the alarm.</strong></p>"
)
T["slide_ahGkPp"]["settings"]["author"] = "<p><strong>— Nour A.</strong></p>"

T["slide_ix8Hnj"]["settings"]["text"] = (
    "<p><strong>Six months of bad sleep and I was running on cortisol and caffeine. After 10 days on "
    "this, I'm sleeping 7 hours straight. I feel like a completely different person.</strong></p>"
)
T["slide_ix8Hnj"]["settings"]["author"] = "<p><strong>— Lisa B.</strong></p>"

S["ss_testimonial_12_9CRp6L"]["settings"]["heading"] = "<h2><strong>Real People. Real Results.</strong></h2>"

# ════════════════════════════════════════════════════════════════════════════
# PUSH TEMPLATE
# ════════════════════════════════════════════════════════════════════════════
payload = {"asset": {"key": "templates/product.mag-2.json", "value": json.dumps(template)}}
r = requests.put(f"{BASE}/themes/{THEME_ID}/assets.json", headers=HEADERS, json=payload)
print(f"Template update: {r.status_code}")
if r.status_code not in (200, 201):
    print(r.text[:500])

# ════════════════════════════════════════════════════════════════════════════
# PUSH PRODUCT (body_html + title + tags)
# ════════════════════════════════════════════════════════════════════════════
product_payload = {
    "product": {
        "id": PRODUCT_ID,
        "title": "Romira Magnesium Complex",
        "tags": "magnesium, cortisol, sleep, stress, weight gain, magnesium complex, capsule, supplement",
        "product_type": "Supplement",
        "body_html": (
            "<p><strong>Stop Fighting Your Own Cortisol.</strong></p>"
            "<p>If you can't sleep, can't switch off, and can't shift the weight no matter what you try — "
            "the problem isn't willpower. It's cortisol.</p>"
            "<p>Chronic stress keeps cortisol elevated around the clock. High cortisol depletes your magnesium. "
            "Low magnesium makes cortisol worse. And around it goes — until you fix the foundation.</p>"
            "<p><strong>Romira Magnesium Complex</strong> delivers <strong>1000mg of magnesium across 8 distinct forms</strong> "
            "in every serving — each targeting a different part of the system cortisol has damaged:</p>"
            "<ul>"
            "<li><strong>Glycinate</strong> — calms the nervous system and supports deep sleep</li>"
            "<li><strong>Malate</strong> — restores energy production and fights fatigue</li>"
            "<li><strong>Taurate</strong> — regulates blood sugar and cardiovascular stress</li>"
            "<li><strong>Citrate</strong> — rapidly replenishes depleted magnesium stores</li>"
            "<li><strong>Carbonate</strong> — gentle absorption and muscle relaxation</li>"
            "<li><strong>Aspartate</strong> — cellular energy and physical recovery</li>"
            "<li><strong>Orotate</strong> — deep cellular repair and heart resilience</li>"
            "<li><strong>Oxide</strong> — high elemental magnesium load and digestive support</li>"
            "</ul>"
            "<p><strong>2 veggie capsules. 1000mg. 8 forms. 45 servings per bottle.</strong><br/>"
            "No sugar. No fillers. No melatonin. Just the magnesium your body has been missing.</p>"
        )
    }
}
r2 = requests.put(f"{BASE}/products/{PRODUCT_ID}.json", headers=HEADERS, json=product_payload)
print(f"Product update: {r2.status_code}")
if r2.status_code not in (200, 201):
    print(r2.text[:500])
else:
    p = r2.json()["product"]
    print(f"Title: {p['title']}")
    print(f"Tags: {p['tags']}")
    print("Done.")
