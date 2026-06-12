import type { SpecialtyMeta, MCQ, Specialty } from './types'
import { surgeryQuestions } from './surgeryQuestions'
import { generatedQuestions } from './generated'
import { classifySystem, surgerySystems } from './systems'

/** Normalize a question stem for duplicate detection. */
function stemKey(q: MCQ): string {
  return q.question.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().slice(0, 80)
}

/** Merge legacy + generated, assign system, drop duplicate stems. */
function buildSurgeryBank(): MCQ[] {
  const merged = [...surgeryQuestions, ...generatedQuestions]
  const seen = new Set<string>()
  const out: MCQ[] = []
  for (const q of merged) {
    const key = stemKey(q)
    if (seen.has(key)) continue
    seen.add(key)
    out.push({ ...q, system: classifySystem(q) })
  }
  return out
}

export const surgeryBank: MCQ[] = buildSurgeryBank()

/** Registry of question banks per specialty. Add new arrays here as banks are built. */
export const questionBanks: Partial<Record<Specialty, MCQ[]>> = {
  Surgery: surgeryBank,
}

/** Count of questions available per system, in display order, excluding empty systems. */
export function surgerySystemCounts(): { key: string; label: string; blurb: string; icon: string; accent: string; count: number }[] {
  return surgerySystems
    .map((s) => ({
      ...s,
      count: surgeryBank.filter((q) => q.system === s.key).length,
    }))
    .filter((s) => s.count > 0)
}

export function questionsForSystem(systemKey: string): MCQ[] {
  return surgeryBank.filter((q) => q.system === systemKey)
}

export const specialties: SpecialtyMeta[] = [
  {
    key: 'Surgery',
    blurb: 'Acute abdomen, trauma, vascular, breast, endocrine, orthopaedics & more.',
    available: true,
    accent: 'from-teal-500/20 to-emerald-500/10 ring-teal-400/40',
    icon: 'M14.5 3.5 21 10l-9 9-3.5-3.5L14.5 3.5ZM3 21l5-5',
  },
  {
    key: 'Medicine',
    blurb: 'Cardiology, respiratory, endocrine, GI and more. Coming soon.',
    available: false,
    accent: 'from-sky-500/15 to-blue-500/10 ring-sky-400/30',
    icon: 'M3 12h4l2-5 4 10 2-5h6',
  },
  {
    key: 'Pediatrics',
    blurb: 'Neonatology, growth, infections and childhood disease. Coming soon.',
    available: false,
    accent: 'from-amber-500/15 to-orange-500/10 ring-amber-400/30',
    icon: 'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 11v10M8 21h8',
  },
  {
    key: 'Gynecology',
    blurb: 'Obstetrics, reproductive health and gynae-oncology. Coming soon.',
    available: false,
    accent: 'from-pink-500/15 to-rose-500/10 ring-pink-400/30',
    icon: 'M12 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM12 14v8M9 19h6',
  },
  {
    key: 'Primary Care',
    blurb: 'Common presentations, prevention and chronic disease. Coming soon.',
    available: false,
    accent: 'from-violet-500/15 to-purple-500/10 ring-violet-400/30',
    icon: 'M6 3v6a4 4 0 0 0 8 0V3M10 13v3a5 5 0 0 0 10 0v-3M20 10a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z',
  },
]
