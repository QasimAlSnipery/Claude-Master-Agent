import type { MCQ } from '../types'

/**
 * Auto-aggregates every JSON batch in this folder (written by the generation workflow).
 * Drop a new `*.json` array here and it is picked up automatically — no edits needed.
 * Each object: { system, sourceLecture, topic, question, options[5], correctAnswerIndex,
 *                explanation, wrongAnswerExplanations[5], clinicalPearl }.
 */
const modules = import.meta.glob('./*.json', { eager: true }) as Record<
  string,
  { default: unknown[] }
>

const raw: Record<string, unknown>[] = []
for (const path in modules) {
  const arr = modules[path]?.default
  if (Array.isArray(arr)) raw.push(...(arr as Record<string, unknown>[]))
}

export const generatedQuestions: MCQ[] = raw.map((q, i) => ({
  id: `gen-${String(i + 1).padStart(4, '0')}`,
  specialty: 'Surgery',
  system: q.system as string | undefined,
  sourceLecture: (q.sourceLecture as string) ?? 'Surgery lecture',
  topic: (q.topic as string) ?? 'Surgery',
  question: q.question as string,
  options: q.options as string[],
  correctAnswerIndex: q.correctAnswerIndex as number,
  explanation: q.explanation as string,
  wrongAnswerExplanations: (q.wrongAnswerExplanations as string[]) ?? [],
  clinicalPearl: (q.clinicalPearl as string) ?? '',
}))
