'use client'

import React from 'react'
import { ClockIcon } from '@/icons'
import { useTimer } from '../hooks/useTimer'
import clsx from 'clsx'

type TimerProps = {
  isOpen?: boolean
}

const TimerIcon = ({ isOpen }: TimerProps) => {
  const { time, runningStoper, runningTimer } = useTimer()

  const formatTimeShort = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
      .toString()
      .padStart(2, '0')
    const seconds = Math.floor((ms % 60000) / 1000)
      .toString()
      .padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  const isRunning = runningStoper || runningTimer

  return (
    <div
      className={clsx(
        'group flex items-center justify-center gap-4 px-4 py-2 transition-colors duration-200',

        {
          'bg-clockActive shadow-tabBarShadow': isRunning && isOpen,
          'bg-clockSet': isRunning && !isOpen,
          'bg-buttonBlue shadow-tabBarShadow': !isRunning && isOpen,
          'bg-lightBlueBg': !isRunning && !isOpen,
        }
      )}
    >
      <ClockIcon className='flex-shrink-0 transition-transform duration-200 group-hover:scale-150' />
      <div className='text-right font-medium text-white'>
        {formatTimeShort(time)}
      </div>
    </div>
  )
}

export default TimerIcon
