import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

const prisma = new PrismaClient()

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params

  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Brak autoryzacji' }, { status: 401 })
    }

    const task = await prisma.cssAssignment.findUnique({
      where: { id },
      include: {
        solutions: {
          where: {
            userId: session.user.id,
          },
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
