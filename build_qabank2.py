#!/usr/bin/env python3
# Self-test layout: questions at top of page, answers pinned to bottom of SAME page,
# 4-5 questions per page by size, distinct colour per chapter.
# Reads the existing clean bank PDF, re-parses, re-renders.
import re, colorsys
import pdfplumber
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import Paragraph, Spacer, PageBreak, Frame, BaseDocTemplate, PageTemplate, FrameBreak
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet

SRC = r"C:/Users/Darin Game/Downloads/Paediatrics_MCQ_QA_Bank.pdf"
OUT = r"C:/Users/Darin Game/Downloads/Paediatrics_MCQ_SelfTest.pdf"

TITLES = {1:"The child in society",2:"History and examination",3:"Normal child development, hearing and vision",4:"Developmental problems and the child with special needs",5:"Care of the sick child and young person",6:"Paediatric emergencies",7:"Accidents and poisoning",8:"Child protection",9:"Genetics",10:"Perinatal medicine",11:"Neonatal medicine",12:"Growth and puberty",13:"Nutrition",14:"Gastroenterology",15:"Infection and immunity",16:"Allergy",17:"Respiratory disorders",18:"Cardiac disorders",19:"Kidney and urinary tract disorders",20:"Genital disorders",21:"Liver disorders",22:"Malignant disease",23:"Haematological disorders",24:"Child and adolescent mental health",25:"Dermatological disorders",26:"Diabetes and endocrinology",27:"Inborn errors of metabolism",28:"Musculoskeletal disorders",29:"Neurological disorders",30:"Adolescent medicine",31:"Global child health"}
TITLE2NUM = {v:k for k,v in TITLES.items()}

# ---------- parse the existing bank PDF ----------
with pdfplumber.open(SRC) as p:
    raw = "\n".join((pg.extract_text() or "") for pg in p.pages)
raw = raw.replace("�","-")  # stray glyph -> dash
lines = [l.rstrip() for l in raw.split("\n")]

chapters = []           # list of {num,title,questions:[...]}
cur_ch = None; cur_q = None; field = None
def push_q():
    global cur_q
    if cur_q and cur_ch is not None:
        cur_ch["questions"].append(cur_q)
    cur_q = None

for ln in lines:
    s = ln.strip()
    if not s:
        continue
    mch = re.match(r'^(\d{1,2})\.\s+(.+)$', s)
    if mch and mch.group(2).strip() in TITLE2NUM and not s.startswith("Q"):
        push_q()
        if cur_ch: chapters.append(cur_ch)
        cur_ch = {"num":int(mch.group(1)),"title":mch.group(2).strip(),"questions":[]}
        field=None; continue
    mq = re.match(r'^Q(\d{1,2}\.\d{1,3})\.\s*(.*)$', s)
    if mq:
        push_q()
        cur_q = {"qnum":mq.group(1),"stem":mq.group(2).strip(),"options":{},"answer":"","reason":""}
        field=("stem",); continue
    mo = re.match(r'^([A-G])\.\s+(.*)$', s)
    if mo and cur_q is not None and mo.group(1) in "ABCDEFG":
        cur_q["options"][mo.group(1)] = mo.group(2).strip()
        field=("opt",mo.group(1)); continue
    ma = re.match(r'^Answer:\s*([A-G])\b[\s\-]*(.*)$', s)
    if ma and cur_q is not None:
        cur_q["answer"]=ma.group(1); cur_q["reason"]=ma.group(2).strip()
        field=("reason",); continue
    # continuation of current field
    if cur_q is not None and field:
        if field[0]=="stem": cur_q["stem"]+=" "+s
        elif field[0]=="opt": cur_q["options"][field[1]]+=" "+s
        elif field[0]=="reason": cur_q["reason"]+=" "+s
push_q()
if cur_ch: chapters.append(cur_ch)

# ---------- colours per chapter ----------
def chap_colour(n):
    h = ((n-1)*0.137) % 1.0
    r,g,b = colorsys.hsv_to_rgb(h, 0.55, 0.55)   # deep, white text ok
    return colors.Color(r,g,b)
def tint(c, f=0.86):
    return colors.Color(c.red+(1-c.red)*f, c.green+(1-c.green)*f, c.blue+(1-c.blue)*f)

