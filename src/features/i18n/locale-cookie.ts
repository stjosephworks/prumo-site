import type { Locale } from './locales'

// The language a visitor picked in the switch. It outranks Accept-Language on a path without a locale.
export const localeCookie = {
  name: 'locale',
  maxAge: 60 * 60 * 24 * 365,
}

export function localeCookieString(locale: Locale, secure: boolean): string {
  return [
    `${localeCookie.name}=${locale}`,
    `Max-Age=${localeCookie.maxAge}`,
    'Path=/',
    'SameSite=Lax',
    ...(secure ? ['Secure'] : []),
  ].join('; ')
}

export function rememberLocale(locale: Locale) {
  // The Cookie Store API reached Firefox only in 140 and Safari in 18.4 (MDN browser-compat-data,
  // api.CookieStore.set), so the switch still writes the cookie the old way.
  // biome-ignore lint/suspicious/noDocumentCookie: see above
  document.cookie = localeCookieString(locale, window.location.protocol === 'https:')
}
