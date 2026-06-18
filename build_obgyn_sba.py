import re, json
t=open('self_full.txt',encoding='utf-8').read()
pgs=dict(re.findall(r'<<<PDFPAGE (\d+)>>>\n(.*?)(?=<<<PDFPAGE|\Z)',t,re.S))
def txt(rng): return "\n".join(pgs.get(str(n),'') for n in rng)

# ---- EMQ: parse themes, explode each scenario into a single-best question ----
def emq_answers(rng):
    s=txt(rng); themes={}
    for m in re.finditer(r'(?m)^(\d{1,2})\s+([A-Za-z][A-Za-z /:,\'()\-]+?)\n\s*((?:\d+\s+[A-Z]\b\s*)+)',s):
        mp={int(pm.group(1)):pm.group(2) for pm in re.finditer(r'(\d+)\s+([A-Z])\b',m.group(3))}
        themes[int(m.group(1))]={'title':m.group(2).strip(),'map':mp}
    return themes
def emq_themes(qrng,arng):
    ans=emq_answers(arng)
    lines=[l.rstrip() for l in txt(qrng).split("\n")]
    idx={}
    for n,info in ans.items():
        tf=info['title'].split()[0].lower()
        for i,l in enumerate(lines):
            m=re.match(rf'^{n}\s+(.*)$',l.strip())
            if m and m.group(1).lower().startswith(tf[:5]): idx[n]=i; break
    order=sorted(idx,key=lambda n:idx[n]); out=[]
    for pos,n in enumerate(order):
        a=idx[n]; b=idx[order[pos+1]] if pos+1<len(order) else len(lines)
        block=[]
        for l in lines[a+1:b]:
            x=l.strip()
            if not x or re.search(r'Book Interior Layout',x) or re.match(r'^\d{1,3}\s+(Obstetrics|Gynaecology)\s*$',x) or re.match(r'^(Obstetrics|Gynaecology)\s*$',x) or re.match(r'^\d{1,3}$',x): continue
            block.append(x)
        cut=len(block)
        for i,l in enumerate(block):
            if re.search(r'for each',l,re.I): cut=i; break
        optregion=' '.join(block[:cut]); scenregion="\n".join(block[cut+1:])
        # order-independent: valid labels = contiguous A,B,C... present as lone capitals
        toks=optregion.split()
        caps=set(t for t in toks if len(t)==1 and t.isupper())
        labelset=set(); k=0
        while chr(ord('A')+k) in caps: labelset.add(chr(ord('A')+k)); k+=1
        opts={}; cur=None
        for tk in toks:
            if len(tk)==1 and tk.isupper() and tk in labelset and tk not in opts:
                opts[tk]=''; cur=tk
            elif cur is not None:
                opts[cur]=(opts[cur]+' '+tk).strip()
        opts={lab:re.sub(r'^([A-Z]) (?=[a-z])',r'\1',v.strip(' .')) for lab,v in opts.items() if v.strip()}
        sc={int(sm.group(1)):re.sub(r'\s+',' ',sm.group(2)).strip() for sm in re.finditer(r'(?m)^(\d+)\s+(.*?)(?=\n\d+\s|\Z)',scenregion,re.S)}
        out.append((ans[n]['title'],opts,sc,ans[n]['map']))
    return out
def emq_questions(qrng,arng):
    res=[]
    for title,opts,sc,mp in emq_themes(qrng,arng):
        if not opts: continue
        for k in sorted(sc):
            if k in mp and mp[k] in opts:
                res.append({"stem":f"[{title}] {sc[k]}","options":dict(opts),"answer":mp[k],"reason":""})
    return res

# ---- SBA parser ----
heads=sorted(set(["Obstetric history taking and examination","Modern maternity care","Physiological changes in pregnancy","Normal fetal development and growth","Antenatal care","Antenatal imaging and assessment of fetal well-being","Prenatal diagnosis","Antenatal obstetric complications","Twins and higher multiple gestations","Twins and higher multiple pregnancies","Late miscarriage and early birth","Medical diseases complicating pregnancy","Perinatal infections","Labour","Operative intervention in obstetrics","Obstetric emergencies","Psychiatric disorders and the puerperium","Neonatology","Ethical and medicolegal issues in obstetric practice","Disorders of the menstrual cycle","Genital infections in gynaecology","Fertility control, contraception and abortion","Subfertility","Problems in early pregnancy","Benign diseases of the uterus and cervix","Endometriosis and adenomyosis","Diseases of the ovary","Malignant disease of the uterus","Pre-malignant and malignant disease of the cervix","Urogynaecology","Pelvic organ prolapse","Common gynaecological procedures"]),key=len,reverse=True)
def clean(s):
    s=s.strip()
    for h in heads: s=re.sub(r'\s+'+re.escape(h)+r'\s*$','',s,flags=re.I)
    return re.sub(r'\s{2,}',' ',s).strip()
def parse(s):
    keep=[]
    for l in s.split("\n"):
        x=l.strip()
        if not x or re.match(r'^Book Interior Layout',x) or re.match(r'^(Multiple choice questions|Single best answer questions|QUESTIONS|CHAPTER|MULTIPLE|SINgLE|Questions \.)',x) or re.match(r'^\d{1,3}\s+(Obstetrics|Gynaecology)$',x) or re.match(r'^(Obstetrics|Gynaecology)\s*$',x): continue
        keep.append(x)
    qs={};cur=None;opt=None
    for x in keep:
        mo=re.match(r'^([a-e])\)\s*(.*)$',x); mq=re.match(r'^(\d{1,3})\s+(.*)$',x)
        if mo and cur is not None: opt=mo.group(1).upper(); qs[cur]['options'][opt]=mo.group(2).strip(); continue
        if mq and (opt=='E' or cur is None or len(qs.get(cur,{}).get('options',{}))>=4) and not x[0].islower():
            cur=int(mq.group(1)); qs[cur]={'stem':mq.group(2).strip(),'options':{}}; opt=None; continue
        if cur is not None:
            if opt: qs[cur]['options'][opt]+=' '+x
            else: qs[cur]['stem']+=' '+x
    for k in qs:
        qs[k]['stem']=clean(qs[k]['stem'])
        for L in qs[k]['options']: qs[k]['options'][L]=clean(qs[k]['options'][L])
    return {k:v for k,v in qs.items() if len(v['options'])==5}
