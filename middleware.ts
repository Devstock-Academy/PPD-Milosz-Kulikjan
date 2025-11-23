import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { getToken } from 'next-auth/jwt'

const intlMiddleware = createIntlMiddleware({
  locales: ['pl'],
  defaultLocale: 'pl',
})

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/pl/landing', request.url))
  }
  if (pathname === '/pl') {
    return NextResponse.redirect(new URL('/pl/landing', request.url))
  }
 
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
  return intlMiddleware(request)
}

export const config = {
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
}
