'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

import TabSkeleton from './TabSkeleton'

import Test from './Test'

const TestResult = () => {
  const t = useTranslations('Task')
  return (
    <TabSkeleton tabs={[{ label: t('testResult') }]}>
      <Test />
    </TabSkeleton>
  )
}

export default TestResult
