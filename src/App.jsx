import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar.jsx'
import Breadcrumbs from './components/layout/Breadcrumbs.jsx'
import Footer from './components/layout/Footer.jsx'
import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import PageTransition from './components/layout/PageTransition.jsx'
import BookingModal from './components/booking/BookingModal.jsx'

function getPath(location) {
  const hash = location.hash.replace(/^#/, '')
  return hash || '/'
}

function App() {
  const location = useLocation()
  const path = getPath(location)
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
            <Route path="/booking" element={<NavigateTo to="/" />} />
            <Route path="/popular" element={<NavigateTo to="/" />} />
            <Route path="/wine" element={<NavigateTo to="/" />} />
            <Route path="/contact" element={<NavigateTo to="/" />} />
            <Route path="/feedback" element={<NavigateTo to="/" />} />
            <Route path="*" element={<NavigateTo to="/" />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer onOpenBooking={openBooking} />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  )
}

function NavigateTo({ to }) {
  const location = useLocation()
  const currentPath = location.hash.replace(/^#/, '') || '/'
  if (currentPath === to) return null
  const hash = `#${to === '/' ? '' : to}`
  window.location.hash = hash
  return null
}

export default App
