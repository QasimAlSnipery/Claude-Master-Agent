import { useState } from 'react'
import type { Specialty } from './data/types'
import { Dashboard } from './pages/Dashboard'
import { SystemSelect } from './pages/SystemSelect'
import { Quiz } from './pages/Quiz'

type View =
  | { name: 'dashboard' }
  | { name: 'systems'; specialty: Specialty }
  | { name: 'quiz'; specialty: Specialty; system: string | 'all' }

export default function App() {
  const [view, setView] = useState<View>({ name: 'dashboard' })

  return (
    <div className="min-h-screen">
      {/* slim top brand bar */}
      <div className="border-b border-white/10 bg-navy-900/40 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <button onClick={() => setView({ name: 'dashboard' })} className="flex items-center gap-2.5 group">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 text-navy-900">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 3v6a4 4 0 0 0 8 0V3M10 13v3a5 5 0 0 0 10 0v-3M20 10a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" /></svg>
            </span>
            <span className="font-bold text-white tracking-tight group-hover:text-teal-200 transition">ClinicalQ Bank</span>
          </button>
          <span className="text-xs text-slate-400 hidden sm:block">Surgery edition · v1.1</span>
        </div>
      </div>

      {view.name === 'dashboard' && (
        <Dashboard onSelectSpecialty={(specialty) => setView({ name: 'systems', specialty })} />
      )}

      {view.name === 'systems' && (
        <SystemSelect
          onBack={() => setView({ name: 'dashboard' })}
          onSelectSystem={(system) => setView({ name: 'quiz', specialty: view.specialty, system })}
        />
      )}

      {view.name === 'quiz' && (
        <Quiz
          systemKey={view.system}
          onBack={() => setView({ name: 'systems', specialty: view.specialty })}
        />
      )}
    </div>
  )
}
