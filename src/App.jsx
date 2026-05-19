import { useEffect, useState } from 'react'
import { Navigate, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar.jsx'
import Breadcrumbs from './components/layout/Breadcrumbs.jsx'
import Footer from './components/layout/Footer.jsx'
import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import PageTransition from './components/layout/PageTransition.jsx'
import BookingModal from './components/booking/BookingModal.jsx'

function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [bookingOpen, setBookingOpen] = useState(false)
  const openBooking = () => setBookingOpen(true)

  useEffect(() => {
    if (!location.hash) return

    const id = location.hash.slice(1)
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
  }, [location.hash])

  useEffect(() => {
    if (location.pathname !== '/booking') return undefined

    const timeoutId = window.setTimeout(() => setBookingOpen(true), 0)
    return () => window.clearTimeout(timeoutId)
  }, [location.pathname])

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
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home onOpenBooking={openBooking} /></PageTransition>} />
            <Route path="/menu" element={<PageTransition><Menu /></PageTransition>} />
            <Route path="/booking" element={<Navigate to="/" replace />} />
            <Route path="/popular" element={<Navigate to="/#popular" replace />} />
            <Route path="/wine" element={<Navigate to="/#wine" replace />} />
            <Route path="/contact" element={<Navigate to="/#contact" replace />} />
            <Route path="/feedback" element={<Navigate to="/#feedback" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer onOpenBooking={openBooking} />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  )
}

export default App
