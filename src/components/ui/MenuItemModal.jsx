import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

const resolveUrl = (url) => {
  if (!url) return ''
  if (url.startsWith('/img/')) return import.meta.env.BASE_URL + url.slice(1)
  return url
}

const getDishImage = (media, mode = 'card') => {
  if (!media) return ''
  const url = mode === 'modal'
    ? (media.webp?.big || media.big || media.webp?.medium || media.medium || media.webp?.url || media.url || media.thumbnail)
    : (media.webp?.medium || media.medium || media.webp?.url || media.url || media.big || media.thumbnail)
  return resolveUrl(url)
}

const formatWeight = (item) => {
  if (!item.weight) return null
  return `${item.weight} ${item.weightType === 'ml' ? 'мл' : 'г'}`
}

export default function DishModal({ item, imgError, onImgError, onClose }) {
  useEffect(() => {
    if (!item) return undefined
    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [item, onClose])

  if (!item) return null

  const weight = formatWeight(item)
  const hasImage = item.media && !imgError

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 px-4 pb-4 pt-20 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-cream-200 bg-cream-50 shadow-2xl shadow-black/50"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-cream-50/90 text-dark-600 shadow-lg shadow-black/25 backdrop-blur-sm transition-colors hover:text-dark-900 focus-ring-sm"
          aria-label="Закрити"
        >
          <X size={20} />
        </button>

        <div className="grid min-h-0 grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="relative h-64 bg-cream-100 md:h-full md:min-h-[28rem]">
            {hasImage ? (
              <img
                src={getDishImage(item.media, 'modal')}
                alt={item.name}
                onError={() => onImgError(item._id)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-cream-100">
                <span className="font-serif text-7xl text-gold-500/20">✦</span>
              </div>
            )}
            {item.alcohol > 0 && (
              <span className="absolute left-4 top-4 rounded-lg border border-gold-500/30 bg-cream-50/80 px-3 py-1 text-xs font-bold text-gold-600 backdrop-blur-sm">
                18+
              </span>
            )}
          </div>

          <div className="min-h-0 overflow-y-auto p-5 sm:p-7">
            <div className="mb-5 pr-10">
              {item.categoryName && (
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-gold-600">{item.categoryName}</p>
              )}
              <h3 id="dish-modal-title" className="text-2xl font-serif font-bold text-dark-900 sm:text-3xl">
                {item.name}
              </h3>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-gold-500 px-3 py-1.5 text-sm font-bold text-dark-900">
                  {item.price.toLocaleString('uk-UA')} ₴
                </span>
                {weight && (
                  <span className="rounded-lg border border-cream-200 bg-cream-100 px-3 py-1.5 text-sm font-semibold text-dark-700">
                    {weight}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-5">
              <section>
                <h4 className="mb-2 text-sm font-bold text-dark-900">Опис і склад</h4>
                {item.description ? (
                  <p className="whitespace-pre-line text-sm leading-6 text-dark-700">{item.description}</p>
                ) : (
                  <p className="text-sm leading-6 text-dark-600">Опис або склад для цієї страви ще не додано.</p>
                )}
              </section>

              {item.categoryDescription && (
                <section className="rounded-lg border border-cream-200 bg-cream-100 p-4">
                  <h4 className="mb-2 text-sm font-bold text-dark-900">Примітка категорії</h4>
                  <p className="whitespace-pre-line text-sm leading-6 text-dark-600">{item.categoryDescription}</p>
                </section>
              )}

              <div className="grid grid-cols-2 gap-3 text-sm">
                {item.sectionName && (
                  <div className="rounded-lg border border-cream-200 bg-cream-100 p-3">
                    <p className="text-xs text-dark-600">Розділ</p>
                    <p className="mt-1 font-semibold text-dark-900">{item.sectionName}</p>
                  </div>
                )}
                {weight && (
                  <div className="rounded-lg border border-cream-200 bg-cream-100 p-3">
                    <p className="text-xs text-dark-600">Вага</p>
                    <p className="mt-1 font-semibold text-dark-900">{weight}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
