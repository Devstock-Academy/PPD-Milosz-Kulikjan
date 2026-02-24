import type { ComponentType } from 'react'

export type Difficulty = 'easy' | 'medium' | 'hard'

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
  difficultyLevel: Difficulty
  techs: string[]
  sprintPhoto: string
  sprintProgress: number
  tickets?: TicketProps[]
}

type TicketProps = {
  ticketName: string
  ticketNumber: number
  ticketDifficultyLevel: Difficulty
  ticketCategory: string
  ticketTaskType: string
  ticketKanbanStatus: string
  ticketCheckResult?: string
}

export type { ModuleTechItem, SprintDetails, TicketProps }
