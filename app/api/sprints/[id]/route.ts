import { NextRequest, NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params
  const { searchParams } = new URL(req.url)

  const userId = searchParams.get('userId')

  try {
    const sprint = await prisma.sprint.findUnique({
      where: { id },
      include: {
        module: {
          select: {
            id: true,
            name: true,
            moduleIndex: true,
          },
        },
        technologies: true,
      },
    })

    if (!sprint) {
      return NextResponse.json(
        { error: 'Sprint nie znaleziony' },
        { status: 404 }
      )
    }

    const [jsAssignments, cssAssignments] = await Promise.all([
      prisma.javascriptAssignment.findMany({
        where: { id: { in: sprint.activities } },
      }),
      prisma.cssAssignment.findMany({
        where: { id: { in: sprint.activities } },
      }),
    ])

    const jsIds = jsAssignments.map((a) => a.id)
    const cssIds = cssAssignments.map((a) => a.id)

    const [jsSolutions, cssSolutions] = await Promise.all([
      userId && jsIds.length
        ? prisma.javascriptAssignmentSolution.findMany({
            where: { javascriptAssignmentId: { in: jsIds }, userId },
          })
        : Promise.resolve([]),
      userId && cssIds.length
        ? prisma.cssAssignmentSolution.findMany({
            where: { CssAssignmentId: { in: cssIds }, userId },
          })
        : Promise.resolve([]),
    ])

    const jsSolutionById = new Map(
      jsSolutions.map((s) => [s.javascriptAssignmentId, s])
    )
    const cssSolutionById = new Map(
      cssSolutions.map((s) => [s.CssAssignmentId, s])
    )

    const activities = [
      ...jsAssignments.map((assignment) => {
        const solution = jsSolutionById.get(assignment.id as string)
        let ticketKanbanStatus: 'todo' | 'in-progress' | 'done' = 'todo'
        let ticketCheckResult: 'todo' | 'in-progress' | 'done' = 'todo'

        if (solution) {
          ticketKanbanStatus =
            (solution.kanbanStatus as any) ?? ticketKanbanStatus
          ticketCheckResult =
            ticketKanbanStatus === 'done' ? 'done' : 'in-progress'
        }

        return {
          ...assignment,
          type: 'javascript' as const,
          ticketKanbanStatus,
          ticketCheckResult,
        }
      }),
      ...cssAssignments.map((assignment) => {
        const solution = cssSolutionById.get(assignment.id as string)
        let ticketCheckResult: 'todo' | 'in-progress' | 'done' = 'todo'
        let ticketKanbanStatus: 'todo' | 'in-progress' | 'done' = 'todo'

        if (solution) {
          const result = solution.result ?? 0
          const required = (assignment as any).requirements ?? 0
          if (result >= required && required > 0) {
            ticketCheckResult = 'done'
            ticketKanbanStatus = 'done'
          } else if (result > 0 && result < required) {
            ticketCheckResult = 'in-progress'
            ticketKanbanStatus = 'in-progress'
          } else {
            ticketCheckResult = 'in-progress'
            ticketKanbanStatus = 'in-progress'
          }
        }

        return {
          ...assignment,
          type: 'css' as const,
          ticketKanbanStatus,
          ticketCheckResult,
        }
      }),
    ]

    const totalTasks = activities.length
    let completedCount = 0

    if (userId && totalTasks > 0) {
      const jsSolved = jsSolutions.filter(
        (s: any) => (s.kanbanStatus as any) === 'done'
      ).length
      const cssSolved = activities.reduce((acc: number, a: any) => {
        if (a.type !== 'css') return acc
        const sol = cssSolutionById.get(a.id as string)
        const res = sol ? sol.result ?? 0 : 0
        const req = (a as any).requirements ?? 0
        if (req > 0 && res >= req) return acc + 1
        return acc
      }, 0)
      completedCount = jsSolved + cssSolved
    }

    const progress = totalTasks
      ? Math.round((completedCount / totalTasks) * 100)
      : 0

    return NextResponse.json({
      ...sprint,
      activities,
      totalTasks,
      completedCount,
      progress,
    })
  } catch (error) {
    console.error('Błąd pobierania sprintu:', error)
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
  }
}
