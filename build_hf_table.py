# -*- coding: utf-8 -*-
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

OUT="Heart_Failure_Table.pdf"
S=getSampleStyleSheet()
TITLE=ParagraphStyle('TI',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=15,textColor=colors.HexColor('#7a1020'),spaceAfter=2)
SUB=ParagraphStyle('SU',parent=S['Normal'],fontName='Helvetica-Oblique',fontSize=7,textColor=colors.HexColor('#555'),spaceAfter=4)
SEC=ParagraphStyle('SEC',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=9.5,textColor=colors.white)
hd=ParagraphStyle('hd',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=7.0,leading=8.2,textColor=colors.white)
lab=ParagraphStyle('lab',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=7.1,leading=8.2,textColor=colors.HexColor('#7a1020'))
cell=ParagraphStyle('cell',parent=S['Normal'],fontName='Helvetica',fontSize=6.9,leading=8.1,textColor=colors.HexColor('#111'))

MAR=colors.HexColor('#7a1020'); LBLBG=colors.HexColor('#f0dcdf'); ALT=colors.HexColor('#faf3f4'); GRID=colors.HexColor('#c4a0a6')
def P(t,st=cell): return Paragraph(t,st)

page=landscape(A4); avail=page[0]-12*mm
doc=SimpleDocTemplate(OUT,pagesize=page,leftMargin=6*mm,rightMargin=6*mm,topMargin=6*mm,bottomMargin=6*mm)
W=avail
def cols(*fr):
    s=sum(fr); return [W*f/s for f in fr]

E=[]
E.append(Paragraph("HEART FAILURE — Clinical Revision Table (ESC 2021/2023)",TITLE))
E.append(Paragraph("Bold = high-yield. HF = clinical syndrome from structural/functional cardiac abnormality → ↑intracardiac pressure and/or ↓cardiac output.",SUB))

def bar(t):
    x=Table([[Paragraph(t,SEC)]],colWidths=[avail])
    x.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),MAR),('TOPPADDING',(0,0),(-1,-1),3),('BOTTOMPADDING',(0,0),(-1,-1),3),('LEFTPADDING',(0,0),(-1,-1),5)]))
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
        ts.add('BACKGROUND',(0,0),(-1,0),MAR); ts.add('BACKGROUND',(0,1),(0,-1),LBLBG)
        for i in range(1,len(data)):
            if i%2==0: ts.add('BACKGROUND',(1,i),(-1,i),ALT)
    else:
        ts.add('BACKGROUND',(0,0),(0,-1),LBLBG)
        for i in range(len(data)):
            if i%2==1: ts.add('BACKGROUND',(1,i),(-1,i),ALT)
    t.setStyle(ts); return t

# Classification
E.append(bar("1 — CLASSIFICATION BY EJECTION FRACTION"))
E.append(grid([
 ["HFrEF","<b>LVEF ≤40%</b> (reduced) — systolic failure","Symptoms ± signs","~50% of HF. Only group where prognosis improved by treatment"],
 ["HFmrEF","<b>LVEF 41–49%</b> (mildly reduced)","Symptoms ± signs","Intermediate"],
 ["HFpEF","<b>LVEF ≥50%</b> (preserved) — diastolic","Symptoms ± signs + objective structural/functional abnormality (LV diastolic dysfunction, ↑filling pressure, ↑natriuretic peptides)","~50% of HF. Common in elderly/HTN/AF. Survival ≈ HFrEF"],
], cols(1.0,2.0,3.0,4.0), ["Type","Definition (LVEF)","Criteria","Notes"]))

