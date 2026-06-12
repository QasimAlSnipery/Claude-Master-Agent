import { useState } from 'react'
import type { Specialty } from './data/types'
import { Dashboard } from './pages/Dashboard'
import { SurgeryQuiz } from './pages/SurgeryQuiz'

export default function App() {
  const [active, setActive] = useState<Specialty | null>(null)

  return (
    <div className="min-h-screen">
      {/* slim top brand bar */}
      <div className="border-b border-white/10 bg-navy-900/40 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <button
            onClick={() => setActive(null)}
            className="flex items-center gap-2.5 group"
          >
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 text-navy-900">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 3v6a4 4 0 0 0 8 0V3M10 13v3a5 5 0 0 0 10 0v-3M20 10a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" /></svg>
            </span>
            <span className="font-bold text-white tracking-tight group-hover:text-teal-200 transition">
              ClinicalQ Bank
            </span>
          </button>
          <span className="text-xs text-slate-400 hidden sm:block">Surgery edition · v1.0</span>
        </div>
      </div>

      {active === null ? (
        <Dashboard onSelectSpecialty={setActive} />
      ) : (
        <SurgeryQuiz specialty={active} onBack={() => setActive(null)} />
      )}
    </div>
  )
}
