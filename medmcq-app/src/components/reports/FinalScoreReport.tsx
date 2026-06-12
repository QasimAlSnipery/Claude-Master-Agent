import type { QuizReport, Breakdown } from '../../utils/analytics'

interface Props {
  report: QuizReport
  isMixed: boolean
  onReviewWrong: () => void
  onReviewRedFlag: () => void
  onRepeat: () => void
  onPracticeWeak: () => void
  onNewCustom: () => void
  onDashboard: () => void
}

function fmtTime(ms: number): string {
  const s = Math.round(ms / 1000)
  const m = Math.floor(s / 60)
  return m > 0 ? `${m}m ${s % 60}s` : `${s}s`
}

function Bars({ title, data }: { title: string; data: Breakdown[] }) {
  if (!data.length) return null
  return (
    <div>
      <h4 className="text-sm font-bold text-slate-200 mb-2.5">{title}</h4>
      <div className="space-y-2">
        {data.map((b) => (
          <div key={b.label}>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span className="truncate pr-2">{b.label}</span>
              <span>{b.correct}/{b.total} · {b.pct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full rounded-full ${b.pct >= 70 ? 'bg-emerald-400' : b.pct >= 50 ? 'bg-amber-400' : 'bg-rose-400'}`}
                style={{ width: `${b.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function FinalScoreReport({
  report,
  isMixed,
  onReviewWrong,
  onReviewRedFlag,
  onRepeat,
  onPracticeWeak,
  onNewCustom,
  onDashboard,
}: Props) {
  const { scorePct } = report
  const r = 54
  const c = 2 * Math.PI * r
  const dash = (scorePct / 100) * c
  const verdict = scorePct >= 80 ? 'Excellent' : scorePct >= 60 ? 'Solid pass' : scorePct >= 50 ? 'Borderline' : 'Needs work'
  const tone = scorePct >= 80 ? 'text-emerald-300' : scorePct >= 60 ? 'text-teal-300' : scorePct >= 50 ? 'text-amber-300' : 'text-rose-300'

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-8 animate-fade-up">
      <h2 className="text-2xl font-extrabold text-white mb-6 text-center">Final score report</h2>

      <div className="grid md:grid-cols-[260px_1fr] gap-6 items-start">
        {/* score ring + headline stats */}
        <div className="rounded-2xl bg-navy-800/60 ring-1 ring-white/10 p-6 text-center">
          <div className="relative w-40 h-40 mx-auto mb-4">
            <svg className="w-40 h-40 -rotate-90" viewBox="0 0 128 128">
              <circle cx="64" cy="64" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="11" />
              <circle cx="64" cy="64" r={r} fill="none" stroke="url(#sg)" strokeWidth="11" strokeLinecap="round" strokeDasharray={`${dash} ${c}`} />
              <defs>
                <linearGradient id="sg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2dd4bf" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              <div>
                <div className="text-4xl font-extrabold text-white leading-none">{scorePct}%</div>
                <div className={`text-xs font-semibold mt-1 ${tone}`}>{verdict}</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div><div className="text-lg font-bold text-emerald-300">{report.correct}</div><div className="text-[10px] uppercase text-slate-400">Correct</div></div>
            <div><div className="text-lg font-bold text-rose-300">{report.wrong}</div><div className="text-[10px] uppercase text-slate-400">Wrong</div></div>
            <div><div className="text-lg font-bold text-slate-300">{report.unanswered}</div><div className="text-[10px] uppercase text-slate-400">Skipped</div></div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 text-xs text-slate-400 space-y-1">
            <div className="flex justify-between"><span>Total questions</span><span className="text-slate-200">{report.total}</span></div>
            <div className="flex justify-between"><span>Time spent</span><span className="text-slate-200">{fmtTime(report.totalTimeMs)}</span></div>
            <div className="flex justify-between"><span>Avg / question</span><span className="text-slate-200">{fmtTime(report.avgTimeMs)}</span></div>
            <div className="flex justify-between"><span>Guessed</span><span className="text-slate-200">{report.guessed}</span></div>
            <div className="flex justify-between"><span>Unsure</span><span className="text-slate-200">{report.unsure}</span></div>
          </div>
        </div>

        {/* breakdowns */}
        <div className="space-y-5">
          {report.redFlagMisses.length > 0 && (
            <div className="rounded-xl border border-red-500/40 bg-red-950/40 ring-1 ring-red-500/30 p-4">
              <h4 className="text-sm font-bold uppercase tracking-wide text-red-200 mb-1">⚠ {report.redFlagMisses.length} red-flag mistake{report.redFlagMisses.length > 1 ? 's' : ''}</h4>
              <p className="text-sm text-red-50/90">You missed dangerous clinical decisions. Review them before anything else.</p>
              <ul className="mt-2 text-xs text-red-100/80 list-disc pl-5 space-y-0.5">
                {report.redFlagMisses.slice(0, 4).map((q) => <li key={q.id}>{q.topic}</li>)}
              </ul>
            </div>
          )}
          <div className="rounded-2xl bg-navy-800/50 ring-1 ring-white/10 p-5 grid sm:grid-cols-2 gap-5">
            {isMixed && <Bars title="Accuracy by specialty" data={report.bySpecialty} />}
            <Bars title="Accuracy by difficulty" data={report.byDifficulty} />
            <Bars title="Accuracy by question type" data={report.byType} />
            <Bars title="Weakest topics" data={report.weakTopics} />
          </div>
          {report.missedConcepts.length > 0 && (
            <div className="rounded-2xl bg-navy-800/50 ring-1 ring-white/10 p-5">
              <h4 className="text-sm font-bold text-slate-200 mb-2">Missed concepts to revise</h4>
              <div className="flex flex-wrap gap-2">
                {report.missedConcepts.map((m, i) => (
                  <span key={i} className="text-xs rounded-full bg-white/8 ring-1 ring-white/15 px-2.5 py-1 text-slate-200">{m}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* actions */}
      <div className="mt-7 flex flex-wrap gap-2.5 justify-center">
        {report.wrong > 0 && (
          <button onClick={onReviewWrong} className="rounded-xl bg-rose-500/15 ring-1 ring-rose-400/40 px-4 py-2.5 text-sm font-semibold text-rose-100 hover:bg-rose-500/25 transition">Review wrong questions</button>
        )}
        {report.redFlagMisses.length > 0 && (
          <button onClick={onReviewRedFlag} className="rounded-xl bg-red-600/20 ring-1 ring-red-500/50 px-4 py-2.5 text-sm font-semibold text-red-100 hover:bg-red-600/30 transition">Review red-flag mistakes</button>
        )}
        <button onClick={onRepeat} className="rounded-xl bg-white/5 ring-1 ring-white/15 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10 transition">Repeat this quiz</button>
        {report.weakTopics.length > 0 && (
          <button onClick={onPracticeWeak} className="rounded-xl bg-white/5 ring-1 ring-white/15 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10 transition">Practice weak topics</button>
        )}
        <button onClick={onNewCustom} className="rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-4 py-2.5 text-sm font-semibold text-navy-900 hover:brightness-110 transition">New custom quiz</button>
        <button onClick={onDashboard} className="rounded-xl bg-white/5 ring-1 ring-white/15 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10 transition">Back to dashboard</button>
      </div>
    </div>
  )
}
