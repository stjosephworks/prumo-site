// @vitest-environment jsdom
import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { type Locale, localeRegistry } from '@/features/i18n/locales'
import { LanguageMenu } from './language-switch'

let root: Root | undefined

beforeAll(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })
})

afterEach(() => {
  act(() => root?.unmount())
  root = undefined
  document.body.innerHTML = ''
})

async function render(current: Locale, pathname: string, defaultOpen = false) {
  const container = document.createElement('div')
  document.body.append(container)
  root = createRoot(container)
  await act(async () => {
    root?.render(
      <LanguageMenu
        current={current}
        pathname={pathname}
        label="Language"
        defaultOpen={defaultOpen}
      />,
    )
  })

  const trigger = container.querySelector('button')
  if (trigger === null) throw new Error('no trigger')
  return trigger
}

function items() {
  return [...document.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]')]
}

describe('the language switch', () => {
  it('names the current language on a button that opens a menu', async () => {
    const trigger = await render('pt', '/pt/docs/stack')

    expect(trigger.getAttribute('aria-haspopup')).toBe('menu')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
    expect(trigger.getAttribute('aria-label')).toBe('Language: Português')
    expect(trigger.textContent).toBe('Português')
  })

  it('lists every language by its own name, each leading to the same page', async () => {
    await render('pt', '/pt/docs/stack', true)

    expect(items().map((item) => item.textContent)).toEqual(
      localeRegistry.map((entry) => entry.nativeName),
    )
    expect(items().map((item) => item.getAttribute('href'))).toEqual(
      localeRegistry.map((entry) => `/${entry.code}/docs/stack`),
    )
    for (const [index, entry] of localeRegistry.entries()) {
      expect(items()[index]?.getAttribute('lang')).toBe(entry.lang)
      expect(items()[index]?.getAttribute('hreflang')).toBe(entry.hreflang)
    }
  })

  it('marks only the current language', async () => {
    await render('en', '/en', true)

    expect(items().filter((item) => item.getAttribute('aria-current') === 'page')).toEqual([
      items()[localeRegistry.findIndex((entry) => entry.code === 'en')],
    ])
  })

  it('opens from the keyboard and moves focus into the menu', async () => {
    const trigger = await render('en', '/en/desktop')

    trigger.focus()
    await act(async () => {
      trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
      // Base UI moves focus into the popup on the next frame.
      await new Promise((resolve) => setTimeout(resolve, 50))
    })

    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    expect(items()).toHaveLength(localeRegistry.length)
    expect(items()).toContain(document.activeElement)
  })
})
