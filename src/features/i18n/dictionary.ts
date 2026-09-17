import { type Dictionary, en } from './dictionaries/en'
import { pt } from './dictionaries/pt'
import type { Locale } from './locales'

const dictionaries: Record<Locale, Dictionary> = { en, pt }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
