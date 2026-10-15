import { describe, expect, it } from 'vitest'
import { localeInfo, locales } from '@/features/i18n/locales'
import { alternates, desktopDownloadUrl, localizedPath, needsOpenAnyway } from './routes'

describe('the Desktop download', () => {
  it('links a preview through the list of releases, which shows pre-releases', () => {
    expect(desktopDownloadUrl('unsigned-preview')).toBe(
      'https://github.com/stjosephworks/prumo-desktop/releases',
    )
    expect(needsOpenAnyway('unsigned-preview')).toBe(true)
  })

  it('links a signed release as the latest one, and drops the warning', () => {
    expect(desktopDownloadUrl('signed')).toBe(
      'https://github.com/stjosephworks/prumo-desktop/releases/latest',
    )
    expect(needsOpenAnyway('signed')).toBe(false)
  })
})

describe('the same page in another language', () => {
  it('swaps the locale and keeps the rest of the path', () => {
    expect(localizedPath('/en/docs/stack', 'pt')).toBe('/pt/docs/stack')
    expect(localizedPath('/pt', 'en')).toBe('/en')
    expect(localizedPath('/pt/', 'en')).toBe('/en')
  })

  it('adds a locale to a path that has none', () => {
    expect(localizedPath('/', 'pt')).toBe('/pt')
    expect(localizedPath('/desktop', 'en')).toBe('/en/desktop')
  })
})

describe('the alternates', () => {
  it('make a page its own canonical and name it in every language, plus x-default', () => {
    const page = alternates('pt', 'docs', 'stack')

    expect(page.canonical).toBe('/pt/docs/stack')
    for (const locale of locales)
      expect(page.languages[localeInfo[locale].hreflang]).toBe(`/${locale}/docs/stack`)
    expect(page.languages['x-default']).toBe('/docs/stack')
    expect(Object.keys(page.languages)).toHaveLength(locales.length + 1)
  })

  it('point x-default of the home page at the root', () => {
    expect(alternates('en').languages['x-default']).toBe('/')
  })
})
