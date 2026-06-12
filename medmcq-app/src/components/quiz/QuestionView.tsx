import { useState } from 'react'
import type { MCQ, Confidence } from '../../data/types'
import { actions, getProgress, useStore } from '../../state/store'
import { ConfidenceRating } from './ConfidenceRating'
import { RedFlagAlert } from './RedFlagAlert'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

interface Props {
  mcq: MCQ
  /** study reveals on select; exam stays hidden until `revealed` forced true in review */
  revealed: boolean
  selectedIndex: number | null
  onSelect: (i: number) => void
  confidence?: Confidence
  onConfidence?: (c: Confidence) => void
  showConfidence?: boolean
}

function Badge({ children, tone = 'slate' }: { children: React.ReactNode; tone?: string }) {
  const map: Record<string, string> = {
    slate: 'bg-white/8 text-slate-200 ring-white/15',
    teal: 'bg-teal-400/15 text-teal-200 ring-teal-300/30',
    amber: 'bg-amber-400/15 text-amber-200 ring-amber-300/30',
    rose: 'bg-rose-400/15 text-rose-200 ring-rose-300/30',
    red: 'bg-red-500/20 text-red-200 ring-red-400/40',
  }
  return (
    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ring-1 ${map[tone]}`}>
      {children}
    </span>
  )
}

export function QuestionView({
  mcq,
  revealed,
  selectedIndex,
  onSelect,
  confidence,
  onConfidence,
  showConfidence,
}: Props) {
  useStore() // re-render on bookmark/notes changes
  const prog = getProgress(mcq.id)
  const [notesOpen, setNotesOpen] = useState(false)
  const wasCorrect = selectedIndex === mcq.correctAnswerIndex
  const diffTone = mcq.difficulty === 'Hard' ? 'rose' : mcq.difficulty === 'Easy' ? 'teal' : 'amber'

  function optionClass(i: number): string {
    const base = 'w-full text-left rounded-xl px-4 py-3.5 ring-1 transition-all duration-200 flex items-start gap-3'
    if (!revealed) {
      const picked = i === selectedIndex
      return `${base} ${picked ? 'bg-teal-400/15 ring-teal-300/50 text-white' : 'bg-white/[0.04] ring-white/10 text-slate-100 hover:bg-white/[0.08] hover:ring-teal-400/50'} cursor-pointer`
    }
    if (i === mcq.correctAnswerIndex) return `${base} bg-emerald-500/15 ring-emerald-400/60 text-emerald-100`
    if (i === selectedIndex) return `${base} bg-rose-500/15 ring-rose-400/60 text-rose-100`
    return `${base} bg-white/[0.02] ring-white/10 text-slate-400`
  }

  return (
    <div className="animate-fade-up">
      {/* meta row */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Badge tone="teal">{mcq.specialty}</Badge>
        {mcq.subspecialty && <Badge>{mcq.subspecialty}</Badge>}
        <Badge>{mcq.topic}</Badge>
        <Badge tone={diffTone}>{mcq.difficulty}</Badge>
        <Badge>{mcq.questionType}</Badge>
        {mcq.isRedFlagQuestion && <Badge tone="red">⚠ Red flag</Badge>}
        <div className="ml-auto flex items-center gap-1.5">
          <button
            onClick={() => actions.toggleBookmark(mcq.id)}
            title="Bookmark"
            className={`grid place-items-center w-8 h-8 rounded-lg ring-1 transition ${prog.bookmarked ? 'bg-amber-400/20 ring-amber-300/40 text-amber-200' : 'bg-white/5 ring-white/10 text-slate-400 hover:text-white'}`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill={prog.bookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
          </button>
          <button
            onClick={() => actions.toggleDifficult(mcq.id)}
            title="Mark difficult"
            className={`grid place-items-center w-8 h-8 rounded-lg ring-1 transition ${prog.markedDifficult ? 'bg-rose-400/20 ring-rose-300/40 text-rose-200' : 'bg-white/5 ring-white/10 text-slate-400 hover:text-white'}`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 22h20L12 2Z" /></svg>
          </button>
          <button
            onClick={() => setNotesOpen((v) => !v)}
            title="Notes"
            className={`grid place-items-center w-8 h-8 rounded-lg ring-1 transition ${prog.userNotes ? 'bg-sky-400/20 ring-sky-300/40 text-sky-200' : 'bg-white/5 ring-white/10 text-slate-400 hover:text-white'}`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
          </button>
        </div>
      </div>

      <h2 className="text-lg sm:text-xl font-semibold leading-relaxed text-white mb-5">{mcq.question}</h2>

      {notesOpen && (
        <div className="mb-5">
          <textarea
            value={prog.userNotes ?? ''}
            onChange={(e) => actions.setNotes(mcq.id, e.target.value)}
            placeholder="Your notes for this question…"
            className="w-full rounded-xl bg-white/[0.04] ring-1 ring-white/10 focus:ring-sky-400/50 outline-none p-3 text-sm text-slate-100 min-h-[80px]"
          />
        </div>
      )}

      <div className="space-y-2.5">
        {mcq.options.map((opt, i) => (
          <button key={i} disabled={revealed} onClick={() => onSelect(i)} className={optionClass(i)}>
            <span className="flex-shrink-0 w-7 h-7 rounded-lg grid place-items-center text-sm font-bold ring-1 bg-white/10 ring-white/15">
              {LETTERS[i]}
            </span>
            <span className="pt-0.5 text-sm sm:text-[15px] leading-relaxed">{opt}</span>
            {revealed && i === mcq.correctAnswerIndex && (
              <svg className="ml-auto w-5 h-5 text-emerald-300 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            )}
            {revealed && i === selectedIndex && i !== mcq.correctAnswerIndex && (
              <svg className="ml-auto w-5 h-5 text-rose-300 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            )}
          </button>
        ))}
      </div>

      {revealed && (
        <div className="mt-6 space-y-5 animate-fade-up">
          <div className={`rounded-xl px-4 py-3 ring-1 flex items-start gap-3 ${wasCorrect ? 'bg-emerald-500/10 ring-emerald-400/30 text-emerald-200' : 'bg-rose-500/10 ring-rose-400/30 text-rose-200'}`}>
            <div className="mt-0.5">
              {wasCorrect ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
              )}
            </div>
            <div>
              <p className="font-semibold">{wasCorrect ? 'Correct!' : 'Not quite.'}</p>
              <p className="text-sm opacity-90">
                Correct answer: <span className="font-semibold">{LETTERS[mcq.correctAnswerIndex]}. {mcq.options[mcq.correctAnswerIndex]}</span>
              </p>
            </div>
          </div>

          {mcq.isRedFlagQuestion && !wasCorrect && <RedFlagAlert mcq={mcq} />}

          <section>
            <h4 className="text-sm font-bold uppercase tracking-wide text-teal-300 mb-1.5">Why this is correct</h4>
            <p className="text-sm leading-relaxed text-slate-200">{mcq.explanation}</p>
          </section>

          {mcq.wrongAnswerExplanations.length > 0 && (
            <section>
              <h4 className="text-sm font-bold uppercase tracking-wide text-teal-300 mb-2">Option-by-option</h4>
              <ul className="space-y-2">
                {mcq.options.map((opt, i) => (
                  <li key={i} className={`text-sm rounded-lg px-3 py-2 ring-1 ${i === mcq.correctAnswerIndex ? 'bg-emerald-500/5 ring-emerald-400/25 text-emerald-100' : 'bg-white/[0.03] ring-white/10 text-slate-300'}`}>
                    <span className="font-semibold">{LETTERS[i]}. {opt}</span>
                    {mcq.wrongAnswerExplanations[i] && <span className="block mt-0.5 opacity-90">{mcq.wrongAnswerExplanations[i]}</span>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="grid sm:grid-cols-2 gap-3">
            {mcq.keyClue && (
              <div className="rounded-xl bg-sky-400/10 ring-1 ring-sky-300/25 px-4 py-3">
                <h4 className="text-xs font-bold uppercase tracking-wide text-sky-200 mb-1">Key clue</h4>
                <p className="text-sm text-sky-50/90">{mcq.keyClue}</p>
              </div>
            )}
            {mcq.commonExamTrap && (
              <div className="rounded-xl bg-orange-400/10 ring-1 ring-orange-300/25 px-4 py-3">
                <h4 className="text-xs font-bold uppercase tracking-wide text-orange-200 mb-1">Common exam trap</h4>
                <p className="text-sm text-orange-50/90">{mcq.commonExamTrap}</p>
              </div>
            )}
          </div>

          <section className="rounded-xl bg-gradient-to-br from-amber-400/10 to-yellow-500/5 ring-1 ring-amber-300/25 px-4 py-3">
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-4 h-4 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10c.6.7 1 1.4 1 2h6c0-.6.4-1.3 1-2a6 6 0 0 0-4-10Z" /></svg>
              <h4 className="text-sm font-bold uppercase tracking-wide text-amber-200">Clinical pearl</h4>
            </div>
            <p className="text-sm leading-relaxed text-amber-50/90">{mcq.clinicalPearl}</p>
          </section>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h11l5 5v11H4zM14 4v6h6" /></svg>
            <span>Source: <span className="text-slate-300">{mcq.sourceFile ?? mcq.sourceLecture}</span> — {mcq.topic}</span>
          </div>

          {showConfidence && onConfidence && (
            <ConfidenceRating value={confidence} wasCorrect={wasCorrect} onChange={onConfidence} />
          )}
        </div>
      )}
    </div>
  )
}
