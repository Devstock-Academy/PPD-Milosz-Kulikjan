'use client'

import React from 'react'
import { useParams } from 'next/navigation'
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
import { useTask } from '@/features/task/hooks/useTask'

const Task = () => {
  const params = useParams()
  const id = params.id as string
  const { data: task, isLoading, error } = useTask(id)

  const [isFullscreen, setIsFullscreen] = React.useState(false)

  if (isLoading) return <div>Ładowanie...</div>
  if (error) return <div>Błąd: {error.message}</div>
  if (!task) return <div>Zadanie nie znalezione</div>

  const descriptionData = {
    category: task.category,
    solutionsCount: task.submissions || 0,
    difficulty: task.difficultyLevel,
    title: task.name,
    description:
      task.descriptionStart +
      (task.descriptionEnd ? '\n\n' + task.descriptionEnd : ''),
    sampleInput: task.sampleInput.join('\n'),
    sampleOutput: task.sampleOutput.join('\n'),
  }

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
          <div className='h-full w-full flex-1 '>
            <Description data={descriptionData} />
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
