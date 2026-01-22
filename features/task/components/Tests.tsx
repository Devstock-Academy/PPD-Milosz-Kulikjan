'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

import TabSkeleton from './TabSkeleton'
import TestsContent, { type TestItem } from './TestsContent'
import { FastTestsContent } from '.'

import type { JsTaskTest } from '@/types/JsTask'

type TestsProps = {
  tests: JsTaskTest[]
}

const Tests = ({ tests }: TestsProps) => {
  const t = useTranslations('Task')

  const testItems: TestItem[] = tests.map((test) => {
    const inputData = test.input.join(', ')
    return {
      testCode: inputData,
      inputData: inputData,
      expectedResult: test.output,
      yourResult: '',
      passed: null,
    }
  })

  return (
    <div className='flex h-55 w-full'>
      <TabSkeleton tabs={[{ label: t('test') }, { label: t('fastTests') }]}>
        {[
          <TestsContent key='tests' tests={testItems} />,
          <FastTestsContent
            key='fast-tests'
            fastTest={
              testItems[0] || {
                expectedResult: '',
                yourResult: '',
                passed: null,
              }
            }
          />,
        ]}
      </TabSkeleton>
    </div>
  )
}

export default Tests
