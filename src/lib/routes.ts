import type { Locale } from '@/features/i18n/locales'

export function path(locale: Locale, ...segments: string[]): string {
  return `/${[locale, ...segments].join('/')}`
}

export const external = {
  repository: 'https://github.com/stjosephworks/prumo',
  desktopRepository: 'https://github.com/stjosephworks/prumo-desktop',
  npm: 'https://www.npmjs.com/package/@stjoseph/prumo',
}
