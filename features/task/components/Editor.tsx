'use client'

import React from 'react'

import TabSkeleton from './TabSkeleton'

type Props = React.PropsWithChildren<{
  tabs: { label: string }[]
}>

const Editor = ({ tabs, children }: Props) => {
  return <TabSkeleton tabs={tabs}>{children}</TabSkeleton>
}

export default Editor
