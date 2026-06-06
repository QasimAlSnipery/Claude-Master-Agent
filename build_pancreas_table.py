# -*- coding: utf-8 -*-
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT

OUT = "Pancreatic_Disorders_OnePage.pdf"

styles = getSampleStyleSheet()
H = ParagraphStyle('H', parent=styles['Normal'], fontName='Helvetica-Bold',
                   fontSize=11, textColor=colors.HexColor('#0b3d5c'), spaceAfter=2, alignment=TA_LEFT)
sub = ParagraphStyle('sub', parent=styles['Normal'], fontName='Helvetica-Oblique',
                     fontSize=6.2, textColor=colors.HexColor('#444444'))
cellL = ParagraphStyle('cellL', parent=styles['Normal'], fontName='Helvetica-Bold',
                       fontSize=6.3, leading=7.2, textColor=colors.white)
cell = ParagraphStyle('cell', parent=styles['Normal'], fontName='Helvetica',
                      fontSize=6.0, leading=7.0, textColor=colors.HexColor('#111111'))
rowhdr = ParagraphStyle('rowhdr', parent=styles['Normal'], fontName='Helvetica-Bold',
                        fontSize=6.4, leading=7.0, textColor=colors.HexColor('#0b3d5c'))

def C(t): return Paragraph(t, cell)
def L(t): return Paragraph(t, rowhdr)

# Column headers
col_heads = ["", "ACUTE PANCREATITIS", "CHRONIC PANCREATITIS", "AUTOIMMUNE PANCREATITIS", "PANCREATIC CANCER"]

rows = [
 ["Definition / Key fact",
  "Premature intracellular trypsinogen activation -> proteases digest pancreas + surrounding tissue. NFκB activation -> inflammation. Severity = balance proteolytic enzymes vs antiproteolytic factors (trypsin inhibitor, β2-macroglobulin, α1-antitrypsin, C1-esterase inh).",
  "Chronic inflammation -> <b>fibrosis + destruction of exocrine tissue</b>. DM in advanced disease (islets involved).",
  "Form of chronic pancreatitis that <b>mimics cancer</b> but <b>responds to steroids</b>. No acute attacks.",
  "<b>90% adenocarcinoma</b> from pancreatic ducts; early local invasion + nodal mets. Neuroendocrine tumours = slower, better prognosis."],

 ["Epidemiology",
  "3% of admitted abd pain; 2-28/100,000, rising. Overall mortality 10%. 80% mild (good outcome); 98% deaths in the 20% severe – 1/3 in 1st wk (multi-organ failure), rest from sepsis/infected necrosis.",
  "Middle-aged alcoholic men. Steatorrhoea once >90% exocrine tissue destroyed.",
  "May occur alone or with Sjögren's, PSC, IBD.",
  "10-15/100,000, rising to 100/100,000 if >70. Men 2x women. Most advanced at presentation. Overall survival 3-5%; median 6-10 mo (locally advanced), 3-5 mo (mets)."],

 ["Causes / Risk",
  "Gallstones, alcohol, pancreatic duct obstruction. (also drugs, ERCP, hyperCa, hyperTG – std).",
  "<b>~80% alcohol</b>. Poor countries: calcific in non-alcoholics (malnutrition, trace element/micronutrient deficiency, cassava).",
  "Autoimmune; ↑IgG4. Associated autoimmune disorders.",
  "Age, <b>smoking</b>, chronic pancreatitis. 5-10% genetic: hereditary pancreatitis, HNPCC, FAMMM."],

 ["Clinical features",
  "Severe constant <b>upper abd pain</b>, builds 15-60 min, <b>radiates to back</b>. N/V. Marked epigastric tenderness; guarding/rebound ABSENT early (retroperitoneal). Quiet/absent bowel sounds (ileus). Severe: hypoxia, hypovolaemic shock, oliguria. <b>Grey Turner's</b> (flanks) / <b>Cullen's</b> (periumbilical) = haemorrhage.",
  "<b>Almost all: abd pain</b>. 50% as 'acute' episodes (each -> permanent damage); 35% relentless progressive pain; rest painless w/ diarrhoea. Pain: ↑ductal pressure + nerve involvement; eased leaning forward / alcohol. Weight loss, steatorrhoea. DM 30% (70% if calcific). Erythema ab igne (hot water bottle).",
  "Abd pain, weight loss, <b>obstructive jaundice</b> WITHOUT acute attacks.",
  "Often asymptomatic until advanced: central abd pain, weight loss, <b>obstructive jaundice</b>. Pain = coeliac plexus invasion, gnawing, radiates to back, eased bending forward. Cachexia. 60% head of pancreas. <b>Courvoisier</b>: palpable GB + jaundice. May get diarrhoea, duodenal obstruction, DM, recurrent venous thrombosis."],

 ["Investigations",
  "<b>Dx: ↑serum amylase or lipase + US/CT swelling</b>. Lipase preferred (better accuracy). Amylase normalises 24-48h; persistently high = pseudocyst; massively ↑ peritoneal = ascites. Plain X-ray to exclude perforation/obstruction. US: gallstones, biliary obstruction, pseudocyst. <b>CECT 6-10d</b> for necrosis (↓enhancement); gas = infection.",
  "Aims: confirm dx, define pancreatic function, show anatomy before surgery. (US/CT calcification, MRCP, faecal elastase, EUS – std).",
  "<b>↑IgG / IgG4</b> + autoantibodies. Imaging: <b>diffusely enlarged ('sausage') pancreas</b>, narrowed pancreatic duct, lower bile duct stricture.",
  "<b>US + CECT</b>. Staging: EUS / laparoscopy + lap US (size, vessels, mets). EUS/CT-guided biopsy if inoperable. MRCP/ERCP sensitive; ERCP main role = <b>stent CBD</b> for jaundice in inoperable."],

 ["Severity / Grading",
  "<b>CRP peak >210 mg/L in first 4d = severe (80% accuracy)</b>. Serial CRP prognostic. <b>Amylase has NO prognostic value</b>. [Std scores: Glasgow-Imrie, Ranson, APACHE II; CT severity index/Balthazar].",
  "— (graded by exocrine function loss; steatorrhoea >90% destroyed).",
  "—",
  "TNM staging via EUS/laparoscopy. Resectable only 10-15% (most locally advanced)."],

 ["Management",
  "Steps: dx + severity; resuscitate (mild/severe); detect+treat complications; treat cause. <b>Opiate analgesia</b>; correct hypovolaemia w/ crystalloid (N saline). Severe -> HDU/ICU, CV line + urinary cath. O2; SIRS may need ventilation. Insulin for hyperglycaemia, IV Ca for hypocalcaemia. NG only if ileus. <b>Early enteral feeding</b> (NG = NJ; ↓endotoxaemia). LMWH prophylaxis. <b>NO prophylactic abx</b>; infected necrosis -> carbapenem/quinolone + metronidazole. Cholangitis/jaundice + severe -> <b>urgent ERCP</b>. Gallstone (less severe): MRCP/EUS after acute phase; <b>cholecystectomy within 2 wks</b> of resolution (same admission).",
  "<b>1. Alcohol avoidance</b> (halts progression, ↓pain). <b>2. Pain</b>: NSAIDs; opiates (addiction risk); pregabalin/TCA low dose; pancreatic enzymes; coeliac plexus neurolysis (often relapses); total pancreatectomy last resort (causes brittle DM). <b>3. Malabsorption</b>: low-fat diet (+MCT), pancreatic enzyme supplements, <b>PPI</b> (optimise duodenal pH). <b>4. Complications</b>: pseudocyst, ascites, CBD/duodenal stricture, portal HTN.",
  "<b>Glucocorticoids</b> (excellent response); some need <b>azathioprine</b>.",
  "<b>Surgical resection = only cure</b> (5-yr ~12%); adjuvant <b>gemcitabine</b> -> 21-29%. Only 10-15% resectable. Most palliative. Palliative chemo <b>FOLFIRINOX</b> (5-FU, leucovorin, irinotecan, oxaliplatin) -> median 11 mo. Pain: analgesia / coeliac plexus neurolysis. Jaundice: choledochojejunostomy (fit) or stent (elderly/advanced). Ampullary/periampullary AC: less aggressive, 25% 5-yr after resection."],

 ["Complications",
  "Pancreatic fluid collection -> <b>pseudocyst</b> (matures ~6 wks; >6 cm rarely resolves, may erode vessels -> pseudoaneurysm, palpable mass). Pancreatic ascites (duct leak). Pleural effusion / pleuro-pancreatic fistula. Necrosis, abscess, multi-organ failure. Pseudocyst drainage (cystogastrostomy) after >=6 wks; infected necrosis/abscess -> endoscopic drainage or MIRP necrosectomy.",
  "DM, malabsorption/steatorrhoea, pseudocyst, ascites, CBD/duodenal stricture, portal HTN, opiate dependence.",
  "Can mimic/be mistaken for cancer.",
  "Mets (nodes, liver), biliary/duodenal obstruction, recurrent venous thrombosis, acute pancreatitis."],
]

