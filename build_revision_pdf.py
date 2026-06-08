# -*- coding: utf-8 -*-
"""Combine all chat summaries into one Revision_Notes.pdf (markdown -> PDF)."""
import re
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
                                PageBreak, ListFlowable, ListItem)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT

OUT="Revision_Notes.pdf"
S=getSampleStyleSheet()
NAVY=colors.HexColor('#0b3d5c'); ACC=colors.HexColor('#7a1020')
H1=ParagraphStyle('H1',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=17,textColor=colors.white,spaceAfter=6,spaceBefore=2,leading=20)
H2=ParagraphStyle('H2',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=12,textColor=NAVY,spaceAfter=3,spaceBefore=8,leading=14)
H3=ParagraphStyle('H3',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=10,textColor=ACC,spaceAfter=2,spaceBefore=5,leading=12)
BODY=ParagraphStyle('BODY',parent=S['Normal'],fontName='Helvetica',fontSize=8.6,leading=11,spaceAfter=1,alignment=TA_LEFT)
BUL=ParagraphStyle('BUL',parent=BODY,leftIndent=10,bulletIndent=2,spaceAfter=0.5)
TH=ParagraphStyle('TH',parent=BODY,fontName='Helvetica-Bold',fontSize=8,textColor=colors.white,leading=9.5)
TC=ParagraphStyle('TC',parent=BODY,fontSize=8,leading=9.5)

def md_inline(t):
    t=t.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')
    t=re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',t)
    t=re.sub(r'__(.+?)__',r'<b>\1</b>',t)
    return t

doc=SimpleDocTemplate(OUT,pagesize=A4,leftMargin=12*mm,rightMargin=12*mm,topMargin=10*mm,bottomMargin=10*mm,
                      title="Medical Revision Notes")
W=A4[0]-24*mm
flow=[]

def h1bar(txt):
    t=Table([[Paragraph(md_inline(txt),H1)]],colWidths=[W])
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),NAVY),('TOPPADDING',(0,0),(-1,-1),6),
        ('BOTTOMPADDING',(0,0),(-1,-1),6),('LEFTPADDING',(0,0),(-1,-1),8)]))
    return t

def render(md):
    lines=md.split('\n')
    i=0; buf=[]
    def flush_bullets():
        nonlocal buf
        if buf:
            items=[ListItem(Paragraph(md_inline(b),BUL),leftIndent=10) for b in buf]
            flow.append(ListFlowable(items,bulletType='bullet',start='•',leftIndent=10,bulletFontSize=7))
            buf=[]
    while i<len(lines):
        ln=lines[i].rstrip()
        if not ln.strip():
            flush_bullets(); i+=1; continue
        if ln.startswith('# '):
            flush_bullets(); flow.append(Spacer(1,4)); flow.append(h1bar(ln[2:])); flow.append(Spacer(1,3))
        elif ln.startswith('### '):
            flush_bullets(); flow.append(Paragraph(md_inline(ln[4:]),H3))
        elif ln.startswith('## '):
            flush_bullets(); flow.append(Paragraph(md_inline(ln[3:]),H2))
        elif ln.lstrip().startswith('- '):
            buf.append(ln.lstrip()[2:])
        elif ln.startswith('|'):
            flush_bullets()
            rows=[]
            while i<len(lines) and lines[i].lstrip().startswith('|'):
                r=lines[i].strip().strip('|')
                cells=[c.strip() for c in r.split('|')]
                if not all(set(c)<=set('-: ') for c in cells):
                    rows.append(cells)
                i+=1
            i-=1
            if rows:
                ncol=max(len(r) for r in rows)
                data=[]
                for ri,r in enumerate(rows):
                    while len(r)<ncol: r.append('')
                    sty=TH if ri==0 else TC
                    data.append([Paragraph(md_inline(c),sty) for c in r])
                tbl=Table(data,colWidths=[W/ncol]*ncol,repeatRows=1)
                ts=TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('GRID',(0,0),(-1,-1),0.4,colors.HexColor('#9bb4c4')),
                    ('BACKGROUND',(0,0),(-1,0),NAVY),('TOPPADDING',(0,0),(-1,-1),2),('BOTTOMPADDING',(0,0),(-1,-1),2),
                    ('LEFTPADDING',(0,0),(-1,-1),3),('RIGHTPADDING',(0,0),(-1,-1),3)])
                for ri in range(1,len(data)):
                    if ri%2==0: ts.add('BACKGROUND',(0,ri),(-1,ri),colors.HexColor('#f3f7fa'))
                tbl.setStyle(ts); flow.append(tbl); flow.append(Spacer(1,2))
        else:
            flush_bullets(); flow.append(Paragraph(md_inline(ln),BODY))
        i+=1
    flush_bullets()

# load content
content=open('revision_content.md',encoding='utf-8').read()
# cover
flow.append(Spacer(1,60))
flow.append(Paragraph('<b>MEDICAL REVISION NOTES</b>',ParagraphStyle('cov',parent=S['Title'],fontSize=30,textColor=NAVY,alignment=1)))
flow.append(Spacer(1,12))
flow.append(Paragraph('Compiled clinical summaries — GI, Hepatology, Endocrine, Cardiology, Surgery, Orthopaedics',ParagraphStyle('cs',parent=S['Normal'],fontSize=12,textColor=ACC,alignment=1)))
flow.append(Spacer(1,8))
flow.append(Paragraph('Bold = high-yield. For exam revision.',ParagraphStyle('cs2',parent=S['Normal'],fontSize=9,textColor=colors.grey,alignment=1)))
flow.append(PageBreak())

# split content into sections by '====FILE====' marker handled as # already
render(content)
doc.build(flow)
print("WROTE",OUT)
