import { ClockIcon, DifficultyIcon, FolderIcon, LessonsIcon } from '@/icons'
import React from 'react'
import { useTranslations } from 'next-intl'

type ModuleInfoProps = {
  numberOfSprints: number
  numberOfLessons: number
  difficultyLevel: string
  timeToFinish: number
}

const ModuleInfo = ({
  numberOfSprints,
  numberOfLessons,
  difficultyLevel,
  timeToFinish,
}: ModuleInfoProps) => {
  const t = useTranslations('Modules')

  return (
    <div className='flex w-full gap-8'>
      <div className='flex items-center  gap-2'>
        <FolderIcon />
        {numberOfSprints} {t('sprints')}
      </div>
      <div className='flex items-center  gap-2'>
        <LessonsIcon />
        {numberOfLessons} {t('lessons')}
      </div>
      <div className='flex items-center  gap-2'>
        <DifficultyIcon />
        {difficultyLevel}
      </div>
      <div className='flex items-center  gap-2'>
        <ClockIcon />
        {timeToFinish}h
      </div>
    </div>
  )
}

export default ModuleInfo
