export interface SystemMeta {
  key: string
  label: string
  blurb: string
  icon: string // SVG path data
  accent: string // tailwind gradient + ring classes
}

/** Organ-system taxonomy for the Surgery bank. */
export const surgerySystems: SystemMeta[] = [
  {
    key: 'git',
    label: 'Gastrointestinal',
    blurb: 'Acute abdomen, oesophagus, stomach, bowel, hernia, anorectal & IBD.',
    icon: 'M7 3v6a5 5 0 0 0 10 0M12 14c-3 0-5 2-5 4M12 14c0 3 2 5 5 5',
    accent: 'from-teal-500/20 to-emerald-500/10 ring-teal-400/40',
  },
  {
    key: 'hpb',
    label: 'Hepatobiliary, Pancreas & Spleen',
    blurb: 'Liver, gallbladder & biliary tree, pancreas and spleen.',
    icon: 'M5 8c4-4 10-4 14 0 1 4-2 9-7 9S4 12 5 8Z',
    accent: 'from-amber-500/20 to-orange-500/10 ring-amber-400/40',
  },
  {
    key: 'breast-endo',
    label: 'Breast & Endocrine',
    blurb: 'Benign & malignant breast disease, thyroid, parathyroid, salivary.',
    icon: 'M12 3a4 4 0 0 0-4 4c0 3-3 4-3 7a7 7 0 0 0 14 0c0-3-3-4-3-7a4 4 0 0 0-4-4Z',
    accent: 'from-pink-500/20 to-rose-500/10 ring-pink-400/40',
  },
  {
    key: 'vascular',
    label: 'Vascular & Lymphatic',
    blurb: 'Arterial ischaemia, aneurysms, venous disease and lymphoedema.',
    icon: 'M6 3v4a6 6 0 0 0 12 0V3M12 13v8M9 18h6',
    accent: 'from-rose-500/20 to-red-500/10 ring-rose-400/40',
  },
  {
    key: 'trauma',
    label: 'Trauma & Critical Care',
    blurb: 'ATLS, shock, thoracic trauma, sepsis, fluids and nutrition.',
    icon: 'M12 3v18M3 12h18',
    accent: 'from-red-500/20 to-orange-500/10 ring-red-400/40',
  },
  {
    key: 'ortho',
    label: 'Orthopaedics & MSK',
    blurb: 'Fractures, joints, spine, bone tumours, infection and paediatric ortho.',
    icon: 'M8 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 4 8 8m0-12a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm-8 12a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm8 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z',
    accent: 'from-sky-500/20 to-blue-500/10 ring-sky-400/40',
  },
  {
    key: 'cardiothoracic',
    label: 'Cardiothoracic',
    blurb: 'Pleura, lung tumours, valvular & congenital heart, mediastinum.',
    icon: 'M3 12h4l2-5 4 10 2-5h6',
    accent: 'from-indigo-500/20 to-violet-500/10 ring-indigo-400/40',
  },
  {
    key: 'periop',
    label: 'Perioperative & Anaesthesia',
    blurb: 'Preop assessment, ASA, general & regional anaesthesia, premedication.',
    icon: 'M9 3h6v4l-2 2v3l4 8H7l4-8V9L9 7Z',
    accent: 'from-violet-500/20 to-purple-500/10 ring-violet-400/40',
  },
  {
    key: 'principles',
    label: 'Surgical Principles & Oncology',
    blurb: 'Surgical oncology, lumps, transplantation and bariatric surgery.',
    icon: 'M12 3 4 7v5c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V7l-8-4Z',
    accent: 'from-slate-400/20 to-slate-500/10 ring-slate-300/40',
  },
]

const FALLBACK_SYSTEM = 'principles'

/** Keyword → system rules, applied to `sourceLecture` (and topic) to classify legacy questions. */
const RULES: { sys: string; kw: RegExp }[] = [
  { sys: 'git', kw: /acute abdom|appendic|periton|mesent|esophag|oesophag|stomach|duoden|peptic|small.*intestine|large.*intestine|intestin|bowel|obstruction|colon|rectum|rectal|anus|anal|haemorrhoid|hernia|ibd|inflammatory bowel|diverticul|colorect/i },
  { sys: 'hpb', kw: /gall ?bladder|gal bladder|bile|biliary|cholecyst|cholangi|liver|hepat|pancrea|spleen|splenic/i },
  { sys: 'breast-endo', kw: /breast|thyroid|parathyroid|salivary|endocrine|goitre|goiter/i },
  { sys: 'vascular', kw: /ischemi|ischaemi|aneurysm|aortic|varicose|venous|vein|dvt|lymphedema|lymphoedema|vascular|limb isch/i },
  { sys: 'trauma', kw: /atls|trauma|shock|thoracic|burn|sepsis|critically ill|critical care|nutrition|fluid|resuscit/i },
  { sys: 'ortho', kw: /fracture|skeletal|hip|femur|pelvi|knee|ankle|tibia|supracondylar|shoulder|upper extremity|spine|spinal|bone tumour|bone tumor|msk|osteo|septic arthritis|pediatric ortho|paediatric ortho|foot deformit|amputation|intertrochanteric|nerve injur|orthopedic|orthopaedic|joint/i },
  { sys: 'cardiothoracic', kw: /pleura|lung|bronch|valvular|congenital heart|mediastin|chest wall|cardiac|cardiothoracic|ihd|heart disease/i },
  { sys: 'periop', kw: /preoperative|pre-operative|preop|anaesth|anesth|premedication|asa|regional anesth|general anesth/i },
  { sys: 'principles', kw: /oncolog|lumps|transplant|morbid obesity|bariatric|audit|ethics|surgical principle|surgical site|wound healing/i },
]

/** Returns a normalized system key for a question, deriving from sourceLecture/topic when needed. */
export function classifySystem(q: { system?: string; sourceLecture: string; topic: string }): string {
  if (q.system && surgerySystems.some((s) => s.key === q.system)) return q.system
  const hay = `${q.sourceLecture} ${q.topic}`
  for (const r of RULES) if (r.kw.test(hay)) return r.sys
  return FALLBACK_SYSTEM
}

export function systemLabel(key: string): string {
  return surgerySystems.find((s) => s.key === key)?.label ?? 'Other'
}
