import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import type { MCQ, Confidence, Specialty } from '../data/types'
import { actions } from '../state/store'
import { QuestionView } from '../components/quiz/QuestionView'
import { FinalScoreReport } from '../components/reports/FinalScoreReport'
import { buildReport, type AnswerLog } from '../utils/analytics'

export interface QuizConfig {
  questions: MCQ[]
  mode: 'study' | 'exam'
  timed: boolean
  timeLimitMin: number
  label: string
  specialty: Specialty | 'Mixed'
}

interface Props {
  config: QuizConfig
  onExit: () => void
  onReviewWrong: () => void
  onReviewRedFlag: () => void
  onRepeat: () => void
  onPracticeWeak: (topics: string[]) => void
  onNewCustom: () => void
}

type Phase = 'play' | 'examReview' | 'report'

export function Quiz({ config, onExit, onReviewWrong, onReviewRedFlag, onRepeat, onPracticeWeak, onNewCustom }: Props) {
  const { questions, mode, timed, timeLimitMin, label, specialty } = config
  const [phase, setPhase] = useState<Phase>('play')
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null))
  const [confidences, setConfidences] = useState<(Confidence | undefined)[]>(() => questions.map(() => undefined))
  const [times, setTimes] = useState<number[]>(() => questions.map(() => 0))
  const [secondsLeft, setSecondsLeft] = useState(timed ? timeLimitMin * 60 : 0)
  const qStart = useRef<number>(Date.now())

  const accumulateTime = useCallback((i: number) => {
    const dt = Date.now() - qStart.current
    qStart.current = Date.now()
    setTimes((prev) => {
      const next = [...prev]
      next[i] += dt
      return next
    })
  }, [])

  // reset clock when question changes
  useEffect(() => {
    qStart.current = Date.now()
  }, [index])

  const finish = useCallback(() => {
    accumulateTime(index)
    // exam mode: commit answers to the store now
    if (mode === 'exam') {
      questions.forEach((q, i) => {
        const sel = answers[i]
        if (sel !== null) actions.recordAnswer(q.id, sel === q.correctAnswerIndex, q.isRedFlagQuestion, sel)
      })
    }
    const correct = questions.reduce((n, q, i) => n + (answers[i] === q.correctAnswerIndex ? 1 : 0), 0)
    actions.addSession({
      id: `s-${Date.now()}`,
      startedAt: Date.now(),
      finishedAt: Date.now(),
      specialty,
      mode,
      total: questions.length,
      correct,
      questionIds: questions.map((q) => q.id),
    })
    setPhase('report')
  }, [accumulateTime, index, mode, questions, answers, specialty])

  // countdown timer
  useEffect(() => {
    if (!timed || phase !== 'play') return
    if (secondsLeft <= 0) {
      finish()
      return
    }
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [timed, phase, secondsLeft, finish])

  const report = useMemo(() => {
    if (phase !== 'report') return null
    const logs: AnswerLog[] = questions.map((q, i) => ({
      questionId: q.id,
      selectedIndex: answers[i],
      correct: answers[i] === q.correctAnswerIndex,
      timeMs: times[i],
    }))
    const confById: Record<string, string | undefined> = {}
    questions.forEach((q, i) => (confById[q.id] = confidences[i]))
    return buildReport(logs, confById)
  }, [phase, questions, answers, times, confidences])

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-20 text-center text-slate-300">
        <p>No questions to show.</p>
        <button onClick={onExit} className="mt-4 text-teal-300 hover:underline">← Back</button>
      </div>
    )
  }

  // ---------- REPORT ----------
  if (phase === 'report' && report) {
    return (
      <>
        <FinalScoreReport
          report={report}
          isMixed={specialty === 'Mixed'}
          onReviewWrong={onReviewWrong}
          onReviewRedFlag={onReviewRedFlag}
          onRepeat={onRepeat}
          onPracticeWeak={() => onPracticeWeak(report.weakTopics.map((t) => t.label))}
          onNewCustom={onNewCustom}
          onDashboard={onExit}
        />
        <div className="text-center pb-10">
          <button onClick={() => { setIndex(0); setPhase('examReview') }} className="text-sm text-teal-300 hover:underline">
            Review all answers & explanations →
          </button>
        </div>
      </>
    )
  }

  const q = questions[index]
  const selected = answers[index]
  const isLast = index + 1 >= questions.length
  const reviewing = phase === 'examReview'
  const revealed = reviewing || (mode === 'study' && selected !== null)

  function handleSelect(i: number) {
    if (answers[index] !== null && (mode === 'study' || reviewing)) return
    const next = [...answers]
    next[index] = i
    setAnswers(next)
    if (mode === 'study') {
      actions.recordAnswer(q.id, i === q.correctAnswerIndex, q.isRedFlagQuestion, i)
    }
  }

  function handleConfidence(c: Confidence) {
    const next = [...confidences]
    next[index] = c
    setConfidences(next)
    actions.setConfidence(q.id, c)
  }

  function go(delta: number) {
    accumulateTime(index)
    setIndex((n) => Math.min(Math.max(n + delta, 0), questions.length - 1))
  }

  const answeredCount = answers.filter((a) => a !== null).length
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const ss = String(secondsLeft % 60).padStart(2, '0')

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-6">
      <div className="flex items-center justify-between gap-4 mb-4">
        <button onClick={onExit} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white rounded-lg px-2.5 py-1.5 hover:bg-white/10 transition">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          Exit
        </button>
        <div className="flex items-center gap-3">
          {timed && phase === 'play' && (
            <span className={`text-sm font-bold tabular-nums px-2.5 py-1 rounded-lg ring-1 ${secondsLeft < 60 ? 'bg-rose-500/15 ring-rose-400/40 text-rose-200' : 'bg-white/5 ring-white/10 text-slate-200'}`}>
              {mm}:{ss}
            </span>
          )}
          <div className="text-right">
            <div className="text-sm font-bold text-white">{label}</div>
            <div className="text-[11px] text-slate-400">
              {reviewing ? 'Review · ' : `${mode === 'exam' ? 'Exam' : 'Study'} · `}Question {index + 1} of {questions.length}
            </div>
          </div>
        </div>
      </div>

      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-6">
        <div className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-300" style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
      </div>

      <div className="rounded-2xl bg-navy-800/50 ring-1 ring-white/10 backdrop-blur p-6 sm:p-7">
        <QuestionView
          mcq={q}
          revealed={revealed}
          selectedIndex={selected}
          onSelect={handleSelect}
          confidence={confidences[index]}
          onConfidence={handleConfidence}
          showConfidence={mode === 'study' && !reviewing}
        />

        {/* nav */}
        <div className="mt-7 flex items-center justify-between gap-3">
          <div>
            {(mode === 'exam' || reviewing) && index > 0 && (
              <button onClick={() => go(-1)} className="rounded-xl bg-white/5 ring-1 ring-white/15 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10 transition">Previous</button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {mode === 'exam' && !reviewing && (
              <span className="text-xs text-slate-400 mr-1">{answeredCount}/{questions.length} answered</span>
            )}
            {reviewing ? (
              isLast ? (
                <button onClick={() => setPhase('report')} className="rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-navy-900 hover:brightness-110 transition">Back to report</button>
              ) : (
                <button onClick={() => go(1)} className="rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-navy-900 hover:brightness-110 transition">Next</button>
              )
            ) : mode === 'study' ? (
              selected !== null && (
                isLast ? (
                  <button onClick={finish} className="rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-navy-900 hover:brightness-110 transition animate-pop">Finish & see score</button>
                ) : (
                  <button onClick={() => go(1)} className="rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-navy-900 hover:brightness-110 transition animate-pop">Next question</button>
                )
              )
            ) : (
              isLast ? (
                <button onClick={finish} className="rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-navy-900 hover:brightness-110 transition">Finish exam</button>
              ) : (
                <button onClick={() => go(1)} className="rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-navy-900 hover:brightness-110 transition">Next</button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
