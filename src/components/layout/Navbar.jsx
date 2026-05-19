import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarCheck, Menu, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Головна', section: 'hero' },
  { to: '/menu', label: 'Меню' },
]

const sectionLinks = [
  { section: 'popular', label: 'Популярне' },
  { section: 'wine', label: 'Винна карта' },
  { section: 'contact', label: 'Контакти' },
  { section: 'feedback', label: 'Відгуки' },
]

export default function Navbar({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const currentPath = location.pathname

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  const renderNavItem = (label, section, isActive) => (
    <>
      {label}
      {isActive && (
        <motion.div
          layoutId="nav-underline"
          className="absolute -bottom-1 left-3 right-3 h-px bg-gold-400"
        />
      )}
    </>
  )

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-white/10 bg-dark-950/92 backdrop-blur-xl shadow-lg shadow-black/25'
          : 'border-white/6 bg-dark-950/74 backdrop-blur-lg'
      }`}
      role="navigation"
      aria-label="Головна навігація"
    >
      <div className="page-content">
        <div className="relative flex h-[72px] items-center justify-between gap-4 pr-14 lg:h-[84px] lg:pr-0">
          <Link to="/" className="flex min-w-0 items-center gap-3 focus-ring-sm" aria-label="На головну">
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden border border-gold-400/25 bg-black/30 shadow-lg shadow-black/15">
              <img src={`${import.meta.env.BASE_URL}img/logo.png`} alt="" className="h-14 w-14 object-contain" />
            </span>
            <span className="hidden sm:block leading-none">
              <span className="block font-serif text-lg font-bold text-light-100">The River</span>
              <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-400">Premium Club</span>
            </span>
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex">
            <Link
              to="/"
              onClick={() => scrollToSection('hero')}
              className={`relative whitespace-nowrap px-3 py-2 text-sm font-semibold transition-colors duration-300 focus-ring-sm xl:px-4 ${
                currentPath === '/' ? 'text-gold-300' : 'text-light-300 hover:bg-white/6 hover:text-light-100'
              }`}
            >
              {renderNavItem('Головна', 'hero', currentPath === '/')}
            </Link>
            <Link
              to="/menu"
              className={`relative whitespace-nowrap px-3 py-2 text-sm font-semibold transition-colors duration-300 focus-ring-sm xl:px-4 ${
                currentPath === '/menu' ? 'text-gold-300' : 'text-light-300 hover:bg-white/6 hover:text-light-100'
              }`}
            >
              {renderNavItem('Меню', 'menu', currentPath === '/menu')}
            </Link>
            {sectionLinks.map((s) => (
              <button
                key={s.section}
                type="button"
                onClick={() => scrollToSection(s.section)}
                className="relative whitespace-nowrap px-3 py-2 text-sm font-semibold text-light-300 transition-colors duration-300 hover:bg-white/6 hover:text-light-100 focus-ring-sm xl:px-4"
              >
                {s.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onOpenBooking}
            className="hidden shrink-0 items-center justify-center gap-2 border border-gold-300/25 bg-gold-500 px-4 py-2.5 text-sm font-bold text-dark-950 shadow-lg shadow-gold-500/15 transition-colors duration-300 hover:bg-gold-400 focus-ring-sm lg:inline-flex xl:px-5"
          >
            <CalendarCheck size={16} />
            Бронювання
          </button>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="absolute right-0 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-gold-300/25 bg-gold-500 text-dark-950 shadow-lg shadow-gold-500/15 transition-colors hover:bg-gold-400 focus-ring-sm lg:hidden"
            aria-label={open ? 'Закрити меню' : 'Відкрити меню'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/65" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 210 }}
              className="absolute bottom-0 right-0 top-0 w-80 max-w-[86vw] border-l border-white/10 bg-dark-950 px-5 py-5 shadow-2xl"
            >
              <div className="mb-7 flex items-center justify-between gap-4">
                <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3 focus-ring-sm">
                  <span className="flex h-11 w-11 items-center justify-center overflow-hidden border border-gold-400/25 bg-black/30">
                    <img src={`${import.meta.env.BASE_URL}img/logo.png`} alt="" className="h-14 w-14 object-contain" />
                  </span>
                  <span>
                    <span className="block font-serif text-lg font-bold text-light-100">The River</span>
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-400">Premium Club</span>
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center border border-white/10 text-light-300 transition-colors hover:text-light-100 focus-ring-sm"
                  aria-label="Закрити меню"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-1">
                <Link
                  to="/"
                  onClick={() => { setOpen(false); scrollToSection('hero') }}
                  className={`block px-4 py-3 text-base font-semibold transition-all focus-ring-sm ${
                    currentPath === '/' ? 'bg-gold-500/10 text-gold-300' : 'text-light-300 hover:bg-white/6 hover:text-light-100'
                  }`}
                >
                  Головна
                </Link>
                <Link
                  to="/menu"
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 text-base font-semibold transition-all focus-ring-sm ${
                    currentPath === '/menu' ? 'bg-gold-500/10 text-gold-300' : 'text-light-300 hover:bg-white/6 hover:text-light-100'
                  }`}
                >
                  Меню
                </Link>
                {sectionLinks.map((s) => (
                  <button
                    key={s.section}
                    type="button"
                    onClick={() => scrollToSection(s.section, true)}
                    className="block w-full text-left px-4 py-3 text-base font-semibold text-light-300 transition-all hover:bg-white/6 hover:text-light-100 focus-ring-sm"
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  onOpenBooking()
                }}
                className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 border border-gold-300/25 bg-gold-500 px-5 py-3 text-sm font-bold text-dark-950 transition-colors hover:bg-gold-400 focus-ring"
              >
                <CalendarCheck size={17} />
                Забронювати столик
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
