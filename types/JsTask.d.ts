export type JsTask = {
  id: string
  name: string
  descriptionStart: string
  descriptionEnd?: string
  category: 'FUNCTION' | 'LOOP'
  difficultyLevel: 'EASY' | 'MEDIUM' | 'HARD'
  submissions?: number
  sampleInput: string[]
  sampleOutput: string[]
  tests: any[]
  patternFunction: string
}
