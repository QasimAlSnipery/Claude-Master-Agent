import type { MCQ, Specialty, SpecialtyMeta, Difficulty, QuestionType } from './types'
import { surgeryQuestions } from './surgeryQuestions'
import { generatedQuestions } from './generated'
import { rawBankQuestions } from './banks'
import { classifySystem, systemLabel } from './systems'

const RED_FLAG_RE =
  /torsion|isch[ae]mi|ruptur|tension pneumo|\bsepsis\b|septic|\bshock\b|h[ae]morrhage|perforat|compartment|cauda equina|airway|resuscitat|ectopic|strangulat|necroti[sz]ing|meningitis|\bstroke\b|\bMI\b|myocardial|suicid|eclampsia|tamponade|anaphyla|pulmonary embol|emergenc|raised ICP|dka|diabetic ketoacid/i

function guessType(q: string): QuestionType {
  const s = q.toLowerCase()
  if (/most likely diagnos|most likely (is|to be)|which (is the )?most likely|diagnosis/.test(s)) return 'Diagnosis'
  if (/best next step|most appropriate (next )?(step|management|treatment)|management|treat/.test(s)) return 'Management'
  if (/investigation|next test|most appropriate test|imaging|confirm the diagnosis/.test(s)) return 'Investigation'
  if (/complication/.test(s)) return 'Complication'
  if (/immediate|emergency|first priority|initial step in (an? )?unstable/.test(s)) return 'Emergency'
  if (/mechanism|pathophysiolog/.test(s)) return 'Pathophysiology in clinical context'
  if (/which nerve|which artery|which structure|anatom/.test(s)) return 'Anatomy in clinical context'
  if (/drug|medication|pharmac/.test(s)) return 'Pharmacology'
  return 'Other'
}

/** Normalize a legacy Surgery question (seed or generated) into the unified rich MCQ shape. */
function normalizeSurgery(q: Record<string, unknown>, idx: number): MCQ {
  const question = (q.question as string) ?? ''
  const sys = classifySystem({
    system: q.system as string | undefined,
    sourceLecture: (q.sourceLecture as string) ?? '',
    topic: (q.topic as string) ?? '',
  })
  const isRed = RED_FLAG_RE.test(`${question} ${q.topic ?? ''} ${q.explanation ?? ''}`)
  return {
    id: (q.id as string) ?? `surg-x-${idx}`,
    specialty: 'Surgery',
    subspecialty: systemLabel(sys),
    system: sys,
    sourceLecture: (q.sourceLecture as string) ?? 'Surgery lecture',
    sourceFile: (q.sourceLecture as string) ?? undefined,
    topic: (q.topic as string) ?? 'Surgery',
    difficulty: ((q.difficulty as Difficulty) ?? 'Medium'),
    questionType: guessType(question),
    question,
    options: (q.options as string[]) ?? [],
    correctAnswerIndex: (q.correctAnswerIndex as number) ?? 0,
    explanation: (q.explanation as string) ?? '',
    wrongAnswerExplanations: (q.wrongAnswerExplanations as string[]) ?? [],
    clinicalPearl: (q.clinicalPearl as string) ?? '',
    keyClue: (q.keyClue as string) ?? '',
    isRedFlagQuestion: isRed,
    redFlagReason: isRed ? 'Time-critical surgical emergency — recognise and act on the danger clue.' : '',
    tags: (q.tags as string[]) ?? [(q.topic as string) ?? 'surgery'],
  }
}

/** Normalize a rich-schema bank question. */
function normalizeBank(q: Record<string, unknown>, idx: number): MCQ {
  const specialty = q.specialty as Specialty
  return {
    id: (q.id as string) ?? `bank-${idx}`,
    specialty,
    subspecialty: (q.subspecialty as string) || undefined,
    sourceLecture: (q.sourceLecture as string) ?? 'Lecture',
    sourceFile: (q.sourceFile as string) ?? undefined,
    sourcePage: q.sourcePage as number | undefined,
    sourceExcerpt: (q.sourceExcerpt as string) ?? undefined,
    topic: (q.topic as string) ?? 'General',
    subtopic: (q.subtopic as string) || undefined,
    difficulty: ((q.difficulty as Difficulty) ?? 'Medium'),
    questionType: ((q.questionType as QuestionType) ?? 'Other'),
    question: (q.clinicalStem as string) ?? (q.question as string) ?? '',
    options: (q.options as string[]) ?? [],
    correctAnswerIndex: (q.correctAnswerIndex as number) ?? 0,
    explanation: (q.explanation as string) ?? '',
    wrongAnswerExplanations: (q.wrongAnswerExplanations as string[]) ?? [],
    clinicalPearl: (q.clinicalPearl as string) ?? '',
    keyClue: (q.keyClue as string) ?? '',
    commonExamTrap: (q.commonExamTrap as string) ?? '',
    missedConcept: (q.missedConcept as string) ?? '',
    isRedFlagQuestion: Boolean(q.isRedFlagQuestion),
    redFlagReason: (q.redFlagReason as string) ?? '',
    tags: (q.tags as string[]) ?? [],
  }
}

