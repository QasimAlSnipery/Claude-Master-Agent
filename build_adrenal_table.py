# -*- coding: utf-8 -*-
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

OUT = "Adrenal_Gland_Diseases_Table.pdf"
S = getSampleStyleSheet()

TITLE = ParagraphStyle('TI', parent=S['Normal'], fontName='Helvetica-Bold', fontSize=15,
                       textColor=colors.HexColor('#0b3d5c'), spaceAfter=2)
SUB = ParagraphStyle('SU', parent=S['Normal'], fontName='Helvetica-Oblique', fontSize=7,
                     textColor=colors.HexColor('#555555'), spaceAfter=4)
SEC = ParagraphStyle('SEC', parent=S['Normal'], fontName='Helvetica-Bold', fontSize=9.5,
                     textColor=colors.white)
hd = ParagraphStyle('hd', parent=S['Normal'], fontName='Helvetica-Bold', fontSize=7.0,
                    leading=8.2, textColor=colors.white)
lab = ParagraphStyle('lab', parent=S['Normal'], fontName='Helvetica-Bold', fontSize=7.1,
                     leading=8.2, textColor=colors.HexColor('#0b3d5c'))
cell = ParagraphStyle('cell', parent=S['Normal'], fontName='Helvetica', fontSize=6.8,
                      leading=8.0, textColor=colors.HexColor('#111111'))

NAVY = colors.HexColor('#0b3d5c'); LBLBG = colors.HexColor('#dde8f0')
ALT = colors.HexColor('#f3f7fa'); GRID = colors.HexColor('#9bb4c4')

def P(t, st=cell): return Paragraph(t, st)

page = landscape(A4)
avail = page[0] - 12*mm
doc = SimpleDocTemplate(OUT, pagesize=page, leftMargin=6*mm, rightMargin=6*mm,
                        topMargin=6*mm, bottomMargin=6*mm)
W = avail
def cols(*fr):
    s=sum(fr); return [W*f/s for f in fr]

elements=[]
elements.append(Paragraph("ADRENAL GLAND DISEASES — Clinical Revision Table", TITLE))
elements.append(Paragraph("Bold = high-yield. <b>SYMPTOMS column = standard clinical knowledge added (not in lecture).</b> Glands: cortex → cortisol/aldosterone/androgens; medulla → catecholamines.", SUB))

def section_bar(title):
    t=Table([[Paragraph(title, SEC)]], colWidths=[avail])
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),NAVY),('TOPPADDING',(0,0),(-1,-1),3),
                           ('BOTTOMPADDING',(0,0),(-1,-1),3),('LEFTPADDING',(0,0),(-1,-1),5)]))
    return t

def grid(rows, col_w, header):
    data=[[Paragraph(h, hd) for h in header]]
    for r in rows:
        data.append([P(r[0],lab)]+[P(x) for x in r[1:]])
    t=Table(data,colWidths=col_w,repeatRows=1)
    ts=TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('GRID',(0,0),(-1,-1),0.4,GRID),
        ('TOPPADDING',(0,0),(-1,-1),2.2),('BOTTOMPADDING',(0,0),(-1,-1),2.2),
        ('LEFTPADDING',(0,0),(-1,-1),3),('RIGHTPADDING',(0,0),(-1,-1),3),
        ('BACKGROUND',(0,0),(-1,0),NAVY),('BACKGROUND',(0,1),(0,-1),LBLBG)])
    for i in range(1,len(data)):
        if i%2==0: ts.add('BACKGROUND',(1,i),(-1,i),ALT)
    t.setStyle(ts); return t

HDR=["Disease","Cause / pathophysiology","SYMPTOMS &amp; SIGNS (added)","Investigations","Management"]
CW=cols(1.5,2.5,2.7,2.6,2.4)

