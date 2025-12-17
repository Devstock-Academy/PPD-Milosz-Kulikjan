'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

import TabSkeleton from './TabSkeleton'

const Editor = () => {
  const t = useTranslations('Task')
  return <TabSkeleton tabs={[{ label: t('editor') }]}>Edytor kodu</TabSkeleton>
}

export default Editor
