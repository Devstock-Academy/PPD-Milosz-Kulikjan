import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
<<<<<<< HEAD
import { getToken } from 'next-auth/jwt'
=======
>>>>>>> origin/main

const intlMiddleware = createIntlMiddleware({
  locales: ['pl'],
  defaultLocale: 'pl',
})

<<<<<<< HEAD
export default async function middleware(request: NextRequest) {
=======
export default function middleware(request: NextRequest) {
>>>>>>> origin/main
  const { pathname } = request.nextUrl
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/pl/landing', request.url))
  }
  if (pathname === '/pl') {
    return NextResponse.redirect(new URL('/pl/landing', request.url))
  }
<<<<<<< HEAD
 

  const publicPagesWithoutLocale = ['/landing', '/login', '/register']
  const protectedPagesWithoutLocale = [
    '/dashboard',
    '/ranking',
    '/lessons',
    '/calendar',
    '/task',
    '/settings',
    '/admin-panel',
  ]
  const pagesWithoutLocale = [
    ...publicPagesWithoutLocale,
    ...protectedPagesWithoutLocale,
  ]
  if (pagesWithoutLocale.includes(pathname)) {
    return NextResponse.redirect(new URL(`/pl${pathname}`, request.url))
  }
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })
  const protectedRoutes = [
    '/pl/dashboard',
    '/pl/ranking',
    '/pl/lessons',
    '/pl/calendar',
    '/pl/task',
    '/pl/settings',
    '/pl/admin-panel',
  ]
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )
  const publicRoutes = ['/pl/landing', '/pl/login', '/pl/register']
  const isPublicRoute = publicRoutes.includes(pathname)
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL('/pl/dashboard', request.url))
  }
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/pl/login', request.url))
  }
=======
  const pagesWithoutLocale = ['/landing', '/login', '/register']
  if (pagesWithoutLocale.includes(pathname)) {
    return NextResponse.redirect(new URL(`/pl${pathname}`, request.url))
  }
>>>>>>> origin/main
  return intlMiddleware(request)
}

export const config = {
<<<<<<< HEAD
  matcher: [
    '/',
    '/pl',
    '/landing',
    '/login',
    '/register',
    '/dashboard',
    '/ranking',
    '/lessons',
    '/calendar',
    '/task',
    '/settings',
    '/admin-panel',
    '/(pl)/:path*',
  ],
=======
  matcher: ['/', '/pl', '/landing', '/login', '/register', '/(pl)/:path*'],
>>>>>>> origin/main
}
