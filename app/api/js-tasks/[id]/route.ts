import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params

  try {
    const task = await prisma.javascriptAssignment.findUnique({
      where: { id },
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
