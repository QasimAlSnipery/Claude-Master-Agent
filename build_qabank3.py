#!/usr/bin/env python3
# Self-test layout WITH figures. Questions top (4-5/page), figure under its question,
# answers pinned to bottom of same page, distinct colour per chapter.
import re, colorsys, json
import pdfplumber
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import Paragraph, Spacer, Image as RLImage
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.pdfgen import canvas as canvaslib

SRC = r"C:/Users/Darin Game/Downloads/Paediatrics_MCQ_QA_Bank.pdf"
OUT = r"C:/Users/Darin Game/Downloads/Paediatrics_MCQ_SelfTest.pdf"
Q2FIG = json.load(open('q2fig_clean.json'))
FIGM  = json.load(open('fig_meta.json'))

TITLES={1:"The child in society",2:"History and examination",3:"Normal child development, hearing and vision",4:"Developmental problems and the child with special needs",5:"Care of the sick child and young person",6:"Paediatric emergencies",7:"Accidents and poisoning",8:"Child protection",9:"Genetics",10:"Perinatal medicine",11:"Neonatal medicine",12:"Growth and puberty",13:"Nutrition",14:"Gastroenterology",15:"Infection and immunity",16:"Allergy",17:"Respiratory disorders",18:"Cardiac disorders",19:"Kidney and urinary tract disorders",20:"Genital disorders",21:"Liver disorders",22:"Malignant disease",23:"Haematological disorders",24:"Child and adolescent mental health",25:"Dermatological disorders",26:"Diabetes and endocrinology",27:"Inborn errors of metabolism",28:"Musculoskeletal disorders",29:"Neurological disorders",30:"Adolescent medicine",31:"Global child health"}
TITLE2NUM={v:k for k,v in TITLES.items()}

# ---- parse existing bank ----
with pdfplumber.open(SRC) as p:
    raw="\n".join((pg.extract_text() or "") for pg in p.pages)
raw=raw.replace("�","-")
chapters=[]; cur_ch=None; cur_q=None; field=None
def push_q():
    global cur_q
    if cur_q and cur_ch is not None: cur_ch["questions"].append(cur_q)
    cur_q=None
for ln in raw.split("\n"):
    s=ln.strip()
    if not s: continue
    mch=re.match(r'^(\d{1,2})\.\s+(.+)$',s)
    if mch and mch.group(2).strip() in TITLE2NUM and not s.startswith("Q"):
        push_q()
        if cur_ch: chapters.append(cur_ch)
        cur_ch={"num":int(mch.group(1)),"title":mch.group(2).strip(),"questions":[]}; field=None; continue
    mq=re.match(r'^Q(\d{1,2}\.\d{1,3})\.\s*(.*)$',s)
    if mq:
        push_q(); cur_q={"qnum":mq.group(1),"stem":mq.group(2).strip(),"options":{},"answer":"","reason":""}; field=("stem",); continue
    mo=re.match(r'^([A-G])\.\s+(.*)$',s)
    if mo and cur_q is not None:
        cur_q["options"][mo.group(1)]=mo.group(2).strip(); field=("opt",mo.group(1)); continue
    ma=re.match(r'^Answer:\s*([A-G])\b[\s\-]*(.*)$',s)
    if ma and cur_q is not None:
        cur_q["answer"]=ma.group(1); cur_q["reason"]=ma.group(2).strip(); field=("reason",); continue
    if cur_q is not None and field:
        if field[0]=="stem": cur_q["stem"]+=" "+s
        elif field[0]=="opt": cur_q["options"][field[1]]+=" "+s
        elif field[0]=="reason": cur_q["reason"]+=" "+s
push_q()
if cur_ch: chapters.append(cur_ch)

# ---- layout consts ----
PW,PH=A4; LM=RM=1.4*cm; TM=BM=1.3*cm
CW=PW-LM-RM; USABLE_H=PH-TM-BM
ss=getSampleStyleSheet()
qst=ParagraphStyle('q',parent=ss['Normal'],fontName='Helvetica',fontSize=9.4,leading=11.8)
ast=ParagraphStyle('a',parent=ss['Normal'],fontName='Helvetica',fontSize=8.5,leading=10.4,textColor=colors.HexColor('#2b2b2b'))
barst=ParagraphStyle('bar',parent=ss['Normal'],fontName='Helvetica-Bold',fontSize=12.5,leading=15,textColor=colors.white)
divst=ParagraphStyle('div',parent=ss['Normal'],fontName='Helvetica-Bold',fontSize=9,leading=12,textColor=colors.white)
def col(n):
    h=((n-1)*0.137)%1.0; r,g,b=colorsys.hsv_to_rgb(h,0.55,0.55); return colors.Color(r,g,b)
