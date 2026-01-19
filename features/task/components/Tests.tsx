'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

import TabSkeleton from './TabSkeleton'
import TestsContent, { type TestItem } from './TestsContent'
import { FastTestsContent } from '.'

const mockTestNormalPassed: TestItem = {
  testCode: '["a","b","c", 1, 2, 3]',
  inputData: '2 + 2',
  expectedResult: '["a","b","c", 1, 2, 3]',
  yourResult: '["a","b","c", 1, 2, 3]',
  passed: true,
}

const mockTestNormalFailed: TestItem = {
  testCode: '["a","b","c", 1, 2, 3]',
  inputData: '2 + 2',
  expectedResult: '["a","b","c", 1, 2, 3]',
  yourResult: '["a","b","c", 1, 2, 3]',
  passed: false,
}

const mockTestFastPassed: TestItem = {
  expectedResult: '["a","b","c", 1, 2, 3]',
  yourResult: '["a","b","c", 1, 2, 3]',
  passed: true,
}

const mockTestFastFailed: TestItem = {
  expectedResult: '["a","b","c", 1, 2, 3]',
  yourResult: '["a","b","c", 1, 2, 3]',
  passed: false,
}

const Tests = () => {
  const t = useTranslations('Task')
  return (
    <div className='flex h-55 w-full'>
      <TabSkeleton tabs={[{ label: t('test') }, { label: t('fastTests') }]}>
        {[
          <TestsContent
            key='tests'
            tests={[
              mockTestNormalPassed,
              mockTestNormalFailed,
              mockTestNormalFailed,
              mockTestNormalPassed,
            ]}
          />,
          <FastTestsContent key='fast-tests' fastTest={mockTestFastPassed} />,
        ]}
      </TabSkeleton>
    </div>
  )
}

export default Tests
