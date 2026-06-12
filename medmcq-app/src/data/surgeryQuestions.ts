import type { MCQ } from './types'

/**
 * Surgery clinical MCQ bank.
 * Generated from the Surgery lecture batch (Weeks 1–8).
 * Every item is a clinical vignette grounded in a real lecture file (see `sourceLecture`).
 * Content is standard direct-response surgical teaching, not copied from the slides.
 */
export const surgeryQuestions: MCQ[] = [
  {
    id: 'surg-001',
    specialty: 'Surgery',
    sourceLecture: 'Acute abdomin.pdf',
    topic: 'Acute abdomen — appendicitis',
    question:
      'A 19-year-old man presents with 18 hours of pain that began around the umbilicus and has now shifted to the right iliac fossa. He has anorexia, a low-grade fever (37.9°C), and tenderness with guarding at McBurney point. Pressing the left iliac fossa reproduces pain on the right. Which finding is described?',
    options: [
      'Rovsing sign',
      'Murphy sign',
      'Cullen sign',
      'Courvoisier sign',
      'Grey Turner sign',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Pain in the right iliac fossa elicited by palpating the left iliac fossa is Rovsing sign, a classic feature of acute appendicitis. With migratory pain, anorexia, low-grade fever and McBurney-point peritonism, the clinical picture is acute appendicitis.',
    wrongAnswerExplanations: [
      'Correct — Rovsing sign is right-sided pain on left-sided palpation, supporting appendicitis.',
      'Murphy sign is inspiratory arrest on right-upper-quadrant palpation, seen in acute cholecystitis, not this finding.',
      'Cullen sign is periumbilical bruising from retroperitoneal/intraperitoneal haemorrhage (e.g. severe pancreatitis), not elicited by palpation.',
      'Courvoisier sign is a palpable non-tender gallbladder with painless jaundice, suggesting distal biliary obstruction.',
      'Grey Turner sign is flank bruising in severe acute pancreatitis, unrelated to this manoeuvre.',
    ],
    clinicalPearl:
      'Migratory RIF pain + anorexia + localized peritonism = appendicitis until proven otherwise; Rovsing, psoas and obturator signs support it.',
  },
  {
    id: 'surg-002',
    specialty: 'Surgery',
    sourceLecture: 'Shock, dr-farman.pdf',
    topic: 'Shock — classification',
    question:
      'A 62-year-old man is brought in after a road traffic accident. He is confused, with BP 82/54 mmHg, pulse 132/min and thready, cold clammy peripheries, capillary refill 4 s and urine output of 10 mL/h. There is no JVP elevation and the chest is clear. Which type of shock is most likely?',
    options: [
      'Hypovolaemic shock',
      'Cardiogenic shock',
      'Septic (distributive) shock',
      'Neurogenic shock',
      'Anaphylactic shock',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Trauma with hypotension, tachycardia, cold clammy vasoconstricted peripheries, prolonged capillary refill and oliguria indicates hypovolaemic (haemorrhagic) shock from blood loss. The flat JVP and clear chest argue against a cardiac/obstructive cause.',
    wrongAnswerExplanations: [
      'Correct — cold, vasoconstricted, tachycardic and hypotensive after trauma is classic hypovolaemic shock.',
      'Cardiogenic shock typically shows raised JVP, pulmonary congestion and a cardiac history; the clear chest and flat JVP argue against it.',
      'Septic shock is usually warm with bounding pulses and vasodilation early, and needs an infective source — not the picture immediately post-trauma.',
      'Neurogenic shock from spinal injury causes hypotension with BRADYcardia and warm dry skin, the opposite of this vasoconstricted tachycardic patient.',
      'Anaphylaxis needs an allergen exposure with urticaria/bronchospasm/angio-oedema, absent here.',
    ],
    clinicalPearl:
      'Cold + tachycardic + hypotensive after trauma = haemorrhage. Warm + hypotensive = think distributive (septic/anaphylactic/neurogenic).',
  },
  {
    id: 'surg-003',
    specialty: 'Surgery',
    sourceLecture: 'Shock, dr-farman.pdf',
    topic: 'Shock — haemorrhage class',
    question:
      'A 25-year-old trauma patient has a pulse of 122/min, BP 112/86 mmHg, respiratory rate 28/min, and is anxious with a urine output of 15 mL/h. Capillary refill is delayed. Using the ATLS classification, which class of haemorrhagic shock and approximate blood loss does this represent?',
    options: [
      'Class III, 30–40% blood loss',
      'Class I, <15% blood loss',
      'Class II, 15–30% blood loss',
      'Class IV, >40% blood loss',
      'No shock — values are normal',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Tachycardia (100–120), tachypnoea (20–30), narrowed pulse pressure with a still-normal systolic BP, mild anxiety and reduced urine output (20–30 mL/h) define Class II haemorrhage (15–30% / ~750–1500 mL). Note the systolic pressure is maintained — the rising diastolic (narrow pulse pressure) is the early warning.',
    wrongAnswerExplanations: [
      'Class III (30–40%) shows a measurable FALL in systolic BP, pulse >120 and marked oliguria (5–15 mL/h) — more severe than here.',
      'Class I (<15%) has normal vitals and urine output >30 mL/h; this patient is already tachycardic and oliguric.',
      'Correct — tachycardia with narrowed pulse pressure and maintained systolic BP is Class II.',
      'Class IV (>40%) is pre-terminal with negligible urine output and severe hypotension.',
      'Tachycardia, tachypnoea, narrow pulse pressure and oliguria are not normal — compensated shock is present.',
    ],
    clinicalPearl:
      'A narrowing pulse pressure (rising diastolic) is the earliest sign of haemorrhage — systolic BP falls late, in Class III.',
  },
  {
    id: 'surg-004',
    specialty: 'Surgery',
    sourceLecture: '2-Disease of gall bladder -2025- for lectures.pdf',
    topic: 'Acute cholecystitis',
    question:
      'A 45-year-old obese woman presents with 24 hours of constant right-upper-quadrant pain radiating to the right scapula, fever and vomiting. On palpation of the RUQ during deep inspiration she catches her breath. She is not jaundiced. Bilirubin is normal; WBC is raised. What is the most appropriate first-line imaging?',
    options: [
      'Abdominal ultrasound',
      'MRCP',
      'CT abdomen with contrast',
      'ERCP',
      'HIDA (cholescintigraphy) scan',
    ],
    correctAnswerIndex: 0,
    explanation:
      'This is acute calculous cholecystitis (positive Murphy sign, fever, leukocytosis, no jaundice). Ultrasound is the first-line investigation: it shows gallstones, a thick-walled (>3 mm) gallbladder, pericholecystic fluid and a sonographic Murphy sign, and is cheap, fast and radiation-free.',
    wrongAnswerExplanations: [
      'Correct — US is the first-line test for suspected acute cholecystitis.',
      'MRCP excels at imaging the bile DUCTS for stones/strictures; it is not the first test for gallbladder inflammation.',
      'CT is useful for complications or unclear diagnoses but misses many radiolucent stones and is not first-line.',
      'ERCP is therapeutic for CBD stones (and carries pancreatitis risk); inappropriate here with normal bilirubin.',
      'HIDA is the most specific test for cystic-duct obstruction but is second-line, slow and less available — reserved for equivocal US.',
    ],
    clinicalPearl:
      'Acute cholecystitis: US first. Early laparoscopic cholecystectomy (within ~72 h) is preferred over delayed surgery.',
  },
  {
    id: 'surg-005',
    specialty: 'Surgery',
    sourceLecture: '1-gal bladder & bile duct 2025 - for lectures.pdf',
    topic: 'Ascending cholangitis',
    question:
      'A 70-year-old man presents with fever and rigors, jaundice and right-upper-quadrant pain. He is hypotensive and confused. Bilirubin and ALP are markedly raised; ultrasound shows a dilated common bile duct with a stone. After resuscitation and IV antibiotics, what is the definitive next step?',
    options: [
      'Urgent biliary drainage by ERCP',
      'Immediate open cholecystectomy',
      'Continue antibiotics alone and observe',
      'Percutaneous cholecystostomy',
      'MRCP to confirm before any intervention',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Fever, jaundice and RUQ pain (Charcot triad) plus hypotension and confusion (Reynolds pentad) indicate severe ascending cholangitis from an obstructing CBD stone. After resuscitation and antibiotics, urgent biliary decompression — usually ERCP with stone extraction/stenting — is definitive and life-saving.',
    wrongAnswerExplanations: [
      'Correct — the obstructed, infected biliary tree must be drained; ERCP is first-line decompression.',
      'Emergency cholecystectomy in a septic, coagulopathic patient with ductal obstruction is dangerous and does not relieve the CBD block.',
      'Antibiotics alone do not relieve the obstruction; suppurative cholangitis under pressure will progress to death.',
      'Cholecystostomy drains the gallbladder, not the obstructed common bile duct, so it does not solve the problem.',
      'In a septic, deteriorating patient, US already shows ductal obstruction — do not delay drainage for MRCP.',
    ],
    clinicalPearl:
      'Cholangitis = the biliary tree is an abscess under pressure. Resuscitate, give antibiotics, and DRAIN (ERCP) — source control is the cure.',
  },
  {
    id: 'surg-006',
    specialty: 'Surgery',
    sourceLecture: 'Intestinal Obstruction 2025-2026(1).pdf',
    topic: 'Small bowel obstruction',
    question:
      'A 58-year-old woman with a previous open appendicectomy presents with colicky central abdominal pain, bilious vomiting, abdominal distension and absolute constipation for 2 days. The abdomen is distended with high-pitched bowel sounds. An erect film shows multiple central air-fluid levels. What is the most likely cause?',
    options: [
      'Adhesions',
      'Obstructed inguinal hernia',
      'Sigmoid volvulus',
      'Colorectal carcinoma',
      'Gallstone ileus',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Central colicky pain, early bilious vomiting, central air-fluid levels and valvulae conniventes indicate small-bowel obstruction. In a patient with prior abdominal surgery, post-operative adhesions are by far the commonest cause of SBO.',
    wrongAnswerExplanations: [
      'Correct — adhesions are the leading cause of SBO in anyone with previous abdominal surgery.',
      'A hernia is the second commonest cause, but you would expect an irreducible tender groin/abdominal-wall lump, not mentioned here.',
      'Sigmoid volvulus causes LARGE-bowel obstruction with a "coffee-bean" sign and late vomiting, not central small-bowel levels.',
      'Colorectal cancer causes large-bowel obstruction (peripheral haustral pattern, change in bowel habit, weight loss), not this picture.',
      'Gallstone ileus is rare; look for pneumobilia and an ectopic gallstone (Rigler triad) — uncommon without biliary history.',
    ],
    clinicalPearl:
      'Previous surgery + SBO = adhesions first. Always examine the hernial orifices — an obstructed hernia is the surgically urgent miss.',
  },
  {
    id: 'surg-007',
    specialty: 'Surgery',
    sourceLecture: 'Intestinal Obstruction 2025-2026.pdf',
    topic: 'Large bowel obstruction — volvulus',
    question:
      'An 80-year-old nursing-home resident with chronic constipation presents with gross abdominal distension, absolute constipation and mild pain. The abdomen is tympanitic. An abdominal film shows a massively dilated loop arising from the pelvis and pointing to the right upper quadrant (the "coffee-bean" sign). What is the initial management of choice?',
    options: [
      'Endoscopic decompression with a flatus tube',
      'Emergency Hartmann procedure',
      'IV fluids and observation only',
      'Right hemicolectomy',
      'Gastrografin enema as treatment',
    ],
    correctAnswerIndex: 0,
    explanation:
      'The coffee-bean sign and clinical setting indicate sigmoid volvulus. If there are no signs of peritonitis or ischaemia, initial management is endoscopic decompression (flexible sigmoidoscopy/rigid scope with a flatus tube), which untwists the loop and relieves obstruction. Elective sigmoid colectomy is considered for recurrence.',
    wrongAnswerExplanations: [
      'Correct — non-ischaemic sigmoid volvulus is decompressed endoscopically first.',
      'Hartmann (resection + end colostomy) is reserved for gangrenous bowel, perforation or failed decompression.',
      'Observation alone risks progression to ischaemia and perforation; active decompression is needed.',
      'Right hemicolectomy treats right-sided lesions; the sigmoid volvulus is in the left/pelvic colon.',
      'Gastrografin enema may help caecal vs sigmoid diagnosis but is not the therapeutic decompression of choice for sigmoid volvulus.',
    ],
    clinicalPearl:
      'Sigmoid volvulus: scope and decompress if viable; resect if gangrenous, perforated, or recurrent.',
  },
  {
    id: 'surg-008',
    specialty: 'Surgery',
    sourceLecture: 'Hernia 4.pdf',
    topic: 'Groin hernia — strangulation',
    question:
      'A 67-year-old man presents with 6 hours of a painful, tense, irreducible lump below and lateral to the pubic tubercle, with overlying erythema, vomiting and abdominal distension. The lump is exquisitely tender and does not have a cough impulse. What is the most appropriate management?',
    options: [
      'Emergency surgical exploration',
      'Manual reduction then discharge',
      'Outpatient elective hernia repair',
      'Truss application and reassurance',
      'Ultrasound then review in clinic',
    ],
    correctAnswerIndex: 0,
    explanation:
      'A tender, tense, irreducible groin hernia with no cough impulse, overlying erythema and signs of obstruction indicates a strangulated hernia — the contents are ischaemic. This is a surgical emergency requiring urgent exploration to assess bowel viability and repair the defect.',
    wrongAnswerExplanations: [
      'Correct — strangulation threatens bowel viability and mandates emergency surgery.',
      'Forced reduction of a strangulated hernia risks "reduction en masse" (returning dead bowel into the abdomen) and is contraindicated.',
      'Elective repair is for reducible, uncomplicated hernias — inappropriate when bowel is compromised.',
      'A truss never treats an acute strangulated hernia and delays definitive care.',
      'Imaging must not delay theatre when strangulation is clinically obvious.',
    ],
    clinicalPearl:
      'Tender + irreducible + no cough impulse + systemic signs = strangulation → theatre now. Position relative to the pubic tubercle (inguinal above-and-medial vs femoral below-and-lateral) guides the diagnosis.',
  },
  {
    id: 'surg-009',
    specialty: 'Surgery',
    sourceLecture: 'Hernia 5.pdf',
    topic: 'Femoral hernia',
    question:
      'A 70-year-old thin woman presents with a small lump in the groin that lies below and lateral to the pubic tubercle. It is more common in females and carries the highest risk of strangulation of all groin hernias. Through which anatomical opening does this hernia pass?',
    options: [
      'The femoral canal, medial to the femoral vein',
      'The superficial inguinal ring',
      'The deep inguinal ring, lateral to the inferior epigastric vessels',
      'A defect at the linea alba',
      'The obturator foramen',
    ],
    correctAnswerIndex: 0,
    explanation:
      'A groin lump below and lateral to the pubic tubercle, commoner in older thin women, is a femoral hernia. It passes through the femoral canal — the most medial compartment of the femoral sheath, medial to the femoral vein — which is narrow and rigid, giving the highest strangulation risk; repair is recommended even when asymptomatic.',
    wrongAnswerExplanations: [
      'Correct — femoral hernias pass through the femoral canal, medial to the femoral vein, below the inguinal ligament.',
      'The superficial ring is the exit of an inguinal hernia, which lies ABOVE and medial to the pubic tubercle.',
      'An indirect inguinal hernia passes through the deep ring lateral to the epigastric vessels — that is inguinal, not femoral.',
      'A defect at the linea alba describes an epigastric/paraumbilical hernia, not a groin hernia.',
      'Obturator hernias are rare pelvic hernias presenting with the Howship–Romberg sign, not a palpable groin lump.',
    ],
    clinicalPearl:
      'Femoral hernia: elderly thin women, below-and-lateral to pubic tubercle, narrow rigid neck → strangulates readily → repair even if asymptomatic.',
  },
  {
    id: 'surg-010',
    specialty: 'Surgery',
    sourceLecture: 'NEW STOMACH & DUODENUM copy.pdf',
    topic: 'Perforated peptic ulcer',
    question:
      'A 55-year-old man on long-term NSAIDs develops sudden severe epigastric pain that rapidly becomes generalized. He lies still; the abdomen is rigid with board-like guarding and absent bowel sounds. An erect chest X-ray shows free air under the right hemidiaphragm. What is the diagnosis?',
    options: [
      'Perforated peptic ulcer',
      'Acute pancreatitis',
      'Ruptured abdominal aortic aneurysm',
      'Acute cholecystitis',
      'Mesenteric ischaemia',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Sudden severe epigastric pain becoming generalized, board-like rigidity (generalized peritonitis) and free sub-diaphragmatic gas in an NSAID user are classic for a perforated peptic (usually duodenal) ulcer. Management is resuscitation, IV PPI, antibiotics and urgent surgical repair (omental/Graham patch).',
    wrongAnswerExplanations: [
      'Correct — pneumoperitoneum + sudden peritonitis + NSAID use indicates a perforated ulcer.',
      'Pancreatitis causes severe pain with raised amylase/lipase but does NOT cause free intraperitoneal air.',
      'Ruptured AAA presents with hypotension, a pulsatile mass and back pain, not free air under the diaphragm.',
      'Cholecystitis is localized to the RUQ with a positive Murphy sign and does not produce pneumoperitoneum.',
      'Mesenteric ischaemia gives pain out of proportion with later peritonism, but no free air early.',
    ],
    clinicalPearl:
      'Sudden board-like abdomen + free air under the diaphragm = hollow viscus perforation until proven otherwise. Resuscitate and operate.',
  },
  {
    id: 'surg-011',
    specialty: 'Surgery',
    sourceLecture: 'Pancreas 1.pdf',
    topic: 'Acute pancreatitis',
    question:
      'A 48-year-old man with heavy alcohol use presents with severe epigastric pain radiating to the back, relieved by sitting forward, with vomiting. Serum lipase is 6× the upper limit of normal. Which scoring/criteria parameter is most useful for assessing severity at 48 hours?',
    options: [
      'A validated scoring system such as Glasgow (Imrie) / APACHE II',
      'Serum amylase level',
      'Serum lipase level',
      'The presence of epigastric tenderness',
      'Body temperature alone',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Diagnosis of acute pancreatitis needs two of: typical pain, enzymes >3× ULN, or imaging. Enzyme MAGNITUDE does not predict severity. Severity at 48 h is assessed with validated scores (Glasgow/Imrie, APACHE II, or markers like CRP >150) that incorporate age, WBC, urea, calcium, glucose, LDH, albumin and PaO2.',
    wrongAnswerExplanations: [
      'Correct — multifactor scoring systems, not single enzyme values, stratify severity and guide HDU/ICU care.',
      'Amylase rises and falls quickly and its level does not correlate with severity or outcome.',
      'Lipase is more sensitive/specific for diagnosis but, like amylase, its magnitude does not predict severity.',
      'Epigastric tenderness confirms an acute abdomen but gives no severity information.',
      'Temperature is one variable among many; alone it cannot grade severity.',
    ],
    clinicalPearl:
      'Enzyme level diagnoses pancreatitis; it never grades it. Use Glasgow/APACHE II/CRP and watch for organ failure.',
  },
  {
    id: 'surg-012',
    specialty: 'Surgery',
    sourceLecture: 'Carcinoma of pancreas 2.pdf',
    topic: 'Pancreatic carcinoma',
    question:
      'A 68-year-old man presents with progressive painless jaundice, dark urine, pale stools and weight loss. Examination reveals a palpable, non-tender gallbladder. Which statement best applies?',
    options: [
      'Courvoisier law suggests the cause is unlikely to be gallstones — think malignant obstruction of the distal bile duct',
      'A palpable gallbladder confirms acute cholecystitis',
      'Painless jaundice with a palpable gallbladder is most likely a CBD stone',
      'This presentation excludes pancreatic cancer',
      'The gallbladder is palpable because of Mirizzi syndrome',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Courvoisier law: in a jaundiced patient, a palpable non-tender gallbladder is unlikely to be due to stones, because chronic stone disease produces a fibrotic, non-distensible gallbladder. Painless obstructive jaundice with weight loss and a palpable gallbladder points to malignant distal bile-duct obstruction — classically carcinoma of the pancreatic head.',
    wrongAnswerExplanations: [
      'Correct — Courvoisier law points away from stones and toward malignant obstruction (pancreatic head cancer).',
      'Acute cholecystitis is painful with a positive Murphy sign, not painless jaundice.',
      'A chronically stone-diseased gallbladder is fibrosed and NOT palpable — the opposite of Courvoisier.',
      'This is the textbook presentation OF pancreatic head cancer, not an exclusion.',
      'Mirizzi is extrinsic CBD compression by a cystic-duct stone, usually painful with stone disease, not this malignant picture.',
    ],
    clinicalPearl:
      'Painless obstructive jaundice + palpable gallbladder + weight loss = carcinoma head of pancreas until proven otherwise (Courvoisier).',
  },
  {
    id: 'surg-013',
    specialty: 'Surgery',
    sourceLecture: 'Liver.pdf',
    topic: 'Liver abscess',
    question:
      'A 40-year-old man returning from the tropics presents with swinging fever, right-upper-quadrant pain, tender hepatomegaly and weight loss. Ultrasound shows a single large hypoechoic lesion in the right lobe of the liver. Serology for Entamoeba histolytica is positive. What is the first-line treatment?',
    options: [
      'Metronidazole',
      'Immediate open surgical drainage',
      'Broad-spectrum IV antibiotics for pyogenic abscess',
      'Right hepatectomy',
      'Albendazole',
    ],
    correctAnswerIndex: 0,
    explanation:
      'A solitary right-lobe liver abscess with positive amoebic serology in a returning traveller is an amoebic liver abscess. First-line treatment is metronidazole (a tissue amoebicide), followed by a luminal agent (e.g. paromomycin) to clear intestinal carriage. Most resolve without drainage.',
    wrongAnswerExplanations: [
      'Correct — metronidazole is first-line for amoebic liver abscess; most do not need drainage.',
      'Surgical drainage is reserved for large, left-lobe, or impending-rupture abscesses or failure of medical therapy.',
      'Broad-spectrum antibiotics treat PYOGENIC abscesses; serology here indicates amoebic aetiology.',
      'Hepatectomy is grossly excessive for an infective abscess.',
      'Albendazole treats hydatid (Echinococcus) disease, not amoebic abscess.',
    ],
    clinicalPearl:
      'Amoebic liver abscess: solitary right-lobe lesion, "anchovy-sauce" pus, treat with metronidazole + a luminal agent. Aspirate only if large or non-responding.',
  },
  {
    id: 'surg-014',
    specialty: 'Surgery',
    sourceLecture: 'spleen.pdf',
    topic: 'Splenic trauma',
    question:
      'A 24-year-old man is admitted after a left-sided handlebar injury. He has left-upper-quadrant pain referred to the left shoulder tip, and is initially stable. After fluids his vitals normalize and a CT shows a grade II splenic laceration without active extravasation. What is the preferred management?',
    options: [
      'Non-operative management with close monitoring',
      'Immediate splenectomy',
      'Splenic artery ligation',
      'Diagnostic peritoneal lavage then discharge',
      'Laparotomy for all splenic injuries',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Left shoulder-tip pain (Kehr sign) reflects diaphragmatic irritation from splenic bleeding. In a haemodynamically stable patient with a low-grade injury and no active extravasation, non-operative management (admission, serial observation, bed rest, repeat imaging, ± angioembolization) is preferred to preserve splenic immune function.',
    wrongAnswerExplanations: [
      'Correct — stable low-grade splenic injury is managed non-operatively to preserve the spleen.',
      'Splenectomy is reserved for haemodynamic instability or high-grade injury with ongoing bleeding.',
      'Artery ligation/embolization is an adjunct for selected higher-grade injuries, not first-line for a stable grade II.',
      'DPL is largely superseded by CT/FAST and a positive result would not justify simple discharge.',
      'Routine laparotomy for every splenic injury is outdated; selective non-operative management is standard in stable patients.',
    ],
    clinicalPearl:
      'Stable spleen = save the spleen. Post-splenectomy patients need vaccination (encapsulated organisms) and prophylaxis against OPSI.',
  },
  {
    id: 'surg-015',
    specialty: 'Surgery',
    sourceLecture: 'Esophageal Disorders.pdf',
    topic: 'Achalasia',
    question:
      'A 38-year-old woman has 1 year of progressive dysphagia to BOTH solids and liquids, regurgitation of undigested food and weight loss. A barium swallow shows a dilated oesophagus with a smooth tapering "bird-beak" narrowing at the gastro-oesophageal junction. Which investigation is the gold standard for diagnosis?',
    options: [
      'Oesophageal manometry',
      'Upper GI endoscopy alone',
      'CT chest',
      '24-hour pH monitoring',
      'Chest X-ray',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Dysphagia to solids AND liquids from the outset, regurgitation and a bird-beak appearance indicate achalasia (failure of LOS relaxation with absent peristalsis). Oesophageal manometry is the gold standard, showing incomplete LOS relaxation and aperistalsis. Endoscopy is still required to exclude pseudoachalasia from a tumour.',
    wrongAnswerExplanations: [
      'Correct — manometry is the diagnostic gold standard for achalasia.',
      'Endoscopy is essential to exclude malignancy but does not establish the motility diagnosis.',
      'CT may detect mediastinal causes but is not the diagnostic test for achalasia.',
      '24-hour pH monitoring assesses reflux disease, not a motility disorder with impaired LOS relaxation.',
      'CXR may show a dilated oesophagus/air-fluid level but is not diagnostic.',
    ],
    clinicalPearl:
      'Dysphagia to solids AND liquids from the start = motility disorder (achalasia). Solids-then-liquids progression suggests a mechanical/malignant stricture.',
  },
  {
    id: 'surg-016',
    specialty: 'Surgery',
    sourceLecture: 'Esophagus & Stomach Theory.pdf',
    topic: 'Oesophageal carcinoma',
    question:
      'A 64-year-old man with a long history of GORD and Barrett oesophagus presents with progressive dysphagia, first to solids and now to soft foods, with significant weight loss. Which type of oesophageal cancer is most associated with Barrett oesophagus, and where does it typically arise?',
    options: [
      'Adenocarcinoma of the lower third',
      'Squamous cell carcinoma of the upper third',
      'Squamous cell carcinoma of the middle third',
      'Small cell carcinoma of the upper third',
      'Adenocarcinoma of the upper third',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Barrett oesophagus (intestinal metaplasia from chronic reflux) predisposes to ADENOCARCINOMA, which typically arises in the LOWER third near the GOJ. Progressive dysphagia first to solids then to softer food with weight loss is the classic malignant pattern.',
    wrongAnswerExplanations: [
      'Correct — Barrett → adenocarcinoma of the lower oesophagus.',
      'Upper-third squamous cell carcinoma is linked to smoking/alcohol, not Barrett oesophagus.',
      'Mid-oesophageal squamous cell carcinoma is also smoking/alcohol related, not reflux/Barrett related.',
      'Small cell carcinoma of the oesophagus is rare and not Barrett-associated.',
      'Adenocarcinoma characteristically arises in the lower (not upper) third.',
    ],
    clinicalPearl:
      'Barrett → lower-third adenocarcinoma; smoking/alcohol → upper/mid squamous cell carcinoma. Progressive solid-then-liquid dysphagia + weight loss = cancer until excluded.',
  },
  {
    id: 'surg-017',
    specialty: 'Surgery',
    sourceLecture: 'Benign Breast Diseases.pdf',
    topic: 'Fibroadenoma',
    question:
      'A 22-year-old woman presents with a single, smooth, firm, highly mobile, painless breast lump that she calls a "breast mouse." It is 2 cm, well-defined and not fixed to skin or muscle. Ultrasound shows a well-circumscribed solid lesion. What is the most likely diagnosis?',
    options: [
      'Fibroadenoma',
      'Invasive ductal carcinoma',
      'Breast cyst',
      'Fat necrosis',
      'Phyllodes tumour',
    ],
    correctAnswerIndex: 0,
    explanation:
      'A young woman with a smooth, firm, highly mobile, painless, well-circumscribed lump (the "breast mouse") has a fibroadenoma — the commonest benign breast tumour, arising from breast lobules and hormone-responsive. Small fibroadenomas confirmed on triple assessment can be safely observed.',
    wrongAnswerExplanations: [
      'Correct — a mobile, painless, well-defined lump in a young woman is a classic fibroadenoma.',
      'Carcinoma is usually hard, irregular and TETHERED/fixed, and is rare at age 22.',
      'A cyst is fluctuant and would appear as an anechoic (not solid) lesion on ultrasound.',
      'Fat necrosis follows trauma/surgery and often produces a firm, sometimes tethered, lump that can mimic cancer — no trauma here.',
      'Phyllodes tumours are larger, rapidly growing fibroepithelial tumours typically in older women, not the classic small mobile lump.',
    ],
    clinicalPearl:
      'Always confirm any breast lump by TRIPLE ASSESSMENT (clinical exam + imaging + needle biopsy) before reassurance — even classic fibroadenomas.',
  },
  {
    id: 'surg-018',
    specialty: 'Surgery',
    sourceLecture: 'Breast Cancer.pdf',
    topic: 'Breast carcinoma',
    question:
      'A 58-year-old woman presents with a hard, irregular, painless lump in the upper outer quadrant of the left breast that is tethered to the skin, with overlying skin dimpling and a palpable firm axillary node. What is the single most appropriate next step?',
    options: [
      'Triple assessment (clinical exam, mammography/US, and core-needle biopsy)',
      'Reassure and review in 6 months',
      'Start chemotherapy immediately',
      'Excisional biopsy of the axillary node only',
      'Mastectomy without prior tissue diagnosis',
    ],
    correctAnswerIndex: 0,
    explanation:
      'A hard, irregular, skin-tethered breast lump with dimpling and axillary nodes is highly suspicious for carcinoma. The standard of care is triple assessment: clinical examination, imaging (mammography ± ultrasound), and core-needle biopsy for histology and receptor status — which guides all subsequent treatment.',
    wrongAnswerExplanations: [
      'Correct — every suspicious breast lump undergoes triple assessment before any treatment decision.',
      'Delaying a clinically suspicious cancer is unsafe and inappropriate.',
      'Chemotherapy is never started without a tissue diagnosis and receptor/staging information.',
      'Sampling only the node skips characterising the primary; the breast lesion must be biopsied with imaging guidance.',
      'Definitive surgery must follow, not precede, histological confirmation and staging.',
    ],
    clinicalPearl:
      'Triple assessment is mandatory for any suspicious breast lump. Core biopsy (not FNA alone) gives histology AND ER/PR/HER2 status to plan therapy.',
  },
  {
    id: 'surg-019',
    specialty: 'Surgery',
    sourceLecture: 'thyroid diseases dr sarmad.pdf',
    topic: 'Thyroid nodule / cancer',
    question:
      'A 35-year-old woman presents with a painless, firm, solitary thyroid nodule. Ultrasound shows microcalcifications and irregular margins. Fine-needle aspiration cytology shows cells with nuclear grooves and "Orphan-Annie-eye" nuclei with psammoma bodies. What is the most likely diagnosis?',
    options: [
      'Papillary thyroid carcinoma',
      'Follicular thyroid carcinoma',
      'Medullary thyroid carcinoma',
      'Anaplastic thyroid carcinoma',
      'Multinodular goitre',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Nuclear grooves, "Orphan-Annie-eye" (optically clear) nuclei and psammoma bodies are pathognomonic of papillary thyroid carcinoma — the commonest thyroid malignancy, which spreads via lymphatics and has an excellent prognosis. Microcalcifications on US correspond to psammoma bodies.',
    wrongAnswerExplanations: [
      'Correct — these cytological features define papillary carcinoma.',
      'Follicular carcinoma cannot be diagnosed on FNA (needs capsular/vascular invasion on histology) and spreads haematogenously.',
      'Medullary carcinoma arises from parafollicular C cells, secretes calcitonin and shows amyloid stroma, not these nuclear features.',
      'Anaplastic carcinoma is an aggressive tumour of the elderly with rapid airway compromise and pleomorphic cells, not this picture.',
      'A multinodular goitre is a benign diffuse enlargement, not a solitary suspicious nodule with these malignant features.',
    ],
    clinicalPearl:
      'Papillary thyroid cancer: psammoma bodies, Orphan-Annie nuclei, lymphatic spread, best prognosis. FNA is the key test for a thyroid nodule.',
  },
  {
    id: 'surg-020',
    specialty: 'Surgery',
    sourceLecture: 'thyroid diseases dr sarmad.pdf',
    topic: 'Post-thyroidectomy complications',
    question:
      'A 44-year-old woman undergoes total thyroidectomy. Around 24 hours post-operatively she develops circumoral and finger tingling, carpopedal spasm, and a positive Chvostek sign. What is the most likely cause?',
    options: [
      'Hypocalcaemia from parathyroid injury',
      'Recurrent laryngeal nerve palsy',
      'Thyroid storm',
      'Expanding neck haematoma',
      'Hypoglycaemia',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Perioral and digital paraesthesia, carpopedal spasm and a positive Chvostek/Trousseau sign within a day of total thyroidectomy indicate acute hypocalcaemia from inadvertent removal of or damage to the parathyroid glands. Treat with calcium (and vitamin D) replacement and monitor serum calcium.',
    wrongAnswerExplanations: [
      'Correct — parathyroid injury → hypocalcaemia → neuromuscular irritability (Chvostek/Trousseau).',
      'Recurrent laryngeal nerve palsy causes hoarseness or stridor, not tetany.',
      'Thyroid storm causes fever, tachyarrhythmia and agitation, not carpopedal spasm.',
      'A neck haematoma causes swelling and airway compromise — a surgical emergency — but not tetany.',
      'Hypoglycaemia causes sweating and confusion, not the specific tetanic signs of hypocalcaemia.',
    ],
    clinicalPearl:
      'After total thyroidectomy watch for (1) hypocalcaemia, (2) RLN palsy/voice change, and (3) expanding haematoma → airway obstruction (open at the bedside).',
  },
  {
    id: 'surg-021',
    specialty: 'Surgery',
    sourceLecture: 'parathyroid diseases dr sarmad.pdf',
    topic: 'Primary hyperparathyroidism',
    question:
      'A 55-year-old woman is found to have hypercalcaemia on routine bloods. She complains of fatigue, constipation, renal colic and bone aches ("stones, bones, abdominal groans"). PTH is inappropriately raised and phosphate is low. What is the most likely cause?',
    options: [
      'A solitary parathyroid adenoma',
      'Parathyroid carcinoma',
      'Secondary hyperparathyroidism from CKD',
      'Bony metastases',
      'Vitamin D toxicity',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Hypercalcaemia with an inappropriately HIGH PTH and low phosphate is primary hyperparathyroidism; in ~80–85% of cases the cause is a single parathyroid adenoma. Symptoms are "stones, bones, abdominal groans, and psychic moans." Definitive treatment of symptomatic disease is parathyroidectomy.',
    wrongAnswerExplanations: [
      'Correct — a solitary adenoma is the commonest cause of primary hyperparathyroidism.',
      'Parathyroid carcinoma is rare (<1%) and usually causes very high calcium with a palpable neck mass.',
      'Secondary hyperparathyroidism (CKD) features LOW or normal calcium with HIGH phosphate — the opposite biochemistry.',
      'Bony metastases cause hypercalcaemia with SUPPRESSED PTH, not raised PTH.',
      'Vitamin D toxicity raises calcium but SUPPRESSES PTH.',
    ],
    clinicalPearl:
      'High Ca²⁺ + high PTH + low phosphate = primary hyperparathyroidism (usually an adenoma). High Ca²⁺ + low PTH = malignancy/other cause.',
  },
  {
    id: 'surg-022',
    specialty: 'Surgery',
    sourceLecture: 'Acute Limb Ischemia.pdf',
    topic: 'Acute limb ischaemia',
    question:
      'A 72-year-old man with atrial fibrillation develops sudden severe pain in his right leg. The limb is pale, pulseless, cold and paraesthetic, with reduced power. He is not on anticoagulation. What is the most likely mechanism and the immediate priority?',
    options: [
      'Arterial embolism — give IV heparin and arrange urgent revascularization',
      'Deep vein thrombosis — start treatment-dose anticoagulation and elevate the leg',
      'Chronic arterial occlusion — refer to outpatient vascular clinic',
      'Cellulitis — start IV antibiotics',
      'Spinal cord compression — arrange urgent MRI spine',
    ],
    correctAnswerIndex: 0,
    explanation:
      'The 6 Ps (pain, pallor, pulselessness, perishing cold, paraesthesia, paralysis) with a sudden onset in an AF patient not anticoagulated indicate acute limb ischaemia from a cardiac EMBOLUS. Immediate management is IV heparin to prevent propagation, analgesia, and urgent revascularization (embolectomy/thrombolysis) — the limb is threatened within ~6 hours.',
    wrongAnswerExplanations: [
      'Correct — AF + sudden 6 Ps = embolic acute limb ischaemia; heparinize and revascularize urgently.',
      'DVT causes a swollen, warm, tender leg with intact pulses — not a cold pulseless limb.',
      'A chronically ischaemic limb has gradual claudication/rest pain; sudden onset with sensorimotor loss is an emergency, not a clinic referral.',
      'Cellulitis is warm, erythematous and tender with palpable pulses, not pale and pulseless.',
      'Cord compression causes bilateral neurology and sensory level, not a unilateral pulseless cold limb.',
    ],
    clinicalPearl:
      'Acute limb ischaemia: time is tissue. Heparinize immediately and revascularize within ~6 h; sensorimotor loss signals a threatened limb.',
  },
  {
    id: 'surg-023',
    specialty: 'Surgery',
    sourceLecture: 'Chronic Limb Ischemia.pdf',
    topic: 'Chronic limb ischaemia',
    question:
      'A 65-year-old smoker with diabetes reports cramping calf pain on walking 100 m that is relieved by rest, now progressing to pain in the foot at night relieved by hanging the leg out of bed. Foot pulses are absent and the ankle-brachial pressure index (ABPI) is 0.4. Which Fontaine stage describes night/rest pain?',
    options: [
      'Stage III (rest pain)',
      'Stage I (asymptomatic)',
      'Stage II (intermittent claudication)',
      'Stage IV (ulceration/gangrene)',
      'Stage 0 (normal)',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Fontaine staging: I asymptomatic, II intermittent claudication, III ischaemic REST pain, IV tissue loss (ulceration/gangrene). Night/rest pain relieved by dependency is Stage III — critical limb ischaemia requiring vascular assessment for revascularization. ABPI 0.4 confirms severe disease.',
    wrongAnswerExplanations: [
      'Correct — rest/night pain is Fontaine III, indicating critical limb ischaemia.',
      'Stage I is asymptomatic disease — this patient has pain at rest.',
      'Stage II is claudication on exertion only; this patient has progressed beyond that to rest pain.',
      'Stage IV requires tissue loss (ulcer or gangrene), not yet present here.',
      'There is no normal "stage 0" with absent pulses and ABPI 0.4.',
    ],
    clinicalPearl:
      'ABPI: >0.9 normal, 0.4–0.9 claudication, <0.4 critical ischaemia. Beware falsely high/normal ABPI in diabetics with calcified incompressible vessels.',
  },
  {
    id: 'surg-024',
    specialty: 'Surgery',
    sourceLecture: 'Aortic Aneurysm-Dr.Shkar.pdf',
    topic: 'Ruptured AAA',
    question:
      'A 74-year-old male smoker collapses with sudden severe central abdominal pain radiating to the back. He is hypotensive (BP 80/50) with a tender, pulsatile, expansile epigastric mass. What is the immediate management?',
    options: [
      'Immediate transfer to theatre / vascular surgery without delay for imaging if unstable',
      'CT angiogram first in all cases before any intervention',
      'Aggressive fluid resuscitation to a normal blood pressure',
      'Analgesia and admit for observation',
      'Thrombolysis',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Sudden back/abdominal pain, hypotension and a pulsatile expansile mass is a ruptured abdominal aortic aneurysm. In a HAEMODYNAMICALLY UNSTABLE patient this is a surgical emergency — proceed directly to theatre (open repair or EVAR) without delaying for confirmatory imaging. Use permissive hypotension, not aggressive fluids.',
    wrongAnswerExplanations: [
      'Correct — an unstable ruptured AAA goes straight to theatre; imaging is only for stable patients.',
      'CT is appropriate only if the patient is stable enough; in shock, imaging must not delay surgery.',
      'Over-resuscitation raises BP and dislodges clot, worsening haemorrhage — use permissive hypotension (aim SBP ~70–90).',
      'Observation of a ruptured AAA is fatal.',
      'Thrombolysis would be catastrophic in an actively bleeding aneurysm.',
    ],
    clinicalPearl:
      'Ruptured AAA: pain + hypotension + pulsatile mass → theatre. Permissive hypotension. Stable patients may have CT to plan EVAR vs open repair.',
  },
  {
    id: 'surg-025',
    specialty: 'Surgery',
    sourceLecture: 'venous diseases !! 3.pdf',
    topic: 'Varicose veins / venous ulcer',
    question:
      'A 60-year-old woman has long-standing varicose veins and now a shallow, exudative ulcer over the medial malleolus (the "gaiter" area), with surrounding brown pigmentation and hardened skin. Pulses are present and ABPI is 1.0. What is the most appropriate treatment?',
    options: [
      'Graduated compression bandaging after excluding arterial disease',
      'Below-knee amputation',
      'Arterial bypass surgery',
      'Long-term oral antibiotics alone',
      'Strict bed rest with the leg flat for 6 weeks',
    ],
    correctAnswerIndex: 0,
    explanation:
      'A shallow ulcer in the medial gaiter area with haemosiderin pigmentation and lipodermatosclerosis is a VENOUS ulcer from chronic venous hypertension. With a normal ABPI (excluding significant arterial disease), the mainstay is graduated COMPRESSION therapy, leg elevation and wound care; treat underlying superficial venous reflux.',
    wrongAnswerExplanations: [
      'Correct — compression (once arterial disease is excluded by ABPI) is the cornerstone of venous ulcer treatment.',
      'Amputation is grossly inappropriate for a venous ulcer.',
      'Arterial bypass treats arterial insufficiency; ABPI 1.0 shows arterial supply is adequate.',
      'Antibiotics are only for clinical infection, not for routine venous ulcer healing.',
      'Prolonged flat bed rest does not address venous hypertension; compression and mobility/elevation do.',
    ],
    clinicalPearl:
      'Venous ulcer = medial gaiter, shallow, pigmented; compression heals it. ALWAYS check ABPI first — compression on an ischaemic limb causes necrosis.',
  },
  {
    id: 'surg-026',
    specialty: 'Surgery',
    sourceLecture: 'lymphedema  4.pdf',
    topic: 'Lymphoedema',
    question:
      'A 52-year-old woman develops progressive non-pitting swelling of her right arm 1 year after axillary lymph-node clearance and radiotherapy for breast cancer. The skin is thickened and you cannot pinch a fold of skin at the base of the second toe equivalent on the hand (positive Stemmer sign). What is the most likely diagnosis?',
    options: [
      'Secondary lymphoedema',
      'Deep vein thrombosis',
      'Congestive cardiac failure',
      'Hypoalbuminaemia',
      'Cellulitis',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Progressive non-pitting limb swelling with skin thickening and a positive Stemmer sign after axillary clearance and radiotherapy is secondary lymphoedema caused by disruption of lymphatic drainage. Management is conservative: skin care, compression garments, manual lymphatic drainage and exercise.',
    wrongAnswerExplanations: [
      'Correct — lymphatic disruption from surgery/radiotherapy causes secondary lymphoedema.',
      'DVT causes acute unilateral PITTING swelling with pain/warmth, not chronic non-pitting change with a positive Stemmer sign.',
      'Cardiac failure causes BILATERAL dependent pitting oedema, not isolated arm swelling after axillary surgery.',
      'Hypoalbuminaemia causes generalized/bilateral oedema, not a unilateral post-surgical limb.',
      'Cellulitis is acutely red, hot and tender; here the process is chronic and non-inflammatory (though lymphoedema predisposes to recurrent cellulitis).',
    ],
    clinicalPearl:
      'Positive Stemmer sign (cannot tent the skin) is specific for lymphoedema. Treatment is decongestive: compression, skin care, MLD — not diuretics.',
  },
  {
    id: 'surg-027',
    specialty: 'Surgery',
    sourceLecture: 'ATLS.pdf',
    topic: 'Trauma — primary survey',
    question:
      'A 30-year-old man arrives after a high-speed crash. He is agitated, with noisy gurgling breathing, an obvious facial injury and blood in the airway. According to ATLS, what is the FIRST priority?',
    options: [
      'Secure the airway while protecting the cervical spine',
      'Obtain large-bore IV access and give fluids',
      'Perform a focused neurological (Disability) assessment',
      'Fully expose the patient and prevent hypothermia',
      'Order a trauma CT series',
    ],
    correctAnswerIndex: 0,
    explanation:
      'ATLS follows the ABCDE sequence: Airway with cervical-spine control is always first. A patient with gurgling, blood in the airway and facial trauma has a threatened airway — clear/secure it (suction, manoeuvres, definitive airway) while immobilizing the C-spine, before moving to Breathing and Circulation.',
    wrongAnswerExplanations: [
      'Correct — Airway (with C-spine protection) is the first step of the primary survey.',
      'Circulation/IV access is step C, addressed only after A and B are secured.',
      'Disability (neuro) is step D, after airway, breathing and circulation.',
      'Exposure/environment is step E, the last of the primary survey.',
      'Imaging belongs to the secondary survey/adjuncts, after life threats in the primary survey are managed.',
    ],
    clinicalPearl:
      'ABCDE — treat each threat as you find it before moving on. A blocked airway kills faster than anything else; always protect the C-spine in trauma.',
  },
  {
    id: 'surg-028',
    specialty: 'Surgery',
    sourceLecture: 'thoracic trauma.pdf',
    topic: 'Tension pneumothorax',
    question:
      'A 26-year-old stabbed in the right chest is acutely breathless and hypotensive. The right hemithorax is hyperresonant with absent breath sounds, the trachea is deviated to the left, and the neck veins are distended. What is the immediate management?',
    options: [
      'Immediate needle/finger thoracostomy decompression, then chest drain',
      'Urgent chest X-ray to confirm before any treatment',
      'CT chest',
      'Pericardiocentesis',
      'Intubation and observation',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Respiratory distress, hypotension, a hyperresonant silent hemithorax, tracheal deviation AWAY from the side and distended neck veins are a tension pneumothorax — a clinical diagnosis. Treat IMMEDIATELY with decompression (needle/finger thoracostomy in the 5th intercostal space, anterior axillary line, or 2nd ICS mid-clavicular line) followed by a chest drain. Do not wait for imaging.',
    wrongAnswerExplanations: [
      'Correct — tension pneumothorax is decompressed clinically, before any X-ray.',
      'Waiting for a chest X-ray in tension pneumothorax can be fatal — it is a clinical diagnosis.',
      'CT wastes critical time in an unstable patient with an obvious tension pneumothorax.',
      'Pericardiocentesis treats cardiac tamponade (muffled sounds, but resonant/normal chest), not a hyperresonant silent hemithorax.',
      'Intubation without decompression worsens the tension by forcing more air into the pleural space.',
    ],
    clinicalPearl:
      'Tension pneumothorax: trachea deviates AWAY, hyperresonant + silent chest, distended neck veins. Decompress first, image later.',
  },
  {
    id: 'surg-029',
    specialty: 'Surgery',
    sourceLecture: 'General principles of fractures 1.pdf',
    topic: 'Open (compound) fracture',
    question:
      'A 28-year-old motorcyclist sustains an open tibial fracture with a 6 cm wound and exposed bone, contaminated with road debris. He is haemodynamically stable. Besides analgesia and reduction/splinting, which combination is essential early management?',
    options: [
      'IV antibiotics, tetanus prophylaxis, wound cover, and urgent debridement in theatre',
      'Primary closure of the wound in the emergency department',
      'Delay antibiotics until cultures are available',
      'Apply a plaster cast over the wound and discharge',
      'Antibiotics only if the wound looks infected at 48 hours',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Open fractures need early IV antibiotics (within the hour), tetanus prophylaxis, removal of gross contamination with a sterile saline-soaked dressing and photography, splinting, and urgent surgical debridement with stabilization. Prompt antibiotics and debridement minimize infection and osteomyelitis.',
    wrongAnswerExplanations: [
      'Correct — antibiotics, tetanus cover, wound protection and timely debridement are the pillars of open-fracture care.',
      'Open wounds should NOT be primarily closed in the ED — they need formal debridement first to avoid trapping infection.',
      'Antibiotics must be given EARLY (empirically), not delayed for cultures, to reduce infection.',
      'Casting over a contaminated open wound and discharging risks limb-threatening infection.',
      'Waiting for infection to declare itself abandons the entire principle of open-fracture prophylaxis.',
    ],
    clinicalPearl:
      'Open fracture = surgical emergency: early antibiotics + tetanus + debridement + stabilization. Gustilo–Anderson grades guide treatment and prognosis.',
  },
  {
    id: 'surg-030',
    specialty: 'Surgery',
    sourceLecture: 'General_principles_of_fractures_IV__Early_local_complications_P2.pdf',
    topic: 'Compartment syndrome',
    question:
      'A 19-year-old with a closed tibial shaft fracture in a cast develops severe, worsening pain not controlled by opioids, dramatically increased by passive stretching of the toes. The compartment feels tense; distal pulses are still present. What is the most appropriate action?',
    options: [
      'Urgent fasciotomy after splitting the cast',
      'Reassure — pulses are present so ischaemia is excluded',
      'Elevate the limb above the heart and observe',
      'Increase opioid analgesia and re-examine in the morning',
      'Apply ice and tighten the cast for support',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Pain out of proportion, worsened by passive stretch, with a tense compartment is acute compartment syndrome — a surgical emergency. Pulses are often PRESENT until late, so they do not exclude it. Split the cast/dressings to skin and perform urgent fasciotomy to prevent muscle necrosis (Volkmann contracture) and limb loss.',
    wrongAnswerExplanations: [
      'Correct — compartment syndrome requires urgent fasciotomy; release constricting casts first.',
      'Present pulses do NOT exclude compartment syndrome — it is a diagnosis of the microcirculation, not large vessels.',
      'Elevation to heart level at most (not above) and watchful waiting waste time when fasciotomy is indicated.',
      'Masking pain with more opioids delays the diagnosis and risks irreversible muscle death.',
      'Ice and a tighter cast raise compartment pressure and worsen the syndrome.',
    ],
    clinicalPearl:
      'Compartment syndrome: pain on passive stretch is the earliest, most reliable sign. Pulselessness is LATE. The "6 Ps" mislead — operate on clinical suspicion.',
  },
  {
    id: 'surg-031',
    specialty: 'Surgery',
    sourceLecture: 'general_principles_of_fracture_IV___general_complications_P1.pdf',
    topic: 'Fat embolism syndrome',
    question:
      'A 22-year-old man with a femoral shaft fracture develops, 36 hours after injury, acute breathlessness, confusion, and a petechial rash over the chest and axillae, with hypoxia on blood gases. What is the most likely diagnosis?',
    options: [
      'Fat embolism syndrome',
      'Pulmonary thromboembolism',
      'Hospital-acquired pneumonia',
      'Acute myocardial infarction',
      'Alcohol withdrawal',
    ],
    correctAnswerIndex: 0,
    explanation:
      'The classic triad of respiratory distress, neurological changes and a PETECHIAL rash, appearing 24–72 hours after a long-bone (femoral) fracture, is fat embolism syndrome. Management is largely supportive (oxygen, ventilatory support); early fracture fixation reduces incidence.',
    wrongAnswerExplanations: [
      'Correct — the petechial rash with the respiratory–neurological picture 1–3 days after a femoral fracture is fat embolism.',
      'PE causes dyspnoea and hypoxia but NOT a petechial rash or prominent confusion as a triad.',
      'Pneumonia produces fever, cough and consolidation over days, without a petechial rash.',
      'MI causes chest pain and ECG changes, not a petechial rash and the long-bone-fracture context.',
      'Alcohol withdrawal causes tremor and agitation but not hypoxia with petechiae after a fracture.',
    ],
    clinicalPearl:
      'Fat embolism triad: hypoxia + cerebral signs + petechiae, 24–72 h after a long-bone fracture. Prevent with early fixation; treat supportively.',
  },
  {
    id: 'surg-032',
    specialty: 'Surgery',
    sourceLecture: 'Injuries Of The Hip And Femur.pdf',
    topic: 'Femoral neck fracture',
    question:
      'An 80-year-old woman falls and is unable to bear weight. The right leg is shortened and externally rotated. X-ray confirms a displaced INTRACAPSULAR femoral neck fracture. What is the most appropriate definitive management for this displaced intracapsular fracture in an elderly patient?',
    options: [
      'Hemiarthroplasty (or total hip replacement)',
      'Dynamic hip screw fixation',
      'Conservative management with bed rest',
      'Intramedullary nailing',
      'External fixation',
    ],
    correctAnswerIndex: 0,
    explanation:
      'A displaced intracapsular neck-of-femur fracture disrupts the retinacular blood supply (medial femoral circumflex artery), risking avascular necrosis and non-union if fixed. In the elderly, the standard is arthroplasty — hemiarthroplasty, or total hip replacement in fitter, mobile patients with good cognition.',
    wrongAnswerExplanations: [
      'Correct — displaced intracapsular fractures in the elderly are treated by arthroplasty to avoid AVN/non-union.',
      'A dynamic hip screw is used for EXTRACAPSULAR (intertrochanteric) fractures, where the blood supply is preserved.',
      'Prolonged bed rest in the elderly causes pneumonia, DVT, pressure sores and death — early surgery is preferred.',
      'Intramedullary nailing is used for femoral shaft and some subtrochanteric/extracapsular fractures, not displaced intracapsular necks.',
      'External fixation has no role in routine hip-fracture treatment.',
    ],
    clinicalPearl:
      'Intracapsular displaced NOF → replace (arthroplasty). Extracapsular (intertrochanteric) → fix (DHS/nail). The capsule defines the blood supply.',
  },
  {
    id: 'surg-033',
    specialty: 'Surgery',
    sourceLecture: 'Intertrochanteric fracture.pdf',
    topic: 'Intertrochanteric fracture',
    question:
      'A 78-year-old man sustains an EXTRACAPSULAR intertrochanteric femoral fracture after a fall. He was previously mobile. Which is the most appropriate surgical treatment?',
    options: [
      'Dynamic hip screw (sliding hip screw) fixation',
      'Hemiarthroplasty',
      'Total hip replacement',
      'Conservative traction for 12 weeks',
      'Cannulated screw fixation only',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Intertrochanteric fractures are EXTRACAPSULAR, so the femoral head blood supply is intact and AVN risk is low — the goal is fixation, not replacement. A dynamic (sliding) hip screw allows controlled impaction at the fracture site and is the standard for stable intertrochanteric patterns; intramedullary nails are used for unstable/reverse-oblique patterns.',
    wrongAnswerExplanations: [
      'Correct — DHS fixation is standard for extracapsular intertrochanteric fractures.',
      'Hemiarthroplasty is for displaced INTRACAPSULAR fractures, where the head is at risk of AVN.',
      'THR is reserved for displaced intracapsular fractures in fit, active patients — not extracapsular fractures.',
      'Long-term traction causes the complications of prolonged immobility and is not standard care.',
      'Cannulated screws are used for some undisplaced intracapsular fractures, not intertrochanteric fractures.',
    ],
    clinicalPearl:
      'Remember the rule: intracapsular displaced = replace; extracapsular = fix (DHS or IM nail).',
  },
  {
    id: 'surg-034',
    specialty: 'Surgery',
    sourceLecture: 'Injuries to the pelvis .pdf',
    topic: 'Pelvic fracture',
    question:
      'A 35-year-old man crushed between two vehicles has an unstable "open-book" pelvic fracture and is hypotensive. After airway and breathing are secured, what is the most appropriate immediate intervention to control haemorrhage?',
    options: [
      'Apply a pelvic binder at the level of the greater trochanters',
      'Log-roll repeatedly to assess the back',
      'Apply skeletal traction to both legs',
      'Immediate open pelvic packing in the emergency department',
      'Sit the patient upright to reduce venous return',
    ],
    correctAnswerIndex: 0,
    explanation:
      'An open-book pelvic fracture increases pelvic volume and causes venous (and arterial) bleeding. A pelvic binder applied at the greater trochanters reduces pelvic volume and tamponades bleeding — a simple, immediate, life-saving measure. Definitive control may need angioembolization or surgical packing/fixation.',
    wrongAnswerExplanations: [
      'Correct — a correctly placed pelvic binder reduces volume and tamponades haemorrhage immediately.',
      'Repeated log-rolling/"springing" the pelvis can dislodge clot and worsen bleeding — avoid it.',
      'Leg traction does not control pelvic haemorrhage and can worsen some patterns.',
      'Open packing is a theatre/resuscitative procedure, not a first ED manoeuvre before a binder.',
      'Sitting upright does nothing to control pelvic bleeding and may compromise an unstable patient.',
    ],
    clinicalPearl:
      'Unstable pelvis + shock → binder at the greater trochanters first, then transfuse and arrange angioembolization or packing. Do not spring the pelvis.',
  },
  {
    id: 'surg-035',
    specialty: 'Surgery',
    sourceLecture: 'MSK infection 25-26.pdf',
    topic: 'Septic arthritis',
    question:
      'A 6-year-old child refuses to bear weight and holds the right hip flexed, abducted and externally rotated. There is fever, the hip is exquisitely painful on any movement, and inflammatory markers are raised. What is the most important immediate step?',
    options: [
      'Urgent joint aspiration/washout and IV antibiotics',
      'Oral analgesia and outpatient review',
      'MRI in 2 weeks then decide',
      'Start physiotherapy to mobilize the joint',
      'Apply a long-leg cast',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Fever, a hip held flexed/abducted/externally rotated, refusal to weight-bear and raised inflammatory markers indicate septic arthritis — a surgical emergency. Pus rapidly destroys articular cartilage, so urgent joint aspiration/arthrotomy washout plus IV antibiotics (after cultures) is required to save the joint.',
    wrongAnswerExplanations: [
      'Correct — septic arthritis needs urgent drainage/washout and IV antibiotics to prevent joint destruction.',
      'Analgesia and outpatient follow-up dangerously delay treatment of a joint-destroying infection.',
      'Delaying imaging for weeks allows irreversible cartilage damage; treatment must be immediate.',
      'Mobilizing an infected joint is harmful and does not address the infection.',
      'Casting neither drains the pus nor treats the infection.',
    ],
    clinicalPearl:
      'Kocher criteria help distinguish septic arthritis from transient synovitis: fever, non-weight-bearing, ESR/CRP up, WBC up. When in doubt, aspirate.',
  },
  {
    id: 'surg-036',
    specialty: 'Surgery',
    sourceLecture: 'Pediatric Orthopedics and peripheral nerve injuries.pdf',
    topic: 'Developmental dysplasia of the hip',
    question:
      'A neonate is examined on the postnatal ward. On hip examination, the Ortolani and Barlow manoeuvres are positive, and there is asymmetry of the thigh skin creases. Which is the most appropriate first-line imaging to confirm the diagnosis in a child under 6 months?',
    options: [
      'Ultrasound of the hips',
      'Plain pelvic radiograph',
      'CT of the pelvis',
      'MRI under general anaesthesia',
      'No imaging — examination is sufficient',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Positive Ortolani (relocates a dislocated hip) and Barlow (dislocates a dislocatable hip) tests with asymmetric creases suggest developmental dysplasia of the hip. Under ~6 months the femoral head is largely cartilaginous and not visible on X-ray, so ULTRASOUND is the imaging of choice; plain films become useful after the ossific nucleus appears (~4–6 months).',
    wrongAnswerExplanations: [
      'Correct — hip ultrasound is the first-line investigation for DDH in infants under 6 months.',
      'Plain radiographs are unreliable before the femoral head ossifies (~4–6 months).',
      'CT delivers high radiation and is not used for routine DDH screening.',
      'MRI under GA is excessive for first-line DDH assessment.',
      'Imaging IS needed to confirm and grade DDH and to guide treatment (e.g. Pavlik harness).',
    ],
    clinicalPearl:
      'DDH risk factors: breech, female, first-born, family history, oligohydramnios. Treat early with a Pavlik harness; later/irreducible cases need surgery.',
  },
  {
    id: 'surg-037',
    specialty: 'Surgery',
    sourceLecture: 'Common knee joint problems.pdf',
    topic: 'ACL injury',
    question:
      'A 24-year-old footballer twists his knee while pivoting, hears a "pop," and the knee swells immediately (within an hour). Examination shows a positive anterior drawer and Lachman test. What structure is most likely injured?',
    options: [
      'Anterior cruciate ligament',
      'Medial meniscus',
      'Posterior cruciate ligament',
      'Medial collateral ligament',
      'Patellar tendon',
    ],
    correctAnswerIndex: 0,
    explanation:
      'A non-contact pivoting injury with an audible pop, IMMEDIATE haemarthrosis and positive Lachman/anterior drawer tests indicates an anterior cruciate ligament rupture. Rapid effusion reflects bleeding from the vascular ACL. Management ranges from rehabilitation to reconstruction depending on activity demands.',
    wrongAnswerExplanations: [
      'Correct — pivot injury + pop + immediate haemarthrosis + positive Lachman = ACL tear.',
      'A meniscal tear typically causes SLOWER (next-day) effusion, locking and joint-line tenderness, not a positive Lachman.',
      'PCL injury follows a posteriorly directed force (dashboard injury) with a positive posterior drawer, not anterior laxity.',
      'MCL injury follows a valgus force with medial pain and laxity on valgus stress, not anterior drawer positivity.',
      'Patellar tendon rupture causes inability to extend the knee and a high-riding patella, not anterior drawer laxity.',
    ],
    clinicalPearl:
      'Immediate (≤2 h) tense effusion after a knee injury = haemarthrosis → think ACL rupture, osteochondral fracture, or patellar dislocation.',
  },
  {
    id: 'surg-038',
    specialty: 'Surgery',
    sourceLecture: 'common shoulder pathology.pdf',
    topic: 'Anterior shoulder dislocation',
    question:
      'A 25-year-old rugby player falls on an externally rotated, abducted arm. The shoulder looks "squared off" with loss of the deltoid contour, and he holds the arm slightly abducted, resisting movement. Before and after reduction, which nerve must be specifically assessed?',
    options: [
      'Axillary nerve (regimental badge area sensation and deltoid)',
      'Median nerve',
      'Radial nerve',
      'Ulnar nerve',
      'Musculocutaneous nerve',
    ],
    correctAnswerIndex: 0,
    explanation:
      'This is an anterior shoulder dislocation (commonest type). The axillary nerve winds around the surgical neck of the humerus and is most at risk; assess sensation over the "regimental badge" area of the lateral upper arm and deltoid function before and after reduction, and obtain X-rays to exclude a fracture.',
    wrongAnswerExplanations: [
      'Correct — the axillary nerve is most commonly injured in anterior shoulder dislocation.',
      'The median nerve is typically injured at the elbow/wrist (e.g. supracondylar fractures, carpal tunnel), not shoulder dislocation.',
      'The radial nerve is classically injured with humeral SHAFT fractures, not shoulder dislocation.',
      'The ulnar nerve is vulnerable at the medial elbow and wrist, not in shoulder dislocation.',
      'The musculocutaneous nerve is rarely injured here; the axillary nerve is the classic association.',
    ],
    clinicalPearl:
      'Always document neurovascular status (especially axillary nerve) BEFORE and AFTER reducing any dislocation — and X-ray to exclude associated fracture.',
  },
  {
    id: 'surg-039',
    specialty: 'Surgery',
    sourceLecture: 'Upper Extremity #1.pdf',
    topic: 'Carpal tunnel syndrome',
    question:
      'A 48-year-old woman complains of nocturnal tingling and numbness in the thumb, index and middle fingers, relieved by shaking the hand. Tapping over the volar wrist reproduces the tingling. Which nerve is compressed and where?',
    options: [
      'Median nerve at the carpal tunnel',
      'Ulnar nerve at Guyon canal',
      'Radial nerve in the spiral groove',
      'Ulnar nerve at the cubital tunnel',
      'Median nerve at the elbow (pronator syndrome)',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Nocturnal paraesthesia in the median distribution (thumb, index, middle, radial half of ring finger), relief by shaking (flick sign) and a positive Tinel sign at the wrist indicate carpal tunnel syndrome — median nerve compression under the flexor retinaculum. Thenar wasting and a positive Phalen test support it; nerve conduction studies confirm.',
    wrongAnswerExplanations: [
      'Correct — median nerve compression at the carpal tunnel produces this exact pattern.',
      'Ulnar compression at Guyon canal affects the little and ulnar-half of the ring finger, not the radial three digits.',
      'Radial nerve injury at the spiral groove causes wrist drop, not nocturnal hand paraesthesia.',
      'Cubital tunnel (ulnar at elbow) affects the ulnar two digits with elbow-related symptoms.',
      'Pronator syndrome is proximal median compression with forearm pain, not the classic nocturnal wrist-level picture.',
    ],
    clinicalPearl:
      'CTS: median distribution, worse at night, Tinel/Phalen positive, thenar wasting late. Associations: pregnancy, hypothyroidism, diabetes, RA, acromegaly.',
  },
  {
    id: 'surg-040',
    specialty: 'Surgery',
    sourceLecture: 'BONE TUMOURS 2026 .pdf',
    topic: 'Osteosarcoma',
    question:
      'A 15-year-old boy presents with progressive pain and swelling around the right knee, worse at night. X-ray of the distal femur shows an aggressive lesion with a "sunburst" periosteal reaction and Codman triangle. What is the most likely diagnosis?',
    options: [
      'Osteosarcoma',
      'Osteochondroma',
      'Ewing sarcoma',
      'Giant cell tumour',
      'Simple bone cyst',
    ],
    correctAnswerIndex: 0,
    explanation:
      'In an adolescent, an aggressive metaphyseal lesion around the knee (distal femur/proximal tibia) with a "sunburst" appearance and Codman triangle is classic osteosarcoma — the commonest primary malignant bone tumour in young people. Diagnosis is confirmed by biopsy; treatment is neoadjuvant chemotherapy and limb-sparing resection.',
    wrongAnswerExplanations: [
      'Correct — sunburst reaction + Codman triangle around the knee in a teenager = osteosarcoma.',
      'Osteochondroma is a benign cartilage-capped bony outgrowth, not an aggressive destructive lesion.',
      'Ewing sarcoma classically shows an "onion-skin" periosteal reaction and often affects the diaphysis of younger children.',
      'Giant cell tumour occurs at the EPIPHYSIS of skeletally mature adults ("soap-bubble" lytic lesion), not adolescents.',
      'A simple bone cyst is a benign, well-defined lucent lesion without aggressive periosteal reaction.',
    ],
    clinicalPearl:
      'Osteosarcoma: teenager, around the knee, sunburst + Codman triangle. Ewing: younger child, diaphysis, onion-skin, may have fever mimicking infection.',
  },
  {
    id: 'surg-041',
    specialty: 'Surgery',
    sourceLecture: 'IBD.pdf',
    topic: 'Inflammatory bowel disease',
    question:
      'A 24-year-old man has months of bloody diarrhoea with mucus, tenesmus and lower abdominal cramps. Colonoscopy shows continuous inflammation extending proximally from the rectum with a friable mucosa; biopsies show crypt abscesses limited to the mucosa. What is the most likely diagnosis?',
    options: [
      'Ulcerative colitis',
      "Crohn's disease",
      'Ischaemic colitis',
      'Colorectal carcinoma',
      'Infective colitis',
    ],
    correctAnswerIndex: 0,
    explanation:
      'CONTINUOUS inflammation extending proximally from the RECTUM, bloody/mucous diarrhoea with tenesmus, friable mucosa, and crypt abscesses confined to the MUCOSA are characteristic of ulcerative colitis. Crohn disease, by contrast, is transmural with skip lesions and granulomas.',
    wrongAnswerExplanations: [
      'Correct — continuous rectal-onset mucosal inflammation with crypt abscesses = ulcerative colitis.',
      "Crohn's disease has skip lesions, transmural inflammation, granulomas and can affect any part of the GI tract — not continuous rectal disease.",
      'Ischaemic colitis affects watershed areas (e.g. splenic flexure) in older patients with sudden pain, not a chronic young rectal-onset picture.',
      'Colorectal carcinoma is rare at 24 and presents as a mass/stricture, not diffuse continuous colitis.',
      'Infective colitis is usually acute and self-limiting with positive stool cultures, not months of chronic disease.',
    ],
    clinicalPearl:
      'UC: continuous, rectum upward, mucosal, crypt abscesses, bloody diarrhoea, ↑colorectal cancer risk. Crohn: skip lesions, transmural, granulomas, fistulae.',
  },
  {
    id: 'surg-042',
    specialty: 'Surgery',
    sourceLecture: 'anus and anal canal.pdf',
    topic: 'Anal fissure',
    question:
      'A 30-year-old woman reports severe, tearing anal pain during defecation with bright-red blood on the toilet paper, and pain that lasts for an hour afterwards. Examination is limited by intense sphincter spasm; a tear is seen in the posterior midline. What is the first-line treatment for a chronic fissure?',
    options: [
      'Topical GTN or diltiazem ointment plus stool softeners and fibre',
      'Immediate lateral internal sphincterotomy in all patients',
      'Long-term opioid analgesia',
      'Banding (ligation)',
      'Broad-spectrum antibiotics',
    ],
    correctAnswerIndex: 0,
    explanation:
      'A painful posterior-midline tear with bright-red bleeding and sphincter spasm is an anal fissure. First-line therapy aims to relax the internal sphincter and ease passage of stool: topical GTN or diltiazem (chemical sphincterotomy), warm baths, fibre and stool softeners. Lateral internal sphincterotomy is reserved for failure of medical therapy.',
    wrongAnswerExplanations: [
      'Correct — topical relaxants plus stool softening/fibre heal most chronic fissures.',
      'Sphincterotomy is second-line (after failed medical treatment) and carries an incontinence risk, so it is not first for everyone.',
      'Opioids cause constipation, worsening the underlying problem.',
      'Banding treats haemorrhoids, not fissures.',
      'Antibiotics are not indicated for an uncomplicated anal fissure.',
    ],
    clinicalPearl:
      'Most anal fissures are posterior midline. Lateral/multiple fissures suggest Crohn, TB, HIV or malignancy — investigate further.',
  },
  {
    id: 'surg-043',
    specialty: 'Surgery',
    sourceLecture: 'The Anus and Anal canal.pdf',
    topic: 'Perianal abscess',
    question:
      'A 40-year-old diabetic man presents with 3 days of throbbing perianal pain, a tender fluctuant red swelling beside the anus, fever and difficulty sitting. What is the definitive management?',
    options: [
      'Incision and drainage of the abscess',
      'Oral antibiotics alone',
      'Topical steroid cream',
      'Sitz baths and review in 1 week',
      'Stool softeners and reassurance',
    ],
    correctAnswerIndex: 0,
    explanation:
      'A tender, fluctuant, erythematous perianal swelling with fever is a perianal abscess. As with any abscess, the definitive treatment is prompt incision and drainage; antibiotics alone will not resolve a collection. Diabetics are at risk of progression to necrotizing infection, so drainage should not be delayed.',
    wrongAnswerExplanations: [
      'Correct — incision and drainage is the definitive treatment for a perianal abscess.',
      'Antibiotics do not drain pus; they are adjuncts at most (e.g. with cellulitis, immunocompromise).',
      'Steroid cream has no role and may worsen infection.',
      'Delaying drainage risks extension, sepsis and necrotizing infection, especially in a diabetic.',
      'Conservative measures alone leave the collection undrained.',
    ],
    clinicalPearl:
      'Drain the pus. Watch for an underlying fistula-in-ano (≈⅓ of perianal abscesses) and for necrotizing perineal infection (Fournier gangrene) in diabetics.',
  },
  {
    id: 'surg-044',
    specialty: 'Surgery',
    sourceLecture: 'RECTUM(1).pdf',
    topic: 'Colorectal carcinoma',
    question:
      'A 68-year-old man reports a change in bowel habit to looser stools, blood mixed in the stool, tenesmus and weight loss over 3 months. He is anaemic. Which investigation is the gold standard for diagnosis?',
    options: [
      'Colonoscopy with biopsy',
      'Plain abdominal X-ray',
      'Barium enema alone',
      'Faecal occult blood test alone',
      'CT colonography as the diagnostic gold standard for tissue diagnosis',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Change in bowel habit, rectal bleeding (blood mixed in stool), tenesmus, weight loss and anaemia in an older patient strongly suggest colorectal carcinoma. Colonoscopy is the gold standard: it directly visualizes the lesion, allows biopsy for histology and detects synchronous tumours. Staging is then completed with CT chest/abdomen/pelvis (and MRI/ERUS for rectal tumours).',
    wrongAnswerExplanations: [
      'Correct — colonoscopy with biopsy is the diagnostic gold standard for colorectal cancer.',
      'A plain X-ray cannot diagnose a colorectal tumour, though it may show obstruction.',
      'Barium enema can suggest a lesion ("apple-core") but cannot obtain tissue and is largely superseded.',
      'FOBT is a SCREENING test, not a diagnostic one — a positive result still requires colonoscopy.',
      'CT colonography can detect lesions but cannot biopsy them; tissue diagnosis still needs colonoscopy.',
    ],
    clinicalPearl:
      'Iron-deficiency anaemia in an older man or postmenopausal woman is colorectal cancer until proven otherwise — scope both ends if needed.',
  },
  {
    id: 'surg-045',
    specialty: 'Surgery',
    sourceLecture: 'Disorders of the salivary glands.pdf',
    topic: 'Salivary calculi',
    question:
      'A 45-year-old man reports recurrent painful swelling of the floor of the mouth/submandibular region that worsens at mealtimes and settles afterwards. Bimanual palpation reveals a hard stone in the floor of the mouth. Which gland and duct are most commonly involved?',
    options: [
      'Submandibular gland — Wharton duct',
      'Parotid gland — Stensen duct',
      'Sublingual gland — ducts of Rivinus',
      'Minor salivary glands',
      'Lacrimal gland — nasolacrimal duct',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Mealtime swelling and pain ("salivary colic") with a palpable stone indicate sialolithiasis. Around 80% of salivary calculi occur in the SUBMANDIBULAR gland and its duct (Wharton duct), because its saliva is more mucinous/alkaline and the duct runs uphill against gravity. Distal stones can be removed intra-orally.',
    wrongAnswerExplanations: [
      'Correct — the submandibular gland (Wharton duct) is the commonest site of salivary stones.',
      'The parotid (Stensen duct) is more often the site of viral (mumps) or bacterial parotitis and tumours, less commonly stones.',
      'The sublingual gland rarely forms calculi.',
      'Minor salivary glands are an uncommon site for stones (more relevant to mucoceles/tumours).',
      'The lacrimal gland is unrelated to salivary calculi.',
    ],
    clinicalPearl:
      'Mealtime salivary-gland swelling = sialolithiasis (usually submandibular/Wharton duct). Most parotid TUMOURS are benign pleomorphic adenomas.',
  },
  {
    id: 'surg-046',
    specialty: 'Surgery',
    sourceLecture: 'Lumps.pdf',
    topic: 'Neck lumps',
    question:
      'A 19-year-old presents with a smooth midline neck lump that moves upward on swallowing AND on tongue protrusion. It is painless and has been present for years. What is the most likely diagnosis?',
    options: [
      'Thyroglossal cyst',
      'Branchial cyst',
      'Thyroid nodule',
      'Cervical lymphadenopathy',
      'Pharyngeal pouch',
    ],
    correctAnswerIndex: 0,
    explanation:
      'A midline neck swelling that rises on swallowing AND on tongue protrusion is a thyroglossal cyst, because it is attached to the foramen caecum of the tongue via the tract of thyroid descent. Treatment is Sistrunk operation (excision of the cyst and the central hyoid body).',
    wrongAnswerExplanations: [
      'Correct — movement on tongue protrusion is the hallmark of a thyroglossal cyst.',
      'A branchial cyst lies in the LATERAL neck (anterior to sternocleidomastoid) and does not move with tongue protrusion.',
      'A thyroid nodule moves with swallowing but NOT with tongue protrusion, and is usually lateral to the midline.',
      'Cervical lymph nodes are lateral and do not move with swallowing or tongue protrusion.',
      'A pharyngeal pouch presents with dysphagia, regurgitation and gurgling, not a midline swelling moving with the tongue.',
    ],
    clinicalPearl:
      'Moves with swallowing → thyroid/thyroglossal. ALSO moves with tongue protrusion → thyroglossal cyst. Treat with the Sistrunk procedure.',
  },
  {
    id: 'surg-047',
    specialty: 'Surgery',
    sourceLecture: 'PLEURA.pdf',
    topic: 'Empyema / pleural effusion',
    question:
      'A 55-year-old man treated for pneumonia remains febrile with pleuritic chest pain. A pleural tap yields turbid fluid with pH 7.1, low glucose, high LDH and organisms on Gram stain. What is the most appropriate management?',
    options: [
      'Chest tube drainage plus antibiotics',
      'Repeat antibiotics only and observe',
      'Therapeutic aspiration once and discharge',
      'Oral steroids',
      'Diuretics',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Turbid pleural fluid with pH <7.2, low glucose, high LDH and positive Gram stain after pneumonia indicates an empyema (or complicated parapneumonic effusion). It requires DRAINAGE with a chest tube alongside antibiotics; loculated/organized collections may need fibrinolytics or surgical decortication (VATS).',
    wrongAnswerExplanations: [
      'Correct — empyema needs chest-tube drainage plus antibiotics (source control).',
      'Antibiotics alone do not clear an organized infected collection under pressure.',
      'A single aspiration is inadequate for an empyema, which reaccumulates and loculates.',
      'Steroids are not the treatment for an infected pleural collection.',
      'Diuretics treat transudative effusions (e.g. heart failure), not an empyema.',
    ],
    clinicalPearl:
      'Parapneumonic effusion turning to pH <7.2 / low glucose / pus = empyema → drain it. Light criteria distinguish exudate from transudate.',
  },
  {
    id: 'surg-048',
    specialty: 'Surgery',
    sourceLecture: 'Nutrition and fluid therapy.pdf',
    topic: 'Refeeding syndrome',
    question:
      'A severely malnourished 60-year-old man (minimal intake for 2 weeks, low BMI) is started on aggressive enteral feeding. Two days later he becomes confused and weak with arrhythmia. Which electrolyte abnormality is most characteristic of this complication?',
    options: [
      'Hypophosphataemia',
      'Hypernatraemia',
      'Hypercalcaemia',
      'Hyperkalaemia',
      'Hyperchloraemia',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Reintroducing carbohydrate after starvation triggers an insulin surge that drives phosphate (and potassium and magnesium) intracellularly — refeeding syndrome. HYPOphosphataemia is the hallmark and causes weakness, arrhythmia, respiratory failure and confusion. Prevent by starting feeding slowly, supplementing electrolytes and thiamine, and monitoring closely.',
    wrongAnswerExplanations: [
      'Correct — hypophosphataemia is the defining feature of refeeding syndrome.',
      'Refeeding causes intracellular shifts producing LOW (not high) sodium/phosphate/potassium/magnesium.',
      'Calcium is not the characteristic abnormality of refeeding syndrome.',
      'Potassium typically falls (hypokalaemia), not rises, in refeeding syndrome.',
      'Chloride disturbance is not characteristic of refeeding syndrome.',
    ],
    clinicalPearl:
      'Refeeding syndrome: low PO₄³⁻, K⁺, Mg²⁺. Feed slowly, replace electrolytes, give thiamine BEFORE carbohydrate to avoid Wernicke encephalopathy.',
  },
  {
    id: 'surg-049',
    specialty: 'Surgery',
    sourceLecture: 'Care of Critically Ill Patient.pdf',
    topic: 'Sepsis recognition & management',
    question:
      'A 70-year-old post-operative woman has a temperature of 38.8°C, HR 118/min, BP 86/50 mmHg, RR 26/min, and a lactate of 4 mmol/L with reduced urine output. Which bundle of actions should be initiated within the first hour?',
    options: [
      'Blood cultures, broad-spectrum IV antibiotics, IV fluids, lactate measurement, and urine-output monitoring (Sepsis Six / hour-1 bundle)',
      'Oral antibiotics and review in the morning',
      'Diuretics to improve urine output',
      'Await culture results before giving antibiotics',
      'Vasopressors alone without fluids',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Hypotension and lactate >2 mmol/L with infection indicate septic shock. The hour-1 / Sepsis-Six bundle is: take blood cultures, give broad-spectrum IV antibiotics, give IV fluid resuscitation, measure (and re-measure) lactate, give oxygen, and monitor urine output. Early antibiotics and fluids save lives.',
    wrongAnswerExplanations: [
      'Correct — the Sepsis-Six/hour-1 bundle (cultures, antibiotics, fluids, lactate, oxygen, urine output) is initiated immediately.',
      'Oral antibiotics and delay are inadequate for septic shock and increase mortality.',
      'Diuretics in a hypotensive, hypovolaemic septic patient worsen perfusion — give fluids instead.',
      'Antibiotics must be EMPIRIC and immediate; every hour of delay increases mortality.',
      'Vasopressors are added after adequate fluid resuscitation, not instead of it.',
    ],
    clinicalPearl:
      'Sepsis: give 3 (cultures, antibiotics, fluids) and take 3 (lactate, urine output, oxygen) within the first hour. Lactate >2 with hypotension = septic shock.',
  },
  {
    id: 'surg-050',
    specialty: 'Surgery',
    sourceLecture: 'Preoperative Assessment & Approach to General Anesthesia 2.pdf',
    topic: 'Preoperative assessment — ASA grading',
    question:
      'A 65-year-old man with well-controlled hypertension and type-2 diabetes (no end-organ damage, no functional limitation) is being assessed before an elective hernia repair. Which ASA physical-status classification best fits him?',
    options: [
      'ASA II',
      'ASA I',
      'ASA III',
      'ASA IV',
      'ASA V',
    ],
    correctAnswerIndex: 0,
    explanation:
      'ASA grading: I = healthy; II = mild systemic disease without functional limitation; III = severe systemic disease with functional limitation; IV = severe disease that is a constant threat to life; V = moribund, not expected to survive without the operation. Well-controlled HTN and diabetes without end-organ damage is ASA II.',
    wrongAnswerExplanations: [
      'Correct — mild, well-controlled systemic disease with no functional limitation is ASA II.',
      'ASA I is a completely healthy patient with no systemic disease.',
      'ASA III requires SEVERE systemic disease with functional limitation (e.g. poorly controlled diabetes with complications), more than this patient has.',
      'ASA IV is a severe disease that is a constant threat to life (e.g. recent MI, severe heart failure).',
      'ASA V is a moribund patient not expected to survive 24 hours without surgery.',
    ],
    clinicalPearl:
      'ASA grades risk, not the operation. Add "E" for emergency. It correlates with perioperative morbidity and mortality.',
  },
  {
    id: 'surg-051',
    specialty: 'Surgery',
    sourceLecture: 'Solid Organ Ttransplantation.pdf',
    topic: 'Transplant rejection',
    question:
      'A 40-year-old man receives a deceased-donor kidney transplant. Minutes after the vascular clamps are released, the graft becomes mottled, blue and flabby, and fails to produce urine. This is due to preformed recipient antibodies. What type of rejection is this?',
    options: [
      'Hyperacute rejection',
      'Acute cellular rejection',
      'Chronic rejection',
      'Graft-versus-host disease',
      'Acute tubular necrosis',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Rejection occurring within MINUTES of reperfusion, with the graft turning mottled and failing immediately, is hyperacute rejection — mediated by PREFORMED recipient antibodies (e.g. against ABO or HLA antigens) that trigger complement and thrombosis. It is prevented by ABO matching and a pre-transplant crossmatch; the graft must be removed.',
    wrongAnswerExplanations: [
      'Correct — immediate antibody-mediated graft failure is hyperacute rejection.',
      'Acute cellular rejection is T-cell mediated and occurs over days to weeks, not minutes.',
      'Chronic rejection develops over months to years with gradual fibrosis and vascular changes.',
      'GVHD occurs when donor lymphocytes attack the host (relevant in bone-marrow transplants), not this hyperacute graft loss.',
      'ATN causes delayed graft function but the kidney is not immediately mottled and thrombosed from antibodies.',
    ],
    clinicalPearl:
      'Hyperacute (minutes, preformed antibodies) → prevented by crossmatch/ABO matching. Acute (days–weeks, T cells) → treat with steroids/immunosuppression.',
  },
  {
    id: 'surg-052',
    specialty: 'Surgery',
    sourceLecture: 'Surgical approach for morbid obesity.pdf',
    topic: 'Bariatric surgery',
    question:
      'A 38-year-old woman with a BMI of 45 kg/m² and type-2 diabetes has failed supervised medical weight-loss programmes. She is considered for bariatric surgery. Which statement about a Roux-en-Y gastric bypass is correct?',
    options: [
      'It produces weight loss by both restriction and malabsorption and often improves type-2 diabetes',
      'It is purely restrictive with no metabolic effect',
      'It carries no risk of nutritional deficiency',
      'It is first-line before any lifestyle intervention',
      'It is indicated only for a BMI below 30',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Roux-en-Y gastric bypass creates a small gastric pouch (restriction) and bypasses proximal small bowel (malabsorption), and has marked metabolic effects, frequently improving or resolving type-2 diabetes. Candidates typically have BMI ≥40, or ≥35 with comorbidities, after failed medical management; lifelong vitamin/mineral monitoring is required.',
    wrongAnswerExplanations: [
      'Correct — gastric bypass combines restriction and malabsorption and has strong anti-diabetic (metabolic) effects.',
      'A sleeve gastrectomy/band is mainly restrictive; bypass has BOTH components plus metabolic effects.',
      'Bypass DOES risk deficiencies (iron, B12, folate, calcium, vitamin D) needing lifelong supplementation.',
      'Surgery follows failed lifestyle/medical management, not before it.',
      'Eligibility is generally BMI ≥40 (or ≥35 with comorbidity), not below 30.',
    ],
    clinicalPearl:
      'Bariatric surgery is "metabolic" surgery — diabetes can improve before significant weight loss. Lifelong micronutrient monitoring is essential.',
  },
  {
    id: 'surg-053',
    specialty: 'Surgery',
    sourceLecture: 'Small Intestine 2025-2026.pdf',
    topic: 'Mesenteric ischaemia',
    question:
      'An 80-year-old woman with atrial fibrillation develops sudden severe central abdominal pain that is OUT OF PROPORTION to a soft, minimally tender abdomen. She has vomiting and a raised lactate and white cell count. What is the most likely diagnosis?',
    options: [
      'Acute mesenteric ischaemia',
      'Acute pancreatitis',
      'Gastroenteritis',
      'Diverticulitis',
      'Renal colic',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Severe pain OUT OF PROPORTION to examination findings, in an elderly patient with AF, plus a raised lactate, is the classic picture of acute mesenteric ischaemia — usually an embolus to the superior mesenteric artery. Early diagnosis (CT angiography) and revascularization/resection are needed before transmural infarction supervenes.',
    wrongAnswerExplanations: [
      'Correct — pain out of proportion + AF + lactic acidosis = acute mesenteric ischaemia.',
      'Pancreatitis causes severe pain but with marked epigastric tenderness and very high lipase, not the "soft abdomen, severe pain" mismatch.',
      'Gastroenteritis causes diarrhoea/vomiting without a rising lactate and infarction risk.',
      'Diverticulitis causes localized LIF pain and tenderness, not diffuse pain out of proportion with lactic acidosis.',
      'Renal colic causes loin-to-groin colicky pain with haematuria, not central pain with raised lactate.',
    ],
    clinicalPearl:
      'Pain out of proportion to a soft abdomen + AF/vascular risk + metabolic acidosis = mesenteric ischaemia. CT angiography confirms; delay costs bowel and life.',
  },
  {
    id: 'surg-054',
    specialty: 'Surgery',
    sourceLecture: 'principles of surgical oncology.pdf',
    topic: 'Surgical oncology — staging',
    question:
      'A multidisciplinary team is planning treatment for a patient with colorectal cancer. They describe the tumour using the TNM system. What do the three components T, N and M represent?',
    options: [
      'Primary Tumour extent, regional lymph Node involvement, and distant Metastasis',
      'Tumour type, Number of tumours, and Mitotic rate',
      'Tissue grade, Necrosis, and Margins',
      'Tumour markers, Nodal grade, and Mortality risk',
      'Thickness, Nuclear grade, and Microsatellite status',
    ],
    correctAnswerIndex: 0,
    explanation:
      'TNM staging describes anatomical extent: T = size/local extent of the primary Tumour, N = regional lymph Node involvement, M = distant Metastasis. It guides prognosis and treatment selection (surgery, chemotherapy, radiotherapy) and is the common language of the cancer MDT.',
    wrongAnswerExplanations: [
      'Correct — T (tumour), N (nodes), M (metastasis) defines anatomical staging.',
      'TNM is not about tumour type, number, or mitotic rate (those relate to grading/pathology).',
      'Grade, necrosis and margins are pathological features but are not what TNM stands for.',
      'Tumour markers and mortality risk are not the TNM components.',
      'Thickness/nuclear grade/microsatellite status are specific pathology features, not the TNM definition.',
    ],
    clinicalPearl:
      'Stage = anatomical spread (TNM, drives treatment). Grade = how differentiated the cells are (pathological aggressiveness). They are different concepts.',
  },
  {
    id: 'surg-055',
    specialty: 'Surgery',
    sourceLecture: 'Acute abdomin.pdf',
    topic: 'Acute diverticulitis',
    question:
      'A 62-year-old man presents with left-iliac-fossa pain, fever and altered bowel habit. He is tender in the LIF with localized guarding. CT shows sigmoid wall thickening with surrounding fat stranding but no abscess or free air (uncomplicated). What is the most appropriate initial management?',
    options: [
      'Antibiotics, bowel rest and analgesia, with interval colonoscopy after recovery',
      'Emergency Hartmann procedure',
      'Immediate colonoscopy during the acute attack',
      'Barium enema during the acute phase',
      'Discharge with no treatment',
    ],
    correctAnswerIndex: 0,
    explanation:
      'LIF pain, fever and CT sigmoid wall thickening with fat stranding indicate acute uncomplicated diverticulitis. Management is conservative: antibiotics, analgesia and bowel rest/fluids, with a colonoscopy a few weeks LATER (once inflammation settles) to exclude an underlying malignancy. Surgery is reserved for complications.',
    wrongAnswerExplanations: [
      'Correct — uncomplicated diverticulitis is managed conservatively, with interval colonoscopy after recovery.',
      'Hartmann is reserved for complicated disease (perforation, generalized peritonitis, obstruction), not uncomplicated diverticulitis.',
      'Colonoscopy during acute diverticulitis risks perforation and is deferred until recovery.',
      'A barium enema in the acute phase risks barium peritonitis if there is a perforation and is avoided.',
      'Untreated diverticulitis can progress to abscess, perforation or fistula.',
    ],
    clinicalPearl:
      'Uncomplicated diverticulitis → antibiotics + bowel rest, interval scope to exclude cancer. Hinchey grading directs whether complications need drainage or surgery.',
  },
  {
    id: 'surg-056',
    specialty: 'Surgery',
    sourceLecture: 'gal bladder & bile duct 2025 - for lectures.pdf',
    topic: 'Biliary colic',
    question:
      'A 38-year-old overweight woman has recurrent episodes of severe, cramping right-upper-quadrant pain that come on after fatty meals, last 1–3 hours, and then settle completely. She is afebrile with a normal white cell count and no jaundice between attacks. What is the diagnosis?',
    options: [
      'Biliary colic',
      'Acute cholecystitis',
      'Ascending cholangitis',
      'Acute pancreatitis',
      'Peptic ulcer disease',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Episodic RUQ pain provoked by fatty meals, lasting a few hours and resolving fully, with NO fever or leukocytosis, reflects transient cystic-duct obstruction by a stone — biliary colic. Because the gallbladder is not yet inflamed, there are no signs of infection. Elective cholecystectomy is offered for recurrent symptoms.',
    wrongAnswerExplanations: [
      'Correct — self-limiting post-prandial RUQ pain without fever/leukocytosis is biliary colic.',
      'Acute cholecystitis features PERSISTENT pain (>6 h), fever, leukocytosis and a positive Murphy sign — absent here.',
      'Cholangitis adds fever, jaundice and rigors (Charcot triad) from ductal obstruction and infection.',
      'Pancreatitis causes severe epigastric pain radiating to the back with raised lipase, not brief self-limiting RUQ colic.',
      'Peptic ulcer pain relates to eating/fasting in the epigastrium and is not typically the post-fatty-meal RUQ colic pattern.',
    ],
    clinicalPearl:
      'Biliary colic = transient, no inflammation. Once pain becomes persistent with fever/leukocytosis, it has become cholecystitis. Both are treated with cholecystectomy.',
  },
  {
    id: 'surg-057',
    specialty: 'Surgery',
    sourceLecture: 'Ankle fractures.pdf',
    topic: 'Ankle injury — Ottawa rules',
    question:
      'A 30-year-old man inverts his ankle. There is lateral swelling. To decide whether an ankle X-ray is needed, you apply the Ottawa ankle rules. An X-ray of the ankle is indicated if there is pain in the malleolar zone AND which of the following?',
    options: [
      'Bony tenderness at the posterior edge/tip of either malleolus, or inability to weight-bear for 4 steps both immediately and in the department',
      'Any soft-tissue swelling regardless of tenderness',
      'A history of a previous ankle sprain',
      'Pain only in the mid-foot',
      'Presence of bruising alone',
    ],
    correctAnswerIndex: 0,
    explanation:
      'The Ottawa ankle rules: an ankle X-ray is required if there is pain in the malleolar zone AND either bony tenderness at the posterior edge/tip of the lateral or medial malleolus, OR an inability to bear weight for four steps both immediately after injury and in the department. The rules reduce unnecessary radiographs with very high sensitivity for fracture.',
    wrongAnswerExplanations: [
      'Correct — bony malleolar tenderness OR inability to weight-bear (4 steps) drives the need for an ankle X-ray.',
      'Soft-tissue swelling alone does not satisfy the rules; bony tenderness or weight-bearing failure is required.',
      'A previous sprain is not part of the Ottawa criteria.',
      'Mid-foot pain triggers the separate Ottawa FOOT (not ankle) rule, involving the navicular and 5th metatarsal base.',
      'Bruising alone is not a criterion in the Ottawa rules.',
    ],
    clinicalPearl:
      'Ottawa ankle rules safely cut unnecessary X-rays: malleolar pain + bony tenderness (posterior malleolus) OR can\'t take 4 steps → image.',
  },
  {
    id: 'surg-058',
    specialty: 'Surgery',
    sourceLecture: 'supracondylar fracture femur.pdf',
    topic: 'Supracondylar fracture (paediatric)',
    question:
      'A 6-year-old falls onto an outstretched hand and has a painful, swollen elbow. X-ray shows a displaced supracondylar humeral fracture. Which neurovascular structure is most commonly injured and must be carefully assessed?',
    options: [
      'Anterior interosseous branch of the median nerve / brachial artery',
      'Axillary nerve',
      'Common peroneal nerve',
      'Sciatic nerve',
      'Femoral artery',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Supracondylar humeral fractures (commonest paediatric elbow fracture, usually extension-type from a fall on an outstretched hand) classically threaten the median nerve — especially its anterior interosseous branch (test the "OK" sign) — and the brachial artery. Vascular compromise and compartment syndrome (risking Volkmann contracture) make urgent assessment and reduction essential.',
    wrongAnswerExplanations: [
      'Correct — the median/AIN nerve and brachial artery at the elbow are most at risk in supracondylar fractures.',
      'The axillary nerve is associated with shoulder dislocation, not elbow fractures.',
      'The common peroneal nerve relates to the fibular neck/knee, not the elbow.',
      'The sciatic nerve relates to hip/pelvis injuries, not the elbow.',
      'The femoral artery is a lower-limb vessel, irrelevant to an elbow fracture.',
    ],
    clinicalPearl:
      'Supracondylar fracture: check the radial pulse and the AIN ("OK" sign) before and after reduction; watch for compartment syndrome → Volkmann ischaemic contracture.',
  },
  {
    id: 'surg-059',
    specialty: 'Surgery',
    sourceLecture: 'Amputation25-26.pdf',
    topic: 'Amputation — indications',
    question:
      'A 68-year-old diabetic with peripheral arterial disease has a non-healing forefoot with wet gangrene and spreading infection despite revascularization attempts and antibiotics. The limb is not salvageable. Which classic mnemonic summarizes the indications for amputation?',
    options: [
      'The "3 Ds": Dead, Dangerous, Damn nuisance',
      'The "ABCDE" of trauma',
      'The "4 Ts" of a swollen leg',
      'The "5 Ps" of fractures',
      'The "6 Ws" of post-operative fever',
    ],
    correctAnswerIndex: 0,
    explanation:
      'The indications for amputation are classically the "3 Ds": Dead (irreversible ischaemia/gangrene), Dangerous (life-threatening sepsis, wet gangrene, or malignancy), and Damn nuisance (a useless, painful or grossly deformed limb worse than a prosthesis). This patient has Dead and Dangerous tissue, so amputation is indicated for source control.',
    wrongAnswerExplanations: [
      'Correct — the 3 Ds (Dead, Dangerous, Damn nuisance) summarize amputation indications.',
      'ABCDE is the trauma primary-survey sequence, unrelated to amputation indications.',
      'The "4 Ts" is not a recognized amputation mnemonic.',
      'The "5 Ps" describe limb ischaemia/compartment signs, not amputation indications.',
      'The "Ws" mnemonic relates to causes of post-operative fever, not amputation.',
    ],
    clinicalPearl:
      'Amputation indications: Dead, Dangerous, Damn nuisance. In diabetic wet gangrene with sepsis, urgent amputation is source control — do not delay for marginal salvage.',
  },
  {
    id: 'surg-060',
    specialty: 'Surgery',
    sourceLecture: 'venous diseases !! 3.pdf',
    topic: 'Deep vein thrombosis',
    question:
      'A 55-year-old woman, 5 days after a total knee replacement, develops a painful, swollen, warm left calf with a positive Homans sign. The calf is 4 cm larger than the right. What is the most appropriate initial diagnostic test?',
    options: [
      'Compression duplex ultrasound of the leg veins',
      'D-dimer alone to confirm the diagnosis',
      'CT pulmonary angiogram',
      'Venography as first-line',
      'Plain X-ray of the leg',
    ],
    correctAnswerIndex: 0,
    explanation:
      'A painful, swollen, warm calf after major orthopaedic surgery (a strong provoking factor) is highly suspicious for deep vein thrombosis. With a high clinical (Wells) probability, the initial test is compression duplex ultrasound — non-invasive and accurate for proximal DVT. Treatment is therapeutic anticoagulation.',
    wrongAnswerExplanations: [
      'Correct — compression duplex ultrasound is the first-line test for suspected DVT, especially when probability is high.',
      'A raised D-dimer is non-specific (it rises post-operatively); it helps EXCLUDE DVT only when probability is LOW. It cannot confirm DVT.',
      'CTPA investigates pulmonary embolism, not the leg veins; there are no respiratory symptoms here.',
      'Venography is invasive and reserved for equivocal cases, not first-line.',
      'A plain X-ray cannot diagnose a DVT.',
    ],
    clinicalPearl:
      'High Wells score → straight to duplex ultrasound. D-dimer is for ruling OUT DVT in low-probability patients, not for confirming it. Prevent with VTE prophylaxis.',
  },
  {
    id: 'surg-061',
    specialty: 'Surgery',
    sourceLecture: 'Plain Abdomen, GI Imaging modalitis Theory.pdf',
    topic: 'Abdominal imaging interpretation',
    question:
      'A 72-year-old man presents with abdominal distension and absolute constipation. An abdominal radiograph shows a markedly dilated loop of large bowel arising from the left lower quadrant and extending towards the right upper quadrant, shaped like a coffee bean. Which diagnosis does this imaging sign indicate?',
    options: [
      'Sigmoid volvulus',
      'Caecal volvulus',
      'Small bowel obstruction',
      'Toxic megacolon',
      'Pneumoperitoneum',
    ],
    correctAnswerIndex: 0,
    explanation:
      'The "coffee-bean" (or "bent inner tube") sign — a hugely dilated loop arising from the pelvis/LLQ and pointing to the RUQ — is the classic radiographic sign of SIGMOID volvulus. Recognising it directs you to endoscopic decompression (if the bowel is viable).',
    wrongAnswerExplanations: [
      'Correct — the coffee-bean sign pointing to the RUQ from the LLQ indicates sigmoid volvulus.',
      'Caecal volvulus typically produces a dilated loop in the LEFT upper quadrant ("embryo" sign) with small-bowel dilatation.',
      'Small-bowel obstruction shows CENTRAL dilated loops with valvulae conniventes (lines crossing the full width), not a single large coffee-bean loop.',
      'Toxic megacolon shows a dilated, oedematous (thumb-printed) colon in a septic colitic patient, not a twisted coffee-bean loop.',
      'Pneumoperitoneum shows free air (e.g. Rigler sign, air under the diaphragm), not a dilated coffee-bean loop.',
    ],
    clinicalPearl:
      'Large-bowel = peripheral, haustra (partial lines); small-bowel = central, valvulae conniventes (full-width lines). Coffee-bean pointing to RUQ = sigmoid volvulus.',
  },
  {
    id: 'surg-062',
    specialty: 'Surgery',
    sourceLecture: 'common foot deformities.pdf',
    topic: 'Congenital talipes equinovarus (clubfoot)',
    question:
      'A newborn is noted to have a rigid foot deformity: the hindfoot is in equinus and varus, and the forefoot is adducted and supinated; the deformity cannot be passively corrected. What is the first-line treatment?',
    options: [
      'Ponseti method of serial casting (and manipulation)',
      'Immediate extensive surgical release at birth',
      'Observation until age 5',
      'Below-knee amputation',
      'Botulinum toxin injection alone',
    ],
    correctAnswerIndex: 0,
    explanation:
      'This is congenital talipes equinovarus (clubfoot). First-line treatment is the Ponseti method — gentle serial manipulation and casting begun in the first weeks of life, usually with a percutaneous Achilles tenotomy, then a foot-abduction brace. It corrects most clubfeet without major surgery.',
    wrongAnswerExplanations: [
      'Correct — Ponseti serial casting is the first-line treatment for clubfoot.',
      'Extensive primary surgical release is reserved for resistant cases, not first-line, due to stiffness/scarring.',
      'Observation lets the deformity become rigid and harder to treat; early casting is key.',
      'Amputation is never appropriate for a correctable congenital deformity.',
      'Botulinum toxin alone is not the standard treatment for clubfoot.',
    ],
    clinicalPearl:
      'Clubfoot (CTEV): start Ponseti casting early (first weeks). Remember the components — Cavus, Adductus, Varus, Equinus (CAVE).',
  },
]
