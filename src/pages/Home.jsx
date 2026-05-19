import { motion } from 'framer-motion'
import { ArrowRight, CalendarCheck, Clock, MapPin, Phone, Soup, Sparkles, Wine as WineIcon } from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import { place } from '../data/restaurant.js'
import Popular from './Popular.jsx'
import Wine from './Wine.jsx'
import Contact from './Contact.jsx'
import Feedback from './Feedback.jsx'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
}

const stagger = {
  initial: { opacity: 1 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const features = [
  {
    icon: Soup,
    title: 'Авторська кухня',
    desc: 'Продумані поєднання, сезонні продукти і подача, яка не заважає смаку бути головним.',
  },
  {
    icon: WineIcon,
    title: 'Бар і винна карта',
    desc: 'Коктейлі, вина та міцні напої для вечері, зустрічі або повільного вечора біля води.',
  },
  {
    icon: Sparkles,
    title: 'Преміальна атмосфера',
    desc: 'Спокійний клубний настрій у Тернополі для особливої події, побачення чи зустрічі.',
  },
]

const heroFacts = [
  { icon: MapPin, label: place.location },
  { icon: Clock, label: 'Щодня з 12:00' },
  { icon: Phone, label: place.phone, href: `tel:${place.phone}` },
]

export default function Home({ onOpenBooking }) {
  return (
    <div>
      <section
        className="relative overflow-hidden bg-dark-950"
        style={{ minHeight: 'clamp(580px, calc(100svh - 96px), 820px)' }}
      >
        <img
          src="/img/hero-gemini.png"
          alt="The River Premium Club"
          className="absolute inset-0 h-full w-full object-cover object-[58%_50%]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,6,5,0.94)_0%,rgba(10,8,7,0.78)_36%,rgba(10,8,7,0.26)_68%,rgba(7,6,5,0.18)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,6,5,0.50)_0%,rgba(7,6,5,0.05)_42%,rgba(7,6,5,0.86)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-dark-900 to-transparent" />

        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="page-content relative z-10 flex min-h-[inherit] items-center py-16 sm:py-18 lg:py-20"
        >
          <div className="max-w-3xl">
            <motion.p
              variants={fadeUp}
              className="mb-5 inline-flex border border-gold-400/25 bg-dark-950/35 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold-300 backdrop-blur-sm sm:text-sm"
            >
              Premium Club у Тернополі
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="max-w-2xl text-6xl font-bold text-light-100 drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)] sm:text-7xl lg:text-8xl"
            >
              The River
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-base font-medium leading-8 text-light-100/92 drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)] sm:text-lg"
            >
              Преміальний клуб із авторською кухнею, баром, винною картою та спокійною атмосферою для вечері,
              зустрічі або особливої події.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button to="/menu" size="lg" className="w-full sm:w-auto">
                Переглянути меню <ArrowRight size={18} />
              </Button>
              <Button type="button" onClick={onOpenBooking} variant="outline" size="lg" className="w-full sm:w-auto">
                Забронювати столик <CalendarCheck size={18} />
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col gap-3 border-t border-white/14 pt-6 text-sm font-semibold text-light-200/90 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-3"
            >
              {heroFacts.map((item) => {
                const Icon = item.icon
                const content = (
                  <>
                    <Icon size={17} className="shrink-0 text-gold-300" />
                    <span className="leading-6">{item.label}</span>
                  </>
                )

                return item.href ? (
                  <a key={item.label} href={item.href} className="flex items-center gap-2.5 hover:text-gold-300">
                    {content}
                  </a>
                ) : (
                  <span key={item.label} className="flex items-center gap-2.5">
                    {content}
                  </span>
                )
              })}
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="page-container py-16 sm:py-22 lg:py-24">
        <div className="page-content">
          <SectionTitle subtitle="Про нас">Атмосфера преміального відпочинку</SectionTitle>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
            {features.map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -5 }}
                  className="group glass glass-hover border border-white/10 p-6 text-left sm:p-7"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center border border-gold-400/15 bg-gold-500/12 text-gold-300">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-sans text-lg font-extrabold text-light-100 transition-colors group-hover:text-gold-300">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-light-300/95">{item.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="popular" className="scroll-mt-24 border-t border-white/6 bg-dark-800/32 pt-16 sm:pt-20">
        <Popular />
      </section>

      <section id="wine" className="scroll-mt-24 border-t border-white/6 pt-16 sm:pt-20">
        <Wine />
      </section>

      <section id="contact" className="scroll-mt-24 border-t border-white/6 bg-dark-800/32 pt-16 sm:pt-20">
        <Contact />
      </section>

      <section id="feedback" className="scroll-mt-24 border-t border-white/6 pt-16 sm:pt-20">
        <Feedback />
      </section>
    </div>
  )
}
