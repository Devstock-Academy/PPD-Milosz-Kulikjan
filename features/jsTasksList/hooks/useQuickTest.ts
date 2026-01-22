import { useMutation } from '@tanstack/react-query'

type QuickTestBody = {
  solution: string
  variant: 'quickTest'
  quickTest: {
    input: any[]
  }
}

type QuickTestResult = {
  input: any[]
  expectedResult: any
  codeOutcome: any
  testOutcome: boolean
}

export const useQuickTest = (taskId: string, userId: string) => {
  return useMutation<QuickTestResult, any, QuickTestBody>({
    mutationFn: async (body) => {
      const res = await fetch(`/api/js-tasks/${taskId}/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error?.error || 'Błąd serwera')
      }

      return res.json()
    },
  })
}
