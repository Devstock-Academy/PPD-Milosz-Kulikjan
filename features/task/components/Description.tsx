'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

import { DescriptionTitleIcon } from '@/icons'
import CodeBlock from './CodeBlock'
import TabSkeleton from './TabSkeleton'

export type DescriptionData = {
  category: string
  solutionsCount: number
  difficulty: string
  title: string
  description: string
  sampleInput?: string
  sampleOutput?: string
}

const exampleTask: DescriptionData = {
  category: 'JavaScript',
  solutionsCount: 123,
  difficulty: 'Łatwy',
  title: 'Two Sum Problem',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  sampleInput: '[2, 7, 11, 15], target = 9',
  sampleOutput: '[0, 1]',
}

type DescriptionProps = {
  data?: DescriptionData
}

const Description = ({ data = exampleTask }: DescriptionProps) => {
  const t = useTranslations('TaskDescription')
  const tTask = useTranslations('Task')

  return (
    <div className='flex h-55'>
      <TabSkeleton tabs={[{ label: tTask('description') }]}>
        <div className='flex flex-col justify-center space-y-2 p-4 pt-1.5 text-xs font-medium'>
          <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
            <p className='flex gap-1'>
              <span>{t('category')}:</span>
              <span>{data.category}</span>
            </p>
            <div className='h-5 w-px bg-white' />
            <p className='flex gap-1'>
              <span>{t('solutionsCount')}:</span>
              <span>{data.solutionsCount}</span>
            </p>
            <div className='h-5 w-px bg-white' />
            <p className='flex gap-1'>
              <span>{t('difficulty')}:</span>
              <span>{data.difficulty}</span>
            </p>
          </div>

          <div className='flex items-center gap-4 text-2xl font-medium'>
            {data.title}
            <DescriptionTitleIcon />
          </div>

          <p>{data.description}</p>

          {data.sampleInput && (
            <CodeBlock label={t('sampleInput')}>{data.sampleInput}</CodeBlock>
          )}

          {data.sampleOutput && (
            <CodeBlock label={t('sampleInput')}>{data.sampleOutput}</CodeBlock>
          )}
        </div>
      </TabSkeleton>
    </div>
  )
}

export default Description
