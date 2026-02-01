'use client'

import React from 'react'

type EditorContextType = {
  code: string
  setCode: (code: string) => void
  runCode: () => Promise<string>
  output: string
}

const EditorContext = React.createContext<EditorContextType | undefined>(
  undefined
)

type CodeProviderProps = {
  children: React.ReactNode
  initialCode?: string
}

export const CodeProvider = ({
  children,
  initialCode = 'console.log("Hello World");',
}: CodeProviderProps) => {
  const [code, setCode] = React.useState<string>(initialCode)
  const [output, setOutput] = React.useState<string>('')

  const runCode = async (): Promise<string> => {
    if (!code || code.trim() === '') {
      const msg = 'Please enter some code to execute'
      setOutput(msg)
      return msg
    }

    try {
      const res = await fetch('/api/run-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ code }),
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()

      setOutput(data.output || 'No output received')
      return data.output || 'No output received'
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      const errorMsg = `Error: ${errorMessage}`
      setOutput(errorMsg)
      return errorMsg
    }
  }

  return (
    <EditorContext.Provider value={{ code, setCode, runCode, output }}>
      {children}
    </EditorContext.Provider>
  )
}

export const useCode = () => {
  const context = React.useContext(EditorContext)
  if (!context) throw new Error('useCode must be used within a CodeProvider')
  return context
}

export default EditorContext
