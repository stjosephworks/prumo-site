import { isLocale, type Locale, localeInfo, locales } from '@/features/i18n/locales'

export function path(locale: Locale, ...segments: string[]): string {
  return `/${[locale, ...segments].join('/')}`
}

// The same page in another language: the locale segment is swapped, or added when the path has none.
export function localizedPath(pathname: string, locale: Locale): string {
  const segments = pathname.split('/').filter((segment) => segment !== '')
  if (isLocale(segments[0] ?? '')) segments.shift()
  return path(locale, ...segments)
}

// Every page is its own canonical, and names the same page in each language as its alternate. Set per page: a
// layout's would be inherited, and every page would claim to be the one the layout sits on. x-default is the path
// without a locale, which sends each visitor to their own language, as Google suggests for an auto-redirecting page.
export function alternates(
  locale: Locale,
  ...segments: string[]
): { canonical: string; languages: Record<string, string> } {
  return {
    canonical: path(locale, ...segments),
    languages: {
      ...Object.fromEntries(
        locales.map((one) => [localeInfo[one].hreflang, path(one, ...segments)]),
      ),
      'x-default': `/${segments.join('/')}`,
    },
  }
}

export const external = {
  stjosephWorks: 'https://stjosephworks.org',
  repository: 'https://github.com/stjosephworks/prumo',
  desktopRepository: 'https://github.com/stjosephworks/prumo-desktop',
  npm: 'https://www.npmjs.com/package/@stjoseph/prumo',
}

// How Prumo Desktop is released today. 'unsigned-preview': ad-hoc signed, not notarized, published as GitHub
// pre-releases. Once a release is signed with a Developer ID and notarized, set 'signed': the Open Anyway warning
// leaves the Desktop page and the button points at the latest release.
export type DesktopChannel = 'unsigned-preview' | 'signed'

export const desktopRelease: { channel: DesktopChannel } = { channel: 'unsigned-preview' }

// GitHub's latest release is "the most recent non-prerelease, non-draft release"
// (https://docs.github.com/en/rest/releases/releases#get-the-latest-release), so /releases/latest never reaches a
// pre-release, and a preview is linked through the list of releases instead.
export function desktopDownloadUrl(channel: DesktopChannel): string {
  return channel === 'signed'
    ? `${external.desktopRepository}/releases/latest`
    : `${external.desktopRepository}/releases`
}

export function needsOpenAnyway(channel: DesktopChannel): boolean {
  return channel === 'unsigned-preview'
}