data = [[Paragraph(h, cellL) for h in col_heads]]
for r in rows:
    data.append([L(r[0])] + [C(x) for x in r[1:]])

page = landscape(A4)
doc = SimpleDocTemplate(OUT, pagesize=page,
                        leftMargin=6*mm, rightMargin=6*mm, topMargin=6*mm, bottomMargin=5*mm)
avail = page[0] - 12*mm
c0 = 22*mm
rest = (avail - c0) / 4.0
colw = [c0, rest, rest, rest, rest]

t = Table(data, colWidths=colw, repeatRows=1)
ts = TableStyle([
    ('BACKGROUND',(0,0),(-1,0),colors.HexColor('#0b3d5c')),
    ('BACKGROUND',(0,1),(0,-1),colors.HexColor('#dde8f0')),
    ('VALIGN',(0,0),(-1,-1),'TOP'),
    ('GRID',(0,0),(-1,-1),0.4,colors.HexColor('#9bb4c4')),
    ('TOPPADDING',(0,0),(-1,-1),2),
    ('BOTTOMPADDING',(0,0),(-1,-1),2),
    ('LEFTPADDING',(0,0),(-1,-1),2.5),
    ('RIGHTPADDING',(0,0),(-1,-1),2.5),
])
# alternate row shading on data cols
for i in range(1,len(data)):
    if i % 2 == 0:
        ts.add('BACKGROUND',(1,i),(-1,i),colors.HexColor('#f3f7fa'))
t.setStyle(ts)

title = Paragraph("PANCREATIC DISORDERS — Clinical One-Page Review", H)
note = Paragraph("Acute vs Chronic vs Autoimmune Pancreatitis vs Pancreatic Cancer. Bold = high-yield. [bracketed] = standard exam knowledge added beyond lecture.", sub)

doc.build([title, note, Spacer(1,3), t])
print("WROTE", OUT)
