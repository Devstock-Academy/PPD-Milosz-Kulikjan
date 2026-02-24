'use client'

import React from 'react'
import Breadcrumb from '@/features/modules/components/Breadcrumb'
import ModuleFirstContent from '@/features/modules/components/ModuleFirstContent'
import ModuleSecondContent from '@/features/modules/components/ModuleSecondContent'
import useModuleDetails from '@/features/modules/hooks/useModuleDetails'

const ModulesPage = () => {
  const {
    moduleNumber,
    moduleName,
    moduleInput,
    moduleOutput,
    moduleTechs,
    sprints,
    numberOfSprints,
    numberOfLessons,
    difficultyLevel,
    timeToFinish,
    moduleDescription,
    moduleProgress,
  } = useModuleDetails()

  return (
    <div className='flex w-full flex-col justify-center gap-6 p-8 text-white lg:px-8'>
      <Breadcrumb moduleTitle={moduleName} />
      <ModuleFirstContent
        moduleNumber={moduleNumber}
        moduleName={moduleName}
        numberOfSprints={numberOfSprints}
        numberOfLessons={numberOfLessons}
        difficultyLevel={difficultyLevel}
        timeToFinish={timeToFinish}
        moduleDescription={moduleDescription}
        progress={moduleProgress}
      />
      <ModuleSecondContent
        moduleNumber={moduleNumber}
        moduleName={moduleName}
        moduleInput={moduleInput}
        moduleOutput={moduleOutput}
        moduleTechs={moduleTechs}
        sprints={sprints}
      />
    </div>
  )
}

export default ModulesPage
