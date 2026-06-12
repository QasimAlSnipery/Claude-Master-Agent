import { useMemo, useState, useCallback } from 'react'
import type { MCQ } from '../data/types'
import { questionsForSystem, surgeryBank } from '../data/specialties'
import { systemLabel } from '../data/systems'
import { QuestionCard } from '../components/QuestionCard'
import { ExplanationPanel } from '../components/ExplanationPanel'
import { Results } from '../components/Results'

interface Props {
  systemKey: string | 'all'
  onBack: () => void
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

type Phase = 'setup' | 'play' | 'results'

export function Quiz({ systemKey, onBack }: Props) {
  const pool = useMemo<MCQ[]>(
    () => (systemKey === 'all' ? surgeryBank : questionsForSystem(systemKey)),
    [systemKey],
  )
  const label = systemKey === 'all' ? 'Mixed paper — all systems' : systemLabel(systemKey)

  const countOptions = useMemo(() => {
    const base = [10, 20, 30, 50, 100].filter((n) => n < pool.length)
    return [...base, pool.length] // last entry = "All"
  }, [pool.length])

  const [phase, setPhase] = useState<Phase>('setup')
  const [session, setSession] = useState<MCQ[]>([])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [correct, setCorrect] = useState(0)

  const startSession = useCallback(
    (count: number) => {
      setSession(shuffle(pool).slice(0, count))
      setIndex(0)
      setSelected(null)
      setCorrect(0)
      setPhase('play')
    },
    [pool],
  )

  const handleSelect = useCallback(
    (i: number) => {
      if (selected !== null) return
      setSelected(i)
      if (i === session[index].correctAnswerIndex) setCorrect((c) => c + 1)
    },
    [selected, session, index],
  )

  const handleNext = useCallback(() => {
    if (index + 1 >= session.length) {
      setPhase('results')
      return
    }
    setIndex((n) => n + 1)
    setSelected(null)
  }, [index, session.length])

  // ---- SETUP ----
  if (phase === 'setup') {
    return (
      <div className="max-w-lg mx-auto px-5 py-12">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white rounded-lg px-2.5 py-1.5 hover:bg-white/10 transition mb-6"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          Systems
        </button>

        <div className="rounded-2xl bg-navy-800/60 ring-1 ring-white/10 backdrop-blur p-7 animate-fade-up">
          <p className="text-sm font-medium text-teal-300 mb-1">{label}</p>
          <h2 className="text-2xl font-extrabold text-white mb-1">How many questions?</h2>
          <p className="text-sm text-slate-400 mb-6">
            {pool.length} available · every set is freshly randomized, no repeats within a set.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {countOptions.map((n, i) => {
              const isAll = i === countOptions.length - 1
              return (
                <button
                  key={`${n}-${i}`}
                  onClick={() => startSession(n)}
                  className="rounded-xl bg-white/[0.04] ring-1 ring-white/10 hover:ring-teal-400/60 hover:bg-white/[0.08] px-4 py-5 text-center transition group"
                >
                  <div className="text-2xl font-extrabold text-white group-hover:text-teal-200 transition">
                    {isAll ? 'All' : n}
                  </div>
                  <div className="text-[11px] uppercase tracking-wide text-slate-400 mt-0.5">
                    {isAll ? `${n} questions` : 'questions'}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // ---- RESULTS ----
  if (phase === 'results') {
    return (
      <Results
        total={session.length}
        correct={correct}
        systemLabel={label}
        onRetry={() => startSession(session.length)}
        onChangeSet={() => setPhase('setup')}
        onDashboard={onBack}
      />
    )
  }

  // ---- PLAY ----
  const current = session[index]
  const answered = selected !== null
  const isLast = index + 1 >= session.length
  const progressPct = ((index + (answered ? 1 : 0)) / session.length) * 100

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8">
      <div className="flex items-center justify-between gap-4 mb-5">
        <button
          onClick={() => setPhase('setup')}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white rounded-lg px-2.5 py-1.5 hover:bg-white/10 transition"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          End set
        </button>
        <div className="text-right">
          <div className="text-sm font-bold text-white">{label}</div>
          <div className="text-[11px] text-slate-400">
            Question {index + 1} of {session.length} · Score {correct}/{index + (answered ? 1 : 0)}
          </div>
        </div>
      </div>

      {/* progress bar */}
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="rounded-2xl bg-navy-800/50 ring-1 ring-white/10 backdrop-blur p-6 sm:p-7">
        <QuestionCard mcq={current} selectedIndex={selected} onSelect={handleSelect} />
        {answered && <ExplanationPanel mcq={current} selectedIndex={selected} />}
        {answered && (
          <div className="mt-7 flex justify-end">
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-navy-900 shadow-lg shadow-teal-500/20 hover:brightness-110 transition animate-pop"
            >
              {isLast ? 'Finish & see score' : 'Next question'}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