# Causes + pathophys
E.append(bar("2 — PATHOPHYSIOLOGY &amp; CAUSES"))
E.append(grid([
 ["Pathophysiology","Myocardial damage → ↓LV function → activation of neurohormonal systems (<b>SNS, RAAS, ↑AVP/ADH, ↑natriuretic peptides</b>) → vasoconstriction (↑afterload), Na/water retention (↑preload), hypertrophy/remodelling → vicious cycle → congestion + ↓output. CO = HR × SV; SV depends on preload, afterload, contractility"],
 ["Causes","<b>Coronary artery disease (commonest)</b>, hypertension, valvular disease, cardiomyopathies (dilated/hypertrophic/restrictive), arrhythmias (AF), congenital, myocarditis, pericardial disease. High-output: anaemia, thyrotoxicosis, AV fistula, Paget's. Toxins: alcohol, chemo (anthracyclines), drugs"],
], cols(1.3,8.7)))

# Symptoms/signs
E.append(bar("3 — SYMPTOMS &amp; SIGNS (ESC Table 6)"))
E.append(grid([
 ["Typical symptoms","<b>Breathlessness, orthopnoea, paroxysmal nocturnal dyspnoea (PND), reduced exercise tolerance, fatigue, ankle swelling</b>","Less typical: nocturnal cough, wheeze, bloating, anorexia, confusion (elderly), palpitation, dizziness, syncope, bendopnoea"],
 ["More specific signs","<b>↑JVP, hepatojugular reflux, third heart sound (gallop), laterally displaced apex beat</b>","Less specific: weight gain &gt;2kg/wk, cachexia, murmur, peripheral oedema, pulmonary crackles, pleural effusion, tachycardia, hepatomegaly, ascites, cold extremities, oliguria, narrow pulse pressure"],
], cols(1.3,4.5,4.2),["","High-yield","Other"]))

# Severity + stages
E.append(bar("4 — SEVERITY (NYHA) &amp; STAGES"))
E.append(grid([
 ["NYHA I","No limitation — ordinary activity no symptoms","<b>Stage A</b>","At risk (HTN, DM, CAD), no structural disease/symptoms"],
 ["NYHA II","Slight limitation — symptoms on ordinary activity","<b>Stage B</b>","Structural disease, NO symptoms (pre-HF)"],
 ["NYHA III","Marked limitation — symptoms on less than ordinary activity","<b>Stage C</b>","Structural disease + current/past symptoms"],
 ["NYHA IV","Symptoms at rest / any activity → discomfort","<b>Stage D</b>","Advanced/refractory HF, needs specialised intervention"],
], cols(0.9,4.2,1.0,3.9),["NYHA","Functional class","Stage","ACC/AHA stage"]))

# Epidemiology
E.append(bar("5 — EPIDEMIOLOGY &amp; PROGNOSIS"))
E.append(grid([
 ["Epidemiology","Incidence Europe ~3/1000 person-yrs. Prevalence ~1–2% adults, <b>&gt;10% if ≥70 yrs</b>. ~50% HFrEF, ~50% HFpEF/HFmrEF"],
 ["Prognosis","<b>1-yr mortality 20%, 5-yr mortality 53%</b> (all types). Poor QOL. Improvement confined to HFrEF. Women better survival than men"],
], cols(1.3,8.7)))

doc_break=Spacer(1,2)

# Diagnosis
E.append(bar("6 — DIAGNOSIS"))
E.append(grid([
 ["Chronic HF","All patients (Class I): <b>BNP/NT-proBNP, 12-lead ECG, transthoracic echo, chest X-ray</b>. Routine bloods (FBC, U&amp;E, glucose/HbA1c, TFT, lipids, iron studies)"],
 ["Acute HF","ECG, pulse oximetry, echo, labs, CXR, lung ultrasound + <b>natriuretic peptides</b>. <b>Rule OUT: BNP &lt;100 / NT-proBNP &lt;300 / MR-proANP &lt;120 pg/mL. Confirm: BNP ≥100 / NT-proBNP ≥300 / MR-proANP ≥120</b> → comprehensive echo"],
], cols(1.3,8.7)))

