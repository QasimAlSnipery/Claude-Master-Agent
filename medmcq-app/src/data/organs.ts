/**
 * Organ-based classification. Every question is grouped by the ORGAN / body region it
 * concerns (e.g. "Thyroid", "Heart & Circulation", "Liver & Biliary") rather than by the
 * lecture subject it came from. Rules are evaluated in order — first match wins — so more
 * specific organs are listed before broader regions.
 */

interface OrganRule {
  organ: string
  re: RegExp
}

const RULES: OrganRule[] = [
  // --- specific endocrine organs ---
  { organ: 'Thyroid & Parathyroid', re: /thyroid|parathyroid|goit(re|er)|thyrotox|hyperthyroid|hypothyroid|graves|hashimoto|calcitonin|hypercalc(a|ae)?mia|goitre/i },
  { organ: 'Pituitary & Adrenal', re: /pituitary|adrenal|cushing|addison|acromegaly|prolactin|phaeochromo|pheochromo|\bconn\b|aldosteron|sheehan/i },
  // --- head & neck region organs ---
  { organ: 'Eyes', re: /\beye(s)?\b|ocular|glaucoma|cataract|retina|retinal|vision|visual|cornea|keratitis|uveitis|conjunctiv|strabismus|orbit|eyelid|lacrimal|optic neur|red eye/i },
  { organ: 'Ear, Nose & Throat', re: /\bear\b|hearing|otitis|tympan|vestibul|vertigo|nasal|\bnose\b|sinus|rhinitis|rhinosinus|pharyng|laryng|tonsil|epistaxis|\bthroat\b|neck mass|salivary|parotid|stridor|tracheostomy|adenoid/i },
  { organ: 'Breast', re: /breast|mastitis|fibroadenoma|gynaecomastia|gynecomastia|mammar|nipple/i },
  // --- female reproductive sub-organs ---
  { organ: 'Pregnancy & Labour', re: /pregnan|labour|\blabor\b|antenatal|antepartum|postpartum|puerper|\bfetal\b|foetal|placenta|eclampsia|preeclampsia|pre-eclampsia|preterm|gestational|miscarr|ectopic|rhesus|trophoblastic|amniotic|cord prolapse|shoulder dystocia|caesarean|breech|partograph|induction of labo|multiple pregnancy|stillbirth|iufd/i },
  { organ: 'Uterus', re: /uterus|uterine|fibroid|endometri|adenomyosis|menstr|\baub\b|abnormal uterine|menorrhagia|dysmenorrh|asherman/i },
  { organ: 'Ovary', re: /ovar|\bpcos\b|polycystic|menopause|\bhrt\b|hormone replacement|amenorrh|premenstrual/i },
  { organ: 'Cervix, Vagina & Vulva', re: /cervi|vagin|vulva|colposcop|\bhpv\b|prolapse|pelvic inflammatory|\bpid\b|incontinence/i },
  // --- thorax ---
  { organ: 'Heart & Circulation', re: /heart|cardiac|cardio|coronary|\bstemi\b|nstemi|\bmi\b|myocard|angina|\bacs\b|arrhythmia|atrial|ventric|valv|aortic sten|mitral|endocarditis|pericard|\bhf\b|heart failure|hypertension|\bhtn\b|pulmonary hypertension|\bvte\b|venous thrombo|\bdvt\b|pulmonary embol|aneurysm|isch(a)?emi|claudication|varicose|\bvein\b|arteri|tachycard|bradycard|palpitation/i },
  { organ: 'Lungs & Airway', re: /lung|pulmonary|respiratory|asthma|\bcopd\b|pneumonia|bronchi|bronchiol|\btb\b|tuberculosis|pleura|pneumothorax|empyema|interstitial|sarcoid|effusion|sleep apnoea|sleep apnea|haemoptysis|cystic fibrosis|wheeze/i },
  // --- abdomen ---
  { organ: 'Liver & Biliary', re: /liver|hepat|cirrhosis|jaundice|gall ?bladder|gallstone|\bbile\b|biliary|cholecyst|cholangi|ascites|portal hypertension|varices|hepatic|hcc|cholestasis/i },
  { organ: 'Pancreas & Diabetes', re: /pancrea|insulin|diabet|\bdm\b|\bdka\b|ketoacidos|hypoglyc|islet/i },
  { organ: 'Stomach & Oesophagus', re: /stomach|gastric|gastritis|peptic|duoden|dyspepsia|(o)?esophag|gord|gerd|reflux|achalasia|pylor|h\.? ?pylori|barrett/i },
  { organ: 'Intestines & Colon', re: /bowel|intestin|colon|colorect|append|diverticul|\bibd\b|crohn|ulcerative colitis|\bibs\b|malabsorption|coeliac|celiac|diarrh(o)?ea|constipation|intussusception|obstruction|mesenteric|\brectal\b|rectum|\banus\b|\banal\b|haemorrhoid|hemorrhoid|hernia|meckel|fissure|fistula|volvulus|pilonidal|caecal/i },
  { organ: 'Kidney & Urinary', re: /kidney|renal|nephr|glomerul|nephrotic|nephritic|h(a)?ematuria|proteinuria|\buti\b|urinary|bladder|ureter|prostate|\bbph\b|dialysis|\baki\b|\bckd\b|scrotum|testic|torsion|epididym|urethr/i },
  // --- neuro / psych ---
  { organ: 'Brain', re: /stroke|\btia\b|seizure|epilep|headache|migraine|parkinson|movement disorder|dementia|alzheimer|multiple sclerosis|\bms\b|meningitis|encephal|\bcoma\b|consciousness|cranial nerve|hydrocephalus|raised icp|head injury|h(a)?ematoma|subarachnoid|intracranial|ataxia|cerebral palsy|brain tumo|cns/i },
  { organ: 'Spine & Peripheral Nerves', re: /\bspine\b|spinal cord|vertebr|cauda equina|lumbar|cervical spine|disc prolapse|sciatica|peripheral nerv|neuropath|guillain|myasthen|neuromuscular|radiculopath/i },
  { organ: 'Mental Health', re: /depress|anxiety|\bpanic\b|psychos|psychotic|schizo|bipolar|\bmood\b|\bmania\b|\bocd\b|suicid|substance use|alcohol use|personality disorder|eating disorder|anorexia|bulimia|sleep disorder|sexual disorder|\badhd\b|autism|\bptsd\b|phobia|psychiatr|mental state/i },
  // --- musculoskeletal & skin ---
  { organ: 'Bones & Joints', re: /fracture|\bbone\b|joint|arthritis|osteoarthritis|osteoporos|osteomalac|osteomyel|septic arthritis|\bgout\b|hip\b|knee|shoulder|ankle|elbow|wrist|tendon|ligament|meniscus|dislocation|rheumatoid|\bsle\b|lupus|vasculitis|systemic sclerosis|sjogren|myositis|spondyl|bone tumo|amputation|carpal tunnel|fibromyalgia|musculoskeletal/i },
  { organ: 'Skin', re: /\bskin\b|derm|eczema|\bacne\b|psoriasis|papulosquamous|\brash\b|urticaria|melanoma|n(a)?evus|\bnail\b|\bhair\b|alopecia|pigment|fungal|infestation|scabies|cellulitis|\bburn\b|\bscar\b|graft|\bflap\b|cleft|wound|ulcer/i },
  // --- systemic ---
  { organ: 'Blood & Lymph', re: /an(a)?emia|h(a)?emoglobin|bleeding|coagul|clotting|platelet|thrombocyt|leuk(a)?emia|lymphoma|h(a)?emostatic|sickle|thalass(a)?emia|h(a)?emophilia|lymph(o)?edema|spleen|splenic|myeloma|purpura|porphyria/i },
  { organ: 'Newborn & Child Development', re: /neonat|newborn|preterm|premature|congenital|\bgrowth\b|development|milestone|inborn error|metaboli|immunis|immuniz|vaccin|breastfeed|nutrition|kwashior|rickets|failure to thrive|puberty|genetic|down syndrome|neurocutaneous/i },
  { organ: 'Infections & Immunity', re: /sepsis|septic|\binfection|fever|\bhiv\b|malaria|typhoid|brucell|cholera|measles|rubella|polio|rabies|monkeypox|chicken ?pox|leishman|hydatid|haemorrhagic fever|diphtheria|allerg|autoimmune|hepatitis|\bsti\b|\brti\b/i },
]

const FALLBACK = 'General & Other'

export function classifyOrgan(q: { topic?: string; subtopic?: string; subspecialty?: string; question?: string; tags?: string[] }): string {
  // Classify from the LABELLED fields (topic/subtopic/tags/subspecialty) — not the vignette
  // prose, which would misfire on incidental words (e.g. "palpitations" in an anxiety case).
  const hay = [q.topic ?? '', q.subtopic ?? '', (q.tags ?? []).join(' '), q.subspecialty ?? ''].join(' ')
  for (const r of RULES) if (r.re.test(hay)) return r.organ
  // last resort only: fall back to the stem so nothing lands in "General" unnecessarily
  const stem = (q.question ?? '').slice(0, 160)
  for (const r of RULES) if (r.re.test(stem)) return r.organ
  return FALLBACK
}
