export type JsTaskTest = {
  input: string[]
  output: string
}

export type JsTaskSolution = {
  id: string
  userId: string
  kanbanStatus?: 'todo' | 'in-progress' | 'done'
  solution?: any[]
}

export type CssTaskSolution = {
  id: string
  userId: string
  result: number
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
  solutions?: JsTaskSolution[]
}

export type CssTask = {
  id: string
  name: string
  description: string
  category: 'SHAPES'
  difficultyLevel: 'EASY' | 'MEDIUM' | 'HARD'
  requirements: number
  colors: string[]
  targetUrl: string
  solutions?: CssTaskSolution[]
}

export type Task = JsTask | CssTask
