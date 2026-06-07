# -*- coding: utf-8 -*-
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

OUT="Infective_Endocarditis_Table.pdf"
S=getSampleStyleSheet()
TITLE=ParagraphStyle('TI',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=15,textColor=colors.HexColor('#5a3010'),spaceAfter=2)
SUB=ParagraphStyle('SU',parent=S['Normal'],fontName='Helvetica-Oblique',fontSize=7,textColor=colors.HexColor('#555'),spaceAfter=4)
SEC=ParagraphStyle('SEC',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=9.5,textColor=colors.white)
hd=ParagraphStyle('hd',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=7.0,leading=8.2,textColor=colors.white)
lab=ParagraphStyle('lab',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=7.1,leading=8.2,textColor=colors.HexColor('#5a3010'))
cell=ParagraphStyle('cell',parent=S['Normal'],fontName='Helvetica',fontSize=6.9,leading=8.1,textColor=colors.HexColor('#111'))

BR=colors.HexColor('#5a3010'); LBLBG=colors.HexColor('#ece0d2'); ALT=colors.HexColor('#f9f4ee'); GRID=colors.HexColor('#b8a088')
def P(t,st=cell): return Paragraph(t,st)
page=landscape(A4); avail=page[0]-12*mm
doc=SimpleDocTemplate(OUT,pagesize=page,leftMargin=6*mm,rightMargin=6*mm,topMargin=6*mm,bottomMargin=6*mm)
W=avail
def cols(*fr):
    s=sum(fr); return [W*f/s for f in fr]
def bar(t):
    x=Table([[Paragraph(t,SEC)]],colWidths=[avail])
    x.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),BR),('TOPPADDING',(0,0),(-1,-1),3),('BOTTOMPADDING',(0,0),(-1,-1),3),('LEFTPADDING',(0,0),(-1,-1),5)]))
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
        ts.add('BACKGROUND',(0,0),(-1,0),BR); ts.add('BACKGROUND',(0,1),(0,-1),LBLBG)
        for i in range(1,len(data)):
            if i%2==0: ts.add('BACKGROUND',(1,i),(-1,i),ALT)
    else:
        ts.add('BACKGROUND',(0,0),(0,-1),LBLBG)
        for i in range(len(data)):
            if i%2==1: ts.add('BACKGROUND',(1,i),(-1,i),ALT)
    t.setStyle(ts); return t

E=[]
E.append(Paragraph("INFECTIVE ENDOCARDITIS — Clinical Revision Table (Dr Ali Jabari 2025)",TITLE))
E.append(Paragraph("Bold = high-yield. IE = microbial infection of heart valve (native/prosthetic), chamber lining, vessel, or congenital anomaly.",SUB))

E.append(bar("1 — DEFINITION, EPIDEMIOLOGY &amp; PATHOPHYSIOLOGY"))
E.append(grid([
 ["Epidemiology","5–15/100,000/yr; <b>&gt;50% over 60 yrs</b>. Underlying: RHD 24%, CHD 19%, other (calcified AV, MVP) 25%, none 32%. <b>Case fatality ~20% even treated</b> (worse in PVE / resistant organisms)"],
 ["Pathophysiology","Occurs at <b>endothelial damage</b> (high-pressure jets: VSD, MR, AR) → platelet/fibrin deposits colonized by organisms → <b>vegetations</b> (organisms+fibrin+platelets) → obstruction/embolism, abscess, cusp perforation, chordae rupture. Virulent <b>S. aureus → normal heart</b>; TV endocarditis common in IDU. Low-pressure (large ASD) = minimal risk. Extracardiac: vasculitis, mycotic aneurysm, splenic/renal infarct, immune GN"],
], cols(1.3,8.7)))

E.append(bar("2 — MICROBIOLOGY"))
E.append(grid([
 ["S. aureus (incl MRSA) 31%","<b>Acute, aggressive valve destruction; 50% of IDU cases</b>; mortality 25–40% (left heart)"],
 ["Strep viridans 19%","Oropharyngeal, α-haemolytic, <b>subacute</b>, penicillin-sensitive"],
 ["CoNS (epidermidis/lugdunensis) 10%","<b>Prosthetic / foreign body, nosocomial</b>"],
 ["Enterococci 10%","GI flora, UTI/nosocomial; needs <b>bactericidal synergy (+ gentamicin)</b>"],
 ["Strep bovis/gallolyticus 7%","GI flora — <b>associated with colon polyps/cancer → colonoscopy</b>; subacute, PCN-sensitive"],
 ["HACEK 2% / Culture-neg 14%","HACEK = fastidious G−ve, +culture &gt;5d, large vegetations. <b>Culture-neg</b>: prior antibiotics, <b>Coxiella (Q fever), Bartonella (cat scratch), Candida/fungi</b>, Brucella"],
], cols(1.7,8.3)))
E.append(grid([["Acute vs subacute","<b>Acute</b> = S. aureus, Strep pneumoniae. <b>Subacute</b> = Strep viridans, Enterococci"]], cols(1.7,8.3)))

