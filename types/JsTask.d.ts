export type JsTaskTest = {
  input: string[]
  output: string
}

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
  tests: JsTaskTest[]
  patternFunction: string
  solutions?: Array<{ id: string; userId: string }>
}
