import fitz, os, json, glob, re
MED="/c/Users/Darin Game/Downloads/Medical care-20260613T005631Z-3-001/Medical care"
roots=[
  (MED+"/Theories","Medicine",None),
  (MED+"/Specialities","Medicine","BYDIR"),
  ("new2/primary","Primary Care","BYDIR"),
  ("new2/special","Special Surgeries","BYDIR"),
]
out={}; issues=[]; inv={}
def sub_from(path, base):
    rel=os.path.relpath(path, base); return rel.split(os.sep)[0]
for base,spec,mode in roots:
    for path in glob.glob(base+"/**/*.pdf",recursive=True):
        name=os.path.basename(path)
        sub = sub_from(path, base) if mode=="BYDIR" else None
        try:
            doc=fitz.open(path); txt=" ".join(p.get_text() for p in doc)
            clean=re.sub(r"\s+"," ",txt).strip(); pg=doc.page_count; doc.close()
            out[path]={"spec":spec,"sub":sub,"file":name,"pages":pg,"chars":len(clean)}
            inv.setdefault(spec,{}).setdefault(sub or "(theory)",[]).append((name,len(clean)))
            if len(clean)<200: issues.append({"file":path,"spec":spec,"reason":f"low text {len(clean)}"})
        except Exception as e:
            issues.append({"file":path,"spec":spec,"reason":str(e)})
json.dump(out,open("v3_text.json","w",encoding="utf-8"),ensure_ascii=False)
json.dump(issues,open("v3_issues.json","w",encoding="utf-8"),ensure_ascii=False)
print("extracted:",len(out),"issues:",len(issues))
for spec,subs in inv.items():
    tot=sum(len(v) for v in subs.values()); print(f"{spec}: {tot} readable")
    for s,v in subs.items(): print(f"    {s}: {len(v)}")
for i in issues[:20]: print("  ISSUE:",os.path.basename(i['file']),"-",i['reason'])
