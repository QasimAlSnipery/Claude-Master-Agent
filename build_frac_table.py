# -*- coding: utf-8 -*-
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

OUT="Fracture_Late_Complications_Table.pdf"
S=getSampleStyleSheet()
TITLE=ParagraphStyle('TI',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=15,textColor=colors.HexColor('#3a2c6e'),spaceAfter=2)
SUB=ParagraphStyle('SU',parent=S['Normal'],fontName='Helvetica-Oblique',fontSize=7,textColor=colors.HexColor('#555'),spaceAfter=4)
SEC=ParagraphStyle('SEC',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=9.5,textColor=colors.white)
hd=ParagraphStyle('hd',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=7.2,leading=8.4,textColor=colors.white)
lab=ParagraphStyle('lab',parent=S['Normal'],fontName='Helvetica-Bold',fontSize=7.2,leading=8.4,textColor=colors.HexColor('#3a2c6e'))
cell=ParagraphStyle('cell',parent=S['Normal'],fontName='Helvetica',fontSize=7.0,leading=8.3,textColor=colors.HexColor('#111'))

PU=colors.HexColor('#3a2c6e'); LBLBG=colors.HexColor('#e1dcf0'); ALT=colors.HexColor('#f5f3fb'); GRID=colors.HexColor('#a99fc9')
def P(t,st=cell): return Paragraph(t,st)
page=landscape(A4); avail=page[0]-12*mm
doc=SimpleDocTemplate(OUT,pagesize=page,leftMargin=6*mm,rightMargin=6*mm,topMargin=6*mm,bottomMargin=6*mm)
W=avail
def cols(*fr):
    s=sum(fr); return [W*f/s for f in fr]
def bar(t):
    x=Table([[Paragraph(t,SEC)]],colWidths=[avail])
    x.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),PU),('TOPPADDING',(0,0),(-1,-1),3),('BOTTOMPADDING',(0,0),(-1,-1),3),('LEFTPADDING',(0,0),(-1,-1),5)]))
    return x
def grid(rows,col_w,header):
    data=[[Paragraph(h,hd) for h in header]]
    for r in rows: data.append([P(r[0],lab)]+[P(x) for x in r[1:]])
    t=Table(data,colWidths=col_w,repeatRows=1)
    ts=TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('GRID',(0,0),(-1,-1),0.4,GRID),
        ('TOPPADDING',(0,0),(-1,-1),2.4),('BOTTOMPADDING',(0,0),(-1,-1),2.4),
        ('LEFTPADDING',(0,0),(-1,-1),3),('RIGHTPADDING',(0,0),(-1,-1),3),
        ('BACKGROUND',(0,0),(-1,0),PU),('BACKGROUND',(0,1),(0,-1),LBLBG)])
    for i in range(1,len(data)):
        if i%2==0: ts.add('BACKGROUND',(1,i),(-1,i),ALT)
    t.setStyle(ts); return t

E=[]
E.append(Paragraph("FRACTURES — LATE LOCAL COMPLICATIONS (Revision Table)",TITLE))
E.append(Paragraph("Bold = high-yield. Perkins' timetable (normal): callus 2-3 wks (both); UNION upper 4-6 / lower 8-12 wks; CONSOLIDATION upper 6-8 / lower 12-16 wks.",SUB))

HDR=["Complication","Cause / pathophysiology","Clinical &amp; X-ray","Treatment"]
CW=cols(1.4,3.3,2.9,2.4)

