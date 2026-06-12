import type { Specialty } from '../data/types'
import { questionsForSpecialty, topicsForSpecialty, subspecialtiesForSpecialty } from '../data/specialties'
import { shuffle } from '../utils/quiz'
import type { QuizConfig } from './Quiz'

interface Props {
  specialty: Specialty
  onBack: () => void
  onStart: (config: QuizConfig) => void
  onCustom: () => void
}

export function SpecialtyPage({ specialty, onBack, onStart, onCustom }: Props) {
  const all = questionsForSpecialty(specialty)
  const topics = topicsForSpecialty(specialty)
  const subspecs = subspecialtiesForSpecialty(specialty)

  function startStudy(count: number, mode: 'study' | 'exam' = 'study', filterTopic?: string, filterSub?: string) {
    let pool = all
    if (filterTopic) pool = pool.filter((q) => q.topic === filterTopic)
    if (filterSub) pool = pool.filter((q) => q.subspecialty === filterSub)
    onStart({
      questions: shuffle(pool).slice(0, Math.min(count, pool.length)),
      mode,
      timed: false,
      timeLimitMin: 20,
      label: filterTopic ?? filterSub ?? specialty,
      specialty,
    })
  }

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8">
      <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white rounded-lg px-2.5 py-1.5 hover:bg-white/10 transition mb-6">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
        Dashboard
      </button>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{specialty}</h1>
      <p className="text-slate-400 mt-2 mb-6">{all.length} clinical questions · {topics.length} topics</p>

      {/* quick start */}
      <div className="rounded-2xl bg-navy-800/50 ring-1 ring-white/10 p-5 mb-6">
        <h2 className="text-sm font-semibold text-slate-200 mb-3">Quick start</h2>
        <div className="flex flex-wrap gap-2">
          {[10, 20, 30, 50].filter((n) => n <= Math.max(all.length, 10)).map((n) => (
            <button key={n} onClick={() => startStudy(n)} className="rounded-lg bg-white/[0.06] ring-1 ring-white/10 hover:ring-teal-400/60 hover:bg-white/[0.1] px-4 py-2.5 text-sm font-semibold text-white transition">
              Study {n}
            </button>
          ))}
          <button onClick={() => startStudy(30, 'exam')} className="rounded-lg bg-indigo-500/15 ring-1 ring-indigo-400/40 hover:bg-indigo-500/25 px-4 py-2.5 text-sm font-semibold text-indigo-100 transition">Exam (30)</button>
          <button onClick={onCustom} className="rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 px-4 py-2.5 text-sm font-semibold text-navy-900 hover:brightness-110 transition">Custom quiz →</button>
        </div>
      </div>

      {subspecs.length > 1 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3">Subspecialties</h2>
          <div className="flex flex-wrap gap-2">
            {subspecs.map((s) => (
              <button key={s} onClick={() => startStudy(20, 'study', undefined, s)} className="rounded-lg bg-white/[0.04] ring-1 ring-white/10 hover:ring-teal-400/50 hover:bg-white/[0.08] px-3.5 py-2 text-sm font-medium text-slate-200 transition">{s}</button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3">Topics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {topics.map((t) => (
            <button key={t.topic} onClick={() => startStudy(t.count, 'study', t.topic)} className="flex items-center justify-between rounded-xl bg-white/[0.03] ring-1 ring-white/10 hover:ring-teal-400/50 hover:bg-white/[0.07] px-4 py-3 text-left transition">
              <span className="text-sm text-slate-100 truncate pr-2">{t.topic}</span>
              <span className="text-xs text-slate-400 flex-shrink-0">{t.count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
