# -*- coding: utf-8 -*-
import os, json, base64, urllib.request

DIR = r'C:\Users\Darin Game\Downloads\Telegram Desktop'
TOKEN = open('.env.local', encoding='utf-8').read()
for line in TOKEN.splitlines():
    if line.startswith('SHOPIFY_PRESTIGE_TOKEN'):
        TOKEN = line.split('=', 1)[1].strip().strip('"').strip("'")
        break
BASE = 'https://iu06pd-00.myshopify.com/admin/api/2024-01'
HDR = {'X-Shopify-Access-Token': TOKEN, 'Content-Type': 'application/json'}

def api(method, path, payload=None):
    data = json.dumps(payload).encode() if payload is not None else None
    req = urllib.request.Request(BASE + path, data=data, headers=HDR, method=method)
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())

def b64(fn):
    return base64.b64encode(open(os.path.join(DIR, fn), 'rb').read()).decode()

# color -> main image, then gallery extras
color_main = {
    'Ocean Blue': 'IMG_6624.JPG',
    'Hot Pink': 'IMG_6628.JPG',
    'Tiffany Turquoise': 'IMG_6654.JPG',
    'Classic White': 'IMG_6658.JPG',
}
extras = ['IMG_6651.JPG','IMG_6657.JPG','IMG_6653.JPG','IMG_6652.JPG',
          'IMG_6648.JPG','IMG_6641.JPG','IMG_6640.JPG','IMG_6639.JPG']

specs = '''<div style="font-family: Georgia, serif; color:#1a1a1a; line-height:1.7;">
<h3 style="font-size:15px;letter-spacing:3px;text-transform:uppercase;margin-bottom:16px;">Specifications</h3>
<table style="width:100%;border-collapse:collapse;font-size:14px;"><tbody>
<tr style="border-bottom:1px solid #e8e4dc;"><td style="padding:10px 0;color:#888;width:45%;">Style</td><td style="padding:10px 0;font-weight:600;">Iced Rainbow-Bezel Statement Watch</td></tr>
<tr style="border-bottom:1px solid #e8e4dc;"><td style="padding:10px 0;color:#888;">Dial</td><td style="padding:10px 0;font-weight:600;">Cheeky adults-only figure markers</td></tr>
<tr style="border-bottom:1px solid #e8e4dc;"><td style="padding:10px 0;color:#888;">Bezel</td><td style="padding:10px 0;font-weight:600;">Multi-color crystal baguettes + iced lugs</td></tr>
<tr style="border-bottom:1px solid #e8e4dc;"><td style="padding:10px 0;color:#888;">Case &amp; Bracelet</td><td style="padding:10px 0;font-weight:600;">Stainless Steel, oyster-style bracelet</td></tr>
<tr style="border-bottom:1px solid #e8e4dc;"><td style="padding:10px 0;color:#888;">Dial Colors</td><td style="padding:10px 0;font-weight:600;">Ocean Blue, Hot Pink, Tiffany Turquoise, Classic White</td></tr>
<tr style="border-bottom:1px solid #e8e4dc;"><td style="padding:10px 0;color:#888;">Movement</td><td style="padding:10px 0;font-weight:600;">Precision Quartz</td></tr>
<tr><td style="padding:10px 0;color:#888;">Warranty</td><td style="padding:10px 0;font-weight:600;">2 Years Prestige Guarantee</td></tr>
</tbody></table><br></div>'''

# build images: main per color (tagged) + extras
images = []
for color, fn in color_main.items():
    images.append({'attachment': b64(fn), 'filename': fn, 'alt': 'Naughty O\'Clock - ' + color})
for fn in extras:
    images.append({'attachment': b64(fn), 'filename': fn})

product = {'product': {
    'title': "Naughty O'Clock Iced Rainbow Watch",
    'body_html': specs,
    'vendor': 'My Store',
    'product_type': 'Watch',
    'tags': "novelty watch, gag gift, iced out watch, rainbow watch, statement watch, gift for him, funny gift",
    'status': 'active',
    'template_suffix': 'naughty-oclock',
    'options': [{'name': 'Dial Color', 'values': list(color_main.keys())}],
    'variants': [
        {'option1': c, 'price': '299.00', 'inventory_management': 'shopify'}
        for c in color_main.keys()
    ],
    'images': images,
}}

res = api('POST', '/products.json', product)
p = res['product']
pid = p['id']
print('PRODUCT CREATED id', pid, '| handle', p['handle'], '| status', p['status'])

# map variant option1 -> variant id + inventory_item_id
variants = {v['option1']: v for v in p['variants']}
# map filename(alt color) -> image id  (variant main images were first 4 with alt)
img_by_alt = {}
for im in p['images']:
    if im.get('alt'):
        img_by_alt[im['alt']] = im['id']

# attach variant images
for color, v in variants.items():
    alt = "Naughty O'Clock - " + color
    img_id = img_by_alt.get(alt)
    if img_id:
        api('PUT', '/variants/%d.json' % v['id'], {'variant': {'id': v['id'], 'image_id': img_id}})
print('variant images linked')

# set inventory 500 each at location
LOC = 112382312741
for color, v in variants.items():
    api('POST', '/inventory_levels/set.json', {
        'location_id': LOC,
        'inventory_item_id': v['inventory_item_id'],
        'available': 500,
    })
    print('  stock 500 ->', color)

print('NAUGHTY DONE')
print('admin: https://iu06pd-00.myshopify.com/admin/products/%d' % pid)
print('url: https://prestigetiming.com/products/%s' % p['handle'])
