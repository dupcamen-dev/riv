import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Camera, Globe } from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import { place } from '../data/restaurant.js'
import { useState } from 'react'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
  viewport: { once: false },
}

export default function Contact() {
  const coords = place.coordinates || { lat: 49.5533903, lng: 25.5718593 }
  const [mapError, setMapError] = useState(false)

  return (
    <div className="page-container bg-cream-50 py-24">
      <div className="page-content">
        <div className="[&_h2]:text-dark-900 [&_p]:text-gold-600">
          <SectionTitle subtitle="Контакти">Як нас знайти</SectionTitle>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="space-y-4">
            {[
              { icon: MapPin, title: 'Адреса', value: place.location },
              { icon: Phone, title: 'Телефон', value: place.phone, href: `tel:${place.phone}` },
              { icon: Mail, title: 'Email', value: place.email, href: `mailto:${place.email}` },
              { icon: Clock, title: 'Години роботи', value: 'Пн–Чт: 12:00–22:00\nПт–Сб: 12:00–23:00\nНд: 11:00–22:00' },
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.08, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="flex items-start gap-4 glass rounded-lg border border-cream-200 bg-cream-100 p-5 shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-gold-500/10 cursor-default"
              >
                <motion.div
                  className="w-10 h-10 bg-gold-500/10 rounded-lg flex items-center justify-center shrink-0"
                  whileHover={{ rotate: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <item.icon size={18} className="text-gold-500" />
                </motion.div>
                <div className="min-w-0">
                  <h3 className="text-[10px] font-semibold tracking-normal uppercase text-dark-600 mb-1">{item.title}</h3>
                  {item.href ? (
                    <motion.a
                      href={item.href}
                      className="text-sm text-dark-900 hover:text-gold-600 transition-colors break-all focus-ring-sm rounded"
                      whileHover={{ x: 2 }}
                    >
                      {item.value}
                    </motion.a>
                  ) : (
                    <p className="text-sm text-dark-700 whitespace-pre-line leading-relaxed">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            <motion.div
              {...fadeUp}
              transition={{ delay: 0.35 }}
              className="flex gap-3 pt-2"
            >
              <motion.a
                href={place.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 glass rounded-lg border border-cream-200 bg-cream-100 px-5 py-3 text-sm text-dark-700 hover:text-gold-600 hover:border-gold-500/30 transition-all duration-300 focus-ring"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Camera size={16} /> Instagram
              </motion.a>
              <motion.a
                href={place.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 glass rounded-lg border border-cream-200 bg-cream-100 px-5 py-3 text-sm text-dark-700 hover:text-gold-600 hover:border-gold-500/30 transition-all duration-300 focus-ring"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe size={16} /> Facebook
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="glass rounded-lg border border-cream-200 bg-cream-100 overflow-hidden h-[400px] lg:h-full min-h-[400px]"
          >
            {mapError ? (
              <div className="w-full h-full flex items-center justify-center bg-dark-800/80">
                <p className="text-light-500 text-sm">Карта недоступна</p>
              </div>
            ) : (
              <iframe
                title="The River Location"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBlNJjVAiVL3NDU8_UlkX0EbIc8aCeZqqE&q=${coords.lat},${coords.lng}&zoom=15`}
                className="w-full h-full"
                loading="lazy"
                allowFullScreen
                onError={() => setMapError(true)}
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
