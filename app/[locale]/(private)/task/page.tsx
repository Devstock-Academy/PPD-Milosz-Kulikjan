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
import { CodeProvider } from '@/context/EditorContext'
import { TaskProvider } from '@/context/TestContext'

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
          <div className='h-full w-full flex-1'>
            <Description />
          </div>
          <TaskProvider>
            <div className='h-full w-full flex-1'>
              <Tests />
            </div>
            <div className='h-full w-full flex-1'>
              <TestResult />
            </div>
          </TaskProvider>
        </div>
        <CodeProvider>
          <div className='flex h-full flex-col gap-4'>
            <Editor />
            <div className='h-40'>
              <Console />
            </div>
          </div>
        </CodeProvider>
      </div>
    </div>
  )
}

export default Task
