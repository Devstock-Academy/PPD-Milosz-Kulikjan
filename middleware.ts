import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'

const intlMiddleware = createIntlMiddleware({
  locales: ['pl'],
  defaultLocale: 'pl',
})

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/pl/landing', request.url))
  }
  if (pathname === '/pl') {
    return NextResponse.redirect(new URL('/pl/landing', request.url))
  }
  const pagesWithoutLocale = ['/landing', '/login', '/register']
  if (pagesWithoutLocale.includes(pathname)) {
    return NextResponse.redirect(new URL(`/pl${pathname}`, request.url))
  }
  return intlMiddleware(request)
}

export const config = {
  matcher: ['/', '/pl', '/landing', '/login', '/register', '/(pl)/:path*'],
}
