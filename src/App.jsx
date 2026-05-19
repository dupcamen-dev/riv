import { useEffect, useState } from 'react'
import { Navigate, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar.jsx'
import Breadcrumbs from './components/layout/Breadcrumbs.jsx'
import Footer from './components/layout/Footer.jsx'
import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import Info from './pages/Info.jsx'
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

  return (
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
            <Route path="/info" element={<PageTransition><Info /></PageTransition>} />
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
  )
}

export default App
