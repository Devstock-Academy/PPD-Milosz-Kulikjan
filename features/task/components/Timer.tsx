'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

import TabSkeleton from './TabSkeleton'
import TimerContent from './TimerContent'
import StoperContent from './StoperContent'
import { useTimer } from '../hooks/useTimer'

const Timer = () => {
  const ti = useTranslations('Timer')
  const { runningStoper, runningTimer } = useTimer()

  const tabs = [
    { label: ti('stoper'), fullWidth: true },
    { label: ti('timer'), fullWidth: true },
  ]

  return (
    <TabSkeleton tabs={tabs} disableTabs={runningStoper || runningTimer}>
      <StoperContent />
      <TimerContent />
    </TabSkeleton>
  )
}

export default Timer
