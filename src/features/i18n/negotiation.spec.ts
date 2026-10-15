import { describe, expect, it } from 'vitest'
import { localeOfPath, localeRedirect, negotiateLocale, parseAcceptLanguage } from './negotiation'

describe('Accept-Language', () => {
  it('orders the ranges by quality, keeping the order of equal ones', () => {
    expect(parseAcceptLanguage('fr;q=0.4, pt-BR, en;q=0.8, de')).toEqual([
      'pt-br',
      'de',
      'en',
      'fr',
    ])
  })

  it('drops refused and empty ranges, and survives a malformed q', () => {
    expect(parseAcceptLanguage('pt;q=0, ,en;q=abc, fr')).toEqual(['fr'])
    expect(parseAcceptLanguage(undefined)).toEqual([])
    expect(parseAcceptLanguage('')).toEqual([])
  })

  it('sends a regional variant to its language', () => {
    expect(negotiateLocale({ acceptLanguage: 'pt-PT' })).toBe('pt')
    expect(negotiateLocale({ acceptLanguage: 'EN-gb' })).toBe('en')
    expect(negotiateLocale({ acceptLanguage: 'es-MX' })).toBe('es')
    expect(negotiateLocale({ acceptLanguage: 'es-AR,es;q=0.9' })).toBe('es')
    expect(negotiateLocale({ acceptLanguage: 'es-419' })).toBe('es')
  })

  it('takes the first language the site has, and English when it has none', () => {
    expect(negotiateLocale({ acceptLanguage: 'fr-FR, de;q=0.9, pt;q=0.5' })).toBe('pt')
    expect(negotiateLocale({ acceptLanguage: 'fr-FR, de;q=0.9' })).toBe('en')
    expect(negotiateLocale({ acceptLanguage: '*' })).toBe('en')
    expect(negotiateLocale({})).toBe('en')
  })
})

describe('the locale cookie', () => {
  it('wins over the browser language', () => {
    expect(negotiateLocale({ cookie: 'pt', acceptLanguage: 'en-US' })).toBe('pt')
    expect(negotiateLocale({ cookie: 'en', acceptLanguage: 'pt-BR' })).toBe('en')
    expect(negotiateLocale({ cookie: 'pt', acceptLanguage: 'es-MX' })).toBe('pt')
  })

  it('is ignored when it names a language the site does not have', () => {
    expect(negotiateLocale({ cookie: 'fr', acceptLanguage: 'pt-BR' })).toBe('pt')
  })
})

describe('the redirect', () => {
  it('sends the root and any path without a locale to the negotiated one', () => {
    expect(localeRedirect('/', { acceptLanguage: 'pt-BR' })).toBe('/pt')
    expect(localeRedirect('/docs', { acceptLanguage: 'pt-BR' })).toBe('/pt/docs')
    expect(localeRedirect('/desktop', { cookie: 'pt', acceptLanguage: 'en' })).toBe('/pt/desktop')
  })

  it('leaves a path that names a locale alone, whatever the cookie or the browser say', () => {
    expect(localeOfPath('/en/docs')).toBe('en')
    expect(localeRedirect('/en', { cookie: 'pt', acceptLanguage: 'pt-BR' })).toBeUndefined()
    expect(localeRedirect('/en/docs', { cookie: 'pt' })).toBeUndefined()
    expect(localeRedirect('/pt/start', { acceptLanguage: 'en' })).toBeUndefined()
  })
})
