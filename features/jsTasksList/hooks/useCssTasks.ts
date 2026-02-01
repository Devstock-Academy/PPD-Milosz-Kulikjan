'use client'
import { useQuery } from '@tanstack/react-query'

export const useCssTasks = (
  offset: number = 0,
  limit: number = 1,
  userId?: string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ['cssTasks', offset, limit, userId],
    queryFn: async () => {
      const url = `/api/css-task?limit=${limit}&offset=${offset}${
        userId ? `&userId=${userId}` : ''
      }`
      const res = await fetch(url)
      if (!res.ok) throw new Error('Błąd pobierania zadań CSS')
      return res.json()
    },
    enabled: enabled && !!userId,
  })
}
