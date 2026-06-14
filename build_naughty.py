# -*- coding: utf-8 -*-
import json, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

t = json.loads(open('tmp_def_product.json', encoding='utf-8').read())

R = {
"/sections/main/blocks/reviews_8UgFbe/settings/text_1":
 "<p>\"Wore it out and everyone wanted a closer look — then everyone started laughing. Best conversation-starter I own. The rainbow bezel is blinding in the best way.\"</p>",
"/sections/main/blocks/reviews_8UgFbe/settings/text_2":
 "<p>\"Bought it as a gag gift for my boyfriend and now he refuses to take it off. Looks way more expensive than it was. The colored stones catch the light from across the room.\"</p>",
"/sections/main/blocks/reviews_8UgFbe/settings/text_3":
 "<p>\"Iced-out, cheeky, and honestly really well made. The bracelet is solid, the bezel sparkles, and the dial gets a reaction every single time. Zero regrets.\"</p>",
"/sections/main/blocks/de158e68-5d0d-4819-a625-e2dabdff87d1/settings/content":
 "<p><strong>What's actually on the dial?</strong><br/>The hour markers are a playful set of cheeky figures instead of numbers — a fun, adults-only twist that makes this watch a guaranteed conversation starter.</p>"
 "<p><strong>What colors does it come in?</strong><br/>Four dial colors: Ocean Blue, Hot Pink, Tiffany Turquoise, and Classic White — each framed by a rainbow crystal bezel.</p>"
 "<p><strong>Is it good quality?</strong><br/>Yes. Solid stainless-steel oyster-style bracelet, multi-color crystal bezel, and a smooth precision movement. Built to be worn, not just shown off.</p>"
 "<p><strong>What is your return policy?</strong><br/>Full 30-day money-back guarantee. Not happy? Email Support@Prestigetiming.com and we'll sort it out, no hassle.</p>"
 "<p><strong>Does it come in a gift box?</strong><br/>Yes — ships in a premium presentation box. The perfect (slightly cheeky) gift, ready to give straight away.</p>",

"/sections/8beb6911-28c6-482c-976a-e5421ad3e8df/blocks/template--21507361800487__8beb6911-28c6-482c-976a-e5421ad3e8df-heading-1/settings/heading":
 "BOLD. ICED. UNAPOLOGETIC.",
"/sections/8beb6911-28c6-482c-976a-e5421ad3e8df/blocks/template--21507361800487__8beb6911-28c6-482c-976a-e5421ad3e8df-richtext-1/settings/text":
 "<p>A watch with a sense of humor and serious sparkle. Naughty O'Clock is built to get noticed — and to make people smile when they look twice.</p>",
"/sections/8beb6911-28c6-482c-976a-e5421ad3e8df/blocks/template--21507361800487__8beb6911-28c6-482c-976a-e5421ad3e8df-icon_with_text-1/settings/title":
 "Rainbow Crystal Bezel",
"/sections/8beb6911-28c6-482c-976a-e5421ad3e8df/blocks/template--21507361800487__8beb6911-28c6-482c-976a-e5421ad3e8df-icon_with_text-1/settings/text":
 "<p>A full ring of multi-colored baguette crystals plus iced-out lugs. Blinding shine from every angle.</p>",
"/sections/8beb6911-28c6-482c-976a-e5421ad3e8df/blocks/template--21507361800487__8beb6911-28c6-482c-976a-e5421ad3e8df-icon_with_text-3/settings/title":
 "Cheeky Statement Dial",
"/sections/8beb6911-28c6-482c-976a-e5421ad3e8df/blocks/template--21507361800487__8beb6911-28c6-482c-976a-e5421ad3e8df-icon_with_text-3/settings/text":
 "<p>Playful adults-only figures replace the numbers. The ultimate ice-breaker on your wrist.</p>",
"/sections/8beb6911-28c6-482c-976a-e5421ad3e8df/blocks/template--21507361800487__8beb6911-28c6-482c-976a-e5421ad3e8df-icon_with_text-4/settings/title":
 "4 Dial Colors",
"/sections/8beb6911-28c6-482c-976a-e5421ad3e8df/blocks/template--21507361800487__8beb6911-28c6-482c-976a-e5421ad3e8df-icon_with_text-4/settings/text":
 "<p>Ocean Blue, Hot Pink, Tiffany Turquoise or Classic White — pick your vibe.</p>",

"/sections/4fc05ee5-1c30-4863-b88f-81cb6fa7c41a/blocks/template--21507361800487__4fc05ee5-1c30-4863-b88f-81cb6fa7c41a-icon-1/settings/title":
 "A Watch With Attitude",
"/sections/4fc05ee5-1c30-4863-b88f-81cb6fa7c41a/blocks/template--21507361800487__4fc05ee5-1c30-4863-b88f-81cb6fa7c41a-icon-1/settings/text":
 "<p>This isn't a quiet, play-it-safe watch. It's loud, fun, and a little bit naughty — for people who don't take life too seriously.</p>",
"/sections/4fc05ee5-1c30-4863-b88f-81cb6fa7c41a/blocks/template--21507361800487__4fc05ee5-1c30-4863-b88f-81cb6fa7c41a-icon-2/settings/title":
 "Built To Get Noticed",
"/sections/4fc05ee5-1c30-4863-b88f-81cb6fa7c41a/blocks/template--21507361800487__4fc05ee5-1c30-4863-b88f-81cb6fa7c41a-icon-2/settings/text":
 "<p>Rainbow crystal bezel, iced lugs, heavy steel bracelet. It catches light — and eyes — from across any room.</p>",
"/sections/4fc05ee5-1c30-4863-b88f-81cb6fa7c41a/blocks/template--21507361800487__4fc05ee5-1c30-4863-b88f-81cb6fa7c41a-icon-3/settings/text":
 "<p>We don't sell pieces we wouldn't wear ourselves. Every Naughty O'Clock is checked for bezel setting, bracelet feel, and finishing before it ships.</p>",
"/sections/4fc05ee5-1c30-4863-b88f-81cb6fa7c41a/blocks/template--21507361800487__4fc05ee5-1c30-4863-b88f-81cb6fa7c41a-heading-1/settings/title":
 "Why Everyone's Talking About Naughty O'Clock",
"/sections/4fc05ee5-1c30-4863-b88f-81cb6fa7c41a/blocks/template--21507361800487__4fc05ee5-1c30-4863-b88f-81cb6fa7c41a-text-1/settings/text":
 "<p>Some watches tell time. This one tells everyone exactly what kind of person you are — fun, confident, and impossible to ignore. The cheeky dial gets the laugh, the rainbow crystal bezel gets the stares, and the heavy steel build gets the respect.</p>"
 "<p>Available in four bold dial colors, each wrapped in a full multi-color crystal bezel with iced-out lugs. It's the gift that gets the biggest reaction at every party, and the watch that never leaves your wrist once you put it on. Bold, blingy, and just the right amount of naughty.</p>",
"/sections/4fc05ee5-1c30-4863-b88f-81cb6fa7c41a/blocks/template--21507361800487__4fc05ee5-1c30-4863-b88f-81cb6fa7c41a-button-1/settings/button_label":
 "Grab Yours — Save $200 Today",

"/sections/55bd100e-3bbd-426c-a5cf-eed7b2a3706f/blocks/template--21507361800487__55bd100e-3bbd-426c-a5cf-eed7b2a3706f-column-1/settings/title":
 "\"Best conversation starter I own\"",
"/sections/55bd100e-3bbd-426c-a5cf-eed7b2a3706f/blocks/template--21507361800487__55bd100e-3bbd-426c-a5cf-eed7b2a3706f-column-1/settings/text":
 "<p>Wore it out and everyone wanted a closer look — then everyone started laughing. The rainbow bezel is blinding in the best way and the dial gets a reaction every single time.</p>",
"/sections/55bd100e-3bbd-426c-a5cf-eed7b2a3706f/blocks/template--21507361800487__55bd100e-3bbd-426c-a5cf-eed7b2a3706f-column-2/settings/title":
 "\"Bought it as a gag — he won't take it off\"",
"/sections/55bd100e-3bbd-426c-a5cf-eed7b2a3706f/blocks/template--21507361800487__55bd100e-3bbd-426c-a5cf-eed7b2a3706f-column-2/settings/text":
 "<p>Got it as a cheeky gift for my boyfriend and now it's his favorite watch. Looks way more expensive than it was. The colored stones catch the light from across the room.</p>",
"/sections/55bd100e-3bbd-426c-a5cf-eed7b2a3706f/blocks/template--21507361800487__55bd100e-3bbd-426c-a5cf-eed7b2a3706f-column-3/settings/text":
 "<p>Iced-out, cheeky, and honestly really well made. The bracelet is solid, the bezel sparkles, and the dial gets a reaction every time. Zero regrets and worth every cent.</p>",

"/sections/collapsible_content_WK36AG/blocks/collapsible_row_wcnJBJ/settings/heading":
 "What's on the dial?",
"/sections/collapsible_content_WK36AG/blocks/collapsible_row_wcnJBJ/settings/row_content":
 "<p>Playful adults-only figures stand in for the hour markers — a cheeky twist that makes this the ultimate conversation-starter watch.</p>",
}

def setp(obj, path, val):
    parts=[p for p in path.split('/') if p]
    cur=obj
    for p in parts[:-1]: cur=cur[p]
    cur[parts[-1]]=val

miss=[]
for p,v in R.items():
    try: setp(t,p,v)
    except Exception as e: miss.append((p,str(e)))
print("APPLIED:",len(R)-len(miss),"/",len(R))
for m in miss: print("MISS:",m)
open('tmp_naughty_template.json','w',encoding='utf-8').write(json.dumps(t,ensure_ascii=False,indent=2))
print("written tmp_naughty_template.json")
