import { createContext, useContext, useState, useEffect } from 'react'
import uk from './uk.js'
import en from './en.js'

const I18nContext = createContext()

const STORAGE_KEY = 'riv-lang'

const detectLang = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'uk') return saved
  } catch {}
  const navLang = navigator.language || ''
  return navLang.startsWith('uk') || navLang.startsWith('ru') ? 'uk' : 'en'
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(detectLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem(STORAGE_KEY, lang) } catch {}
  }, [lang])

  const switchLang = (l) => {
    setLang(l)
  }

  return (
    <I18nContext.Provider value={{ lang, switchLang }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useT() {
  const { lang } = useContext(I18nContext)
  return (key, vars) => {
    const dict = lang === 'en' ? en : uk
    let val = dict[key]
    if (val == null) return key
    if (vars && typeof val === 'string') {
      return val.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`)
    }
    return val
  }
}

export function useLang() {
  return useContext(I18nContext)
}
