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
  taskId: string
  userId: string
}

export const TestContext = React.createContext<TestContextProps | null>(null)

export const TaskProvider = ({
  children,
  taskId = '',
  userId = '',
}: {
  children: React.ReactNode
  taskId?: string
  userId?: string
}) => {
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
        taskId,
        userId,
      }}
    >
      {children}
    </TestContext.Provider>
  )
}
