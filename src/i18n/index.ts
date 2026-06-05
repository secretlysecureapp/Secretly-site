import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en'
import ru from './locales/ru'
import es from './locales/es'
import fr from './locales/fr'
import de from './locales/de'
import pt from './locales/pt'
import ar from './locales/ar'
import zh from './locales/zh'
import ja from './locales/ja'
import it from './locales/it'

export const LANGUAGES = [
  { code: 'en', label: 'English',    flag: '🇬🇧' },
  { code: 'ru', label: 'Русский',    flag: '🇷🇺' },
  { code: 'es', label: 'Español',    flag: '🇪🇸' },
  { code: 'fr', label: 'Français',   flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch',    flag: '🇩🇪' },
  { code: 'pt', label: 'Português',  flag: '🇧🇷' },
  { code: 'ar', label: 'العربية',    flag: '🇸🇦' },
  { code: 'zh', label: '中文',        flag: '🇨🇳' },
  { code: 'ja', label: '日本語',      flag: '🇯🇵' },
  { code: 'it', label: 'Italiano',   flag: '🇮🇹' },
]

const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null
const browser = typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : 'en'
const fallback = LANGUAGES.find(l => l.code === browser) ? browser : 'en'

i18n
  .use(initReactI18next)
  .init({
    resources: { en: { t: en }, ru: { t: ru }, es: { t: es }, fr: { t: fr }, de: { t: de }, pt: { t: pt }, ar: { t: ar }, zh: { t: zh }, ja: { t: ja }, it: { t: it } },
    lng: saved || fallback,
    fallbackLng: 'en',
    ns: ['t'],
    defaultNS: 't',
    interpolation: { escapeValue: false },
  })

export default i18n
