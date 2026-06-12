import type { SpecialtyMeta } from '../../data/types'
import type { SpecialtyStats } from '../../utils/analytics'
import { Icon } from '../Icon'

interface Props {
  meta: SpecialtyMeta
  count: number
  stats: SpecialtyStats
  onOpen: () => void
  onCustom: () => void
}

export function SpecialtyCard({ meta, count, stats, onOpen, onCustom }: Props) {
  const disabled = !meta.available

  return (
    <div
      className={[
        'group relative rounded-2xl p-5 ring-1 backdrop-blur-sm transition-all duration-300 bg-gradient-to-br flex flex-col',
        meta.accent,
        disabled ? 'opacity-60' : 'hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30',
      ].join(' ')}
    >
      <span className={`absolute top-4 right-4 text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full ${meta.available ? 'bg-teal-400/20 text-teal-200 ring-1 ring-teal-300/40' : 'bg-white/10 text-slate-300 ring-1 ring-white/15'}`}>
        {meta.available ? `${count} Qs` : 'COMING SOON'}
      </span>

      <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 text-white ring-1 ring-white/15 mb-4">
        <Icon path={meta.icon} className="w-6 h-6" />
      </div>

      <h3 className="text-base font-bold text-white leading-snug pr-16">{meta.key}</h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-300/90 flex-1">{meta.blurb}</p>

      {meta.available ? (
        <>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <Mini label="Done" value={`${stats.completion}%`} />
            <Mini label="Accuracy" value={stats.answered ? `${stats.accuracy}%` : '—'} />
            <Mini label="Answered" value={`${stats.answered}`} />
          </div>
          {stats.weakestTopic && (
            <p className="mt-3 text-[11px] text-rose-300/90 truncate">Weakest: {stats.weakestTopic}</p>
          )}
          <div className="mt-4 flex gap-2">
            <button onClick={onOpen} className="flex-1 rounded-lg bg-white/10 ring-1 ring-white/15 px-3 py-2 text-sm font-semibold text-white hover:bg-white/15 transition">Continue</button>
            <button onClick={onCustom} title="Custom quiz" className="rounded-lg bg-white/10 ring-1 ring-white/15 px-3 py-2 text-sm font-semibold text-white hover:bg-white/15 transition">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h10M4 18h7" /></svg>
            </button>
          </div>
        </>
      ) : (
        <p className="mt-4 text-[11px] text-slate-400">{meta.comingSoonNote}</p>
      )}
    </div>
  )
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-black/15 ring-1 ring-white/10 py-1.5">
      <div className="text-sm font-bold text-white leading-none">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-slate-400 mt-0.5">{label}</div>
    </div>
  )
}
