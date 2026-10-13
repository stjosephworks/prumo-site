import { site } from './site'

const cli = `npx ${site.cliPackage}`

export const commands = {
  doctor: `${cli} doctor`,
  create: `${cli} new my-app`,
  unattended: `${cli} new my-app --types api,web --single-tenant --no-mcp --email --no-social`,
  database: `${cli} db`,
}
