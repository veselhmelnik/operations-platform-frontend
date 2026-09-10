import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const demoOnly = process.env.DEMO_ONLY

  if (demoOnly) {
    const isDemoRoute = pathname === '/demo' || pathname.startsWith('/demo/')

    const isStatic =
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/assets/') ||
      pathname === '/favicon.ico'

    if (!isDemoRoute && !isStatic) {
      return NextResponse.redirect(
        new URL('/demo', request.url),
      )
    }

    return NextResponse.next()
  }
  if (pathname.startsWith('/backend')) {
    return NextResponse.next()
  }

  const token = request.cookies.get('access_token')

  const publicRoutes = [
    '/login',
    '/register',
    '/demo'
  ]

  const isPublicRoute = publicRoutes.some(
    (route) =>
      pathname === route ||
      pathname.startsWith('/invite/') ||
      pathname.startsWith('/demo/'),
  )

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(
      new URL('/login', request.url),
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets).*)',
  ],
}