# CORTISOL EXCESS
elements.append(section_bar("CORTISOL EXCESS — CUSHING'S SYNDROME"))
elements.append(grid([
 ["Cushing's syndrome (general)",
  "Cortisol excess. <b>Commonest = iatrogenic steroids</b> (even inhaled/topical). Endogenous: pituitary (disease), adrenal tumour, ectopic ACTH. F:M 4:1 (ectopic = M)",
  "<b>Moon face, plethora, central obesity, buffalo hump, supraclavicular fat. Purple striae, easy bruising, thin skin. Proximal myopathy (can't rise from chair). Hirsutism, acne. HTN, weight gain. Mood change/psychosis, depression. Oligo/amenorrhoea, ↓libido. Osteoporosis, glucose intolerance/DM, poor healing, infections</b>",
  "<b>2-step.</b> Confirm (2 of 3): fail LDDST (0.5mg QDS 48h), ↑late-night cortisol (lost circadian), ↑24h UFC. Then ACTH: <b>undetectable=adrenal</b>; high=pituitary/ectopic. HDDST suppresses pituitary not ectopic; MRI; BIPSS; CT adrenal",
  "Untreated severe = <b>50% 5-yr mortality</b>. Surgery mainstay. Medical: <b>metyrapone, ketoconazole, osilodrostat</b> (titrate to cortisol)"],
 ["Cushing's DISEASE (pituitary)",
  "Pituitary <b>ACTH-secreting microadenoma</b> (&lt;10mm). Retains some feedback",
  "As above + possible secondary hypogonadism. Macroadenoma mass effects rare",
  "ACTH high; suppresses on HDDST; +CRH stim; MRI ~60% sensitive; BIPSS confirms",
  "<b>Trans-sphenoidal surgery</b> (70% remission, 20% recur → lifelong follow-up). Bilateral adrenalectomy → <b>Nelson's</b>. Pasireotide"],
 ["Ectopic ACTH",
  "Non-pituitary ACTH (lung small-cell, <b>bronchial carcinoid</b>). No feedback → ↑↑ACTH+cortisol",
  "<b>Marked pigmentation, hypokalaemic alkalosis, severe myopathy, hyperglycaemia, oedema.</b> Classic Cushing features LESS common; rapid + cachexia if malignant",
  "ACTH high, NOT suppressed by HDDST; CT chest/abdomen to find tumour",
  "Remove tumour (carcinoid). Incurable → medical or bilateral adrenalectomy"],
 ["Adrenal tumour",
  "Cortisol-secreting adenoma or carcinoma (&gt;5cm, malignant features)",
  "Cushingoid features; adenoma slower, carcinoma rapid ± abdominal mass/pain",
  "ACTH <b>undetectable</b>; CT/MRI adrenal",
  "<b>Laparoscopic adrenalectomy</b> (adenoma). Carcinoma: surgery+radiotherapy+<b>mitotane</b> (poor prognosis)"],
], CW, HDR))

# ADRENAL INSUFFICIENCY
elements.append(section_bar("CORTISOL/ALDOSTERONE DEFICIENCY — ADRENAL INSUFFICIENCY"))
elements.append(grid([
 ["Adrenal insufficiency (general)",
  "↓cortisol ± aldosterone. <b>Commonest = ACTH deficiency (secondary)</b> from steroid withdrawal / pituitary tumour. Addison's + CAH rarer",
  "<b>Fatigue, weakness, weight loss, anorexia, N&amp;V, abdominal pain, dizziness/postural hypotension, salt craving, myalgia. Often misdiagnosed as depression/CFS</b>",
  "Suspect if unexplained fatigue, <b>hyponatraemia, hypotension</b>",
  "Lifelong replacement after stabilization"],
 ["Addison's (primary)",
  "Autoimmune (21-hydroxylase Ab) commonest; also TB, mets, HIV. Eventually fails GC+MC",
  "<b>All above + PIGMENTATION (palmar creases, buccal, scars) from ↑ACTH/MSH. Vitiligo 10-20%. Weight loss uniform.</b> May have other autoimmune disease (APS I/II)",
  "<b>Short Synacthen test</b> (cortisol fails to rise). ACTH HIGH. 21-OH Ab; supine renin↑/aldo low; CT if Ab-ve",
  "<b>Hydrocortisone 15-20mg/d</b> + <b>fludrocortisone 0.05-0.15mg/d</b> (MC, primary only). ± DHEAS women"],
 ["Acute adrenal crisis",
  "Precipitated by illness, surgery, infection in known/unknown insufficiency",
  "<b>Circulatory SHOCK, severe hypotension, hypoNa, hyperK, hypoglycaemia ± hyperCa. Cramps, N&amp;V, diarrhoea, fever, confusion</b>",
  "<b>TREAT BEFORE LABS.</b> Store cortisol/ACTH",
  "<b>IV hydrocortisone + IV saline/glucose immediately.</b> No delay"],
 ["Secondary (ACTH deficiency)",
  "Steroid withdrawal (commonest), pituitary disease. HPA recovery ≥1 yr",
  "Same as primary BUT <b>NO pigmentation</b> (low ACTH) &amp; <b>NO hyperkalaemia</b> (aldosterone intact)",
  "Short Synacthen fails; <b>ACTH LOW</b>",
  "Hydrocortisone only — <b>fludrocortisone NOT needed</b>. Alternate-day steroids ↓suppression"],
], CW, HDR))