def esc(t):
    t=(t or '').replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')
    t=re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',t); return t

GAP_Q=8; GAP_A=4; BAR_H=26; DIV_H=18; PAD=6; FIG_GAP=3

def stem_clean(q):
    return re.sub(r'\s*\(see figure in book\)\s*','',q["stem"]).strip()

def q_flows(q):
    flows=[Paragraph(f'<b>Q{esc(q["qnum"])}.</b> {esc(stem_clean(q))}',qst)]
    for fn in Q2FIG.get(q["qnum"],[]):
        m=FIGM.get(fn)
        if not m: continue
        wpt=m["w"]*72/200.0; hpt=m["h"]*72/200.0
        sc=min((7.2*cm)/wpt,(4.6*cm)/hpt)
        flows.append(Spacer(1,FIG_GAP))
        flows.append(RLImage(m["path"],width=wpt*sc,height=hpt*sc))
    opts="<br/>".join(f'<b>{L}.</b> {esc(q["options"][L])}' for L in "ABCDEFG" if L in q["options"])
    flows.append(Paragraph(opts,qst))
    return flows
def a_flow(q,accent):
    hexc='#%02x%02x%02x'%(int(accent.red*255),int(accent.green*255),int(accent.blue*255))
    return Paragraph(f'<b><font color="{hexc}">Q{esc(q["qnum"])} - Answer: {esc(q["answer"])}.</font></b> {esc(q["reason"])}',ast)
def fheight(f,w=CW):
    if isinstance(f,RLImage): return f.drawHeight
    if isinstance(f,Spacer): return f.height
    _,h=f.wrap(w,USABLE_H); return h
def qheight(flows):
    return sum(fheight(f) for f in flows)+2*(len(flows)-1)

# ---- pack pages ----
pages=[]
for ch in chapters:
    accent=col(ch["num"]); qs=ch["questions"]; i=0
    while i<len(qs):
        group=[]; used=BAR_H+DIV_H+PAD*2; j=i
        while j<len(qs) and len(group)<5:
            qf=q_flows(qs[j]); af=a_flow(qs[j],accent)
            qh=qheight(qf); ah=fheight(af,CW-6); add=qh+GAP_Q+ah+GAP_A
            if group and used+add>USABLE_H-14: break
            group.append((qs[j],qf,af,qh,ah)); used+=add; j+=1
        if not group:
            qf=q_flows(qs[i]); af=a_flow(qs[i],accent)
            group=[(qs[i],qf,af,qheight(qf),fheight(af,CW-6))]; j=i+1
        pages.append((ch,accent,group)); i=j

# ---- render ----
c=canvaslib.Canvas(OUT,pagesize=A4); c.setTitle("Paediatrics MCQ Self-Test")
for ch,accent,group in pages:
    y=PH-TM
    c.setFillColor(accent); c.rect(LM,y-BAR_H,CW,BAR_H,fill=1,stroke=0)
    bp=Paragraph(f'{ch["num"]}. {esc(ch["title"])}',barst); bp.wrap(CW-12,BAR_H); bp.drawOn(c,LM+8,y-BAR_H+7)
    y-=BAR_H+8
    for (q,qf,af,qh,ah) in group:
        for f in qf:
            h=fheight(f)
            if isinstance(f,Spacer): y-=h; continue
            if isinstance(f,RLImage): f.drawOn(c,LM,y-h)
            else: f.wrap(CW,h); f.drawOn(c,LM,y-h)
            y-=h+2
        y-=GAP_Q-2
    # answers pinned to bottom
    ablock=DIV_H+6+sum(ah for (_,_,_,_,ah) in group)+GAP_A*len(group)
    ay=BM+ablock
    c.setFillColor(accent); c.rect(LM,ay-DIV_H,CW,DIV_H,fill=1,stroke=0)
    dp=Paragraph('&#9660; ANSWERS - check yourself',divst); dp.wrap(CW-12,DIV_H); dp.drawOn(c,LM+8,ay-DIV_H+4)
    ay2=ay-DIV_H-6
    for (q,qf,af,qh,ah) in group:
        af.wrap(CW-6,ah); af.drawOn(c,LM+3,ay2-ah); ay2-=ah+GAP_A
    c.showPage()
c.save()
print("BUILT",OUT,"| pages",len(pages),"| figures placed",sum(len(Q2FIG.get(q['qnum'],[])) for ch in chapters for q in ch['questions']))
