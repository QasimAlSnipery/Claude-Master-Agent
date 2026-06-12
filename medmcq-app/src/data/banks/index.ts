/**
 * Auto-aggregates every rich-schema JSON batch in this folder (written by the
 * multi-specialty generation workflow). Drop a new `*.json` array here and it is
 * picked up automatically. Items use `clinicalStem`; normalization happens in specialties.ts.
 */
const modules = import.meta.glob('./*.json', { eager: true }) as Record<
  string,
  { default: unknown[] }
>

export const rawBankQuestions: Record<string, unknown>[] = (() => {
  const out: Record<string, unknown>[] = []
  for (const path in modules) {
    const arr = modules[path]?.default
    if (Array.isArray(arr)) out.push(...(arr as Record<string, unknown>[]))
  }
  return out
})()
