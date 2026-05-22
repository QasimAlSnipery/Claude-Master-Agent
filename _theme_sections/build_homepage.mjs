import { getToken } from './_token.mjs';
import { writeFileSync } from 'fs';
import https from 'https';

const TOKEN   = getToken();
const store   = '3rnv2d-i3.myshopify.com';
const themeId = '139682218059';

function apiGet(path) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: store,
      path: `/admin/api/2024-01/themes/${themeId}/${path}`,
      method: 'GET',
      headers: { 'X-Shopify-Access-Token': TOKEN }
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(JSON.parse(d)));
    });
    req.on('error', reject);
    req.end();
  });
}

// Pull current index to preserve trustpilot blocks + featured collection
const cur      = (await apiGet('assets.json?asset[key]=templates/index.json')).asset.value;
const existing = JSON.parse(cur);
const tp       = existing.sections['trustpilot_reviews_TJzz4e'];
const fc       = existing.sections['featured_collection_XNEd8y'];

// Fix trustpilot colours
tp.settings.title                       = 'What Our Customers Are Saying';
tp.settings.title_highlight_color       = '#264165';
tp.settings.custom_cards_colors_background = '#f8f9fc';

// Fix featured collection colours
fc.settings.title_highlight_color                = '#264165';
fc.settings.custom_colors_solid_button_background = '#264165';
fc.settings.custom_colors_solid_button_text       = '#ffffff';
fc.settings.custom_colors_outline_button          = '#264165';
fc.settings.padding_top    = 72;
fc.settings.padding_bottom = 72;

