'use client'

import React from 'react'
import SingleLineEditor from './SignleLineEditor'
import { useTranslations } from 'next-intl'
import { TestContext } from '@/context'
import { TestItem } from './TestsContent'

type FastTestsContentProps = {
  fastTest: TestItem
}

const FastsTestContent = ({ fastTest }: FastTestsContentProps) => {
  const t = useTranslations('Tests')
  const context = React.useContext(TestContext)
  const [localValue, setLocalValue] = React.useState('')

  if (!context) {
    throw new Error('FastsTestContent must be used within a TaskProvider')
  }

  const { setFastTestToCheck } = context
  const handleButtonClick = () => {
    setFastTestToCheck(fastTest)
    setLocalValue('')
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
