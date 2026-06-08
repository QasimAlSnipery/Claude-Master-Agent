# -*- coding: utf-8 -*-
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

OUT="Acute_Abdomen_Table.pdf"
S=getSampleStyleSheet()
TITLE=ParagraphStyle('TI',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=15,textColor=colors.HexColor('#1f5132'),spaceAfter=2)
SUB=ParagraphStyle('SU',parent=S['Normal'],fontName='Helvetica-Oblique',fontSize=7,textColor=colors.HexColor('#555'),spaceAfter=4)
SEC=ParagraphStyle('SEC',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=9.5,textColor=colors.white)
hd=ParagraphStyle('hd',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=7.0,leading=8.2,textColor=colors.white)
lab=ParagraphStyle('lab',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=7.1,leading=8.2,textColor=colors.HexColor('#1f5132'))
cell=ParagraphStyle('cell',parent=S['Normal'],fontName='Helvetica',fontSize=6.9,leading=8.1,textColor=colors.HexColor('#111'))

GR=colors.HexColor('#1f5132'); LBLBG=colors.HexColor('#d8e6dc'); ALT=colors.HexColor('#f1f7f3'); GRID=colors.HexColor('#9bbaa6')
def P(t,st=cell): return Paragraph(t,st)
page=landscape(A4); avail=page[0]-12*mm
doc=SimpleDocTemplate(OUT,pagesize=page,leftMargin=6*mm,rightMargin=6*mm,topMargin=6*mm,bottomMargin=6*mm)
W=avail
def cols(*fr):
    s=sum(fr); return [W*f/s for f in fr]
def bar(t):
    x=Table([[Paragraph(t,SEC)]],colWidths=[avail])
    x.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),GR),('TOPPADDING',(0,0),(-1,-1),3),('BOTTOMPADDING',(0,0),(-1,-1),3),('LEFTPADDING',(0,0),(-1,-1),5)]))
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
        ts.add('BACKGROUND',(0,0),(-1,0),GR); ts.add('BACKGROUND',(0,1),(0,-1),LBLBG)
        for i in range(1,len(data)):
            if i%2==0: ts.add('BACKGROUND',(1,i),(-1,i),ALT)
    else:
        ts.add('BACKGROUND',(0,0),(0,-1),LBLBG)
        for i in range(len(data)):
            if i%2==1: ts.add('BACKGROUND',(1,i),(-1,i),ALT)
    t.setStyle(ts); return t

E=[]
E.append(Paragraph("ACUTE ABDOMEN — Clinical Revision Table (Dr Farman O Hassan)",TITLE))
E.append(Paragraph("Bold = high-yield. Acute abdomen = sudden, spontaneous, non-traumatic, severe abdominal pain, usually &lt;24h.",SUB))

E.append(bar("1 — EPIDEMIOLOGY &amp; CAUSES BY SYSTEM"))
E.append(grid([
 ["Epidemiology","~10% of ED visits; <b>~40% need surgery</b> (~1/3 if &gt;65y). <b>Young → appendicitis. Older → biliary, obstruction, ischaemia, diverticulitis</b>"],
 ["Intestinal","Appendicitis, mesenteric adenitis, Meckel's, perforated PU, gastroenteritis, diverticulitis, obstruction, strangulated hernia"],
 ["Hepatobiliary / Vascular","HB: biliary colic, cholecystitis, cholangitis, pancreatitis, hepatitis. <b>Vascular: ruptured AAA, acute mesenteric ischaemia, ischaemic colitis</b>"],
 ["Urological / Gynae","Uro: renal colic, UTI, testicular torsion, retention. <b>Gynae (ECTOPIC)</b>: Ectopic, endometriosis, Cyst rupture, Torsion ovary, Ovulation (Mittelschmerz), PID, Incomplete abortion, Cystitis"],
 ["Medical (non-surgical)","Metabolic: uraemia, DKA, Addisonian crisis, porphyria, FMF. Haem: sickle crisis, leukaemia. Toxins: lead, narcotic withdrawal. <b>Referred: MI, pericarditis, pneumonia, PE → ALWAYS ECG to exclude MI</b>"],
], cols(1.7,8.3)))

E.append(bar("2 — PAIN PATHOPHYSIOLOGY"))
E.append(grid([
 ["Visceral","Midline, vague, deep, dull, poorly localized, cramping. Triggered by inflammation/ischaemia/distension","Bilateral autonomic"],
 ["Parietal (somatic)","<b>Sharp, severe, well-localized, lateralizes to quadrant. Worse with movement/cough, eased lying still</b>","Unilateral spinal somatic"],
 ["Embryological → midline site","<b>Foregut → epigastric</b> (stomach, pancreas, liver, biliary). <b>Midgut → periumbilical</b> (early appendicitis). <b>Hindgut → suprapubic</b>","—"],
], cols(1.7,6.6,1.7),["Type","Features","Innervation"]))

