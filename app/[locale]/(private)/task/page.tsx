'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import {
  ActionBar,
  Console,
  Description,
  Editor,
  TestResult,
  Tests,
} from '@/features/task'
import Test from '@/features/task/components/Test'

const Task = () => {
  const t = useTranslations('Task')
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  return (
    <div className='flex h-full w-full flex-col space-y-5 px-8 pb-8 pt-5 text-white'>
      <ActionBar
        isFullscreen={isFullscreen}
        onFullscreenChange={setIsFullscreen}
      />
      <div
        className={clsx('grid flex-1 transition-all duration-300', {
          'grid-fullscreen': isFullscreen,
          'gap-8 grid-normal': !isFullscreen,
        })}
      >
        <div className='flex h-full flex-col gap-4 overflow-hidden'>
          <div className='min-h-0 flex-1'>
            <Description tabs={[{ label: t('description') }]}>
              {['Description']}
            </Description>
          </div>

          <div className='min-h-0 flex-1'>
            <Tests tabs={[{ label: t('test') }, { label: t('fastTests') }]}>
              {['Test Content', 'Fast test content']}
            </Tests>
          </div>

          <div className='min-h-0 flex-1'>
            <TestResult tabs={[{ label: t('testResult') }]}>
              <Test />
            </TestResult>
          </div>
        </div>
        <div className='flex h-full flex-col gap-4'>
          <Editor tabs={[{ label: t('editor') }]}>Edytor kodu</Editor>

          <div className='h-40'>
            <Console tabs={[{ label: t('console') }]}>Konsola</Console>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Task
