import type { Monaco } from '@monaco-editor/react'

export const registerTaskTheme = (monaco: Monaco) => {
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
