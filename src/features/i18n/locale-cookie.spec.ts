// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { localeCookieDomain, localeCookieString, rememberLocale } from './locale-cookie'

describe('the locale cookie', () => {
  it('lasts a year on every path, and is not sent from other sites', () => {
    expect(localeCookieString('pt', { hostname: 'localhost', secure: false })).toBe(
      'locale=pt; Max-Age=31536000; Path=/; SameSite=Lax',
    )
  })

  it('is shared by every host under stjosephworks.org', () => {
    for (const hostname of [
      'stjosephworks.org',
      'www.stjosephworks.org',
      'prumo.stjosephworks.org',
      'PRUMO.stjosephworks.org',
    ])
      expect(localeCookieDomain(hostname), hostname).toBe('stjosephworks.org')

    expect(localeCookieString('es', { hostname: 'www.stjosephworks.org', secure: true })).toBe(
      'locale=es; Max-Age=31536000; Path=/; Domain=stjosephworks.org; SameSite=Lax; Secure',
    )
  })

  it('stays host-only where a browser would refuse the shared domain', () => {
    for (const hostname of [
      'localhost',
      '127.0.0.1',
      'stjoseph-site-git-feat-spanish-leonardfreitas-projects.vercel.app',
      'prumo-site.vercel.app',
      'notstjosephworks.org',
      'stjosephworks.org.example.com',
    ]) {
      expect(localeCookieDomain(hostname), hostname).toBeUndefined()
      expect(localeCookieString('en', { hostname, secure: true }), hostname).not.toContain('Domain')
    }
  })

  it('is written when a language is picked, and readable on the page that wrote it', () => {
    rememberLocale('pt')

    expect(document.cookie).toContain('locale=pt')
  })
})
