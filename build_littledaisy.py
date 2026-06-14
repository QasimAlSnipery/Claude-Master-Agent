# -*- coding: utf-8 -*-
import json, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

t = json.loads(open('tmp_panda_product.json', encoding='utf-8').read())

# path -> new value  (only panda-specific copy; layout/settings untouched)
R = {
# --- main: inline reviews ---
"/sections/main/blocks/reviews_8UgFbe/settings/text_1":
 "<p>\"This is unlike anything else I own. The tourbillon actually spins on the dial and people cannot stop staring. The daisy and the little rose-gold dragon are insane in person. Feels like wearing a piece of art.\"</p>",
"/sections/main/blocks/reviews_8UgFbe/settings/text_2":
 "<p>\"Bought it as a statement piece and it delivered. The 47mm case has real presence, the stone-set bezel throws light everywhere, and the 'The World Is Mine' engraving on the back is such a nice touch. Pure G-DRAGON energy.\"</p>",
"/sections/main/blocks/reviews_8UgFbe/settings/text_3":
 "<p>\"Arrived in a beautiful presentation box. The detailing is next level for the price — the dragon, the daisy time display, the colored accents. I have spent way more on watches that got far less attention than this one.\"</p>",
"/sections/main/blocks/de158e68-5d0d-4819-a625-e2dabdff87d1/settings/content":
 "<p><strong>What powers this watch?</strong><br/>The Little Daisy is built around a mechanical movement showcasing a double-axis flying tourbillon display — the spinning centerpiece you see revolving on the dial. It is wound by the natural motion of your wrist.</p>"
 "<p><strong>What are the stones on the case and dial?</strong><br/>The piece is set with 172 baguette-cut crystal stones and 142 colored sapphire-style accents, arranged around the signature daisy motif and the rose-gold dragon — inspired by the Jacob &amp; Co. x G-DRAGON design.</p>"
 "<p><strong>What does the caseback say?</strong><br/>The case back carries the engraved statement \"The World Is Mine\" — G-DRAGON's signature line.</p>"
 "<p><strong>What is your return policy?</strong><br/>Full 30-day money-back guarantee. If you are not completely satisfied, email Support@Prestigetiming.com and we will arrange a hassle-free return.</p>"
 "<p><strong>Does it come in a gift box?</strong><br/>Yes. Every Prestige piece ships in a premium luxury presentation box — ready to gift straight from the package.</p>",

# --- custom-columns: CRAFTED WITH PRECISION ---
"/sections/8beb6911-28c6-482c-976a-e5421ad3e8df/blocks/template--21507361800487__8beb6911-28c6-482c-976a-e5421ad3e8df-heading-1/settings/heading":
 "A UNIVERSE ON YOUR WRIST",
"/sections/8beb6911-28c6-482c-976a-e5421ad3e8df/blocks/template--21507361800487__8beb6911-28c6-482c-976a-e5421ad3e8df-richtext-1/settings/text":
 "<p>Not just a watch — an entire universe on your wrist. Every gemstone, every symbol, every detail reflects G-DRAGON's vision: bold, playful, unmistakably his.</p>",
"/sections/8beb6911-28c6-482c-976a-e5421ad3e8df/blocks/template--21507361800487__8beb6911-28c6-482c-976a-e5421ad3e8df-icon_with_text-1/settings/title":
 "Double-Axis Flying Tourbillon",
"/sections/8beb6911-28c6-482c-976a-e5421ad3e8df/blocks/template--21507361800487__8beb6911-28c6-482c-976a-e5421ad3e8df-icon_with_text-1/settings/text":
 "<p>A flying tourbillon revolves around a turquoise Earth while a rose-gold dragon circles beside it. Mesmerizing in motion.</p>",
"/sections/8beb6911-28c6-482c-976a-e5421ad3e8df/blocks/template--21507361800487__8beb6911-28c6-482c-976a-e5421ad3e8df-icon_with_text-3/settings/title":
 "172 Stones, 142 Accents",
"/sections/8beb6911-28c6-482c-976a-e5421ad3e8df/blocks/template--21507361800487__8beb6911-28c6-482c-976a-e5421ad3e8df-icon_with_text-3/settings/text":
 "<p>172 baguette-cut crystal stones and 142 colored sapphire-style accents catch light from every angle.</p>",
"/sections/8beb6911-28c6-482c-976a-e5421ad3e8df/blocks/template--21507361800487__8beb6911-28c6-482c-976a-e5421ad3e8df-icon_with_text-4/settings/title":
 "47mm Statement Case",
"/sections/8beb6911-28c6-482c-976a-e5421ad3e8df/blocks/template--21507361800487__8beb6911-28c6-482c-976a-e5421ad3e8df-icon_with_text-4/settings/text":
 "<p>A bold 47mm case engraved on the back with \"The World Is Mine\" — full wrist presence, zero apology.</p>",

# --- icons-with-content: Why collectors choose ---
"/sections/4fc05ee5-1c30-4863-b88f-81cb6fa7c41a/blocks/template--21507361800487__4fc05ee5-1c30-4863-b88f-81cb6fa7c41a-icon-1/settings/title":
 "A Collaboration That Broke The Rules",
"/sections/4fc05ee5-1c30-4863-b88f-81cb6fa7c41a/blocks/template--21507361800487__4fc05ee5-1c30-4863-b88f-81cb6fa7c41a-icon-1/settings/text":
 "<p>Inspired by the Jacob &amp; Co. x G-DRAGON \"Little Daisy\" — where haute horlogerie meets K-pop's boldest icon. A daisy time display, his signature, a dragon, and a spinning tourbillon.</p>",
"/sections/4fc05ee5-1c30-4863-b88f-81cb6fa7c41a/blocks/template--21507361800487__4fc05ee5-1c30-4863-b88f-81cb6fa7c41a-icon-2/settings/title":
 "Engineered To Be Watched",
"/sections/4fc05ee5-1c30-4863-b88f-81cb6fa7c41a/blocks/template--21507361800487__4fc05ee5-1c30-4863-b88f-81cb6fa7c41a-icon-2/settings/text":
 "<p>The double-axis flying tourbillon turns on two planes at once — alive on the wrist. This is wrist theater, not just time-telling.</p>",
"/sections/4fc05ee5-1c30-4863-b88f-81cb6fa7c41a/blocks/template--21507361800487__4fc05ee5-1c30-4863-b88f-81cb6fa7c41a-icon-3/settings/text":
 "<p>We don't sell pieces we wouldn't wear ourselves. Every Little Daisy is hand-checked against strict criteria for movement, stone-setting, and finishing before it ships.</p>",
"/sections/4fc05ee5-1c30-4863-b88f-81cb6fa7c41a/blocks/template--21507361800487__4fc05ee5-1c30-4863-b88f-81cb6fa7c41a-heading-1/settings/title":
 "Why Collectors Want The Little Daisy",
"/sections/4fc05ee5-1c30-4863-b88f-81cb6fa7c41a/blocks/template--21507361800487__4fc05ee5-1c30-4863-b88f-81cb6fa7c41a-text-1/settings/text":
 "<p>\"The World Is Mine.\" Four words engraved on the caseback that capture everything G-DRAGON stands for. This is not a watch you buy to tell time — it is a watch you wear to tell the world exactly who you are.</p>"
 "<p>A double-axis flying tourbillon revolves around a turquoise Earth. A rose-gold dragon circles beside it. The hours are read through a daisy shaped after GD's signature flower, framed by 172 baguette-cut stones and 142 colored accents across a bold 47mm case. Every symbol is deliberate. Every detail is loud on purpose. This is a wearable work of art for the person who refuses to blend in.</p>",
"/sections/4fc05ee5-1c30-4863-b88f-81cb6fa7c41a/blocks/template--21507361800487__4fc05ee5-1c30-4863-b88f-81cb6fa7c41a-button-1/settings/button_label":
 "Claim The Little Daisy — Save $200 Today",

# --- testimonials ---
"/sections/55bd100e-3bbd-426c-a5cf-eed7b2a3706f/blocks/template--21507361800487__55bd100e-3bbd-426c-a5cf-eed7b2a3706f-column-1/settings/title":
 "\"It's a whole universe on my wrist\"",
"/sections/55bd100e-3bbd-426c-a5cf-eed7b2a3706f/blocks/template--21507361800487__55bd100e-3bbd-426c-a5cf-eed7b2a3706f-column-1/settings/text":
 "<p>This is unlike anything else I own. The tourbillon actually spins and people cannot stop staring. The daisy and the rose-gold dragon are insane in person. Pure G-DRAGON energy on the wrist.</p>",
"/sections/55bd100e-3bbd-426c-a5cf-eed7b2a3706f/blocks/template--21507361800487__55bd100e-3bbd-426c-a5cf-eed7b2a3706f-column-2/settings/title":
 "\"The World Is Mine — exactly\"",
"/sections/55bd100e-3bbd-426c-a5cf-eed7b2a3706f/blocks/template--21507361800487__55bd100e-3bbd-426c-a5cf-eed7b2a3706f-column-2/settings/text":
 "<p>Bought it as a statement piece and it delivered. The 47mm case has real presence, the stone-set bezel throws light everywhere, and the engraving on the back is such a nice touch. Gets noticed every single time.</p>",
"/sections/55bd100e-3bbd-426c-a5cf-eed7b2a3706f/blocks/template--21507361800487__55bd100e-3bbd-426c-a5cf-eed7b2a3706f-column-3/settings/text":
 "<p>Arrived in a beautiful presentation box. The detailing is next level for the price — the dragon, the daisy display, the colored accents. I have spent far more on watches that got far less attention than this one.</p>",

# --- collapsible FAQ ---
"/sections/collapsible_content_WK36AG/blocks/collapsible_row_wcnJBJ/settings/heading":
 "What powers the Little Daisy?",
"/sections/collapsible_content_WK36AG/blocks/collapsible_row_wcnJBJ/settings/row_content":
 "<p>A mechanical movement showcasing a double-axis flying tourbillon that revolves on the dial, wound by the motion of your wrist.</p>",
}

def setp(obj, path, val):
    parts = [p for p in path.split('/') if p]
    cur = obj
    for p in parts[:-1]:
        cur = cur[p]
    cur[parts[-1]] = val

missing = []
for path, val in R.items():
    try:
        setp(t, path, val)
    except Exception as e:
        missing.append((path, str(e)))

print("APPLIED:", len(R) - len(missing), "/", len(R))
for m in missing:
    print("MISSING:", m)

open('tmp_littledaisy_template.json', 'w', encoding='utf-8').write(
    json.dumps(t, ensure_ascii=False, indent=2))
print("template written: tmp_littledaisy_template.json")
