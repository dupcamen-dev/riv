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
import { useT } from '../i18n/context.jsx'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

const stagger = {
  initial: { opacity: 1 },
  animate: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const fadeUpWithT = (t) => [
  {
    icon: UtensilsCrossed,
    title: t('home.feature_1_title'),
    desc: t('home.feature_1_desc'),
  },
  {
    icon: Flame,
    title: t('home.feature_2_title'),
    desc: t('home.feature_2_desc'),
  },
  {
    icon: Music,
    title: t('home.feature_3_title'),
    desc: t('home.feature_3_desc'),
  },
]

const heroFactsWithT = (t, place) => [
  { icon: MapPin, label: place.location },
  { icon: Clock, label: t('home.daily') },
  { icon: Phone, label: place.phone, href: `tel:${place.phone}` },
]

export default function Home({ onOpenBooking }) {
  const t = useT()
  const location = useLocation()
  const [selectedDish, setSelectedDish] = useState(null)
  const [imgErrors, setImgErrors] = useState({})

  const features = fadeUpWithT(t)
  const heroFacts = heroFactsWithT(t, place)

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
      {/* Hero — cream background, red title, black text */}
      <section
        id="hero"
        className="relative overflow-hidden bg-cream-50 flex items-center justify-center"
        style={{ minHeight: 'clamp(600px, 100svh, 900px)' }}
      >
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream-50 via-cream-50 to-cream-100" />

        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="page-content relative z-10 flex flex-col items-center text-center py-20 sm:py-24 lg:py-28"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-block text-gold-500 text-xs sm:text-sm font-bold uppercase tracking-[0.35em]">
              {t('home.badge')}
            </span>
          </motion.div>

          {/* Title — red */}
          <motion.h1
            variants={fadeUp}
            className="text-7xl font-black text-dark-950 sm:text-8xl lg:text-9xl tracking-tight"
          >
            THE RIVER
          </motion.h1>

          {/* Red accent line */}
          <motion.div variants={fadeUp} className="w-24 h-1 bg-gold-500 my-6 sm:my-8" />

          {/* Description — black text */}
          <motion.p
            variants={fadeUp}
            className="max-w-xl text-base sm:text-lg text-gray-700 leading-relaxed"
          >
            {t('home.hero_desc')}
          </motion.p>

          {/* Buttons */}
          <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button to="/menu" size="lg" className="w-full sm:w-auto">
              {t('home.view_menu')} <ArrowRight size={18} />
            </Button>
            <Button type="button" onClick={onOpenBooking} variant="outline" size="lg" className="w-full sm:w-auto">
              {t('home.book_table')} <CalendarCheck size={18} />
            </Button>
          </motion.div>

          {/* Facts — dark text on cream */}
          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-col gap-3 border-t border-gray-200 pt-6 text-sm font-medium text-gray-600 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-8 sm:gap-y-3"
          >
            {heroFacts.map((item) => {
              const Icon = item.icon
              const content = (
                <>
                  <Icon size={16} className="shrink-0 text-gold-400" />
                  <span className="leading-6">{item.label}</span>
                </>
              )

              return item.href ? (
                <a key={item.label} href={item.href} className="flex items-center gap-2.5 hover:text-gold-600 transition-colors">
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

      {/* Features section — gray */}
      <section className="bg-dark-700 page-container py-16 sm:py-22 lg:py-24">
        <div className="page-content">
          <SectionTitle subtitle={t('home.features_subtitle')}>{t('home.features_title')}</SectionTitle>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
            {features.map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -4 }}
                  className="group glass glass-hover rounded-lg border border-white/6 p-6 text-left sm:p-7"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center border border-gold-500/20 bg-gold-500/10 text-gold-400">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-cream-50 transition-colors group-hover:text-gold-400">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-gray-400">{item.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Popular section — cream */}
      <section id="popular" className="scroll-mt-24 bg-cream-50 border-t border-cream-200 pt-16 sm:pt-20">
        <Popular onOpenDish={(item) => setSelectedDish(item)} light />
      </section>

      {/* Contact section — gray */}
      <section id="contact" className="scroll-mt-24 border-t border-white/6 bg-dark-700 pt-16 sm:pt-20">
        <Contact />
      </section>

      {/* Feedback section — cream */}
      <section id="feedback" className="scroll-mt-24 bg-cream-50 border-t border-cream-200 pt-16 sm:pt-20">
        <Feedback light />
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
