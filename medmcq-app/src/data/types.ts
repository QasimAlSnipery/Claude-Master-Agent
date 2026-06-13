export type Specialty =
  | 'Medicine'
  | 'Surgery'
  | 'Pediatrics / Child Care'
  | 'Gynecology'
  | 'Primary Care'
  | 'Psychiatry & Neurology'
  | 'Special Surgeries'

export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export type QuestionType =
  | 'Diagnosis'
  | 'Investigation'
  | 'Management'
  | 'Complication'
  | 'Emergency'
  | 'Pathophysiology in clinical context'
  | 'Anatomy in clinical context'
  | 'Pharmacology'
  | 'Prevention'
  | 'Screening'
  | 'Prognosis'
  | 'Ethics'
  | 'Other'

export type Confidence = 'I guessed' | 'I was unsure' | 'I knew it'

/** Unified question shape used across the whole app (legacy + rich-schema banks normalize to this). */
export interface MCQ {
  id: string
  specialty: Specialty
  subspecialty?: string
  /** Surgery organ-system key (legacy taxonomy), optional. */
  system?: string
  /** Organ / body region this question concerns (e.g. "Thyroid", "Heart & Circulation"). */
  organ?: string
  sourceLecture: string
  sourceFile?: string
  sourcePage?: number
  sourceExcerpt?: string
  topic: string
  subtopic?: string
  difficulty: Difficulty
  questionType: QuestionType
  /** The clinical vignette + stem. */
  question: string
  options: string[]
  correctAnswerIndex: number
  explanation: string
  wrongAnswerExplanations: string[]
  clinicalPearl: string
  keyClue?: string
  commonExamTrap?: string
  missedConcept?: string
  isRedFlagQuestion: boolean
  redFlagReason?: string
  tags: string[]
}

/** Per-question user progress — kept separate from question content. */
export interface QuestionProgress {
  questionId: string
  attempts: number
  correctAttempts: number
  wrongAttempts: number
  lastAnsweredAt?: number
  lastCorrect?: boolean
  lastSelectedIndex?: number
  bookmarked: boolean
  confidence?: Confidence
  needsReview: boolean
  isInWrongReview: boolean
  isInRedFlagReview: boolean
  markedDifficult: boolean
  userNotes?: string
}

export interface SpecialtyMeta {
  key: Specialty
  blurb: string
  available: boolean
  icon: string
  accent: string
  /** note shown when not available (e.g. no lectures supplied) */
  comingSoonNote?: string
}

export interface SessionRecord {
  id: string
  startedAt: number
  finishedAt: number
  specialty: Specialty | 'Mixed'
  mode: 'study' | 'exam'
  total: number
  correct: number
  questionIds: string[]
}
