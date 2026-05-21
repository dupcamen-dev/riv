import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarCheck } from 'lucide-react'
import { useT, useLang } from '../../i18n/context.jsx'

const sectionLinks = ['popular', 'contact', 'feedback']

export default function Navbar({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const t = useT()
  const { lang, switchLang } = useLang()

  const currentPath = location.pathname

  useEffect(() => {
    let lastScroll = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      if (y > 80 && y > lastScroll) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScroll = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('nav-hidden', hidden)
    return () => document.body.classList.remove('nav-hidden')
  }, [hidden])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setOpen(false), 0)
    return () => window.clearTimeout(timeoutId)
  }, [location.pathname, location.hash])

  const closeOnEscape = useCallback((event) => {
    if (event.key === 'Escape') setOpen(false)
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [closeOnEscape])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const scrollToSection = (sectionId, closeMenu) => {
    if (closeMenu) setOpen(false)
    if (currentPath !== '/') {
      navigate('/', { state: { scrollTo: sectionId } })
    } else {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const renderNavItem = (label, isActive) => (
    <>
      {label}
      {isActive && (
        <motion.div
          layoutId="nav-underline"
          className="absolute -bottom-1 left-3 right-3 h-0.5 bg-red-500"
        />
      )}
    </>
  )

  return (
    <>
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${
        scrolled
          ? 'border-white/8 bg-dark-950/95 backdrop-blur-xl shadow-lg shadow-black/30'
          : 'border-white/4 bg-dark-950/80 backdrop-blur-lg'
      }`}
      role="navigation"
      aria-label={t('nav.main_nav')}
    >
      <div className="page-content">
        <div className="relative flex h-[72px] items-center justify-between gap-4 pr-14 lg:h-[84px] lg:pr-0">
          <Link to="/" className="flex-1 lg:flex-none flex items-center focus-ring-sm" aria-label={t('nav.to_home')}>
            <span className="font-display text-2xl font-black text-cream-50 tracking-tight">
              THE<span className="text-red-500">.</span>RIVER
            </span>
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex">
            <Link
              to="/"
              onClick={() => scrollToSection('hero')}
              className={`relative whitespace-nowrap px-3 py-2 text-sm font-semibold rounded-lg transition-colors duration-300 focus-ring-sm xl:px-4 ${
                 currentPath === '/' ? 'text-red-400' : 'text-gray-300 hover:bg-white/4 hover:text-cream-50'
               }`}
            >
              {renderNavItem(t('nav.home'), currentPath === '/')}
            </Link>
            <Link
              to="/menu"
              className={`relative whitespace-nowrap px-3 py-2 text-sm font-semibold rounded-lg transition-colors duration-300 focus-ring-sm xl:px-4 ${
                 currentPath === '/menu' ? 'text-red-400' : 'text-gray-300 hover:bg-white/4 hover:text-cream-50'
               }`}
            >
              {renderNavItem(t('nav.menu'), currentPath === '/menu')}
            </Link>
            <Link
              to="/pravila"
              className={`relative whitespace-nowrap px-3 py-2 text-sm font-semibold rounded-lg transition-colors duration-300 focus-ring-sm xl:px-4 ${
                 currentPath === '/pravila' ? 'text-red-400' : 'text-gray-300 hover:bg-white/4 hover:text-cream-50'
               }`}
            >
              {renderNavItem(t('nav.pravila'), currentPath === '/pravila')}
            </Link>
            {sectionLinks.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => scrollToSection(s)}
                className="relative whitespace-nowrap px-3 py-2 text-sm font-semibold rounded-lg text-gray-300 transition-colors duration-300 hover:bg-white/4 hover:text-cream-50 focus-ring-sm xl:px-4"
              >
                {t(`nav.${s}`)}
              </button>
            ))}
            <button
              type="button"
              onClick={() => switchLang(lang === 'uk' ? 'en' : 'uk')}
              className="relative whitespace-nowrap px-3 py-2 text-sm font-semibold rounded-lg transition-colors duration-300 focus-ring-sm xl:px-4 text-red-400"
            >
              {lang === 'uk' ? 'EN' : 'UA'}
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenBooking}
            className="hidden shrink-0 items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-bold text-cream-50 shadow-lg shadow-red-500/20 transition-colors duration-300 hover:bg-red-600 focus-ring-sm lg:inline-flex xl:px-5"
          >
            <CalendarCheck size={16} />
            {t('nav.booking')}
          </button>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="absolute right-0 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg bg-red-500 text-cream-50 shadow-lg shadow-red-500/20 transition-colors hover:bg-red-600 focus-ring-sm lg:hidden"
            aria-label={open ? t('nav.close_menu') : t('nav.open_menu')}
            aria-expanded={open}
          >
            <div className="relative h-5 w-5">
              <span
                className="absolute left-0 top-1/2 block h-px w-full bg-current transition-transform duration-300"
                style={{
                  transform: open
                    ? 'translateY(-50%) rotate(45deg)'
                    : 'translateY(calc(-50% - 5px))',
                }}
              />
              <span
                className="absolute left-0 top-1/2 block h-px w-full bg-current transition-transform duration-300"
                style={{
                  transform: open
                    ? 'translateY(-50%) rotate(-45deg)'
                    : 'translateY(calc(-50% + 5px))',
                }}
              />
            </div>
          </button>
        </div>
      </div>
    </nav>

    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-x-0 top-[72px] bottom-0 z-40 flex flex-col items-center justify-center gap-6 bg-dark-950/80 backdrop-blur-xl px-5 pb-10 shadow-2xl overflow-y-auto lg:hidden"
        >
            <div className="flex flex-col items-center gap-2">
              <Link
                to="/"
                onClick={() => { setOpen(false); scrollToSection('hero') }}
                className={`block w-full text-center px-8 py-3 text-lg font-semibold transition-all focus-ring-sm ${
                  currentPath === '/' ? 'text-red-400' : 'text-gray-300 hover:text-cream-50'
                }`}
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/menu"
                onClick={() => setOpen(false)}
                className={`block w-full text-center px-8 py-3 text-lg font-semibold transition-all focus-ring-sm ${
                  currentPath === '/menu' ? 'text-red-400' : 'text-gray-300 hover:text-cream-50'
                }`}
              >
                {t('nav.menu')}
              </Link>
              <Link
                to="/pravila"
                onClick={() => setOpen(false)}
                className={`block w-full text-center px-8 py-3 text-lg font-semibold transition-all focus-ring-sm ${
                  currentPath === '/pravila' ? 'text-red-400' : 'text-gray-300 hover:text-cream-50'
                }`}
              >
                {t('nav.pravila')}
              </Link>
              {sectionLinks.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => scrollToSection(s, true)}
                  className="block w-full text-center px-8 py-3 text-lg font-semibold text-gray-300 transition-all rounded-lg hover:bg-white/4 hover:text-cream-50 focus-ring-sm"
                >
                  {t(`nav.${s}`)}
                </button>
              ))}
              <button
                type="button"
                onClick={() => switchLang(lang === 'uk' ? 'en' : 'uk')}
                className="block w-full text-center px-8 py-3 text-lg font-semibold transition-all focus-ring-sm text-red-400"
              >
                {lang === 'uk' ? 'EN' : 'UA'}
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setOpen(false)
                onOpenBooking()
              }}
              className="mt-4 flex min-h-12 w-64 items-center justify-center gap-2 rounded-lg bg-red-500 px-5 py-3 text-sm font-bold text-cream-50 transition-colors hover:bg-red-600 focus-ring"
            >
              <CalendarCheck size={17} />
              {t('nav.booking_mobile')}
            </button>
          </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}