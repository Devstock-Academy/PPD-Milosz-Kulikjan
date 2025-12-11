'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

import { Divider } from '@/components'
import { FullscreenIcon, SettingsIcon } from '@/icons'

import Timer from './Timer'

interface ActionBarProps {
  isFullscreen: boolean
  onFullscreenChange: (value: boolean) => void
}

const ActionBar = ({ isFullscreen, onFullscreenChange }: ActionBarProps) => {
  const t = useTranslations('Task')
  const handleNextTask = () => {}
  const handlePreviousTask = () => {}
  const handleFullscreen = () => {
    onFullscreenChange(!isFullscreen)
  }
  return (
    <div className='flex h-10 w-full justify-between rounded-lg bg-grayBg px-4'>
      <div className='flex items-center justify-center'>
        <button className='font-medium text-white' onClick={handlePreviousTask}>
          {t('previousTask')}
        </button>
        <Divider />
        <button className='font-medium text-white' onClick={handleNextTask}>
          {t('nextTask')}
        </button>
        <Divider />
        <Timer />
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
