'use client'

import { useTranslations } from 'next-intl'

import { DescriptionTitleIcon } from '@/icons'
import CodeBlock from './CodeBlock'

export type DescriptionData = {
  category: string
  solutionsCount: number
  difficulty: string
  title: string
  description: string
  sampleInput?: string
  sampleOutput?: string
}

type DescriptionContentProps = {
  data: DescriptionData
}

const DescriptionContent = ({ data }: DescriptionContentProps) => {
  const t = useTranslations('TaskDescription')

  return (
    <div className='flex flex-col justify-center space-y-2 p-4 pt-1.5 text-xs font-medium'>
      <div className='flex items-center gap-4'>
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
      </div>

      <p className='flex gap-1'>
        <span>{t('difficulty')}:</span>
        <span>{data.difficulty}</span>
      </p>

      <div className='flex items-center gap-4 text-2xl font-medium'>
        {data.title}
        <DescriptionTitleIcon />
      </div>

      <p>{data.description}</p>

      {data.sampleInput && (
        <CodeBlock label={t('sampleInput')} content={data.sampleInput} />
      )}

      {data.sampleOutput && (
        <CodeBlock label={t('sampleOutput')} content={data.sampleOutput} />
      )}
    </div>
  )
}

export default DescriptionContent
