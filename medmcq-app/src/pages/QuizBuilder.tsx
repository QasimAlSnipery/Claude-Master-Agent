import { useMemo, useState } from 'react'
import type { Specialty, Difficulty, QuestionType } from '../data/types'
import { specialties, topicsForSpecialty, subspecialtiesForSpecialty } from '../data/specialties'
import { useStore } from '../state/store'
import { matchingPool, defaultFilters, type QuizFilters, type QuizStatus } from '../utils/quiz'
import type { QuizConfig } from './Quiz'

interface Props {
  initialSpecialty: Specialty | 'Mixed'
  onBack: () => void
  onStart: (config: QuizConfig) => void
}

const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard']
const TYPES: QuestionType[] = ['Diagnosis', 'Investigation', 'Management', 'Complication', 'Emergency', 'Pharmacology', 'Prevention', 'Screening', 'Prognosis']
const STATUSES: { key: QuizStatus; label: string }[] = [
  { key: 'all', label: 'All questions' },
  { key: 'new', label: 'New only' },
  { key: 'wrong', label: 'Wrong only' },
  { key: 'bookmarked', label: 'Bookmarked' },
  { key: 'needsReview', label: 'Needs review' },
  { key: 'redFlag', label: 'Red-flag review' },
  { key: 'recent', label: 'Recently answered' },
  { key: 'difficult', label: 'Difficult' },
]

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={[
        'rounded-lg px-3 py-1.5 text-sm font-medium ring-1 transition',
        active ? 'bg-teal-400/20 ring-teal-300/50 text-teal-100' : 'bg-white/[0.04] ring-white/10 text-slate-300 hover:bg-white/[0.08]',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

export function QuizBuilder({ initialSpecialty, onBack, onStart }: Props) {
  const store = useStore()
  const [f, setF] = useState<QuizFilters>(() => defaultFilters(initialSpecialty))

  const availableSpecs = specialties.filter((s) => s.available).map((s) => s.key)
  const topics = useMemo(() => (f.specialty === 'Mixed' ? [] : topicsForSpecialty(f.specialty)), [f.specialty])
  const subspecs = useMemo(() => (f.specialty === 'Mixed' ? [] : subspecialtiesForSpecialty(f.specialty)), [f.specialty])
  const pool = useMemo(() => matchingPool(f, store), [f, store])
  const poolCount = pool.length

  const toggle = <T,>(arr: T[], v: T): T[] => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v])

  function patch(p: Partial<QuizFilters>) {
    setF((prev) => ({ ...prev, ...p }))
  }
  function changeSpecialty(s: Specialty | 'Mixed') {
    setF({ ...defaultFilters(s), mode: f.mode, count: f.count, status: f.status })
  }

  function start() {
    const count = Math.min(f.count, poolCount)
    const ordered = f.randomize ? shuffleLocal(pool) : pool
    onStart({
      questions: ordered.slice(0, count),
      mode: f.mode,
      timed: f.timed,
      timeLimitMin: f.timeLimitMin,
      label: f.specialty === 'Mixed' ? 'Custom mixed quiz' : `${f.specialty}`,
      specialty: f.specialty,
    })
  }

  const countOptions = [10, 20, 30, 50, 100].filter((n) => n <= Math.max(poolCount, 10))

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-8">
      <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white rounded-lg px-2.5 py-1.5 hover:bg-white/10 transition mb-6">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
        Back
      </button>

      <h1 className="text-3xl font-extrabold text-white mb-1">Custom quiz builder</h1>
      <p className="text-slate-400 mb-6">Target exactly what you want to practise. Filters apply across every specialty.</p>

      <div className="space-y-6 rounded-2xl bg-navy-800/50 ring-1 ring-white/10 p-6">
        {/* specialty */}
        <Field label="Specialty">
          <div className="flex flex-wrap gap-2">
            <Chip active={f.specialty === 'Mixed'} onClick={() => changeSpecialty('Mixed')}>Mixed (all)</Chip>
            {availableSpecs.map((s) => (
              <Chip key={s} active={f.specialty === s} onClick={() => changeSpecialty(s)}>{s}</Chip>
            ))}
          </div>
        </Field>

        {topics.length > 0 && (
          <Field label={`Topic ${f.topics.length ? `(${f.topics.length})` : ''}`}>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto scroll-thin">
              {topics.slice(0, 60).map((t) => (
                <Chip key={t.topic} active={f.topics.includes(t.topic)} onClick={() => patch({ topics: toggle(f.topics, t.topic) })}>
                  {t.topic} <span className="opacity-60">{t.count}</span>
                </Chip>
              ))}
            </div>
          </Field>
        )}

        {subspecs.length > 1 && (
          <Field label="Subspecialty">
            <div className="flex flex-wrap gap-2">
              {subspecs.map((s) => (
                <Chip key={s} active={f.subspecialties.includes(s)} onClick={() => patch({ subspecialties: toggle(f.subspecialties, s) })}>{s}</Chip>
              ))}
            </div>
          </Field>
        )}

        <div className="grid sm:grid-cols-2 gap-6">
          <Field label="Difficulty">
            <div className="flex flex-wrap gap-2">
              {DIFFICULTIES.map((d) => (
                <Chip key={d} active={f.difficulties.includes(d)} onClick={() => patch({ difficulties: toggle(f.difficulties, d) })}>{d}</Chip>
              ))}
            </div>
          </Field>
          <Field label="Question status">
            <select
              value={f.status}
              onChange={(e) => patch({ status: e.target.value as QuizStatus })}
              className="w-full rounded-lg bg-white/[0.06] ring-1 ring-white/10 px-3 py-2 text-sm text-slate-100 outline-none focus:ring-teal-400/50"
            >
              {STATUSES.map((s) => <option key={s.key} value={s.key} className="bg-navy-800">{s.label}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Question type">
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <Chip key={t} active={f.questionTypes.includes(t)} onClick={() => patch({ questionTypes: toggle(f.questionTypes, t) })}>{t}</Chip>
            ))}
          </div>
        </Field>

        <Field label="Number of questions">
          <div className="flex flex-wrap gap-2 items-center">
            {countOptions.map((n) => (
              <Chip key={n} active={f.count === n} onClick={() => patch({ count: n })}>{n}</Chip>
            ))}
            <Chip active={f.count >= poolCount && poolCount > 0} onClick={() => patch({ count: Math.max(poolCount, 1) })}>All ({poolCount})</Chip>
          </div>
        </Field>

        <div className="grid sm:grid-cols-2 gap-6">
          <Field label="Mode">
            <div className="flex gap-2">
              <Chip active={f.mode === 'study'} onClick={() => patch({ mode: 'study' })}>Study (instant feedback)</Chip>
              <Chip active={f.mode === 'exam'} onClick={() => patch({ mode: 'exam' })}>Exam (score at end)</Chip>
            </div>
          </Field>
          <Field label="Order & timing">
            <div className="flex flex-wrap gap-2 items-center">
              <Chip active={f.randomize} onClick={() => patch({ randomize: !f.randomize })}>{f.randomize ? 'Randomized' : 'Ordered'}</Chip>
              <Chip active={f.timed} onClick={() => patch({ timed: !f.timed })}>{f.timed ? 'Timed' : 'Untimed'}</Chip>
              {f.timed && (
                <input
                  type="number"
                  min={1}
                  value={f.timeLimitMin}
                  onChange={(e) => patch({ timeLimitMin: Math.max(1, Number(e.target.value) || 1) })}
                  className="w-16 rounded-lg bg-white/[0.06] ring-1 ring-white/10 px-2 py-1.5 text-sm text-slate-100 outline-none focus:ring-teal-400/50"
                />
              )}
              {f.timed && <span className="text-xs text-slate-400">min</span>}
            </div>
          </Field>
        </div>
      </div>

      {/* start / empty state */}
      <div className="mt-6">
        {poolCount === 0 ? (
          <div className="rounded-2xl bg-rose-500/10 ring-1 ring-rose-400/30 p-5">
            <p className="text-sm font-semibold text-rose-100 mb-3">No questions match these filters.</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => patch({ topics: [], subspecialties: [] })} className="rounded-lg bg-white/10 ring-1 ring-white/15 px-3 py-1.5 text-sm text-slate-100 hover:bg-white/15">Clear topics</button>
              <button onClick={() => patch({ difficulties: [], questionTypes: [] })} className="rounded-lg bg-white/10 ring-1 ring-white/15 px-3 py-1.5 text-sm text-slate-100 hover:bg-white/15">Include all difficulties & types</button>
              <button onClick={() => patch({ status: 'all' })} className="rounded-lg bg-white/10 ring-1 ring-white/15 px-3 py-1.5 text-sm text-slate-100 hover:bg-white/15">Use all questions</button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <p className="text-sm text-slate-400"><span className="text-white font-bold text-lg">{poolCount}</span> questions match · starting <span className="text-white font-semibold">{Math.min(f.count, poolCount)}</span></p>
            <button onClick={start} className="rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-6 py-3 text-sm font-bold text-navy-900 shadow-lg shadow-teal-500/20 hover:brightness-110 transition">
              Start {f.mode === 'exam' ? 'exam' : 'study'} →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-200 mb-2">{label}</label>
      {children}
    </div>
  )
}

function shuffleLocal<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
