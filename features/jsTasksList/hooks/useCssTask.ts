'use client'
import { useQuery } from '@tanstack/react-query'

export const useCssTask = (id: string) => {
  return useQuery({
    queryKey: ['css-task', id],
    queryFn: async () => {
      const res = await fetch(`/api/css-task/${id}`)
      if (!res.ok) throw new Error('Błąd pobierania zadania CSS')
      return res.json()
    },
    enabled: !!id,
  })
}
