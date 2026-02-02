'use client'
import { useQuery } from '@tanstack/react-query'
import { JsTask } from '../../../types/JsTask'

export const useJsTasks = (
  offset: number = 0,
  limit: number = 1,
  userId?: string,
  enabled: boolean = true
) => {
  return useQuery<JsTask[], Error>({
    queryKey: ['jsTasks', offset, limit, userId],
    queryFn: async () => {
      const url = `/api/js-tasks?limit=${limit}&offset=${offset}${
        userId ? `&userId=${userId}` : ''
      }`
      const res = await fetch(url)
      if (!res.ok) throw new Error('Błąd pobierania zadań')
      return res.json()
    },
    enabled: enabled && !!userId,
  })
}
