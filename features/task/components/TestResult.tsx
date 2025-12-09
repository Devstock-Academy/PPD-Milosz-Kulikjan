'use client'

import React from 'react'

import TabSkeleton from './TabSkeleton'

type Props = {
  tabs: { label: string }[]
}

const TestResult = ({
  tabs,
  children,
}: Props & { children: React.ReactNode[] | React.ReactNode }) => {
  return <TabSkeleton tabs={tabs} children={children} />
}

export default TestResult
