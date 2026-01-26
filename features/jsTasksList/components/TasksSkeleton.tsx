import React from 'react'
import clsx from 'clsx'

type TasksSkeletonProps = {
  data: (string | React.ReactNode)[]
  type?: 'default' | 'task'
  children?: React.ReactNode
}

const TasksSkeleton = ({
  data,
  type = 'default',
  children,
}: TasksSkeletonProps) => {
  const containerClass = clsx(
    'flex flex-col xl:flex-row w-full rounded-lg px-4 font-bold text-white gap-2 justify-center xl:justify-start xl:items-center',
    type === 'task' && 'h-24 xl:h-15 bg-borderBg',
    type === 'default' && 'h-10 bg-darkBlueBg'
  )
  const cellClass = 'flex w-full xl:w-60 pl-2'
  const divider = (
    <div className='mx-4  h-4 w-0.5 rounded-lg bg-white xl:flex' />
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
      {data[4] && (
        <div className='flex w-10 items-center justify-center'>{data[4]}</div>
      )}
      {children && <div className='ml-auto flex'>{children}</div>}
    </div>
  )
}

export default TasksSkeleton
