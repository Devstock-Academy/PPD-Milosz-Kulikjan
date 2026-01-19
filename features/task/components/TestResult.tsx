'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

import TabSkeleton from './TabSkeleton'
import { TestContext } from '@/context'
import TestResultView from './TestResultView'
import FastTestResultView from './FastTestResultView'

const TestResult = () => {
  const context = React.useContext(TestContext)
  if (!context) {
    throw new Error('TestContext must be used within a TaskProvider')
  }
  const { testsToCheck, fastTestToCheck } = context
  const t = useTranslations('Task')

  const renderContent = () => {
    if (fastTestToCheck) {
      return <FastTestResultView test={fastTestToCheck} />
    }
    if (testsToCheck.length > 0) {
      return <TestResultView tests={testsToCheck} />
    }
    return null
  }

  return (
    <div className='flex h-55'>
      <TabSkeleton tabs={[{ label: t('testResult') }]}>
        {renderContent()}
      </TabSkeleton>
    </div>
  )
}

export default TestResult
