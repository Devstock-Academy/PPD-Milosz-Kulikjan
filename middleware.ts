import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'

const intlMiddleware = createIntlMiddleware({
  locales: ['pl'],
  defaultLocale: 'pl',
})

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/landing' || pathname === '/landing/') {
    return NextResponse.redirect(new URL('/pl/landing', request.url))
  }

  if (pathname.match(/^\/(pl|en)$/)) {
    const locale = pathname.replace('/', '')
    return NextResponse.redirect(new URL(`/${locale}/landing`, request.url))
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/landing', '/(pl|en)/:path*'],
}
