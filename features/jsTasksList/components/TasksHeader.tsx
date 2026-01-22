import React from 'react'
import TasksSkeleton from './TasksSkeleton'

const TasksHeader = () => {
  return (
    <TasksSkeleton data={['No', 'Tytuł', 'Kategoria', 'Stopień Trudności']} />
  )
}

export default TasksHeader
