# -*- coding: utf-8 -*-
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

OUT="Peritoneum_Retroperitoneum_Imaging_Table.pdf"
S=getSampleStyleSheet()
TITLE=ParagraphStyle('TI',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=15,textColor=colors.HexColor('#0b3d5c'),spaceAfter=2)
SUB=ParagraphStyle('SU',parent=S['Normal'],fontName='Helvetica-Oblique',fontSize=7,textColor=colors.HexColor('#555'),spaceAfter=4)
SEC=ParagraphStyle('SEC',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=9.5,textColor=colors.white)
hd=ParagraphStyle('hd',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=7.2,leading=8.4,textColor=colors.white)
lab=ParagraphStyle('lab',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=7.2,leading=8.4,textColor=colors.HexColor('#0b3d5c'))
cell=ParagraphStyle('cell',parent=S['Normal'],fontName='Helvetica',fontSize=7.0,leading=8.3,textColor=colors.HexColor('#111'))

NAVY=colors.HexColor('#0b3d5c'); LBLBG=colors.HexColor('#dde8f0'); ALT=colors.HexColor('#f3f7fa'); GRID=colors.HexColor('#9bb4c4')
def P(t,st=cell): return Paragraph(t,st)
page=landscape(A4); avail=page[0]-12*mm
doc=SimpleDocTemplate(OUT,pagesize=page,leftMargin=6*mm,rightMargin=6*mm,topMargin=6*mm,bottomMargin=6*mm)
W=avail
def cols(*fr):
    s=sum(fr); return [W*f/s for f in fr]
def bar(t):
    x=Table([[Paragraph(t,SEC)]],colWidths=[avail])
    x.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),NAVY),('TOPPADDING',(0,0),(-1,-1),3),('BOTTOMPADDING',(0,0),(-1,-1),3),('LEFTPADDING',(0,0),(-1,-1),5)]))
    return x
def grid(rows,col_w,header=None):
    data=[]
    if header: data.append([Paragraph(h,hd) for h in header])
    for r in rows: data.append([P(r[0],lab)]+[P(x) for x in r[1:]])
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
E.append(Paragraph("PERITONEAL CAVITY &amp; RETROPERITONEUM — Imaging Revision Table",TITLE))
E.append(Paragraph("Bold = high-yield. <b>CT = mainstay; US/MRI = no ionizing radiation.</b> Radiology lecture (Dr Kawa Mahmood).",SUB))

E.append(bar("PERITONEAL CAVITY"))
E.append(grid([
 ["Ascites","Small amounts detected US/CT/MRI; <b>nature NOT reliably differentiated</b>","US detects smallest amount. CT = low density. <b>Free → dependent sites: pouch of Douglas, Morrison's pouch, paracolic gutters</b>. Loculated → mimics abscess"],
 ["Peritoneal tumours","Mostly metastases — <b>ovarian most important</b>","(a) ascites only, (b) <b>peritoneal nodules</b>, (c) <b>omental cake</b>"],
 ["Intra-peritoneal abscess","Follows <b>perforation</b>; site depends on perforation; multiple common; ascites frequent","<b>US</b>: loculated + irregular wall, internal echoes, air; DDx bowel (peristalsis). <b>CT</b>: fluid + enhancing wall, <b>air in 50%</b> (bubble/streak/air-fluid level). <b>In-111/Tc leukocyte scan</b> if US/CT fail (e.g. anastomotic leak)"],
], cols(1.6,3.2,5.2),["Condition","Cause","Imaging findings"]))

E.append(bar("RETROPERITONEUM — ANATOMY &amp; MASSES"))
E.append(grid([
 ["Anatomy / modalities","3 compartments (anterior + posterior renal fascia). Organs: adrenal, aorta, retrocrural, IVC, psoas. <b>CT main</b>; plain film (mass/calcification/gas); MRI (multiplanar, vascular extension)"],
 ["Mass DDx (7)","<b>1. Nodal (lymphoma, germ cell, mets) 2. Retroperitoneal fibrosis 3. Neurogenic (paraganglioma, schwannoma, ganglioneuroma) 4. Sarcoma (lipo/fibro) 5. Haematoma (trauma/ruptured AAA) 6. Infection (psoas abscess) 7. Vascular (aneurysm)</b>"],
 ["Lymphadenopathy","Mets &amp; lymphoma look <b>identical</b> → <b>FDG-PET/CT</b> (esp lymphoma follow-up). Normal short axis: <b>para-aortic 10mm, retrocrural 6mm; &gt;20mm = invariably malignant</b>. Lymphoma → confluent lobulated mass around aorta"],
 ["Retroperitoneal tumours","Mainly liposarcoma/fibrosarcoma; nature usually undeterminable. <b>Liposarcoma recognizable = fat + strands of soft tissue density</b>"],
], cols(1.7,8.3)))

E.append(bar("ADRENAL IMAGING (CT best routine)"))
E.append(grid([
 ["Non-functioning adenoma","<b>&lt;3cm hard to tell from mets; &gt;3cm = mostly mets</b> (rarely carcinoma). Metastases common, <b>frequently bilateral, lung common primary</b>"],
 ["Cushing's adenoma","Always <b>&gt;2cm, always seen CT/MRI; &lt;10 HU</b> density"],
 ["Aldosteronoma","Usually <b>&lt;1cm — difficult to identify</b>"],
 ["Hyperplasia","Normal / mild enlargement"],
 ["Phaeochromocytoma","Very large, all detected; <b>10% rule (multiple, bilateral, extra-adrenal, malignant)</b>; <b>MIBG scan</b> for localization"],
], cols(1.9,8.1)))

E.append(bar("AORTIC ANEURYSM (AAA)"))
E.append(grid([
 ["Screening / dimensions","<b>US = screening</b>; normal 2.5cm, <b>&gt;3cm = aneurysm</b>. CT + US = true dimensions. Plain film lateral = calcification. Angiography ≠ true size (good for branch stenosis)"],
 ["Findings / rupture","CT: blood clot lining wall, calcification, IVC displacement. <b>&gt;6cm = high rupture risk. Leaking/bleeding aneurysm easily diagnosed on CT</b> (haemorrhage in retroperitoneum)"],
], cols(1.9,8.1)))

final=[]
for e in E: final.append(e); final.append(Spacer(1,2))
doc.build(final)
print("WROTE",OUT)
