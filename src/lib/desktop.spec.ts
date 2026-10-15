import { describe, expect, it } from 'vitest'
import { desktopAssetUrl, desktopBuilds, detectSystem, isUnsigned } from './desktop'

describe('the Desktop builds', () => {
  it('names every file as the release does', () => {
    expect(desktopBuilds('macos', '0.0.3').map((build) => build.file)).toEqual([
      'Prumo.Desktop-0.0.3-arm64.dmg',
      'Prumo.Desktop-0.0.3-x64.dmg',
    ])
    expect(desktopBuilds('linux', '0.0.3').map((build) => build.file)).toEqual([
      'prumo-desktop_0.0.3_amd64.deb',
      'prumo-desktop-0.0.3-1.x86_64.rpm',
    ])
    expect(desktopBuilds('windows', '0.0.3').map((build) => build.file)).toEqual([
      'Prumo.Desktop-0.0.3.Setup.exe',
    ])
  })

  it('links a file through its tag, since a pre-release is never the latest', () => {
    expect(desktopAssetUrl('Prumo.Desktop-0.0.3.Setup.exe', '0.0.3')).toBe(
      'https://github.com/stjosephworks/prumo-desktop/releases/download/v0.0.3/Prumo.Desktop-0.0.3.Setup.exe',
    )
  })

  it('treats Linux and Windows as unsigned whatever the macOS channel', () => {
    expect(isUnsigned('macos', 'unsigned-preview')).toBe(true)
    expect(isUnsigned('macos', 'signed')).toBe(false)
    expect(isUnsigned('linux', 'signed')).toBe(true)
    expect(isUnsigned('windows', 'signed')).toBe(true)
  })
})

describe('detectSystem', () => {
  it('reads the platform hints and the user agents of the three systems', () => {
    expect(detectSystem('Windows')).toBe('windows')
    expect(detectSystem('Mozilla/5.0 (Windows NT 10.0; Win64; x64)')).toBe('windows')
    expect(detectSystem('macOS')).toBe('macos')
    expect(detectSystem('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)')).toBe('macos')
    expect(detectSystem('Linux')).toBe('linux')
    expect(detectSystem('Mozilla/5.0 (X11; Linux x86_64)')).toBe('linux')
  })

  it('offers nothing to a phone, a tablet or a Chromebook', () => {
    expect(detectSystem('Mozilla/5.0 (Linux; Android 14; Pixel 8)')).toBeUndefined()
    expect(detectSystem('Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)')).toBeUndefined()
    expect(detectSystem('Mozilla/5.0 (X11; CrOS x86_64 14541.0.0)')).toBeUndefined()
    expect(detectSystem('')).toBeUndefined()
  })
})
