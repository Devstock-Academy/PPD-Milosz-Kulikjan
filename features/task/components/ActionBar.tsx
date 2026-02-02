'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import { Divider } from '@/components'
import { FullscreenIcon, SettingsIcon, DownloadIcon, HelpIcon } from '@/icons'

import TimerIcon from './TimerIcon'
import Timer from './Timer'

type ActionBarProps = {
  isFullscreen?: boolean
  onFullscreenChange?: (value: boolean) => void
  taskType?: 'js' | 'css'
}

const ActionBar = ({
  isFullscreen,
  onFullscreenChange,
  taskType = 'js',
}: ActionBarProps) => {
  const [isTimerOpen, setIsTimerOpen] = React.useState(false)
  const router = useRouter()

  const t = useTranslations('Task')
  const tCss = useTranslations('CssTask')

  const handleNextTask = () => {}
  const handlePreviousTask = () => {}
  const handleBack = () => {
    router.back()
  }
  const handleFullscreen = () => {
    if (onFullscreenChange) {
      onFullscreenChange(!isFullscreen)
    }
  }
  const handleOpenTimer = () => {
    setIsTimerOpen((prev) => !prev)
  }
  const handleDownload = () => {}
  const handleHelp = () => {}

  return (
    <div className='flex h-10 w-full justify-between rounded-lg bg-grayBg px-4'>
      <div className='flex items-center justify-center gap-4'>
        {taskType === 'js' && (
          <>
            <button
              className='font-medium text-white'
              onClick={handlePreviousTask}
            >
              {t('previousTask')}
            </button>
            <Divider />
            <button className='font-medium text-white' onClick={handleNextTask}>
              {t('nextTask')}
            </button>
            <Divider />
          </>
        )}
        {taskType === 'css' && (
          <>
            <button className='font-medium text-white' onClick={handleBack}>
              <span className='text-xl'>{'<'}</span>
              {' ' + tCss('back')}
            </button>
          </>
        )}
        <div className='relative'>
          <button onClick={handleOpenTimer} className='h-full'>
            <TimerIcon isOpen={isTimerOpen} />
          </button>
          {isTimerOpen && (
            <div className='absolute left-auto right-5 top-full z-50 mt-2 w-75 lg:left-0 lg:right-auto'>
              <Timer />
            </div>
          )}
        </div>
      </div>
      <div className='flex items-center justify-center gap-5'>
        {taskType === 'js' && (
          <>
            <button
              onClick={handleFullscreen}
              className='cursor-pointer transition-transform hover:scale-110'
            >
              <FullscreenIcon />
            </button>
            <button className='cursor-pointer transition-transform hover:scale-110'>
              <SettingsIcon />
            </button>
          </>
        )}
        {taskType === 'css' && (
          <>
            <button
              onClick={handleDownload}
              className='cursor-pointer transition-transform hover:scale-110'
            >
              <DownloadIcon />
            </button>
            <button
              onClick={handleHelp}
              className='cursor-pointer transition-transform hover:scale-110'
            >
              <HelpIcon />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default ActionBar
