import json, math, os
v3=json.load(open("v3_text.json",encoding="utf-8"))
old=json.load(open("new_text.json",encoding="utf-8"))  # gyn/peds/psych lectures
JUNK=['template','timetable','index','logbook','blueprint','formative','self-assessment','illustrated textbook','osce','will be updated','missing slides','course book','growth chart','mcqfor','history','seminar','breaking bad news']
def ok(name,chars):
    n=name.lower()
    return chars>=1200 and not any(j in n for j in JUNK)
# gather lectures per (spec, sub)
buckets={}
for v in v3.values():
    if ok(v['file'],v['chars']):
        buckets.setdefault((v['spec'],v.get('sub')),[]).append(v['file'])
# gyn/peds/psych from old extraction
for v in old.values():
    sp=v['spec']
    if sp in ('Gynecology','Pediatrics / Child Care','Psychiatry & Neurology') and ok(v['file'],v['chars']):
        sub='Neurology' if (sp=='Psychiatry & Neurology' and 'neuro' in v['file'].lower()) else None
        buckets.setdefault((sp,sub),[]).append(v['file'])
for k in buckets: buckets[k]=sorted(set(buckets[k]))

TARGET={'Medicine':408,'Primary Care':408,'Special Surgeries':408,'Gynecology':264,'Pediatrics / Child Care':336,'Psychiatry & Neurology':348}
ANGLES=['diagnosis & best investigation','management & emergency priorities','complications, prognosis & follow-up','pharmacology, prevention & screening']
CODE={'Medicine':'med','Primary Care':'pc','Special Surgeries':'ss','Gynecology':'gy2','Pediatrics / Child Care':'pd2','Psychiatry & Neurology':'ps2'}
def chunk(l,s):
    return [l[i:i+s] for i in range(0,len(l),s)] or [l]
batches=[]
for spec,target in TARGET.items():
    need=math.ceil(target/12)
    subs=[(s,f) for (sp,s),f in buckets.items() if sp==spec]
    # build base groups of ~4 lectures across subs
    groups=[]
    for sub,files in subs:
        for g in chunk(files,4):
            groups.append((sub,g))
    if not groups: continue
    bi=0
    while len([b for b in batches if b['specialty']==spec])<need:
        sub,g=groups[bi%len(groups)]
        angle=ANGLES[(bi//len(groups))%len(ANGLES)] if len(groups)<need else ANGLES[bi%len(ANGLES)]
        idx=len([b for b in batches if b['specialty']==spec])+1
        batches.append({'code':f'{CODE[spec]}-{idx}','specialty':spec,'subspecialty':sub,'lectures':g,'n':12,'angle':angle})
        bi+=1
json.dump(batches,open("gen_batches_v3.json","w",encoding="utf-8"),ensure_ascii=False)
from collections import Counter
c=Counter(b['specialty'] for b in batches)
print("total batches",len(batches),"-> ~",sum(b['n'] for b in batches),"q")
for s,n in c.items(): print(f"  {s}: {n} batches (~{n*12})")
