'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

import Breadcrumb from '@/features/modules/components/Breadcrumb'
import ModuleFirstContent from '@/features/modules/components/ModuleFirstContent'
import ModuleSecondContent from '@/features/modules/components/ModuleSecondContent'
import { useModule } from '@/features/modules/hooks/useModules'
import { JsIcon, HTMLIcon, CssIcon } from '@/icons'

const ModulesPage = () => {
  const pathname = usePathname()
  const match = pathname.match(/module-(.+)/)
  let moduleIndex: string | undefined

  if (match) {
    moduleIndex = match[1]
  }

  const { data: session } = useSession()
  const userId = session?.user?.id
  const { data: module } = useModule(moduleIndex, userId)

  const moduleProgress = (() => {
    if (!module) return 0

    if (typeof module.progress === 'number') return module.progress

    if (module.sprints && Array.isArray(module.sprints)) {
      let total = 0
      let completed = 0
      module.sprints.forEach((s: any) => {
        const sprintTotal =
          s.totalTasks ??
          (s.activities && Array.isArray(s.activities)
            ? s.activities.length
            : 0)
        const sprintCompleted = s.completedCount ?? 0
        total += sprintTotal
        completed += sprintCompleted
      })
      if (total === 0) return 0
      return Math.round((completed / total) * 100)
    }

    return 0
  })()

  const moduleTechsFromApi = (() => {
    if (!module?.sprints || !Array.isArray(module.sprints)) return []

    const iconMap: Record<string, React.ComponentType> = {
      JavaScript: JsIcon,
      HTML: HTMLIcon,
      CSS: CssIcon,
    }

    const seen = new Set<string>()
    const techs: { name: string; description?: string }[] = []

    module.sprints.forEach((s: any) => {
      const tlist = s.technologies ?? []
      tlist.forEach((t: any) => {
        if (!t || !t.name) return
        if (seen.has(t.name)) return
        seen.add(t.name)
        techs.push({ name: t.name, description: t.description })
      })
    })

    return techs.map((t) => ({
      techTitle: t.name,
      techIcon: iconMap[t.name] ?? HTMLIcon,
      techDescription: t.description ?? '',
    }))
  })()

  let moduleSprints = 0
  if (module?.sprints && Array.isArray(module.sprints)) {
    moduleSprints = module.sprints.length
  }

  let totalActivities = 0

  if (module?.sprints && Array.isArray(module.sprints)) {
    module.sprints.forEach((sprint) => {
      if (sprint.activities && Array.isArray(sprint.activities)) {
        totalActivities += sprint.activities.length
      }
    })
  }

  let totalDuration = 0

  if (module?.sprints && Array.isArray(module.sprints)) {
    module.sprints.forEach((sprint) => {
      if (sprint.duration) {
        totalDuration += sprint.duration
      }
    })
  }

  let sprintsToPass: any[] = []
  if (module?.sprints && Array.isArray(module.sprints)) {
    sprintsToPass = module.sprints
  }

  return (
    <div className='flex w-full flex-col justify-center gap-6 p-8 text-white lg:px-8'>
      <Breadcrumb moduleTitle={module?.name} />
      <ModuleFirstContent
        moduleNumber={module?.moduleIndex ?? 0}
        moduleName={module?.name}
        numberOfSprints={moduleSprints}
        numberOfLessons={totalActivities}
        difficultyLevel={module?.difficultyLevel ?? ''}
        timeToFinish={totalDuration}
        moduleDescription={module?.description}
        progress={moduleProgress}
        moduleVideo={module?.moduleVideo}
      />
      <ModuleSecondContent
        moduleNumber={module?.moduleIndex ?? 0}
        moduleName={module?.name ?? ''}
        moduleInput={module?.input ?? ''}
        moduleOutput={module?.output ?? ''}
        moduleTechs={(moduleTechsFromApi.length && moduleTechsFromApi) || []}
        sprints={sprintsToPass}
      />
    </div>
  )
}

export default ModulesPage