function stemKey(q: MCQ): string {
  return q.question.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().slice(0, 80)
}

function buildAllQuestions(): MCQ[] {
  const surgery = [...surgeryQuestions, ...generatedQuestions].map((q, i) =>
    normalizeSurgery(q as unknown as Record<string, unknown>, i),
  )
  const bank = rawBankQuestions.map((q, i) => normalizeBank(q, i))
  const merged = [...surgery, ...bank]
  const seen = new Set<string>()
  const out: MCQ[] = []
  for (const q of merged) {
    if (!q.question || q.options.length < 2) continue
    const key = `${q.specialty}|${stemKey(q)}`
    if (seen.has(key)) continue
    seen.add(key)
    out.push(q)
  }
  return out
}

export const allQuestions: MCQ[] = buildAllQuestions()

export const questionById: Map<string, MCQ> = new Map(allQuestions.map((q) => [q.id, q]))

export function questionsForSpecialty(s: Specialty): MCQ[] {
  return allQuestions.filter((q) => q.specialty === s)
}

export function specialtyCount(s: Specialty): number {
  return allQuestions.filter((q) => q.specialty === s).length
}

/** Distinct topics (and counts) for a specialty, sorted by count desc. */
export function topicsForSpecialty(s: Specialty): { topic: string; count: number }[] {
  const m = new Map<string, number>()
  for (const q of allQuestions) if (q.specialty === s) m.set(q.topic, (m.get(q.topic) ?? 0) + 1)
  return [...m.entries()].map(([topic, count]) => ({ topic, count })).sort((a, b) => b.count - a.count)
}

export function subspecialtiesForSpecialty(s: Specialty): string[] {
  const set = new Set<string>()
  for (const q of allQuestions) if (q.specialty === s && q.subspecialty) set.add(q.subspecialty)
  return [...set].sort()
}

export const specialties: SpecialtyMeta[] = [
  {
    key: 'Medicine',
    blurb: 'Cardiology, respiratory, GI, endocrine, nephrology, emergencies.',
    available: specialtyCount('Medicine') > 0,
    accent: 'from-sky-500/20 to-blue-500/10 ring-sky-400/40',
    icon: 'M3 12h4l2-5 4 10 2-5h6',
    comingSoonNote: 'No Medicine lectures supplied yet — send the batch to activate.',
  },
  {
    key: 'Surgery',
    blurb: 'Acute abdomen, trauma, vascular, breast, endocrine, orthopaedics & more.',
    available: specialtyCount('Surgery') > 0,
    accent: 'from-teal-500/20 to-emerald-500/10 ring-teal-400/40',
    icon: 'M14.5 3.5 21 10l-9 9-3.5-3.5L14.5 3.5ZM3 21l5-5',
  },
  {
    key: 'Pediatrics / Child Care',
    blurb: 'Neonatology, growth, infections, respiratory, GI and paediatric emergencies.',
    available: specialtyCount('Pediatrics / Child Care') > 0,
    accent: 'from-amber-500/20 to-orange-500/10 ring-amber-400/40',
    icon: 'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 11v10M8 21h8',
  },
  {
    key: 'Gynecology',
    blurb: 'Obstetrics & gynaecology — bleeding, pelvic pain, pregnancy, oncology, emergencies.',
    available: specialtyCount('Gynecology') > 0,
    accent: 'from-pink-500/20 to-rose-500/10 ring-pink-400/40',
    icon: 'M12 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM12 14v8M9 19h6',
  },
  {
    key: 'Primary Care',
    blurb: 'Outpatient reasoning, prevention, screening, chronic disease, referral red flags.',
    available: specialtyCount('Primary Care') > 0,
    accent: 'from-violet-500/20 to-purple-500/10 ring-violet-400/40',
    icon: 'M6 3v6a4 4 0 0 0 8 0V3M10 13v3a5 5 0 0 0 10 0v-3M20 10a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z',
    comingSoonNote: 'No Primary Care lectures supplied yet — send the batch to activate.',
  },
  {
    key: 'Psychiatry & Neurology',
    blurb: 'Mood, psychosis, anxiety, risk; stroke, seizures, headache, neuro emergencies.',
    available: specialtyCount('Psychiatry & Neurology') > 0,
    accent: 'from-indigo-500/20 to-violet-500/10 ring-indigo-400/40',
    icon: 'M9 3a3 3 0 0 0-3 3 3 3 0 0 0-1 5.8V15a3 3 0 0 0 3 3h.5M15 3a3 3 0 0 1 3 3 3 3 0 0 1 1 5.8V15a3 3 0 0 1-3 3h-.5M9 3v15M15 3v15',
  },
  {
    key: 'Special Surgeries',
    blurb: 'Orthopaedics, urology, ENT, ophthalmology, neurosurgery, plastics & paediatric surgery.',
    available: specialtyCount('Special Surgeries') > 0,
    accent: 'from-cyan-500/20 to-teal-500/10 ring-cyan-400/40',
    icon: 'M12 3 4 7v5c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V7l-8-4Z',
  },
]
