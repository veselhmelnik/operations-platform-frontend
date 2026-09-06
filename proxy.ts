import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token')
  const pathname = request.nextUrl.pathname

  if (!token && pathname !== '/login') {
    return NextResponse.redirect(
      new URL('/login', request.url),
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/organizations/:path*',
  ],
}