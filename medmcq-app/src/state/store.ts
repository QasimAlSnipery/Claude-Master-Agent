import { useSyncExternalStore } from 'react'
import type { QuestionProgress, Confidence, SessionRecord } from '../data/types'

interface StoreState {
  progress: Record<string, QuestionProgress>
  sessions: SessionRecord[]
}

const KEY = 'clinicalq:v2'

function load(): StoreState {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as StoreState
      if (parsed && parsed.progress) return { progress: parsed.progress, sessions: parsed.sessions ?? [] }
    }
  } catch {
    /* ignore corrupt storage */
  }
  return { progress: {}, sessions: [] }
}

let state: StoreState = load()
const listeners = new Set<() => void>()

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* storage full / unavailable — keep working in-memory */
  }
}

function emit() {
  persist()
  for (const l of listeners) l()
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

function getState(): StoreState {
  return state
}

export function defaultProgress(id: string): QuestionProgress {
  return {
    questionId: id,
    attempts: 0,
    correctAttempts: 0,
    wrongAttempts: 0,
    bookmarked: false,
    needsReview: false,
    isInWrongReview: false,
    isInRedFlagReview: false,
    markedDifficult: false,
  }
}

function get(id: string): QuestionProgress {
  return state.progress[id] ?? defaultProgress(id)
}

function set(id: string, patch: Partial<QuestionProgress>) {
  const cur = get(id)
  state = { ...state, progress: { ...state.progress, [id]: { ...cur, ...patch } } }
  emit()
}

// ---- actions ----
export const actions = {
  recordAnswer(id: string, correct: boolean, isRedFlag: boolean, selectedIndex: number) {
    const cur = get(id)
    set(id, {
      attempts: cur.attempts + 1,
      correctAttempts: cur.correctAttempts + (correct ? 1 : 0),
      wrongAttempts: cur.wrongAttempts + (correct ? 0 : 1),
      lastAnsweredAt: Date.now(),
      lastCorrect: correct,
      lastSelectedIndex: selectedIndex,
      needsReview: cur.needsReview || !correct,
      isInWrongReview: cur.isInWrongReview || !correct,
      isInRedFlagReview: cur.isInRedFlagReview || (!correct && isRedFlag),
    })
  },

  setConfidence(id: string, confidence: Confidence) {
    const cur = get(id)
    const lowConfidence = confidence === 'I guessed' || confidence === 'I was unsure'
    let needsReview = cur.needsReview || lowConfidence
    let isInWrongReview = cur.isInWrongReview
    // mastered: correct + knew it + not repeatedly missed
    if (confidence === 'I knew it' && cur.lastCorrect && cur.wrongAttempts < 2) {
      needsReview = false
      isInWrongReview = false
    }
    set(id, { confidence, needsReview, isInWrongReview })
  },

  toggleBookmark(id: string) {
    set(id, { bookmarked: !get(id).bookmarked })
  },

  toggleDifficult(id: string) {
    set(id, { markedDifficult: !get(id).markedDifficult })
  },

  toggleNeedsReview(id: string) {
    set(id, { needsReview: !get(id).needsReview })
  },

  setNotes(id: string, userNotes: string) {
    set(id, { userNotes })
  },

  clearFromWrong(id: string) {
    set(id, { isInWrongReview: false })
  },

  clearFromRedFlag(id: string) {
    set(id, { isInRedFlagReview: false })
  },

  addSession(rec: SessionRecord) {
    state = { ...state, sessions: [rec, ...state.sessions].slice(0, 200) }
    emit()
  },

  resetAll() {
    state = { progress: {}, sessions: [] }
    emit()
  },
}

// ---- hooks / selectors ----
export function useStore(): StoreState {
  return useSyncExternalStore(subscribe, getState, getState)
}

export function getProgress(id: string): QuestionProgress {
  return get(id)
}

export type ReviewKind = 'wrong' | 'bookmarked' | 'needsReview' | 'redFlag' | 'difficult'

export function idsForReview(s: StoreState, kind: ReviewKind): string[] {
  const entries = Object.values(s.progress)
  switch (kind) {
    case 'wrong':
      return entries.filter((p) => p.isInWrongReview).map((p) => p.questionId)
    case 'bookmarked':
      return entries.filter((p) => p.bookmarked).map((p) => p.questionId)
    case 'needsReview':
      return entries.filter((p) => p.needsReview).map((p) => p.questionId)
    case 'redFlag':
      return entries.filter((p) => p.isInRedFlagReview).map((p) => p.questionId)
    case 'difficult':
      return entries.filter((p) => p.markedDifficult || p.wrongAttempts >= 2).map((p) => p.questionId)
  }
}

export function recentlyAnswered(s: StoreState, limit = 50): QuestionProgress[] {
  return Object.values(s.progress)
    .filter((p) => p.lastAnsweredAt)
    .sort((a, b) => (b.lastAnsweredAt ?? 0) - (a.lastAnsweredAt ?? 0))
    .slice(0, limit)
}
