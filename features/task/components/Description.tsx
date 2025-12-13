'use client'

import React from 'react'
import TabSkeleton from './TabSkeleton'
import { useTranslations } from 'next-intl'
import { DescriptionTitleIcon } from '@/icons'
import CodeBlock from './CodeBlock'

export type DescriptionProps = {
  category: string
  solutionsCount: number
  difficulty: string
  title: string
  description: string
  sampleInput?: string
  sampleOutput?: string
}

type Props = React.PropsWithChildren<{
  tabs: { label: string }[]
  descriptionData?: DescriptionProps
}>

const Description = ({ tabs, children, descriptionData }: Props) => {
  // It would be easier to use :? but since Documentation mentions it as bad practice I used if() else
  const t = useTranslations('TaskDescription')
  let content: React.ReactNode

  if (descriptionData) {
    content = (
      <div className='flex flex-col justify-center space-y-2 p-4 pt-1.5 text-xs font-medium'>
        <div className='flex items-center gap-4'>
          <p className='flex gap-1'>
            <span>{t('category')}:</span>
            <span>{descriptionData.category}</span>
          </p>
          <div className='h-5 w-px bg-white' />
          <p className='flex gap-1'>
            <span>{t('solutionsCount')}:</span>
            <span>{descriptionData.solutionsCount}</span>
          </p>
          <div className='h-5 w-px bg-white' />
        </div>

        <p className='flex gap-1'>
          <span>{t('difficulty')}:</span>
          <span>{descriptionData.difficulty}</span>
        </p>

        <div className='flex items-center gap-4 text-2xl font-medium'>
          {descriptionData.title}
          <DescriptionTitleIcon />
        </div>
        <p>{descriptionData.description}</p>

        {descriptionData.sampleInput && (
          <CodeBlock
            label={t('sampleInput')}
            content={descriptionData.sampleInput}
          />
        )}

        {descriptionData.sampleOutput && (
          <CodeBlock
            label={t('sampleOutput')}
            content={descriptionData.sampleOutput}
          />
        )}
      </div>
    )
  } else {
    content = children
  }

  return <TabSkeleton tabs={tabs}>{content}</TabSkeleton>
}

export default Description
