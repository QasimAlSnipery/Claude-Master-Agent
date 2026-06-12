import { useStore, idsForReview, recentlyAnswered, type ReviewKind } from '../state/store'

export type ReviewView = ReviewKind | 'recent'

interface Props {
  onBack: () => void
  onOpen: (view: ReviewView) => void
}

const CARDS: { key: ReviewView; title: string; desc: string; tone: string; icon: string }[] = [
  { key: 'wrong', title: 'Wrong questions', desc: 'Everything you answered incorrectly.', tone: 'from-rose-500/20 to-red-500/10 ring-rose-400/40', icon: 'M18 6 6 18M6 6l12 12' },
  { key: 'redFlag', title: 'Red-flag review', desc: 'Dangerous mistakes you must not repeat.', tone: 'from-red-600/25 to-red-500/10 ring-red-500/50', icon: 'M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z' },
  { key: 'needsReview', title: 'Needs review', desc: 'Wrong, guessed, unsure, or flagged for review.', tone: 'from-sky-500/20 to-blue-500/10 ring-sky-400/40', icon: 'M12 3a9 9 0 1 0 9 9M21 3l-9 9' },
  { key: 'bookmarked', title: 'Bookmarked', desc: 'Questions you saved for later.', tone: 'from-amber-500/20 to-orange-500/10 ring-amber-400/40', icon: 'M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z' },
  { key: 'difficult', title: 'Difficult questions', desc: 'Hard, or repeatedly missed.', tone: 'from-fuchsia-500/20 to-purple-500/10 ring-fuchsia-400/40', icon: 'M12 2 2 22h20L12 2Z' },
  { key: 'recent', title: 'Recently answered', desc: 'Your latest attempts with confidence.', tone: 'from-teal-500/20 to-emerald-500/10 ring-teal-400/40', icon: 'M12 8v4l3 2M21 12a9 9 0 1 1-9-9' },
]

export function ReviewHub({ onBack, onOpen }: Props) {
  const store = useStore()
  const count = (k: ReviewView): number =>
    k === 'recent' ? recentlyAnswered(store).length : idsForReview(store, k).length

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8">
      <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white rounded-lg px-2.5 py-1.5 hover:bg-white/10 transition mb-6">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
        Dashboard
      </button>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-1">Review hub</h1>
      <p className="text-slate-400 mb-7">Target your weak spots — every list can be practised as a fresh quiz.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CARDS.map((c) => (
          <button key={c.key} onClick={() => onOpen(c.key)} className={`text-left rounded-2xl p-5 ring-1 bg-gradient-to-br ${c.tone} hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30 transition-all`}>
            <div className="flex items-center justify-between mb-3">
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-white/10 ring-1 ring-white/15 text-white">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round"><path d={c.icon} /></svg>
              </span>
              <span className="text-2xl font-extrabold text-white">{count(c.key)}</span>
            </div>
            <h3 className="text-base font-bold text-white">{c.title}</h3>
            <p className="text-[13px] text-slate-300/90 mt-1">{c.desc}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
