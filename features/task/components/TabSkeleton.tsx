'use client'

import React from 'react'
import clsx from 'clsx'

type TabItem = {
  label: string
}

type TabSkeletonProps = React.PropsWithChildren<{
  tabs: TabItem[]
}>

const TabSkeleton = ({ tabs, children }: TabSkeletonProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0)

  if (!tabs.length) return null

  const currentIndex = Math.min(activeIndex, tabs.length - 1)

  const childrenArray = Array.isArray(children) ? children : [children]

  return (
    <div className='flex h-full flex-col'>
      <div className='flex h-10 w-full rounded-t-lg bg-lightGrayBg shadow-tabBarShadow'>
        {tabs.map(({ label }, index) => {
          const isActive = index === currentIndex
          return (
            <button
              key={label}
              onClick={() => setActiveIndex(index)}
              className={clsx(
                'h-full w-32 px-4 text-sm font-medium text-white',
                {
                  'bg-darkBlueBg shadow-activeTabShadow': isActive,
                  'bg-lightBlueBg shadow-inactiveTabShadow': !isActive,
                },
                index === 0 && 'rounded-tl-lg',
                index === tabs.length - 1 && 'rounded-tr-lg'
              )}
            >
              {label}
            </button>
          )
        })}
      </div>
      <div className='flex-1 overflow-y-auto bg-grayBg'>
        <div>{childrenArray[currentIndex]}</div>
      </div>
    </div>
  )
}

export default TabSkeleton
