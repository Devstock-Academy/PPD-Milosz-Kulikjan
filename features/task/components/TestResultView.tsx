'use client'

import React, { useState } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

import { ChevronIcon, FalseIcon, TrueIcon } from '@/icons'

import TestsBlockCode from './TestsBlockCode'
import { TestItem } from './TestsContent'

type TestResultViewProps = {
  tests: TestItem[]
}

const TestResultView = ({ tests }: TestResultViewProps) => {
  const t = useTranslations('Tests')
  const [expanded, setExpanded] = useState<boolean[]>(() =>
    tests.map(() => false)
  )

  const toggleExpand = (idx: number) => {
    setExpanded((prev) =>
      prev.map((v, i) => (i === idx && !v) || (i !== idx && v))
    )
  }

  const passedCount = tests.filter((t) => t.passed === true).length
  const totalCount = tests.length
  const allPassed = passedCount === totalCount

  return (
    <div className='flex flex-col gap-2 p-4'>
      <div className='flex items-center justify-between gap-3'>
        <span className='text-sm font-medium'>
          {allPassed && (
            <div className='flex items-center gap-4'>
              {t('allPassed')} <TrueIcon />
            </div>
          )}
          {!allPassed && (
            <div className='flex items-center gap-4'>
              {t('notAllPassed')} <FalseIcon />
            </div>
          )}
        </span>

        <div
          className={clsx(
            'ml-2 px-3 py-1 text-xs font-medium',
            allPassed && 'text-clockActive',
            !allPassed && 'text-buttonRed'
          )}
        >
          {passedCount}/{totalCount}
        </div>
      </div>
      {tests.map((test, idx) => {
        const isExpanded = expanded[idx]
        const testPassed = test.passed === true
        const testFailed = test.passed === false

        return (
          <div
            key={idx}
            className={clsx(
              'flex w-full flex-col rounded-lg border bg-lightGrayBg shadow-tabBarShadow',
              testPassed && 'border-clockActive',
              testFailed && 'border-buttonRed'
            )}
          >
            <div
              onClick={() => toggleExpand(idx)}
              className={clsx(
                'flex w-full cursor-pointer items-center justify-between rounded-lg border p-2 font-semibold',
                testPassed && 'border-clockActive',
                testFailed && 'border-buttonRed'
              )}
            >
              <div className='flex items-center gap-2'>
                <span className='text-sm font-medium'>
                  {t('testCase')} {idx + 1}
                </span>
                <span className='text-sm font-medium'>
                  {testPassed && t('passed')}
                  {testFailed && t('notPassed')}
                </span>
              </div>

              <div
                className={clsx(
                  'transition-transform duration-200',
                  isExpanded && 'rotate-180'
                )}
              >
                <ChevronIcon />
              </div>
            </div>
            {isExpanded && (
              <div className='flex flex-col gap-3 rounded-lg border-clockActive bg-lightGrayBg p-4 text-xs'>
                <div className='flex flex-col'>
                  <span className='font-medium'>{t('expectedResult')}</span>
                  <TestsBlockCode code={test.expectedResult} />
                </div>

                <div className='flex flex-col'>
                  <span className='font-medium'>{t('yourResult')}</span>
                  <TestsBlockCode code={test.yourResult} />
                </div>

                {test.inputData && (
                  <div className='flex flex-col'>
                    <span className='font-medium'>{t('givenValue')}</span>
                    <TestsBlockCode code={test.inputData} />
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default TestResultView