# ---------- styles ----------
PW, PH = A4
LM=RM=1.4*cm; TM=BM=1.3*cm
CW = PW-LM-RM
USABLE_H = PH-TM-BM
ss=getSampleStyleSheet()
def q_style(): return ParagraphStyle('q',parent=ss['Normal'],fontName='Helvetica',fontSize=9.4,leading=11.8)
def a_style(): return ParagraphStyle('a',parent=ss['Normal'],fontName='Helvetica',fontSize=8.5,leading=10.4,textColor=colors.HexColor('#2b2b2b'))
bar_style=ParagraphStyle('bar',parent=ss['Normal'],fontName='Helvetica-Bold',fontSize=12.5,leading=15,textColor=colors.white)
div_style=ParagraphStyle('div',parent=ss['Normal'],fontName='Helvetica-Bold',fontSize=9,leading=12,textColor=colors.white)

def esc(t):
    t=(t or '').replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')
    t=re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',t)
    return t

def q_para(q):
    opts="".join(f'<br/><b>{L}.</b> {esc(q["options"][L])}' for L in "ABCDEFG" if L in q["options"])
    return Paragraph(f'<b>Q{esc(q["qnum"])}.</b> {esc(q["stem"])}{opts}', q_style())

def a_para(q, accent):
    num=f'<font color="{accent.hexval()[:2]+accent.hexval()[2:]}"></font>'
    hexc='#%02x%02x%02x'%(int(accent.red*255),int(accent.green*255),int(accent.blue*255))
    return Paragraph(f'<b><font color="{hexc}">Q{esc(q["qnum"])} — Answer: {esc(q["answer"])}.</font></b> {esc(q["reason"])}', a_style())

def meas(flow, w=CW):
    _,h=flow.wrap(w,USABLE_H); return h

# pre-build all flows with measured heights, grouped per chapter
GAP_Q=7; GAP_A=4; BAR_H=30; DIV_H=18; PAD=6
pages=[]  # each page: dict(chapter, qflows, aflows)
for ch in chapters:
    accent=chap_colour(ch["num"])
    qs=ch["questions"]
    i=0
    first=True
    while i < len(qs):
        # greedily pack up to 5 (min 4 if they fit) that fit one page
        group=[]
        used = BAR_H + DIV_H + PAD*2
        j=i
        while j < len(qs) and len(group) < 5:
            qf=q_para(qs[j]); af=a_para(qs[j],accent)
            qh=meas(qf,CW); ah=meas(af,CW-6)
            add = qh+GAP_Q+ah+GAP_A
            if group and used+add > USABLE_H-14:
                break
            group.append((qs[j],qf,af,qh,ah)); used+=add; j+=1
        if not group:  # single oversized q, force it
            qf=q_para(qs[i]); af=a_para(qs[i],accent)
            group=[(qs[i],qf,af,meas(qf,CW),meas(af,CW-6))]; j=i+1
        pages.append({"ch":ch,"accent":accent,"group":group,"first":first})
        first=False; i=j

# ---------- render with manual frames ----------
from reportlab.pdfgen import canvas as canvaslib
c = canvaslib.Canvas(OUT, pagesize=A4)
c.setTitle("Paediatrics MCQ Self-Test")
for pg in pages:
    accent=pg["accent"]; ch=pg["ch"]; group=pg["group"]
    hexc='#%02x%02x%02x'%(int(accent.red*255),int(accent.green*255),int(accent.blue*255))
    # chapter bar
    y=PH-TM
    c.setFillColor(accent); c.rect(LM, y-26, CW, 26, fill=1, stroke=0)
    p=Paragraph(f'{ch["num"]}. {esc(ch["title"])}', bar_style); p.wrap(CW-12,26); p.drawOn(c, LM+8, y-20)
    y-=26+8
    # questions
    qh_sum=0
    qtop=y
    for (q,qf,af,qh,ah) in group:
        qf.wrap(CW,qh); qf.drawOn(c, LM, y-qh); y-=qh+GAP_Q
    # compute answers block height
    ablock = DIV_H+6 + sum(ah for (_,_,_,_,ah) in group) + GAP_A*len(group)
    # pin answers to bottom
    ay = BM + ablock
    # divider bar
    c.setFillColor(accent); c.rect(LM, ay-DIV_H, CW, DIV_H, fill=1, stroke=0)
    dp=Paragraph('&#9660; ANSWERS — check yourself', div_style); dp.wrap(CW-12,DIV_H); dp.drawOn(c, LM+8, ay-DIV_H+4)
    # light tint background behind answers
    abg_top=ay-DIV_H-2
    ay2=ay-DIV_H-6
    for (q,qf,af,qh,ah) in group:
        af.wrap(CW-6,ah); af.drawOn(c, LM+3, ay2-ah); ay2-=ah+GAP_A
    c.showPage()
c.save()
print("BUILT",OUT,"| pages",len(pages),"| chapters",len(chapters),
      "| questions",sum(len(ch['questions']) for ch in chapters))
