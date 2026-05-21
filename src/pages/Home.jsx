import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CalendarCheck, Clock, MapPin, Phone, UtensilsCrossed, Flame, Music } from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import DishModal from '../components/ui/MenuItemModal.jsx'
import { place } from '../data/restaurant.js'
import Popular from './Popular.jsx'
import Contact from './Contact.jsx'
import Feedback from './Feedback.jsx'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

const stagger = {
  initial: { opacity: 1 },
  animate: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const features = [
  {
    icon: UtensilsCrossed,
    title: 'Авторська кухня',
    desc: 'Продумані поєднання, сезонні продукти і подача, яка не заважає смаку бути головним.',
  },
  {
    icon: Flame,
    title: 'Бар і коктейлі',
    desc: 'Коктейлі та міцні напої для вечері, зустрічі або повільного вечора біля води.',
  },
  {
    icon: Music,
    title: 'Атмосфера',
    desc: 'Спокійний клубний настрій у Тернополі для особливої події, побачення чи зустрічі.',
  },
]

const heroFacts = [
  { icon: MapPin, label: place.location },
  { icon: Clock, label: 'Щодня з 12:00' },
  { icon: Phone, label: place.phone, href: `tel:${place.phone}` },
]

export default function Home({ onOpenBooking }) {
  const location = useLocation()
  const [selectedDish, setSelectedDish] = useState(null)
  const [imgErrors, setImgErrors] = useState({})

  useEffect(() => {
    const state = location.state
    if (state?.scrollTo) {
      const id = state.scrollTo
      const timer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [location.state])

  const handleImgError = (id) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }))
  }

  return (
    <div>
      {/* Hero — no photo, centered, modern */}
      <section
        id="hero"
        className="hero-grain relative overflow-hidden bg-dark-950 flex items-center justify-center"
        style={{ minHeight: 'clamp(600px, 100svh, 900px)' }}
      >
        {/* Subtle gradient background instead of photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.06)_0%,transparent_70%)]" />

        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="page-content relative z-10 flex flex-col items-center text-center py-20 sm:py-24 lg:py-28"
        >
          {/* Logo as text — centered, bold */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-block text-red-500 text-xs sm:text-sm font-bold uppercase tracking-[0.35em]">
              Premium Club — Тернопіль
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-7xl font-black text-cream-50 sm:text-8xl lg:text-9xl tracking-tight"
          >
            THE RIVER
          </motion.h1>

          {/* Red accent line */}
          <motion.div variants={fadeUp} className="w-24 h-1 bg-red-500 my-6 sm:my-8" />

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-base sm:text-lg text-gray-300 leading-relaxed"
          >
            Преміальний клуб із авторською кухнею, баром та спокійною атмосферою для вечері, зустрічі або особливої події.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button to="/menu" size="lg" className="w-full sm:w-auto">
              Переглянути меню <ArrowRight size={18} />
            </Button>
            <Button type="button" onClick={onOpenBooking} variant="outline" size="lg" className="w-full sm:w-auto">
              Забронювати столик <CalendarCheck size={18} />
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-col gap-3 border-t border-white/8 pt-6 text-sm font-medium text-gray-400 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-8 sm:gap-y-3"
          >
            {heroFacts.map((item) => {
              const Icon = item.icon
              const content = (
                <>
                  <Icon size={16} className="shrink-0 text-red-400" />
                  <span className="leading-6">{item.label}</span>
                </>
              )

              return item.href ? (
                <a key={item.label} href={item.href} className="flex items-center gap-2.5 hover:text-red-300 transition-colors">
                  {content}
                </a>
              ) : (
                <span key={item.label} className="flex items-center gap-2.5">
                  {content}
                </span>
              )
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* Features section */}
      <section className="page-container py-16 sm:py-22 lg:py-24">
        <div className="page-content">
          <SectionTitle subtitle="Про нас">Атмосфера преміального відпочинку</SectionTitle>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
            {features.map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -4 }}
                  className="group glass glass-hover rounded-lg border border-white/6 p-6 text-left sm:p-7"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center border border-red-500/20 bg-red-500/10 text-red-400">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-cream-50 transition-colors group-hover:text-red-400">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-gray-400">{item.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Popular section */}
      <section id="popular" className="scroll-mt-24 border-t border-white/6 bg-dark-800/32 pt-16 sm:pt-20">
        <Popular onOpenDish={(item) => setSelectedDish(item)} />
      </section>

      {/* Contact section */}
      <section id="contact" className="scroll-mt-24 border-t border-white/6 bg-dark-800/32 pt-16 sm:pt-20">
        <Contact />
      </section>

      {/* Feedback section */}
      <section id="feedback" className="scroll-mt-24 border-t border-white/6 pt-16 sm:pt-20">
        <Feedback />
      </section>

      <DishModal
        item={selectedDish}
        imgError={selectedDish ? imgErrors[selectedDish._id] : false}
        onImgError={handleImgError}
        onClose={() => setSelectedDish(null)}
      />
    </div>
  )
}