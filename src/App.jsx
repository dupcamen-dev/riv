import { useEffect, useState } from 'react'
import { Navigate, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { I18nProvider } from './i18n/context.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Breadcrumbs from './components/layout/Breadcrumbs.jsx'
import Footer from './components/layout/Footer.jsx'
import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import Pravila from './pages/Pravila.jsx'
import Info from './pages/Info.jsx'
import Terms from './pages/Terms.jsx'
import Privacy from './pages/Privacy.jsx'
import PageTransition from './components/layout/PageTransition.jsx'
import BookingModal from './components/booking/BookingModal.jsx'
import CookieConsent from './components/ui/CookieConsent.jsx'
import ScrollToTop from './components/ui/ScrollToTop.jsx'

function App() {
  const location = useLocation()
  const path = location.pathname
  const isHome = path === '/'
  const [bookingOpen, setBookingOpen] = useState(false)
  const openBooking = () => setBookingOpen(true)

  useEffect(() => {
    if (path !== '/booking') return undefined
    const timeoutId = window.setTimeout(() => setBookingOpen(true), 0)
    return () => window.clearTimeout(timeoutId)
  }, [path])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [path])

  return (
    <I18nProvider>
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenBooking={openBooking} />
      <main className="site-main flex-1 relative">
        {!isHome && (
          <div className="page-content pt-8 md:pt-10">
            <Breadcrumbs />
          </div>
        )}
        <AnimatePresence mode="wait">
          <Routes location={location} key={path}>
            <Route path="/" element={<PageTransition><Home onOpenBooking={openBooking} /></PageTransition>} />
            <Route path="/menu" element={<PageTransition><Menu /></PageTransition>} />
            <Route path="/pravila" element={<PageTransition><Pravila /></PageTransition>} />
            <Route path="/info" element={<PageTransition><Info /></PageTransition>} />
            <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
            <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
            <Route path="/booking" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer onOpenBooking={openBooking} />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
      <CookieConsent />
      <ScrollToTop />
    </div>
    </I18nProvider>
  )
}

export default App
