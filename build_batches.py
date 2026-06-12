import json, re
d=json.load(open('new_text.json',encoding='utf-8'))
# collect readable theory lectures per specialty
def is_skip(name):
    n=name.lower()
    return any(k in n for k in ['logbook','blueprint','course book','coursebook','growth chart','mcqfor','osce','seminar list','timetable','index'])
buckets={}
for path,v in d.items():
    spec=v['spec']; name=v['file']
    if v['chars']<1500: continue
    if is_skip(name): continue
    sub=None
    if spec=='Psychiatry & Neurology':
        sub='Neurology' if ('/2 Neuro' in path or 'Neuro/' in path or 'neuro' in path.lower().split('/')[-2:][0] if False else False) else None
        sub='Neurology' if ('Neuro' in path) and ('Psychiatry/' not in path) else 'Psychiatry'
    buckets.setdefault((spec,sub),[]).append(name)

batches=[]
def chunk(lst,size):
    for i in range(0,len(lst),size): yield lst[i:i+size]

speccode={'Gynecology':'gyn','Pediatrics / Child Care':'peds','Psychiatry & Neurology':'psy'}
for (spec,sub),files in buckets.items():
    files=sorted(set(files))
    code=speccode.get(spec,'x')
    subc = (sub[:4].lower() if sub else '')
    for i,grp in enumerate(chunk(files,5)):
        batches.append({'code':f'{code}-{subc}{i+1}' if subc else f'{code}-{i+1}','specialty':spec,'subspecialty':sub,'lectures':grp,'n':12})

# Special Surgeries: subspecialty batches grounded to coursebook
ss_subs=[('Orthopaedics','fractures, joints, sports injuries, bone & joint infection, spine, paediatric orthopaedics, common orthopaedic emergencies'),
('Urology','renal/ureteric colic, urinary retention, BPH, urological malignancy, testicular torsion, haematuria, UTI/obstruction'),
('ENT (Otorhinolaryngology)','otitis media/externa, epistaxis, tonsillitis/quinsy, hearing loss, sinusitis, airway/foreign body, head & neck masses'),
('Ophthalmology','red eye, acute glaucoma, retinal detachment, sudden visual loss, ocular trauma, cataract, diabetic eye disease'),
('Neurosurgery','head injury & raised ICP, extradural/subdural haematoma, subarachnoid haemorrhage, hydrocephalus, spinal cord compression, brain tumours'),
('Plastic & Maxillofacial','burns, wound & flap principles, facial trauma/fractures, hand injuries, skin cancer, cleft, reconstruction'),
('Paediatric & Cardiothoracic surgery','congenital anomalies, pyloric stenosis, intussusception, hernias in children, chest trauma, thoracic emergencies')]
for i,(sub,focus) in enumerate(ss_subs):
    batches.append({'code':f'spec-{i+1}','specialty':'Special Surgeries','subspecialty':sub,'lectures':['Course Book.pdf'],'n':12,'focus':focus})

json.dump(batches,open('gen_batches.json','w',encoding='utf-8'),ensure_ascii=False)
from collections import Counter
c=Counter(b['specialty'] for b in batches)
print('total batches:',len(batches),'-> ~',sum(b['n'] for b in batches),'questions')
for s,n in c.items(): print(f'  {s}: {n} batches (~{n*12} q)')
