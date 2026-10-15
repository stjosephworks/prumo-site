import { defaultLocale, isLocale, type Locale } from './locales'

// The language ranges of an Accept-Language header, best first. A range with q=0 is one the visitor refuses.
export function parseAcceptLanguage(header: string | null | undefined): string[] {
  if (header === null || header === undefined) return []

  return header
    .split(',')
    .map((part, index) => {
      const [range = '', ...parameters] = part.split(';').map((piece) => piece.trim())
      const q = parameters.find((parameter) => parameter.startsWith('q='))
      const quality = q === undefined ? 1 : Number(q.slice(2))

      return { range: range.toLowerCase(), quality: Number.isNaN(quality) ? 0 : quality, index }
    })
    .filter((entry) => entry.range !== '' && entry.quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index)
    .map((entry) => entry.range)
}

// es-AR, es-419 and es all reach es: a regional variant is served its language.
export function localeOfRange(range: string): Locale | undefined {
  const language = range.split('-')[0] ?? ''
  return isLocale(language) ? language : undefined
}

export function negotiateLocale(request: {
  cookie?: string | undefined
  acceptLanguage?: string | null | undefined
}): Locale {
  if (request.cookie !== undefined && isLocale(request.cookie)) return request.cookie

  for (const range of parseAcceptLanguage(request.acceptLanguage)) {
    const locale = localeOfRange(range)
    if (locale !== undefined) return locale
  }

  return defaultLocale
}

export function localeOfPath(pathname: string): Locale | undefined {
  const first = pathname.split('/')[1] ?? ''
  return isLocale(first) ? first : undefined
}

// Where a request for a path without a locale is sent, or undefined when the path already names one.
export function localeRedirect(
  pathname: string,
  request: Parameters<typeof negotiateLocale>[0],
): string | undefined {
  if (localeOfPath(pathname) !== undefined) return undefined

  const locale = negotiateLocale(request)
  return pathname === '/' ? `/${locale}` : `/${locale}${pathname}`
}
