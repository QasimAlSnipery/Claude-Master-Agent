#!/usr/bin/env python3
# Self-test PDF from JSON. Usage: python build_selftest_json.py <out.pdf> data.json
import sys, json, re, colorsys
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import Paragraph, Spacer
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.pdfgen import canvas as canvaslib

OUT=sys.argv[1]; chapters=json.load(open(sys.argv[2],encoding='utf-8'))
PW,PH=A4; LM=RM=1.4*cm; TM=BM=1.3*cm; CW=PW-LM-RM; USABLE_H=PH-TM-BM
ss=getSampleStyleSheet()
qst=ParagraphStyle('q',parent=ss['Normal'],fontName='Helvetica',fontSize=9.4,leading=11.8)
ast=ParagraphStyle('a',parent=ss['Normal'],fontName='Helvetica',fontSize=8.5,leading=10.4,textColor=colors.HexColor('#2b2b2b'))
barst=ParagraphStyle('bar',parent=ss['Normal'],fontName='Helvetica-Bold',fontSize=12.5,leading=15,textColor=colors.white)
divst=ParagraphStyle('div',parent=ss['Normal'],fontName='Helvetica-Bold',fontSize=9,leading=12,textColor=colors.white)
def col(n): r,g,b=colorsys.hsv_to_rgb(((n-1)*0.31)%1.0,0.55,0.5); return colors.Color(r,g,b)
def esc(t):
    t=(t or '').replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')
    return re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',t)
def q_para(q):
    opts="<br/>".join(f'<b>{L}.</b> {esc(q["options"][L])}' for L in sorted(q["options"]))
    return Paragraph(f'<b>Q{esc(q["qnum"])}.</b> {esc(q["stem"])}<br/>{opts}',qst)
def a_para(q,acc):
    hexc='#%02x%02x%02x'%(int(acc.red*255),int(acc.green*255),int(acc.blue*255))
    return Paragraph(f'<b><font color="{hexc}">Q{esc(q["qnum"])} - Answer: {esc(q["answer"])}.</font></b> {esc(q["reason"])}',ast)
def meas(f,w): _,h=f.wrap(w,USABLE_H); return h
GAP_Q=8;GAP_A=4;BAR_H=26;DIV_H=18;PAD=6
pages=[]
for ch in chapters:
    acc=col(ch["num"]); qs=ch["questions"]; i=0
    while i<len(qs):
        g=[]; used=BAR_H+DIV_H+PAD*2; j=i
        while j<len(qs) and len(g)<5:
            qf=q_para(qs[j]); af=a_para(qs[j],acc); qh=meas(qf,CW); ah=meas(af,CW-6)
            add=qh+GAP_Q+ah+GAP_A
            if g and used+add>USABLE_H-14: break
            g.append((qs[j],qf,af,qh,ah)); used+=add; j+=1
        if not g:
            qf=q_para(qs[i]); af=a_para(qs[i],acc); g=[(qs[i],qf,af,meas(qf,CW),meas(af,CW-6))]; j=i+1
        pages.append((ch,acc,g)); i=j
c=canvaslib.Canvas(OUT,pagesize=A4)
for ch,acc,g in pages:
    y=PH-TM
    c.setFillColor(acc); c.rect(LM,y-BAR_H,CW,BAR_H,fill=1,stroke=0)
    bp=Paragraph(f'{esc(ch["title"])}',barst); bp.wrap(CW-12,BAR_H); bp.drawOn(c,LM+8,y-BAR_H+7); y-=BAR_H+8
    for (q,qf,af,qh,ah) in g:
        qf.wrap(CW,qh); qf.drawOn(c,LM,y-qh); y-=qh+GAP_Q
    ablock=DIV_H+6+sum(ah for (_,_,_,_,ah) in g)+GAP_A*len(g); ay=BM+ablock
    c.setFillColor(acc); c.rect(LM,ay-DIV_H,CW,DIV_H,fill=1,stroke=0)
    dp=Paragraph('&#9660; ANSWERS - check yourself',divst); dp.wrap(CW-12,DIV_H); dp.drawOn(c,LM+8,ay-DIV_H+4)
    ay2=ay-DIV_H-6
    for (q,qf,af,qh,ah) in g:
        af.wrap(CW-6,ah); af.drawOn(c,LM+3,ay2-ah); ay2-=ah+GAP_A
    c.showPage()
c.save()
print("BUILT",OUT,"| pages",len(pages),"| questions",sum(len(c['questions']) for c in chapters))
