'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { useSession } from 'next-auth/react'

import { useModules } from '@/features/modules/hooks/useModules'
import ModuleCard from '@/features/modules/components/ModuleCard'
import Breadcrumb from '@/features/modules/components/Breadcrumb'

const Modules = () => {
  const t = useTranslations('Modules')
  const { data: session } = useSession()
  const userId = session?.user?.id
  const { data: modules, isLoading } = useModules(userId)
  let modulesArray: typeof modules = []

  if (Array.isArray(modules)) {
    modulesArray = modules
  }

  return (
    <div className='flex w-full flex-col justify-center gap-6 p-8 text-white lg:px-8'>
      <Breadcrumb />

      <div className='flex h-full w-full max-w-moduleContainer flex-col items-center justify-center gap-6  self-center px-24'>
        <div className='flex justify-center'>
          <span className='text-2xl'>{t('academyTitle')}</span>
        </div>

        <div className='mx-auto flex w-full max-w-moduleContainer'>
          <span className='flex text-center text-sm'>{t('mainText')}</span>
        </div>

        <div className='items mx-auto flex w-full flex-wrap items-center justify-center gap-8 xl:justify-between'>
          {isLoading && (
            <div className='text-sm'>{t('loading') || 'Ładowanie...'}</div>
          )}

          {modulesArray.map((module, index) => {
            let sprintsCount = 0
            if (Array.isArray(module.sprints)) {
              sprintsCount = module.sprints.length
            } else if (typeof module.sprints === 'number') {
              sprintsCount = module.sprints
            } else if ((module as any)._count?.sprints) {
              sprintsCount = (module as any)._count.sprints
            }

            let progressArray: number[] = []
            if (Array.isArray(module.sprints)) {
              progressArray = module.sprints.map((s) => s.progress ?? 0)
            } else if (Array.isArray((module as any).progress)) {
              progressArray = (module as any).progress
            }

            const cardModule = {
              id: module.id,
              moduleIndex: module.moduleIndex,
              photoUrl: '/images/moduleImage.webp',
              name: module.name || '',
              input: module.input || '',
              output: module.output || '',
              sprints: sprintsCount,
              difficultyLevel: (module.difficultyLevel || 'easy').toLowerCase(),
              moduleLength: module.totalDuration || module.moduleLength || 0,
              progress: progressArray,
            }

            return (
              <div
                key={cardModule.id}
                className='flex min-w-moduleCard  xl:flex-1'
              >
                <ModuleCard module={cardModule} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Modules
