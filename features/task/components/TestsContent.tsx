'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { useSnackbar } from 'notistack'

import TestsBlockCode from './TestsBlockCode'
import { TestContext } from '@/context'
import { useCode } from '@/context/EditorContext'
import { useTestCode } from '@/features/task/hooks/useTestCode'

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
  const { enqueueSnackbar } = useSnackbar()
  const context = React.useContext(TestContext)
  if (!context) {
    throw new Error('TestContext must be used within a TaskProvider')
  }

  const { setTestsToCheck, setFastTestToCheck, taskId, userId } = context
  const { code } = useCode()
  const { mutate: testCode, isPending } = useTestCode(taskId, userId)
  const t = useTranslations('Tests')

  const runTests = () => {
    testCode(
      {
        solution: code,
        variant: 'test',
      },
      {
        onSuccess: (result) => {
          if (result.results) {
            const updatedTests = result.results.map((testResult, idx) => ({
              ...tests[idx],
              expectedResult: String(testResult.expectedResult),
              yourResult: String(testResult.codeOutcome),
              passed: testResult.testOutcome,
            }))

            setFastTestToCheck(undefined)
            setTestsToCheck(updatedTests)
          }
        },
        onError: (err) => {
          enqueueSnackbar(err.message, { variant: 'error' })
        },
      }
    )
  }

  return (
    <div className='flex h-full w-full flex-col gap-4 overflow-y-auto p-4'>
      <button
        onClick={runTests}
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
