import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function MenuItemModal({ item, onClose }) {
  useEffect(() => {
    if (!item) return
    document.body.style.overflow = 'hidden'
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handler)
    }
  }, [item, onClose])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-dark-800 border border-dark-600/30 rounded-2xl overflow-hidden max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative">
              {item.media ? (
                <img
                  src={item.media.big || item.media.url || item.media.thumbnail}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-dark-700 to-dark-600 flex items-center justify-center">
                  <span className="text-6xl text-gold-500/20 font-serif">✦</span>
                </div>
              )}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 bg-dark-900/60 backdrop-blur-sm rounded-full p-2 text-light-300 hover:text-light-100 transition-colors"
              >
                <X size={18} />
              </button>
              {item.alcohol > 0 && (
                <span className="absolute top-3 left-3 bg-dark-900/60 backdrop-blur-sm text-xs text-gold-500 px-2.5 py-1 rounded-full border border-gold-500/20 font-semibold">
                  18+
                </span>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-xl font-serif font-bold text-light-100">{item.name}</h3>
                <span className="text-xl font-bold text-gold-500 whitespace-nowrap tabular-nums">
                  {item.price.toLocaleString('uk-UA')} ₴
                </span>
              </div>
              {item.description && (
                <p className="text-sm text-light-300 leading-relaxed mb-4">{item.description}</p>
              )}
              <div className="flex items-center gap-4 text-xs text-light-400">
                {item.weight && (
                  <span>Вага: {item.weight} {item.weightType === 'ml' ? 'мл' : 'г'}</span>
                )}
                {item.categoryName && (
                  <span>Категорія: {item.categoryName}</span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
