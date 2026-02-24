'use client'

import React from 'react'
import MonacoEditor, { BeforeMount, OnMount } from '@monaco-editor/react'

import { registerSingleLineTheme } from '@/features/monaco/singleLineTheme'

type SingleLineEditorProps = {
  value?: string
  onChange?: (value: string) => void
  language?: string
}

const LINE_HEIGHT = 25

const SingleLineEditor = ({
  value = '',
  onChange,
  language = 'javascript',
}: SingleLineEditorProps) => {
  const [editorHeight, setEditorHeight] = React.useState(LINE_HEIGHT)

  const handleBeforeMount: BeforeMount = (monaco) => {
    registerSingleLineTheme(monaco)
  }

  const handleEditorMount: OnMount = (editor) => {
    const updateHeight = () => {
      const lineCount = editor.getModel()?.getLineCount() || 1
      setEditorHeight(lineCount * LINE_HEIGHT)
    }

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
    editor.onDidChangeModelContent(() => {
      updateHeight()
      updateLineDigits()
    })
    updateHeight()
  }

  const handleChange = (value: string | undefined) => {
    if (onChange) onChange(value || '')
  }

  return (
    <div className='single-line-editor overflow-hidden rounded-lg border border-borderBg bg-grayBg shadow-tabBarShadow'>
      <MonacoEditor
        language={language}
        height={`${editorHeight}px`}
        width='100%'
        theme='singleLineTheme'
        value={value}
        beforeMount={handleBeforeMount}
        onMount={handleEditorMount}
        onChange={handleChange}
        options={{
          minimap: { enabled: false },
          scrollbar: {
            horizontal: 'hidden',
            vertical: 'hidden',
            alwaysConsumeMouseWheel: false,
          },
          lineHeight: LINE_HEIGHT,
          padding: { top: 0, bottom: 0 },
          scrollBeyondLastLine: false,
          renderLineHighlight: 'none',
          cursorStyle: 'line',
          cursorBlinking: 'solid',
          renderWhitespace: 'none',
          overviewRulerLanes: 0,
        }}
      />
    </div>
  )
}

export default SingleLineEditor
