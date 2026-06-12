import type { Specialty } from '../data/types'
import { specialties, questionBanks } from '../data/specialties'
import { SpecialtyCard } from '../components/SpecialtyCard'

interface Props {
  onSelectSpecialty: (key: Specialty) => void
}

export function Dashboard({ onSelectSpecialty }: Props) {
  const totalQuestions = Object.values(questionBanks).reduce((n, b) => n + (b?.length ?? 0), 0)

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-16">
      {/* hero */}
      <header className="text-center max-w-3xl mx-auto animate-fade-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/10 ring-1 ring-teal-300/30 text-teal-200 text-xs font-medium mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          Clinical case-based question bank
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          ClinicalQ <span className="text-teal-300">Bank</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-300/90 leading-relaxed">
          Sharpen your clinical reasoning with exam-style vignettes built from real lecture
          material. Choose a specialty to begin — every question comes with a detailed,
          referenced explanation and a clinical pearl.
        </p>

        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-slate-400">
          <span className="flex items-center gap-2">
            <strong className="text-white text-lg">{totalQuestions}</strong> clinical MCQs
          </span>
          <span className="w-px h-5 bg-white/15" />
          <span className="flex items-center gap-2">
            <strong className="text-white text-lg">1</strong> active specialty
          </span>
          <span className="w-px h-5 bg-white/15" />
          <span className="flex items-center gap-2">
            <strong className="text-white text-lg">4</strong> coming soon
          </span>
        </div>
      </header>

      {/* specialty grid */}
      <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {specialties.map((meta) => (
          <SpecialtyCard
            key={meta.key}
            meta={meta}
            questionCount={questionBanks[meta.key]?.length ?? 0}
            onSelect={onSelectSpecialty}
          />
        ))}
      </section>

      {/* motivational footer strip */}
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-navy-800/80 to-navy-700/40 ring-1 ring-white/10 px-6 py-5 flex items-center gap-4">
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-teal-400/15 ring-1 ring-teal-300/30 grid place-items-center text-teal-300">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M12 14l9-5-9-5-9 5 9 5Z" /><path d="M12 14v7M5 11v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4" /></svg>
        </div>
        <p className="text-sm text-slate-300">
          <span className="text-white font-semibold">Think like a clinician.</span> Each case asks
          you to diagnose, investigate or manage — not just recall facts. Read the stem carefully,
          commit to an answer, then learn from the explanation.
        </p>
      </div>
    </div>
  )
}
