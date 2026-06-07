# -*- coding: utf-8 -*-
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

OUT = "Diabetes_Mellitus_Table.pdf"
S = getSampleStyleSheet()

TITLE = ParagraphStyle('TI', parent=S['Normal'], fontName='Helvetica-Bold', fontSize=15,
                       textColor=colors.HexColor('#0b3d5c'), spaceAfter=2)
SUB = ParagraphStyle('SU', parent=S['Normal'], fontName='Helvetica-Oblique', fontSize=7,
                     textColor=colors.HexColor('#555555'), spaceAfter=4)
SEC = ParagraphStyle('SEC', parent=S['Normal'], fontName='Helvetica-Bold', fontSize=9.5,
                     textColor=colors.white, spaceBefore=4, spaceAfter=0)
hd = ParagraphStyle('hd', parent=S['Normal'], fontName='Helvetica-Bold', fontSize=7.2,
                    leading=8.4, textColor=colors.white)
lab = ParagraphStyle('lab', parent=S['Normal'], fontName='Helvetica-Bold', fontSize=7.2,
                     leading=8.4, textColor=colors.HexColor('#0b3d5c'))
cell = ParagraphStyle('cell', parent=S['Normal'], fontName='Helvetica', fontSize=7.0,
                      leading=8.3, textColor=colors.HexColor('#111111'))

NAVY = colors.HexColor('#0b3d5c')
LBLBG = colors.HexColor('#dde8f0')
ALT = colors.HexColor('#f3f7fa')
GRID = colors.HexColor('#9bb4c4')

def P(t, st=cell): return Paragraph(t, st)

elements = []
elements.append(Paragraph("DIABETES MELLITUS — Clinical Revision Table", TITLE))
elements.append(Paragraph("Bold = high-yield. Glucose values in mg/dL. Covers definition, types, diagnosis, drugs, insulin, emergencies-prep.", SUB))

def section_bar(title):
    t = Table([[Paragraph(title, SEC)]], colWidths=[avail])
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),NAVY),
                           ('TOPPADDING',(0,0),(-1,-1),3),('BOTTOMPADDING',(0,0),(-1,-1),3),
                           ('LEFTPADDING',(0,0),(-1,-1),5)]))
    return t

def make_table(rows, col_w, header=None):
    data=[]
    if header:
        data.append([Paragraph(h, hd) for h in header])
    for r in rows:
        data.append([P(r[0], lab)] + [P(x) for x in r[1:]])
    t = Table(data, colWidths=col_w, repeatRows=1 if header else 0)
    ts = TableStyle([
        ('VALIGN',(0,0),(-1,-1),'TOP'),
        ('GRID',(0,0),(-1,-1),0.4,GRID),
        ('TOPPADDING',(0,0),(-1,-1),2.2),('BOTTOMPADDING',(0,0),(-1,-1),2.2),
        ('LEFTPADDING',(0,0),(-1,-1),3),('RIGHTPADDING',(0,0),(-1,-1),3),
    ])
    start=0
    if header:
        ts.add('BACKGROUND',(0,0),(-1,0),NAVY); start=1
    else:
        ts.add('BACKGROUND',(0,0),(0,-1),LBLBG)
    if header:
        ts.add('BACKGROUND',(0,1),(0,-1),LBLBG)
    for i in range(start,len(data)):
        if (i-start)%2==1:
            ts.add('BACKGROUND',(1 if not header else 1,i),(-1,i),ALT)
    t.setStyle(ts)
    return t

page = landscape(A4)
avail = page[0] - 12*mm
doc = SimpleDocTemplate(OUT, pagesize=page, leftMargin=6*mm, rightMargin=6*mm,
                        topMargin=6*mm, bottomMargin=6*mm)

W = avail
def cols(*fr):
    s=sum(fr); return [W*f/s for f in fr]

