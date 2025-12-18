'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

import { Divider } from '@/components'
import { FullscreenIcon, SettingsIcon } from '@/icons'

import TimerIcon from './TimerIcon'
import Timer from './Timer'

type ActionBarProps = {
  isFullscreen: boolean
  onFullscreenChange: (value: boolean) => void
}

const ActionBar = ({ isFullscreen, onFullscreenChange }: ActionBarProps) => {
  const [isTimerOpen, setIsTimerOpen] = React.useState(false)

  const t = useTranslations('Task')

  const handleNextTask = () => {}
  const handlePreviousTask = () => {}
  const handleFullscreen = () => {
    onFullscreenChange(!isFullscreen)
  }
  const handleOpenTimer = () => {
    setIsTimerOpen((prev) => !prev)
  }

  return (
    <div className='flex h-10 w-full justify-between rounded-lg bg-grayBg px-4'>
      <div className='flex items-center justify-center gap-2'>
        <button className='font-medium text-white' onClick={handlePreviousTask}>
          {t('previousTask')}
        </button>
        <Divider />
        <button className='font-medium text-white' onClick={handleNextTask}>
          {t('nextTask')}
        </button>
        <Divider />
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
        <button
          onClick={handleFullscreen}
          className='cursor-pointer transition-transform hover:scale-110'
        >
          <FullscreenIcon />
        </button>
        <button className='cursor-pointer transition-transform hover:scale-110'>
          <SettingsIcon />
        </button>
      </div>
    </div>
  )
}

export default ActionBar