E.append(bar("BONE UNION PROBLEMS"))
E.append(grid([
 ["Delayed union","Fracture unites slower than usual. <b>Inadequate blood supply, severe soft-tissue damage, periosteal stripping, excessive traction, insufficient splintage, infection, intact fellow bone</b>",
  "Fracture tenderness (esp. on stress). <b>X-ray: visible fracture line, little callus / periosteal reaction</b>",
  "Conservative: eliminate cause, immobilize, exercise. <b>Operative if &gt;6 months + no callus → internal fixation + bone grafting</b>"],
 ["Non-union","<b>Will NEVER unite without intervention</b>; gap filled by fibrous tissue (<b>pseudoarthrosis</b>). Improper Tx of delayed union, too large gap, soft-tissue interposition (periosteum/muscle/cartilage)",
  "<b>Painless movement at fracture site.</b> X-ray: clear fracture, ends rounded/smooth/sclerotic. <b>Atrophic</b> = inactive/avascular/tapered; <b>Hypertrophic</b> = excess bone but can't bridge gap",
  "<b>Hypertrophic → rigid fixation</b> (± graft). <b>Atrophic → fixation + bone grafting</b>"],
 ["Malunion","Unite in <b>unsatisfactory position</b> (angulation/rotation/shortening). Failure to reduce or hold reduction; collapse of comminuted/osteoporotic bone",
  "Deformity, shortening, limited movement",
  "<b>Angulation &gt;15° (long bone)</b> → osteotomy + IF. Marked rotation → osteotomy + IF. <b>Shortening &gt;3cm (lower limb)</b> → raised boot or bone op"],
], CW, HDR))

E.append(bar("JOINT &amp; SOFT-TISSUE COMPLICATIONS"))
E.append(grid([
 ["Joint stiffness","Common after <b>immobilization</b> (knee, elbow, shoulder, hand). Oedema/fibrosis of capsule/ligaments, intra/peri-articular adhesions, synovial adhesions from <b>haemarthrosis</b>",
  "Restricted joint movement",
  "<b>Prevent: exercise + correct splint position.</b> Physio; intra-articular adhesions → <b>manipulation under anaesthesia + CPM</b>; contracted tissue → surgical release"],
 ["Myositis ossificans","<b>Heterotopic ossification in muscle</b> after injury. <b>Elbow dislocation</b>, blow to brachialis/deltoid/quadriceps. Also unconscious/paraplegic (no local injury)",
  "Pain, tenderness, swelling, stiffness. Extreme → bone bridges joint (<b>extra-articular ankylosis</b>). <b>X-ray: normal early → fluffy calcification</b>",
  "<b>Rest early</b> → gentle active movement → <b>excise bony mass once stabilized</b>. Anti-inflammatories ↓ stiffness"],
 ["Avascular necrosis (AVN)","Circumscribed necrosis — interrupted arterial flow / slowed venous outflow. <b>Sites: femoral head, femoral condyles, humeral head, capitulum, scaphoid (proximal), talus (body), lunate</b>. A/w sickle cell, steroids, alcohol, caisson, Gaucher's, Perthes'",
  "Joint pain, stiffness, swelling, restricted movement. <b>X-ray: ↑bone density, subarticular fracturing, deformity</b>",
  "Avoid weight-bearing, <b>revascularization (vascularized bone graft)</b>, excise avascular segment, <b>prosthetic replacement</b>"],
 ["Algodystrophy (CRPS)","<b>= Sudeck's atrophy / reflex sympathetic dystrophy.</b> Post-trauma, usually <b>foot/hand after trivial injury</b>",
  "<b>Continuous burning pain</b>; early: swelling, redness, warmth; later: skin/muscle atrophy, grossly restricted movement. <b>X-ray: patchy osteoporosis (rarefaction)</b>",
  "Physiotherapy (elevation + active exercise), anti-inflammatories, <b>sympathetic block / sympatholytic (guanethidine)</b>"],
 ["Post-traumatic OA","<b>Direct:</b> joint fracture + damaged cartilage → OA within <b>months</b>. <b>Secondary:</b> healed but irregular surface → stress → OA <b>years</b> later",
  "Pain, stiffness, swelling, deformity, restricted movement",
  "Analgesics/anti-inflammatory, physio, <b>weight reduction</b>, <b>realignment osteotomy (young)</b>, <b>arthroplasty (&gt;60y)</b>"],
], CW, HDR))

E.append(bar("OTHER LISTED COMPLICATIONS (mentioned, not detailed)"))
E.append(grid([
 ["Also includes","Joint instability · <b>Muscle contracture (Volkmann's ischaemic contracture)</b> · Tendon lesions (e.g. rupture EPL after Colles') · <b>Nerve compression / entrapment</b> · Growth disturbance (physeal injury in children) · Bed sores (from immobility)"],
], cols(1.4,8.6), ["Group","Items"]))

final=[]
for e in E: final.append(e); final.append(Spacer(1,2))
doc.build(final)
print("WROTE",OUT)
