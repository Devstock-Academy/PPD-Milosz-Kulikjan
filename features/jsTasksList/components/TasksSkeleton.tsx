import React from 'react'
import clsx from 'clsx'

type TasksSkeletonProps = {
  data: string[]
  type?: 'default' | 'task'
  children?: React.ReactNode 
}

const TasksSkeleton = ({
  data,
  type = 'default',
  children,
}: TasksSkeletonProps) => {
  const containerClass = clsx(
    'flex w-full items-center rounded-lg px-4 font-bold text-white',
    type === 'task' && 'h-15 bg-borderBg',
    type === 'default' && 'h-10 bg-darkBlueBg'
  )

  const cellClass = 'flex w-60 pl-2'
  const divider = (
    <div className='mx-4 flex h-4 w-0.5 rounded-lg bg-white'></div>
  )

  return (
    <div className={containerClass}>
      <div className='flex w-10 pl-2'>{data[0]}.</div>
      {divider}
      <div className={cellClass}>{data[1]}</div>
      {divider}
      <div className={cellClass}>{data[2]}</div>
      {divider}
      <div className={cellClass}>{data[3]}</div>
      {divider}
      {children && <div className='ml-auto flex'>{children}</div>}
    </div>
  )
}

export default TasksSkeleton
