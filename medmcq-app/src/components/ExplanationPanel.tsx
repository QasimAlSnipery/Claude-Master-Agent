import type { MCQ } from '../data/types'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

interface Props {
  mcq: MCQ
  selectedIndex: number
}

export function ExplanationPanel({ mcq, selectedIndex }: Props) {
  const correct = selectedIndex === mcq.correctAnswerIndex

  return (
    <div className="mt-6 animate-fade-up space-y-5">
      {/* verdict banner */}
      <div
        className={[
          'rounded-xl px-4 py-3 ring-1 flex items-start gap-3',
          correct
            ? 'bg-emerald-500/10 ring-emerald-400/30 text-emerald-200'
            : 'bg-rose-500/10 ring-rose-400/30 text-rose-200',
        ].join(' ')}
      >
        <div className="mt-0.5">
          {correct ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          )}
        </div>
        <div>
          <p className="font-semibold">
            {correct ? 'Correct!' : 'Not quite.'}
          </p>
          <p className="text-sm opacity-90">
            Correct answer:{' '}
            <span className="font-semibold">
              {LETTERS[mcq.correctAnswerIndex]}. {mcq.options[mcq.correctAnswerIndex]}
            </span>
          </p>
        </div>
      </div>

      {/* main explanation */}
      <section>
        <h4 className="text-sm font-bold uppercase tracking-wide text-teal-300 mb-1.5">Why this is correct</h4>
        <p className="text-sm leading-relaxed text-slate-200">{mcq.explanation}</p>
      </section>

      {/* per-option breakdown */}
      <section>
        <h4 className="text-sm font-bold uppercase tracking-wide text-teal-300 mb-2">Option-by-option</h4>
        <ul className="space-y-2">
          {mcq.options.map((opt, i) => {
            const isCorrect = i === mcq.correctAnswerIndex
            return (
              <li
                key={i}
                className={[
                  'text-sm rounded-lg px-3 py-2 ring-1',
                  isCorrect
                    ? 'bg-emerald-500/5 ring-emerald-400/25 text-emerald-100'
                    : 'bg-white/[0.03] ring-white/10 text-slate-300',
                ].join(' ')}
              >
                <span className="font-semibold">{LETTERS[i]}. {opt}</span>
                <span className="block mt-0.5 opacity-90">{mcq.wrongAnswerExplanations[i]}</span>
              </li>
            )
          })}
        </ul>
      </section>

      {/* clinical pearl */}
      <section className="rounded-xl bg-gradient-to-br from-amber-400/10 to-yellow-500/5 ring-1 ring-amber-300/25 px-4 py-3">
        <div className="flex items-center gap-2 mb-1">
          <svg className="w-4 h-4 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10c.6.7 1 1.4 1 2h6c0-.6.4-1.3 1-2a6 6 0 0 0-4-10Z" /></svg>
          <h4 className="text-sm font-bold uppercase tracking-wide text-amber-200">Clinical pearl</h4>
        </div>
        <p className="text-sm leading-relaxed text-amber-50/90">{mcq.clinicalPearl}</p>
      </section>

      {/* source */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h11l5 5v11a0 0 0 0 1 0 0H4zM14 4v6h6" /></svg>
        <span>
          Source: <span className="text-slate-300">{mcq.sourceLecture}</span> — {mcq.topic}
        </span>
      </div>
    </div>
  )
}
