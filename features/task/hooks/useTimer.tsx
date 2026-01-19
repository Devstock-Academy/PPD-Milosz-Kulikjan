'use client'

import React from 'react'
import { TimerContext } from '../context/TimerContext'

export const useTimer = () => {
  const context = React.useContext(TimerContext)

  if (!context) {
    throw new Error('useTimer must be used within TimerProvider')
  }

  return context
}
