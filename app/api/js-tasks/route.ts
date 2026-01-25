import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const GET = async (req: Request) => {
  const url = new URL(req.url)

  const limitParam = url.searchParams.get('limit')
  let limit = 1
  if (limitParam) {
    limit = parseInt(limitParam)
  }

  const offsetParam = url.searchParams.get('offset')
  let offset = 0
  if (offsetParam) {
    offset = parseInt(offsetParam)
  }

  const userId = url.searchParams.get('userId')

  const tasks = await prisma.javascriptAssignment.findMany({
    skip: offset,
    take: limit,
    orderBy: { name: 'asc' },
    include: userId
      ? {
          solutions: {
            where: { userId },
          },
        }
      : undefined,
  })

  return NextResponse.json(tasks)
}
