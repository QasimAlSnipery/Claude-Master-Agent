# -*- coding: utf-8 -*-
"""Esophageal disorders: walk-friendly summary (portrait) + dense table (landscape) -> merged PDF."""
import re
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
                                PageBreak, ListFlowable, ListItem)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from pypdf import PdfWriter, PdfReader

NAVY=colors.HexColor('#0b3d5c'); ACC=colors.HexColor('#7a1020')
LBLBG=colors.HexColor('#dde8f0'); ALT=colors.HexColor('#f3f7fa'); GRID=colors.HexColor('#9bb4c4')

# ---------- SUMMARY (portrait, big font) ----------
H1=ParagraphStyle('H1',fontName='Helvetica-Bold',fontSize=18,textColor=colors.white,leading=22,spaceAfter=6)
H2=ParagraphStyle('H2',fontName='Helvetica-Bold',fontSize=14,textColor=NAVY,leading=17,spaceBefore=10,spaceAfter=3)
BODY=ParagraphStyle('BODY',fontName='Helvetica',fontSize=11.5,leading=15,spaceAfter=2,alignment=TA_LEFT)
BUL=ParagraphStyle('BUL',parent=BODY,leftIndent=14,bulletIndent=3,spaceAfter=1.5)
def inl(t):
    t=t.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')
    t=re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',t)
    # restore intentional bold tags written as literal <b>...</b> in source
    t=t.replace('&lt;b&gt;','<b>').replace('&lt;/b&gt;','</b>')
    # fix double-escaped entities written directly in source (&gt; &lt;)
    t=t.replace('&amp;gt;','&gt;').replace('&amp;lt;','&lt;')
    return t
docS=SimpleDocTemplate('eso_summary.pdf',pagesize=A4,leftMargin=14*mm,rightMargin=14*mm,topMargin=12*mm,bottomMargin=12*mm,title="Esophageal Disorders")
WS=A4[0]-28*mm; flow=[]
def h1bar(txt):
    t=Table([[Paragraph(inl(txt),H1)]],colWidths=[WS])
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),NAVY),('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7),('LEFTPADDING',(0,0),(-1,-1),10)]))
    return t
md=open('eso_content.md',encoding='utf-8').read()
buf=[]
def flush():
    global buf
    if buf:
        flow.append(ListFlowable([ListItem(Paragraph(inl(b),BUL),leftIndent=14) for b in buf],bulletType='bullet',start='•',leftIndent=14,bulletFontSize=9))
        buf=[]
first=True
for ln in md.split('\n'):
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
print("summary done")

# ---------- TABLE (landscape) ----------
SEC=ParagraphStyle('SEC',fontName='Helvetica-Bold',fontSize=9.5,textColor=colors.white)
hd=ParagraphStyle('hd',fontName='Helvetica-Bold',fontSize=7.2,leading=8.4,textColor=colors.white)
lab=ParagraphStyle('lab',fontName='Helvetica-Bold',fontSize=7.2,leading=8.4,textColor=NAVY)
cell=ParagraphStyle('cell',fontName='Helvetica',fontSize=7.0,leading=8.3,textColor=colors.HexColor('#111'))
TITLE=ParagraphStyle('TI',fontName='Helvetica-Bold',fontSize=15,textColor=NAVY,spaceAfter=2)
SUB=ParagraphStyle('SU',fontName='Helvetica-Oblique',fontSize=7,textColor=colors.HexColor('#555'),spaceAfter=4)
def P(t,st=cell): return Paragraph(inl(t) if '**' in t or '<' not in t else t,st)
def Pc(t): return Paragraph(inl(t),cell)
pageL=landscape(A4); availL=pageL[0]-12*mm
docT=SimpleDocTemplate('eso_table.pdf',pagesize=pageL,leftMargin=6*mm,rightMargin=6*mm,topMargin=6*mm,bottomMargin=6*mm)
WL=availL
def cols(*fr):
    s=sum(fr); return [WL*f/s for f in fr]
def bar(t):
    x=Table([[Paragraph(t,SEC)]],colWidths=[availL])
    x.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),NAVY),('TOPPADDING',(0,0),(-1,-1),3),('BOTTOMPADDING',(0,0),(-1,-1),3),('LEFTPADDING',(0,0),(-1,-1),5)]))
    return x
def grid(rows,col_w,header=None):
    data=[]
    if header: data.append([Paragraph(h,hd) for h in header])
    for r in rows: data.append([Paragraph(inl(r[0]),lab)]+[Paragraph(inl(x),cell) for x in r[1:]])
    t=Table(data,colWidths=col_w,repeatRows=1 if header else 0)
    ts=TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('GRID',(0,0),(-1,-1),0.4,GRID),
        ('TOPPADDING',(0,0),(-1,-1),2.3),('BOTTOMPADDING',(0,0),(-1,-1),2.3),
        ('LEFTPADDING',(0,0),(-1,-1),3),('RIGHTPADDING',(0,0),(-1,-1),3)])
    if header:
        ts.add('BACKGROUND',(0,0),(-1,0),NAVY); ts.add('BACKGROUND',(0,1),(0,-1),LBLBG)
        for i in range(1,len(data)):
            if i%2==0: ts.add('BACKGROUND',(1,i),(-1,i),ALT)
    else:
        ts.add('BACKGROUND',(0,0),(0,-1),LBLBG)
        for i in range(len(data)):
            if i%2==1: ts.add('BACKGROUND',(1,i),(-1,i),ALT)
    t.setStyle(ts); return t
