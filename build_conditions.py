#!/usr/bin/env python3
# Render one tables-only PDF: each medical condition = its own Field|Value table,
# grouped under lecture/topic headings.
# Usage: python build_conditions.py <out.pdf> part1.json part2.json ...
import sys, json, re
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import (SimpleDocTemplate, Table, TableStyle, Paragraph,
                                 Spacer, KeepTogether)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

out = sys.argv[1]
jsonfiles = sys.argv[2:]

ACCENT = colors.HexColor('#0D47A1')
TOPIC_BG = colors.HexColor('#0D47A1')
COND_BG = colors.HexColor('#1565C0')
SUB_BG = colors.HexColor('#E3F2FD')
LABEL_BG = colors.HexColor('#F4F6F8')
GRID = colors.HexColor('#90A4AE')

styles = getSampleStyleSheet()
val_style = ParagraphStyle('val', parent=styles['Normal'], fontName='Helvetica',
                           fontSize=8.3, leading=10.3, spaceAfter=0, spaceBefore=0)
lbl_style = ParagraphStyle('lbl', parent=styles['Normal'], fontName='Helvetica-Bold',
                           fontSize=8.3, leading=10.3, textColor=colors.HexColor('#263238'))
cond_style = ParagraphStyle('cond', parent=styles['Normal'], fontName='Helvetica-Bold',
                            fontSize=11, leading=13, textColor=colors.white)
topic_style = ParagraphStyle('topic', parent=styles['Normal'], fontName='Helvetica-Bold',
                             fontSize=13, leading=16, textColor=colors.white)
sub_style = ParagraphStyle('sub', parent=styles['Normal'], fontName='Helvetica-Bold',
                           fontSize=8.6, leading=11, textColor=ACCENT)

def esc(t):
    t = (t or '').replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    t = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', t)
    t = t.replace('\n', '<br/>')
    return t

# fixed render order; (key, is_subheader)
ORDER = [
    ('Definition / overview', False),
    ('Causes / risk factors', False),
    ('Pathophysiology', False),
    ('Symptoms', False),
    ('Signs on examination', False),
    ('Red flags / emergency features', False),
    ('Differential diagnoses', False),
    ('__INVESTIGATIONS__', True),
    ('Bedside tests', False),
    ('Blood tests', False),
    ('Imaging', False),
    ('Special tests', False),
    ('Diagnostic criteria / confirmation', False),
    ('__MANAGEMENT__', True),
    ('Initial / emergency management', False),
    ('Medical treatment', False),
    ('Surgical treatment', False),
    ('Long-term management', False),
    ('Complications', False),
    ('Prevention / patient advice', False),
    ('Prognosis', False),
]
# accept some alias keys from authors
ALIAS = {
    'Diagnostic criteria / how to confirm diagnosis': 'Diagnostic criteria / confirmation',
    'Diagnostic criteria': 'Diagnostic criteria / confirmation',
    'Surgical treatment if relevant': 'Surgical treatment',
    'Definition': 'Definition / overview',
    'Causes': 'Causes / risk factors',
    'Risk factors': 'Causes / risk factors',
}

PAGEW = A4[0] - 3*cm
LBL_W = PAGEW * 0.27
VAL_W = PAGEW * 0.73

doc = SimpleDocTemplate(out, pagesize=A4, leftMargin=1.5*cm, rightMargin=1.5*cm,
                        topMargin=1.3*cm, bottomMargin=1.3*cm,
                        title='Dermatology — All Conditions Summary')
story = []

def topic_bar(name):
    t = Table([[Paragraph(esc(name), topic_style)]], colWidths=[PAGEW])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), TOPIC_BG),
        ('TOPPADDING', (0,0), (-1,-1), 7), ('BOTTOMPADDING', (0,0), (-1,-1), 7),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
    ]))
    return t

def condition_table(cond):
    fields = {}
    for k, v in (cond.get('fields') or {}).items():
        fields[ALIAS.get(k.strip(), k.strip())] = v
    rows = [[Paragraph(esc(cond.get('name', 'Condition')), cond_style), '']]
    spans = [('SPAN', (0,0), (1,0)), ('BACKGROUND', (0,0), (1,0), COND_BG)]
    sub_rows = []
    ri = 1
    for key, is_sub in ORDER:
        if is_sub:
            label = 'INVESTIGATIONS' if key == '__INVESTIGATIONS__' else 'MANAGEMENT'
            rows.append([Paragraph(label, sub_style), ''])
            spans.append(('SPAN', (0,ri), (1,ri)))
            spans.append(('BACKGROUND', (0,ri), (1,ri), SUB_BG))
            sub_rows.append(ri)
            ri += 1
            continue
        val = fields.get(key, '')
        if val is None or str(val).strip() == '':
            val = '—'
        rows.append([Paragraph(esc(key), lbl_style), Paragraph(esc(str(val)), val_style)])
        ri += 1
    t = Table(rows, colWidths=[LBL_W, VAL_W], repeatRows=1)
    st = [
        ('GRID', (0,0), (-1,-1), 0.4, GRID),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BACKGROUND', (0,1), (0,-1), LABEL_BG),
        ('TOPPADDING', (0,0), (-1,-1), 2.5), ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
        ('LEFTPADDING', (0,0), (-1,-1), 4), ('RIGHTPADDING', (0,0), (-1,-1), 4),
    ] + spans
    t.setStyle(TableStyle(st))
    return t

topics = []
for jf in jsonfiles:
    with open(jf, encoding='utf-8') as f:
        data = json.load(f)
    if isinstance(data, dict):
        data = [data]
    topics.extend(data)

for ti, topic in enumerate(topics):
    story.append(topic_bar(topic.get('topic', 'Topic')))
    story.append(Spacer(1, 5))
    for cond in topic.get('conditions', []):
        story.append(condition_table(cond))
        story.append(Spacer(1, 9))
    story.append(Spacer(1, 4))

doc.build(story)
print('BUILT', out, '|', len(topics), 'topics',
      sum(len(t.get('conditions', [])) for t in topics), 'conditions')
