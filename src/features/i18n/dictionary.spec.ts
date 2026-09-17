import { describe, expect, it } from 'vitest'
import { getDictionary } from './dictionary'
import { locales } from './locales'

function leaves(value: unknown, trail = ''): [string, unknown][] {
  if (typeof value !== 'object' || value === null) return [[trail, value]]

  return Object.entries(value).flatMap(([key, nested]) =>
    leaves(nested, trail === '' ? key : `${trail}.${key}`),
  )
}

describe('the dictionaries', () => {
  it('carries the same keys in every language', () => {
    const shapes = locales.map((locale) =>
      leaves(getDictionary(locale))
        .map(([key]) => key)
        .sort(),
    )

    for (const shape of shapes) expect(shape).toEqual(shapes[0])
  })

  it('leaves no string empty', () => {
    for (const locale of locales) {
      for (const [key, value] of leaves(getDictionary(locale))) {
        expect(String(value).trim(), `${locale}.${key}`).not.toBe('')
      }
    }
  })
})
