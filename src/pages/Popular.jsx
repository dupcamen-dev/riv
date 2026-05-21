import { motion } from 'framer-motion'
import { Sparkles, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import Button from '../components/ui/Button.jsx'
import { allMenuItems } from '../data/restaurant.js'
import { useT } from '../i18n/context.jsx'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
  viewport: { once: false, margin: '-30px' },
}

export default function Popular({ onOpenDish, light }) {
  const t = useT()
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
    <div className="page-container py-24">
      <div className="page-content">
        <SectionTitle subtitle={t('popular.subtitle')} dark={light}>
          <span className="flex items-center justify-center gap-3">
            <Sparkles size={24} className="text-gold-400" /> {t('popular.title')}
          </span>
        </SectionTitle>

        {popular.length === 0 ? (
          <div className="text-center py-20">
            <p className={`${light ? 'text-gray-600' : 'text-gray-400'}`}>{t('popular.empty')}</p>
            <Button to="/menu" variant="outline" size="sm" className="mt-6">
              <ArrowLeft size={14} /> {t('popular.to_menu')}
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
                className={`group w-full rounded-lg border p-6 text-left shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
                  light
                    ? 'border-cream-200 bg-cream-50 text-dark-900 shadow-cream-200/50 hover:border-gold-500/30 hover:shadow-gold-500/10 hover:bg-cream-100'
                    : 'border-white/6 bg-dark-800/50 text-cream-50 shadow-black/15 hover:border-gold-500/30 hover:shadow-black/20 hover:bg-dark-800/80'
                }`}
              >
                  <div className="flex items-start gap-4 mb-3">
                  <span className="text-2xl font-bold font-display tabular-nums ${light ? 'text-gold-500/30' : 'text-gold-500/20'}">{String(i + 1).padStart(2, '0')}</span>
                  <div className="min-w-0">
                    <h3 className={`text-sm font-semibold leading-snug transition-colors group-hover:text-gold-400 ${light ? 'text-dark-900' : 'text-cream-50'}`}>
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className={`text-xs mt-1.5 line-clamp-2 leading-relaxed ${light ? 'text-gray-600' : 'text-gray-400'}`}>{item.description}</p>
                    )}
                  </div>
                </div>
                <div className={`flex items-center justify-between ml-10 pt-2 border-t ${light ? 'border-cream-200' : 'border-white/6'}`}>
                  {item.weight ? (
                    <span className={`text-xs ${light ? 'text-gray-500' : 'text-gray-500'}`}>{item.weight} {item.weightType === 'ml' ? t('menu.weight_ml') : t('menu.weight_g')}</span>
                  ) : <span />}
                  <span className="text-base font-bold text-gold-400 tabular-nums">{item.price.toLocaleString('uk-UA')} ₴</span>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
