import versions from '../../content/fetched/versions.json'

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://prumo.stjosephworks.org',
  name: 'Prumo',
  cliPackage: '@stjoseph/prumo',
  cliVersion: versions.cli,
}
