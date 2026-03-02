import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { ClockIcon, DifficultyIcon, FolderIcon, TrueIcon } from '@/icons'

type ModuleType = {
  id: number | string
  moduleIndex?: number
  photoUrl: string
  name: string
  input: string
  output: string
  sprints: number
  difficultyLevel: string
  moduleLength: number
  progress: number[]
}

type ModuleCardProps = {
  module: ModuleType
}

const ModuleCard = ({ module }: ModuleCardProps) => {
  const t = useTranslations('Modules')

  if (!module) return <div>{t('moduleNotFound')}</div>
  const getSprintBgClass = (progress: number) => {
    if (progress >= 100) {
      return 'bg-clockActive'
    }

    if (progress > 0) {
      return 'bg-activeSidebarBg'
    }

    return 'bg-buttonRed'
  }

  return (
    <div className='flex w-full min-w-moduleCard max-w-moduleCard flex-col gap-4 rounded-lg bg-grayBg p-4'>
      <div className='relative aspect-video h-38.5 w-full overflow-hidden rounded-lg'>
        <Image
          src={module.photoUrl}
          alt={t('moduleImageAlt')}
          fill
          className='object-cover'
        />
      </div>
      <div>
        <span className='text-lg'>{module.name}</span>
      </div>
      <div className='flex h-0.5 w-full bg-white'></div>
      <div className='flex flex-col gap-2'>
        <span className='text-sm text-activeSidebarBg'>{t('input')}:</span>
        <span className='text-sm'>{module.input}</span>
      </div>
      <div className='flex flex-col gap-2'>
        <span className='text-sm text-activeSidebarBg'>{t('output')}:</span>
        <span className='text-sm'>{module.output}</span>
      </div>
      <div className='flex w-full justify-between'>
        <div className='flex items-center justify-center gap-2'>
          <FolderIcon />
          {module.sprints} {t('sprints')}
        </div>
        <div className='flex items-center justify-center gap-2'>
          <DifficultyIcon />
          {t((module.difficultyLevel || '').toLowerCase())}
        </div>
        <div className='flex items-center justify-center gap-2'>
          <ClockIcon />
          {module.moduleLength}h
        </div>
      </div>
      <div className='flex h-0.5 w-full bg-white'></div>
      <Link
        href={`modules/module-${module.moduleIndex ?? module.moduleIndex}`}
        className='flex h-10 w-full items-center justify-center rounded bg-buttonBlue'
      >
        {t('enterModule')}
      </Link>
      <div className='flex w-full items-center gap-2'>
        {module.progress.map((sprint, index) => (
          <React.Fragment key={index}>
            <div
              className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs ${getSprintBgClass(
                sprint
              )}`}
            >
              {sprint >= 100 && <TrueIcon color='white' />}
              {sprint < 100 && <span>{sprint}%</span>}
            </div>
            {index < module.progress.length - 1 && (
              <div className='flex h-0.5 flex-grow bg-white'></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default ModuleCard
