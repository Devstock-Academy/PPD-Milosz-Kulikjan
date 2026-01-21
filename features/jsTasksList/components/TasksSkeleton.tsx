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
    'flex md:flex-col flex-col lg:flex-row w-full lg:items-center items-between rounded-lg px-4 font-bold text-white lg:justify-start justify-center gap-2',
    type === 'task' && 'lg:h-15 h-24 bg-borderBg',
    type === 'default' && 'h-10 bg-darkBlueBg'
  )

  const cellClass = 'flex lg:w-60  pl-2'
  const divider = (
    <div className='mx-4 flex h-4 w-0.5 rounded-lg bg-white'></div>
  )

  return (
    <div className={containerClass}>
      <div className='flex'>
        <div className='flex w-10 pl-2'>{data[0]}.</div>
        {divider}
        <div className={cellClass}>{data[1]}</div>
        {divider}
        <div className={cellClass}>{data[2]}</div>
        {divider}
        <div className={cellClass}>{data[3]}</div>
        {divider}
      </div>

      {children && (
        <div className='ml-auto flex w-full justify-center lg:justify-end '>
          {children}
        </div>
      )}
    </div>
  )
}

export default TasksSkeleton
