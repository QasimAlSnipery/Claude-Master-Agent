# ClinicalQ Bank — Medical MCQ Platform (v3.0)

A premium, case-based medical exam-prep platform. **~3,170 clinical MCQs** across all seven
specialties (≥400 each), with confidence tracking, red-flag review, a full custom quiz
builder, study & exam modes, a detailed score report, and local progress persistence.

## Stack
React 18 · TypeScript · Vite · Tailwind CSS v3. No backend — progress is stored in the browser.

## Run locally
```bash
cd medmcq-app
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production bundle in dist/
```

## Specialties (dashboard) — all seven active
| Specialty | Questions | Subspecialties |
|---|---|---|
| Surgery | 582 | 9 organ systems |
| Gynecology (Obstetrics & Gynaecology) | 456 | Obstetrics / Gynaecology |
| Pediatrics / Child Care | 454 | — |
| Psychiatry & Neurology | 439 | Psychiatry / Neurology |
| Medicine | 419 | Cardiology, Endocrinology, Gastroenterology, Respiratory, Radiology, Geriatric, Theory |
| Primary Care | 408 | Dermatology, Primary Health Care, Rheumatology |
| Special Surgeries | 404 | ENT, Ophthalmology, Plastic Surgery |

## Features
- **7-card dashboard** with global stats (answered, accuracy, today, bookmarked, wrong,
  red-flag, needs-review), continue-where-you-left-off, recommended weak area, and per-card
  completion %, accuracy % and weakest topic.
- **Study mode** — answer one at a time, instant feedback, full explanation (why correct,
  option-by-option, key clue, common exam trap, clinical pearl, source lecture), confidence
  rating, bookmark, mark-difficult and per-question notes.
- **Exam mode** — answer a whole set with no feedback, navigate freely, finish to a score
  report, then review every answer with explanations.
- **Confidence rating** — after each answer mark *I guessed / I was unsure / I knew it*.
  Guessed or unsure (even when correct) adds the question to **Needs review**; *I knew it* on
  a correct, not-repeatedly-missed question masters it.
- **Red-flag review** — questions involving dangerous/urgent decisions are flagged; getting
  one wrong shows an *Important clinical safety issue* box (why it's dangerous, the danger
  clue, the correct urgent action) and adds it to a dedicated **Red-Flag Review**.
- **Custom quiz builder** — filter by specialty, topic, subspecialty, difficulty, question
  type and status (all / new / wrong / bookmarked / needs-review / red-flag / recent /
  difficult), choose count, study or exam, timed/untimed, randomized/ordered. Live match
  count and graceful empty-state with one-tap filter relaxation.
- **Final score report** — score ring, correct/wrong/skipped, time + avg/question, accuracy
  by specialty/difficulty/type, weak topics, missed concepts, red-flag alert box, and action
  buttons (review wrong, review red-flag, repeat, practice weak topics, new custom, dashboard).
- **Review hub** — Wrong · Red-flag · Needs review · Bookmarked · Difficult · Recently
  answered, each practisable as a fresh quiz.
- **Local persistence** — answer history, attempts, bookmarks, confidence, review lists,
  notes and sessions survive refresh (localStorage `clinicalq:v2`).

## Data model
`MCQ` carries: `id, specialty, subspecialty, sourceLecture, sourceFile, topic, subtopic,
difficulty, questionType, question, options[], correctAnswerIndex, explanation,
wrongAnswerExplanations[], clinicalPearl, keyClue, commonExamTrap, missedConcept,
isRedFlagQuestion, redFlagReason, tags[]`. User progress (`QuestionProgress`) is stored
separately from question content.

## Project structure
```
src/
  components/
    Icon.tsx
    dashboard/SpecialtyCard.tsx
    layout/Header.tsx
    quiz/QuestionView.tsx · ConfidenceRating.tsx · RedFlagAlert.tsx
    reports/FinalScoreReport.tsx
  data/
    types.ts · systems.ts · specialties.ts        # taxonomy, normalization, dedup
    surgeryQuestions.ts                            # 62 hand-written seeds
    generated/  index.ts + *.json                  # 520 surgery batches (import.meta.glob)
    banks/      index.ts + *.json                  # 512 rich multi-specialty batches
  state/store.ts                                   # localStorage store (useSyncExternalStore)
  utils/analytics.ts · quiz.ts                     # stats, report, filters
  pages/
    Dashboard · SpecialtyPage · QuizBuilder · Quiz · ReviewHub · ReviewList
  App.tsx · main.tsx
```

## How content is generated & graded
Questions are produced by multi-agent generation grounded in the uploaded lecture files
(filename + topic), then merged, **de-duplicated by stem**, and normalized. Surgery is
sub-classified into organ systems; the new specialties carry rich tags (difficulty, type,
subspecialty, red-flag). Adding more is drop-in: put a `*.json` array in `data/banks/` and
it's picked up on the next build.

## Activating Medicine & Primary Care
No Medicine or Primary Care lecture batches were supplied (the "Primary health care" zip
contained Surgery week 8–9 duplicates). Both appear as **Coming soon**. Send those lecture
batches and they activate the same way — generate a `banks/*.json` set tagged with the
specialty; the card flips to active automatically.
