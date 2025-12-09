'use client'

import React from 'react'

import TabSkeleton from './TabSkeleton'

type Props = React.PropsWithChildren<{
  tabs: { label: string }[]
}>

const Console = ({ tabs, children }: Props) => {
  return <TabSkeleton tabs={tabs}>{children}</TabSkeleton>
}

export default Console
