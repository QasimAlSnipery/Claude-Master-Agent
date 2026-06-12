import type { Specialty } from '../data/types'
import { specialties, specialtyCount, allQuestions } from '../data/specialties'
import { useStore } from '../state/store'
import { dashboardStats, specialtyStats, recommendedSpecialty } from '../utils/analytics'
import { SpecialtyCard } from '../components/dashboard/SpecialtyCard'

interface Props {
  onOpenSpecialty: (s: Specialty) => void
  onCustom: (s: Specialty | 'Mixed') => void
  onReviewHub: () => void
  onContinue: (s: Specialty) => void
}

function StatPill({ label, value, tone = 'text-white', onClick }: { label: string; value: string | number; tone?: string; onClick?: () => void }) {
  const Comp = onClick ? 'button' : 'div'
  return (
    <Comp onClick={onClick} className={`rounded-xl bg-white/5 ring-1 ring-white/10 px-3.5 py-3 text-left ${onClick ? 'hover:bg-white/10 transition cursor-pointer' : ''}`}>
      <div className={`text-xl font-extrabold ${tone}`}>{value}</div>
      <div className="text-[11px] uppercase tracking-wide text-slate-400">{label}</div>
    </Comp>
  )
}

export function Dashboard({ onOpenSpecialty, onCustom, onReviewHub, onContinue }: Props) {
  const store = useStore()
  const stats = dashboardStats(store)
  const lastSpec = store.sessions[0]?.specialty
  const continueSpec: Specialty =
    lastSpec && lastSpec !== 'Mixed' ? lastSpec : recommendedSpecialty(store)
  const rec = recommendedSpecialty(store)

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-10">
      <header className="text-center max-w-3xl mx-auto mb-8 animate-fade-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/10 ring-1 ring-teal-300/30 text-teal-200 text-xs font-medium mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          Clinical case-based exam preparation
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          ClinicalQ <span className="text-teal-300">Bank</span>
        </h1>
        <p className="mt-3 text-base text-slate-300/90">
          {allQuestions.length.toLocaleString()} clinical questions across seven specialties — with
          confidence tracking, red-flag review and a full custom quiz builder.
        </p>
      </header>

      {/* global overview */}
      <section className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-5">
        <StatPill label="Answered" value={stats.totalAnswered} />
        <StatPill label="Accuracy" value={`${stats.overallAccuracy}%`} tone="text-teal-300" />
        <StatPill label="Today" value={`${stats.correctToday}/${stats.answeredToday}`} />
        <StatPill label="Bookmarked" value={stats.bookmarked} tone="text-amber-300" onClick={onReviewHub} />
        <StatPill label="Wrong" value={stats.wrong} tone="text-rose-300" onClick={onReviewHub} />
        <StatPill label="Red flags" value={stats.redFlag} tone="text-red-400" onClick={onReviewHub} />
        <StatPill label="Need review" value={stats.needsReview} tone="text-sky-300" onClick={onReviewHub} />
      </section>

      {/* continue / recommended / review */}
      <section className="grid sm:grid-cols-3 gap-3 mb-10">
        <button onClick={() => onContinue(continueSpec)} className="rounded-2xl bg-gradient-to-r from-teal-500/20 to-emerald-500/10 ring-1 ring-teal-400/40 p-5 text-left hover:from-teal-500/30 transition">
          <div className="text-xs font-semibold text-teal-200 uppercase tracking-wide mb-1">Continue where you left off</div>
          <div className="text-lg font-bold text-white">{continueSpec}</div>
          <div className="text-xs text-slate-300 mt-0.5">Resume a study set →</div>
        </button>
        <button onClick={() => onOpenSpecialty(rec)} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 text-left hover:bg-white/10 transition">
          <div className="text-xs font-semibold text-amber-200 uppercase tracking-wide mb-1">Recommended practice</div>
          <div className="text-lg font-bold text-white">{rec}</div>
          <div className="text-xs text-slate-300 mt-0.5">Your weakest area →</div>
        </button>
        <button onClick={onReviewHub} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 text-left hover:bg-white/10 transition">
          <div className="text-xs font-semibold text-sky-200 uppercase tracking-wide mb-1">Review hub</div>
          <div className="text-lg font-bold text-white">Wrong · Red-flag · Saved</div>
          <div className="text-xs text-slate-300 mt-0.5">Target your gaps →</div>
        </button>
      </section>

      {/* specialty grid */}
      <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3">Specialties</h2>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {specialties.map((meta) => (
          <SpecialtyCard
            key={meta.key}
            meta={meta}
            count={specialtyCount(meta.key)}
            stats={specialtyStats(store, meta.key)}
            onOpen={() => onOpenSpecialty(meta.key)}
            onCustom={() => onCustom(meta.key)}
          />
        ))}
      </section>
    </div>
  )
}
