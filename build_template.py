import json

with open("roly-watch-template.json", "r", encoding="utf-8-sig") as f:
    t = json.loads(f.read())

s = t["sections"]

# 1. PRICE BADGE
s["main"]["blocks"]["price"]["settings"]["custom_badge_text"] = "[icon_1] LIMITED EDITION — SAVE $400"

# 2. INLINE REVIEWS
rev = s["main"]["blocks"]["reviews_8UgFbe"]["settings"]
rev["author_1"] = "<strong>Daniel R.</strong>, Miami — <em>Verified Buyer</em> [stars]"
rev["text_1"] = "<p>\"I've owned titanium and steel watches for years. The moment I put on the Carbon Fiber from Prestige, I couldn't go back. It's lighter, stiffer, and the texture under light is unlike anything else on the wrist. Worth every dollar.\"</p>"
rev["author_2"] = "<strong>Khalid M.</strong>, Dubai — <em>Verified Buyer</em> [stars]"
rev["text_2"] = "<p>\"Carbon fiber is used in F1 cars and fighter jets. Having that same material on a watch at this price is insane value. The build quality is exceptional. I've had it on every day since it arrived.\"</p>"
rev["author_3"] = "<strong>Thomas B.</strong>, London — <em>Verified Buyer</em> [stars]"
rev["text_3"] = "<p>\"My colleagues asked if it was a 3000 dollar watch. The carbon fiber case is genuinely rigid and the movement is smooth. Prestige delivered something special here.\"</p>"
rev["label"] = "(418 Verified Reviews)"
rev["stars_label"] = "(418 Reviews)"

# 3. STICKY ATC stars label
s["main"]["blocks"]["e7a28cbe-03cb-4c9d-a2c4-0e3e76ffb3e5"]["settings"]["stars_label"] = "(418 Reviews)"

# 4. INLINE FAQ
faq_key = "de158e68-5d0d-4819-a625-e2dabdff87d1"
s["main"]["blocks"][faq_key]["settings"]["content"] = (
    "<p><strong>What makes forged carbon fiber different?</strong><br/>"
    "Forged carbon is compressed under extreme pressure — 5x stronger than steel at a fraction of the weight. "
    "Each case develops a unique organic marbled pattern. No two watches identical.</p>"
    "<p><strong>Is it lighter than a steel watch?</strong><br/>"
    "Significantly. Steel watch cases weigh 80-120g. This forged carbon case: under 45g total. "
    "You feel the difference the moment you put it on.</p>"
    "<p><strong>What movement powers it?</strong><br/>"
    "NH35 automatic — self-winding through wrist motion, 72-hour power reserve. No battery. Ever.</p>"
    "<p><strong>What is your return policy?</strong><br/>"
    "30-day full money-back guarantee. Contact Support@Prestigetiming.com — we arrange return at our cost.</p>"
    "<p><strong>Does it come gift-ready?</strong><br/>"
    "Every Prestige watch ships in a premium presentation box. Ready to gift straight from the package.</p>"
)

# 5. FEATURE COLUMNS
fc_key = "8beb6911-28c6-482c-976a-e5421ad3e8df"
fc = s[fc_key]

for k, v in fc["blocks"].items():
    if v["type"] == "heading":
        fc["blocks"][k]["settings"]["heading"] = "FORGED UNDER 500 TONS OF PRESSURE"
    if v["type"] == "richtext":
        fc["blocks"][k]["settings"]["text"] = "<p>Forged carbon fiber is the same material used in Formula 1 chassis and aerospace components. We put it on your wrist — because you deserve more than steel.</p>"

icon_data = [
    ("Forged Carbon Case", "<p>Compressed under 500 tons. Stronger than steel. Lighter than titanium. Each case has a unique organic marbled pattern.</p>"),
    ("2-Year Full Warranty", "<p>Every Prestige watch backed by 2-year warranty and 30-day money-back guarantee. No conditions.</p>"),
    ("Sapphire Crystal", "<p>Anti-reflective sapphire-coated glass. Virtually scratch-proof. Same standard used by elite Swiss houses.</p>"),
    ("Swiss Automatic Movement", "<p>Self-winding NH35. 72-hour power reserve. 21,600 BPH. No battery — ever.</p>"),
]
idx = 0
for k, v in fc["blocks"].items():
    if v["type"] == "icon_with_text" and idx < 4:
        fc["blocks"][k]["settings"]["title"] = icon_data[idx][0]
        fc["blocks"][k]["settings"]["text"] = icon_data[idx][1]
        idx += 1

# 6. STORY SECTION (enable + update)
story_key = "4fc05ee5-1c30-4863-b88f-81cb6fa7c41a"
story = s[story_key]
story.pop("disabled", None)

