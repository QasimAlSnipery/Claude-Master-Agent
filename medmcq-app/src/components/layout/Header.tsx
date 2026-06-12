interface Props {
  onHome: () => void
  onCustom: () => void
  onReview: () => void
  active: 'dashboard' | 'builder' | 'review' | 'quiz' | 'specialty'
}

export function Header({ onHome, onCustom, onReview, active }: Props) {
  const link = (on: boolean) =>
    `text-sm font-medium px-3 py-1.5 rounded-lg transition ${on ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'}`
  return (
    <div className="border-b border-white/10 bg-navy-900/50 backdrop-blur sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
        <button onClick={onHome} className="flex items-center gap-2.5 group">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 text-navy-900">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 3v6a4 4 0 0 0 8 0V3M10 13v3a5 5 0 0 0 10 0v-3M20 10a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" /></svg>
          </span>
          <span className="font-bold text-white tracking-tight group-hover:text-teal-200 transition hidden sm:block">ClinicalQ Bank</span>
        </button>
        <nav className="flex items-center gap-1">
          <button onClick={onHome} className={link(active === 'dashboard' || active === 'specialty')}>Dashboard</button>
          <button onClick={onCustom} className={link(active === 'builder')}>Custom quiz</button>
          <button onClick={onReview} className={link(active === 'review')}>Review</button>
        </nav>
      </div>
    </div>
  )
}
