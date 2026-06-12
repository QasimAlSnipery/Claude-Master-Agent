import { Icon } from './Icon'

interface Props {
  label: string
  blurb: string
  icon: string
  accent: string
  count: number
  onSelect: () => void
}

export function SystemCard({ label, blurb, icon, accent, count, onSelect }: Props) {
  return (
    <button
      onClick={onSelect}
      className={[
        'group relative text-left rounded-2xl p-5 ring-1 backdrop-blur-sm transition-all duration-300 bg-gradient-to-br',
        accent,
        'hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30 cursor-pointer',
      ].join(' ')}
    >
      <span className="absolute top-4 right-4 text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full bg-white/10 text-slate-200 ring-1 ring-white/15">
        {count} Qs
      </span>
      <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 text-white ring-1 ring-white/15 mb-4">
        <Icon path={icon} className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-white leading-snug pr-12">{label}</h3>
      <p className="mt-2 text-[13px] leading-relaxed text-slate-300/90">{blurb}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white/90 group-hover:gap-2 transition-all">
        Practice
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </span>
    </button>
  )
}
