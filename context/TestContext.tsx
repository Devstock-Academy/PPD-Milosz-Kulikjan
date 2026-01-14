'use client'

import React from 'react'
import { TestItem } from '@/features/task/components/TestsContent'

type TestContextProps = {
  testsToCheck: TestItem[]
  setTestsToCheck: React.Dispatch<React.SetStateAction<TestItem[]>>
  fastTestToCheck: TestItem | undefined
  setFastTestToCheck: React.Dispatch<React.SetStateAction<TestItem | undefined>>
  codeInput: string
  setCodeInput: React.Dispatch<React.SetStateAction<string>>
}

export const TestContext = React.createContext<TestContextProps | null>(null)

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [testsToCheck, setTestsToCheck] = React.useState<TestItem[]>([])
  const [codeInput, setCodeInput] = React.useState('')
  const [fastTestToCheck, setFastTestToCheck] = React.useState<TestItem>()

  return (
    <TestContext.Provider
      value={{
        testsToCheck,
        setTestsToCheck,
        fastTestToCheck,
        setFastTestToCheck,
        codeInput,
        setCodeInput,
      }}
    >
      {children}
    </TestContext.Provider>
  )
}
