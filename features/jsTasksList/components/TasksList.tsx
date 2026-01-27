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

export default function TasksList() {
  const t = useTranslations('Tasks')
  const { data: session } = useSession()
  const userId = session?.user?.id || ''
  const limit = 1
  const [offset, setOffset] = useState(0)
  const [tasksList, setTasksList] = useState<JsTask[]>([])
  const locale = useLocale()

  const { data: newTasks, isFetching } = useJsTasks(offset, limit, userId)

  useEffect(() => {
    if (newTasks && newTasks.length > 0) {
      setTasksList((prev) => {
        const newTasksIds = newTasks.map((t) => t.id)
        const filteredPrev = prev.filter((t) => !newTasksIds.includes(t.id))
        return [...filteredPrev, ...newTasks]
      })
    }
  }, [newTasks])

  const showMore = () => {
    setOffset((prev) => prev + limit)
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
              <Link href={`/${locale}/task/${task.id}`}>
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
