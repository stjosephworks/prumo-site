import { type Locale, locales } from '@/features/i18n/locales'

export function path(locale: Locale, ...segments: string[]): string {
  return `/${[locale, ...segments].join('/')}`
}

// Every page is its own canonical, and names the same page in each language as its alternate. Set per page: a
// layout's would be inherited, and every page would claim to be the one the layout sits on.
export function alternates(locale: Locale, ...segments: string[]) {
  return {
    canonical: path(locale, ...segments),
    languages: Object.fromEntries(locales.map((one) => [one, path(one, ...segments)])),
  }
}

export const external = {
  repository: 'https://github.com/stjosephworks/prumo',
  desktopRepository: 'https://github.com/stjosephworks/prumo-desktop',
  npm: 'https://www.npmjs.com/package/@stjoseph/prumo',
}