# Acute HF
E.append(bar("7 — ACUTE HEART FAILURE (in-hosp mortality 4–10%)"))
E.append(grid([
 ["4 presentations","<b>1. Acute decompensated HF</b> (commonest) <b>2. Acute pulmonary oedema</b> (severe dyspnoea, orthopnoea, crackles) <b>3. Isolated RV failure</b> (↑JVP, no congestion) <b>4. Cardiogenic shock</b> (hypoperfusion, ↓BP, oliguria, cold)"],
 ["Find precipitant (CHAMPIT)","<b>C</b>=acute Coronary syndrome · <b>H</b>=Hypertension emergency · <b>A</b>=Arrhythmia · <b>M</b>=Mechanical cause · <b>P</b>=Pulmonary embolism · <b>I</b>=Infection · <b>T</b>=Tamponade"],
 ["Management","Oxygen/ventilatory support (if hypoxic), <b>IV loop diuretics</b> (furosemide) for congestion, vasodilators if ↑BP, <b>inotropes/vasopressors if shock</b> (dobutamine, dopamine, milrinone, levosimendan, norepinephrine, epinephrine), treat the CHAMPIT cause, MCS if refractory"],
], cols(1.4,8.6)))

# Chronic HF management
E.append(bar("8 — CHRONIC HF MANAGEMENT"))
E.append(grid([
 ["HFrEF — 4 pillars","<b>1. ACEi/ARB or ARNI (sacubitril-valsartan)</b> · <b>2. Beta-blocker</b> · <b>3. MRA (spironolactone/eplerenone)</b> · <b>4. SGLT2 inhibitor (dapagliflozin/empagliflozin)</b> — all Class I. + Diuretic for fluid retention (symptom relief). Devices: ICD, CRT","Foundational therapy ↓mortality"],
 ["HFmrEF","Diuretics for congestion; <b>SGLT2 inhibitor</b> (dapa/empagliflozin); treat CV + non-CV comorbidities",""],
 ["HFpEF","<b>Diuretics</b> for fluid retention; <b>SGLT2 inhibitor</b>; treat underlying CV (HTN, AF) + non-CV comorbidities",""],
], cols(1.4,7.2,1.4),["","Therapy","Note"]))

# Drug doses
E.append(bar("9 — KEY DRUG DOSES (HFrEF)"))
E.append(grid([
 ["ACEi","Ramipril 2.5mg→10mg/d · Enalapril 2.5mg BD→10–20mg BD · Lisinopril 2.5–5→20–35mg/d","Monitor BP, U&amp;E, renal function"],
 ["ARNI","Sacubitril/valsartan 24/26mg BD → 97/103mg BD","Replaces ACEi (36h washout)"],
 ["Beta-blocker","Bisoprolol 1.25→10mg/d · Carvedilol 3.125→25mg BD","Start low, go slow"],
 ["MRA","Spironolactone / eplerenone 25mg → 50mg/d","Monitor K+, renal (avoid if K&gt;5/eGFR&lt;30)"],
 ["SGLT2 inhibitor","Dapagliflozin / empagliflozin 10mg/d","Euglycaemic DKA risk; genital infection"],
], cols(1.3,5.5,3.2),["Class","Dose (start → target)","Monitor"]))

# Advanced
E.append(bar("10 — ADVANCED HF &amp; MECHANICAL CIRCULATORY SUPPORT (MCS)"))
E.append(grid([
 ["Advanced HF","Persistent severe symptoms despite maximal therapy → consider MCS / transplant"],
 ["MCS indications","<b>BTD</b> Bridge to decision (ECMO/Impella in shock) · <b>BTC</b> Bridge to candidacy · <b>BTT</b> Bridge to transplantation (LVAD/TAH) · <b>BTR</b> Bridge to recovery · <b>DT</b> Destination therapy (long-term LVAD if transplant-ineligible)"],
], cols(1.4,8.6)))

final=[]
for e in E: final.append(e); final.append(Spacer(1,2))
doc.build(final)
print("WROTE",OUT)
