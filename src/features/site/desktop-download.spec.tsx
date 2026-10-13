import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { getDictionary } from '@/features/i18n/dictionary'
import { type DesktopChannel, desktopDownloadUrl, needsOpenAnyway } from '@/lib/routes'
import { DesktopDownload } from './desktop-download'

const channels: DesktopChannel[] = ['unsigned-preview', 'signed']

function render(channel: DesktopChannel, locale: 'en' | 'pt' = 'en') {
  const labels = getDictionary(locale).home.paths.desktop
  const html = renderToStaticMarkup(
    <DesktopDownload channel={channel} locale={locale} labels={labels} />,
  )
  const note = html.match(/<p id="([^"]+)"[^>]*>(.*?)<\/p>/s)
  const button = html.match(/<a href="([^"]+)" aria-describedby="([^"]+)"[^>]*>(.*?)<\/a>/s)

  return {
    labels,
    button: { href: button?.[1], describedBy: button?.[2], text: button?.[3] ?? '' },
    note: { id: note?.[1], html: note?.[2] ?? '' },
  }
}

describe('the hero download', () => {
  it('links the button to the release the channel points at, described by its note', () => {
    for (const channel of channels) {
      const { button, note, labels } = render(channel)

      expect(button.href).toBe(desktopDownloadUrl(channel))
      expect(button.text).toContain(labels.button)
      expect(button.describedBy).toBe(note.id)
    }
  })

  it('says it is an unsigned preview exactly when the channel needs Open Anyway', () => {
    for (const channel of channels) {
      const { note, labels } = render(channel)

      expect(note.html.includes(labels.previewNote)).toBe(needsOpenAnyway(channel))
      expect(note.html.includes(labels.signedNote)).toBe(!needsOpenAnyway(channel))
    }
  })

  it('sends the reader to the install steps on the Desktop page, in their language', () => {
    expect(render('unsigned-preview', 'pt').note.html).toContain('href="/pt/desktop#download"')
    expect(render('signed', 'en').note.html).toContain('href="/en/desktop#download"')
  })
})
