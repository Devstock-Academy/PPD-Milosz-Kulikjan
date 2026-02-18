'use client'

import React from 'react'
import ModuleCard from '@/features/modules/components/ModuleCard'
import { useTranslations } from 'next-intl'
import Breadcrumb from '@/features/modules/components/Breadcrumb'

const moduleData = {
  id: 1,
  photoUrl: '/images/moduleImage.webp',
  name: 'Module',
  input:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  output:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  sprints: 5,
  difficultyLevel: 'Easy',
  moduleLength: 40,
  progress: [100, 60, 0, 0, 0, 0],
}

const Modules = () => {
  const t = useTranslations('Modules')
  const modulesArray = Array.from({ length: 6 }, () => moduleData)

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
          {modulesArray.map((module, index) => (
            <div key={index} className='flex min-w-moduleCard  xl:flex-1'>
              <ModuleCard module={{ ...module, id: index + 1 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Modules
