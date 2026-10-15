import { NextRequest } from 'next/server'
import { describe, expect, it } from 'vitest'
import { config, proxy } from './proxy'

function request(pathname: string, headers: Record<string, string> = {}) {
  return new NextRequest(`https://prumo.stjosephworks.org${pathname}`, { headers })
}

describe('the proxy', () => {
  it('redirects a path without a locale to the browser language, keeping the query', () => {
    const response = proxy(request('/docs?from=x', { 'accept-language': 'pt-BR,pt;q=0.9' }))

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('https://prumo.stjosephworks.org/pt/docs?from=x')
    expect(response.headers.get('vary')).toBe('Accept-Language, Cookie')
  })

  it('lets the cookie outrank the browser', () => {
    const response = proxy(request('/', { 'accept-language': 'en-US', cookie: 'locale=pt' }))

    expect(response.headers.get('location')).toBe('https://prumo.stjosephworks.org/pt')
  })

  it('passes a path that names a locale straight through', () => {
    const response = proxy(request('/en/desktop', { cookie: 'locale=pt', 'accept-language': 'pt' }))

    expect(response.headers.get('location')).toBeNull()
    expect(response.headers.get('x-middleware-next')).toBe('1')
  })

  it('runs on pages only, never on files', () => {
    const matcher = new RegExp(`^${config.matcher[0]}$`)

    for (const page of ['/', '/docs', '/en/desktop']) expect(page, page).toMatch(matcher)
    for (const file of [
      '/sitemap.xml',
      '/robots.txt',
      '/search-index.json',
      '/_next/static/chunk.js',
      '/icon.png',
    ])
      expect(file, file).not.toMatch(matcher)
  })
})