E.append(bar("3 — CLINICAL FEATURES"))
E.append(grid([
 ["Symptoms","Fever, chills, <b>night sweats</b>, retrosternal chest pain, dyspnoea/cough, headache/confusion/stroke, N/V/abdominal pain, weight loss, arthralgia/myalgia/back pain"],
 ["General signs","Fever, <b>peripheral embolism, clubbing</b>, neurological signs. <b>Cardiac murmur 85%</b> (uncommon subacute). Splenomegaly (subacute)"],
 ["Peripheral stigmata","<b>Splinter haemorrhages</b> (nail fold) · <b>Petechiae</b> (conjunctiva/palate) · <b>Osler's nodes</b> = PAINFUL fingertip nodules · <b>Janeway lesions</b> = PAINLESS palm/sole macules · <b>Roth's spots</b> = retinal haemorrhage + central pallor"],
 ["DDx","Meningococcal septicaemia, viral illness, hidden abscess, TB, lymphoma, RHD, vasculitis (SLE/RA)"],
], cols(1.5,8.5)))

E.append(bar("4 — DIAGNOSIS (Modified Duke Criteria) &amp; WORKUP"))
E.append(grid([
 ["MAJOR","<b>1. Blood culture +ve</b>: typical organism ×2, OR persistent +ve &gt;12h apart, OR ≥3 +ve over &gt;1h. <b>2. Endocardial</b>: vegetation on echo OR new valvular regurgitation"],
 ["MINOR","Predisposing valve/cardiac abnormality · IDU · fever ≥38°C · <b>embolic phenomenon</b> · <b>vasculitic phenomenon</b> · suggestive blood culture · suggestive echo"],
 ["Diagnosis","<b>2 major, OR 1 major + 3 minor, OR 5 minor</b>"],
 ["Workup","<b>Blood cultures</b> (key), <b>echo (TTE→TOE)</b>, serial ECG (conduction block = abscess), gated cardiac CT, FDG-PET/CT, brain/spine imaging"],
], cols(1.3,8.7)))

E.append(bar("5 — ANTIBIOTIC TREATMENT (usually 4–6 wks from 1st negative culture)"))
E.append(grid([
 ["Empiric NVE / late PVE (&gt;12m)","<b>Vancomycin + ceftriaxone</b>"],
 ["Early PVE (&lt;12m)","Vanc + CTX <b>± gentamicin</b>"],
 ["Strep","Penicillin / ampicillin / ceftriaxone (± gent if PVE)"],
 ["Staph","<b>MRSA → vancomycin or daptomycin.</b> <b>MSSA → nafcillin/oxacillin/cefazolin</b> (β-lactam &gt; vanc); rifampin/gent if PVE"],
 ["Enterococci","<b>Ampicillin + (ceftriaxone or gentamicin)</b>; VRE → linezolid/daptomycin"],
 ["Gram-neg / Fungi","HACEK → ceftriaxone/ampicillin/FQ. Pseudomonas → 2 agents. Candida → amphotericin B ± flucytosine/micafungin. Aspergillus → ampho B or voriconazole (+ ophthal consult)"],
], cols(1.9,8.1)))
E.append(grid([["Duration note","IV→PO after ≥10d if appropriate. <b>Uncomplicated right-sided NVE / PCN-sensitive Strep → 2 wks may suffice.</b> Continue anticoagulant unless stroke/ICH/surgery"]], cols(1.9,8.1)))

E.append(bar("6 — SURGERY, COMPLICATIONS &amp; PROPHYLAXIS"))
E.append(grid([
 ["Surgery indications","<b>Emergent</b>: refractory cardiogenic shock; PVE dysfunction/dehiscence. <b>Urgent</b>: severe HF; penetrating infection (periannular abscess, heart block, fistula); persistent infection (+culture &gt;5d, large/growing vegetation); emboli (recurrent or &gt;10mm + severe AR/MR); S. aureus/fungal/MDR. Cerebral emboli NOT contraindication unless severe stroke/ICH"],
 ["Complications","Peripheral embolism, <b>stroke</b>, HF, <b>AV block / conduction disorders</b>, acute renal failure"],
 ["Prophylaxis","<b>Not routine.</b> Need BOTH high-risk condition + high-risk procedure. <b>Conditions</b>: prosthetic valve, previous IE, cyanotic CHD (unrepaired/palliative), 1st 6m after complete repair, transplant valvulopathy. NOT for acquired VHD/BAV/MVP/HCM. <b>Procedure</b>: dental gingival/periapical/mucosal. <b>Regimen: amoxicillin 2g PO 30–60min before</b> (PCN-allergic → cephalexin/azithro/clarithro/doxy)"],
], cols(1.4,8.6)))

final=[]
for e in E: final.append(e); final.append(Spacer(1,2))
doc.build(final)
print("WROTE",OUT)
