'use client'

import React from 'react'
import clsx from 'clsx'

type ProgressBarProps = {
  progress: number
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  const barColor = clsx({
    'bg-[#F74746]': progress <= 25,
    'bg-[#F5A22E]': progress > 25 && progress < 100,
    'bg-[#0E9F6E]': progress >= 100,
  })

  return (
    <div className='flex w-full flex-col gap-1'>
      <span className='self-end text-sm font-medium text-white'>
        {progress}%
      </span>
      <div className='h-2 w-full rounded-md bg-white'>
        <div
          className={clsx(
            'h-full rounded-md transition-all duration-300',
            barColor
          )}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
