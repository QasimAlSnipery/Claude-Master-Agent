import type { MCQ, Specialty } from '../data/types'
import { allQuestions, questionById, questionsForSpecialty } from '../data/specialties'
import { idsForReview } from '../state/store'
import type { QuestionProgress } from '../data/types'

interface StoreState {
  progress: Record<string, QuestionProgress>
  sessions: unknown[]
}

export interface AnswerLog {
  questionId: string
  selectedIndex: number | null
  correct: boolean
  timeMs: number
}

function startOfToday(): number {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

export interface DashboardStats {
  totalAnswered: number
  totalQuestions: number
  overallAccuracy: number
  bookmarked: number
  wrong: number
  needsReview: number
  redFlag: number
  difficult: number
  answeredToday: number
  correctToday: number
}

export function dashboardStats(s: StoreState): DashboardStats {
  const entries = Object.values(s.progress)
  let attempts = 0
  let correct = 0
  let answeredToday = 0
  let correctToday = 0
  const today = startOfToday()
  let totalAnswered = 0
  for (const p of entries) {
    attempts += p.attempts
    correct += p.correctAttempts
    if (p.attempts > 0) totalAnswered++
    if (p.lastAnsweredAt && p.lastAnsweredAt >= today) {
      answeredToday++
      if (p.lastCorrect) correctToday++
    }
  }
  return {
    totalAnswered,
    totalQuestions: allQuestions.length,
    overallAccuracy: attempts ? Math.round((correct / attempts) * 100) : 0,
    bookmarked: idsForReview(s as never, 'bookmarked').length,
    wrong: idsForReview(s as never, 'wrong').length,
    needsReview: idsForReview(s as never, 'needsReview').length,
    redFlag: idsForReview(s as never, 'redFlag').length,
    difficult: idsForReview(s as never, 'difficult').length,
    answeredToday,
    correctToday,
  }
}

export interface SpecialtyStats {
  total: number
  answered: number
  completion: number
  accuracy: number
  weakestTopic?: string
}

export function specialtyStats(s: StoreState, specialty: Specialty): SpecialtyStats {
  const qs = questionsForSpecialty(specialty)
  const total = qs.length
  let answered = 0
  let attempts = 0
  let correct = 0
  const topicAgg = new Map<string, { a: number; c: number }>()
  for (const q of qs) {
    const p = s.progress[q.id]
    if (!p || p.attempts === 0) continue
    answered++
    attempts += p.attempts
    correct += p.correctAttempts
    const t = topicAgg.get(q.topic) ?? { a: 0, c: 0 }
    t.a += p.attempts
    t.c += p.correctAttempts
    topicAgg.set(q.topic, t)
  }
  let weakestTopic: string | undefined
  let worst = 1.1
  for (const [topic, agg] of topicAgg) {
    if (agg.a < 2) continue
    const acc = agg.c / agg.a
    if (acc < worst) {
      worst = acc
      weakestTopic = topic
    }
  }
  return {
    total,
    answered,
    completion: total ? Math.round((answered / total) * 100) : 0,
    accuracy: attempts ? Math.round((correct / attempts) * 100) : 0,
    weakestTopic,
  }
}

export interface Breakdown {
  label: string
  correct: number
  total: number
  pct: number
}

function bd(map: Map<string, { c: number; t: number }>): Breakdown[] {
  return [...map.entries()]
    .map(([label, v]) => ({ label, correct: v.c, total: v.t, pct: v.t ? Math.round((v.c / v.t) * 100) : 0 }))
    .sort((a, b) => a.pct - b.pct)
}

export interface QuizReport {
  total: number
  answered: number
  correct: number
  wrong: number
  unanswered: number
  scorePct: number
  totalTimeMs: number
  avgTimeMs: number
  bySpecialty: Breakdown[]
  byTopic: Breakdown[]
  byDifficulty: Breakdown[]
  byType: Breakdown[]
  weakTopics: Breakdown[]
  missedConcepts: string[]
  redFlagMisses: MCQ[]
  guessed: number
  unsure: number
}

export function buildReport(
  logs: AnswerLog[],
  confidenceById: Record<string, string | undefined>,
): QuizReport {
  const bySpec = new Map<string, { c: number; t: number }>()
  const byTopic = new Map<string, { c: number; t: number }>()
  const byDiff = new Map<string, { c: number; t: number }>()
  const byType = new Map<string, { c: number; t: number }>()
  const missed: string[] = []
  const redFlagMisses: MCQ[] = []
  let correct = 0
  let answered = 0
  let totalTime = 0
  let guessed = 0
  let unsure = 0

  for (const log of logs) {
    const q = questionById.get(log.questionId)
    if (!q) continue
    totalTime += log.timeMs
    const answeredThis = log.selectedIndex !== null
    if (answeredThis) answered++
    if (log.correct) correct++
    const inc = (m: Map<string, { c: number; t: number }>, k: string) => {
      const v = m.get(k) ?? { c: 0, t: 0 }
      v.t++
      if (log.correct) v.c++
      m.set(k, v)
    }
    inc(bySpec, q.specialty)
    inc(byTopic, q.topic)
    inc(byDiff, q.difficulty)
    inc(byType, q.questionType)
    if (!log.correct) {
      if (q.missedConcept) missed.push(q.missedConcept)
      if (q.isRedFlagQuestion) redFlagMisses.push(q)
    }
    const conf = confidenceById[log.questionId]
    if (conf === 'I guessed') guessed++
    if (conf === 'I was unsure') unsure++
  }

  const total = logs.length
  return {
    total,
    answered,
    correct,
    wrong: answered - correct,
    unanswered: total - answered,
    scorePct: total ? Math.round((correct / total) * 100) : 0,
    totalTimeMs: totalTime,
    avgTimeMs: total ? Math.round(totalTime / total) : 0,
    bySpecialty: bd(bySpec),
    byTopic: bd(byTopic),
    byDifficulty: bd(byDiff),
    byType: bd(byType),
    weakTopics: bd(byTopic).filter((b) => b.pct < 70).slice(0, 6),
    missedConcepts: [...new Set(missed)].slice(0, 8),
    redFlagMisses,
    guessed,
    unsure,
  }
}

/** Recommend the specialty most in need of practice (lowest accuracy among started, else most questions). */
export function recommendedSpecialty(s: StoreState): Specialty {
  let best: Specialty | null = null
  let worst = 1.1
  const specs: Specialty[] = [
    'Surgery',
    'Gynecology',
    'Pediatrics / Child Care',
    'Psychiatry & Neurology',
    'Special Surgeries',
  ]
  for (const sp of specs) {
    const st = specialtyStats(s, sp)
    if (st.answered >= 3 && st.accuracy / 100 < worst) {
      worst = st.accuracy / 100
      best = sp
    }
  }
  return best ?? 'Surgery'
}
