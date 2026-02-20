'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import ModuleFirstContent from '@/features/modules/components/ModuleFirstContent'
import Breadcrumb from '@/features/modules/components/Breadcrumb'
import useModuleDetails from '@/features/modules/hooks/useModuleDetails'
import { TabSkeleton } from '@/features/task'
import { useTranslations } from 'next-intl'
import KanbanBoard from '@/features/modules/components/KanbanBoard'

const SprintPage = () => {
  const { moduleName, sprints } = useModuleDetails()
  const t = useTranslations('Task')

  const pathname = usePathname()
  const moduleMatch = pathname.match(/module-(\d+)/)
  const sprintMatch = pathname.match(/sprint-(\d+)/)
  const moduleId = moduleMatch && Number(moduleMatch[1])
  const sprintId = sprintMatch && Number(sprintMatch[1])

  const sprint = sprints.find((s) => s.sprintNumber === sprintId) ?? sprints[0]

  return (
    <div className='flex h-full w-full flex-col justify-center gap-6 p-8 text-white lg:px-8'>
      <Breadcrumb moduleTitle={moduleName} />
      <ModuleFirstContent
        moduleNumber={sprint.sprintNumber}
        moduleName={sprint.sprintName}
        numberOfLessons={sprint.numberOfLessons}
        difficultyLevel={sprint.difficultyLevel}
        timeToFinish={sprint.timeToComplete}
        showVideo={false}
        progress={sprint.sprintProgress}
        forSprint={true}
      />
      <div className='flex h-full w-full flex-col justify-center gap-6  text-white'>
        <TabSkeleton tabs={[{ label: t('tasksList') }]}>
          <KanbanBoard sprint={sprint} />
        </TabSkeleton>
      </div>
    </div>
  )
}

export default SprintPage
