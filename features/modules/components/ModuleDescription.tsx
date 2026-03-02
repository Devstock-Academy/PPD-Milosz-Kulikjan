import React from 'react'
import ModuleTech from './ModuleTech'
import type { ModuleTechItem } from '@/features/modules/types'
import { useTranslations } from 'next-intl'

type ModuleDescriptionProps = {
  moduleNumber: number
  moduleName: string
  moduleInput: string
  moduleOutput: string
  moduleTechs: ModuleTechItem[]
}

const ModuleDescription = ({
  moduleNumber,
  moduleName,
  moduleInput,
  moduleOutput,
  moduleTechs,
}: ModuleDescriptionProps) => {
  const t = useTranslations('Modules')

  return (
    <div className='flex  gap-6 p-8'>
      <div className='flex w-full max-w-moduleDescription flex-col gap-4 py-12'>
        <h2 className='text-2xl font-semibold'>
          {t('module')} {moduleNumber} - {moduleName}
        </h2>
        <div className='flex flex-col gap-1'>
          <span className='text-activeSidebarBg'>{t('input')}:</span>
          <p>{moduleInput}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-activeSidebarBg'>{t('output')}:</span>
          <p>{moduleOutput}</p>
        </div>
        <button className='h-10 w-full items-center justify-center rounded-lg bg-clockActive'>
          {t('startModule')}
        </button>
      </div>
      <div className='flex flex-wrap justify-center gap-8 lg:justify-start'>
        {moduleTechs.map((tech, index) => (
          <ModuleTech
            key={`${tech.techTitle}-${index}`}
            techTitle={tech.techTitle}
            techIcon={tech.techIcon}
            techDescription={tech.techDescription}
          />
        ))}
      </div>
    </div>
  )
}

export default ModuleDescription
