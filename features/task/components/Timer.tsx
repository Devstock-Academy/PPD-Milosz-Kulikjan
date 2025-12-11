'use client'

import { ClockIcon } from '@/icons'
import React from 'react'

const Timer = () => {
  const [timer, setTimer] = React.useState('00:00')
  return (
    <div className='flex h-full items-center justify-center gap-4 bg-lightBlueBg px-4 shadow-md'>
      <ClockIcon />
      <div className='font-medium text-white'>{timer}</div>
    </div>
  )
}

export default Timer
