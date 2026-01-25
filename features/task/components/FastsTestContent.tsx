'use client'

import React from 'react'
import SingleLineEditor from './SignleLineEditor'
import { useTranslations } from 'next-intl'
import { useSnackbar } from 'notistack'
import { TestContext } from '@/context'
import { useCode } from '@/context/EditorContext'
import { useTestCode } from '@/features/task/hooks/useTestCode'
import { TestItem } from './TestsContent'

type FastTestsContentProps = {
  fastTest: TestItem
}

const FastsTestContent = ({ fastTest }: FastTestsContentProps) => {
  const t = useTranslations('Tests')
  const { enqueueSnackbar } = useSnackbar()
  const context = React.useContext(TestContext)
  const { code } = useCode()
  const [localValue, setLocalValue] = React.useState('')

  if (!context) {
    throw new Error('FastsTestContent must be used within a TaskProvider')
  }

  const { setFastTestToCheck, setCodeInput, taskId, userId } = context
  const { mutate: testCode, isPending } = useTestCode(taskId, userId)

  const handleButtonClick = () => {
    if (!localValue.trim()) return

    const inputArray = [localValue]

    testCode(
      {
        solution: code,
        variant: 'quickTest',
        quickTest: {
          input: inputArray,
        },
      },
      {
        onSuccess: (result) => {
          setFastTestToCheck({
            ...fastTest,
            expectedResult: String(result.expectedResult),
            yourResult: String(result.codeOutcome),
            passed: result.testOutcome ?? null,
          })

          setCodeInput(localValue)
          setLocalValue('')
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
        onClick={handleButtonClick}
        className='h-10 w-full flex-none cursor-pointer rounded-lg bg-buttonOrange font-semibold text-white'
      >
        {t('fastTestButton')}
      </button>

      <div className='flex flex-col'>
        <span className='text-xs'>{t('value')}</span>
        <SingleLineEditor value={localValue} onChange={setLocalValue} />
      </div>
    </div>
  )
}

export default FastsTestContent
