import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import vm from 'vm'

const prisma = new PrismaClient()

const extractFunctionFromContext = (
  context: Record<string, any>
): Function | null => {
  for (const key of Object.keys(context)) {
    if (typeof context[key] === 'function') return context[key]
  }
  return null
}

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

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string[] } }
) => {
  const taskId = params.id[0]
  const userId = params.id[1]

  if (!taskId || !userId) {
    return NextResponse.json(
      { error: 'Brak Id testu lub użytkownika' },
      { status: 400 }
    )
  }

  const body = await req.json()
  const { solution, variant, quickTest } = body

  if (
    typeof solution !== 'string' ||
    !['solution', 'test', 'quickTest'].includes(variant)
  ) {
    return NextResponse.json(
      { error: 'Niepoprawne dane wejściowe' },
      { status: 400 }
    )
  }

  const task = await prisma.javascriptAssignment.findUnique({
    where: { id: taskId },
    include: {
      solutions: { where: { userId } },
    },
  })

  if (!task) {
    return NextResponse.json(
      { error: 'Zadanie nie znalezione' },
      { status: 404 }
    )
  }

  if (variant === 'quickTest') {
    const patternFunctionContext: any = {}
    const userFunctionContext: any = {}
    vm.createContext(patternFunctionContext)
    vm.createContext(userFunctionContext)

    try {
      vm.runInContext(task.patternFunction, patternFunctionContext)
    } catch (err: unknown) {
      return NextResponse.json(
        { error: 'Błąd w funkcji pattern', details: (err as Error).message },
        { status: 400 }
      )
    }

    try {
      vm.runInContext(solution, userFunctionContext)
    } catch (err: unknown) {
      return NextResponse.json(
        { error: 'Błąd w kodzie użytkownika', details: (err as Error).message },
        { status: 400 }
      )
    }

    const patternFn = extractFunctionFromContext(patternFunctionContext)
    const userFn = extractFunctionFromContext(userFunctionContext)

    if (!patternFn)
      return NextResponse.json(
        { error: 'Nie znaleziono funkcji w patternFunction' },
        { status: 500 }
      )
    if (!userFn)
      return NextResponse.json(
        { error: 'Nie znaleziono funkcji w kodzie użytkownika' },
        { status: 400 }
      )

    const input = quickTest.input
    const expectedResult = patternFn(...input)
    const codeOutcome = userFn(...input)
    const testOutcome = codeOutcome === expectedResult

    return NextResponse.json({
      input,
      expectedResult,
      codeOutcome,
      testOutcome,
    })
  }

  if (variant === 'test') {
    const patternFunctionContext: any = {}
    const userFunctionContext: any = {}
    vm.createContext(patternFunctionContext)
    vm.createContext(userFunctionContext)

    try {
      vm.runInContext(task.patternFunction, patternFunctionContext)
    } catch (err: unknown) {
      return NextResponse.json(
        { error: 'Błąd w funkcji pattern', details: (err as Error).message },
        { status: 400 }
      )
    }

    try {
      vm.runInContext(solution, userFunctionContext)
    } catch (err: unknown) {
      return NextResponse.json(
        { error: 'Błąd w kodzie użytkownika', details: (err as Error).message },
        { status: 400 }
      )
    }

    const patternFn = extractFunctionFromContext(patternFunctionContext)
    const userFn = extractFunctionFromContext(userFunctionContext)

    if (!patternFn)
      return NextResponse.json(
        { error: 'Nie znaleziono funkcji w patternFunction' },
        { status: 500 }
      )
    if (!userFn)
      return NextResponse.json(
        { error: 'Nie znaleziono funkcji w kodzie użytkownika' },
        { status: 400 }
      )

    const results = (task.tests as any[]).slice(0, 3).map((test: any) => {
      const input = test.input || []
      const expectedResult = patternFn(...input)
      const codeOutcome = userFn(...input)
      const testOutcome = codeOutcome === expectedResult

      return {
        input,
        expectedResult,
        codeOutcome,
        testOutcome,
      }
    })

    return NextResponse.json({ results })
  }

  if (variant === 'solution') {
    const patternFunctionContext: any = {}
    const userFunctionContext: any = {}
    vm.createContext(patternFunctionContext)
    vm.createContext(userFunctionContext)

    try {
      vm.runInContext(task.patternFunction, patternFunctionContext)
    } catch (err: unknown) {
      return NextResponse.json(
        { error: 'Błąd w funkcji pattern', details: (err as Error).message },
        { status: 400 }
      )
    }

    try {
      vm.runInContext(solution, userFunctionContext)
    } catch (err: unknown) {
      return NextResponse.json(
        { error: 'Błąd w kodzie użytkownika', details: (err as Error).message },
        { status: 400 }
      )
    }

    const patternFn = extractFunctionFromContext(patternFunctionContext)
    const userFn = extractFunctionFromContext(userFunctionContext)

    if (!patternFn)
      return NextResponse.json(
        { error: 'Nie znaleziono funkcji w patternFunction' },
        { status: 500 }
      )
    if (!userFn)
      return NextResponse.json(
        { error: 'Nie znaleziono funkcji w kodzie użytkownika' },
        { status: 400 }
      )

    const results = (task.tests as any[]).map((test: any) => {
      const input = test.input || []
      const expectedResult = patternFn(...input)
      const codeOutcome = userFn(...input)
      const testOutcome = codeOutcome === expectedResult

      return {
        input,
        expectedResult,
        codeOutcome,
        testOutcome,
      }
    })

    const allPassed = results.every((r: any) => r.testOutcome)
    const newStatus = allPassed ? 'done' : 'in-progress'

    await prisma.javascriptAssignmentSolution.upsert({
      where: {
        javascriptAssignmentId_userId: {
          javascriptAssignmentId: taskId,
          userId,
        },
      },
      update: {
        solution: [solution],
        kanbanStatus: newStatus,
      },
      create: {
        javascriptAssignmentId: taskId,
        userId,
        solution: [solution],
        kanbanStatus: newStatus,
      },
    })

    if (allPassed) {
      await prisma.javascriptAssignment.update({
        where: { id: taskId },
        data: { submissions: (task.submissions || 0) + 1 },
      })
    }

    return NextResponse.json({ results, allPassed, newStatus })
  }

  return new NextResponse(null, { status: 200 })
}
