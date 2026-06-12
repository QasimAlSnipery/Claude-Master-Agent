import type { SpecialtyMeta, MCQ } from './types'
import { surgeryQuestions } from './surgeryQuestions'

/** Registry of question banks per specialty. Add new arrays here as banks are built. */
export const questionBanks: Partial<Record<SpecialtyMeta['key'], MCQ[]>> = {
  Surgery: surgeryQuestions,
}

export const specialties: SpecialtyMeta[] = [
  {
    key: 'Surgery',
    blurb: 'Acute abdomen, trauma, vascular, breast, endocrine, orthopaedics & more.',
    available: true,
    accent: 'from-teal-500/20 to-emerald-500/10 ring-teal-400/40',
    // scalpel
    icon: 'M14.5 3.5 21 10l-9 9-3.5-3.5L14.5 3.5ZM3 21l5-5',
  },
  {
    key: 'Medicine',
    blurb: 'Cardiology, respiratory, endocrine, GI and more. Coming soon.',
    available: false,
    accent: 'from-sky-500/15 to-blue-500/10 ring-sky-400/30',
    // heart-pulse
    icon: 'M3 12h4l2-5 4 10 2-5h6',
  },
  {
    key: 'Pediatrics',
    blurb: 'Neonatology, growth, infections and childhood disease. Coming soon.',
    available: false,
    accent: 'from-amber-500/15 to-orange-500/10 ring-amber-400/30',
    // baby/rattle
    icon: 'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 11v10M8 21h8',
  },
  {
    key: 'Gynecology',
    blurb: 'Obstetrics, reproductive health and gynae-oncology. Coming soon.',
    available: false,
    accent: 'from-pink-500/15 to-rose-500/10 ring-pink-400/30',
    // venus
    icon: 'M12 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM12 14v8M9 19h6',
  },
  {
    key: 'Primary Care',
    blurb: 'Common presentations, prevention and chronic disease. Coming soon.',
    available: false,
    accent: 'from-violet-500/15 to-purple-500/10 ring-violet-400/30',
    // stethoscope
    icon: 'M6 3v6a4 4 0 0 0 8 0V3M10 13v3a5 5 0 0 0 10 0v-3M20 10a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z',
  },
]
