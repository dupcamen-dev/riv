import { motion } from 'framer-motion'
import { BookText } from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import { useT } from '../i18n/context.jsx'

const rulesWithT = (t) => [
  { title: t('pravila.dress_code'), text: t('pravila.dress_code_text') },
  { title: t('pravila.booking'), text: t('pravila.booking_text') },
  { title: t('pravila.smoking'), text: t('pravila.smoking_text') },
  { title: t('pravila.age'), text: t('pravila.age_text') },
  { title: t('pravila.music'), text: t('pravila.music_text') },
  { title: t('pravila.behavior'), text: t('pravila.behavior_text') },
  { title: t('pravila.photo'), text: t('pravila.photo_text') },
]

const infoWithT = (t) => [
  { title: t('pravila.schedule'), text: t('pravila.schedule_text') },
  { title: t('pravila.contacts'), text: t('pravila.contacts_text') },
  { title: t('pravila.directions'), text: t('pravila.directions_text') },
  { title: t('pravila.parking'), text: t('pravila.parking_text') },
  { title: t('pravila.rental'), text: t('pravila.rental_text') },
]

export default function Pravila() {
  const t = useT()
  const rules = rulesWithT(t)
  const info = infoWithT(t)

  return (
    <div className="page-container pb-24">
      <div className="page-content">
        <SectionTitle subtitle={t('pravila.subtitle')}>{t('pravila.title')}</SectionTitle>

        <div className="max-w-3xl mx-auto space-y-10">
          <div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-cream-50 mb-4 flex items-center gap-3">
              <BookText size={22} className="text-red-500" />
              {t('pravila.rules_title')}
            </h3>
            <div className="space-y-4">
              {rules.map((rule, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  className="glass rounded-lg p-5 border border-dark-600/30"
                >
                  <h4 className="text-sm font-bold text-red-400 mb-2">{rule.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{rule.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-cream-50 mb-4 flex items-center gap-3">
              <BookText size={22} className="text-red-500" />
              {t('pravila.info_title')}
            </h3>
            <div className="space-y-4">
              {info.map((infoItem, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  className="glass rounded-lg p-5 border border-dark-600/30"
                >
                  <h4 className="text-sm font-bold text-red-400 mb-2">{infoItem.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">{infoItem.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
