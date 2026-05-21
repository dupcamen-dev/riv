import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import uk from './uk.js'
import en from './en.js'

const I18nContext = createContext()

const STORAGE_KEY = 'riv-lang'

const detectLang = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'uk') return saved
  } catch {}
  return navigator.language?.startsWith('uk') ? 'uk' : 'en'
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(detectLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem(STORAGE_KEY, lang) } catch {}
  }, [lang])

  const switchLang = (l) => setLang(l)

  return (
    <I18nContext.Provider value={{ lang, switchLang }}>
      {children}
    </I18nContext.Provider>
  )
}

const resolve = (obj, path) => {
  const keys = path.split('.')
  let val = obj
  for (const k of keys) {
    if (val == null || typeof val !== 'object') return
    val = val[k]
  }
  return val
}

export function useT() {
  const { lang } = useContext(I18nContext)
  return useCallback((key, vars) => {
    const dict = lang === 'en' ? en : uk
    let val = resolve(dict, key)
    if (val == null) return key.split('.').pop()
    if (vars && typeof val === 'string') {
      return val.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`)
    }
    return val
  }, [lang])
}

export function useLang() {
  return useContext(I18nContext)
}