E=[]
E.append(Paragraph("ESOPHAGEAL DISORDERS — Clinical Revision Table",TITLE))
E.append(Paragraph("Bold = high-yield. Dr Fahmi Kakamad. Covers GERD, motility disorders, perforation, carcinoma.",SUB))
E.append(bar("GERD"))
E.append(grid([
 ["Overview","Prevalence 8–20%; <b>abnormal LES opening → mucosal damage</b>. Assoc: hiatal hernia, scleroderma, asthma, COPD, DM, HRT, coeliac"],
 ["Complications","Esophagitis, erosions, <b>strictures, Barrett's esophagus, adenocarcinoma</b>"],
 ["Alarm symptoms","<b>Dysphagia, odynophagia, GI bleed, weight loss, iron-def anaemia, early satiety, vomiting, choking → always endoscope</b>"],
 ["Diagnosis","<b>Clinical (heartburn) → empiric PPI trial (response = dx)</b>. Endoscopy + biopsy for complications/Barrett's. pH monitoring if refractory. Barium not routine"],
 ["Treatment","Self-care (antacid/H2/PPI) + lifestyle → 2wk no response → <b>empiric PPI</b> → alarm/refractory → endoscopy. Lifestyle: weight loss, elevate bed 6–8\", small meals, no eating 3h pre-sleep, stop alcohol/tobacco. <b>Anti-reflux surgery = last resort</b>"],
], cols(1.4,8.6)))
E.append(bar("MOTILITY DISORDERS"))
E.append(grid([
 ["Achalasia","Failure of LES to relax + dilated lower 2/3 (denervation; <b>T. cruzi = Chagas</b>)","Progressive dysphagia (solids+liquids), regurgitation, nocturnal cough, weight loss","<b>Barium = bird's beak; manometry = LES fails to relax</b>; endoscopy excludes other","CCB/nitrate (short); <b>balloon dilatation (60–90%, perforation 1–5%)</b>; botox (90% but 50% recurrence); <b>myotomy/POEM</b>"],
 ["Diffuse esophageal spasm","Vagal degeneration; female &gt; male. <b>Simultaneous, UNcoordinated high-pressure contractions</b>","Severe intermittent chest pain, dysphagia, food impaction","<b>Barium = corkscrew/pseudodiverticulum</b>; manometry simultaneous multipeaked (120 mmHg / &gt;2.5s)","Acid suppression, nitrate, CCB, sedative, botox. Surgery (long esophagomyotomy) if severe"],
 ["Nutcracker (hypercontractile)","Excessively strong but <b>COORDINATED</b> peristalsis (unlike DES)","Severe squeezing chest pain (mimics angina), dysphagia solids+liquids","<b>Manometry = high amplitude &gt;180 mmHg + normal LES relaxation</b>; endoscopy normal","Avoid triggers; CCB (nifedipine), nitrate, peppermint oil, <b>low-dose antidepressant</b>; refractory → botox/POEM"],
], cols(1.5,2.6,2.4,2.0,1.9),["Disorder","Pathophysiology","Symptoms","Diagnosis","Treatment"]))
E.append(bar("PERFORATION &amp; CARCINOMA"))
E.append(grid([
 ["Esophageal perforation","<b>Traumatic (common): stent placement = most common (25%), endoscopy/dilation, vomiting (Boerhaave), trauma</b>. Non-traumatic: neoplasm, caustic. → mediastinitis, pneumomediastinum, empyema, sepsis","Lower chest/upper abd pain (→L shoulder/back), vomiting/haematemesis, <b>subcutaneous emphysema</b>, fever, tachycardia, shock. CXR: <b>hydrothorax L&gt;R, pneumomediastinum, mediastinal widening</b>. <b>Gastrografin first</b> (no contrast if sedated). Mgmt: <b>ICU, NPO, NG suction, broad-spectrum Abx, early surgery &lt;24h</b>"],
 ["Esophageal carcinoma","<b>SCC = upper/mid, tobacco + alcohol. Adenocarcinoma = lower, obesity/GERD/Barrett's</b>","Dx: <b>endoscopy + biopsy</b>, CT/PET, <b>EUS (depth/staging)</b>. Tx: early = cure (esophagectomy or <b>endoscopic resection EMR/ESD</b>); late = palliative; chemo-radiotherapy pre/post"],
], cols(1.6,3.3,5.1),["","Cause / risk","Features / diagnosis / treatment"]))
docT.build(E)
print("table done")

# ---------- MERGE ----------
w=PdfWriter()
for f in ['eso_summary.pdf','eso_table.pdf']:
    for p in PdfReader(f).pages: w.add_page(p)
with open('Esophageal_Disorders_Notes_and_Table.pdf','wb') as o: w.write(o)
print("MERGED -> Esophageal_Disorders_Notes_and_Table.pdf",len(PdfReader('Esophageal_Disorders_Notes_and_Table.pdf').pages),"pages")