icon_story = [
    ("Born in Formula 1", "<p>Carbon fiber entered motorsport in 1981 when McLaren built the first F1 carbon chassis. It changed racing forever. Now it's on your wrist.</p>"),
    ("Stronger. Lighter. Rarer.", "<p>5x stronger than steel. 40% lighter than titanium. Each forged carbon piece has a unique pattern — no two watches are identical.</p>"),
    ("The Prestige Standard", "<p>Every watch hand-inspected against strict criteria for movement quality, finishing, and case integrity before it ships.</p>"),
]
story_idx = 0
for k, v in story["blocks"].items():
    if v["type"] == "heading":
        story["blocks"][k]["settings"]["title"] = "Why Carbon Fiber Changes Everything"
    if v["type"] == "text":
        story["blocks"][k]["settings"]["text"] = (
            "<p>Steel is the default. Titanium is the upgrade. Carbon fiber is the obsession.</p>"
            "<p>Forged carbon fiber was developed for one purpose: maximum strength at minimum weight in environments where failure is not an option — Formula 1 cars, fighter jets, space-grade equipment. It is not a cosmetic choice. It is an engineering choice.</p>"
            "<p>At Prestige, we apply that same obsession to watchmaking. Every Luxury Forged Carbon Fiber Watch is built around a case compressed under 500 tons of pressure, finished by hand, paired with a Swiss automatic movement trusted by serious collectors worldwide.</p>"
        )
    if v["type"] == "button":
        story["blocks"][k]["settings"]["button_label"] = "Claim Your Carbon Watch — Save $400 Today"
    if v["type"] == "icon" and story_idx < 3:
        story["blocks"][k]["settings"]["title"] = icon_story[story_idx][0]
        story["blocks"][k]["settings"]["text"] = icon_story[story_idx][1]
        story_idx += 1

# 7. TESTIMONIALS
test_key = "55bd100e-3bbd-426c-a5cf-eed7b2a3706f"
test_s = s[test_key]
test_s["settings"]["title"] = "What Carbon Watch Owners Are Saying"
test_s["settings"]["text"] = "<p>Over 400 verified buyers. Real watches. Real reactions.</p>"

testimonials = [
    {
        "title": '"Lighter than anything I\'ve worn"',
        "text": "<p>I have collected watches for 12 years. The moment I put on the Prestige Carbon I stopped looking at my other pieces. The weight is extraordinary — you forget it is there. But the presence it commands is anything but forgettable.</p>",
        "author": "<strong>Daniel R.</strong> — Miami, USA",
    },
    {
        "title": '"People think I spent $3,000"',
        "text": "<p>Three different people at a dinner asked me what watch I was wearing. One guessed it was a 2500 dollar piece. The carbon fiber case and dial finish look genuinely elite. Prestige cracked the code on accessible luxury.</p>",
        "author": "<strong>Khalid M.</strong> — Dubai, UAE",
    },
    {
        "title": '"Six weeks in — not a single scratch"',
        "text": "<p>Ordered for my husband. He has been wearing it daily for 6 weeks and not one scratch. The automatic movement runs perfectly. The packaging alone looked like a luxury brand gift. Couldn't be happier.</p>",
        "author": "<strong>Sarah B.</strong> — London, UK",
    },
]

col_keys = [k for k, v in test_s["blocks"].items() if v["type"] == "column"]
for i, col_key in enumerate(col_keys[:3]):
    test_s["blocks"][col_key]["settings"]["title"] = testimonials[i]["title"]
    test_s["blocks"][col_key]["settings"]["text"] = testimonials[i]["text"]
    test_s["blocks"][col_key]["settings"]["author"] = testimonials[i]["author"]
    test_s["blocks"][col_key]["settings"]["star_rating"] = 5
    test_s["blocks"][col_key]["settings"]["verified_badge"] = True
    test_s["blocks"][col_key]["settings"]["source_label"] = "Verified Purchase"

# 8. FAQ SECTION
faq_s = s["collapsible_content_WK36AG"]
faq_s["settings"]["title"] = "Frequently Asked Questions"
faq_s["settings"]["caption"] = "Before You Order"

faq_rows = [
    ("What is forged carbon fiber?", "Forged carbon fiber is made by compressing chopped carbon strands under extreme heat and pressure — 5x stronger than steel at 40% the weight. Unlike woven carbon, each forged piece develops a unique organic marbled pattern. No two watches look identical."),
    ("How does the automatic movement work?", "The NH35 movement self-winds through the natural motion of your wrist — 21,600 beats per hour, 72-hour power reserve. No battery required. If it has been sitting for a few days, wind manually by turning the crown 20-30 times."),
    ("Is carbon fiber durable for daily wear?", "Extremely. Forged carbon is used in Formula 1 chassis for one reason: it does not fail under stress. It resists scratches, corrosion, and impact better than steel. Built for the wrist, not the display case."),
    ("What does the warranty cover?", "Full 2-year warranty on all manufacturing defects — movement failures, finishing issues, crown problems. Plus a 30-day no-questions money-back guarantee. We stand behind every watch we ship."),
    ("How fast does it ship?", "Orders dispatch within 1-2 business days. Express worldwide delivery in 5-7 business days. Every shipment tracked and insured from our facility to your door."),
]

row_keys = [k for k, v in faq_s["blocks"].items() if v["type"] == "collapsible_row"]
for i, row_key in enumerate(row_keys[:5]):
    faq_s["blocks"][row_key]["settings"]["heading"] = faq_rows[i][0]
    faq_s["blocks"][row_key]["settings"]["row_content"] = f"<p>{faq_rows[i][1]}</p>"

# SAVE
with open("roly-watch-template-modified.json", "w", encoding="utf-8") as f:
    json.dump(t, f, ensure_ascii=False, indent=2)

print("Done. File size:", len(json.dumps(t, ensure_ascii=False)), "chars")
print("Sections:", list(s.keys()))
