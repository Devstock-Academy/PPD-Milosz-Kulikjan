'use client'

import { JsIcon } from '@/icons'
import type { ModuleTechItem, SprintDetails } from '@/features/modules/types'

type ModuleDetails = {
  moduleNumber: number
  moduleName: string
  moduleInput: string
  moduleDescription: string
  moduleOutput: string
  moduleTechs: ModuleTechItem[]
  sprints: SprintDetails[]
  numberOfSprints: number
  numberOfLessons: number
  difficultyLevel: string
  timeToFinish: number
}

const useModuleDetails = (): ModuleDetails => {
  return {
    moduleNumber: 1,
    moduleName: 'HTML',
    moduleInput:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    moduleOutput:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    moduleTechs: [
      {
        techTitle: 'Tech',
        techIcon: JsIcon,
        techDescription:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
      },
      {
        techTitle: 'Tech',
        techIcon: JsIcon,
        techDescription:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
      },
      {
        techTitle: 'Tech',
        techIcon: JsIcon,
        techDescription:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
      },
      {
        techTitle: 'Tech',
        techIcon: JsIcon,
        techDescription:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
      },
      {
        techTitle: 'Tech',
        techIcon: JsIcon,
        techDescription:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
      },
      {
        techTitle: 'Tech',
        techIcon: JsIcon,
        techDescription:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
      },
    ],
    sprints: [
      {
        sprintNumber: 1,
        sprintName: 'Tytuł Sprintu',
        sprintDescription:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        numberOfLessons: 12,
        timeToComplete: 8,
        difficultyLevel: 'Łatwy',
        techs: ['HTML', 'HTML', 'HTML'],
        sprintPhoto: '/images/SprintPhoto.webp',
        sprintProgress: 100,
      },
      {
        sprintNumber: 1,
        sprintName: 'Tytuł Sprintu',
        sprintDescription:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        numberOfLessons: 12,
        timeToComplete: 8,
        difficultyLevel: 'Łatwy',
        techs: ['HTML', 'HTML', 'HTML'],
        sprintPhoto: '/images/SprintPhoto.webp',
        sprintProgress: 100,
      },
    ],
    numberOfSprints: 6,
    numberOfLessons: 48,
    difficultyLevel: 'Łatwy',
    timeToFinish: 40,
    moduleDescription:
      ' Krótki opis, krótki opis krótki opis krótki opis krótki opis krótkiopis krótki opis krótki opis krótki opis krótki opis krótki opiskrótki opis krótki opisKrótki opis, krótki opis krótki opis krótkiopis krótki opis krótki opis krótki opis krótki opis krótki opiskrótki opis krótki opis krótki opis krótki opis',
  }
}

export default useModuleDetails
