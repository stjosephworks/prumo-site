import versions from '../../content/fetched/versions.json'
import { type DesktopChannel, external, needsOpenAnyway } from './routes'

// What one Prumo Desktop release carries, per system, as .github/workflows/release.yml in prumo-desktop names the
// files. The version is the one the pinned commit publishes, read by scripts/fetch-docs.mjs.
export const desktopVersion: string = versions.desktop

export type DesktopSystem = 'macos' | 'linux' | 'windows'

export const desktopSystems: DesktopSystem[] = ['macos', 'linux', 'windows']

export type DesktopBuildKind = 'dmg-arm64' | 'dmg-x64' | 'deb' | 'rpm' | 'setup'

export interface DesktopBuild {
  kind: DesktopBuildKind
  arch: 'arm64' | 'x64'
  file: string
}

export function desktopBuilds(system: DesktopSystem, version = desktopVersion): DesktopBuild[] {
  switch (system) {
    case 'macos':
      return [
        { kind: 'dmg-arm64', arch: 'arm64', file: `Prumo.Desktop-${version}-arm64.dmg` },
        { kind: 'dmg-x64', arch: 'x64', file: `Prumo.Desktop-${version}-x64.dmg` },
      ]
    case 'linux':
      return [
        { kind: 'deb', arch: 'x64', file: `prumo-desktop_${version}_amd64.deb` },
        { kind: 'rpm', arch: 'x64', file: `prumo-desktop-${version}-1.x86_64.rpm` },
      ]
    case 'windows':
      return [{ kind: 'setup', arch: 'x64', file: `Prumo.Desktop-${version}.Setup.exe` }]
  }
}

// A file of the pinned release. A pre-release is never /releases/latest, so every file is linked by its tag.
export function desktopAssetUrl(file: string, version = desktopVersion): string {
  return `${external.desktopRepository}/releases/download/v${version}/${file}`
}

// Only the macOS build can be signed today: the Linux packages and the Windows Setup.exe ship unsigned in every
// release, signed macOS or not.
export function isUnsigned(system: DesktopSystem, channel: DesktopChannel): boolean {
  return system === 'macos' ? needsOpenAnyway(channel) : true
}

// The system a visitor is on, from navigator.userAgentData.platform or the user agent. Phones and tablets have no
// build, so they get none, and neither does anything this cannot tell.
export function detectSystem(platform: string): DesktopSystem | undefined {
  if (/android|iphone|ipad|ipod|cros/i.test(platform)) return undefined
  if (/win/i.test(platform)) return 'windows'
  if (/mac/i.test(platform)) return 'macos'
  if (/linux|x11/i.test(platform)) return 'linux'
  return undefined
}
