import { site } from './site'

const cli = `npx ${site.cliPackage}`

export const commands = {
  doctor: `${cli} doctor`,
  create: `${cli} new my-app`,
  unattended: `${cli} new my-app --types api,web --single-tenant --single-language --languages en --no-mcp --sign-in password --email --no-social`,
  database: `${cli} db`,
}
