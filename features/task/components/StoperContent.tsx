'use client'

import React from 'react'
import { useTimer } from '../hooks/useTimer'

const StoperContent = () => {
  const { time, startStoper, resetStoper } = useTimer()

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
      .toString()
      .padStart(2, '0')
    const seconds = Math.floor((ms % 60000) / 1000)
      .toString()
      .padStart(2, '0')
    const centiseconds = Math.floor((ms % 1000) / 10)
      .toString()
      .padStart(2, '0')
    return `${minutes}:${seconds}:${centiseconds}`
  }

  return (
    <div className='flex flex-col items-center gap-4'>
      <span className='flex self-start p-4 text-4xl'>{formatTime(time)}</span>
      <div className='mb-4 flex h-10 w-full justify-between gap-4 px-4'>
        <button
          className='h-full w-1/2 rounded-lg bg-activeSidebarBg'
          onClick={startStoper}
        >
          Start
        </button>
        <button
          className='h-full w-1/2 rounded-lg bg-activeSidebarBg'
          onClick={resetStoper}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default StoperContent
