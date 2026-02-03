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
import { JsTask, CssTask } from '@/types/JsTask'
import { useTranslations } from 'next-intl'

type TasksListProps = {
  taskType?: 'js' | 'css'
  userId?: string
}

export default function TasksList({
  taskType = 'js',
  userId: userIdProp,
}: TasksListProps) {
  const t = useTranslations('Tasks')
  const { data: session } = useSession()
  const userId = userIdProp || session?.user?.id || ''
  const limit = 1
  const [offset, setOffset] = useState(0)
  const [tasksList, setTasksList] = useState<(JsTask | CssTask)[]>([])
  const locale = useLocale()

  const { data: jsTasksData, isFetching: jsIsFetching } = useJsTasks(
    offset,
    limit,
    userId,
    taskType === 'js'
  )

  const { data: cssTasksData, isFetching: cssIsFetching } = useCssTasks(
    offset,
    limit,
    userId,
    taskType === 'css'
  )

  const newTasks = taskType === 'css' ? cssTasksData : jsTasksData
  const isFetching = taskType === 'css' ? cssIsFetching : jsIsFetching

  useEffect(() => {
    if (newTasks && newTasks.length > 0) {
      setTasksList((prev) => {
        const newTasksIds = newTasks.map((t: JsTask | CssTask) => t.id)
        const filteredPrev = prev.filter((t) => !newTasksIds.includes(t.id))
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
        {tasksList.map((task: JsTask | CssTask, index: number) => {
          const hasSolution = task.solutions && task.solutions.length > 0

          let buttonText = t('goToTask')
          let buttonClass = clsx(
            'flex h-10 w-60 items-center justify-center gap-3 rounded-lg',
            'bg-activeSidebarBg'
          )
          let showSuccessIcon = false

          if (taskType === 'css') {
            const cssTask = task as CssTask
            const lastResult = cssTask.solutions?.[0]?.result ?? null
            const requirements = cssTask.requirements ?? 0

            if (!hasSolution) {
              buttonText = t('goToTask')
              buttonClass = clsx(
                'flex h-10 w-60 items-center justify-center gap-3 rounded-lg',
                'bg-activeSidebarBg'
              )
              showSuccessIcon = false
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
              showSuccessIcon = false
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
              showSuccessIcon = false
            }
          }

          return (
            <TasksSkeleton
              type='task'
              key={task.id}
              data={[
                (index + 1).toString(),
                'descriptionStart' in task
                  ? task.descriptionStart.split(' ').slice(0, 3).join(' ')
                  : task.name.split(' ').slice(0, 3).join(' '),
                task.category,
                task.difficultyLevel,
                (showSuccessIcon && <DescriptionTitleIcon />) || '',
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
