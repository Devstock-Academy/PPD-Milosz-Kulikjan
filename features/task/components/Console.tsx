'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import MonacoEditor, { BeforeMount } from '@monaco-editor/react'

import TabSkeleton from './TabSkeleton'
import { useCode } from '@/context/EditorContext'
import { registerTaskTheme } from '@/features/monaco/taskTheme'

const Console = () => {
  const { output } = useCode()
  const t = useTranslations('Task')

  const handleBeforeMount: BeforeMount = (monaco) => {
    registerTaskTheme(monaco)
  }

  return (
    <TabSkeleton tabs={[{ label: t('console') }]}>
      <div className='h-48 overflow-hidden rounded shadow-tabBarShadow'>
        <MonacoEditor
          height='100%'
          width='100%'
          language='plaintext'
          theme='taskTheme'
          beforeMount={handleBeforeMount}
          value={output}
          options={{
            readOnly: true,
            lineNumbers: 'off',
            glyphMargin: false,
            folding: false,
            lineDecorationsWidth: 0,
            minimap: { enabled: false },
            scrollbar: {
              vertical: 'hidden',
              horizontal: 'hidden',
              verticalScrollbarSize: 6,
              alwaysConsumeMouseWheel: false,
              useShadows: false,
            },
            renderLineHighlight: 'none',
            cursorStyle: 'line',
            cursorBlinking: 'solid',
            renderWhitespace: 'none',
            overviewRulerLanes: 0,
            automaticLayout: true,
          }}
        />
      </div>
    </TabSkeleton>
  )
}

export default Console
