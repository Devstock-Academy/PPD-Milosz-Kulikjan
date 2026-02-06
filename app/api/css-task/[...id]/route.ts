import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import puppeteer from 'puppeteer'
import sharp from 'sharp'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'

const prisma = new PrismaClient()

export const runtime = 'nodejs'

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
    const task = await prisma.cssAssignment.findUnique({
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
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 })
  }

  try {
    const body = await req.json()
    const { solution } = body

    if (!solution) {
      return NextResponse.json(
        { error: 'Rozwiązanie jest wymagane' },
        { status: 400 }
      )
    }

    const task = await prisma.cssAssignment.findUnique({
      where: { id: taskId },
    })

    if (!task) {
      return NextResponse.json(
        { error: 'Zadanie nie znalezione' },
        { status: 404 }
      )
    }

    const htmlAnswer = `<style>body{width:333px;height:266px;margin:0;overflow:hidden;background-color: #ffffff;}</style>${solution}`

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({ width: 333, height: 266 })
    await page.setContent(htmlAnswer)
    const answerImagePng = await page.screenshot({ type: 'png' })
    const answerImageBuffer = Buffer.from(answerImagePng)

    await browser.close()

    const targetImageResponse = await fetch(task.targetUrl)
    const targetImageArrayBuffer = await targetImageResponse.arrayBuffer()
    const targetImageBuffer = Buffer.from(targetImageArrayBuffer)
    const trimedTargetImage = await sharp(targetImageBuffer)
      .ensureAlpha()
      .toBuffer()
    const targetImageToCheck = PNG.sync.read(trimedTargetImage)
    const { width, height } = targetImageToCheck
    const trimedAnswerImage = await sharp(answerImageBuffer)
      .ensureAlpha()
      .resize(width, height)
      .toBuffer()
    const answerImageToCheck = PNG.sync.read(trimedAnswerImage)

    const diff = new PNG({ width, height })
    const numDiffPixels = pixelmatch(
      new Uint8Array(targetImageToCheck.data),
      new Uint8Array(answerImageToCheck.data),
      new Uint8Array(diff.data),
      width,
      height,
      { threshold: 0.1 }
    )

    const totalPixels = width * height
    const similarity = ((totalPixels - numDiffPixels) / totalPixels) * 100
    const requiredCompatibility = task.requirements ?? 0

    const checkOnly = req.nextUrl.searchParams.get('checkOnly') === 'true'

    if (!checkOnly) {
      const roundedSimilarity = Math.round(similarity)
      const existingSolution = await prisma.cssAssignmentSolution.findUnique({
        where: {
          CssAssignmentId_userId: {
            CssAssignmentId: taskId,
            userId: userId,
          },
        },
      })

      let resultToSave = roundedSimilarity
      let solutionToSave = solution

      if (existingSolution) {
        const existingResult = existingSolution.result || 0
        if (
          existingResult >= requiredCompatibility &&
          roundedSimilarity < existingResult
        ) {
          resultToSave = existingResult
          solutionToSave = existingSolution.solution
        }
      }

      await prisma.cssAssignmentSolution.upsert({
        where: {
          CssAssignmentId_userId: {
            CssAssignmentId: taskId,
            userId: userId,
          },
        },
        update: {
          solution: solutionToSave,
          result: resultToSave,
        },
        create: {
          CssAssignmentId: taskId,
          userId,
          solution: solutionToSave,
          result: resultToSave,
        },
      })
    }

    return NextResponse.json({
      success: true,
      similarity,
      saved: !checkOnly,
    })
  } catch (error) {
    console.error('Błąd zapisywania rozwiązania:', error)
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
  }
}
