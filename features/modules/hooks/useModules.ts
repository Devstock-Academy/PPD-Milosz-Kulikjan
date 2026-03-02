'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

export type ActivityBase = {
  id: string
  name: string
  description?: string
  type?: 'javascript' | 'css'
}

export type Sprint = {
  id: string
  name: string
  shortDescription?: string
  longDescription?: string
  difficultyLevel?: string
  technologies?: { id: string; name: string }[]
  activities: ActivityBase[]
  duration?: number
  sprintNumber?: number
  totalTasks?: number
  completedCount?: number
  progress?: number
}

export type Module = {
  id: string
  moduleIndex: number
  name: string
  description?: string
  moduleVideo?: string
  input?: string
  output?: string
  sprints?: number | Sprint[]
  difficultyLevel?: 'EASY' | 'MEDIUM' | 'HARD'
  moduleLength?: number
  totalDuration?: number
  totalTasks?: number
  completedCount?: number
  progress?: number
  createdAt?: string
  updatedAt?: string
}

const fetchModules = async (userId?: string): Promise<Module[]> => {
  const url = new URL('/api/modules', location.origin)
  if (userId) url.searchParams.set('userId', userId)
  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error('Nie udało się pobrać modułów')
  }

  return response.json()
}

const fetchModuleById = async (
  id: number,
  userId?: string
): Promise<Module> => {
  const url = new URL(`/api/modules/${id}`, location.origin)
  if (userId) url.searchParams.set('userId', userId)

  const response = await fetch(url.toString())
  if (!response.ok) throw new Error('Nie udało się pobrać modułu')
  return response.json()
}

const fetchSprintsByModule = async (
  moduleId: string,
  userId?: string
): Promise<{ sprints: Sprint[]; totalDuration: number }> => {
  const url = new URL(`/api/sprints`, location.origin)
  url.searchParams.set('moduleId', moduleId)
  if (userId) url.searchParams.set('userId', userId)

  const response = await fetch(url.toString())
  if (!response.ok) throw new Error('Nie udało się pobrać sprintów')
  return response.json()
}

const fetchSprintById = async (
  id: string,
  userId?: string
): Promise<Sprint> => {
  const url = new URL(`/api/sprints/${id}`, location.origin)
  if (userId) url.searchParams.set('userId', userId)
  const response = await fetch(url.toString())
  if (!response.ok) throw new Error('Nie udało się pobrać sprintu')
  return response.json()
}

export const useModules = (userId?: string) => {
  return useQuery({
    queryKey: ['modules', userId],
    queryFn: () => fetchModules(userId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

export const useModule = (index?: string, userId?: string) =>
  useQuery({
    queryKey: ['module', index, userId],
    enabled: index !== undefined,
    queryFn: async () => {
      if (index === undefined) throw new Error('Brak id modułu')

      const mod = await fetchModuleById(Number(index), userId)
      return mod
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  })

export const useSprints = (moduleId?: string, userId?: string) =>
  useQuery({
    queryKey: ['sprints', moduleId, userId],
    enabled: moduleId !== undefined,
    queryFn: () => fetchSprintsByModule(moduleId as string, userId),
  })

export const useSprint = (id?: string, userId?: string) =>
  useQuery({
    queryKey: ['sprint', id, userId],
    queryFn: () => fetchSprintById(id as string, userId),
  })
