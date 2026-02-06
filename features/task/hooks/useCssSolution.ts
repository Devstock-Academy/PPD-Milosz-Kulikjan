'use client'

import { useMutation } from '@tanstack/react-query'

type CssSolutionRequest = {
  solution: string
  checkOnly?: boolean
}

type CssSolutionResponse = {
  success: boolean
  similarity: number
  saved: boolean
  error?: string
}

export const useCssSolution = (taskId: string, userId: string) => {
  return useMutation<CssSolutionResponse, Error, CssSolutionRequest>({
    mutationFn: async ({ solution, checkOnly }: CssSolutionRequest) => {
      const query = checkOnly ? '?checkOnly=true' : ''
      const res = await fetch(`/api/css-task/${taskId}/${userId}${query}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ solution }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error?.error || 'Błąd serwera')
      }

      return res.json()
    },
  })
}
