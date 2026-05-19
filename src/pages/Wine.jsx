import { motion } from 'framer-motion'
import { GlassWater, ArrowLeft } from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import Button from '../components/ui/Button.jsx'
import { sections } from '../data/restaurant.js'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
  viewport: { once: true, margin: '-30px' },
}

export default function Wine() {
  const wineSection = sections.find((s) => s.hurl === 'section:vinna-karta')
  const cats = wineSection ? Object.values(wineSection.categories) : []

  return (
    <div className="page-container pb-24">
      <div className="page-content">
        <SectionTitle subtitle="Винна карта">Наша колекція вин</SectionTitle>

        {cats.length === 0 ? (
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="w-20 h-20 bg-dark-800/60 rounded-lg flex items-center justify-center mx-auto mb-6">
              <GlassWater size={40} className="text-gold-500/40" />
            </div>
            <p className="text-light-400 mb-2">Винна карта тимчасово порожня</p>
            <p className="text-light-500 text-sm mb-8">Завітайте до нашого бару — найкращий вибір чекає на вас особисто</p>
            <Button to="/menu" variant="outline" size="sm">
              <ArrowLeft size={14} /> До меню
            </Button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-14">
            {cats.map((cat) => (
              <motion.div key={cat._id} {...fadeUp}>
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 bg-gold-500/10 rounded-lg flex items-center justify-center shrink-0">
                    <GlassWater size={16} className="text-gold-500" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-light-100">{cat.name}</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-gold-500/20 to-transparent" />
                </div>
                <div className="space-y-2">
                  {cat.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between glass rounded-lg px-5 py-4 hover:border-gold-500/20 transition-all duration-300 group"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-light-100 group-hover:text-gold-500 transition-colors">{item.name}</h4>
                        {item.description && <p className="text-xs text-light-500 mt-1 line-clamp-1">{item.description}</p>}
                      </div>
                      <div className="flex items-center gap-5 shrink-0 ml-4">
                        {item.weight && <span className="text-xs text-light-500 tabular-nums">{item.weight} {item.weightType === 'ml' ? 'мл' : 'г'}</span>}
                        <span className="text-sm font-bold text-gold-500 tabular-nums">{item.price.toLocaleString('uk-UA')} ₴</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
