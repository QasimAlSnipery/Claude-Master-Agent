#!/usr/bin/env python3
# Clean MCQ Q&A bank PDF. Input: JSON files = array of chapter objects:
#  {"num":1,"title":"...","questions":[
#     {"qnum":"1.1","stem":"...","options":{"A":"..","B":".."},"answer":"A","reason":".."}]}
# Usage: python build_qabank.py <out.pdf> part1.json part2.json ...
import sys, json, re
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import (SimpleDocTemplate, Table, TableStyle, Paragraph,
                                 Spacer, KeepTogether)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

out = sys.argv[1]; jsonfiles = sys.argv[2:]
ACCENT = colors.HexColor('#1B5E20'); ANSBG = colors.HexColor('#E8F5E9')
styles = getSampleStyleSheet()
PW = A4[0]-3*cm
stem_st = ParagraphStyle('stem',parent=styles['Normal'],fontName='Helvetica-Bold',fontSize=9.5,leading=12,spaceAfter=2,textColor=colors.HexColor('#212121'))
opt_st  = ParagraphStyle('opt',parent=styles['Normal'],fontName='Helvetica',fontSize=9,leading=11.5,leftIndent=10)
ans_st  = ParagraphStyle('ans',parent=styles['Normal'],fontName='Helvetica',fontSize=9,leading=11.5,textColor=colors.HexColor('#1B5E20'))
qn_st   = ParagraphStyle('qn',parent=styles['Normal'],fontName='Helvetica-Bold',fontSize=9.5,leading=12,textColor=ACCENT)
ch_st   = ParagraphStyle('ch',parent=styles['Normal'],fontName='Helvetica-Bold',fontSize=13,leading=16,textColor=colors.white)

def esc(t):
    t=(t or '').replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')
    t=re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',t)
    return t

doc=SimpleDocTemplate(out,pagesize=A4,leftMargin=1.5*cm,rightMargin=1.5*cm,topMargin=1.3*cm,bottomMargin=1.3*cm,title='Paediatrics MCQ Q&A Bank')
story=[]
def chbar(num,title):
    t=Table([[Paragraph(esc(f"{num}. {title}"),ch_st)]],colWidths=[PW])
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),ACCENT),('TOPPADDING',(0,0),(-1,-1),6),('BOTTOMPADDING',(0,0),(-1,-1),6),('LEFTPADDING',(0,0),(-1,-1),8)]))
    return t

chapters=[]
for jf in jsonfiles:
    d=json.load(open(jf,encoding='utf-8'))
    if isinstance(d,dict): d=[d]
    chapters.extend(d)
chapters.sort(key=lambda c:c.get('num',0))

total=0
for ch in chapters:
    story.append(chbar(ch.get('num',''),ch.get('title','')))
    story.append(Spacer(1,5))
    for q in ch.get('questions',[]):
        total+=1
        blk=[Paragraph(f"<b>Q{esc(str(q.get('qnum','')))}.</b> {esc(q.get('stem',''))}",stem_st)]
        for L in ['A','B','C','D','E','F','G']:
            if L in (q.get('options') or {}):
                blk.append(Paragraph(f"<b>{L}.</b> {esc(q['options'][L])}",opt_st))
        ans=esc(str(q.get('answer','')))
        reason=esc(q.get('reason',''))
        atbl=Table([[Paragraph(f"<b>Answer: {ans}</b> &nbsp;—&nbsp; {reason}",ans_st)]],colWidths=[PW-0.2*cm])
        atbl.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),ANSBG),('LEFTPADDING',(0,0),(-1,-1),6),('RIGHTPADDING',(0,0),(-1,-1),6),('TOPPADDING',(0,0),(-1,-1),3),('BOTTOMPADDING',(0,0),(-1,-1),3),('LINEBEFORE',(0,0),(0,-1),2,ACCENT)]))
        blk.append(Spacer(1,2)); blk.append(atbl); blk.append(Spacer(1,8))
        story.append(KeepTogether(blk))
    story.append(Spacer(1,4))
doc.build(story)
print('BUILT',out,'|',len(chapters),'chapters',total,'questions')
