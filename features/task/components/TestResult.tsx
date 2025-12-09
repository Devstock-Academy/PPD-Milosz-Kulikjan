'use client'

import React from 'react'

import TabSkeleton from './TabSkeleton'

type Props = React.PropsWithChildren<{
  tabs: { label: string }[]
}>

const TestResult = ({ tabs, children }: Props) => {
  return <TabSkeleton tabs={tabs}>{children}</TabSkeleton>
}

export default TestResult
