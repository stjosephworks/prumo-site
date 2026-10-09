import { describe, expect, it } from 'vitest'
import { desktopDownloadUrl, needsOpenAnyway } from './routes'

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
