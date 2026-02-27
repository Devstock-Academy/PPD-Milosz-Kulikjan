import React from 'react'
import { useTranslations } from 'next-intl'

import {
  ClockIcon,
  DifficultyIcon,
  FolderIcon,
  LessonsIcon,
  DocumentIcon,
} from '@/icons'

type ModuleInfoProps = {
  numberOfSprints?: number
  numberOfLessons: number
  difficultyLevel: string
  timeToFinish: number
  forSprint?: boolean
}

const ModuleInfo = ({
  numberOfSprints,
  numberOfLessons,
  difficultyLevel,
  timeToFinish,
  forSprint = false,
}: ModuleInfoProps) => {
  const t = useTranslations('Modules')

  return (
    <div className='flex w-full gap-8'>
      {typeof numberOfSprints === 'number' && (
        <div className='flex items-center  gap-2'>
          <FolderIcon />
          {numberOfSprints} {t('sprints')}
        </div>
      )}
      <div className='flex items-center  gap-2'>
        {(() => {
          if (forSprint) {
            return <DocumentIcon />
          }
          return <LessonsIcon />
        })()}
        {numberOfLessons} {t('lessons')}
      </div>
      <div className='flex items-center  gap-2'>
        <DifficultyIcon />
        {t((difficultyLevel || '').toLowerCase())}
      </div>
      <div className='flex items-center  gap-2'>
        <ClockIcon />
        {timeToFinish}h
      </div>
    </div>
  )
}

export default ModuleInfo
