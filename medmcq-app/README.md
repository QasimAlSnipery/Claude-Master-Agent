# ClinicalQ Bank — Surgery Edition (v1.0)

A modern, case-based medical MCQ trainer. Version 1 ships the **Surgery** question
bank (62 clinical vignettes) generated from the Surgery lecture batch (Weeks 1–8).
Medicine, Pediatrics, Gynecology and Primary Care appear on the dashboard as
**Coming Soon** and are ready to be switched on once their banks are added.

## Stack
React 18 · TypeScript · Vite · Tailwind CSS v3.

## Run locally
```bash
cd medmcq-app
npm install
npm run dev      # http://localhost:5173
```
Production build:
```bash
npm run build    # type-checks + bundles to dist/
npm run preview  # serve the production build
```

## How it works
- **Dashboard** (`src/pages/Dashboard.tsx`) — hero + five specialty cards. Surgery is
  active; the rest are locked.
- **Quiz** (`src/pages/SurgeryQuiz.tsx`) — pulls the bank for the chosen specialty,
  shows one **randomized** question at a time (Fisher–Yates shuffle, reshuffles when the
  bank is exhausted). Tracks answered / correct / wrong / percentage and progress, with a
  **Reset session** button.
- On answering, an **ExplanationPanel** reveals: correct/incorrect verdict, the correct
  answer, why it's right, an option-by-option breakdown, a **clinical pearl**, and the
  **source lecture + topic**. Correct = green, your wrong pick = red.

## Project structure
```
src/
  components/
    Icon.tsx              # shared stroke-icon renderer
    SpecialtyCard.tsx     # dashboard card (active / coming-soon states)
    QuestionCard.tsx      # stem + options + answer states
    ExplanationPanel.tsx  # verdict, explanations, pearl, source
    ScorePanel.tsx        # live stats + reset + progress bar
  data/
    types.ts              # MCQ + SpecialtyMeta interfaces
    surgeryQuestions.ts   # the 62-question Surgery bank
    specialties.ts        # specialty registry + questionBanks map
  pages/
    Dashboard.tsx
    SurgeryQuiz.tsx        # generic quiz engine (works for any specialty)
  App.tsx                  # top bar + view switching
  main.tsx
```

## Adding a new specialty
1. Create `src/data/medicineQuestions.ts` (copy the shape of `surgeryQuestions.ts`).
2. Register it in `src/data/specialties.ts`:
   ```ts
   import { medicineQuestions } from './medicineQuestions'
   export const questionBanks = { Surgery: surgeryQuestions, Medicine: medicineQuestions }
   ```
3. Flip `available: true` on that specialty's entry in the `specialties` array.

That's it — the quiz engine, scoring, randomization and explanation UI are already
specialty-agnostic, so the new bank lights up automatically.

## Question data model
Each MCQ: `id`, `specialty`, `sourceLecture`, `topic`, `question`, 5 `options`,
`correctAnswerIndex`, `explanation`, per-option `wrongAnswerExplanations[]`, and a
`clinicalPearl`.
