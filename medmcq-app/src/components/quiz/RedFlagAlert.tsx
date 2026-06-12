import type { MCQ } from '../../data/types'

interface Props {
  mcq: MCQ
}

/** Shown when a red-flag question is answered incorrectly. Serious medical-urgency styling. */
export function RedFlagAlert({ mcq }: Props) {
  return (
    <div className="mt-5 rounded-xl border border-red-500/40 bg-red-950/40 p-4 ring-1 ring-red-500/30">
      <div className="flex items-center gap-2 mb-2">
        <span className="grid place-items-center w-7 h-7 rounded-lg bg-red-500/20 text-red-300 ring-1 ring-red-400/40">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /></svg>
        </span>
        <h4 className="text-sm font-bold uppercase tracking-wide text-red-200">
          Important clinical safety issue
        </h4>
      </div>
      <dl className="space-y-2 text-sm">
        <div>
          <dt className="text-red-300/80 text-xs font-semibold uppercase tracking-wide">Why this mistake is dangerous</dt>
          <dd className="text-red-50/90">{mcq.redFlagReason || 'Missing this can lead to serious patient harm.'}</dd>
        </div>
        {mcq.keyClue && (
          <div>
            <dt className="text-red-300/80 text-xs font-semibold uppercase tracking-wide">Danger clue you should recognise</dt>
            <dd className="text-red-50/90">{mcq.keyClue}</dd>
          </div>
        )}
        <div>
          <dt className="text-red-300/80 text-xs font-semibold uppercase tracking-wide">Correct urgent action / principle</dt>
          <dd className="text-red-50/90">
            {mcq.options[mcq.correctAnswerIndex]}
          </dd>
        </div>
      </dl>
    </div>
  )
}
