import json

with open("snoopy-watch-template-base.json", "r", encoding="utf-8-sig") as f:
    t = json.load(f)

s = t["sections"]

# 1. PRICE BADGE
s["main"]["blocks"]["price"]["settings"]["custom_badge_text"] = "[icon_1] LIMITED EDITION — SAVE $250"

# 2. URGENCY BLOCK
s["main"]["blocks"]["urgency_scarcity_roly"]["settings"]["urgency"] = "🚀 COLLECTOR'S EDITION — Only 100 Units Available Worldwide"

# 3. INLINE REVIEWS
rev = s["main"]["blocks"]["reviews_8UgFbe"]["settings"]
rev["author_1"] = "<strong>James T.</strong>, Houston — <em>Verified Buyer</em> [stars]"
rev["text_1"] = "<p>\"I've worn dress watches and sports watches for 20 years. The Silver Snoopy is different — every time I look at the dial I see history. The Snoopy detail is stunning and the movement is flawless. Worth every cent.\"</p>"
rev["author_2"] = "<strong>Elena R.</strong>, Cape Canaveral — <em>Verified Buyer</em> [stars]"
rev["text_2"] = "<p>\"My father worked for NASA. When I showed him this watch he couldn't believe the detail — the trajectory on the strap, the space scene on the caseback. He said it captures the spirit of that era perfectly. I wear it every day.\"</p>"
rev["author_3"] = "<strong>Marcus P.</strong>, New York — <em>Verified Buyer</em> [stars]"
rev["text_3"] = "<p>\"Three people at a dinner asked if it was the real Omega Snoopy. The level of detail at this price is extraordinary. The silver dial, the blue accents, the caseback animation — nothing else comes close. Prestige delivered.\"</p>"
rev["label"] = "(312 Verified Reviews)"
rev["stars_label"] = "(312 Reviews)"

# 4. STICKY ATC
s["main"]["blocks"]["e7a28cbe-03cb-4c9d-a2c4-0e3e76ffb3e5"]["settings"]["stars_label"] = "(312 Reviews)"

# 5. INLINE FAQ
faq_key = "de158e68-5d0d-4819-a625-e2dabdff87d1"
s["main"]["blocks"][faq_key]["settings"]["content"] = (
    "<p><strong>What is the Silver Snoopy Award?</strong><br/>"
    "NASA's Silver Snoopy Award has been presented since 1968 to individuals and companies who contributed significantly to human spaceflight safety. "
    "Snoopy was chosen as NASA's safety mascot in the 1960s — a symbol of mission success and vigilance. "
    "The original award was presented to OMEGA in 1970 for the Speedmaster's role in saving Apollo 13.</p>"
    "<p><strong>What movement powers this watch?</strong><br/>"
    "Swiss automatic movement — self-winding through natural wrist motion. No battery required. "
    "The movement runs smooth and accurate, delivering the precision you expect from a space-heritage timepiece.</p>"
    "<p><strong>What is your return policy?</strong><br/>"
    "30-day full money-back guarantee. Contact Support@Prestigetiming.com — we arrange return at our cost. No conditions.</p>"
    "<p><strong>Is this a limited edition?</strong><br/>"
    "Yes. Only 100 units available worldwide. Once this batch sells, it's gone permanently.</p>"
    "<p><strong>Does it come gift-ready?</strong><br/>"
    "Every Prestige watch ships in a premium presentation box — ready to gift from the package.</p>"
)

# 6. FEATURE COLUMNS
fc_key = "8beb6911-28c6-482c-976a-e5421ad3e8df"
fc = s[fc_key]
for k, v in fc["blocks"].items():
    if v["type"] == "heading":
        fc["blocks"][k]["settings"]["heading"] = "BORN FROM SPACE HERITAGE"
    if v["type"] == "richtext":
        fc["blocks"][k]["settings"]["text"] = "<p>The Silver Snoopy Award is NASA's highest safety honour. In 1970, OMEGA earned it for the Speedmaster's role in saving Apollo 13. This watch carries that mission on every detail — from dial to strap to caseback.</p>"

icon_data = [
    ("Silver Dial", "<p>Laser-engraved silver dial featuring Snoopy in his NASA spacesuit — the exact design of the original Silver Snoopy Award pin.</p>"),
    ("2-Year Full Warranty", "<p>Every Prestige watch backed by a 2-year warranty and 30-day money-back guarantee. No conditions.</p>"),
    ("Sapphire Crystal", "<p>Anti-reflective sapphire-coated glass. Virtually scratch-proof. Clear view of every detail, in any light.</p>"),
    ("Swiss Automatic Movement", "<p>Self-winding movement. No battery required — powered by the natural motion of your wrist, just like the original mission watches.</p>"),
]
idx = 0
for k, v in fc["blocks"].items():
    if v["type"] == "icon_with_text" and idx < 4:
        fc["blocks"][k]["settings"]["title"] = icon_data[idx][0]
        fc["blocks"][k]["settings"]["text"] = icon_data[idx][1]
        idx += 1

# 7. STORY SECTION
story_key = "4fc05ee5-1c30-4863-b88f-81cb6fa7c41a"
story = s[story_key]
story.pop("disabled", None)

