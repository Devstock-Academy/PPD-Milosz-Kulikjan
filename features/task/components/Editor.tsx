'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import MonacoEditor, { BeforeMount } from '@monaco-editor/react'

import TabSkeleton from './TabSkeleton'
import EditorActions from './EditorActions'
import { useCode } from '@/context/EditorContext'
import { registerTaskTheme } from '@/features/monaco/taskTheme'

const Editor = () => {
  const [hasErrors, setHasErrors] = React.useState(false)
  const { setCode } = useCode()

  const t = useTranslations('Task')

  const handleValidation = (markers: any[]) => {
    const monacoErrors = markers.length > 0
    setHasErrors(monacoErrors)
  }

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) setCode(value)
  }

  const handleBeforeMount: BeforeMount = (monaco) => {
    registerTaskTheme(monaco)
  }

  return (
    <TabSkeleton tabs={[{ label: t('editor') }]}>
      <div className='flex h-full w-full flex-col'>
        <div className='flex-1 overflow-hidden rounded shadow-tabBarShadow'>
          <MonacoEditor
            language='javascript'
            height='100%'
            width='100%'
            theme='taskTheme'
            beforeMount={handleBeforeMount}
            onValidate={handleValidation}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              scrollbar: {
                vertical: 'auto',
                horizontal: 'auto',
                verticalScrollbarSize: 6,
                horizontalScrollbarSize: 6,
              },
              lineNumbersMinChars: 3,
            }}
          />
        </div>
        <EditorActions hasErrors={hasErrors} />
      </div>
    </TabSkeleton>
  )
}

export default Editor
