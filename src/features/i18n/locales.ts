export interface LocaleEntry {
  // The path segment, the dictionary key and the value of the locale cookie.
  code: string
  // The BCP 47 tag <html lang> carries.
  lang: string
  // Google accepts only an ISO 639-1 language with an optional ISO 3166-1 alpha-2 region, and names es-419 as
  // unsupported (https://developers.google.com/search/docs/specialty/international/localized-versions). Every
  // regional variant of a language is also sent to the same page, so the alternates name the language alone.
  hreflang: string
  nativeName: string
}

// The one place a language is added. A new entry also needs its dictionary, which the compiler then asks for.
export const localeRegistry = [
  { code: 'en', lang: 'en', hreflang: 'en', nativeName: 'English' },
  { code: 'pt', lang: 'pt-BR', hreflang: 'pt', nativeName: 'Português' },
] as const satisfies readonly LocaleEntry[]

export type Locale = (typeof localeRegistry)[number]['code']

export const locales: readonly Locale[] = localeRegistry.map((entry) => entry.code)

export const defaultLocale: Locale = 'en'

export const localeInfo = Object.fromEntries(
  localeRegistry.map((entry) => [entry.code, entry]),
) as Record<Locale, LocaleEntry>

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}
