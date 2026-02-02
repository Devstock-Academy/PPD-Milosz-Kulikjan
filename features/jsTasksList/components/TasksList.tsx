'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'
import { useJsTasks } from '../hooks/useJsTasks'
import TasksSkeleton from './TasksSkeleton'
import { NextTaskIcon, DescriptionTitleIcon } from '@/icons'
import { JsTask } from '@/types/JsTask'
import { useTranslations } from 'next-intl'

type TasksListProps = {
  mockData?: JsTask[]
  useMock?: boolean
  taskType?: 'js' | 'css'
}

export default function TasksList({
  mockData,
  useMock = false,
  taskType = 'js',
}: TasksListProps) {
  const t = useTranslations('Tasks')
  const { data: session } = useSession()
  const userId = session?.user?.id || ''
  const limit = 1
  const [offset, setOffset] = useState(0)
  const [tasksList, setTasksList] = useState<JsTask[]>(mockData || [])
  const locale = useLocale()

  const { data: newTasks, isFetching } = useJsTasks(
    offset,
    limit,
    userId,
    !useMock
  )

  useEffect(() => {
    if (!useMock && newTasks && newTasks.length > 0) {
      setTasksList((prev) => {
        const newTasksIds = newTasks.map((t) => t.id)
        const filteredPrev = prev.filter((t) => !newTasksIds.includes(t.id))
        return [...filteredPrev, ...newTasks]
      })
    }
  }, [newTasks, useMock])

  const showMore = () => {
    if (!useMock) {
      setOffset((prev) => prev + limit)
    }
  }

  const taskPathMap: Record<'css' | 'js', string> = {
    css: 'css-task',
    js: 'task',
  }

  return (
    <div className='flex flex-col text-white'>
      <div className='flex flex-col gap-4'>
        {tasksList.map((task: JsTask, index: number) => {
          const hasSolution = task.solutions && task.solutions.length > 0
          const buttonClass = clsx(
            'flex h-10 w-60 items-center justify-center gap-3 rounded-lg',
            hasSolution && 'bg-clockActive',
            !hasSolution && 'bg-activeSidebarBg'
          )
          const buttonText = (hasSolution && t('tryAgain')) || t('goToTask')

          return (
            <TasksSkeleton
              type='task'
              key={task.id}
              data={[
                (index + 1).toString(),
                task.descriptionStart.split(' ').slice(0, 3).join(' '),
                task.category,
                task.difficultyLevel,
                (hasSolution && <DescriptionTitleIcon />) || '',
              ]}
            >
              <Link href={`/${locale}/${taskPathMap[taskType]}/${task.id}`}>
                <button className={buttonClass}>
                  {buttonText}
                  <NextTaskIcon />
                </button>
              </Link>
            </TasksSkeleton>
          )
        })}
      </div>
      {!useMock && (
        <button
          onClick={showMore}
          disabled={isFetching}
          className='mt-4 flex w-60 items-center justify-center self-center rounded bg-darkBlueBg px-4 py-2 font-bold'
        >
          {t('moreTasks')} +
        </button>
      )}
    </div>
  )
}
