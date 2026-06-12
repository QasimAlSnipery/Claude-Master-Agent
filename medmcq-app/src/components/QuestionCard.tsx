import type { MCQ } from '../data/types'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

interface Props {
  mcq: MCQ
  selectedIndex: number | null
  onSelect: (index: number) => void
}

export function QuestionCard({ mcq, selectedIndex, onSelect }: Props) {
  const answered = selectedIndex !== null

  function optionClasses(i: number): string {
    const base =
      'w-full text-left rounded-xl px-4 py-3.5 ring-1 transition-all duration-200 flex items-start gap-3'
    if (!answered) {
      return `${base} bg-white/[0.04] ring-white/10 text-slate-100 hover:bg-white/[0.08] hover:ring-teal-400/50 cursor-pointer`
    }
    const isCorrect = i === mcq.correctAnswerIndex
    const isPicked = i === selectedIndex
    if (isCorrect) return `${base} bg-emerald-500/15 ring-emerald-400/60 text-emerald-100`
    if (isPicked) return `${base} bg-rose-500/15 ring-rose-400/60 text-rose-100`
    return `${base} bg-white/[0.02] ring-white/10 text-slate-400`
  }

  function badgeClasses(i: number): string {
    const base =
      'flex-shrink-0 w-7 h-7 rounded-lg grid place-items-center text-sm font-bold ring-1'
    if (!answered) return `${base} bg-white/10 ring-white/15 text-slate-200`
    const isCorrect = i === mcq.correctAnswerIndex
    const isPicked = i === selectedIndex
    if (isCorrect) return `${base} bg-emerald-400/30 ring-emerald-300/50 text-emerald-50`
    if (isPicked) return `${base} bg-rose-400/30 ring-rose-300/50 text-rose-50`
    return `${base} bg-white/5 ring-white/10 text-slate-400`
  }

  return (
    <div className="animate-fade-up">
      <div className="inline-flex items-center gap-2 mb-3 text-xs font-medium text-teal-300">
        <span className="px-2 py-0.5 rounded-full bg-teal-400/15 ring-1 ring-teal-300/30">{mcq.topic}</span>
      </div>

      <h2 className="text-lg sm:text-xl font-semibold leading-relaxed text-white mb-5">
        {mcq.question}
      </h2>

      <div className="space-y-2.5">
        {mcq.options.map((opt, i) => (
          <button
            key={i}
            disabled={answered}
            onClick={() => onSelect(i)}
            className={optionClasses(i)}
          >
            <span className={badgeClasses(i)}>{LETTERS[i]}</span>
            <span className="pt-0.5 text-sm sm:text-[15px] leading-relaxed">{opt}</span>
            {answered && i === mcq.correctAnswerIndex && (
              <svg className="ml-auto w-5 h-5 text-emerald-300 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            )}
            {answered && i === selectedIndex && i !== mcq.correctAnswerIndex && (
              <svg className="ml-auto w-5 h-5 text-rose-300 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
