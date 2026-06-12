import { useMemo, useState, useCallback } from 'react'
import type { Specialty } from '../data/types'
import { questionBanks } from '../data/specialties'
import { QuestionCard } from '../components/QuestionCard'
import { ExplanationPanel } from '../components/ExplanationPanel'
import { ScorePanel } from '../components/ScorePanel'

interface Props {
  specialty: Specialty
  onBack: () => void
}

/** Fisher–Yates shuffle returning a new array (no Date/Math.random restrictions in app runtime). */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function SurgeryQuiz({ specialty, onBack }: Props) {
  const bank = questionBanks[specialty] ?? []

  // randomized play order; reshuffles on reset
  const [order, setOrder] = useState<number[]>(() => shuffle(bank.map((_, i) => i)))
  const [pos, setPos] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(0)
  const [correct, setCorrect] = useState(0)

  const current = useMemo(() => bank[order[pos]], [bank, order, pos])

  const handleSelect = useCallback(
    (index: number) => {
      if (selected !== null) return
      setSelected(index)
      setAnswered((a) => a + 1)
      if (index === current.correctAnswerIndex) setCorrect((c) => c + 1)
    },
    [selected, current],
  )

  const handleNext = useCallback(() => {
    setSelected(null)
    setPos((p) => {
      const next = p + 1
      if (next >= order.length) {
        // exhausted the bank — reshuffle for a fresh randomized pass
        setOrder(shuffle(bank.map((_, i) => i)))
        return 0
      }
      return next
    })
  }, [order.length, bank])

  const handleReset = useCallback(() => {
    setOrder(shuffle(bank.map((_, i) => i)))
    setPos(0)
    setSelected(null)
    setAnswered(0)
    setCorrect(0)
  }, [bank])

  if (!current) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-20 text-center text-slate-300">
        <p>No questions available for {specialty} yet.</p>
        <button onClick={onBack} className="mt-4 text-teal-300 hover:underline">
          ← Back to dashboard
        </button>
      </div>
    )
  }

  const lastInPass = pos + 1 >= order.length

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8">
      {/* top bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white rounded-lg px-2.5 py-1.5 hover:bg-white/10 transition"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          Dashboard
        </button>
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-teal-400/15 ring-1 ring-teal-300/30 text-teal-300">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 3.5 21 10l-9 9-3.5-3.5L14.5 3.5ZM3 21l5-5" /></svg>
          </span>
          <div className="leading-tight">
            <div className="text-sm font-bold text-white">{specialty}</div>
            <div className="text-[11px] text-slate-400">Question {pos + 1} of {order.length}</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-6 items-start">
        {/* main question column */}
        <div className="order-2 lg:order-1 rounded-2xl bg-navy-800/50 ring-1 ring-white/10 backdrop-blur p-6 sm:p-7 scroll-thin">
          <QuestionCard mcq={current} selectedIndex={selected} onSelect={handleSelect} />

          {selected !== null && <ExplanationPanel mcq={current} selectedIndex={selected} />}

          {selected !== null && (
            <div className="mt-7 flex justify-end">
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-navy-900 shadow-lg shadow-teal-500/20 hover:shadow-teal-400/30 hover:brightness-110 transition animate-pop"
              >
                {lastInPass ? 'Restart (reshuffle)' : 'Next question'}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
            </div>
          )}
        </div>

        {/* sidebar */}
        <aside className="order-1 lg:order-2 lg:sticky lg:top-6">
          <ScorePanel answered={answered} correct={correct} total={order.length} onReset={handleReset} />
          {selected === null && (
            <p className="mt-3 text-xs text-slate-400 leading-relaxed px-1">
              Select the single best answer. Feedback and a full explanation appear immediately.
            </p>
          )}
        </aside>
      </div>
    </div>
  )
}