# ALDOSTERONE EXCESS
elements.append(section_bar("ALDOSTERONE EXCESS — PRIMARY HYPERALDOSTERONISM"))
elements.append(grid([
 ["Primary hyperaldosteronism",
  "<b>Up to 10% of HTN.</b> Most = <b>bilateral adrenal hyperplasia</b>; minority = <b>APA (Conn's)</b>. Rare: GC-suppressible (AD)",
  "<b>Often asymptomatic. HTN (resistant). Hypokalaemia → muscle weakness/paralysis (esp SE Asian), polyuria/nocturia, cramps, tetany. Oedema (Na retention).</b> Accelerated HTN rare",
  "Test if hypokalaemia/resistant HTN/young/FH. <b>↑ARR (aldosterone:renin)</b>. Bloods: hypokalaemic alkalosis, Na high-normal. Confirm: low renin+high aldo → saline suppression. CT/MRI; <b>adrenal vein sampling</b>",
  "<b>MR antagonist: spironolactone</b> (gynaecomastia 20%) or eplerenone; amiloride. APA → <b>laparoscopic adrenalectomy</b> (HTN persists ~70%)"],
], CW, HDR))

# CATECHOLAMINE EXCESS
elements.append(section_bar("CATECHOLAMINE EXCESS — PHAEOCHROMOCYTOMA / PARAGANGLIOMA"))
elements.append(grid([
 ["Phaeo / paraganglioma",
  "Catecholamine-secreting NET. <b>80% adrenal medulla, 20% extra-adrenal. 15% malignant. 40% inherited</b> (NF, VHL, MEN 2a/2b, SDH genes)",
  "<b>Classic triad: episodic HEADACHE + SWEATING + PALPITATIONS. Paroxysmal/sustained HTN, pallor, anxiety/panic, tremor, chest/abd pain, weight loss. Postural hypotension between attacks</b>",
  "<b>Plasma/urine metanephrines + normetanephrines</b> (false+ in stress/TCA → repeat). Chromogranin A. Genetic test if &lt;50/FH. <b>CT/MRI; MIBG scintigraphy; DOTATATE-PET</b>",
  "Pre-op ≥6 wks: <b>α-blocker (phenoxybenzamine) FIRST</b>, then β-blocker if tachycardia. <b>NEVER β before α</b> (paradoxical ↑BP). Surgery; intra-op nitroprusside/phentolamine"],
], CW, HDR))

# CAH
elements.append(section_bar("ENZYME DEFECT — CONGENITAL ADRENAL HYPERPLASIA (CAH)"))
elements.append(grid([
 ["CAH (21-OH deficiency)",
  "<b>Autosomal recessive.</b> Cortisol enzyme block → ↓feedback → <b>↑ACTH → hyperplasia + androgen excess</b>. <b>21-hydroxylase = commonest</b> → ↑17-OH-progesterone",
  "<b>Severe (1/3, infancy): ambiguous genitalia (girls), salt-wasting crisis (vomiting, dehydration, shock). Milder (2/3): precocious pseudo-puberty (boys), virilization. Late-onset: adult female hirsutism + amenorrhoea</b>",
  "<b>↑17-OH-progesterone.</b> ↑androgens, low gonadotrophins (distinguishes pseudo from true precocious). Renin (salt-wasting). <b>17/11β-OH deficiency → HTN</b> (11-deoxycorticosterone)",
  "Replace corticosteroids + <b>suppress ACTH-driven androgens</b> (balance vs Cushingoid). Children: monitor growth velocity. Late-onset: anti-androgen if hirsutism main issue"],
], CW, HDR))

final=[]
for e in elements:
    final.append(e); final.append(Spacer(1,2))
doc.build(final)
print("WROTE", OUT)
