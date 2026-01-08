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

export const CodeProvider = ({ children }: { children: React.ReactNode }) => {
  const [code, setCode] = React.useState<string>('console.log("Hello World");')
  const [output, setOutput] = React.useState<string>('')

  const runCode = async (): Promise<string> => {
    console.log('[runCode] Starting execution, code length:', code.length)

    if (!code || code.trim() === '') {
      const msg = 'Please enter some code to execute'
      setOutput(msg)
      return msg
    }

    try {
      const apiUrl = '/api/run-code'
      console.log('[runCode] Fetching from:', apiUrl)

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ code }),
      })

      console.log('[runCode] Response status:', res.status)

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      console.log('[runCode] Received data:', data)

      setOutput(data.output || 'No output received')
      return data.output || 'No output received'
    } catch (err: any) {
      console.error('[runCode] Error:', err.message)
      const errorMsg = `Error: ${err.message}`
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
