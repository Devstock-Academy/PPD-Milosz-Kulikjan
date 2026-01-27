import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string[] } }
) => {
  const taskId = params.id[0]
  const userId = params.id[1]

  if (!taskId || !userId) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 })
  }

  try {
    const task = await prisma.javascriptAssignment.findUnique({
      where: { id: taskId },
      include: {
        solutions: {
          where: { userId },
        },
      },
    })

    if (!task) {
      return NextResponse.json(
        { error: 'Zadanie nie znalezione' },
        { status: 404 }
      )
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error('Błąd pobierania zadania:', error)
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
  }
}