# --- Definition / homeostasis ---
elements.append(section_bar("1 — OVERVIEW &amp; HOMEOSTASIS"))
elements.append(make_table([
 ["DM = vascular disease","Lack / reduced effectiveness of insulin. <b>Microvascular</b>: retinopathy, nephropathy, neuropathy. <b>Macrovascular</b>: stroke, MI, renovascular, limb ischaemia. 415M (2015) → 642M by 2040."],
 ["Glucose control","<b>Post-meal</b>: ↑insulin → suppress hepatic glucose output, ↑muscle uptake, glycogen synthesis, ↑lipogenesis, suppress lipolysis. <b>Fasting</b>: ↓insulin → gluconeogenesis (glycogen, glycerol, amino acids). Brain depends on liver glucose."],
], cols(1.4,8.6)))

# --- Types ---
elements.append(section_bar("2 — TYPE 1 vs TYPE 2"))
elements.append(make_table([
 ["Onset","Adolescent (any age)","Usually &gt;40 (now teens too)"],
 ["Cause","<b>Autoimmune β-cell destruction</b> → insulin deficiency","<b>Insulin resistance + ↓secretion</b>; obesity, inactivity, alcohol/calorie excess"],
 ["Antibodies","Insulin, <b>GAD</b>, IA-2, ZnT8 (anti-GAD+IA-2 ~85%)","None"],
 ["Genetics","<b>HLA DR3±DR4</b>; twin concordance ~30%","No HLA; <b>≥80% twin concordance</b> (stronger genetic)"],
 ["Body / risk","<b>Ketoacidosis + weight loss</b>; must have insulin","Obesity, metabolic syndrome"],
 ["Presentation","Polyuria, polydipsia, ↓weight, ketosis","Asymptomatic or complication (e.g. MI)"],
 ["Variants","<b>LADA</b> = slow type 1 in adults (measure islet Ab if older+ketotic+slim)","<b>MODY</b> = autosomal dominant young; <b>C-peptide</b>: low=T1, high=insulin resistance"],
], cols(1.3,4.35,4.35), header=["","TYPE 1","TYPE 2"]))

# --- Prediabetes + other causes ---
elements.append(section_bar("3 — PREDIABETES, OTHER CAUSES, METABOLIC SYNDROME"))
elements.append(make_table([
 ["IGT","Fasting &lt;126 + OGTT 2h <b>140–199</b> (post-prandial defect)"],
 ["IFG","Fasting <b>110–125</b> (fasting defect; do OGTT). Lower progression risk than IGT. IFG + HbA1c 5.5–6.4% → ~25% develop DM"],
 ["Secondary causes","<b>Drugs</b>: steroids, anti-HIV, antipsychotics. <b>Pancreatic</b>: pancreatitis, surgery, trauma, haemochromatosis, CF, cancer. <b>Hormone excess</b>: acromegaly, Cushing's, glucagonoma, phaeochromocytoma, thyrotoxicosis. Gestational"],
 ["Metabolic syndrome","<b>≥3 of 5</b>: central obesity (BMI&gt;30 / waist &gt;40\"M, &gt;35\"F); BP ≥130/85; TG ≥150; HDL &lt;40M/&lt;50F; fasting glucose ≥100. Tx: exercise, weight loss, treat components"],
], cols(1.6,8.4)))

# --- Diagnosis ---
elements.append(section_bar("4 — DIAGNOSIS (WHO)"))
elements.append(make_table([
 ["Criteria","<b>Symptoms + 1 raised glucose</b> (fasting ≥126 OR random ≥200) <b>OR</b> raised on 2 occasions (no symptoms) <b>OR</b> OGTT 2h ≥200. Symptoms: polyuria, polydipsia, weight loss, blurring, genital thrush, lethargy"],
 ["HbA1c","&lt;5.7% normal · <b>5.7–6.4% prediabetes</b> · <b>≥6.5% diabetes</b>. = avg glucose 2–3 mo"],
 ["HbA1c caveats","<b>Avoid: pregnancy, haemoglobinopathies.</b> Falsely LOW: cirrhosis, recent blood loss, transfusion → use <b>fructosamine</b>"],
 ["OGTT method","Unrestricted carbs 3d → fast ≥8h → rest → seated/no smoking → glucose before + 2h after <b>75g</b> glucose"],
], cols(1.6,8.4)))

