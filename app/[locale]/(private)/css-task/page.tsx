'use client'
import React from 'react'
import { TasksHeader, TasksList } from '@/features/jsTasksList/components'
import { useCssTasks } from '@/features/jsTasksList/hooks/useCssTasks'
import { useSession } from 'next-auth/react'

const CssTask = () => {
  const { data: session } = useSession()
  const userId = session?.user?.id

  return (
    <div className='flex h-full w-full flex-col space-y-5 px-8 pb-8 pt-8 text-white'>
      <TasksHeader />
      <TasksList taskType='css' userId={userId} />
    </div>
  )
}

export default CssTask
