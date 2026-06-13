import fitz, os, json, glob, re
MED="C:/Users/Darin Game/Downloads/Medical care-20260613T005631Z-3-001/Medical care"
roots=[(MED+"/Theories","BYWEEK"),(MED+"/Specialities","BYDIR")]
out=json.load(open("v3_text.json",encoding="utf-8"))
issues=json.load(open("v3_issues.json",encoding="utf-8"))
inv={}
for base,mode in roots:
    for path in glob.glob(base+"/**/*.pdf",recursive=True):
        name=os.path.basename(path)
        rel=os.path.relpath(path,base); sub=rel.split(os.sep)[0] if mode=="BYDIR" else "Theory"
        try:
            doc=fitz.open(path); txt=" ".join(p.get_text() for p in doc)
            clean=re.sub(r"\s+"," ",txt).strip(); pg=doc.page_count; doc.close()
            out[path]={"spec":"Medicine","sub":sub,"file":name,"pages":pg,"chars":len(clean)}
            inv.setdefault(sub,[]).append(name)
            if len(clean)<200: issues.append({"file":path,"spec":"Medicine","reason":f"low text {len(clean)}"})
        except Exception as e: issues.append({"file":path,"spec":"Medicine","reason":str(e)})
json.dump(out,open("v3_text.json","w",encoding="utf-8"),ensure_ascii=False)
json.dump(issues,open("v3_issues.json","w",encoding="utf-8"),ensure_ascii=False)
med=[v for v in out.values() if v['spec']=='Medicine']
print("medicine readable:",len(med))
for s,v in inv.items(): print(f"    {s}: {len(v)}")
