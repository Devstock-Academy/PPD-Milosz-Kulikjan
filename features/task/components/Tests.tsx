'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

import TabSkeleton from './TabSkeleton'

const Tests = () => {
  const t = useTranslations('Task')
  return (
    <TabSkeleton tabs={[{ label: t('test') }, { label: t('fastTests') }]}>
      {['Test Content', 'Fast test content']}
    </TabSkeleton>
  )
}

export default Tests
