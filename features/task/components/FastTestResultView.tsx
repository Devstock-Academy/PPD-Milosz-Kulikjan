'use client'

import React from 'react'
import clsx from 'clsx'

import TestsBlockCode from './TestsBlockCode'
import { TestItem } from './TestsContent'
import { useTranslations } from 'next-intl'

type FastTestResultViewProps = {
  test: TestItem
}

const FastTestResultView = ({ test }: FastTestResultViewProps) => {
  const t = useTranslations('Tests')
  return (
    <div
      className={clsx(
        'flex h-full w-full flex-col gap-4 rounded-b-lg border p-2 text-sm',
        test.passed === true && 'border-clockActive',
        test.passed === false && 'border-buttonRed'
      )}
    >
      <span>
        {t('yourCode')} {test.passed === true && t('fastPassed')}
        {test.passed === false && t('fastNotPassed')}
      </span>
      <div>
        <span>{t('expectedResult')}</span>
        <TestsBlockCode code={test.expectedResult} />
      </div>
      <div>
        <span>{t('yourResult')}</span>
        <TestsBlockCode code={test.yourResult} />
      </div>
    </div>
  )
}

export default FastTestResultView