E.append(bar("3 — HISTORY: ONSET / CHARACTER / VOMIT"))
E.append(grid([
 ["Sudden (seconds)","Perforated viscus, ruptured AAA/ectopic, infarction/embolism (mesenteric, MI)"],
 ["Rapid (minutes)","Colic (biliary, ureteric), inflammation (appendicitis, pancreatitis, diverticulitis), ischaemia, obstruction"],
 ["Gradual (hrs-days)","Neoplasm, chronic inflammation, large bowel obstruction"],
 ["Migration","<b>Periumbilical → RIF = acute appendicitis</b> (visceral→parietal). Colicky → constant = strangulation/ischaemia → peritonitis"],
 ["Character","Colicky (intermittent, pain-free) → obstruction/gastroenteritis. Burning constant → peritonitis. Severe agonizing → pancreatitis. Throbbing → cholecystitis"],
 ["Vomit type","<b>Bilious=obstruction/sepsis</b>; coffee-ground=gastritis/GU; fresh blood=Mallory-Weiss/GU; food=gastroenteritis/early SBO; <b>feculent=late obstruction</b>"],
], cols(1.7,8.3)))

E.append(bar("4 — EXAMINATION (Inspect → Auscultate → Percuss → Palpate)"))
E.append(grid([
 ["Position / vitals","Peritonitis → lies still, knees flexed. Colic → restless/rolling. Tachycardia=early shock (masked by β-blocker). <b>qSOFA = 2 of: altered sensorium, tachypnoea, hypotension</b>"],
 ["Inspect / Auscultate","Distension, flank/periumbilical ecchymosis (pancreatitis). <b>Absent bowel sounds = ileus/peritonitis/shock; hyperactive = obstruction/gastroenteritis; bruit = AAA</b>"],
 ["Percuss / Palpate","<b>Loss of liver dullness = free air = perforation.</b> Fluid wave = ascites. Rebound = peritonitis. <b>Guarding (voluntary) vs Rigidity (involuntary = peritonism)</b>. ALWAYS do inguinal/genitalia + rectal + pelvic"],
 ["Key errors","Palpate before inspect/auscultate · skip rectal/pelvic/groin · over-rely on absent rebound · <b>miss peritonitis in immunosuppressed · forget mesenteric ischaemia (pain out of proportion)</b>"],
], cols(1.7,8.3)))

E.append(bar("5 — SIGNS BY CONDITION"))
E.append(grid([
 ["Paralytic ileus","Distension, minimal bowel sounds, no localized tenderness"],
 ["Intestinal obstruction","Distension, visible peristalsis (early)/quiet (late), diffuse pain no rebound, hernia/rectal mass"],
 ["Bleeding","Pallor, shock, distension, pulsatile (AAA) or tender (ectopic) mass"],
 ["Inflamed mass / abscess","Tender mass, bump tenderness, special signs (Murphy, psoas, obturator)"],
 ["Perforated viscus","Scaphoid tense abdomen, ↓bowel sounds (late), <b>loss of liver dullness</b>, guarding/rigidity"],
 ["Peritonitis","Motionless, absent bowel sounds (late), cough/rebound tenderness, guarding/rigidity"],
], cols(1.7,8.3)))

E.append(bar("6 — INVESTIGATIONS"))
E.append(grid([
 ["Bloods / urine","Neutrophil leukocytosis, CRP, ABG, <b>S. lactate (ischaemic bowel/sepsis)</b>, lipase/amylase (pancreatitis), LFT, <b>β-hCG (all women childbearing age)</b>. Urine: haematuria/pyuria, pregnancy test"],
 ["Imaging","<b>Erect CXR: subdiaphragmatic air = perforation (more sensitive than AXR; 1mL air visible). NOT usually in burst appendix.</b> AXR: air-fluid levels, string of pearls (SBO), stones (90% renal/10% gallstone). <b>US: best in pregnancy + gynae</b>; Doppler mesenteric. CT: best accuracy, unknown dx. CTA/MRA: mesenteric ischaemia + GI bleed (Dx + embolize)"],
 ["Endoscopy / laparoscopy","ERCP (cholangitis), sigmoidoscopy (detorse sigmoid volvulus), colonoscopy (lower GI bleed). Laparoscopy = Dx + therapeutic; young women (ruptured follicle/PID vs appendicitis)"],
], cols(1.7,8.3)))

E.append(bar("7 — MANAGEMENT &amp; SURGICAL DECISION"))
E.append(grid([
 ["Immediate","<b>ABC</b>: airway, O2 15L, large-bore cannula + IVF (N saline/Ringer's). Analgesia IV/IM. <b>NG tube</b> (vomiting/obstruction), <b>Foley</b> (hydration/urine), antibiotics (inflammation/perforation). Reassess + refer"],
 ["Urgent surgery","Bleeding (ruptured AAA, ectopic, bleeding PU → shock). Physical: involuntary guarding/rigidity, spreading tenderness, progressive distension, tender mass + fever/hypotension, suspected ischaemia (acidosis/fever/tachy), deterioration. Radiology: <b>pneumoperitoneum</b>, free contrast leak, mesenteric occlusion. Paracentesis: blood/bile/pus/bowel/urine"],
 ["When NOT to operate","<b>Surgical (conservative)</b>: appendicular mass, pancreatitis, acute diverticulitis, cholangitis, ruptured ovarian cyst. <b>Medical</b>: MI/pericarditis, pneumonia, porphyria/sickle, DKA, hepatitis, pyelonephritis"],
 ["NSAP","<b>Nonspecific abdominal pain = 1/3 of cases, commonest (esp children)</b>; mild, self-resolving (viral/mild bacterial). Manage: repeat exam, imaging, gynae consult"],
], cols(1.7,8.3)))

final=[]
for e in E: final.append(e); final.append(Spacer(1,2))
doc.build(final)
print("WROTE",OUT)
