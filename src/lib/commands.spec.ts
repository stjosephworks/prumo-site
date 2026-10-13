import { describe, expect, it } from 'vitest'
import { getDictionary } from '@/features/i18n/dictionary'
import { locales } from '@/features/i18n/locales'
import { commands } from './commands'

describe('the commands the site shows', () => {
  it('answers every question by flag in the unattended example, so it runs without a terminal', () => {
    for (const flag of ['--types', '--single-tenant', '--no-mcp', '--email', '--no-social']) {
      expect(commands.unattended.split(' ')).toContain(flag)
    }
  })

  it('gives the Start page the same commands in every language', () => {
    for (const locale of locales) {
      expect(getDictionary(locale).start.steps.map((step) => step.command)).toEqual([
        commands.doctor,
        commands.create,
        commands.unattended,
        commands.database,
      ])
    }
  })
})
