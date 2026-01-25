'use client'

import { useMutation } from '@tanstack/react-query'

export type TestVariant = 'quickTest' | 'test' | 'solution'

export type TestCodeRequest = {
  solution: string
  variant: TestVariant
  quickTest?: {
    input: any[]
  }
  userId?: string
}

export type TestCodeResponse = {
  input?: any[]
  expectedResult?: any
  codeOutcome?: any
  testOutcome?: boolean
  allPassed?: boolean
  results?: Array<{
    input: any[]
    expectedResult: any
    codeOutcome: any
    testOutcome: boolean
  }>
  error?: string
  details?: string
}

export const useTestCode = (taskId: string, userId: string) => {
  return useMutation<TestCodeResponse, Error, TestCodeRequest>({
    mutationFn: async (data: TestCodeRequest) => {
      const response = await fetch(`/api/js-tasks/${taskId}/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Błąd podczas testowania kodu')
      }

      return response.json()
    },
  })
}
