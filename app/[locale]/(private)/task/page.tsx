import React from 'react'
import { TasksHeader, TasksList } from '@/features/jsTasksList/components'

const Task = () => {
  return (
    <div className='flex h-full w-full flex-col space-y-5 px-8 pb-8 pt-8 text-white'>
      <TasksHeader />
      <TasksList />
    </div>
  )
}

export default Task
