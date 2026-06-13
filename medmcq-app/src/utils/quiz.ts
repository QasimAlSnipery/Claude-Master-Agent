import type { MCQ, Specialty, Difficulty, QuestionType } from '../data/types'
import { allQuestions } from '../data/specialties'
import { idsForReview } from '../state/store'
import type { QuestionProgress } from '../data/types'

interface StoreState {
  progress: Record<string, QuestionProgress>
  sessions: unknown[]
}

export type QuizStatus =
  | 'all'
  | 'new'
  | 'wrong'
  | 'bookmarked'
  | 'needsReview'
  | 'redFlag'
  | 'recent'
  | 'difficult'

export interface QuizFilters {
  specialty: Specialty | 'Mixed'
  organs: string[]
  topics: string[]
  subspecialties: string[]
  difficulties: Difficulty[]
  questionTypes: QuestionType[]
  status: QuizStatus
  count: number
  randomize: boolean
  mode: 'study' | 'exam'
  timed: boolean
  timeLimitMin: number
}

export function defaultFilters(specialty: Specialty | 'Mixed'): QuizFilters {
  return {
    specialty,
    organs: [],
    topics: [],
    subspecialties: [],
    difficulties: [],
    questionTypes: [],
    status: 'all',
    count: 20,
    randomize: true,
    mode: 'study',
    timed: false,
    timeLimitMin: 20,
  }
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Apply every filter EXCEPT count/randomize → the matching pool. */
export function matchingPool(f: QuizFilters, s: StoreState): MCQ[] {
  let pool = allQuestions

  if (f.specialty !== 'Mixed') pool = pool.filter((q) => q.specialty === f.specialty)
  if (f.organs.length) pool = pool.filter((q) => q.organ && f.organs.includes(q.organ))
  if (f.topics.length) pool = pool.filter((q) => f.topics.includes(q.topic))
  if (f.subspecialties.length)
    pool = pool.filter((q) => q.subspecialty && f.subspecialties.includes(q.subspecialty))
  if (f.difficulties.length) pool = pool.filter((q) => f.difficulties.includes(q.difficulty))
  if (f.questionTypes.length) pool = pool.filter((q) => f.questionTypes.includes(q.questionType))

  // status
  if (f.status !== 'all') {
    if (f.status === 'new') {
      pool = pool.filter((q) => !(s.progress[q.id]?.attempts))
    } else if (f.status === 'recent') {
      const recent = new Set(
        Object.values(s.progress)
          .filter((p) => p.lastAnsweredAt)
          .sort((a, b) => (b.lastAnsweredAt ?? 0) - (a.lastAnsweredAt ?? 0))
          .slice(0, 100)
          .map((p) => p.questionId),
      )
      pool = pool.filter((q) => recent.has(q.id))
    } else {
      const kindMap = {
        wrong: 'wrong',
        bookmarked: 'bookmarked',
        needsReview: 'needsReview',
        redFlag: 'redFlag',
        difficult: 'difficult',
      } as const
      const ids = new Set(idsForReview(s as never, kindMap[f.status]))
      pool = pool.filter((q) => ids.has(q.id))
    }
  }
  return pool
}

export function buildQuiz(f: QuizFilters, s: StoreState): MCQ[] {
  const pool = matchingPool(f, s)
  const ordered = f.randomize ? shuffle(pool) : pool
  return ordered.slice(0, Math.min(f.count, ordered.length))
}
