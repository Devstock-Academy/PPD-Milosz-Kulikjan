import React from 'react'

type ModuleTechProps = {
  techTitle: string
  techIcon: React.ComponentType
  techDescription: string
}

const ModuleTech = ({
  techTitle,
  techIcon: TechIcon,
  techDescription,
}: ModuleTechProps) => {
  return (
    <div className='flex h-55 w-56 flex-col gap-6 rounded-lg bg-borderBg p-4'>
      <div className='flex items-center gap-6'>
        <div className='flex  items-center justify-center rounded-md'>
          <TechIcon />
        </div>
        <span className='text-lg font-semibold'>{techTitle}</span>
      </div>

      <div className='flex py-4'>
        <span className='text-xs'>{techDescription}</span>
      </div>
    </div>
  )
}

export default ModuleTech
