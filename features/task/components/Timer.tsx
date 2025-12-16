'use client'

import React from 'react'
import TabSkeleton from './TabSkeleton'
import TimerContent from './TimerContent'
import StoperContent from './StoperContent'
import { useTranslations } from 'next-intl'

const Timer = () => {
  const ti = useTranslations('Timer')

  const tabs = [
    { label: ti('stoper'), fullWidth: true },
    { label: ti('timer'), fullWidth: true },
  ]

  return (
    <TabSkeleton tabs={tabs}>
      <StoperContent />
      <TimerContent />
    </TabSkeleton>
  )
}

export default Timer
