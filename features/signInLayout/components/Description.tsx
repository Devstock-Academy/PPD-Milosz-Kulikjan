import React from 'react'

type Props = {
  children: React.ReactNode
  tabs: string[]
}

const Description = ({ children, tabs }: Props) => {
  return (
    <div className='flex h-full flex-col'>
      <div className='flex h-11 w-full rounded-tl-lg rounded-tr-lg bg-lightGrayBg shadow-tabBarShadow'>
        {tabs.map((tab) => (
          <button
            key={tab}
            className='h-full w-32 rounded-tl-lg bg-darkBlueBg px-4 text-sm text-white shadow-tabShadow'
          >
            {tab}
          </button>
        ))}
      </div>

      <div className='flex h-full bg-grayBg'>{children}</div>
    </div>
  )
}

export default Description
