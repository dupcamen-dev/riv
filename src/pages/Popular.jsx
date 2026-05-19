import { motion } from 'framer-motion'
import { Sparkles, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import Button from '../components/ui/Button.jsx'
import { allMenuItems } from '../data/restaurant.js'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
  viewport: { once: true, margin: '-30px' },
}

export default function Popular({ onOpenDish }) {
  const navigate = useNavigate()
  const popular = [...allMenuItems].sort((a, b) => b.price - a.price).slice(0, 12)

  const openDish = (item) => {
    if (onOpenDish) {
      onOpenDish(item)
    } else {
      navigate(`/menu?item=${item.hurl}`)
    }
  }

  return (
    <div className="page-container pb-24">
      <div className="page-content">
        <SectionTitle subtitle="Топ вибір">
          <span className="flex items-center justify-center gap-3">
            <Sparkles size={24} className="text-gold-500" /> Популярні страви
          </span>
        </SectionTitle>

        {popular.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-light-400">Немає популярних страв</p>
            <Button to="/menu" variant="outline" size="sm" className="mt-6">
              <ArrowLeft size={14} /> До меню
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {popular.map((item, i) => (
              <motion.button
                key={item._id}
                {...fadeUp}
                type="button"
                transition={{ delay: i * 0.04, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -4 }}
                onClick={() => openDish(item)}
                className="group w-full rounded-lg border border-cream-200 bg-cream-100 p-6 text-left transition-all duration-300 hover:border-gold-500/40 hover:bg-cream-50 cursor-pointer"
              >
                <div className="flex items-start gap-4 mb-3">
                  <span className="text-2xl font-bold text-gold-600/30 font-serif tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-dark-900 group-hover:text-gold-600 transition-colors leading-snug">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-dark-500 mt-1.5 line-clamp-2 leading-relaxed">{item.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between ml-10 pt-2 border-t border-cream-200">
                  {item.weight ? (
                    <span className="text-xs text-dark-500">{item.weight} {item.weightType === 'ml' ? 'мл' : 'г'}</span>
                  ) : <span />}
                  <span className="text-base font-bold text-gold-600 tabular-nums">{item.price.toLocaleString('uk-UA')} ₴</span>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
