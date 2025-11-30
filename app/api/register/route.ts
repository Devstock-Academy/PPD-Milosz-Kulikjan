import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prismadb'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { pseudonim, imie, nazwisko, email, password } = body

    if (!pseudonim || !imie || !nazwisko || !email || !password) {
      return NextResponse.json(
        { error: 'Wszystkie pola są wymagane' },
        { status: 400 }
      )
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Użytkownik o podanym adresie email już istnieje' },
        { status: 409 }
      )
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: {
        pseudonim,
        imie,
        nazwisko,
        email,
        password: hashedPassword,
      },
    })
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(
      { user: userWithoutPassword, message: 'Rejestracja zakończona sukcesem' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas rejestracji' },
      { status: 500 }
    )
  }
}