obs_ans={1:'C',2:'A',3:'C',4:'E',5:'D',6:'D',7:'B',8:'D',9:'C',10:'E',11:'C',12:'B',13:'B',14:'D',15:'D',16:'C',17:'B',18:'D',19:'B',20:'B',21:'B',22:'E',23:'C',24:'A',25:'D',26:'B',27:'C',28:'D',29:'C',30:'E'}
gyn_ans={1:'E',2:'C',3:'D',4:'E',5:'B',6:'C',7:'A',8:'E',9:'B',10:'C',11:'E',12:'A',13:'D'}
obs_r={1:"Pregnancy averages 280 days (40 weeks) from the LMP.",2:"G3P3: third pregnancy; twins (2) plus a 27-week stillbirth (1) = 3 births beyond 24 weeks.",3:"Raised cardiac output gives flow murmurs in most women by end of first trimester.",4:"Renal agenesis means no fetal urine, hence oligo/anhydramnios.",5:"Premature thin skin impairs thermoregulation.",6:"Advise to attend hospital if fetal movements decrease; routine kick charts are not evidence-based.",7:"Placenta praevia is assessed at the 20-week scan, not the dating scan.",8:"Increased nuchal translucency is associated with cardiac defects and aneuploidy.",9:"An acceleration of 15 bpm for 15 seconds indicates a reactive, normal CTG.",10:"Informed consent must be documented before any genetic test.",11:"Maternal heroin use causes neonatal abstinence/withdrawal syndrome.",12:"The Kleihauer test quantifies fetomaternal haemorrhage to guide anti-D dosing.",13:"Gestational diabetes is not proven increased in multiple pregnancy (the others are).",14:"Cervical cerclage is best placed at 12-14 weeks.",15:"A birth pool is least appropriate; cardiac patients need monitoring.",16:"About 90 percent of hyperthyroidism in pregnancy is Graves disease.",17:"Gestational diabetes does not cause hypermagnesaemia.",18:"Steroid replacement is increased, not reduced, for labour.",19:"Thalassaemias reduce globin production; sickle cell is the amino-acid substitution.",20:"Hepatitis B has the highest vertical transmission (about 20-30 percent).",21:"Give varicella-zoster immunoglobulin ASAP to a non-immune exposed woman.",22:"Hypovolaemia is the greatest contraindication to epidural.",23:"Mediolateral episiotomy reduces anal sphincter damage.",24:"Gestation under 35 weeks is not required; ventouse needs full dilatation, ruptured membranes, analgesia, empty bladder.",25:"Amniotic fluid embolism is less common after Caesarean than vaginal delivery.",26:"Placenta praevia contributes least to the Caesarean rate.",27:"Tamponade is not one of the 4 T's (Tone, Trauma, Tissue, Thrombin).",28:"Panic attacks are not a feature of normal pregnancy.",29:"The Apgar score has no eye-opening component.",30:"The Abortion Act does not consider the partner's interests."}
gyn_r={1:"Mirena (LNG-IUS) is first-line; COCP contraindicated (smoker, BMI 40).",2:"Curdy white discharge with vulval itch indicates candida.",3:"Progesterone-only pill: COCP contraindicated, IUS will not fit fibroids.",4:"Anti-Mullerian hormone (AMH) is the best marker of ovarian reserve.",5:"Laparoscopic salpingostomy preserves fertility after previous salpingectomy.",6:"Cyclical mid-cycle pain resolving in 24 hours is Mittelschmerz.",7:"Minimal endometriosis with subfertility: laparoscopic ablation/excision.",8:"Complex cyst with calcification and fat is a dermoid cyst.",9:"Stage 1a endometrial cancer: TAH/BSO at a local centre.",10:"Moderate dyskaryosis requires colposcopy.",11:"TVT is gold-standard for urodynamic stress incontinence.",12:"Frail woman with procidentia: shelf pessary first-line.",13:"Laparoscopy best investigates pelvic pain."}
def sba_questions(qrng,ans,rd):
    qd=parse(txt(qrng))
    return [{"stem":qd[k]['stem'],"options":qd[k]['options'],"answer":ans[k],"reason":rd.get(k,"")} for k in sorted(ans) if k in qd]

def chapter(num,title,items):
    out=[]
    for i,q in enumerate(items,1):
        q=dict(q); q["qnum"]=str(i); out.append(q)
    return {"num":num,"title":title,"questions":out}

obs = sba_questions(range(57,63),obs_ans,obs_r) + emq_questions(range(9,24),range(24,35))
gyn = sba_questions(range(121,125),gyn_ans,gyn_r) + emq_questions(range(96,103),range(103,108))
data=[chapter(1,"Obstetrics - Single Best Answer",obs),
      chapter(2,"Gynaecology - Single Best Answer",gyn)]
json.dump(data,open('obgyn_all.json','w',encoding='utf-8'),ensure_ascii=False)
for c in data: print(c['title'],len(c['questions']))
print("TOTAL",sum(len(c['questions']) for c in data))
