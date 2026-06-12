import type { MCQ } from '../data/types'
import { questionById } from '../data/specialties'
import { useStore, idsForReview, recentlyAnswered, actions, getProgress } from '../state/store'
import type { ReviewView } from './ReviewHub'

interface Props {
  view: ReviewView
  onBack: () => void
  onPractice: (questions: MCQ[], label: string) => void
  onOpenSingle: (q: MCQ) => void
}

const TITLES: Record<ReviewView, string> = {
  wrong: 'Wrong questions',
  redFlag: 'Red-flag review',
  needsReview: 'Needs review',
  bookmarked: 'Bookmarked',
  difficult: 'Difficult questions',
  recent: 'Recently answered',
}

function timeAgo(ts?: number): string {
  if (!ts) return ''
  const d = new Date(ts)
  return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export function ReviewList({ view, onBack, onPractice, onOpenSingle }: Props) {
  const store = useStore()

  const questions: MCQ[] =
    view === 'recent'
      ? recentlyAnswered(store, 80).map((p) => questionById.get(p.questionId)).filter(Boolean) as MCQ[]
      : (idsForReview(store, view).map((id) => questionById.get(id)).filter(Boolean) as MCQ[])

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-8">
      <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white rounded-lg px-2.5 py-1.5 hover:bg-white/10 transition mb-6">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
        Review hub
      </button>

      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{TITLES[view]}</h1>
          <p className="text-slate-400 text-sm">{questions.length} question{questions.length === 1 ? '' : 's'}</p>
        </div>
        {questions.length > 0 && view !== 'recent' && (
          <button onClick={() => onPractice(questions, TITLES[view])} className="rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-4 py-2.5 text-sm font-bold text-navy-900 hover:brightness-110 transition">
            Practice all {questions.length}
          </button>
        )}
      </div>

      {questions.length === 0 ? (
        <div className="rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-10 text-center text-slate-400">
          Nothing here yet. Answer some questions and they'll show up.
        </div>
      ) : (
        <ul className="space-y-2.5">
          {questions.map((q) => {
            const p = getProgress(q.id)
            return (
              <li key={q.id} className="rounded-xl bg-white/[0.03] ring-1 ring-white/10 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-400/15 text-teal-200 ring-1 ring-teal-300/30">{q.specialty}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/8 text-slate-200 ring-1 ring-white/15">{q.topic}</span>
                      {q.isRedFlagQuestion && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-500/20 text-red-200 ring-1 ring-red-400/40">⚠ red flag</span>}
                      {p.lastAnsweredAt && (
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ring-1 ${p.lastCorrect ? 'bg-emerald-500/15 text-emerald-200 ring-emerald-400/30' : 'bg-rose-500/15 text-rose-200 ring-rose-400/30'}`}>
                          {p.lastCorrect ? 'correct' : 'wrong'}
                        </span>
                      )}
                      {p.confidence && <span className="text-[10px] text-slate-400">· {p.confidence}</span>}
                    </div>
                    <p className="text-sm text-slate-200 line-clamp-2">{q.question}</p>
                    {view === 'redFlag' && (
                      <p className="mt-1.5 text-xs text-red-300/90">
                        <span className="font-semibold">Danger:</span> {q.redFlagReason || 'time-critical decision'} · <span className="font-semibold">Correct:</span> {q.options[q.correctAnswerIndex]}
                      </p>
                    )}
                    {view === 'recent' && <p className="mt-1 text-[11px] text-slate-500">{timeAgo(p.lastAnsweredAt)}</p>}
                  </div>
                  <div className="flex flex-col gap-1.5 flex-shrink-0">
                    <button onClick={() => onOpenSingle(q)} className="rounded-lg bg-white/8 ring-1 ring-white/15 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/15 transition">Repeat</button>
                    {view === 'wrong' && <button onClick={() => actions.clearFromWrong(q.id)} className="rounded-lg px-3 py-1.5 text-xs text-slate-400 hover:text-white transition">Remove</button>}
                    {view === 'redFlag' && <button onClick={() => actions.clearFromRedFlag(q.id)} className="rounded-lg px-3 py-1.5 text-xs text-slate-400 hover:text-white transition">Remove</button>}
                    {view === 'bookmarked' && <button onClick={() => actions.toggleBookmark(q.id)} className="rounded-lg px-3 py-1.5 text-xs text-slate-400 hover:text-white transition">Remove</button>}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
