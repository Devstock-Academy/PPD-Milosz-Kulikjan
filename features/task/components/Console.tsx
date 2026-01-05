'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

import TabSkeleton from './TabSkeleton'
import { useCode } from '@/context/EditorContext'
import MonacoEditor from '@monaco-editor/react'

const Console = () => {
  const { output } = useCode()
  const t = useTranslations('Task')
  return (
    <TabSkeleton tabs={[{ label: t('console') }]}>
      <div className='h-40 overflow-hidden rounded shadow-tabBarShadow'>
        <MonacoEditor
          height='100%'
          width='100%'
          language='javascript'
          theme='vs-dark'
          value={output} // pokazujemy wynik
          options={{
            readOnly: true, // konsola jest tylko do odczytu
            minimap: { enabled: false },
            scrollbar: { vertical: 'auto', horizontal: 'auto' },
            fontSize: 14,
          }}
        />
      </div>
    </TabSkeleton>
  )
}

export default Console
