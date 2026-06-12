import fitz, os, json, glob, re
root = "surgery_pdfs"
out = {}
issues = []
for path in glob.glob(root+"/**/*.pdf", recursive=True):
    name = os.path.basename(path)
    try:
        doc = fitz.open(path)
        txt = []
        for p in doc:
            txt.append(p.get_text())
        full = "\n".join(txt)
        clean = re.sub(r'\s+', ' ', full).strip()
        out[path] = {"file": name, "pages": doc.page_count, "chars": len(clean), "text": clean[:6000]}
        if len(clean) < 200:
            issues.append({"file": path, "reason": f"low text ({len(clean)} chars) - likely scanned/image-only", "pages": doc.page_count})
        doc.close()
    except Exception as e:
        issues.append({"file": path, "reason": str(e)})
json.dump(out, open("pdf_text.json","w",encoding="utf-8"), ensure_ascii=False)
json.dump(issues, open("pdf_issues.json","w",encoding="utf-8"), ensure_ascii=False, indent=2)
print("extracted:", len(out), "pdfs")
print("issues:", len(issues))
for i in issues: print("  ISSUE:", i["file"], "-", i["reason"])
