'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useSession } from 'next-auth/react'

import ModuleFirstContent from '@/features/modules/components/ModuleFirstContent'
import Breadcrumb from '@/features/modules/components/Breadcrumb'
import { TabSkeleton } from '@/features/task'
import KanbanBoard from '@/features/modules/components/KanbanBoard'
import { useModule, useSprints } from '@/features/modules/hooks/useModules'

const SprintPage = () => {
  const t = useTranslations('Task')
  const { data: session } = useSession()

  const pathname = usePathname()
  const moduleMatch = pathname.match(/module-(\d+)/)
  const sprintMatch = pathname.match(/sprint-(\d+)/)

  let moduleIndex: string | undefined
  if (moduleMatch) {
    moduleIndex = moduleMatch[1]
  }
  let sprintNumber: number | undefined
  if (sprintMatch) {
    sprintNumber = Number(sprintMatch[1])
  }

  const userId = session?.user?.id

  const { data: module } = useModule(moduleIndex, userId)
  const { data: sprintsData } = useSprints(module?.id, userId)

  let sprintsArray: any[] = []

  if (sprintsData && sprintsData.sprints) {
    sprintsArray = sprintsData.sprints
  } else if (module && Array.isArray(module.sprints)) {
    sprintsArray = module.sprints
  }

  const sprint =
    sprintsArray.find((s: any) => s.sprintNumber === sprintNumber) ??
    sprintsArray[0]

  if (!sprint) {
    return <div className='p-8 text-white'>{t('loadingSprint')}</div>
  }

  let uiSprint: any = {
    sprintNumber: 0,
    sprintName: '',
    sprintDescription: '',
    numberOfLessons: 0,
    timeToComplete: 0,
    difficultyLevel: '',
    techs: [],
    sprintPhoto: '/images/SprintPhoto.webp',
    sprintProgress: 0,
    tickets: [],
  }

  if (sprint) {
    uiSprint.sprintNumber = sprint.sprintNumber
    uiSprint.sprintName = sprint.name || ''
    if (sprint.longDescription) {
      uiSprint.sprintDescription = sprint.longDescription
    } else if (sprint.shortDescription) {
      uiSprint.sprintDescription = sprint.shortDescription
    }

    if (Array.isArray(sprint.activities)) {
      uiSprint.numberOfLessons = sprint.activities.length
    } else if (sprint.totalTasks !== undefined) {
      uiSprint.numberOfLessons = sprint.totalTasks
    }

    uiSprint.timeToComplete = sprint.duration || 0
    uiSprint.difficultyLevel = sprint.difficultyLevel
      ? sprint.difficultyLevel.toString().toLowerCase()
      : ''

    if (Array.isArray(sprint.technologies)) {
      uiSprint.techs = sprint.technologies.map((t: any) => t.name)
    }

    if (sprint.sprintPhoto) {
      uiSprint.sprintPhoto = sprint.sprintPhoto
    }

    if (sprint.progress !== undefined) {
      uiSprint.sprintProgress = sprint.progress
    }

    if (Array.isArray(sprint.activities)) {
      uiSprint.tickets = sprint.activities.map((a: any, i: number) => {
        let ticketName = a.name || a.title
        if (!ticketName) {
          ticketName = `Zadanie ${i + 1}`
        }

        let ticketDifficultyLevel = 'easy'
        if (a.difficultyLevel) {
          ticketDifficultyLevel = a.difficultyLevel.toString().toLowerCase()
        }

        let ticketCategory = a.category || a.type
        if (a.category && typeof a.category !== 'string') {
          ticketCategory = a.category.toString()
        }

        let ticketKanbanStatus = 'todo'
        if (a.ticketKanbanStatus) {
          ticketKanbanStatus = a.ticketKanbanStatus
        }

        let ticketCheckResult = 'todo'
        if (a.ticketCheckResult) {
          ticketCheckResult = a.ticketCheckResult
        }

        return {
          ticketName,
          ticketNumber: i + 1,
          ticketId: a.id,
          ticketType: a.type,
          ticketDifficultyLevel,
          ticketCategory,
          ticketTaskType: 'Ćwiczenie',
          ticketKanbanStatus,
          ticketCheckResult,
        }
      })
    }
  }

  let numberOfSprints: number | undefined = undefined
  if (module && Array.isArray(module.sprints)) {
    numberOfSprints = module.sprints.length
  }

  return (
    <div className='flex h-full w-full flex-col justify-center gap-6 p-8 text-white lg:px-8'>
      <Breadcrumb moduleTitle={module?.name} />
      <ModuleFirstContent
        moduleNumber={uiSprint.sprintNumber}
        moduleName={uiSprint.sprintName}
        numberOfSprints={numberOfSprints}
        numberOfLessons={uiSprint.numberOfLessons}
        difficultyLevel={uiSprint.difficultyLevel}
        timeToFinish={uiSprint.timeToComplete}
        showVideo={false}
        progress={uiSprint.sprintProgress}
        forSprint={true}
      />
      <div className='flex h-full w-full flex-col justify-center gap-6  text-white'>
        <TabSkeleton tabs={[{ label: t('tasksList') }]}>
          <KanbanBoard sprint={uiSprint} />
        </TabSkeleton>
      </div>
    </div>
  )
}

export default SprintPage
