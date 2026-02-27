import { NextRequest, NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params
  const moduleIndex = Number(params.id)
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  try {
    const moduleRecord = await prisma.module.findFirst({
      where: { moduleIndex },
      include: {
        sprints: {
          orderBy: {
            sprintNumber: 'asc',
          },
          include: {
            technologies: true,
          },
        },
      },
    })

    if (!moduleRecord) {
      return NextResponse.json(
        { error: 'Moduł nie znaleziony' },
        { status: 404 }
      )
    }

    const enrichedSprints = await Promise.all(
      (moduleRecord.sprints || []).map(async (sprint) => {
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
            let ticketCheckResult: 'review' | 'negative' | 'positive' = 'review'

            if (solution) {
              ticketKanbanStatus =
                (solution.kanbanStatus as any) ?? ticketKanbanStatus
              ticketCheckResult =
                ticketKanbanStatus === 'done' ? 'positive' : 'negative'
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
            let ticketCheckResult: 'review' | 'negative' | 'positive' = 'review'
            let ticketKanbanStatus: 'todo' | 'in-progress' | 'done' = 'todo'

            if (solution) {
              const result = solution.result ?? 0
              const required = (assignment as any).requirements ?? 0
              if (result >= required && required > 0) {
                ticketCheckResult = 'positive'
                ticketKanbanStatus = 'done'
              } else if (result > 0 && result < required) {
                ticketCheckResult = 'negative'
                ticketKanbanStatus = 'in-progress'
              } else {
                ticketCheckResult = 'negative'
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

        return {
          ...sprint,
          activities,
          totalTasks,
          completedCount,
          progress,
        }
      })
    )

    const totalDuration = enrichedSprints.reduce(
      (sum, s) => sum + (s.duration ?? 0),
      0
    )
    const moduleTotalTasks = enrichedSprints.reduce(
      (sum, s) => sum + (s.totalTasks ?? 0),
      0
    )
    const moduleCompleted = enrichedSprints.reduce(
      (sum, s) => sum + (s.completedCount ?? 0),
      0
    )
    const moduleProgress = moduleTotalTasks
      ? Math.round((moduleCompleted / moduleTotalTasks) * 100)
      : 0

    return NextResponse.json({
      ...moduleRecord,
      sprints: enrichedSprints,
      totalDuration,
      totalTasks: moduleTotalTasks,
      completedCount: moduleCompleted,
      progress: moduleProgress,
    })
  } catch (error) {
    console.error('Błąd pobierania modułu:', error)
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
  }
}
