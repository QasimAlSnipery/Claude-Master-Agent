# -*- coding: utf-8 -*-
"""Walk-friendly PDF: Thoracic Trauma + Peritoneum/Retroperitoneum imaging summaries."""
import re
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
                                PageBreak, ListFlowable, ListItem)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT

OUT="Walk_Notes_Thoracic_Peritoneum.pdf"
S=getSampleStyleSheet()
NAVY=colors.HexColor('#0b3d5c'); ACC=colors.HexColor('#7a1020')
# bigger fonts for reading while walking
H1=ParagraphStyle('H1',fontName='Helvetica-Bold',fontSize=18,textColor=colors.white,leading=22,spaceAfter=6)
H2=ParagraphStyle('H2',fontName='Helvetica-Bold',fontSize=14,textColor=NAVY,leading=17,spaceBefore=10,spaceAfter=3)
BODY=ParagraphStyle('BODY',fontName='Helvetica',fontSize=11.5,leading=15,spaceAfter=2,alignment=TA_LEFT)
BUL=ParagraphStyle('BUL',parent=BODY,leftIndent=14,bulletIndent=3,spaceAfter=1.5)
SUB=ParagraphStyle('SUB',fontName='Helvetica',fontSize=11,leading=14,leftIndent=26,bulletIndent=14,spaceAfter=1)

def md_inline(t):
    t=t.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')
    t=re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',t)
    return t

doc=SimpleDocTemplate(OUT,pagesize=A4,leftMargin=14*mm,rightMargin=14*mm,topMargin=12*mm,bottomMargin=12*mm,
                      title="Walk Notes — Thoracic Trauma & Peritoneum Imaging")
W=A4[0]-28*mm
flow=[]

def h1bar(txt):
    t=Table([[Paragraph(md_inline(txt),H1)]],colWidths=[W])
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),NAVY),('TOPPADDING',(0,0),(-1,-1),7),
        ('BOTTOMPADDING',(0,0),(-1,-1),7),('LEFTPADDING',(0,0),(-1,-1),10)]))
    return t

md=open('walk_content.md',encoding='utf-8').read()
lines=md.split('\n'); i=0; buf=[]
def flush():
    global buf
    if buf:
        items=[ListItem(Paragraph(md_inline(b),BUL if not b.startswith('  ') else SUB),leftIndent=14) for b in buf]
        flow.append(ListFlowable(items,bulletType='bullet',start='•',leftIndent=14,bulletFontSize=9))
        buf=[]
first=True
while i<len(lines):
    ln=lines[i].rstrip()
    if not ln.strip(): flush(); i+=1; continue
    if ln.startswith('# '):
        flush()
        if not first: flow.append(PageBreak())
        first=False
        flow.append(h1bar(ln[2:])); flow.append(Spacer(1,4))
    elif ln.startswith('## '):
        flush(); flow.append(Paragraph(md_inline(ln[3:]),H2))
    elif re.match(r'^\d+\. ',ln.strip()):
        buf.append(ln.strip())
    elif ln.lstrip().startswith('- '):
        buf.append(ln.lstrip()[2:])
    else:
        flush(); flow.append(Paragraph(md_inline(ln),BODY))
    i+=1
flush()
doc.build(flow)
print("WROTE",OUT)
