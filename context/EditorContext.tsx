import React from 'react'

type EditorContextType = {
  code: string
  setCode: (code: string) => void
  runCode: () => string // teraz zwraca string
  output: string
}

const EditorContext = React.createContext<EditorContextType | undefined>(
  undefined
)

export const CodeProvider = ({ children }: { children: React.ReactNode }) => {
  const [code, setCode] = React.useState<string>('')
  const [output, setOutput] = React.useState<string>('There is nothing to show')

  const runCode = (): string => {
    if (!code || code.trim() === '') {
      const msg = 'Nothing to execute'
      setOutput(msg)
      return msg
    }

    try {
      let result = ''
      // przechwytujemy console.log
      const originalLog = console.log
      console.log = (...args: any[]) => {
        result += args.join(' ') + '\n'
      }

      const fn = new Function(code) // <-- bez "return"
      fn() // wykonujemy kod

      console.log = originalLog // przywracamy oryginalny console.log
      setOutput(result || 'No output')
      return result || 'No output'
    } catch (err: any) {
      setOutput(err.message)
      return err.message
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
