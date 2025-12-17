'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

import TabSkeleton from './TabSkeleton'

const Console = () => {
  const t = useTranslations('Task')
  return <TabSkeleton tabs={[{ label: t('console') }]}>Konsola</TabSkeleton>
}

export default Console
