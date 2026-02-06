'use client'

import React from 'react'
import clsx from 'clsx'

type TabItem = {
  label: string
  fullWidth?: boolean
}

type TabSkeletonProps = React.PropsWithChildren<{
  tabs: TabItem[]
  disableTabs?: boolean
  noHeaderBg?: boolean
}>

const TabSkeleton = ({
  tabs,
  children,
  disableTabs,
  noHeaderBg = false,
}: TabSkeletonProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0)

  if (!tabs.length) return null

  const currentIndex = Math.min(activeIndex, tabs.length - 1)

  return (
    <div className='flex h-full min-h-0 w-full flex-col overflow-hidden rounded-lg bg-grayBg shadow-tabBarShadow'>
      <div
        className={clsx('flex h-10 w-full flex-none', {
          'bg-lightGrayBg': !noHeaderBg,
          'border-b border-lightGrayBg': noHeaderBg,
        })}
      >
        {tabs.map(({ label, fullWidth }, index) => {
          const isActive = index === currentIndex

          return (
            <button
              key={label}
              onClick={() => {
                if (!disableTabs) {
                  setActiveIndex(index)
                }
              }}
              className={clsx(
                'h-full whitespace-nowrap px-4 text-sm font-medium text-white transition-colors',
                {
                  ' z-10 bg-darkBlueBg shadow-activeTabShadow': isActive,
                  'bg-lightBlueBg': !isActive,
                  'w-full': fullWidth,
                  'w-32': !fullWidth,
                }
              )}
            >
              {label}
            </button>
          )
        })}
      </div>
      <div className='min-h-0 flex-1 overflow-y-auto bg-grayBg'>
        {Array.isArray(children) ? children[currentIndex] ?? null : children}
      </div>
    </div>
  )
}

export default TabSkeleton
