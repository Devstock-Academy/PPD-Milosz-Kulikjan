import type { ComponentType } from 'react'

type ModuleTechItem = {
  techTitle: string
  techIcon: ComponentType
  techDescription: string
}

type SprintDetails = {
  sprintNumber: number
  sprintName: string
  sprintDescription: string
  numberOfLessons: number
  timeToComplete: number
  difficultyLevel: string
  techs: string[]
  sprintPhoto: string
  sprintProgress: number
}

export type { ModuleTechItem, SprintDetails }
