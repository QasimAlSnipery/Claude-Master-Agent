# -*- coding: utf-8 -*-
"""Generic: summary md (portrait, big font) + table md (landscape) -> merged PDF.
Usage: python build_combined.py <summary.md> <table.md> <out.pdf> <accent_hex>
table.md format: '## Section' starts a navy bar; markdown | tables render as tables."""
import sys, re
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
                                PageBreak, ListFlowable, ListItem)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from pypdf import PdfWriter, PdfReader

summary_md, table_md, OUT, accent = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
NAVY=colors.HexColor(accent); LBLBG=colors.Color(*[min(1,c+ (1-c)*0.82) for c in NAVY.rgb()])
ALT=colors.Color(*[min(1,c+(1-c)*0.93) for c in NAVY.rgb()]); GRID=colors.Color(*[c+(1-c)*0.45 for c in NAVY.rgb()])

def inl(t):
    t=t.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')
    t=re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',t)
    t=t.replace('&lt;b&gt;','<b>').replace('&lt;/b&gt;','</b>')
    t=t.replace('&amp;gt;','&gt;').replace('&amp;lt;','&lt;')
    t=t.replace('&amp;amp;','&amp;')
    return t

# ---------- SUMMARY ----------
H1=ParagraphStyle('H1',fontName='Helvetica-Bold',fontSize=18,textColor=colors.white,leading=22,spaceAfter=6)
H2=ParagraphStyle('H2',fontName='Helvetica-Bold',fontSize=14,textColor=NAVY,leading=17,spaceBefore=10,spaceAfter=3)
BODY=ParagraphStyle('BODY',fontName='Helvetica',fontSize=11.5,leading=15,spaceAfter=2,alignment=TA_LEFT)
BUL=ParagraphStyle('BUL',parent=BODY,leftIndent=14,bulletIndent=3,spaceAfter=1.5)
docS=SimpleDocTemplate('_sum.pdf',pagesize=A4,leftMargin=14*mm,rightMargin=14*mm,topMargin=12*mm,bottomMargin=12*mm)
WS=A4[0]-28*mm; flow=[]
def h1bar(txt):
    t=Table([[Paragraph(inl(txt),H1)]],colWidths=[WS])
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),NAVY),('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7),('LEFTPADDING',(0,0),(-1,-1),10)]))
    return t
buf=[]
def flush():
    global buf
    if buf:
        flow.append(ListFlowable([ListItem(Paragraph(inl(b),BUL),leftIndent=14) for b in buf],bulletType='bullet',start='•',leftIndent=14,bulletFontSize=9)); buf=[]
first=True
for ln in open(summary_md,encoding='utf-8').read().split('\n'):
    ln=ln.rstrip()
    if not ln.strip(): flush(); continue
    if ln.startswith('# '):
        flush()
        if not first: flow.append(PageBreak())
        first=False; flow.append(h1bar(ln[2:])); flow.append(Spacer(1,4))
    elif ln.startswith('## '): flush(); flow.append(Paragraph(inl(ln[3:]),H2))
    elif ln.lstrip().startswith('- '): buf.append(ln.lstrip()[2:])
    else: flush(); flow.append(Paragraph(inl(ln),BODY))
flush()
docS.build(flow)

# ---------- TABLE (landscape, from markdown) ----------
SEC=ParagraphStyle('SEC',fontName='Helvetica-Bold',fontSize=9.5,textColor=colors.white)
TH=ParagraphStyle('TH',fontName='Helvetica-Bold',fontSize=7.2,leading=8.4,textColor=colors.white)
TC=ParagraphStyle('TC',fontName='Helvetica',fontSize=7.2,leading=8.4,textColor=colors.HexColor('#111'))
TITLE=ParagraphStyle('TI',fontName='Helvetica-Bold',fontSize=15,textColor=NAVY,spaceAfter=3)
pageL=landscape(A4); availL=pageL[0]-12*mm
docT=SimpleDocTemplate('_tab.pdf',pagesize=pageL,leftMargin=6*mm,rightMargin=6*mm,topMargin=6*mm,bottomMargin=6*mm)
WL=availL; tflow=[]
def secbar(t):
    x=Table([[Paragraph(inl(t),SEC)]],colWidths=[WL])
    x.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),NAVY),('TOPPADDING',(0,0),(-1,-1),3),('BOTTOMPADDING',(0,0),(-1,-1),3),('LEFTPADDING',(0,0),(-1,-1),5)]))
    tflow.append(x); tflow.append(Spacer(1,2))
lines=open(table_md,encoding='utf-8').read().split('\n'); i=0
while i<len(lines):
    ln=lines[i].rstrip()
    if not ln.strip(): i+=1; continue
    if ln.startswith('# '):
        tflow.append(Paragraph(inl(ln[2:]),TITLE)); i+=1; continue
    if ln.startswith('## '):
        secbar(ln[3:]); i+=1; continue
    if ln.lstrip().startswith('|'):
        rows=[]
        while i<len(lines) and lines[i].lstrip().startswith('|'):
            cells=[c.strip() for c in lines[i].strip().strip('|').split('|')]
            if not all(set(c)<=set('-: ') for c in cells): rows.append(cells)
            i+=1
        ncol=max(len(r) for r in rows)
        data=[]
        for ri,r in enumerate(rows):
            while len(r)<ncol: r.append('')
            data.append([Paragraph(inl(c),TH if ri==0 else TC) for c in r])
        # first col width smaller
        w0=WL*0.16; rest=(WL-w0)/(ncol-1) if ncol>1 else WL
        cw=[w0]+[rest]*(ncol-1) if ncol>1 else [WL]
        t=Table(data,colWidths=cw,repeatRows=1)
        ts=TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('GRID',(0,0),(-1,-1),0.4,GRID),
            ('TOPPADDING',(0,0),(-1,-1),2.3),('BOTTOMPADDING',(0,0),(-1,-1),2.3),
            ('LEFTPADDING',(0,0),(-1,-1),3),('RIGHTPADDING',(0,0),(-1,-1),3),
            ('BACKGROUND',(0,0),(-1,0),NAVY)])
        for ri in range(1,len(data)):
            if ri%2==0: ts.add('BACKGROUND',(0,ri),(-1,ri),ALT)
        t.setStyle(ts); tflow.append(t); tflow.append(Spacer(1,3)); continue
    tflow.append(Paragraph(inl(ln),ParagraphStyle('n',fontName='Helvetica-Oblique',fontSize=7,textColor=colors.HexColor('#555'))))
    i+=1
docT.build(tflow)

# ---------- MERGE ----------
w=PdfWriter()
for f in ['_sum.pdf','_tab.pdf']:
    for p in PdfReader(f).pages: w.add_page(p)
with open(OUT,'wb') as o: w.write(o)
print("MERGED ->",OUT,len(PdfReader(OUT).pages),"pages")
