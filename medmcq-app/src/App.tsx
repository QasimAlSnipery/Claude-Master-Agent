import { useState } from 'react'
import type { Specialty, MCQ } from './data/types'
import { allQuestions, questionsForSpecialty } from './data/specialties'
import { shuffle } from './utils/quiz'
import { Header } from './components/layout/Header'
import { Dashboard } from './pages/Dashboard'
import { SpecialtyPage } from './pages/SpecialtyPage'
import { QuizBuilder } from './pages/QuizBuilder'
import { Quiz, type QuizConfig } from './pages/Quiz'
import { ReviewHub, type ReviewView } from './pages/ReviewHub'
import { ReviewList } from './pages/ReviewList'

type Route =
  | { v: 'dashboard' }
  | { v: 'specialty'; specialty: Specialty }
  | { v: 'builder'; specialty: Specialty | 'Mixed' }
  | { v: 'quiz'; config: QuizConfig }
  | { v: 'reviewHub' }
  | { v: 'reviewList'; view: ReviewView }

export default function App() {
  const [route, setRoute] = useState<Route>({ v: 'dashboard' })

  const go = (r: Route) => {
    setRoute(r)
    window.scrollTo({ top: 0 })
  }

  function quickStudy(specialty: Specialty, count = 20) {
    const pool = questionsForSpecialty(specialty)
    go({
      v: 'quiz',
      config: { questions: shuffle(pool).slice(0, Math.min(count, pool.length)), mode: 'study', timed: false, timeLimitMin: 20, label: specialty, specialty },
    })
  }

  function practiceQuestions(questions: MCQ[], label: string, specialty: Specialty | 'Mixed' = 'Mixed') {
    if (!questions.length) return
    go({ v: 'quiz', config: { questions: shuffle(questions), mode: 'study', timed: false, timeLimitMin: 20, label, specialty } })
  }

  const headerActive: 'dashboard' | 'builder' | 'review' | 'quiz' | 'specialty' =
    route.v === 'builder' ? 'builder'
      : route.v === 'reviewHub' || route.v === 'reviewList' ? 'review'
      : route.v === 'quiz' ? 'quiz'
      : route.v === 'specialty' ? 'specialty'
      : 'dashboard'

  return (
    <div className="min-h-screen">
      <Header
        onHome={() => go({ v: 'dashboard' })}
        onCustom={() => go({ v: 'builder', specialty: 'Mixed' })}
        onReview={() => go({ v: 'reviewHub' })}
        active={headerActive}
      />

      {route.v === 'dashboard' && (
        <Dashboard
          onOpenSpecialty={(s) => go({ v: 'specialty', specialty: s })}
          onReviewHub={() => go({ v: 'reviewHub' })}
          onContinue={(s) => quickStudy(s)}
        />
      )}

      {route.v === 'specialty' && (
        <SpecialtyPage
          specialty={route.specialty}
          onBack={() => go({ v: 'dashboard' })}
          onStart={(config) => go({ v: 'quiz', config })}
          onCustom={() => go({ v: 'builder', specialty: route.specialty })}
        />
      )}

      {route.v === 'builder' && (
        <QuizBuilder
          initialSpecialty={route.specialty}
          onBack={() => go({ v: 'dashboard' })}
          onStart={(config) => go({ v: 'quiz', config })}
        />
      )}

      {route.v === 'quiz' && (
        <Quiz
          config={route.config}
          onExit={() => go({ v: 'dashboard' })}
          onReviewWrong={() => go({ v: 'reviewList', view: 'wrong' })}
          onReviewRedFlag={() => go({ v: 'reviewList', view: 'redFlag' })}
          onRepeat={() =>
            go({ v: 'quiz', config: { ...route.config, questions: shuffle(route.config.questions) } })
          }
          onPracticeWeak={(topics) => {
            const set = new Set(topics)
            const pool = allQuestions.filter((q) => set.has(q.topic))
            practiceQuestions(pool, 'Weak topics', route.config.specialty)
          }}
          onNewCustom={() => go({ v: 'builder', specialty: 'Mixed' })}
        />
      )}

      {route.v === 'reviewHub' && (
        <ReviewHub onBack={() => go({ v: 'dashboard' })} onOpen={(view) => go({ v: 'reviewList', view })} />
      )}

      {route.v === 'reviewList' && (
        <ReviewList
          view={route.view}
          onBack={() => go({ v: 'reviewHub' })}
          onPractice={(qs, label) => practiceQuestions(qs, label)}
          onOpenSingle={(q) => practiceQuestions([q], q.topic, q.specialty)}
        />
      )}
    </div>
  )
}
