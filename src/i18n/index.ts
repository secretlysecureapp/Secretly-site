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

/* Client-side language preference (saved choice → browser → English).
   NOT used for the initial init: the pre-rendered HTML and the first
   client render must both be English so React hydration matches. The
   preferred language is applied after mount (see App.tsx). */
export function detectPreferredLanguage(): string {
  if (typeof window === 'undefined') return 'en'
  try {
    const saved = localStorage.getItem('lang')
    if (saved && LANGUAGES.some(l => l.code === saved)) return saved
  } catch { /* localStorage may be unavailable */ }
  const browser = typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : 'en'
  return LANGUAGES.some(l => l.code === browser) ? browser : 'en'
}

i18n
  .use(initReactI18next)
  .init({
    resources: { en: { t: en }, ru: { t: ru }, es: { t: es }, fr: { t: fr }, de: { t: de }, pt: { t: pt }, ar: { t: ar }, zh: { t: zh }, ja: { t: ja }, it: { t: it } },
    // Deterministic initial language for SSG / first hydration paint.
    lng: 'en',
    fallbackLng: 'en',
    ns: ['t'],
    defaultNS: 't',
    interpolation: { escapeValue: false },
  })

export default i18n
