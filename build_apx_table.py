# -*- coding: utf-8 -*-
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

OUT="Appendicitis_Table.pdf"
S=getSampleStyleSheet()
TITLE=ParagraphStyle('TI',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=15,textColor=colors.HexColor('#7a1020'),spaceAfter=2)
SUB=ParagraphStyle('SU',parent=S['Normal'],fontName='Helvetica-Oblique',fontSize=7,textColor=colors.HexColor('#555'),spaceAfter=4)
SEC=ParagraphStyle('SEC',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=9.5,textColor=colors.white)
hd=ParagraphStyle('hd',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=7.2,leading=8.4,textColor=colors.white)
lab=ParagraphStyle('lab',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=7.2,leading=8.4,textColor=colors.HexColor('#7a1020'))
cell=ParagraphStyle('cell',parent=S['Normal'],fontName='Helvetica',fontSize=7.0,leading=8.3,textColor=colors.HexColor('#111'))

AC=colors.HexColor('#7a1020'); LBLBG=colors.HexColor('#f0dcdf'); ALT=colors.HexColor('#faf3f4'); GRID=colors.HexColor('#c4a0a6')
def P(t,st=cell): return Paragraph(t,st)
page=landscape(A4); avail=page[0]-12*mm
doc=SimpleDocTemplate(OUT,pagesize=page,leftMargin=6*mm,rightMargin=6*mm,topMargin=6*mm,bottomMargin=6*mm)
W=avail
def cols(*fr):
    s=sum(fr); return [W*f/s for f in fr]
def bar(t):
    x=Table([[Paragraph(t,SEC)]],colWidths=[avail])
    x.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),AC),('TOPPADDING',(0,0),(-1,-1),3),('BOTTOMPADDING',(0,0),(-1,-1),3),('LEFTPADDING',(0,0),(-1,-1),5)]))
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
        ts.add('BACKGROUND',(0,0),(-1,0),AC); ts.add('BACKGROUND',(0,1),(0,-1),LBLBG)
        for i in range(1,len(data)):
            if i%2==0: ts.add('BACKGROUND',(1,i),(-1,i),ALT)
    else:
        ts.add('BACKGROUND',(0,0),(0,-1),LBLBG)
        for i in range(len(data)):
            if i%2==1: ts.add('BACKGROUND',(1,i),(-1,i),ALT)
    t.setStyle(ts); return t

E=[]
E.append(Paragraph("ACUTE APPENDICITIS — Clinical Revision Table",TITLE))
E.append(Paragraph("Bold = high-yield. Commonest cause of acute abdomen / surgical admission (UK). Peak 10–20 yrs.",SUB))

E.append(bar("1 — DEFINITION, EPIDEMIOLOGY &amp; PATHOGENESIS"))
E.append(grid([
 ["Definition / epi","Inflammation of vermiform appendix. <b>Commonest acute abdomen + surgical admission (UK); ~1 in 7</b>. Peak <b>10–20 yrs</b>, rare &lt;3 yrs"],
 ["Pathogenesis","<b>Mechanical (main): luminal obstruction (faecolith, kinking, foreign body)</b> → luminal hypertension → vessel compression → venous/lymphatic block → wall oedema → thrombosis → mucosal barrier loss → gut flora invade wall → mural destruction. Also vascular + infectious"],
], cols(1.5,8.5)))

E.append(bar("2 — CLINICAL FEATURES"))
E.append(grid([
 ["Pain","<b>Vague colicky CENTRAL (periumbilical) visceral pain → localizes to RIF, becomes constant</b> (parietal involvement). Classic migration. + low-grade fever, N/V, anorexia"],
 ["Position variants","Pelvic → urinary symptoms/diarrhoea. Radiation: perineum (pelvic), right lumbar (retroperitoneal), right hypochondrium (retrocaecal), mesogastrium (median). 'Monkey of all diseases'"],
 ["Sepsis signs","Low-grade pyrexia → <b>spikes 38–39°C if perforation/abscess</b>; tachycardia, flushing, dehydration"],
], cols(1.5,8.5)))

E.append(bar("3 — EXAMINATION SIGNS"))
E.append(grid([
 ["McBurney's point","Tenderness = usual feature. Peritoneal signs: guarding, percussion tenderness, pain on cough/movement; rigidity if generalized peritonitis"],
 ["Rovsing's sign","Pressure on LIF → pain in RIF (needs RIF tenderness too)"],
 ["Psoas sign","Hip held flexed to relieve pain (appendix adjacent to psoas)"],
 ["PR exam","Tenderness anterolaterally on right"],
], cols(1.5,8.5)))

E.append(bar("4 — DIAGNOSIS &amp; ALVARADO SCORE"))
E.append(grid([
 ["Diagnosis","<b>Clinical primarily.</b> FBC (leucocytosis), urinalysis (exclude UTI), <b>pregnancy test MANDATORY (ectopic)</b>, US (women → tubo-ovarian), CT (elderly caecal tumour/obese), diagnostic laparoscopy, U&amp;E"],
], cols(1.5,8.5)))
E.append(grid([
 ["Migration of pain","Symptom","1"],
 ["Anorexia","Symptom","1"],
 ["Nausea/vomiting","Symptom","1"],
 ["RIF (RLQ) tenderness","Sign","<b>2</b>"],
 ["Rebound","Sign","1"],
 ["Elevated temperature","Sign","1"],
 ["Leukocytosis","Lab","<b>2</b>"],
 ["Left shift","Lab","1"],
 ["INTERPRETATION","<b>7–10 strongly predictive · 5–6 equivocal (→imaging) · 1–4 ruled out</b>","/10"],
], cols(2.2,6.0,1.0),["Alvarado feature","Category","Pts"]))

E.append(bar("5 — MANAGEMENT, INDICATIONS &amp; COMPLICATIONS"))
E.append(grid([
 ["Management","Resuscitate (IV fluids, NPO), analgesics, antibiotics, <b>appendicectomy within 24h ASAP</b>. <b>Open</b> (children, Lanz incision, lavage if perforated). <b>Laparoscopic</b> (young women, obese; ↓wound infection, ↓stay, faster recovery) — preferred if expertise"],
 ["Appendix mass (late)","CT → check abscess/caecal tumour. <b>Initial conservative</b> (IV fluids, antibiotics, observe ± drainage). Surgery if deterioration/perforation"],
 ["Indications for surgery","Acute appendicitis, recurrent appendicitis, <b>mucocele, carcinoma</b>"],
 ["Special","<b>Recurrent</b>: incomplete self-limiting obstruction. <b>Pregnancy</b>: most common extrauterine acute abdomen (0.5–1/1000)"],
 ["Complications","<b>Abscess (peri-appendicular/pelvic/sub-hepatic)</b>, post-op collection, wound infection/haematoma, intestinal obstruction (adhesions)"],
], cols(1.6,8.4)))

final=[]
for e in E: final.append(e); final.append(Spacer(1,2))
doc.build(final)
print("WROTE",OUT)
