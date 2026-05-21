import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useT } from '../../i18n/context.jsx'

export default function ScrollToTop() {
  const t = useT()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center border border-red-500/25 bg-red-500 text-cream-50 shadow-lg shadow-red-500/15 transition-colors hover:bg-red-600 focus-ring-sm"
          aria-label={t('scroll.top')}
        >
          <ArrowUp size={22} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
