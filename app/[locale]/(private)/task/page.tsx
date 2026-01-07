'use client'

import React from 'react'
import clsx from 'clsx'

import {
  ActionBar,
  Console,
  Description,
  Editor,
  TestResult,
  Tests,
} from '@/features/task'

const Task = () => {
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  return (
    <div className='flex h-full w-full flex-col space-y-5 px-8 pb-8 pt-5 text-white'>
      <ActionBar
        isFullscreen={isFullscreen}
        onFullscreenChange={setIsFullscreen}
      />

      <div
        className={clsx('grid flex-1 transition-all duration-300', {
          'gap-8 grid-normal': !isFullscreen,
        })}
      >
        <div
          className={clsx('h-full flex-col gap-4 overflow-hidden', {
            hidden: isFullscreen,
            flex: !isFullscreen,
          })}
        >
          <div className='min-h-0 flex-1'>
            <Description />
          </div>
          <div className='min-h-0 flex-1'>
            <Tests />
          </div>
          <div className='min-h-0 flex-1'>
            <TestResult />
          </div>
        </div>
        <div className='flex h-full flex-col gap-4'>
          <Editor />

          <div className='h-40'>
            <Console />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Task
