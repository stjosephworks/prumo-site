import { type Dictionary, en } from './dictionaries/en'
import { es } from './dictionaries/es'
import { pt } from './dictionaries/pt'
import type { Locale } from './locales'

const dictionaries: Record<Locale, Dictionary> = { en, pt, es }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
