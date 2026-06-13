import type { Specialty } from '../data/types'
import { questionsForSpecialty, organsForSpecialty } from '../data/specialties'
import { shuffle } from '../utils/quiz'
import { useStore } from '../state/store'
import { specialtyStats } from '../utils/analytics'
import type { QuizConfig } from './Quiz'

interface Props {
  specialty: Specialty
  onBack: () => void
  onStart: (config: QuizConfig) => void
  onCustom: () => void
}

export function SpecialtyPage({ specialty, onBack, onStart, onCustom }: Props) {
  const store = useStore()
  const all = questionsForSpecialty(specialty)
  const organs = organsForSpecialty(specialty)
  const stats = specialtyStats(store, specialty)

  function startStudy(count: number, mode: 'study' | 'exam' = 'study', filterOrgan?: string) {
    const pool = filterOrgan ? all.filter((q) => q.organ === filterOrgan) : all
    onStart({
      questions: shuffle(pool).slice(0, Math.min(count, pool.length)),
      mode,
      timed: false,
      timeLimitMin: 20,
      label: filterOrgan ?? specialty,
      specialty,
    })
  }

  /** Resume where the user left off: unseen questions first, then the ones answered longest ago. */
  function continueSession(count = 20) {
    const ordered = [...all].sort((a, b) => {
      const pa = store.progress[a.id]
      const pb = store.progress[b.id]
      const aa = pa?.attempts ?? 0
      const ab = pb?.attempts ?? 0
      if (aa !== ab) return aa - ab
      return (pa?.lastAnsweredAt ?? 0) - (pb?.lastAnsweredAt ?? 0)
    })
    onStart({
      questions: ordered.slice(0, Math.min(count, ordered.length)),
      mode: 'study',
      timed: false,
      timeLimitMin: 20,
      label: `${specialty} — continue`,
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
      <p className="text-slate-400 mt-2 mb-6">{all.length} clinical questions · {organs.length} organ groups</p>

      {/* continue where you left off */}
      <button
        onClick={() => continueSession(20)}
        className="w-full mb-6 text-left rounded-2xl p-5 ring-1 ring-teal-400/40 bg-gradient-to-r from-teal-500/20 to-emerald-500/10 hover:from-teal-500/30 hover:to-emerald-500/20 transition-all flex items-center gap-4 group"
      >
        <span className="flex-shrink-0 grid place-items-center w-12 h-12 rounded-xl bg-white/10 ring-1 ring-white/15 text-teal-200">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round"><path d="M5 3l14 9-14 9V3z" /></svg>
        </span>
        <div className="flex-1">
          <div className="text-xs font-semibold text-teal-200 uppercase tracking-wide">Continue where you left off</div>
          <div className="text-lg font-bold text-white">
            {stats.answered === 0 ? 'Start your first set' : `Resume — ${stats.answered}/${all.length} done, ${stats.accuracy}% accuracy`}
          </div>
          <div className="text-xs text-slate-300 mt-0.5">Picks up with questions you haven't seen yet →</div>
        </div>
        <svg className="w-5 h-5 text-teal-200 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </button>

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

      {/* organs */}
      <div>
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3">Practice by organ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {organs.map((o) => (
            <button
              key={o.organ}
              onClick={() => startStudy(o.count, 'study', o.organ)}
              className="flex items-center justify-between rounded-xl bg-white/[0.03] ring-1 ring-white/10 hover:ring-teal-400/50 hover:bg-white/[0.07] px-4 py-3.5 text-left transition group"
            >
              <span className="text-sm font-medium text-slate-100 truncate pr-2 group-hover:text-teal-100">{o.organ}</span>
              <span className="text-xs font-semibold text-slate-400 flex-shrink-0 bg-white/5 rounded-full px-2 py-0.5">{o.count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
