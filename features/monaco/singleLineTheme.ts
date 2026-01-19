import type { Monaco } from '@monaco-editor/react'

export const registerSingleLineTheme = (monaco: Monaco) => {
  monaco.editor.defineTheme('singleLineTheme', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: '', foreground: 'FFFFFF' },
    ],
    colors: {
      'editor.background': '#222426', 
      'editor.foreground': '#FFFFFF', 
      'editorGutter.background': '#333537', 
      'editorLineNumber.activeForeground': '#FFFFFF', 
      'editor.selectionBackground': '#3A3C3E', 
      'editor.lineHighlightBackground': '#00000000', 
      'editorCursor.foreground': '#FFFFFF',
      'editorWhitespace.foreground': '#3A3C3E', 
      'editorIndentGuide.background': '#3A3C3E', 
      'editorIndentGuide.activeBackground': '#3A3C3E', 
    },
  })
}
