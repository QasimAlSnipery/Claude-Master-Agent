import fitz, os, json, glob, re, unicodedata
root="new_batch/main"
specmap={"1. Obstetrics & Gynecology":"Gynecology","4. Psychiatry & Neurology":"Psychiatry & Neurology","5. Special Surgery":"Special Surgeries"}
def topfolder(p):
    rel=os.path.relpath(p,root); parts=rel.split(os.sep); return parts[0]
out={}; issues=[]; inv={}
for path in glob.glob(root+"/**/*.pdf",recursive=True):
    tf=topfolder(path)
    spec=specmap.get(tf)
    if spec is None:
        # child care unicode folder
        spec="Pediatrics / Child Care" if "Child Care" in tf else tf
    name=os.path.basename(path)
    try:
        doc=fitz.open(path); txt=" ".join(p.get_text() for p in doc)
        clean=re.sub(r"\s+"," ",txt).strip(); pages=doc.page_count; doc.close()
        out[path]={"spec":spec,"file":name,"pages":pages,"chars":len(clean),"text":clean[:4000]}
        inv.setdefault(spec,[]).append((name,len(clean)))
        if len(clean)<200: issues.append({"file":path,"spec":spec,"reason":f"low text {len(clean)} chars (scanned?)","pages":pages})
    except Exception as e:
        issues.append({"file":path,"spec":spec,"reason":str(e)})
json.dump(out,open("new_text.json","w",encoding="utf-8"),ensure_ascii=False)
json.dump(issues,open("new_issues.json","w",encoding="utf-8"),ensure_ascii=False,indent=1)
print("extracted:",len(out),"pdfs across",len(inv),"specialties")
for s,files in inv.items(): print(f"  {s}: {len(files)} readable")
print("issues:",len(issues))
for i in issues[:30]: print("  ISSUE:",os.path.basename(i['file']),"-",i['reason'])
