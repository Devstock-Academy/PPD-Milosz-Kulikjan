'use client'
import { useQuery } from '@tanstack/react-query'
import { JsTask } from '../../../types/JsTask'

export const useJsTasks = (offset: number = 0, limit: number = 1) => {
  return useQuery<JsTask[], Error>({
    queryKey: ['jsTasks', offset, limit], 
    queryFn: async () => {
      const res = await fetch(`/api/js-tasks?limit=${limit}&offset=${offset}`)
      if (!res.ok) throw new Error('Błąd pobierania zadań')
      return res.json()
    },
  })
}
