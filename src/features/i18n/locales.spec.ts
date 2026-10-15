import { describe, expect, it } from 'vitest'
import { getDictionary } from './dictionary'
import { defaultLocale, isLocale, localeRegistry, locales } from './locales'

describe('the locale registry', () => {
  it('gives every language its own code, path segment and hreflang', () => {
    const codes = localeRegistry.map((entry) => entry.code)
    const hreflangs = localeRegistry.map((entry) => entry.hreflang)

    expect(new Set(codes).size).toBe(codes.length)
    expect(new Set(hreflangs).size).toBe(hreflangs.length)
    for (const code of codes) expect(code, code).toMatch(/^[a-z]{2}$/)
  })

  it('carries tags a browser and a search engine accept', () => {
    for (const entry of localeRegistry) {
      expect(Intl.getCanonicalLocales(entry.lang), entry.code).toEqual([entry.lang])
      expect(entry.hreflang, entry.code).toMatch(/^[a-z]{2}(-[A-Z]{2})?$/)
      expect(entry.lang.split('-')[0], entry.code).toBe(entry.code)
    }
  })

  it('names every language in itself', () => {
    for (const entry of localeRegistry) expect(entry.nativeName.trim(), entry.code).not.toBe('')
  })

  it('has a dictionary for every language, and English as the default', () => {
    for (const locale of locales) expect(getDictionary(locale), locale).toBeDefined()
    expect(isLocale(defaultLocale)).toBe(true)
    expect(defaultLocale).toBe('en')
  })
})
