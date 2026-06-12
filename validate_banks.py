import json, glob, os, re
DIR="medmcq-app/src/data/banks"
REQ=["specialty","subspecialty","sourceLecture","sourceFile","topic","difficulty","questionType","clinicalStem","options","correctAnswerIndex","explanation","wrongAnswerExplanations","clinicalPearl","keyClue","isRedFlagQuestion","tags"]
files=sorted(glob.glob(DIR+"/*.json"))
total=0; bad=[]; perspec={}; redflags=0; seen={}; dupes=0
for f in files:
    try: data=json.load(open(f,encoding="utf-8"))
    except Exception as e: bad.append((os.path.basename(f),f"parse: {e}")); continue
    if not isinstance(data,list): bad.append((os.path.basename(f),"not list")); continue
    for i,q in enumerate(data):
        errs=[]
        for k in REQ:
            if k not in q: errs.append(f"miss {k}")
        if isinstance(q.get("options"),list) and len(q["options"])!=5: errs.append(f"opt{len(q['options'])}")
        if isinstance(q.get("wrongAnswerExplanations"),list) and len(q["wrongAnswerExplanations"])!=5: errs.append(f"wae{len(q['wrongAnswerExplanations'])}")
        ci=q.get("correctAnswerIndex")
        if not isinstance(ci,int) or ci<0 or ci>4: errs.append(f"ci{ci}")
        if errs: bad.append((os.path.basename(f),f"q{i}: {','.join(errs)}")); continue
        total+=1
        sp=q["specialty"]; perspec[sp]=perspec.get(sp,0)+1
        if q.get("isRedFlagQuestion"): redflags+=1
        key=re.sub(r'[^a-z0-9]+',' ',q["clinicalStem"].lower()).strip()[:80]
        if key in seen: dupes+=1
        else: seen[key]=f
print(f"files={len(files)} valid={total} redflags={redflags} dupStems={dupes}")
for s,n in sorted(perspec.items()): print(f"  {s}: {n}")
if bad:
    print(f"\nISSUES ({len(bad)}):")
    for f,e in bad[:40]: print(f"  {f}: {e}")
