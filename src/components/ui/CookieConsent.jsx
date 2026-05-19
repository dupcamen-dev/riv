import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Cookie, X } from 'lucide-react'

const COOKIE_CONSENT_KEY = 'riv-cookie-consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_CONSENT_KEY)) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] border-t border-white/10 bg-dark-950/95 backdrop-blur-xl p-4 md:p-5">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <Cookie size={20} className="mt-0.5 shrink-0 text-gold-400" />
          <p className="text-sm text-light-300">
            Ми використовуємо файли cookie для покращення роботи сайту.
            Продовжуючи використання сайту, ви погоджуєтесь з нашою
            {' '}<Link to="/privacy" className="text-gold-400 underline underline-offset-2 hover:text-gold-300">Політикою конфіденційності</Link>.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={accept}
            className="rounded-lg border border-gold-300/25 bg-gold-500 px-5 py-2 text-sm font-bold text-dark-950 transition-colors hover:bg-gold-400 focus-ring whitespace-nowrap"
          >
            Прийняти
          </button>
          <button
            type="button"
            onClick={accept}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gold-300/25 bg-gold-500 text-dark-950 shadow-lg shadow-gold-500/15 transition-colors hover:bg-gold-400 focus-ring-sm"
            aria-label="Закрити"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
