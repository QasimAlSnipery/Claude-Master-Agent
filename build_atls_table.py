# -*- coding: utf-8 -*-
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

OUT="ATLS_Table.pdf"
S=getSampleStyleSheet()
TITLE=ParagraphStyle('TI',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=15,textColor=colors.HexColor('#8a2a00'),spaceAfter=2)
SUB=ParagraphStyle('SU',parent=S['Normal'],fontName='Helvetica-Oblique',fontSize=7,textColor=colors.HexColor('#555'),spaceAfter=4)
SEC=ParagraphStyle('SEC',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=9.5,textColor=colors.white)
hd=ParagraphStyle('hd',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=7.2,leading=8.4,textColor=colors.white)
lab=ParagraphStyle('lab',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=7.2,leading=8.4,textColor=colors.HexColor('#8a2a00'))
cell=ParagraphStyle('cell',parent=S['Normal'],fontName='Helvetica',fontSize=7.0,leading=8.3,textColor=colors.HexColor('#111'))

AC=colors.HexColor('#8a2a00'); LBLBG=colors.HexColor('#f1ddd2'); ALT=colors.HexColor('#faf4f0'); GRID=colors.HexColor('#c8a48f')
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
E.append(Paragraph("ATLS — Advanced Trauma Life Support (Revision Table)",TITLE))
E.append(Paragraph("Bold = high-yield. 3 steps: Primary survey (+ resuscitation) → Secondary survey (head-to-toe) → Definitive care. Team led by most senior clinician.",SUB))

E.append(bar("1 — PRIMARY SURVEY = cABCDE (identify + treat what is killing the patient)"))
E.append(grid([
 ["c — Catastrophic haemorrhage","Control massive EXTERNAL bleeding FIRST","Direct pressure, tourniquet"],
 ["A — Airway + C-spine","<b>Verbal response = airway OK.</b> No response → assess obstruction (foreign body, maxillofacial/mandibular #, laryngeal injury, oedema)","Chin lift / jaw thrust. Protect C-spine throughout. <b>Normal neuro does NOT exclude C-spine injury</b>"],
 ["B — Breathing","High-flow O2 (reservoir mask). Assess surgical emphysema, neck veins, symmetry, effort. Percuss + auscultate front/back","<b>6 clinical (NOT radiological) life-threats: tension pneumo, flail chest+contusion, massive haemothorax, open pneumo</b> (+ airway, tamponade)"],
 ["B — chest treatment","Pneumo/haemo → <b>tube thoracostomy (chest drain)</b>. <b>Tension pneumo = EMERGENCY → needle decompression (mid-clavicular line, 2 finger-breadths below clavicle) then chest drain</b>","Hyperresonance=tension; dullness=haemothorax; tracheal deviation"],
 ["C — Circulation","3 obs: <b>conscious level</b> (↓=blood loss), <b>skin</b> (pale/ashen/grey=hypovolaemic), <b>pulse</b> (rapid thready/impalpable=shock). <b>Pelvic binder, don't remove till # excluded</b>","<b>TXA ASAP. Resuscitate with BLOOD/products, NOT crystalloid. Crystalloid = small amounts to maintain BP (permissive hypotension). Massive transfusion protocol</b>"],
 ["D — Disability","GCS + pupils + motor. <b>GCS = E+V+M, best 15, worst 3</b>","Exclude hypoglycaemia, alcohol, drugs"],
 ["E — Exposure","Full expose, examine front+back via controlled <b>log roll</b> with in-line traction","<b>Prevent hypothermia → warming air blankets</b>"],
], cols(1.7,4.7,3.6),["Step","Assessment","Key action / pearls"]))

E.append(bar("2 — SECONDARY SURVEY (head-to-toe, after primary + resuscitation started)"))
E.append(grid([
 ["Imaging","<b>Whole-body CT (WBCT) head→pelvis + IV contrast = GOLD STANDARD for severe blunt trauma.</b> No selective scanning; time-critical/early. If immediate laparotomy without WBCT → <b>pelvic binder + pelvic X-ray</b>"],
 ["Head / face","Maxillofacial #, ocular injury, open head injury. <b>Ear bleeding/discharge = basal skull fracture</b>. Inspect mouth, mandible, zygoma, nose, ears"],
 ["Neck","Palpate C-spine (haematoma, crepitus, steps). Assume injury if uncertain/significant head injury → <b>hard collar + sandbag + tape</b>. Explore wounds deeper than platysma in theatre"],
 ["Chest","Palpate clavicle/sternum/ribs. <b>Sternal # → cardiac damage risk → monitor 24–48h</b>. Distended neck veins + distant heart sounds + narrow pulse pressure = <b>cardiac tamponade (Beck's triad)</b>"],
 ["Neuro / Extremities","<b>GCS every 15 min</b>. Sensory/motor deficit → spinal immobilization + neurosurgery. Limbs: align deformities (document <b>neurovascular before + after</b>), move joints (dislocations)"],
 ["Log roll","<b>≥4 people</b>: 1 in-line spinal traction (leads/calls — anaesthetist if intubated), 1 torso, 1 pelvis/legs, 1 removes board + examines back (occiput→sacrum, penetrating/exit wounds, percuss/auscultate)"],
], cols(1.5,8.5)))

E.append(bar("3 — DEFINITIVE CARE: ETC vs DCS &amp; LACTATE"))
E.append(grid([
 ["ETC (Early Total Care)","Definitive management of ALL injuries <b>within 36h</b> after initial resuscitation. For physiologically stable patient"],
 ["DCS (Damage Control Surgery)","Simultaneous resuscitation + <b>early rapid life/limb-saving surgery</b>; defer time-consuming definitive surgery until physiology allows. ETC → switch to DCS if deteriorates"],
 ["Venous lactate (resuscitation marker)","<b>&lt;2 → ETC</b> · 2–3 → watch trend · &gt;3 → under-resuscitated (more resus or DCS if urgent) · <b>&gt;5 → DCS</b>"],
], cols(1.9,8.1)))

final=[]
for e in E: final.append(e); final.append(Spacer(1,2))
doc.build(final)
print("WROTE",OUT)