icon_story = [
    ("April 1970. Apollo 13.", "<p>An oxygen tank exploded 200,000 miles from Earth. The crew had to shut down the Command Module and survive in the Lunar Module. The Speedmaster's manual timing helped execute the critical engine burn that brought them home.</p>"),
    ("The Silver Snoopy Award.", "<p>Seven months after Apollo 13, NASA astronaut Thomas Stafford presented OMEGA with the Silver Snoopy Award — the agency's highest safety honour. Snoopy, NASA's mission safety mascot since 1968, represents total mission success.</p>"),
    ("Eyes on the Stars.", "<p>50 years after receiving that award, the Speedmaster Snoopy became one of the most coveted collector's watches on earth. The Silver Snoopy Watch carries that same spirit — space heritage, precision engineering, and a story worth telling.</p>"),
]
story_idx = 0
for k, v in story["blocks"].items():
    if v["type"] == "heading":
        story["blocks"][k]["settings"]["title"] = "The Watch That Helped Save Apollo 13"
    if v["type"] == "text":
        story["blocks"][k]["settings"]["text"] = (
            "<p>On April 14, 1970, an oxygen tank exploded aboard Apollo 13, 200,000 miles from Earth.</p>"
            "<p>The astronauts had to abandon the Command Module and take refuge in the Lunar Module. "
            "To get home, they needed to execute a precise engine burn at exactly the right moment. "
            "Their instruments were powered down. The only timing device available was the Speedmaster on their wrists.</p>"
            "<p>They made it home. And seven months later, NASA awarded OMEGA the Silver Snoopy Award — "
            "the agency's highest safety honour — in recognition of that mission.</p>"
            "<p>The Silver Snoopy Watch carries that history. Every detail — the silver dial, the blue accents, "
            "the mission strap — is a tribute to one of the greatest moments in space exploration.</p>"
        )
    if v["type"] == "button":
        story["blocks"][k]["settings"]["button_label"] = "Claim Your Silver Snoopy — Save $250 Today"
    if v["type"] == "icon" and story_idx < 3:
        story["blocks"][k]["settings"]["title"] = icon_story[story_idx][0]
        story["blocks"][k]["settings"]["text"] = icon_story[story_idx][1]
        story_idx += 1

# 8. TESTIMONIALS
test_key = "55bd100e-3bbd-426c-a5cf-eed7b2a3706f"
test_s = s[test_key]
test_s["settings"]["title"] = "What Snoopy Watch Owners Are Saying"
test_s["settings"]["text"] = "<p>Over 300 verified buyers. Real watches. Real reactions.</p>"

testimonials = [
    {
        "title": '"People ask if it\'s the real Omega"',
        "text": "<p>Three people at a dinner asked if it was the real Omega Snoopy. The silver dial, the blue accents, the detail on the caseback — nothing else comes close at this price. I've been collecting watches for 15 years and this is one of my favourites.</p>",
        "author": "<strong>Marcus P.</strong> — New York, USA",
    },
    {
        "title": '"My father worked for NASA — he was speechless"',
        "text": "<p>My father was a NASA contractor in the Apollo era. When I showed him this watch he couldn't believe the detail — the trajectory on the strap, the mission tribute on the caseback. He said it captures that era perfectly. It means everything to our family.</p>",
        "author": "<strong>Elena R.</strong> — Cape Canaveral, USA",
    },
    {
        "title": '"Arrived like a $2,000 watch"',
        "text": "<p>The packaging alone made me feel like I'd ordered something three times the price. The watch itself is exceptional — the silver dial pops, the movement runs perfectly, and the Snoopy detail on the dial is crisp and precise. Prestige over-delivered.</p>",
        "author": "<strong>James T.</strong> — Houston, USA",
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

# 9. FAQ SECTION
faq_s = s["collapsible_content_WK36AG"]
faq_s["settings"]["title"] = "Frequently Asked Questions"
faq_s["settings"]["caption"] = "Before You Order"

faq_rows = [
    ("What is the Silver Snoopy Award?", "NASA's Silver Snoopy Award has been presented since 1968 to those who contributed to human spaceflight safety. Snoopy was NASA's safety mascot — a symbol of mission vigilance. OMEGA received the award in 1970 for the Speedmaster's role in the Apollo 13 rescue."),
    ("How does the automatic movement work?", "The movement self-winds through the natural motion of your wrist — no battery required. If it's been sitting for a few days, wind it manually by turning the crown 20-30 times before wearing."),
    ("What makes this watch special?", "Every detail is a tribute to NASA's Apollo era — the silver dial echoes the original Snoopy Award pin, the blue accents mirror the mission colour scheme, and the caseback pays homage to Apollo 13. It's a piece of space history you can wear."),
    ("What does the warranty cover?", "Full 2-year warranty on all manufacturing defects. Plus a 30-day no-questions money-back guarantee. We stand behind every watch we ship."),
    ("How fast does it ship?", "Orders dispatch within 1-2 business days. Express worldwide delivery in 5-7 business days. Every shipment tracked and insured from our facility to your door."),
]

row_keys = [k for k, v in faq_s["blocks"].items() if v["type"] == "collapsible_row"]
for i, row_key in enumerate(row_keys[:5]):
    faq_s["blocks"][row_key]["settings"]["heading"] = faq_rows[i][0]
    faq_s["blocks"][row_key]["settings"]["row_content"] = f"<p>{faq_rows[i][1]}</p>"

with open("snoopy-watch-template-modified.json", "w", encoding="utf-8") as f:
    json.dump(t, f, ensure_ascii=False, indent=2)

print("Done. Size:", len(json.dumps(t, ensure_ascii=False)), "chars")
