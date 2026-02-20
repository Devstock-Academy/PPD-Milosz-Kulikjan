import React from 'react'
import ModuleInfo from '@/features/modules/components/ModuleInfo'
import ProgressBar from '@/features/modules/components/ProgressBar'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import { useTranslations } from 'next-intl'

type ModuleFirstContentProps = {
  moduleNumber: number
  moduleName: string
  numberOfSprints?: number
  numberOfLessons: number
  difficultyLevel: string
  timeToFinish: number
  moduleDescription?: string
  showVideo?: boolean
  progress: number
  forSprint?: boolean
}

const ModuleFirstContent = ({
  moduleNumber,
  moduleName,
  numberOfSprints,
  numberOfLessons,
  difficultyLevel,
  timeToFinish,
  moduleDescription,
  showVideo = true,
  progress,
  forSprint = false,
}: ModuleFirstContentProps) => {
  const t = useTranslations('Modules')

  return (
    <div className='flex flex-col gap-16 xl:flex-row'>
      <div className='flex min-w-0 flex-1 flex-col gap-6'>
        <h1 className='text-2xl'>
          {t('module')} {moduleNumber} - {moduleName}
        </h1>
        <p>{moduleDescription}</p>
        <ProgressBar progress={progress} />
        <ModuleInfo
          numberOfSprints={numberOfSprints}
          numberOfLessons={numberOfLessons}
          difficultyLevel={difficultyLevel}
          timeToFinish={timeToFinish}
          forSprint={forSprint}
        />
      </div>
      {showVideo === true && (
        <div className='flex items-center justify-center'>
          <div className='h-62.25 w-101.25 shrink-0 bg-white'>
            <div className='relative h-full w-full'>
              <LiteYouTubeEmbed
                id={'NKsma2XgjL4'}
                title={t('videoTitle')}
                poster='hqdefault'
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ModuleFirstContent
