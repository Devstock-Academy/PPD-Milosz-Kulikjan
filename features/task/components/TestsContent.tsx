'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

import TestsBlockCode from './TestsBlockCode'
import { TestContext } from '@/context'

export type TestItem = {
  testCode?: string
  inputData?: string
  expectedResult: string
  yourResult: string
  passed: boolean | null
}

type TestsContentProps = {
  tests: TestItem[]
}

const TestsContent = ({ tests }: TestsContentProps) => {
  const context = React.useContext(TestContext)
  if (!context) {
    throw new Error('TestContext must be used within a TaskProvider')
  }

  const { setTestsToCheck, setFastTestToCheck } = context
  const t = useTranslations('Tests')

  const showResults = () => {
    setFastTestToCheck(undefined)
    setTestsToCheck(tests)
  }

  return (
    <div className='flex h-full w-full flex-col gap-4 overflow-y-auto p-4'>
      <button
        onClick={showResults}
        className='h-10 w-full flex-none cursor-pointer rounded-lg bg-buttonOrange font-semibold text-white'
      >
        {t('normalTestButton')}
      </button>

      {tests.map((test, idx) => (
        <div key={idx} className='flex flex-col'>
          <span className='text-xs'>
            {t('testCase')} {idx + 1}
          </span>

          <TestsBlockCode code={test.testCode ?? ''} />
        </div>
      ))}
    </div>
  )
}

export default TestsContent
