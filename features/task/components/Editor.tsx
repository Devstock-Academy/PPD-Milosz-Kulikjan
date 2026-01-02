'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import MonacoEditor, { BeforeMount } from '@monaco-editor/react'

import TabSkeleton from './TabSkeleton'
import EditorActions from './EditorActions'

const Editor = () => {
  const [hasErrors, setHasErrors] = React.useState(false)

  const t = useTranslations('Task')

  const handleValidation = (markers: any[]) => {
    const monacoErrors = markers.length > 0
    setHasErrors(monacoErrors)
  }

  const handleBeforeMount: BeforeMount = (monaco) => {
    monaco.editor.defineTheme('taskTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#222426',
        'editorGutter.background': '#333537',
        'editorLineNumber.foreground': '#BDBDBD',
        'editorLineNumber.activeForeground': '#FFFFFF',
        'scrollbarSlider.background': '#ffffff',
        'scrollbarSlider.hoverBackground': '#f0f0f0',
        'scrollbarSlider.activeBackground': '#ffffff',
        'scrollbar.shadow': '#222426',
      },
    })
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
