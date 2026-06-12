interface Props {
  answered: number
  correct: number
  total: number
  onReset: () => void
}

function Stat({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="flex-1 min-w-[78px] rounded-xl bg-white/5 ring-1 ring-white/10 px-3 py-2.5 text-center">
      <div className={`text-lg font-bold ${tone}`}>{value}</div>
      <div className="text-[11px] uppercase tracking-wide text-slate-400">{label}</div>
    </div>
  )
}

export function ScorePanel({ answered, correct, total, onReset }: Props) {
  const wrong = answered - correct
  const pct = answered === 0 ? 0 : Math.round((correct / answered) * 100)

  return (
    <div className="rounded-2xl bg-navy-800/60 ring-1 ring-white/10 backdrop-blur p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-slate-200">Session score</h4>
        <button
          onClick={onReset}
          className="text-xs font-medium text-slate-300 hover:text-white inline-flex items-center gap-1 rounded-lg px-2 py-1 hover:bg-white/10 transition"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" />
          </svg>
          Reset
        </button>
      </div>
      <div className="flex gap-2.5">
        <Stat label="Answered" value={`${answered}`} tone="text-white" />
        <Stat label="Correct" value={`${correct}`} tone="text-emerald-400" />
        <Stat label="Wrong" value={`${wrong}`} tone="text-rose-400" />
        <Stat label="Score" value={`${pct}%`} tone="text-teal-300" />
      </div>
      {/* progress through bank */}
      <div className="mt-3">
        <div className="flex justify-between text-[11px] text-slate-400 mb-1">
          <span>Progress</span>
          <span>{answered}/{total}</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-500"
            style={{ width: `${total === 0 ? 0 : (answered / total) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
