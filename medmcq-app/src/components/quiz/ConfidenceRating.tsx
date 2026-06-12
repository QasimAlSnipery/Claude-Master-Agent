import type { Confidence } from '../../data/types'

interface Props {
  value?: Confidence
  wasCorrect: boolean
  onChange: (c: Confidence) => void
}

const OPTIONS: { key: Confidence; label: string; emoji: string }[] = [
  { key: 'I guessed', label: 'I guessed', emoji: '🎲' },
  { key: 'I was unsure', label: 'I was unsure', emoji: '🤔' },
  { key: 'I knew it', label: 'I knew it', emoji: '✅' },
]

export function ConfidenceRating({ value, wasCorrect, onChange }: Props) {
  const message = (() => {
    if (!value) return null
    if (value === 'I guessed') return 'Added to review because you marked it as guessed.'
    if (value === 'I was unsure') return 'Added to review because you were unsure.'
    return wasCorrect ? 'Great — marked as confident.' : 'Marked confident, but it was wrong — kept in review.'
  })()

  return (
    <div className="mt-5 rounded-xl bg-white/[0.03] ring-1 ring-white/10 p-4">
      <p className="text-sm font-semibold text-slate-200 mb-3">How confident were you?</p>
      <div className="flex flex-wrap gap-2">
        {OPTIONS.map((o) => {
          const active = value === o.key
          return (
            <button
              key={o.key}
              onClick={() => onChange(o.key)}
              className={[
                'inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium ring-1 transition',
                active
                  ? 'bg-teal-400/20 ring-teal-300/50 text-teal-100'
                  : 'bg-white/[0.04] ring-white/10 text-slate-300 hover:bg-white/[0.08]',
              ].join(' ')}
            >
              <span>{o.emoji}</span>
              {o.label}
            </button>
          )
        })}
      </div>
      {message && (
        <p
          className={[
            'mt-3 text-xs font-medium',
            value === 'I knew it' && wasCorrect ? 'text-emerald-300' : 'text-amber-300',
          ].join(' ')}
        >
          {message}
        </p>
      )}
    </div>
  )
}
