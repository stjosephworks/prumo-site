import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { getDictionary } from '@/features/i18n/dictionary'
import type { Locale } from '@/features/i18n/locales'
import { desktopAssetUrl, desktopBuilds, desktopSystems } from '@/lib/desktop'
import { type DesktopChannel, needsOpenAnyway } from '@/lib/routes'
import { DesktopDownload } from './desktop-download'

const channels: DesktopChannel[] = ['unsigned-preview', 'signed']

function render(channel: DesktopChannel, locale: Locale = 'en') {
  const t = getDictionary(locale)
  const labels = t.home.paths.desktop
  const html = renderToStaticMarkup(
    <DesktopDownload
      channel={channel}
      locale={locale}
      labels={labels}
      builds={t.desktop.download}
    />,
  )
  const note = html.match(/<p id="([^"]+)"[^>]*>(.*?)<\/p>/s)
  const links = [...html.matchAll(/<a href="([^"]+)" aria-describedby="([^"]+)"/g)].map(
    (match) => ({
      href: match[1],
      describedBy: match[2],
    }),
  )

  return { html, labels, links, note: { id: note?.[1], html: note?.[2] ?? '' } }
}

describe('the hero download', () => {
  it('links every file of every system, each described by the note', () => {
    const { links, note } = render('unsigned-preview')
    const files = desktopSystems.flatMap((system) => desktopBuilds(system))

    expect(links.map((link) => link.href)).toEqual(
      files.map((build) => desktopAssetUrl(build.file)),
    )
    for (const link of links) expect(link.describedBy).toBe(note.id)
  })

  it('says it is an unsigned preview exactly when the channel needs Open Anyway', () => {
    for (const channel of channels) {
      const { note, labels } = render(channel)

      expect(note.html.includes(labels.previewNote)).toBe(needsOpenAnyway(channel))
      expect(note.html.includes(labels.signedNote)).toBe(!needsOpenAnyway(channel))
    }
  })

  it('keeps Linux and Windows unsigned when macOS is signed', () => {
    const { html, labels } = render('signed')

    expect(html).toContain(labels.hints.macosSigned)
    expect(html).toContain(labels.hints.linux)
    expect(html).toContain(labels.hints.windows)
    expect(html).not.toContain(labels.hints.macosUnsigned)
  })

  it('marks no system in the static HTML', () => {
    expect(render('unsigned-preview').html).not.toMatch(/data-visitor="/)
  })

  it('sends the reader to the install steps on the Desktop page, in their language', () => {
    expect(render('unsigned-preview', 'pt').note.html).toContain('href="/pt/desktop#download"')
    expect(render('signed', 'en').note.html).toContain('href="/en/desktop#download"')
  })
})
