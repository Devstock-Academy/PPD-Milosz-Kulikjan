import React from 'react'
import { ClockIcon, DifficultyIcon, HTMLIcon, DocumentIcon } from '@/icons'
import ProgressBar from './ProgressBar'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

type SprintCardProps = {
  sprintNumber: number
  sprintName: string
  sprintDescription: string
  numberOfLessons: number
  timeToComplete: number
  difficultyLevel: string
  techs: string[]
  sprintPhoto: string
  sprintProgress: number
}

const SprintCard = ({
  sprintNumber,
  sprintName,
  sprintDescription,
  numberOfLessons,
  timeToComplete,
  difficultyLevel,
  techs,
  sprintPhoto,
  sprintProgress,
}: SprintCardProps) => {
  const t = useTranslations('Modules')

  const renderTech = (tech: string) => {
    if (tech === 'HTML') {
      return <HTMLIcon />
    }

    return tech
  }

  return (
    <div className='border-dividerBg flex w-full gap-4 rounded-lg bg-borderBg p-8'>
      <div className='bg-dividerBg h relative w-1/3 overflow-hidden rounded-lg'>
        <Image
          src={sprintPhoto}
          alt={t('sprintCoverAlt', { number: sprintNumber })}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, 33vw'
        />
      </div>

      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-2xl font-semibold'>
            {t('sprint')} {sprintNumber} - {sprintName}
          </h2>
          <p className='text-sm text-gray-200'>{sprintDescription}</p>
        </div>
        <div className='flex flex-wrap gap-3 text-sm text-gray-200'>
          <span className='flex items-center gap-2'>
            <DocumentIcon />
            {numberOfLessons} {t('lessons')}
          </span>
          <span className='flex items-center gap-2'>
            <ClockIcon />
            {timeToComplete}h
          </span>
          <span className='flex items-center gap-2'>
            <DifficultyIcon />
            {difficultyLevel}
          </span>
        </div>
        <div className='flex flex-wrap items-center gap-4'>
          {t('learnWhat')}
          {techs.map((tech, index) => (
            <span key={`${tech}-${index}`} className='gap-4'>
              {renderTech(tech)}
            </span>
          ))}
        </div>
        <button className='flex h-10 w-75 items-center justify-center rounded-lg bg-clockActive'>
          {t('goToSprint')}
        </button>
        <ProgressBar progress={sprintProgress} />
      </div>
    </div>
  )
}

export default SprintCard
