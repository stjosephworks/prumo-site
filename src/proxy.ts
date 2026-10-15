import { type NextRequest, NextResponse } from 'next/server'
import { localeCookie } from '@/features/i18n/locale-cookie'
import { localeRedirect } from '@/features/i18n/negotiation'

// Sends a path without a locale to the visitor's language: the one they picked in the switch, else the first
// their browser accepts, else English. A path that names a locale is left alone, so every page stays static.
export function proxy(request: NextRequest) {
  const target = localeRedirect(request.nextUrl.pathname, {
    cookie: request.cookies.get(localeCookie.name)?.value,
    acceptLanguage: request.headers.get('accept-language'),
  })
  if (target === undefined) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = target
  const response = NextResponse.redirect(url)
  response.headers.set('Vary', 'Accept-Language, Cookie')
  return response
}

export const config = {
  // Everything but Next's own files and anything with an extension: sitemap.xml, robots.txt, images.
  matcher: ['/((?!_next/|.*\\.).*)'],
}