# --- Targets ---
elements.append(section_bar("5 — MANAGEMENT GENERAL &amp; TARGETS"))
elements.append(make_table([
 ["General","Education + lifestyle (exercise ↑insulin sensitivity), ↓sat fat/sugar, ↑starch. <b>Statin</b> (atorva/rosuva) + BP control + foot care. Bariatric = cure in selected. <b>Type 1 → urgent insulin + referral; Type 2 → lifestyle first, add orals</b>"],
 ["Glycaemic targets","<b>HbA1c &lt;7%</b> · preprandial 80–130 · peak postprandial &lt;180. Individualize (age, comorbidity, hypo-unawareness)"],
], cols(1.6,8.4)))

# --- Oral agents ---
elements.append(section_bar("6 — ORAL AGENTS"))
elements.append(make_table([
 ["Metformin (biguanide)","<b>Insulin sensitizer</b> — ↓hepatic glucose output","No hypo, weight-friendly. <b>FIRST-LINE all.</b> SE: GI. <b>Avoid eGFR ≤36 (lactic acidosis)</b>"],
 ["Sulfonylureas","<b>Insulin secretagogue</b> (gliclazide, glimepiride, glipizide)","SE: <b>hypoglycaemia, weight gain</b>. Avoid glibenclamide in elderly"],
 ["DPP-4 i / gliptins","Block DPP-4 → ↑incretin (GLP-1, GIP) → ↑insulin","Well tolerated, <b>weight neutral</b> (sita/vilda/saxa/lina/alogliptin)"],
 ["Glitazones (TZD)","↑insulin sensitivity","SE: fractures, <b>fluid retention</b>, ↑LFT. <b>CI: heart failure, osteoporosis</b>"],
 ["SGLT2 i (-gliflozin)","Block renal glucose reabsorption → glycosuria","<b>Empagliflozin ↓CV mortality.</b> SE: genital fungal, <b>euglycaemic DKA</b>"],
], cols(1.5,3.6,4.9), header=["Class","Mechanism","Key points / SE"]))

# --- Insulin + GLP1 ---
elements.append(section_bar("7 — INSULIN &amp; GLP-1 ANALOGUES"))
elements.append(make_table([
 ["Insulin types","Rapid: lispro, aspart, glulisine. Long-acting: glargine, detemir, degludec. Isophane (peak 4–12h). Pre-mixed (NovoMix 30). Strength 100 U/mL"],
 ["Regimens","<b>BD biphasic</b> (premixed, T2/regular T1) · <b>QDS basal-bolus</b> (T1 flexible) · <b>once-daily basal</b> (switching from tablets, retain metformin) · DAFNE = flexible dosing"],
 ["Sick-day rules","<b>NEVER stop insulin.</b> Illness ↑requirements. Maintain calories (milk). Check glucose ≥4×/day + ketonuria. ↑dose if rising. <b>Admit if vomiting/dehydrated/ketotic/child/pregnant.</b> Pump if disabling hypos"],
 ["GLP-1 analogues","Incretin mimetic: ↑insulin, ↓glucagon, slow gastric emptying. <b>BMI &gt;35.</b> Continue only if <b>HbA1c ↓≥1% + weight ↓≥3% in 6mo</b>. Daily (liraglutide) / weekly (semaglutide, dulaglutide); oral semaglutide. SE: nausea, small pancreatitis risk"],
], cols(1.6,8.4)))

for i,e in enumerate(elements):
    pass

# build with small spacers between
final=[]
for e in elements:
    final.append(e); final.append(Spacer(1,2))
doc.build(final)
print("WROTE", OUT)