const template = {
  sections: {

    hero_banner_main: {
      type: 'hero-banner',
      blocks: {
        hb_caption:    { type: 'caption',      settings: { text: 'TRUSTED BY 2,300+ CUSTOMERS', tag: 'p', custom_font: false, font_size: 13, font_size_mobile: 11, text_color: '#a8bdd4', padding_top: 0, padding_bottom: 4 } },
        hb_stars:      { type: 'stars_rating',  settings: { pre_text: 'Excellent', stars_count: 5, stars_color: '#ffcc00', stars_inactive_color: 'rgba(255,255,255,0.3)', size: 20, size_mobile: 16, gap: 3, review_text: 'Based on 2,300+ verified reviews', custom_font: false, font_size: 13, font_size_mobile: 11, show_bg: true, bg_color: '#000000', bg_opacity: 30, bg_blur: false, bg_roundness: 6, bg_pad_h: 10, bg_pad_v: 5, margin_top: 0, margin_bottom: 8, text_color: '#ffffff' } },
        hb_heading:    { type: 'heading',       settings: { text: '<p><strong>The Last Supplement Your Nerves Will Ever Need</strong></p>', tag: 'h1', custom_font: false, font_size: 58, font_size_mobile: 34, padding_top: 0, padding_bottom: 0, gap_below: 16, text_color: '#ffffff', bold_color: '#ffffff' } },
        hb_text:       { type: 'text',          settings: { text: '<p>R-Alpha Lipoic Acid clinically studied to repair nerve cells from the inside out. Most supplements treat the symptoms. Romira addresses the cause.</p>', custom_font: false, font_size: 18, font_size_mobile: 16, padding_top: 0, padding_bottom: 0, text_color: '#dde8f5', bold_color: '#ffffff' } },
        hb_btn:        { type: 'button',        settings: { label: 'Shop Romira R-ALA', link: '/products/romira-r-ala', inline: false, shadow: true, font_size: 17, font_size_mobile: 15, border_radius: 50, bg_color: '#264165', text_color: '#ffffff', border_color: '#264165', padding_top: 8, padding_bottom: 8 } },
        hb_feature_1:  { type: 'feature',       settings: { text: '600mg R-ALA Per Serving',   bg_color: '#ffffff', border_color: '#ffffff', text_color: '#264165' } },
        hb_feature_2:  { type: 'feature',       settings: { text: '3rd-Party Lab Tested',       bg_color: '#ffffff', border_color: '#ffffff', text_color: '#264165' } },
        hb_feature_3:  { type: 'feature',       settings: { text: '60-Day Money-Back Guarantee', bg_color: '#ffffff', border_color: '#ffffff', text_color: '#264165' } },
        hb_disclaimer: { type: 'disclaimer',    settings: { text: 'Free shipping on all orders. No subscription required.', tag: 'p', font_size: 13, font_size_mobile: 11, text_color: '#a8bdd4', padding_top: 6, padding_bottom: 0 } }
      },
      blocks_order: ['hb_caption','hb_stars','hb_heading','hb_text','hb_btn','hb_feature_1','hb_feature_2','hb_feature_3','hb_disclaimer'],
      settings: {
        layout_style: 'overlay',
        bg_image: 'shopify://shop_images/100_Natural_Ingredients_7.png',
        bg_image_mobile: 'shopify://shop_images/PURE_WELLNESS_BACKED_BY_NATURE.png',
        bg_position: 'center center',
        video_bg_url: '',
        overlay_color: '#0a1625',
        overlay_opacity: 60,
        height: 'full_screen',
        custom_height: 700,
        max_width: 50,
        position_right: false,
        alignment: 'left',
        alignment_mobile: 'center',
        position: 'center',
        position_mobile: 'center',
        section_width: 'full',
        section_bg: '#1a2e47',
        section_fg: '#ffffff',
        feature_bg: true,
        feature_opacity: 100,
        feature_blur: false,
        feature_roundness: 100,
        feature_border: 0,
        feature_pad_h: 14,
        feature_pad_h_mobile: 10,
        feature_pad_v: 8,
        feature_pad_v_mobile: 6,
        feature_icon_size: 10,
        feature_font_size: 14,
        feature_font_size_mobile: 12,
        feature_line_height: 140,
        feature_gap: 10,
        feature_border_color: '#264165',
        feature_text_color: '#264165',
        blocks_gap: 18,
        margin_top: 0, margin_bottom: 0,
        padding_top: 80, padding_bottom: 80
      }
    },

    ticker_reviews: {
      type: 'horizontal-ticker',
      blocks: {
        tr1: { type: 'reviews', settings: { color_scheme: 'background-1', show_custom_bg: true, custom_bg_color: '#f8f9fc', corner_radius: 12, border_width: 0, border_color: '#e0e0e0', avatar_alignment: 'top', avatar_corner_radius: 40, star_color: '#ffcc00', stars_translate: 0, checkmark_color: '#264165', checkmark_icon_color: '#ffffff', author_1: '<em>Sarah M., Verified Buyer</em> [stars] [checkmark]', text_1: '<p>My nerve discomfort went from an 8 out of 10 to barely noticeable. Three weeks into Romira and I actually noticed the difference. Nothing else had worked for months.</p>' } },
        tr2: { type: 'reviews', settings: { color_scheme: 'background-1', show_custom_bg: true, custom_bg_color: '#f8f9fc', corner_radius: 12, border_width: 0, border_color: '#e0e0e0', avatar_alignment: 'top', avatar_corner_radius: 40, star_color: '#ffcc00', stars_translate: 0, checkmark_color: '#264165', checkmark_icon_color: '#ffffff', author_1: '<em>James R., Verified Buyer</em> [stars] [checkmark]', text_1: '<p>I tried four other supplements. Finally something that actually delivers. No more tingling at night. My doctor was surprised and asked me what I changed.</p>' } },
        tr3: { type: 'reviews', settings: { color_scheme: 'background-1', show_custom_bg: true, custom_bg_color: '#f8f9fc', corner_radius: 12, border_width: 0, border_color: '#e0e0e0', avatar_alignment: 'top', avatar_corner_radius: 40, star_color: '#ffcc00', stars_translate: 0, checkmark_color: '#264165', checkmark_icon_color: '#ffffff', author_1: '<em>Maria T., Verified Buyer</em> [stars] [checkmark]', text_1: '<p>Started feeling results by week 2. The burning sensation in my feet that kept me awake at night was mostly gone by week six. Ordered three more bottles immediately.</p>' } },
        tr4: { type: 'reviews', settings: { color_scheme: 'background-1', show_custom_bg: true, custom_bg_color: '#f8f9fc', corner_radius: 12, border_width: 0, border_color: '#e0e0e0', avatar_alignment: 'top', avatar_corner_radius: 40, star_color: '#ffcc00', stars_translate: 0, checkmark_color: '#264165', checkmark_icon_color: '#ffffff', author_1: '<em>David K., Verified Buyer</em> [stars] [checkmark]', text_1: '<p>As a scientist I read the research before ordering. The mechanism makes sense. Results were visible within the first month. This is not a gimmick.</p>' } },
        tr5: { type: 'reviews', settings: { color_scheme: 'background-1', show_custom_bg: true, custom_bg_color: '#f8f9fc', corner_radius: 12, border_width: 0, border_color: '#e0e0e0', avatar_alignment: 'top', avatar_corner_radius: 40, star_color: '#ffcc00', stars_translate: 0, checkmark_color: '#264165', checkmark_icon_color: '#ffffff', author_1: '<em>Linda S., Verified Buyer</em> [stars] [checkmark]', text_1: '<p>The quality is noticeably different. Clean capsules, no chemical smell, and the results are real. This is now a permanent part of my daily routine.</p>' } }
      },
      blocks_order: ['tr1','tr2','tr3','tr4','tr5'],
      settings: {
        visibility: 'always-display', speed: 2.5, direction: 'normal', stop_on_hover: true,
        mobile_spacing: 16, desktop_spacing: 24, color_scheme: 'custom',
        mobile_text_size: 14, desktop_text_size: 15,
        italic_text: false, uppercase_text: false, bold_text: false,
        mobile_image_height: 26, desktop_image_height: 40,
        mobile_reviews_width: 280, desktop_reviews_width: 380,
        mobile_padding_top: 20, mobile_padding_bottom: 20,
        desktop_padding_top: 28, desktop_padding_bottom: 28,
        custom_colors_background: '#ffffff', custom_colors_text: '#1a1a1a'
      }
    },

    stats_bar: {
      type: 'social-proof-stats-bar',
      blocks: {
        st1: { type: 'stat', settings: { value: '2,300+', label: 'Verified Customers' } },
        st2: { type: 'stat', settings: { value: '4.9/5',  label: 'Average Rating' } },
        st3: { type: 'stat', settings: { value: '60-Day', label: 'Money-Back Guarantee' } },
        st4: { type: 'stat', settings: { value: 'Free',   label: 'Shipping on Every Order' } }
      },
      blocks_order: ['st1','st2','st3','st4'],
      settings: {
        divider_style: 'pipe', animate_count: true,
        desktop_cols: 'auto', mobile_cols: '2',
        number_size: 38, label_size: 14, mobile_number_size: 28, mobile_label_size: 11,
        bg_color: '#f8f9fc', text_color: '#1a1a1a', number_color: '#264165',
        padding_top: 36, padding_bottom: 36, margin_top: 0, margin_bottom: 0,
        mobile_padding_top: 24, mobile_padding_bottom: 24, mobile_margin_top: 0, mobile_margin_bottom: 0
      }
    },

    brand_story: {
      type: 'ss-video-with-text-3',
      name: 'Brand Story',
      settings: {
        media: 'image', image: 'shopify://shop_images/ChatGPT_Image_Oct_27_2025_04_10_52_AM.png', video_url: '',
        media_width: 48, media_width_mobile: 100, media_position: 'second', media_position_mobile: 'second',
        media_ratio: 'original', media_ratio_mobile: 'original', media_border_thickness: 0, media_radius: 8,
        controls: false, autoplay: true, loop: true,
        content_padding_vertical: 48, content_padding_vertical_mobile: 28,
        content_padding_horizontal: 60, content_padding_horizontal_mobile: 20,
        heading: '<h2><strong>Built on Science. Delivered with Integrity.</strong></h2>',
        heading_custom: false, heading_font: 'josefin_sans_n4',
        heading_size: 42, heading_size_mobile: 28, heading_height: 110,
        heading_align: 'left', heading_align_mobile: 'left',
        heading_position: '1', heading_position_mobile: '1',
        sub_heading: '', sub_heading_custom: false, sub_heading_font: 'josefin_sans_n4',
        sub_heading_size: 18, sub_heading_size_mobile: 16, sub_heading_height: 150,
        sub_heading_align: 'left', sub_heading_align_mobile: 'left',
        sub_heading_mt: 16, sub_heading_position: '3', sub_heading_position_mobile: '2',
        text: '<p>We do not use mystery blends or hide behind proprietary formulas. Every ingredient in Romira R-ALA is listed clearly with the dose that the science actually supports. No fillers. No shortcuts. No empty promises. Just the compound that enters the nerve cell and does the work.</p>',
        text_custom: false, text_font: 'josefin_sans_n4',
        text_size: 18, text_size_mobile: 16, text_height: 150,
        text_align: 'left', text_align_mobile: 'left',
        text_mt: 24, text_position: '2', text_position_mobile: '3',
        button: 'See the Full Formula', button_url: '/products/romira-r-ala',
        button_custom: false, button_font: 'josefin_sans_n4',
        button_size: 16, button_size_mobile: 16, button_height: 100,
        button_align: 'left', button_align_mobile: 'left',
        button_mt: 28, button_padding_vertical: 14, button_padding_vertical_mobile: 12,
        button_padding_horizontal: 28, button_padding_horizontal_mobile: 24,
        button_radius: 50, button_border_thickness: 0, button_use_arrow: false,
        button_position: '2', button_position_mobile: '4',
        button_color: '#ffffff', button_hover_color: '#ffffff',
        button_bg_color: '#264165', button_bg_hover_color: '#1a2e47',
        button_border_color: '#264165', button_border_hover_color: '#1a2e47',
        media_border_color: '#e8e8e8',
        heading_color: '#1a1a1a', sub_heading_color: '#444444', text_color: '#4a4a4a',
        background_color: '#ffffff', background_gradient: '', border_color: '#ffffff',
        margin_top: 0, margin_bottom: 0, padding_top: 0, padding_bottom: 0,
        padding_horizontal: 0, padding_horizontal_mobile: 0,
        full_width: true, content_width: 100, border_thickness: 0, lazy: true
      }
    },

    how_it_works: {
      type: 'how-it-works',
      blocks: {
        step1: { type: 'step', settings: { title: 'Take 2 Capsules Daily', description: 'With your first meal of the day. No complicated stacking, timing windows, or cycling required. Just two capsules with food and water.' } },
        step2: { type: 'step', settings: { title: 'R-ALA Enters the Nerve Cell', description: 'Unlike most antioxidants, R-Alpha Lipoic Acid crosses the blood-nerve barrier and works directly inside the cell where the actual damage occurs. No other compound does this.' } },
        step3: { type: 'step', settings: { title: 'Nerve Repair Begins', description: 'Oxidative stress decreases. Inflammation reduces. Nerve signal conduction improves. Most customers notice a real difference within the first 2 to 4 weeks.' } }
      },
      blocks_order: ['step1','step2','step3'],
      settings: {
        heading: 'How Romira R-ALA Works',
        subheading: 'Three steps. One proven mechanism. Real results.',
        layout: 'horizontal', show_connector: true,
        bg_color: '#f8f9fc', text_color: '#1a1a1a', accent_color: '#264165',
        padding_top: 72, padding_bottom: 72, margin_top: 0, margin_bottom: 0
      }
    },

    certifications: {
      type: 'awards-certifications-bar',
      blocks: {
        badge1: { type: 'badge', settings: { emoji: '✓',  title: 'GMP Certified',         subtitle: 'Good Manufacturing Practice' } },
        badge2: { type: 'badge', settings: { emoji: '🔬', title: '3rd-Party Lab Tested',  subtitle: 'Independent verification' } },
        badge3: { type: 'badge', settings: { emoji: '✓',  title: 'Non-GMO Formula',       subtitle: '' } },
        badge4: { type: 'badge', settings: { emoji: '✓',  title: 'Gluten Free',           subtitle: '' } },
        badge5: { type: 'badge', settings: { emoji: '✓',  title: 'No Fillers or Binders', subtitle: '' } },
        badge6: { type: 'badge', settings: { emoji: '⭐', title: '4.9/5 Rated',           subtitle: '2,300+ verified reviews' } }
      },
      blocks_order: ['badge1','badge2','badge3','badge4','badge5','badge6'],
      settings: {
        heading: 'Why Customers Trust Romira',
        layout: 'pill_row', badge_height: 36, grayscale: false,
        bg_color: '#264165', card_bg: '#1a2e47', text_color: '#ffffff',
        padding_top: 36, padding_bottom: 36, margin_top: 0, margin_bottom: 0
      }
    },

    expert_section: {
      type: 'expert-endorsement',
      blocks: {
        exp1: { type: 'expert', settings: { name: 'Dr. Michael Chen', credential: 'PhD, Nutritional Biochemistry', quote: '<p>R-Alpha Lipoic Acid has more published research behind it than almost any other antioxidant supplement. Its ability to regenerate glutathione and cross the blood-nerve barrier makes it uniquely effective for nerve tissue health. I recommend it to my patients regularly.</p>', rating: 5, link_label: '' } },
        exp2: { type: 'expert', settings: { name: 'Dr. Sarah Hoffman', credential: 'MD, Functional Medicine Specialist', quote: '<p>What separates R-ALA from the supplement noise is the mechanism. It does not just fight free radicals externally. It works inside the mitochondria. For my patients experiencing nerve-related discomfort, this is my first recommendation.</p>', rating: 5, link_label: '' } }
      },
      blocks_order: ['exp1','exp2'],
      settings: {
        heading: 'What Health Professionals Are Saying',
        subheading: 'Leading clinicians and researchers on why R-ALA works',
        layout: 'grid', cta_label: '', cta_link: '',
        bg_color: '#ffffff', card_bg: '#f8f9fc', text_color: '#1a1a1a', accent_color: '#264165',
        padding_top: 72, padding_bottom: 72, margin_top: 0, margin_bottom: 0
      }
    },

    trustpilot_reviews_TJzz4e: tp,

    before_after: {
      type: 'before-after-results',
      blocks: {
        res1: { type: 'result', settings: { before_label: 'Before Romira', after_label: 'After 60 Days', result_stat: '91% Less Discomfort', result_desc: 'Customers who completed the 60-day Romira protocol reported a significant reduction in daily nerve discomfort.' } },
        res2: { type: 'result', settings: { before_label: 'Week 1', after_label: 'Week 8', result_stat: '88% Better Sleep', result_desc: 'Customers reporting improved sleep quality after nerve symptoms reduced. Based on post-protocol survey data.' } }
      },
      blocks_order: ['res1','res2'],
      settings: {
        heading: 'Real Results from Real Customers',
        subheading: 'Based on customer survey data collected after a full 60-day Romira protocol.',
        layout: 'side_by_side',
        bg_color: '#f8f9fc', text_color: '#1a1a1a', accent_color: '#264165',
        padding_top: 72, padding_bottom: 72, margin_top: 0, margin_bottom: 0
      }
    },

    discount_table: {
      type: 'quantity-discount-table',
      blocks: {
        tier1: { type: 'tier', settings: { qty_label: '1 Bottle',  price_per: '$39.99',       savings_text: '30-day supply. Standard price.',         highlight: false, badge_label: '',           btn_label: 'Buy 1 Bottle',  btn_link: '/products/romira-r-ala' } },
        tier2: { type: 'tier', settings: { qty_label: '2 Bottles', price_per: '$34.99 each',  savings_text: '60-day supply. Save $10 total.',          highlight: false, badge_label: '',           btn_label: 'Buy 2 Bottles', btn_link: '/products/romira-r-ala' } },
        tier3: { type: 'tier', settings: { qty_label: '3 Bottles', price_per: '$31.99 each',  savings_text: '90-day protocol. Save $24 total.',        highlight: true,  badge_label: 'BEST VALUE', btn_label: 'Buy 3 Bottles', btn_link: '/products/romira-r-ala' } }
      },
      blocks_order: ['tier1','tier2','tier3'],
      settings: {
        heading: 'Stock Up & Save',
        subheading: 'Most customers order 3 bottles to complete the full 90-day nerve repair protocol.',
        bg_color: '#ffffff', card_bg: '#f8f9fc', text_color: '#1a1a1a',
        highlight_color: '#264165', btn_bg: '#264165', btn_text: '#ffffff',
        padding_top: 72, padding_bottom: 72, margin_top: 0, margin_bottom: 0
      }
    },

    featured_collection_XNEd8y: fc
  },

  order: [
    'hero_banner_main',
    'ticker_reviews',
    'stats_bar',
    'brand_story',
    'how_it_works',
    'certifications',
    'expert_section',
    'trustpilot_reviews_TJzz4e',
    'before_after',
    'discount_table',
    'featured_collection_XNEd8y'
  ]
};

writeFileSync('LIVE_index.json', JSON.stringify(template, null, 2), 'utf8');
console.log('Template built — sections:', template.order.length);

const value = JSON.stringify(template);
const body  = JSON.stringify({ asset: { key: 'templates/index.json', value } });

const options = {
  hostname: store,
  path: `/admin/api/2024-01/themes/${themeId}/assets.json`,
  method: 'PUT',
  headers: {
    'X-Shopify-Access-Token': TOKEN,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body)
  }
};

let resp = '';
const req = https.request(options, res => {
  res.on('data', c => resp += c);
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('SUCCESS — home page live at romira.store');
    } else {
      console.log(`HTTP ${res.statusCode}:`, resp.substring(0, 500));
    }
  });
});
req.on('error', e => console.error(e.message));
req.write(body);
req.end();
