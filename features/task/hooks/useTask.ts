'use client'
import { useQuery } from '@tanstack/react-query'
import { JsTask } from '../../../types/JsTask'

export const useTask = (id: string, userId: string) => {
  return useQuery<JsTask, Error>({
    queryKey: ['task', id, userId],
    queryFn: async () => {
      const res = await fetch(`/api/js-task/${id}/${userId}`)
      if (!res.ok) throw new Error('Błąd pobierania zadania')
      return res.json()
    },
    enabled: !!id && !!userId,
  })
}
