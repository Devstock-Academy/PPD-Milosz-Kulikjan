'use client'

import React from 'react'
import { useTimer } from '../hooks/useTimer'
import { Input } from '@/components'

const TimerContent = () => {
  const { time, startTimer, resetTimer } = useTimer()
  const [inputMinutes, setInputMinutes] = React.useState('')

  const handleStart = () => {
    const minutes = parseFloat(inputMinutes)
    if (!isNaN(minutes) && minutes > 0 && minutes <= 99) {
      const ms = minutes * 60 * 1000
      startTimer(ms)
    }
  }

  const handleReset = () => {
    resetTimer()
    setInputMinutes('')
  }

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
      <span className='flex self-start px-4 pt-4 text-4xl'>
        {formatTime(time)}
      </span>
      <div className='flex w-full flex-col px-4'>
        <span className='text-sm'>Minuty</span>
        <Input
          noError
          type='number'
          placeholder='0'
          value={inputMinutes}
          onChange={(e) => setInputMinutes(e.target.value)}
          className='w-full flex-1 rounded-lg border-none bg-lightGrayBg p-2 text-white'
        />
      </div>

      <div className='mb-4 flex h-10 w-full justify-between gap-4 px-4'>
        <button
          className='h-full w-1/2 rounded-lg bg-activeSidebarBg'
          onClick={handleStart}
        >
          Start
        </button>
        <button
          className='h-full w-1/2 rounded-lg bg-activeSidebarBg'
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default TimerContent
