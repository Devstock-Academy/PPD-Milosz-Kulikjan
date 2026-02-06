'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import MonacoEditor, {
  BeforeMount,
  OnMount,
  OnValidate,
} from '@monaco-editor/react'

import TabSkeleton from './TabSkeleton'
import EditorActions from './EditorActions'
import { useCode } from '@/context/EditorContext'
import { registerTaskTheme } from '@/features/monaco/taskTheme'

const Editor = ({
  withoutTab = false,
  withoutActions = false,
  language = 'javascript',
}: {
  withoutTab?: boolean
  withoutActions?: boolean
  language?: 'javascript' | 'html' | 'css'
}) => {
  const [hasErrors, setHasErrors] = React.useState(false)
  const { setCode } = useCode()
  const t = useTranslations('Task')

  const handleValidation: OnValidate = (markers) => {
    setHasErrors(markers.length > 0)
  }

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value)
    }
  }

  const handleEditorMount: OnMount = (editor) => {
    const updateLineDigits = () => {
      const model = editor.getModel()
      if (!model) return

      const lineCount = model.getLineCount()

      let digits = 3
      if (lineCount < 10) digits = 1
      else if (lineCount < 100) digits = 2

      editor.updateOptions({
        lineNumbersMinChars: digits + 3,
        lineDecorationsWidth: Math.max(1, 4 - digits),
      })
    }

    updateLineDigits()
    editor.onDidChangeModelContent(updateLineDigits)
  }

  const handleBeforeMount: BeforeMount = (monaco) => {
    registerTaskTheme(monaco)
  }

  const content = (
    <div className='flex h-full w-full flex-col'>
      <div className='flex-1 overflow-hidden rounded shadow-tabBarShadow'>
        <MonacoEditor
          language={language}
          height='100%'
          width='100%'
          theme='taskTheme'
          beforeMount={handleBeforeMount}
          onMount={handleEditorMount}
          onChange={handleEditorChange}
          onValidate={handleValidation}
          options={{
            minimap: { enabled: false },
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto',
              verticalScrollbarSize: 6,
              horizontalScrollbarSize: 6,
            },
          }}
        />
      </div>

      {!withoutActions && <EditorActions hasErrors={hasErrors} />}
    </div>
  )

  if (withoutTab) {
    return content
  }

  return <TabSkeleton tabs={[{ label: t('editor') }]}>{content}</TabSkeleton>
}

export default Editor
