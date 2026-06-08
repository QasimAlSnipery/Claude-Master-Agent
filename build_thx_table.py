# -*- coding: utf-8 -*-
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

OUT="Thoracic_Trauma_Table.pdf"
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
        ('TOPPADDING',(0,0),(-1,-1),2.2),('BOTTOMPADDING',(0,0),(-1,-1),2.2),
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
E.append(Paragraph("THORACIC TRAUMA — Clinical Revision Table",TITLE))
E.append(Paragraph("Bold = high-yield. 2nd leading cause trauma death; 25% of trauma deaths from chest injury. Early deaths often PREVENTABLE (tension pneumo, tamponade, airway, haemorrhage).",SUB))

HDR=["Injury","Key features / signs","Management","Pearls"]
CW=cols(1.5,3.4,2.7,2.4)

E.append(bar("CHEST WALL"))
E.append(grid([
 ["Rib fractures","Heal 3–6 wks. Ribs 4–9 commonest. <b>Lower ribs (X–XII) → liver/spleen/kidney</b>. <b>1st/2nd # + apical cap → great vessel injury</b>",
  "Pain control, pulmonary function. Repeat CXR 3h (delayed haemo/pneumo). <b>Elderly + multiple # → admit (pneumonia)</b>","Splinting → atelectasis/pneumonia"],
 ["Flail chest","<b>≥3 ribs in ≥2 places → free segment → PARADOXICAL respiration</b> (in on inspiration). Associated pulmonary contusion (real problem)",
  "Pain control, pulmonary toilet, O2, treat contusion. Severe → intubation + IPPV (internal pneumatic fixation)","Contusion + hypoxaemia kill, not the flail"],
 ["Sternal fracture","Anterior blunt / <b>seatbelt deceleration</b>. Low mortality. → myocardial contusion risk",
  "Lateral X-ray; <b>screen myocardial contusion (ECG + serial cardiac enzymes), monitor 24–48h</b>; analgesia","NO association with blunt aortic injury"],
 ["Subcutaneous emphysema","Air in chest wall → marker of serious injury",
  "Benign + self-limiting → <b>high-flow O2</b>. Massive → 'gills' incisions","—"],
], CW, HDR))

E.append(bar("PLEURAL / LUNG"))
E.append(grid([
 ["Pulmonary contusion","Alveolar oedema/haemorrhage; hypoxaemia ~50%; <b>X-ray findings within minutes, ARDS-like</b>",
  "<b>Restrict IV fluids</b>, pulmonary toilet, pain control, respiratory support. <b>NO prophylactic antibiotics</b>. Mortality 5–16%","Worsens over 24–48h"],
 ["Simple pneumothorax","Air in pleural space; hyperresonance, ↓breath sounds. Grades: small/large/occult",
  "Small/occult → observe. <b>Moderate/large → chest tube (5th ICS, anterior axillary, safe triangle)</b>","—"],
 ["Open pneumothorax","<b>'Sucking chest wound'</b>; chest wall defect; respiratory distress",
  "<b>Three-way occlusive dressing</b> (prevents tension) → chest tube → definitive closure","Penetrating > blunt"],
 ["Tension pneumothorax","EMERGENCY. One-way valve → mediastinal shift. <b>Distended neck veins, hypotension, tracheal deviation (contralateral), absent breath sounds, hyperresonance</b>",
  "<b>CLINICAL dx (before CXR). Immediate needle decompression: 2nd ICS, mid-clavicular line, 16G → then chest tube</b>","↓venous return → shock"],
 ["Haemothorax","Blood in pleura (lung = commonest source, self-limiting). ↓breath sounds + <b>DULLNESS</b>. X-ray >200mL",
  "<b>Chest tube. Thoracotomy if: initial >1500mL OR >200mL/h ×2–3h OR persistent transfusion</b>","Massive = up to 3L"],
], CW, HDR))

E.append(bar("AIRWAY / OESOPHAGUS / DIAPHRAGM"))
E.append(grid([
 ["Tracheobronchial injury","MVC; <b>80% within 2.5cm of carina</b>; massive air leak, haemoptysis, sub-cut emphysema. <b>Persistent large pneumo + air leak after chest tube</b>",
  "<b>Bronchoscopy = definitive dx</b>. Intubation beyond injury; surgical repair (thoracotomy)","Mortality 10%"],
 ["Oesophageal perforation","Penetrating; high morbidity, mediastinitis. <b>Gastric content in chest tube</b>, pneumomediastinum, effusion without chest injury",
  "Surgical repair; antibiotics","2nd to penetrating injury"],
 ["Diaphragmatic tear","Severe trauma + associated injuries",
  "<b>Mandates abdominal exploration</b>","—"],
], CW, HDR))

E.append(bar("CARDIOVASCULAR"))
E.append(grid([
 ["Myocardial contusion",">55% of severe closed chest trauma",
  "Monitor; <b>ECG + serial troponin</b> (normal at 4–6h excludes); O2, analgesia","Risk stratify with troponin"],
 ["Penetrating cardiac / tamponade","<b>RV most common (43%; LV 34%)</b>; suspect in 'the BOX' (clavicles–mid-clavicular–costal margins). <b>Beck's triad: muffled heart sounds + distended neck veins + hypotension</b>; narrow pulse pressure, pulsus paradoxus",
  "<b>ECHO</b> (effusion + RV collapse); ECG electrical alternans. Fluids; <b>pericardiocentesis</b> (blunt/stable); <b>thoracotomy + repair</b> (penetrating)","80% die at scene"],
 ["Blunt aortic injury","<b>Most common vessel injured by blunt trauma. 80–90% at descending aorta distal to left subclavian (isthmus)</b>. CXR: <b>widened mediastinum &gt;8cm</b>, loss of aortic knob, apical cap, L effusion",
  "<b>CT angiography (helical) = dx.</b> Fix ABCDE first; <b>control BP (SBP 100–120, β-blocker/esmolol)</b>; surgery or endovascular repair","85% survive if prompt; paraplegia 5–7%"],
], CW, HDR))

E.append(bar("EMERGENCY DEPARTMENT THORACOTOMY"))
E.append(grid([
 ["Indications","Cardiac arrest in <b>PENETRATING</b> injury, massive haemothorax, penetrating + tamponade, large open wound, major vascular/tracheobronchial injury, oesophageal perforation. <b>CONTRAINDICATED in pulseless BLUNT trauma</b>"],
 ["5 moves","1. Incise inferior pulmonary ligament · 2. Open pericardium + staple/suture cardiac laceration · 3. Open cardiac massage · 4. Clamp pulmonary hilum / twist bleeding lung · 5. <b>Clamp thoracic aorta</b>"],
], cols(1.5,8.5)))

final=[]
for e in E: final.append(e); final.append(Spacer(1,2))
doc.build(final)
print("WROTE",OUT)
