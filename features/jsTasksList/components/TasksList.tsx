'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'
import { useJsTasks } from '../hooks/useJsTasks'
import { useCssTasks } from '../hooks/useCssTasks'
import TasksSkeleton from './TasksSkeleton'
import { NextTaskIcon, DescriptionTitleIcon } from '@/icons'
import { useTranslations } from 'next-intl'

type TasksListProps = {
  taskType?: 'js' | 'css'
  userId?: string
}

export default function TasksList({
  taskType = 'js',
  userId: propUserId,
}: TasksListProps) {
  const t = useTranslations('Tasks')
  const { data: session } = useSession()
  const userId = propUserId || session?.user?.id || ''
  const limit = 1
  const [offset, setOffset] = useState(0)
  const [tasksList, setTasksList] = useState<any[]>([])
  const locale = useLocale()

  const { data: jsNewTasks, isFetching: jsIsFetching } = useJsTasks(
    offset,
    limit,
    userId,
    taskType === 'js'
  )

  const { data: cssNewTasks, isFetching: cssIsFetching } = useCssTasks(
    offset,
    limit,
    userId,
    taskType === 'css'
  )

  let newTasks
  let isFetching

  if (taskType === 'js') {
    newTasks = jsNewTasks
    isFetching = jsIsFetching
  } else {
    newTasks = cssNewTasks
    isFetching = cssIsFetching
  }

  useEffect(() => {
    if (newTasks && newTasks.length > 0) {
      setTasksList((prev) => {
        const newTasksIds = newTasks.map((t: any) => t.id)
        const filteredPrev = prev.filter(
          (t: any) => !newTasksIds.includes(t.id)
        )
        return [...filteredPrev, ...newTasks]
      })
    }
  }, [newTasks])

  const showMore = () => {
    setOffset((prev) => prev + limit)
  }

  const taskPathMap: Record<'css' | 'js', string> = {
    css: 'css-task',
    js: 'task',
  }

  return (
    <div className='flex flex-col text-white'>
      <div className='flex flex-col gap-4'>
        {tasksList.map((task: any, index: number) => {
          const hasSolution = task.solutions && task.solutions.length > 0

          let buttonText = t('goToTask')
          let buttonClass = clsx(
            'flex h-10 w-60 items-center justify-center gap-3 rounded-lg',
            'bg-activeSidebarBg'
          )
          let showSuccessIcon = false

          if (taskType === 'css') {
            const lastResult = task.solutions?.[0]?.result ?? null
            const requirements = task.requirements ?? 0

            if (!hasSolution) {
              buttonText = t('goToTask')
              buttonClass = clsx(
                'flex h-10 w-60 items-center justify-center gap-3 rounded-lg',
                'bg-activeSidebarBg'
              )
            } else if (lastResult !== null && lastResult >= requirements) {
              buttonText = t('tryAgain')
              buttonClass = clsx(
                'flex h-10 w-60 items-center justify-center gap-3 rounded-lg',
                'bg-clockActive'
              )
              showSuccessIcon = true
            } else {
              buttonText = t('finishTask')
              buttonClass = clsx(
                'flex h-10 w-60 items-center justify-center gap-3 rounded-lg',
                'bg-buttonBlue'
              )
            }
          } else {
            if (hasSolution) {
              buttonText = t('tryAgain')
              buttonClass = clsx(
                'flex h-10 w-60 items-center justify-center gap-3 rounded-lg',
                'bg-clockActive'
              )
              showSuccessIcon = true
            } else {
              buttonText = t('goToTask')
              buttonClass = clsx(
                'flex h-10 w-60 items-center justify-center gap-3 rounded-lg',
                'bg-activeSidebarBg'
              )
            }
          }

          let successIcon: React.ReactNode = ''
          if (showSuccessIcon) {
            successIcon = <DescriptionTitleIcon />
          }

          return (
            <TasksSkeleton
              type='task'
              key={task.id}
              data={[
                (index + 1).toString(),
                task.name,
                task.category,
                task.difficultyLevel,
                successIcon,
              ]}
            >
              <Link
                href={`/${locale}/${taskPathMap[taskType || 'js']}/${task.id}`}
              >
                <button className={buttonClass}>
                  {buttonText}
                  <NextTaskIcon />
                </button>
              </Link>
            </TasksSkeleton>
          )
        })}
      </div>
      <button
        onClick={showMore}
        disabled={isFetching}
        className='mt-4 flex w-60 items-center justify-center self-center rounded bg-darkBlueBg px-4 py-2 font-bold'
      >
        {t('moreTasks')} +
      </button>
    </div>
  )
}
