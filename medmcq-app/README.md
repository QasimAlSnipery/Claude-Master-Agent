# ClinicalQ Bank — Surgery Edition (v1.1)

A modern, case-based medical MCQ trainer. This version ships a **Surgery** bank of
**582 clinical vignettes**, classified by **organ system**, generated from the Surgery
lecture batch (Weeks 1–8). Medicine, Pediatrics, Gynecology and Primary Care appear on
the dashboard as **Coming Soon** and are ready to switch on once their banks are added.

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

## User flow
1. **Dashboard** — five specialty cards. Surgery is active; the rest are locked.
2. **Organ-system menu** — 9 systems (each with its live question count) plus a
   **Mixed paper — all systems** option.
3. **Question-count picker** — 10 / 20 / 30 / 50 / 100 / All, capped to what the chosen
   system actually has.
4. **Quiz** — a freshly randomized set with **no repeats within the set**. Each question:
   pick the single best answer → immediate green/red feedback → full **ExplanationPanel**
   (why correct, option-by-option, **clinical pearl**, **source lecture + topic**).
5. **Final score screen** — circular percentage, verdict band, correct/wrong/total, and
   buttons to reshuffle a new set, change length/system, or return to the dashboard.

Every set is randomized on entry, so the same questions don't repeat back-to-back.

## Organ systems (Surgery)
Gastrointestinal · Hepatobiliary, Pancreas & Spleen · Breast & Endocrine ·
Vascular & Lymphatic · Trauma & Critical Care · Orthopaedics & MSK · Cardiothoracic ·
Perioperative & Anaesthesia · Surgical Principles & Oncology.

## Project structure
```
src/
  components/
    Icon.tsx              # shared stroke-icon renderer
    SpecialtyCard.tsx     # dashboard card (active / coming-soon)
    SystemCard.tsx        # organ-system card
    QuestionCard.tsx      # stem + options + answer states
    ExplanationPanel.tsx  # verdict, explanations, pearl, source
    Results.tsx           # final score screen
  data/
    types.ts              # MCQ + SpecialtyMeta interfaces
    systems.ts            # organ-system taxonomy + auto-classifier
    surgeryQuestions.ts   # 62 hand-written seed questions
    generated/
      index.ts            # import.meta.glob — auto-aggregates every *.json batch
      *.json              # 40 system-tagged question batches (520 questions)
    specialties.ts        # merges + de-duplicates + classifies the full bank
  pages/
    Dashboard.tsx
    SystemSelect.tsx      # organ-system menu
    Quiz.tsx              # count picker → play (no repeats) → results
  App.tsx                 # view state machine
  main.tsx
```

## How questions are stored & classified
- Hand-written seed questions live in `surgeryQuestions.ts`.
- Generated questions are plain **JSON arrays** under `data/generated/`. `generated/index.ts`
  uses `import.meta.glob('./*.json')` to pick up **any** batch file automatically — no edits.
- `specialties.ts` merges seed + generated, drops duplicate stems, and assigns each
  question an organ-system key (`systems.ts` `classifySystem()` derives it from the
  source lecture / topic when not already set).

## Adding more questions
Drop a new `data/generated/whatever.json` file — an array of objects with keys
`system, sourceLecture, topic, question, options[5], correctAnswerIndex,
explanation, wrongAnswerExplanations[5], clinicalPearl`. It's picked up on next build.

## Adding a new specialty
1. Create `data/medicineQuestions.ts` (same shape as `surgeryQuestions.ts`) or a
   `generated/`-style JSON folder.
2. Register it in `specialties.ts` `questionBanks`.
3. Flip `available: true` on that specialty in the `specialties` array.

The quiz engine, randomization, scoring and explanation UI are specialty-agnostic, so a
new bank lights up automatically.

## Question data model
`id`, `specialty`, `system`, `sourceLecture`, `topic`, `question`, 5 `options`,
`correctAnswerIndex`, `explanation`, per-option `wrongAnswerExplanations[]`, `clinicalPearl`.
