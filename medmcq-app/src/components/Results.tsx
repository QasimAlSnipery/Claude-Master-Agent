interface Props {
  total: number
  correct: number
  systemLabel: string
  onRetry: () => void
  onChangeSet: () => void
  onDashboard: () => void
}

export function Results({ total, correct, systemLabel, onRetry, onChangeSet, onDashboard }: Props) {
  const pct = total === 0 ? 0 : Math.round((correct / total) * 100)
  const wrong = total - correct

  let verdict = 'Keep practising'
  let tone = 'text-rose-300'
  let ring = 'ring-rose-400/40'
  if (pct >= 80) {
    verdict = 'Excellent'
    tone = 'text-emerald-300'
    ring = 'ring-emerald-400/50'
  } else if (pct >= 60) {
    verdict = 'Solid pass'
    tone = 'text-teal-300'
    ring = 'ring-teal-400/50'
  } else if (pct >= 50) {
    verdict = 'Borderline'
    tone = 'text-amber-300'
    ring = 'ring-amber-400/50'
  }

  // circular progress geometry
  const r = 54
  const c = 2 * Math.PI * r
  const dash = (pct / 100) * c

  return (
    <div className="max-w-xl mx-auto px-5 py-10 animate-fade-up">
      <div className="rounded-2xl bg-navy-800/60 ring-1 ring-white/10 backdrop-blur p-8 text-center">
        <p className="text-sm font-medium text-slate-400 mb-1">{systemLabel}</p>
        <h2 className="text-2xl font-extrabold text-white mb-6">Session complete</h2>

        <div className="relative w-40 h-40 mx-auto mb-6">
          <svg className="w-40 h-40 -rotate-90" viewBox="0 0 128 128">
            <circle cx="64" cy="64" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="11" />
            <circle
              cx="64"
              cy="64"
              r={r}
              fill="none"
              stroke="url(#g)"
              strokeWidth="11"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${c}`}
              className="transition-all duration-700"
            />
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2dd4bf" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div>
              <div className="text-4xl font-extrabold text-white leading-none">{pct}%</div>
              <div className={`text-xs font-semibold mt-1 ${tone}`}>{verdict}</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3 mb-7">
          <div className={`flex-1 max-w-[120px] rounded-xl bg-white/5 ring-1 ${ring} px-3 py-3`}>
            <div className="text-2xl font-bold text-white">{correct}</div>
            <div className="text-[11px] uppercase tracking-wide text-slate-400">Correct</div>
          </div>
          <div className="flex-1 max-w-[120px] rounded-xl bg-white/5 ring-1 ring-white/10 px-3 py-3">
            <div className="text-2xl font-bold text-rose-300">{wrong}</div>
            <div className="text-[11px] uppercase tracking-wide text-slate-400">Wrong</div>
          </div>
          <div className="flex-1 max-w-[120px] rounded-xl bg-white/5 ring-1 ring-white/10 px-3 py-3">
            <div className="text-2xl font-bold text-white">{total}</div>
            <div className="text-[11px] uppercase tracking-wide text-slate-400">Total</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={onRetry}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-4 py-2.5 text-sm font-semibold text-navy-900 shadow-lg shadow-teal-500/20 hover:brightness-110 transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" /></svg>
            New set (reshuffle)
          </button>
          <button
            onClick={onChangeSet}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 ring-1 ring-white/15 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10 transition"
          >
            Change length / system
          </button>
        </div>
        <button onClick={onDashboard} className="mt-3 text-xs text-slate-400 hover:text-white transition">
          ← Back to dashboard
        </button>
      </div>
    </div>
  )
}
