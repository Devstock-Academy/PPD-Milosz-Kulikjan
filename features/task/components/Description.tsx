'use client'

import React from 'react'
import TabSkeleton from './TabSkeleton'
import { useTranslations } from 'next-intl'

import DescriptionContent, {
  DescriptionData,
} from '@/features/task/components/DescriptionContext'

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

const Description = () => {
  const t = useTranslations('Task')
  return (
    <TabSkeleton tabs={[{ label: t('description') }]}>
      <DescriptionContent data={exampleTask} />
    </TabSkeleton>
  )
}

export default Description
