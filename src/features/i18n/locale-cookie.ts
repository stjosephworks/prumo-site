import type { Locale } from './locales'

// The language a visitor picked in the switch. It outranks Accept-Language on a path without a locale.
export const localeCookie = {
  name: 'locale',
  maxAge: 60 * 60 * 24 * 365,
  // Shared by stjosephworks.org and prumo.stjosephworks.org, so a choice on one holds on the other.
  domain: 'stjosephworks.org',
}

// A browser rejects a cookie whose Domain does not cover the page's host (RFC 6265, section 5.3), so localhost and a
// *.vercel.app preview get a host-only cookie instead.
export function localeCookieDomain(hostname: string): string | undefined {
  const host = hostname.toLowerCase()
  return host === localeCookie.domain || host.endsWith(`.${localeCookie.domain}`)
    ? localeCookie.domain
    : undefined
}

export function localeCookieString(
  locale: Locale,
  page: { hostname: string; secure: boolean },
): string {
  const domain = localeCookieDomain(page.hostname)

  return [
    `${localeCookie.name}=${locale}`,
    `Max-Age=${localeCookie.maxAge}`,
    'Path=/',
    ...(domain === undefined ? [] : [`Domain=${domain}`]),
    'SameSite=Lax',
    ...(page.secure ? ['Secure'] : []),
  ].join('; ')
}

export function rememberLocale(locale: Locale) {
  // The Cookie Store API reached Firefox only in 140 and Safari in 18.4 (MDN browser-compat-data,
  // api.CookieStore.set), so the switch still writes the cookie the old way.
  // biome-ignore lint/suspicious/noDocumentCookie: see above
  document.cookie = localeCookieString(locale, {
    hostname: window.location.hostname,
    secure: window.location.protocol === 'https:',
  })
}
