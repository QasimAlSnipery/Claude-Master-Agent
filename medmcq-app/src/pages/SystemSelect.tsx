import { surgerySystemCounts, surgeryBank } from '../data/specialties'
import { SystemCard } from '../components/SystemCard'

interface Props {
  onBack: () => void
  onSelectSystem: (systemKey: string | 'all') => void
}

export function SystemSelect({ onBack, onSelectSystem }: Props) {
  const systems = surgerySystemCounts()
  const total = surgeryBank.length

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-10">
      <div className="flex items-center justify-between gap-4 mb-7">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white rounded-lg px-2.5 py-1.5 hover:bg-white/10 transition"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          Dashboard
        </button>
        <span className="text-xs text-slate-400">{total} clinical questions</span>
      </div>

      <header className="mb-8 animate-fade-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/10 ring-1 ring-teal-300/30 text-teal-200 text-xs font-medium mb-4">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 3.5 21 10l-9 9-3.5-3.5L14.5 3.5ZM3 21l5-5" /></svg>
          Surgery
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Choose an organ system
        </h1>
        <p className="mt-3 text-slate-300/90 max-w-2xl">
          Every question is a clinical case. Pick a system to drill it, or take a mixed paper
          across all of surgery. You choose how many questions before each set begins.
        </p>
      </header>

      {/* All systems card */}
      <button
        onClick={() => onSelectSystem('all')}
        className="w-full mb-5 text-left rounded-2xl p-5 ring-1 ring-teal-400/40 bg-gradient-to-r from-teal-500/15 to-emerald-500/10 hover:from-teal-500/25 hover:to-emerald-500/20 transition-all flex items-center gap-4 group"
      >
        <span className="flex-shrink-0 grid place-items-center w-12 h-12 rounded-xl bg-white/10 ring-1 ring-white/15 text-teal-200">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
        </span>
        <div className="flex-1">
          <h3 className="text-base font-bold text-white">Mixed paper — all systems</h3>
          <p className="text-[13px] text-slate-300/90">Randomized across the entire Surgery bank ({total} questions).</p>
        </div>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-teal-200 group-hover:gap-2 transition-all">
          Start
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </span>
      </button>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {systems.map((s) => (
          <SystemCard
            key={s.key}
            label={s.label}
            blurb={s.blurb}
            icon={s.icon}
            accent={s.accent}
            count={s.count}
            onSelect={() => onSelectSystem(s.key)}
          />
        ))}
      </section>
    </div>
  )
}
