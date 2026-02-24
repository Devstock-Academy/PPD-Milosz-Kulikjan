import React from 'react'
import { useTranslations } from 'next-intl'

import type { ModuleTechItem, SprintDetails } from '@/features/modules/types'
import { TabSkeleton } from '@/features/task'

import ModuleDescription from './ModuleDescription'
import SprintsList from './SprintsList'

type ModuleSecondContentProps = {
  moduleNumber: number
  moduleName: string
  moduleInput: string
  moduleOutput: string
  moduleTechs: ModuleTechItem[]
  sprints: SprintDetails[]
}

const ModuleSecondContent = ({
  moduleNumber,
  moduleName,
  moduleInput,
  moduleOutput,
  moduleTechs,
  sprints,
}: ModuleSecondContentProps) => {
  const t = useTranslations('Modules')

  return (
    <div>
      <TabSkeleton
        noHeaderBg={true}
        tabs={[
          { label: t('moduleDescriptionTab') },
          { label: t('sprintsListTab') },
        ]}
      >
        <ModuleDescription
          moduleNumber={moduleNumber}
          moduleName={moduleName}
          moduleInput={moduleInput}
          moduleOutput={moduleOutput}
          moduleTechs={moduleTechs}
        />
        <SprintsList sprints={sprints} />
      </TabSkeleton>
    </div>
  )
}

export default ModuleSecondContent
