import type { SpecialtyMeta } from '../data/types'
import { Icon } from './Icon'

interface Props {
  meta: SpecialtyMeta
  questionCount: number
  onSelect: (key: SpecialtyMeta['key']) => void
}

export function SpecialtyCard({ meta, questionCount, onSelect }: Props) {
  const disabled = !meta.available

  return (
    <button
      onClick={() => meta.available && onSelect(meta.key)}
      disabled={disabled}
      aria-disabled={disabled}
      className={[
        'group relative text-left rounded-2xl p-6 ring-1 backdrop-blur-sm transition-all duration-300',
        'bg-gradient-to-br',
        meta.accent,
        disabled
          ? 'opacity-55 cursor-not-allowed'
          : 'hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-500/10 hover:ring-teal-400/70 cursor-pointer',
      ].join(' ')}
    >
      {/* Status pill */}
      <span
        className={[
          'absolute top-4 right-4 text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full',
          meta.available
            ? 'bg-teal-400/20 text-teal-200 ring-1 ring-teal-300/40'
            : 'bg-white/10 text-slate-300 ring-1 ring-white/15',
        ].join(' ')}
      >
        {meta.available ? 'ACTIVE' : 'COMING SOON'}
      </span>

      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 text-white ring-1 ring-white/15 mb-5">
        <Icon path={meta.icon} className="w-6 h-6" />
      </div>

      <h3 className="text-xl font-bold text-white">{meta.key}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-300/90">{meta.blurb}</p>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400">
          {meta.available ? `${questionCount} questions` : 'Locked'}
        </span>
        {meta.available && (
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-teal-300 group-hover:gap-2 transition-all">
            Start
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        )}
        {!meta.available && (
          <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
        )}
      </div>
    </button>
  )
}
