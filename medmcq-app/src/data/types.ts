export type Specialty =
  | 'Surgery'
  | 'Medicine'
  | 'Pediatrics'
  | 'Gynecology'
  | 'Primary Care'

export interface MCQ {
  id: string
  specialty: Specialty
  sourceLecture: string
  topic: string
  question: string
  options: string[]
  correctAnswerIndex: number
  explanation: string
  /** One entry per option, aligned by index, explaining why it is right/wrong. */
  wrongAnswerExplanations: string[]
  clinicalPearl: string
}

export interface SpecialtyMeta {
  key: Specialty
  blurb: string
  available: boolean
  /** Inline SVG path data for the card icon. */
  icon: string
  accent: string // tailwind gradient classes
}
